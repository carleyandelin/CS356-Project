const categories = [
  {
    id: "outdoors",
    label: "Outdoors",
    eyebrow: "Adventure + exploration",
    description: "Get outside and find your next adventure.",
    color: "coral",
    icon: "✦",
    cards: ["Camping", "Fishing", "Jet Skiing", "Hydrofoils", "Boating", "Paddleboarding", "RVing", "Sailing", "Horseback Riding", "Snorkeling", "Fossil Hunting", "Birdwatching", "Snowshoeing", "Skydiving", "Whitewater Rafting", "Freediving", "Hiking/Trail Walking"],
  },
  {
    id: "movement",
    label: "Movement",
    eyebrow: "Activity + wellness",
    description: "Build strength, skill, and momentum through active hobbies.",
    color: "lavender",
    icon: "✳",
    cards: ["Pilates", "Pickleball", "Swimming", "Bowling", "Disc Golf", "Cycling", "Parkour", "Running", "Skateboarding", "Yoga", "Martial Arts", "Rock Climbing", "BMX", "Weightlifting", "Fencing", "Table Tennis", "Trampolining", "Calisthenics"],
  },
  {
    id: "learning",
    label: "Learning",
    eyebrow: "Curiosity + skill",
    description: "Practice a new skill or follow a question further.",
    color: "mint",
    icon: "↗",
    cards: ["Duo Lingo", "Coding", "3D Printing", "Astronomy"],
  },
  {
    id: "cultivating",
    label: "Cultivating",
    eyebrow: "Patience + care",
    description: "Nurture something patiently and watch it develop.",
    color: "butter",
    icon: "⌁",
    cards: ["Gardening", "Plant Propagation", "Meditation", "Bonsai"],
    facets: [
      { id: "homestead", label: "Homestead", description: "Build practical home and kitchen skills through patient, hands-on routines.", cards: ["Canning", "Sourdough", "Candle Making", "Soap Making", "Cake Decorating", "Barbecue/Smoking", "Chicken Keeping", "Beekeeping"] },
    ],
  },
  {
    id: "games",
    label: "Games",
    eyebrow: "Play + strategy",
    description: "Play, solve, and compete with a little friendly strategy.",
    color: "blue",
    icon: "◒",
    cards: ["Mahjong", "Gaming", "Chess", "Paintball", "Puzzles", "Magic", "Escape Rooms", "Trivia", "LEGO Building"],
  },
  {
    id: "creative-outlets",
    label: "Creative outlets",
    eyebrow: "Art + media + collecting",
    description: "Make, document, share, and collect things that matter to you.",
    color: "lavender",
    icon: "✳",
    facets: [
      { id: "art", label: "Art", description: "Make images, designs, and expressive objects.", cards: ["Bedazzling", "Painting", "Crochet", "Air dry clay", "Pottery", "Scrapbooking", "Journaling", "Bag charms", "Calligraphy", "Coloring", "Poetry", "Juggling", "Balloon Animals", "Embroidery", "Origami", "Cosplaying", "Quilting", "Resin Art", "Model Kit Building", "Jewelry Making", "Slime Making", "Nail Art", "Makeup Artistry", "Graphic Design", "Flower Pressing", "Tie-Dye"] },
      { id: "media", label: "Media", description: "Create and share music, stories, and photographs.", cards: ["Concerts", "Photography", "Videography", "Guitar", "Voice lessons", "Beatboxing", "Podcasting", "DJing"] },
      { id: "collecting", label: "Collecting", description: "Gather, preserve, and give meaning to objects and memories.", cards: ["Watches", "Thrifting/Antiquing", "Bag charms", "Fidget Trading", "Vinyl Records"] },
    ],
  },
];

const hobbies = {
  Chess: { category: "games", blurb: "A timeless strategy game for quiet focus or friendly competition.", tags: ["indoor", "strategy", "social"], time: "15 min – 2 hrs", startingPoint: "Play one short game online or at a local club.", related: ["Mahjong", "Escape Rooms"] },
  Mahjong: { category: "games", blurb: "A tactile, social strategy game with a rhythm all its own.", tags: ["indoor", "strategy", "social"], time: "1 – 3 hrs", startingPoint: "Find a beginner table and learn the tiles together.", related: ["Chess", "Escape Rooms"] },
  "Escape Rooms": { category: "games", blurb: "Solve a story-shaped puzzle with a team and a ticking clock.", tags: ["social", "strategy", "adventure"], time: "1 – 2 hrs", startingPoint: "Book a beginner room with three friends.", related: ["Mahjong", "Cosplay"] },
  "Duo Lingo": { category: "learning", blurb: "Build a small language habit through playful daily practice.", tags: ["learning", "solo", "10 minutes"], time: "10 – 20 min", startingPoint: "Choose a language and complete the first five-minute lesson.", related: ["Podcasting", "Chess"] },
  Painting: { category: "creative-outlets", blurb: "Turn color, texture, and a blank surface into a practice of noticing.", tags: ["creative", "solo", "relaxing"], time: "30 min – 3 hrs", startingPoint: "Pick three colors and paint what is in front of you.", related: ["Photography", "Scrapbooking"] },
  "Nail Art": { category: "creative-outlets", blurb: "A tiny canvas for pattern, color, and a little everyday delight.", tags: ["creative", "fashion", "solo"], time: "30 – 90 min", startingPoint: "Try one accent nail with a two-color palette.", related: ["Painting", "Cosplay"] },
  Scrapbooking: { category: "creative-outlets", blurb: "Collect moments, paper, and stories into a tactile archive.", tags: ["creative", "collecting", "reflective"], time: "1 – 3 hrs", startingPoint: "Make one page from your last favorite day.", related: ["Photography", "Thrifting/Antiquing"] },
  "3D Printing": { category: "learning", blurb: "Design a useful object, then watch an idea become physical.", tags: ["making", "learning", "tech"], time: "1 – 5 hrs", startingPoint: "Print a small, ready-made model from a library.", related: ["Painting", "Sourdough"] },
  Cosplay: { category: "creative-outlets", blurb: "Step into a character through costume, craft, and playful world-building.", tags: ["creative", "fashion", "social"], time: "2 hrs – weeks", startingPoint: "Style a character from pieces you already own.", related: ["Nail Art", "Escape Rooms"] },
  Sourdough: { category: "cultivating", blurb: "A patient kitchen ritual with a delicious, shareable finish.", tags: ["food", "making", "patient"], time: "1 hr + rest", startingPoint: "Start a small jar of beginner-friendly starter.", related: ["Bonsai", "3D Printing"] },
  Camping: { category: "outdoors", blurb: "Trade a familiar room for a night under a wider sky.", tags: ["outdoors", "social", "adventure"], time: "1 – 3 days", startingPoint: "Plan one car-camping night close to home.", related: ["Sailing", "Astronomy"] },
  Sailing: { category: "outdoors", blurb: "Learn the language of wind, water, and steady teamwork.", tags: ["outdoors", "adventure", "social"], time: "2 hrs – days", startingPoint: "Take an introductory lesson on calm water.", related: ["Camping", "Whitewater Rafting"] },
  "Whitewater Rafting": { category: "outdoors", blurb: "Follow a river’s energy and make a story with your crew.", tags: ["outdoors", "adventure", "social"], time: "1 day", startingPoint: "Join a guided trip on a beginner-friendly river.", related: ["Sailing", "Rock Climbing"] },
  "Rock Climbing": { category: "movement", blurb: "A physical puzzle: find your route, move with intention, repeat.", tags: ["movement", "strategy", "social"], time: "1 – 2 hrs", startingPoint: "Try a beginner route at an indoor gym.", related: ["Parkour", "Escape Rooms"] },
  Parkour: { category: "movement", blurb: "See the everyday environment as a playground for creative movement.", tags: ["movement", "outdoors", "skill"], time: "30 – 90 min", startingPoint: "Learn a safe landing with a qualified coach.", related: ["Rock Climbing", "Pilates"] },
  Trampolining: { category: "movement", blurb: "Find lift, rhythm, and a little joy in a full-body bounce.", tags: ["movement", "playful", "social"], time: "30 – 90 min", startingPoint: "Book an open-jump session and start small.", related: ["Parkour", "Pilates"] },
  Pilates: { category: "movement", blurb: "A mindful movement practice built around control and strength.", tags: ["movement", "wellness", "solo"], time: "30 – 60 min", startingPoint: "Follow a beginner mat session at home.", related: ["Parkour", "Trampolining"] },
  "Jet Skiing": { category: "outdoors", blurb: "A high-energy way to explore a shoreline and make a splash.", tags: ["outdoors", "adventure", "water"], time: "1 – 3 hrs", startingPoint: "Take a guided rental lesson on calm water.", related: ["Sailing", "Whitewater Rafting"] },
  Bonsai: { category: "cultivating", blurb: "Practice patience by shaping a living landscape over years.", tags: ["plants", "patient", "reflective"], time: "20 min / week", startingPoint: "Visit a nursery and choose a beginner tree.", related: ["Plant Propagation", "Sourdough"] },
  "Plant Propagation": { category: "cultivating", blurb: "Turn a small cutting into new growth and a daily moment of care.", tags: ["plants", "patient", "home"], time: "10 min / week", startingPoint: "Propagate a pothos cutting in a glass of water.", related: ["Bonsai", "Sourdough"] },
  Guitar: { category: "creative-outlets", blurb: "Learn the shapes and sounds that let you play along.", tags: ["music", "skill", "social"], time: "15 – 30 min", startingPoint: "Learn three chords to one favorite song.", related: ["DJing", "Podcasting"] },
  DJing: { category: "creative-outlets", blurb: "Shape a room’s energy by finding the perfect next track.", tags: ["music", "tech", "social"], time: "30 min – 2 hrs", startingPoint: "Make a 20-minute mix from five songs you love.", related: ["Guitar", "Podcasting"] },
  Podcasting: { category: "creative-outlets", blurb: "Turn curiosity into a conversation, story, or tiny broadcast.", tags: ["media", "learning", "social"], time: "1 – 3 hrs", startingPoint: "Record a five-minute conversation with a friend.", related: ["DJing", "Duo Lingo"] },
  Photography: { category: "creative-outlets", blurb: "Train your eye to notice the light and stories hiding in plain sight.", tags: ["creative", "outdoors", "solo"], time: "20 min – 2 hrs", startingPoint: "Take ten photos of one ordinary object.", related: ["Painting", "Scrapbooking"] },
  "Thrifting/Antiquing": { category: "creative-outlets", blurb: "Search, style, and give a second life to something with a story.", tags: ["fashion", "collecting", "outdoors"], time: "1 – 3 hrs", startingPoint: "Set a $10 challenge at a local secondhand shop.", related: ["Scrapbooking", "Cosplaying"] },
  Astronomy: { category: "outdoors", blurb: "Look farther out and make the night sky feel familiar.", tags: ["learning", "outdoors", "reflective"], time: "30 min – 2 hrs", startingPoint: "Use a sky map to find one constellation.", related: ["Camping", "Duo Lingo"] },
};

const hobbyNames = [...new Set(categories.flatMap((category) => [
  ...(category.cards || []),
  ...(category.facets || []).flatMap((facet) => facet.cards),
]))];

const hobbyCategoryByName = Object.fromEntries(categories.flatMap((category) => [
  ...(category.cards || []).map((name) => [name, category.id]),
  ...(category.facets || []).flatMap((facet) => facet.cards.map((name) => [name, category.id])),
]));

hobbyNames.forEach((name) => {
  hobbies[name] ||= {
    category: hobbyCategoryByName[name],
    blurb: `Explore ${name.toLowerCase()} as a hobby that fits your interests.`,
    tags: ["hobby", "exploration"],
    time: "Start at your own pace",
    startingPoint: `Find a beginner-friendly way to try ${name.toLowerCase()}.`,
    related: [],
  };
  hobbies[name].category = hobbyCategoryByName[name];
});

const allHobbies = hobbyNames;

const sortFindings = [
  { label: "Stable pairings", value: "5", detail: "Chess + Escape Rooms, Guitar + DJing, Bonsai + Plant Propagation, and more" },
  { label: "Card sorts", value: "8", detail: "Repeated sorts helped separate durable relationships from one-off labels" },
  { label: "Ambiguous cards", value: "6", detail: "Sourdough, 3D Printing, Duo Lingo, Astronomy, Thrifting, and Rock Climbing" },
];

window.HobbyAtlasData = { allHobbies, categories, hobbies, sortFindings };
