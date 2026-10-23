# TLDR

1. Install ffmpeg
    - Mac: `brew install ffmpeg`
    - Linux: `sudo apt install ffmpeg`

2. (optional) Create/activate venv: `python3 -m venv .venv && source .venv/bin/activate`

3. Install python packages: `pip install faster-whisper pillow "av<17"`

4. (optional) Add API (if you want to use --describe) `pip install anthropic && export ANTHROPIC_API_KEY=sk-ant-your-key-here`

5. Run: `python video-walkthrough.py <PATH_TO_VIDEO>.mp4 <PATH_TO_VIDEO>.mp4 --interval 3 --whisper-model small`


# Other

video_walkthrough.py

Turn screen-recording videos into an annotated transcript:
  [0:42] "now I'll open settings"  ->  (clicks "Settings" in the left sidebar)

Steps per video:
  1. Transcribe speech with timestamps (faster-whisper, runs locally)
  2. Extract a frame every N seconds (ffmpeg), skipping near-duplicate frames
  3. Merge transcript + frames into a Markdown timeline
  4. (Optional, --describe) Ask Claude to describe what the user does on screen
     between consecutive frames, and write the result into the Markdown

Setup:
  run `pip install faster-whisper pillow anthropic` (once)
  ffmpeg must be installed and on your PATH (brew install ffmpeg / apt install ffmpeg)
  export ANTHROPIC_API_KEY=sk-ant-...      # only needed for --describe

Usage:
  python video-walkthrough.py video1.mp4 video2.mp4
  python video-walkthrough.py video1.mp4 video2.mp4 --describe
  python video-walkthrough.py *.mp4 --interval 2 --whisper-model small --describe

**Notes:**

1. Without --describe, you get the transcript grouped under screenshots, with no API calls. You can then upload the Markdown and frames to me and I'll write the click descriptions.
2. With --describe, the script sends each frame and the previous one to Claude, so it can compare them and see what changed. This costs API credits, roughly one image-pair call per frame.
3. Tuning: --interval 2 captures frames more often if clicks are getting missed. --whisper-model small or medium transcribes more accurately than the default base, but takes longer. --diff-threshold 0 keeps every frame.
4. Clicks: the script can't see a click happen, only the cursor position and what changed between frames. If the recording highlights the cursor, the descriptions will be noticeably better.
5. Model name: the default is claude-sonnet-5-5, which you can override with --model.

**Example:**

If you run `export python video_walkthrough.py video1.mp4 video2.mp4 --describe`
You'll get: a walkthrough_output/<video name>/ folder for each video, containing walkthrough.md and a frames/ folder. The Markdown is a timeline like this: