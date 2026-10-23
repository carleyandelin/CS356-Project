#!/usr/bin/env python3

import argparse
import base64
import io
import math
import os
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageStat


# ---------- helpers ----------

def fmt_time(seconds: float) -> str:
    seconds = int(seconds)
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def run(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"Command failed: {' '.join(cmd)}\n{result.stderr}")
    return result.stdout


# ---------- step 1: transcription ----------

def transcribe(video: Path, model_size: str):
    from faster_whisper import WhisperModel

    print(f"  Transcribing audio (model: {model_size})...")
    model = WhisperModel(model_size, device="auto", compute_type="auto")
    segments, _info = model.transcribe(str(video), vad_filter=True)
    return [
        {"start": seg.start, "end": seg.end, "text": seg.text.strip()}
        for seg in segments
        if seg.text.strip()
    ]


# ---------- step 2: frame extraction ----------

def extract_frames(video: Path, out_dir: Path, interval: float, diff_threshold: float):
    """Extract one frame every `interval` seconds, then drop near-duplicates."""
    out_dir.mkdir(parents=True, exist_ok=True)
    tmp_pattern = out_dir / "tmp_%05d.png"

    print(f"  Extracting a frame every {interval}s...")
    run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(video),
        "-vf", f"fps=1/{interval}", str(tmp_pattern),
    ])

    tmp_files = sorted(out_dir.glob("tmp_*.png"))
    kept = []
    prev_img = None
    for i, path in enumerate(tmp_files):
        timestamp = i * interval
        img = Image.open(path).convert("RGB")

        changed = True
        if prev_img is not None:
            small_a = img.resize((160, 90))
            small_b = prev_img.resize((160, 90))
            diff = ImageChops.difference(small_a, small_b)
            mean_diff = sum(ImageStat.Stat(diff).mean) / 3
            changed = mean_diff > diff_threshold

        # Always keep the first frame
        if changed or prev_img is None:
            final = out_dir / f"frame_{int(timestamp):05d}s.png"
            path.rename(final)
            kept.append({"time": timestamp, "path": final})
            prev_img = img
        else:
            path.unlink()

    print(f"  Kept {len(kept)} of {len(tmp_files)} frames (rest were near-duplicates).")
    return kept


# ---------- step 3: merge ----------

def merge_timeline(segments, frames):
    """Group spoken text under the frame that was on screen when it was said."""
    timeline = []
    for idx, frame in enumerate(frames):
        start = frame["time"]
        end = frames[idx + 1]["time"] if idx + 1 < len(frames) else float("inf")
        spoken = [s for s in segments if start <= s["start"] < end]
        timeline.append({
            "time": start,
            "frame": frame["path"],
            "speech": [(s["start"], s["text"]) for s in spoken],
            "action": None,
        })

    # Speech before the first frame (shouldn't happen, but just in case)
    return timeline


# ---------- step 3b: labeled grids ----------

def load_font(size: int):
    for name in ("Arial Bold.ttf", "Arial.ttf", "Helvetica.ttc", "DejaVuSans-Bold.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()


def make_grids(timeline, out_dir: Path, grid_size: int, cols: int, cell_width: int):
    """Pack frames into grid images, each cell stamped with its timestamp."""
    out_dir.mkdir(parents=True, exist_ok=True)
    font = load_font(max(20, cell_width // 16))
    pad, gap = 8, 6
    grids = []

    for n, start in enumerate(range(0, len(timeline), grid_size), start=1):
        chunk = timeline[start:start + grid_size]
        cells = []
        for entry in chunk:
            img = Image.open(entry["frame"]).convert("RGB")
            img = img.resize((cell_width, int(img.height * cell_width / img.width)))
            draw = ImageDraw.Draw(img)
            label = fmt_time(entry["time"])
            bbox = draw.textbbox((0, 0), label, font=font)
            draw.rectangle([0, 0, bbox[2] + 2 * pad, bbox[3] + 2 * pad], fill="black")
            draw.text((pad, pad), label, fill="yellow", font=font)
            cells.append(img)

        cell_h = max(c.height for c in cells)
        rows = math.ceil(len(cells) / cols)
        used_cols = min(cols, len(cells))
        sheet = Image.new(
            "RGB",
            (used_cols * cell_width + (used_cols - 1) * gap, rows * cell_h + (rows - 1) * gap),
            "white",
        )
        for i, cell in enumerate(cells):
            r, c = divmod(i, cols)
            sheet.paste(cell, (c * (cell_width + gap), r * (cell_h + gap)))

        path = out_dir / f"grid_{n:02d}.jpg"
        sheet.save(path, quality=88)
        grids.append({"path": path, "entries": chunk})

    print(f"  Made {len(grids)} grid image(s) of up to {grid_size} frames each.")
    return grids


# ---------- step 4: describe with Claude ----------

def encode_image(path: Path, max_width: int = 1280) -> str:
    img = Image.open(path).convert("RGB")
    if img.width > max_width:
        ratio = max_width / img.width
        img = img.resize((max_width, int(img.height * ratio)))
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=85)
    return base64.standard_b64encode(buf.getvalue()).decode()


def describe_actions(timeline, model: str):
    import anthropic

    client = anthropic.Anthropic()
    print(f"  Describing on-screen actions with {model} ({len(timeline)} frames)...")

    prev_path = None
    for i, entry in enumerate(timeline):
        speech_text = " ".join(t for _, t in entry["speech"]) or "(no speech)"
        content = []

        if prev_path is not None:
            content.append({"type": "text", "text": "Previous frame:"})
            content.append({
                "type": "image",
                "source": {"type": "base64", "media_type": "image/jpeg",
                           "data": encode_image(prev_path)},
            })
        content.append({"type": "text", "text": "Current frame:" if prev_path else "First frame:"})
        content.append({
            "type": "image",
            "source": {"type": "base64", "media_type": "image/jpeg",
                       "data": encode_image(entry["frame"])},
        })
        content.append({
            "type": "text",
            "text": (
                "These are screenshots from a screen recording of someone using a website "
                "while talking. While this frame was on screen, they said:\n\n"
                f"\"{speech_text}\"\n\n"
                "In 1-2 short sentences, describe what the user is doing on the website: "
                "which page or screen is showing, and what they appear to have clicked, "
                "typed, or scrolled to (compare with the previous frame, and use the cursor "
                "position and what changed). Name the specific buttons, links, or menu items. "
                "If you are inferring a click rather than seeing it, say 'appears to'. "
                "Reply with the description only."
            ),
        })

        try:
            resp = client.messages.create(
                model=model,
                max_tokens=300,
                messages=[{"role": "user", "content": content}],
            )
            entry["action"] = "".join(b.text for b in resp.content if b.type == "text").strip()
        except Exception as e:  # keep going if one frame fails
            entry["action"] = f"(could not describe this frame: {e})"

        prev_path = entry["frame"]
        print(f"    {i + 1}/{len(timeline)}", end="\r")
    print()


# ---------- output ----------

def write_markdown(video: Path, grids, out_path: Path):
    lines = [f"# Walkthrough: {video.name}", ""]
    for n, grid in enumerate(grids, start=1):
        entries = grid["entries"]
        lines.append(f"## Grid {n} ({fmt_time(entries[0]['time'])} - {fmt_time(entries[-1]['time'])})")
        lines.append(f"Image: `{grid['path'].name}` (each frame is labeled with its timestamp)")
        lines.append("")
        for entry in entries:
            lines.append(f"### [{fmt_time(entry['time'])}]")
            if entry["action"]:
                lines.append(f"**On screen:** {entry['action']}")
            if entry["speech"]:
                for t, text in entry["speech"]:
                    lines.append(f"- **{fmt_time(t)}** \"{text}\"")
            else:
                lines.append("- *(no speech)*")
            lines.append("")
    out_path.write_text("\n".join(lines), encoding="utf-8")


def process(video: Path, args):
    print(f"\nProcessing {video.name}")
    out_dir = Path(args.output) / video.stem
    out_dir.mkdir(parents=True, exist_ok=True)

    segments = transcribe(video, args.whisper_model)
    frames = extract_frames(video, out_dir / "frames", args.interval, args.diff_threshold)
    timeline = merge_timeline(segments, frames)

    if args.describe:
        describe_actions(timeline, args.model)

    grids = make_grids(timeline, out_dir / "grids", args.grid_size, args.grid_cols, args.cell_width)

    md_path = out_dir / "walkthrough.md"
    write_markdown(video, grids, md_path)
    print(f"  Done -> {md_path}")
    print(f"  Upload walkthrough.md plus the images in {out_dir / 'grids'}")


def main():
    p = argparse.ArgumentParser(description="Transcribe screen recordings and annotate on-screen actions.")
    p.add_argument("videos", nargs="+", type=Path)
    p.add_argument("--output", default="walkthrough_output", help="Output folder")
    p.add_argument("--interval", type=float, default=3.0, help="Seconds between frames (default 3)")
    p.add_argument("--diff-threshold", type=float, default=2.0,
                   help="Skip frames that differ less than this from the last kept frame (default 2.0; 0 keeps all)")
    p.add_argument("--whisper-model", default="base",
                   help="tiny/base/small/medium/large-v3 (bigger = more accurate, slower)")
    p.add_argument("--grid-size", type=int, default=4, help="Frames per grid image (default 4)")
    p.add_argument("--grid-cols", type=int, default=2, help="Columns per grid image (default 2)")
    p.add_argument("--cell-width", type=int, default=760, help="Width in px of each frame in a grid (default 760)")
    p.add_argument("--describe", action="store_true",
                   help="Use the Anthropic API to describe what is clicked on screen")
    p.add_argument("--model", default="claude-sonnet-5-5", help="Claude model used with --describe")
    args = p.parse_args()

    if args.describe and not os.environ.get("ANTHROPIC_API_KEY"):
        sys.exit("--describe needs the ANTHROPIC_API_KEY environment variable set.")

    for video in args.videos:
        if not video.exists():
            sys.exit(f"File not found: {video}")
        process(video, args)


if __name__ == "__main__":
    main()
