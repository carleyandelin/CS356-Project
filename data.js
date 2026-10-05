const categories = [
  {
    id: "think-play",
    label: "Think & play",
    eyebrow: "Strategy + games",
    description: "Puzzles, games, and curious challenges for a focused afternoon.",
    color: "coral",
    icon: "✦",
    cards: ["Chess", "Mahjong", "Escape Rooms", "Duo Lingo"],
  },
  {
    id: "make-create",
    label: "Make & create",
    eyebrow: "Art + making",
    description: "Hands-on hobbies where ideas become something you can see, hear, or share.",
    color: "lavender",
    icon: "✳",
    cards: ["Painting", "Nail Art", "Scrapbooking", "3D Printing", "Cosplay", "Sourdough"],
  },
  {
    id: "move-explore",
    label: "Move & explore",
    eyebrow: "Outdoors + movement",
    description: "Get outside, try something active, or find your next small adventure.",
    color: "mint",
    icon: "↗",
    cards: ["Camping", "Sailing", "Whitewater Rafting", "Rock Climbing", "Parkour", "Trampolining", "Pilates", "Jet Skiing"],
  },
  {
    id: "grow-nurture",
    label: "Grow & nurture",
    eyebrow: "Plants + patience",
    description: "Slow, rewarding rituals that grow over time.",
    color: "butter",
    icon: "⌁",
    cards: ["Bonsai", "Plant Propagation"],
  },
  {
    id: "listen-share",
    label: "Listen & share",
    eyebrow: "Music + media",
    description: "Make a soundtrack, tell a story, or bring people into the conversation.",
    color: "blue",
    icon: "◒",
    cards: ["Guitar", "DJing", "Podcasting", "Photography"],
  },
];

const hobbies = {
  Chess: { category: "think-play", blurb: "A timeless strategy game for quiet focus or friendly competition.", tags: ["indoor", "strategy", "social"], time: "15 min – 2 hrs", startingPoint: "Play one short game online or at a local club.", related: ["Mahjong", "Escape Rooms"] },
  Mahjong: { category: "think-play", blurb: "A tactile, social strategy game with a rhythm all its own.", tags: ["indoor", "strategy", "social"], time: "1 – 3 hrs", startingPoint: "Find a beginner table and learn the tiles together.", related: ["Chess", "Escape Rooms"] },
  "Escape Rooms": { category: "think-play", blurb: "Solve a story-shaped puzzle with a team and a ticking clock.", tags: ["social", "strategy", "adventure"], time: "1 – 2 hrs", startingPoint: "Book a beginner room with three friends.", related: ["Mahjong", "Cosplay"] },
  "Duo Lingo": { category: "think-play", blurb: "Build a small language habit through playful daily practice.", tags: ["learning", "solo", "10 minutes"], time: "10 – 20 min", startingPoint: "Choose a language and complete the first five-minute lesson.", related: ["Podcasting", "Chess"] },
  Painting: { category: "make-create", blurb: "Turn color, texture, and a blank surface into a practice of noticing.", tags: ["creative", "solo", "relaxing"], time: "30 min – 3 hrs", startingPoint: "Pick three colors and paint what is in front of you.", related: ["Photography", "Scrapbooking"] },
  "Nail Art": { category: "make-create", blurb: "A tiny canvas for pattern, color, and a little everyday delight.", tags: ["creative", "fashion", "solo"], time: "30 – 90 min", startingPoint: "Try one accent nail with a two-color palette.", related: ["Painting", "Cosplay"] },
  Scrapbooking: { category: "make-create", blurb: "Collect moments, paper, and stories into a tactile archive.", tags: ["creative", "collecting", "reflective"], time: "1 – 3 hrs", startingPoint: "Make one page from your last favorite day.", related: ["Photography", "Thrifting"] },
  "3D Printing": { category: "make-create", blurb: "Design a useful object, then watch an idea become physical.", tags: ["making", "learning", "tech"], time: "1 – 5 hrs", startingPoint: "Print a small, ready-made model from a library.", related: ["Painting", "Sourdough"] },
  Cosplay: { category: "make-create", blurb: "Step into a character through costume, craft, and playful world-building.", tags: ["creative", "fashion", "social"], time: "2 hrs – weeks", startingPoint: "Style a character from pieces you already own.", related: ["Nail Art", "Escape Rooms"] },
  Sourdough: { category: "make-create", blurb: "A patient kitchen ritual with a delicious, shareable finish.", tags: ["food", "making", "patient"], time: "1 hr + rest", startingPoint: "Start a small jar of beginner-friendly starter.", related: ["Bonsai", "3D Printing"] },
  Camping: { category: "move-explore", blurb: "Trade a familiar room for a night under a wider sky.", tags: ["outdoors", "social", "adventure"], time: "1 – 3 days", startingPoint: "Plan one car-camping night close to home.", related: ["Sailing", "Astronomy"] },
  Sailing: { category: "move-explore", blurb: "Learn the language of wind, water, and steady teamwork.", tags: ["outdoors", "adventure", "social"], time: "2 hrs – days", startingPoint: "Take an introductory lesson on calm water.", related: ["Camping", "Whitewater Rafting"] },
  "Whitewater Rafting": { category: "move-explore", blurb: "Follow a river’s energy and make a story with your crew.", tags: ["outdoors", "adventure", "social"], time: "1 day", startingPoint: "Join a guided trip on a beginner-friendly river.", related: ["Sailing", "Rock Climbing"] },
  "Rock Climbing": { category: "move-explore", blurb: "A physical puzzle: find your route, move with intention, repeat.", tags: ["movement", "strategy", "social"], time: "1 – 2 hrs", startingPoint: "Try a beginner route at an indoor gym.", related: ["Parkour", "Escape Rooms"] },
  Parkour: { category: "move-explore", blurb: "See the everyday environment as a playground for creative movement.", tags: ["movement", "outdoors", "skill"], time: "30 – 90 min", startingPoint: "Learn a safe landing with a qualified coach.", related: ["Rock Climbing", "Pilates"] },
  Trampolining: { category: "move-explore", blurb: "Find lift, rhythm, and a little joy in a full-body bounce.", tags: ["movement", "playful", "social"], time: "30 – 90 min", startingPoint: "Book an open-jump session and start small.", related: ["Parkour", "Pilates"] },
  Pilates: { category: "move-explore", blurb: "A mindful movement practice built around control and strength.", tags: ["movement", "wellness", "solo"], time: "30 – 60 min", startingPoint: "Follow a beginner mat session at home.", related: ["Parkour", "Trampolining"] },
  "Jet Skiing": { category: "move-explore", blurb: "A high-energy way to explore a shoreline and make a splash.", tags: ["outdoors", "adventure", "water"], time: "1 – 3 hrs", startingPoint: "Take a guided rental lesson on calm water.", related: ["Sailing", "Whitewater Rafting"] },
  Bonsai: { category: "grow-nurture", blurb: "Practice patience by shaping a living landscape over years.", tags: ["plants", "patient", "reflective"], time: "20 min / week", startingPoint: "Visit a nursery and choose a beginner tree.", related: ["Plant Propagation", "Sourdough"] },
  "Plant Propagation": { category: "grow-nurture", blurb: "Turn a small cutting into new growth and a daily moment of care.", tags: ["plants", "patient", "home"], time: "10 min / week", startingPoint: "Propagate a pothos cutting in a glass of water.", related: ["Bonsai", "Sourdough"] },
  Guitar: { category: "listen-share", blurb: "Learn the shapes and sounds that let you play along.", tags: ["music", "skill", "social"], time: "15 – 30 min", startingPoint: "Learn three chords to one favorite song.", related: ["DJing", "Podcasting"] },
  DJing: { category: "listen-share", blurb: "Shape a room’s energy by finding the perfect next track.", tags: ["music", "tech", "social"], time: "30 min – 2 hrs", startingPoint: "Make a 20-minute mix from five songs you love.", related: ["Guitar", "Podcasting"] },
  Podcasting: { category: "listen-share", blurb: "Turn curiosity into a conversation, story, or tiny broadcast.", tags: ["media", "learning", "social"], time: "1 – 3 hrs", startingPoint: "Record a five-minute conversation with a friend.", related: ["DJing", "Duo Lingo"] },
  Photography: { category: "listen-share", blurb: "Train your eye to notice the light and stories hiding in plain sight.", tags: ["creative", "outdoors", "solo"], time: "20 min – 2 hrs", startingPoint: "Take ten photos of one ordinary object.", related: ["Painting", "Scrapbooking"] },
  Thrifting: { category: "make-create", blurb: "Search, style, and give a second life to something with a story.", tags: ["fashion", "collecting", "outdoors"], time: "1 – 3 hrs", startingPoint: "Set a $10 challenge at a local secondhand shop.", related: ["Scrapbooking", "Cosplay"] },
  Astronomy: { category: "move-explore", blurb: "Look farther out and make the night sky feel familiar.", tags: ["learning", "outdoors", "reflective"], time: "30 min – 2 hrs", startingPoint: "Use a sky map to find one constellation.", related: ["Camping", "Duo Lingo"] },
};

const allHobbies = [...new Set([...categories.flatMap((category) => category.cards), "Thrifting", "Astronomy"])];

const facetGroups = [
  { id: "place", label: "Place", description: "Where the activity happens.", cards: ["Camping", "Sailing", "Whitewater Rafting", "Rock Climbing", "Parkour", "Jet Skiing", "Bonsai", "Plant Propagation", "Photography", "Thrifting", "Astronomy"] },
  { id: "motivation", label: "Motivation", description: "What a person may be seeking.", cards: ["Chess", "Mahjong", "Duo Lingo", "Painting", "Scrapbooking", "Pilates", "Bonsai", "Photography"] },
  { id: "experience", label: "Experience", description: "The kind of social or solo experience.", cards: ["Chess", "Mahjong", "Escape Rooms", "Cosplay", "Camping", "Sailing", "Whitewater Rafting", "Trampolining", "Guitar", "DJing", "Podcasting"] },
  { id: "skill", label: "Skill", description: "The primary skill or medium involved.", cards: ["Escape Rooms", "Duo Lingo", "Painting", "Nail Art", "3D Printing", "Cosplay", "Sourdough", "Rock Climbing", "Parkour", "Pilates", "Guitar", "DJing", "Podcasting"] },
  { id: "time", label: "Time", description: "A small activity or a longer commitment.", cards: ["Duo Lingo", "Nail Art", "Parkour", "Trampolining", "Pilates", "Bonsai", "Plant Propagation", "Guitar", "Photography", "Astronomy", "Sourdough", "Scrapbooking"] },
];

const sortFindings = [
  { label: "Stable pairings", value: "5", detail: "Chess + Escape Rooms, Guitar + DJing, Bonsai + Plant Propagation, and more" },
  { label: "Card sorts", value: "8", detail: "Repeated sorts helped separate durable relationships from one-off labels" },
  { label: "Ambiguous cards", value: "6", detail: "Sourdough, 3D Printing, Duo Lingo, Astronomy, Thrifting, and Rock Climbing" },
];

window.HobbyAtlasData = { allHobbies, categories, facetGroups, hobbies, sortFindings };
