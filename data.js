const categories = [
  {
    id: "outdoors",
    label: "Outdoors",
    eyebrow: "Adventure + exploration",
    description: "Get outside and find your next adventure.",
    color: "coral",
    icon: "\u2746",
    facets: [
      {
        id: "on-the-water",
        label: "On the Water",
        description: "Water-based adventures and aquatic hobbies.",
        img: "https://source.unsplash.com/800x500/?kayak,ocean,water",
        cards: ["Fishing","Jet Skiing","Hydrofoils","Boating","Paddleboarding","Sailing","Snorkeling","Freediving","Whitewater Rafting"],
      },
      {
        id: "on-land-trails",
        label: "On Land & Trails",
        description: "Explore the outdoors on foot, trail, or road.",
        img: "https://source.unsplash.com/800x500/?hiking,trail,forest",
        cards: ["Camping","RVing","Horseback Riding","Snowshoeing","Hiking/Trail Walking","Fossil Hunting","Birdwatching","Cycling","Fishing"],
      },
      {
        id: "air-thrill",
        label: "Air & Thrill",
        description: "High-altitude and adrenaline-fueled adventures.",
        img: "https://source.unsplash.com/800x500/?skydiving,mountain,sky",
        cards: ["Skydiving","Astronomy"],
      },
    ],
  },
  {
    id: "movement",
    label: "Movement",
    eyebrow: "Activity + wellness",
    description: "Build strength, skill, and momentum through active hobbies.",
    color: "lavender",
    icon: "\u2733",
    facets: [
      {
        id: "wellness-mind-body",
        label: "Wellness & Mind-Body",
        description: "Hobbies that center the mind and nurture the body.",
        cards: ["Pilates","Yoga","Calisthenics","Meditation"],
      },
      {
        id: "sport-competition",
        label: "Sport & Competition",
        description: "Structured games and athletic competition.",
        cards: ["Pickleball","Bowling","Disc Golf","Martial Arts","Fencing","Table Tennis","Rock Climbing","BMX"],
      },
      {
        id: "fitness-training",
        label: "Fitness & Training",
        description: "Build endurance, strength, and physical fitness.",
        cards: ["Swimming","Cycling","Running","Weightlifting","Calisthenics","Pilates","Trampolining"],
      },
      {
        id: "wheels-tricks",
        label: "Wheels & Tricks",
        description: "Move fast, go big, and master your board or bike.",
        cards: ["Skateboarding","BMX","Parkour","Trampolining","Cycling"],
      },
    ],
  },
  {
    id: "home-garden",
    label: "Home & Garden",
    eyebrow: "Patience + care",
    description: "Grow, make, and tend to things that nourish your home.",
    color: "butter",
    icon: "\u2381",
    facets: [
      {
        id: "plants-growing",
        label: "Plants & Growing",
        description: "Grow and tend to living things.",
        cards: ["Gardening","Plant Propagation","Bonsai","Flower Pressing"],
      },
      {
        id: "kitchen-food",
        label: "Kitchen & Food",
        description: "Make food and preserve flavors from scratch.",
        cards: ["Sourdough","Canning","Cake Decorating","Barbecue/Smoking"],
      },
      {
        id: "home-craft-facet",
        label: "Home Craft",
        description: "Make practical and beautiful things for the home.",
        cards: ["Candle Making","Soap Making","Antiquing","Crochet","Embroidery","Quilting"],
      },
      {
        id: "backyard-keeping",
        label: "Backyard & Keeping",
        description: "Raise and care for animals at home.",
        cards: ["Chicken Keeping","Beekeeping"],
      },
    ],
  },
  {
    id: "games",
    label: "Games",
    eyebrow: "Play + strategy",
    description: "Play, solve, and compete with a little friendly strategy.",
    color: "blue",
    icon: "\u25d2",
    facets: [
      {
        id: "tabletop",
        label: "Tabletop",
        description: "Sit-down games of strategy, skill, and imagination.",
        cards: ["Mahjong","Chess","Puzzles","LEGO Building","Magic"],
      },
      {
        id: "teams",
        label: "Teams",
        description: "Games built around groups competing or collaborating together.",
        cards: ["Paintball","Trivia","Escape Rooms","Video Games","Bowling","Disc Golf","Fidget Trading","Pickleball","Table Tennis"],
      },
    ],
  },
  {
    id: "creative-outlets",
    label: "Creative Outlets",
    eyebrow: "Art + media + collecting",
    description: "Make, document, share, and collect things that matter to you.",
    color: "lavender",
    icon: "\u2733",
    facets: [
      {
        id: "collecting",
        label: "Collecting",
        description: "Gather, preserve, and give meaning to objects and memories.",
        cards: ["Watches","Thrifting","Antiquing","Fidget Trading","Vinyl Records","Bag charms","Fossil Hunting","LEGO Building","Model Kit Building"],
      },
      {
        id: "music-performance",
        label: "Music & Performance",
        description: "Create and share music and live performances.",
        cards: ["Guitar","Voice lessons","Beatboxing","DJing","Concerts","Vinyl Records"],
      },
      {
        id: "film-audio",
        label: "Film & Audio",
        description: "Capture, produce, and share visual and audio stories.",
        cards: ["Photography","Videography","Podcasting"],
      },
      {
        id: "art",
        label: "Art",
        description: "Make images, designs, and expressive objects.",
        facets: [
          {
            id: "visual-art",
            label: "Visual Art",
            description: "Create images, designs, and visual works.",
            cards: ["Painting","Graphic Design","Coloring","Air dry clay","Cake Decorating","Flower Pressing"],
          },
          {
            id: "words-story",
            label: "Words & Story",
            description: "Express ideas and feelings through writing.",
            cards: ["Poetry","Journaling","Calligraphy","Podcasting"],
          },
          {
            id: "novelty",
            label: "Novelty",
            description: "Playful performance arts and crowd-pleasing skills.",
            cards: ["Juggling","Balloon Animals","Beatboxing","Magic","Slime Making"],
          },
          {
            id: "craft",
            label: "Craft",
            description: "Make something tangible by hand.",
            facets: [
              {
                id: "needle-thread",
                label: "Needle & Thread",
                description: "Create with fabric and thread.",
                cards: ["Quilting","Crochet","Embroidery"],
              },
              {
                id: "paper-flat",
                label: "Paper & Flat",
                description: "Create with paper, ink, and pressed materials.",
                cards: ["Scrapbooking","Calligraphy","Flower Pressing","Origami"],
              },
              {
                id: "build-create",
                label: "Build & Create",
                description: "Shape, mold, and construct physical objects.",
                cards: ["Pottery","Air dry clay","Resin Art","Origami","Model Kit Building","Slime Making","Bedazzling","Tie-Dye","3D Printing","Bag charms","Candle Making","Jewelry Making"],
              },
            ],
          },
          {
            id: "fashion-beauty",
            label: "Fashion & Beauty",
            description: "Create and adorn wearable art and expressive looks.",
            cards: ["Cosplaying","Nail Art","Makeup Artistry","Jewelry Making","Bag charms","Bedazzling","Thrifting","Tie-Dye"],
          },
        ],
      },
    ],
  },
  {
    id: "education-tech",
    label: "Education & Tech",
    eyebrow: "Curiosity + skill",
    description: "Practice a new skill or follow a question further.",
    color: "mint",
    icon: "\u2197",
    cards: ["Duo Lingo","Coding","3D Printing","Astronomy","Chess","Fossil Hunting","Video Games","Videography"],
  },
];

const hobbies = {
  Chess: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/chess",  blurb: "A timeless strategy game for quiet focus or friendly competition.", why: "All you need is a board and a worthy opponent. Openings are memorized, but real chess happens when neither of you knows what to do next. Even a slow loss teaches you something.", tags: ["indoor","strategy","social"], time: "15 min – 2 hrs", startingPoint: "Play one short game online or at a local club.", related: ["Mahjong","Escape Rooms","Puzzles","Video Games"] },
  Mahjong: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/mahjong",  blurb: "A tactile, social strategy game with a rhythm all its own.", why: "The tiles click and shuffle and suddenly two hours have disappeared. Pick them up, build your hand, and enjoy the rhythm of strategy hiding inside a very social game.", tags: ["indoor","strategy","social"], time: "1 – 3 hrs", startingPoint: "Find a beginner table and learn the tiles together.", related: ["Chess","Escape Rooms","Puzzles","Trivia"] },
  "Escape Rooms": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/escape_room",  blurb: "Solve a story-shaped puzzle with a team and a ticking clock.", why: "There are padlocks everywhere, a ticking clock, and someone in your group who refuses to share what they found. It is chaotic and perfect and you will argue productively about it for an hour after.", tags: ["social","strategy","adventure"], time: "1 – 2 hrs", startingPoint: "Book a beginner room with three friends.", related: ["Mahjong","Cosplaying","Puzzles","Trivia"] },
  "Duo Lingo": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/duo_lingo",  blurb: "Build a small language habit through playful daily practice.", why: "The owl is relentless and kind of right. Five minutes a day adds up faster than you expect, and the first time you understand a song lyric in another language feels genuinely magical.", tags: ["learning","solo","10 minutes"], time: "10 – 20 min", startingPoint: "Choose a language and complete the first five-minute lesson.", related: ["Podcasting","Chess","Calligraphy","Concerts"] },
  Painting: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/painting", blurb: "Turn color, texture, and a blank surface into a practice of noticing.", why: "You do not need talent, you need a surface and something to put on it. The first few paintings are terrible in the most instructive way possible, and then one day something clicks.", tags: ["creative","solo","relaxing"], time: "30 min – 3 hrs", startingPoint: "Pick three colors and paint what is in front of you.", related: ["Photography","Scrapbooking","Coloring","Graphic Design"] },
  "Nail Art": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/nail-art", blurb: "A tiny canvas for pattern, color, and a little everyday delight.", why: "Ten tiny canvases that you carry around all week. Start with a dot and a stripe on one accent nail and see how far down the rabbit hole you want to go.", tags: ["creative","fashion","solo"], time: "30 – 90 min", startingPoint: "Try one accent nail with a two-color palette.", related: ["Painting","Cosplaying","Makeup Artistry","Jewelry Making"] },
  Scrapbooking: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/scrapbooking", blurb: "Collect moments, paper, and stories into a tactile archive.", why: "Ticket stubs, birthday cards, blurry photos from a good night. Glue them down and give them a little label and suddenly they are a story instead of a pile.", tags: ["creative","collecting","reflective"], time: "1 – 3 hrs", startingPoint: "Make one page from your last favorite day.", related: ["Photography","Thrifting","Journaling","Coloring"] },
  "3D Printing": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/3d_printing",  blurb: "Design a useful object, then watch an idea become physical.", why: "You design the thing, or download the thing, and then you just wait while a machine makes it real. Watching the first layer go down never gets old.", tags: ["making","learning","tech"], time: "1 – 5 hrs", startingPoint: "Print a small, ready-made model from a library.", related: ["Painting","Sourdough","LEGO Building","Coding"] },
  Cosplaying: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/cosplaying", blurb: "Step into a character through costume, craft, and playful world-building.", why: "Pick a character you love and figure out how to wear them. Half the fun is the problem-solving, and the other half is finding your people at the event.", tags: ["creative","fashion","social"], time: "2 hrs – weeks", startingPoint: "Style a character from pieces you already own.", related: ["Nail Art","Escape Rooms","Thrifting","Makeup Artistry"] },
  Sourdough: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/sourdough",  blurb: "A patient kitchen ritual with a delicious, shareable finish.", why: "You will kill the starter once, name the second one, and bake your first real loaf on the third try. The wait between steps is half the ritual.", tags: ["food","making","patient"], time: "1 hr + rest", startingPoint: "Start a small jar of beginner-friendly starter.", related: ["Bonsai","3D Printing","Canning","Gardening"] },
  Camping: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/camping",  blurb: "Trade a familiar room for a night under a wider sky.", why: "There are no notifications in the woods, which sounds terrible until you try it. Pack a little heavier than you think you need to, and you will still have forgotten something.", tags: ["outdoors","social","adventure"], time: "1 – 3 days", startingPoint: "Plan one car-camping night close to home.", related: ["Sailing","Astronomy","Hiking/Trail Walking","Birdwatching"] },
  Sailing: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/sailing",  blurb: "Learn the language of wind, water, and steady teamwork.", why: "The wind does most of the work, and your job is to have a conversation with it. The moment the engine goes off and the sail fills is one of the better moments a person can have.", tags: ["outdoors","adventure","social"], time: "2 hrs – days", startingPoint: "Take an introductory lesson on calm water.", related: ["Camping","Whitewater Rafting","Fishing","Paddleboarding"] },
  "Whitewater Rafting": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/whitewater_rafting",  blurb: "Follow a river's energy and make a story with your crew.", why: "You will get soaked, you will panic briefly, and you will immediately want to do it again. The river does not care about your plans, and that is the whole point.", tags: ["outdoors","adventure","social"], time: "1 day", startingPoint: "Join a guided trip on a beginner-friendly river.", related: ["Sailing","Rock Climbing","Swimming","Jet Skiing"] },
  "Rock Climbing": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/rock_climbing",  blurb: "A physical puzzle: find your route, move with intention, repeat.", why: "Every route is a different puzzle and your whole body has to solve it. You will stare at a move for ten minutes and then your arms will just figure it out.", tags: ["movement","strategy","social"], time: "1 – 2 hrs", startingPoint: "Try a beginner route at an indoor gym.", related: ["Parkour","Escape Rooms","Skateboarding","Martial Arts"] },
  Parkour: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/parkour",  blurb: "See the everyday environment as a playground for creative movement.", why: "A staircase railing becomes a balance beam and a concrete ledge becomes a starting point. The city looks completely different once you start thinking about it this way.", tags: ["movement","outdoors","skill"], time: "30 – 90 min", startingPoint: "Learn a safe landing with a qualified coach.", related: ["Rock Climbing","Pilates","Skateboarding","BMX"] },
  Trampolining: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/trampolining",  blurb: "Find lift, rhythm, and a little joy in a full-body bounce.", why: "The first time you get real height, your stomach catches up a half second later. There are no small victories here, every successful trick is completely thrilling.", tags: ["movement","playful","social"], time: "30 – 90 min", startingPoint: "Book an open-jump session and start small.", related: ["Parkour","Pilates","Skateboarding","Yoga"] },
  Pilates: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/pilates",  blurb: "A mindful movement practice built around control and strength.", why: "Slower than it looks and harder than it looks. Thirty minutes in and your core is doing things it never knew it was supposed to do.", tags: ["movement","wellness","solo"], time: "30 – 60 min", startingPoint: "Follow a beginner mat session at home.", related: ["Parkour","Trampolining","Yoga","Swimming"] },
  "Jet Skiing": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/jetskiing",  blurb: "A high-energy way to explore a shoreline and make a splash.", why: "The throttle feels enormous until you give it a little twist and the whole shoreline opens up. Try going slow first, and then do not.", tags: ["outdoors","adventure","water"], time: "1 – 3 hrs", startingPoint: "Take a guided rental lesson on calm water.", related: ["Sailing","Whitewater Rafting","Paddleboarding","Swimming"] },
  Bonsai: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/bonsai",  blurb: "Practice patience by shaping a living landscape over years.", why: "This is a hobby measured in years, not sessions. You are not growing a tree, you are growing patience with visible results and very small scissors.", tags: ["plants","patient","reflective"], time: "20 min / week", startingPoint: "Visit a nursery and choose a beginner tree.", related: ["Plant Propagation","Sourdough","Gardening","Flower Pressing"] },
  "Plant Propagation": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/plant_propagation",  blurb: "Turn a small cutting into new growth and a daily moment of care.", why: "Cut a stem, put it in water, wait two weeks, and watch a little nub of root appear. Something that was part of another plant is now its own thing, and you made that happen.", tags: ["plants","patient","home"], time: "10 min / week", startingPoint: "Propagate a pothos cutting in a glass of water.", related: ["Bonsai","Sourdough","Gardening","Flower Pressing"] },
  Guitar: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/guitar", blurb: "Learn the shapes and sounds that let you play along.", why: "Your fingers will hurt for two weeks and then the calluses arrive and suddenly chords are just chords. Strum one bad song all the way through on day one, you are a guitar player.", tags: ["music","skill","social"], time: "15 – 30 min", startingPoint: "Learn three chords to one favorite song.", related: ["DJing","Podcasting","Voice lessons","Concerts"] },
  DJing: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/djing", blurb: "Shape a room's energy by finding the perfect next track.", why: "Two tracks, one headphone on and one off, and your whole job is to make the next song feel inevitable. Getting one mix exactly right is one of the best feelings in music.", tags: ["music","tech","social"], time: "30 min – 2 hrs", startingPoint: "Make a 20-minute mix from five songs you love.", related: ["Guitar","Podcasting","Concerts","Beatboxing"] },
  Podcasting: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/podcasting", blurb: "Turn curiosity into a conversation, story, or tiny broadcast.", why: "The recording is always worse than you expected and the editing makes it better than you hoped. Hit publish once, just to get past the part where you are waiting to be ready.", tags: ["media","learning","social"], time: "1 – 3 hrs", startingPoint: "Record a five-minute conversation with a friend.", related: ["DJing","Duo Lingo","Guitar","Videography"] },
  Photography: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/photography", blurb: "Train your eye to notice the light and stories hiding in plain sight.", why: "You already have a camera in your pocket. Go outside with no plan and take fifty pictures of whatever stops you. One of them will be good, and that is enough.", tags: ["creative","outdoors","solo"], time: "20 min – 2 hrs", startingPoint: "Take ten photos of one ordinary object.", related: ["Painting","Scrapbooking","Videography","Birdwatching"] },
  Thrifting: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/thrifting", blurb: "Hunt secondhand shops for hidden gems and give clothes a second life.", why: "The good stuff is never where you expect it. Give yourself two hours, no list, and a small budget, and see what follows you home.", tags: ["fashion","collecting","outdoors"], time: "1 – 3 hrs", startingPoint: "Set a $10 challenge at a local secondhand shop.", related: ["Antiquing","Cosplaying","Scrapbooking","Watches"] },
  Antiquing: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/antiquing", blurb: "Search markets and shops for vintage objects with history and character.", why: "Every object in the shop had a previous life. Read the price tag and then read the thing itself and figure out which story is more interesting.", tags: ["collecting","outdoors","patient"], time: "1 – 3 hrs", startingPoint: "Visit one antique market and find something under $20.", related: ["Thrifting","Scrapbooking","Watches","Fossil Hunting"] },
  Astronomy: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/astronomy",  blurb: "Look farther out and make the night sky feel familiar.", why: "The sky is enormous and the apps make it navigable. Find one thing, really find it, name the stars around it, and that part of the sky is yours now.", tags: ["learning","outdoors","reflective"], time: "30 min – 2 hrs", startingPoint: "Use a sky map to find one constellation.", related: ["Camping","Duo Lingo","Birdwatching","Fossil Hunting"] },
  Fishing: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/fishing",  blurb: "Catch fish using a rod, line, and a little patience.", why: "Most of fishing is sitting and noticing things. Something might bite, something might not, and either way you sat by the water for a few hours, which is its own reward.", tags: ["outdoors","relaxing","solo"], time: "2 – 4 hrs", startingPoint: "Watch a tutorial on how to use a fishing rod.", related: ["Boating","Camping","Birdwatching","Hiking/Trail Walking"] },
  Hydrofoils: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/hydrofoiling",  blurb: "Glide above the water on a board lifted by underwater wings.", why: "The board skims and then lifts and for a second you are not sure what is happening to your legs. It clicks fast once it clicks and then you are just gliding.", tags: ["outdoors","adventure","water"], time: "1 – 2 hrs", startingPoint: "Watch a short hydrofoil ride and learn how the board lifts.", related: ["Paddleboarding","Boating","Jet Skiing","Sailing"] },
  Boating: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/boating",  blurb: "Spend time on the water in a boat.", why: "Throttle up, leave the dock behind, and watch the water do that thing where it opens up ahead of you. No agenda, no timeline, just pick a direction.", tags: ["outdoors","relaxing","social"], time: "2 – 4 hrs", startingPoint: "Take a short boat ride with someone experienced.", related: ["Fishing","Sailing","Paddleboarding","Jet Skiing"] },
  Paddleboarding: { img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/paddle_boarding", blurb: "Balance on a board and move across calm water with a paddle.", why: "Start on your knees, find your balance, and then try standing. The water is warm enough to fall in. That is all the permission you need.", tags: ["outdoors","water","fitness"], time: "1 – 2 hrs", startingPoint: "Rent a board and try kneeling on calm water.", related: ["Snorkeling","Boating","Swimming","Sailing"] },
  RVing: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/rving",  blurb: "Travel and camp with the comforts of a home on wheels.", why: "The kitchen travels with you. Wake up somewhere completely different and make coffee before anyone else is moving. It costs less than you think to go a lot further.", tags: ["outdoors","travel","social"], time: "1 – 2 days", startingPoint: "Tour a local RV and plan a one-night route.", related: ["Camping","Hiking/Trail Walking","Boating","Birdwatching"] },
  "Horseback Riding": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/horseback_riding",  blurb: "Explore trails and practice riding with a horse.", why: "The horse already knows what it is doing. Your job is to stay on, relax, and eventually learn how to ask rather than tell. Trail rides through the trees are worth the price of admission alone.", tags: ["outdoors","animals","skill"], time: "1 – 2 hrs", startingPoint: "Book a guided beginner trail ride.", related: ["Camping","Hiking/Trail Walking","Birdwatching","Fossil Hunting"] },
  Snorkeling: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/snorkeling",  blurb: "Float at the surface while viewing underwater life.", why: "Put your face in the water and realize there has been a completely separate world happening down there the whole time. Even a shallow reef is overwhelming in the best way.", tags: ["outdoors","water","exploration"], time: "1 – 2 hrs", startingPoint: "Practice breathing through a mask in shallow water.", related: ["Freediving","Swimming","Paddleboarding","Fishing"] },
  "Fossil Hunting": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/fossil_hunting",  blurb: "Search rocks and earth for preserved traces of ancient life.", why: "This rock holds something that walked around 65 million years ago. Brush carefully, take your time, and do not assume the weird shape is just a rock until you look closely.", tags: ["outdoors","learning","solo"], time: "2 – 4 hrs", startingPoint: "Visit a public fossil bed with a small brush.", related: ["Hiking/Trail Walking","Birdwatching","Antiquing","Astronomy"] },
  Birdwatching: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/bird_watching",  blurb: "Observe and identify birds in their natural habitats.", why: "You have probably walked past a dozen interesting birds today without noticing. Once you start looking, the sky fills up with characters you never knew had names.", tags: ["outdoors","learning","patient"], time: "30 – 60 min", startingPoint: "Spot three birds with a free field guide.", related: ["Hiking/Trail Walking","Photography","Fossil Hunting","Camping"] },
  Snowshoeing: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/snowshoeing",  blurb: "Walk across snowy trails with wide shoes that keep you afloat.", why: "The world is quieter under snow and wider without a trail. Strap on the shoes, pick a direction, and discover what the familiar places look like when they are buried.", tags: ["outdoors","winter","fitness"], time: "1 – 3 hrs", startingPoint: "Rent snowshoes and take a short marked trail.", related: ["Hiking/Trail Walking","Camping","Birdwatching","Photography"] },
  Skydiving: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/sky_diving",  blurb: "Free-fall through the sky before gliding safely to the ground.", why: "The plane ride up is the nerve-wracking part. The freefall is too loud and fast for nerves, and the canopy ride down is the most peaceful two minutes of your life.", tags: ["outdoors","adventure","thrill"], time: "3 – 5 hrs", startingPoint: "Book a tandem jump with a certified instructor.", related: ["Rock Climbing","BMX","Whitewater Rafting","Parkour"] },
  Freediving: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/free_diving",  blurb: "Explore underwater on a single breath.", why: "Hold your breath, go down, and enter a world that does not make sound the same way. The surface looks beautiful from below, and you have more breath than you think you do.", tags: ["outdoors","water","fitness"], time: "1 – 2 hrs", startingPoint: "Take a beginner breathwork and safety class.", related: ["Snorkeling","Swimming","Paddleboarding","Yoga"] },
  "Hiking/Trail Walking": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/hiking",  blurb: "Walk through natural spaces on marked or unmarked trails.", why: "Put on shoes you trust, fill a water bottle, and pick a trail. The hard part is starting. Twenty minutes in, your head is quieter and the trees are taller than you remembered.", tags: ["outdoors","fitness","solo"], time: "1 – 3 hrs", startingPoint: "Walk one easy local trail.", related: ["Camping","Birdwatching","Fossil Hunting","Photography"] },
  "Disc Golf": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/disc_golf",  blurb: "Throw flying discs toward a series of targets across a course.", why: "The frisbee in the basket sounds like a little victory bell. Courses are free, the discs are cheap, and you will spend the whole round convinced you are about to break your personal record.", tags: ["outdoors","sport","social"], time: "1 – 2 hrs", startingPoint: "Play the first three holes at a nearby course.", related: ["Pickleball","Camping","Hiking/Trail Walking","Paintball"] },
  Pickleball: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/pickle_ball",  blurb: "Play a paddle sport that combines tennis, badminton, and ping-pong.", why: "Smaller court than tennis, wilder rallies, and everyone there will teach you how to play. It is extremely fun to be a beginner at this one.", tags: ["sport","social","fitness"], time: "1 – 2 hrs", startingPoint: "Borrow a paddle and play one beginner game.", related: ["Disc Golf","Table Tennis","Bowling","Fencing"] },
  Paintball: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/paintball",  blurb: "Compete in teams while tagging opponents with paint-filled pellets.", why: "A paintball to the arm stings for about three seconds and then you forget it because you are completely focused on surviving the next thirty. It is fully immersive in a way that is hard to replicate.", tags: ["social","adventure","team"], time: "2 – 3 hrs", startingPoint: "Join an open beginner paintball session.", related: ["Escape Rooms","Disc Golf","Rock Climbing","Martial Arts"] },
  Swimming: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/swimming",  blurb: "Move through water for exercise, recreation, or sport.", why: "The water holds you up and drowns out the noise at the same time. A lap pool is one of the best places to think through a problem or to not think about anything at all.", tags: ["fitness","water","solo"], time: "30 – 60 min", startingPoint: "Swim ten easy laps at a local pool.", related: ["Snorkeling","Yoga","Freediving","Pilates"] },
  Bowling: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/bowling",  blurb: "Roll a heavy ball to knock down pins.", why: "The pins reset and you get another chance immediately. Perfect conditions for showing off to people who care about you and are very easy to impress.", tags: ["sport","social","indoor"], time: "1 – 2 hrs", startingPoint: "Bowl one game with friends.", related: ["Table Tennis","Trivia","Pickleball","Escape Rooms"] },
  Cycling: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/cycling",  blurb: "Ride a bicycle for travel, exercise, or exploration.", why: "Your commute becomes the best part of the day. Your weekend becomes longer. Things that were too far to walk are suddenly reasonable, and the city starts to feel smaller.", tags: ["fitness","outdoors","solo"], time: "1 – 2 hrs", startingPoint: "Ride a flat two-mile route.", related: ["Running","Hiking/Trail Walking","Paddleboarding","Disc Golf"] },
  Running: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/running",  blurb: "Move at a steady pace on foot for fitness or fun.", why: "The first five minutes are always the hardest. After that something shifts and you stop bargaining with yourself. There is a specific kind of quiet at mile three that is hard to find anywhere else.", tags: ["fitness","solo","outdoors"], time: "20 – 40 min", startingPoint: "Walk for five minutes, then jog for one.", related: ["Cycling","Calisthenics","Yoga","Hiking/Trail Walking"] },
  Skateboarding: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/skateboarding",  blurb: "Ride and perform tricks on a wheeled board.", why: "The concrete is your whole world for a few hours. You are going to fall, and every fall is feedback, and eventually the board feels like it is part of your feet.", tags: ["skill","outdoors","solo"], time: "30 – 60 min", startingPoint: "Practice standing and balancing on a board.", related: ["BMX","Parkour","Cycling","Rock Climbing"] },
  Yoga: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/yoga",  blurb: "Use movement, balance, and breathing to support strength and calm.", why: "The poses that look impossible become possible faster than you expect. Show up to the mat even when you do not feel like it, especially then, because that is usually when it helps the most.", tags: ["wellness","solo","fitness"], time: "10 – 30 min", startingPoint: "Follow a ten-minute beginner yoga video.", related: ["Pilates","Meditation","Running","Swimming"] },
  Meditation: { img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/meditation", blurb: "Practice focused attention and quiet awareness.", why: "You will not feel peaceful the first time, but you will feel it eventually, and once you know what that feels like, you know what you are practicing toward.", tags: ["wellness","solo","mindfulness"], time: "2 – 15 min", startingPoint: "Set a timer for two quiet minutes.", related: ["Yoga","Journaling","Bonsai","Poetry"] },
  "Martial Arts": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/martial_arts",  blurb: "Learn disciplined movements for self-defense, fitness, and focus.", why: "You are learning how to move your body in ways it has never moved before. The technique comes slowly and then it clicks and suddenly you feel completely different in your own skin.", tags: ["sport","skill","fitness"], time: "1 – 2 hrs", startingPoint: "Attend an introductory class.", related: ["Fencing","Calisthenics","Rock Climbing","Swimming"] },
  BMX: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/bmx",  blurb: "Ride a small bike built for jumps, tricks, and technical riding.", why: "Find a small hill, ride it, figure out what the bike wants to do, and then ask it for more. There is a whole subculture of people who are extremely happy to teach you what they know.", tags: ["skill","outdoors","thrill"], time: "30 – 90 min", startingPoint: "Practice riding and braking in an empty lot.", related: ["Skateboarding","Cycling","Parkour","Rock Climbing"] },
  Weightlifting: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/weightlifting",  blurb: "Build strength by training with weights.", why: "Progress is visible. You lifted that, and now you can lift more, and the chart only goes in one direction. Few hobbies give you this kind of reliable feedback.", tags: ["fitness","solo","strength"], time: "45 – 75 min", startingPoint: "Learn three basic lifts with a coach.", related: ["Calisthenics","Martial Arts","Running","Pilates"] },
  Fencing: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/fencing",  blurb: "Practice fast, strategic swordplay with a protective foil, épée, or sabre.", why: "The moment the bout starts, everything outside the strip disappears. Your whole brain is reading the person in front of you, and you are thinking three moves ahead with your feet.", tags: ["sport","skill","social"], time: "1 – 2 hrs", startingPoint: "Try a beginner lesson at a local club.", related: ["Martial Arts","Table Tennis","Rock Climbing","Escape Rooms"] },
  "Table Tennis": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/table_tennis",  blurb: "Rally a lightweight ball across a table with paddles.", why: "The ball moves faster than you expect, and your reflexes are better than you know. A good rally feels like a conversation where both people are listening.", tags: ["sport","social","indoor"], time: "30 – 60 min", startingPoint: "Rally ten shots with a partner.", related: ["Pickleball","Bowling","Disc Golf","Fencing"] },
  Calisthenics: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/calisthenics",  blurb: "Build strength using bodyweight movements.", why: "Every public park is already your gym. You can get strong with just your body weight, and the first time you hold a solid plank for a full minute, something shifts.", tags: ["fitness","solo","strength"], time: "20 – 40 min", startingPoint: "Try five squats, push-ups, and lunges.", related: ["Weightlifting","Yoga","Running","Rock Climbing"] },
  Coding: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/coding",  blurb: "Create instructions that tell computers what to do.", why: "The first thing you build will be tiny and you will be unreasonably proud of it. That is correct. Build the next thing from there.", tags: ["learning","tech","creative"], time: "30 – 90 min", startingPoint: "Make a tiny webpage with one button.", related: ["3D Printing","Graphic Design","Puzzles","Video Games"] },
  Gardening: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/gardening",  blurb: "Grow and care for plants in soil or containers.", why: "Put a seed in dirt, water it, and come back in a week. Something will have happened. That small something is the beginning of a completely absorbing relationship with the ground.", tags: ["plants","outdoors","patient"], time: "30 – 60 min", startingPoint: "Plant one herb in a sunny pot.", related: ["Plant Propagation","Bonsai","Flower Pressing","Canning"] },
  Canning: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/canning",  blurb: "Preserve food in sealed jars for longer storage.", why: "August peaches become February jam, and the pop of a sealed lid is one of the most satisfying sounds in a kitchen. Start with something sweet before you try vegetables.", tags: ["food","making","patient"], time: "2 – 4 hrs", startingPoint: "Follow a tested recipe for one small batch.", related: ["Sourdough","Gardening","Barbecue/Smoking","Cake Decorating"] },
  "Candle Making": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/candle_making",  blurb: "Create candles by melting wax around a wick.", why: "Warm wax, a single wick, and whatever scent makes the room smell like a place you want to be. Your first candle will be slightly crooked and completely pleasant.", tags: ["making","home","creative"], time: "1 – 2 hrs", startingPoint: "Make one candle from a beginner kit.", related: ["Soap Making","Resin Art","Air dry clay","Flower Pressing"] },
  "Soap Making": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/soap_making",  blurb: "Make bars of soap by combining oils with a cleansing base.", why: "You mix two things that become one completely different thing, and it cleans your hands when it is done. The colorful ones look like candy, and the scented ones make the whole bathroom feel intentional.", tags: ["making","home","creative"], time: "1 – 2 hrs", startingPoint: "Try a melt-and-pour soap kit.", related: ["Candle Making","Gardening","Resin Art","Flower Pressing"] },
  "Cake Decorating": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/cake_decorating",  blurb: "Decorate cakes with frosting, piping, and edible details.", why: "A crumb coat, a spatula, and a lot of patience. The piping takes practice, but the good news is that ugly cakes taste exactly the same as pretty ones, so you are always winning.", tags: ["food","creative","making"], time: "30 – 90 min", startingPoint: "Pipe simple stars onto a cupcake.", related: ["Painting","Sourdough","Coloring","Candle Making"] },
  "Barbecue/Smoking": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/barbecuing",  blurb: "Cook food slowly over smoke or live fire.", why: "The smoke does the seasoning and the time does the tenderizing. Everything gets better around a fire with people who brought snacks to tide them over.", tags: ["food","outdoors","patient"], time: "4 – 8 hrs", startingPoint: "Smoke one small batch of chicken.", related: ["Camping","Canning","Sourdough","Gardening"] },
  "Chicken Keeping": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/chicken_keeping",  blurb: "Care for backyard chickens and collect fresh eggs.", why: "There are exactly three sounds when you open the coop in the morning: the rooster who is very sure of himself, the hens rushing toward you, and then nothing but the yard. It becomes very routine very fast.", tags: ["animals","home","patient"], time: "20 – 30 min/day", startingPoint: "Visit a coop and learn the daily routine.", related: ["Gardening","Beekeeping","Plant Propagation","Bonsai"] },
  Beekeeping: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/beekeeping",  blurb: "Maintain bee colonies and learn how honey is made.", why: "A hive has fifty thousand decisions happening simultaneously and you can hear all of them through the wood. The bees almost never bother you if you move slowly and mean it.", tags: ["animals","outdoors","patient"], time: "1 – 2 hrs", startingPoint: "Tour a local apiary with a beekeeper.", related: ["Gardening","Chicken Keeping","Flower Pressing","Canning"] },
  "Video Games": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/video_games",  blurb: "Play video or tabletop games for challenge and fun.", why: "There is always one more objective, one more upgrade, one more mystery to solve. The worlds are enormous and the stakes are not real, which is exactly what makes them so relaxing.", tags: ["indoor","strategy","social"], time: "30 min – 2 hrs", startingPoint: "Play one beginner-friendly game for 30 minutes.", related: ["Puzzles","Chess","Escape Rooms","LEGO Building"] },
  Puzzles: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/puzzles",  blurb: "Solve pieces, clues, or patterns to complete a larger challenge.", why: "Find the edge pieces first and then argue with yourself about the middle sections. A thousand-piece puzzle on a rainy weekend is a completely acceptable use of a day.", tags: ["indoor","solo","patient"], time: "1 – 3 hrs", startingPoint: "Complete a 100-piece puzzle.", related: ["Escape Rooms","Chess","Video Games","Model Kit Building"] },
  Magic: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/magic",  blurb: "Learn illusions and techniques that create surprising effects.", why: "The trick is only half the thing. The other half is the look on someone's face right after you do it. Find one trick, learn it completely, and practice it until it feels honest.", tags: ["skill","social","performance"], time: "15 – 30 min", startingPoint: "Learn one simple card trick.", related: ["Juggling","Balloon Animals","Cosplaying","Escape Rooms"] },
  Trivia: {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/trivia",  blurb: "Test your knowledge by answering questions across many topics.", why: "Something you learned in seventh grade saves the day and everyone is unreasonably impressed. Write down the questions your team gets wrong. Review them before next time. Get very serious about this.", tags: ["social","learning","indoor"], time: "1 – 2 hrs", startingPoint: "Join a local trivia night.", related: ["Chess","Escape Rooms","Puzzles","Mahjong"] },
  "LEGO Building": {img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/building_legos",  blurb: "Build models and inventions from interlocking LEGO pieces.", why: "Open the bag, sort the pieces, ignore the instructions on the second build. Every set becomes raw materials eventually, and the creations you make from scratch are the ones that stay on the shelf.", tags: ["making","creative","indoor"], time: "1 – 3 hrs", startingPoint: "Build one small set without instructions.", related: ["Model Kit Building","3D Printing","Puzzles","Coding"] },
  Bedazzling: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/bedazzling", blurb: "Decorate clothing or accessories with sparkling gems.", why: "Take a plain piece of clothing and make it yours. Start with a small pattern on a pocket or a cuff, and figure out how much sparkle is enough, which might be more than you think.", tags: ["creative","fashion","making"], time: "30 – 60 min", startingPoint: "Add gems to one small accessory.", related: ["Nail Art","Jewelry Making","Tie-Dye","Thrifting"] },
  Crochet: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/crochet", blurb: "Create fabric by looping yarn with a single hook.", why: "Hook, yarn, chain, repeat. The first stitch feels impossible and then it becomes automatic and suddenly you are making things while watching something else. This is time that did not feel like time.", tags: ["making","creative","patient"], time: "30 – 60 min", startingPoint: "Learn the chain stitch with one hook.", related: ["Embroidery","Quilting","Jewelry Making","Tie-Dye"] },
  "Air dry clay": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/air-dry-clay", blurb: "Shape small sculptures that harden without a kiln.", why: "Grab a lump of clay and start smooshing. Wonky is charming, mistakes become features, and your first lopsided little bowl might just end up on your shelf forever. No kiln, no studio, no problem.", tags: ["making","creative","solo"], time: "1 – 2 hrs", startingPoint: "Shape one small pinch pot.", related: ["Pottery","Resin Art","Origami","Candle Making"] },
  Pottery: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/pottery", blurb: "Form objects from clay by hand or on a pottery wheel.", why: "The clay does what it wants at first and then you and the clay work something out together. The imperfect ones look the most like handmade things, which is exactly what they are.", tags: ["making","creative","skill"], time: "2 – 3 hrs", startingPoint: "Take a beginner wheel or hand-building class.", related: ["Air dry clay","Painting","Resin Art","Candle Making"] },
  Journaling: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/journaling", blurb: "Record thoughts, observations, or memories in writing.", why: "Write three sentences today and do not read them until six months from now. You will be surprised what you cared about and surprised that you have gotten better at a few of those things.", tags: ["reflective","solo","writing"], time: "5 – 15 min", startingPoint: "Write three sentences about today.", related: ["Poetry","Scrapbooking","Calligraphy","Coloring"] },
  "Bag charms": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/bag-charms", blurb: "Make small decorative charms to attach to a bag.", why: "A bag charm is an outfit decision that costs four dollars and takes thirty minutes. String beads, add a button, clip it on, and suddenly your everyday bag has a signature.", tags: ["creative","making","fashion"], time: "30 – 60 min", startingPoint: "Make one charm from beads or buttons.", related: ["Jewelry Making","Bedazzling","Thrifting","Nail Art"] },
  Calligraphy: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/calligraphy", blurb: "Create expressive lettering with careful strokes and spacing.", why: "The first thirty minutes are humbling and the next thirty are meditative. Slow the pen down, let the ink flow, and watch letters become something closer to drawing.", tags: ["creative","writing","skill"], time: "20 – 40 min", startingPoint: "Practice one alphabet with a brush pen.", related: ["Journaling","Graphic Design","Flower Pressing","Scrapbooking"] },
  Coloring: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/coloring", blurb: "Fill illustrations with color as a relaxing creative practice.", why: "No pressure to be original, no blank page, no mistakes. Pick up the pencil and fill in the shape and do not think about anything else for a while. That is the whole assignment.", tags: ["creative","solo","relaxing"], time: "20 – 60 min", startingPoint: "Color one page with three colors.", related: ["Painting","Flower Pressing","Journaling","Scrapbooking"] },
  Poetry: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/poetry", blurb: "Use rhythm, imagery, and words to express an idea or feeling.", why: "Say the thing you cannot say in regular sentences. Pick the most specific image you can find and put it next to something you feel. That is close enough to poetry to count.", tags: ["writing","creative","reflective"], time: "15 – 30 min", startingPoint: "Write a four-line poem about something nearby.", related: ["Journaling","Voice lessons","Calligraphy","Scrapbooking"] },
  Juggling: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/juggling", blurb: "Keep multiple objects moving through the air in a pattern.", why: "One ball, then two, then three. The pattern is not complicated, your hands just need to learn it separately from your brain. Give it three sessions before you decide how you feel about it.", tags: ["skill","performance","solo"], time: "15 – 30 min", startingPoint: "Practice tossing one ball between hands.", related: ["Balloon Animals","Magic","Parkour","Disc Golf"] },
  "Balloon Animals": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/balloon_animals", blurb: "Twist balloons into playful figures and shapes.", why: "The first dog will look more like a sword, and that is fine, call it a sword. The technique takes one afternoon and then you have a party trick for the rest of your life.", tags: ["skill","performance","social"], time: "30 – 60 min", startingPoint: "Make a simple balloon dog while following a tutorial.", related: ["Juggling","Magic","Origami","Cosplaying"] },
  Embroidery: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/embroidery", blurb: "Decorate fabric with stitched designs.", why: "A hoop, some thread, and a simple design. The stitching is slow in the best way, and finished embroidery on fabric or clothing looks like something that took much longer than it did.", tags: ["making","creative","patient"], time: "30 – 60 min", startingPoint: "Learn a running stitch on scrap fabric.", related: ["Crochet","Quilting","Scrapbooking","Flower Pressing"] },
  Origami: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/origami", blurb: "Fold paper into sculptures, animals, and geometric forms.", why: "One uncut square of paper becomes something recognizable through pure geometry. The crane is the gateway fold, and once you make one without instructions you will want to make another.", tags: ["making","creative","solo"], time: "15 – 30 min", startingPoint: "Fold one paper crane.", related: ["Air dry clay","Calligraphy","Flower Pressing","Scrapbooking"] },
  Quilting: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/quilting", blurb: "Join layers of fabric into a patterned, warm textile.", why: "Cut the fabric into pieces and then put it back together in a pattern you designed. The finished quilt goes on a bed and gets used every day, which is more than most things you make can say.", tags: ["making","creative","patient"], time: "1 – 3 hrs", startingPoint: "Piece two fabric squares together.", related: ["Crochet","Embroidery","Scrapbooking","Flower Pressing"] },
  "Resin Art": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/resin-art", blurb: "Create glossy decorative pieces by setting colored resin.", why: "Pour the resin, add color, swirl, and then walk away and do not touch it for twelve hours. Opening the mold is the best part, because it is always clearer and glossier than you imagined.", tags: ["making","creative","visual"], time: "2 – 4 hrs", startingPoint: "Make one small resin coaster with a kit.", related: ["Jewelry Making","Air dry clay","Candle Making","Painting"] },
  "Model Kit Building": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/model-kit-building", blurb: "Assemble and detail small scale models.", why: "You open the box and there are a hundred tiny pieces and by the time you are done you will know what each one is for. The painting takes as long as the building.", tags: ["making","patient","solo"], time: "2 – 5 hrs", startingPoint: "Assemble one small snap-fit model.", related: ["LEGO Building","3D Printing","Puzzles","Graphic Design"] },
  "Jewelry Making": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/jewelry-making", blurb: "Design wearable pieces with beads, wire, metal, or cord.", why: "Design something you would actually wear and then wear it. Once you know what it takes to make a piece of jewelry, you see store-bought pieces completely differently.", tags: ["making","creative","fashion"], time: "1 – 2 hrs", startingPoint: "Make one bracelet with elastic cord.", related: ["Bag charms","Resin Art","Nail Art","Bedazzling"] },
  "Slime Making": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/slime_making", blurb: "Mix stretchy, tactile slime in different colors and textures.", why: "The ratio is the whole game. Get it exactly right and it stretches clear across the room and snaps back with a satisfying click. Get it wrong and you have glue soup, which is still fun.", tags: ["making","creative","playful"], time: "20 – 30 min", startingPoint: "Mix one small batch of slime.", related: ["Air dry clay","Resin Art","Balloon Animals","Candle Making"] },
  "Makeup Artistry": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/make-up-artistry", blurb: "Use makeup to create expressive looks and designs.", why: "The face is a surface and you can do whatever you want to it. Start with the eyes, because you can see what is happening, and try one thing you have never tried before each time you sit down.", tags: ["creative","fashion","skill"], time: "30 – 60 min", startingPoint: "Practice one simple eyeshadow look.", related: ["Nail Art","Cosplaying","Bag charms","Graphic Design"] },
  "Graphic Design": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/graphic_design", blurb: "Combine type, color, and images to communicate visually.", why: "You have an opinion about fonts, you just have not expressed it yet. Pick two and put them together and see which combination looks like something you would actually trust.", tags: ["creative","tech","visual"], time: "1 – 2 hrs", startingPoint: "Make a simple poster with two fonts.", related: ["Photography","Painting","Coding","Videography"] },
  "Flower Pressing": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/flower-pressing", blurb: "Flatten and preserve flowers for art and keepsakes.", why: "Put a flower between two heavy books and check back in a week. The color fades slightly and the whole thing flattens out and becomes something you can keep for years.", tags: ["creative","plants","patient"], time: "15 – 30 min + 1 week press", startingPoint: "Press a few fresh flowers in a book.", related: ["Gardening","Scrapbooking","Journaling","Calligraphy"] },
  "Tie-Dye": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/tie-dye", blurb: "Create colorful patterns by folding, tying, and dyeing fabric.", why: "Wet the shirt, rubber-band it into something that looks like a mess, add the dye, and then open it an hour later. The results are always better than the plan.", tags: ["creative","making","colorful"], time: "2 – 4 hrs", startingPoint: "Tie-dye one plain cotton shirt.", related: ["Painting","Quilting","Embroidery","Bedazzling"] },
  Concerts: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/concerts", blurb: "Experience live music and the energy of a performing artist.", why: "A good live show is different from any recording. The room vibrates, the set list is a surprise, and something about standing in a crowd hearing the same thing feels like a very good reason to go outside.", tags: ["music","social","experience"], time: "2 – 4 hrs", startingPoint: "Find a small local show and buy one ticket.", related: ["Guitar","DJing","Podcasting","Vinyl Records"] },
  Videography: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/videography", blurb: "Record and edit moving images to tell a story.", why: "Everything looks better through a frame with intention. Shoot something you care about, watch it back, and notice what you would have done differently. Do that next time.", tags: ["media","creative","tech"], time: "1 – 2 hrs", startingPoint: "Shoot a 30-second video about your day.", related: ["Photography","Podcasting","Graphic Design","Concerts"] },
  "Voice lessons": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/voice_lessons", blurb: "Develop singing technique, pitch, and breath control.", why: "Your voice is an instrument you have had your whole life without a manual. A few sessions and you learn what support means, and then singing in the car becomes a completely different experience.", tags: ["music","skill","performance"], time: "30 – 60 min", startingPoint: "Practice one song with a vocal warm-up.", related: ["Guitar","Beatboxing","Podcasting","Concerts"] },
  Beatboxing: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/beatboxing", blurb: "Make rhythmic sounds and musical beats with your voice.", why: "Your mouth can make a kick drum, a hi-hat, and a snare at the same time. It takes about thirty minutes to believe this, and a few months to actually do it, and it is worth both.", tags: ["music","skill","performance"], time: "15 – 30 min", startingPoint: "Practice a basic kick-and-snare pattern.", related: ["Voice lessons","DJing","Guitar","Podcasting"] },
  Watches: {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/watches", blurb: "Study, collect, or repair timepieces and their mechanisms.", why: "Turn one over, pop the case, and look at the movement. Hundreds of tiny parts that have been keeping the same rhythm since someone made them by hand. The mechanical ones have a pulse you can feel.", tags: ["collecting","learning","patient"], time: "30 – 60 min", startingPoint: "Learn the parts of one favorite watch.", related: ["Vinyl Records","Thrifting","Antiquing","Fossil Hunting"] },
  "Fidget Trading": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/fidget_trading", blurb: "Collect and exchange small tactile toys with other people.", why: "The fidget community runs entirely on vibes and generosity. You carry a few extras, someone likes one, you swap, everyone wins. Social without being a whole event.", tags: ["collecting","social","playful"], time: "15 – 30 min", startingPoint: "Trade one fidget with a friend.", related: ["Bag charms","Video Games","LEGO Building","Jewelry Making"] },
  "Vinyl Records": {
      img: "https://res.cloudinary.com/nxwrbcvt/image/upload/f_auto,q_auto,w_600,h_600,c_fill/vinyl_records", blurb: "Collect and listen to music on physical vinyl records.", why: "Put the record on, flip it halfway through, and commit to two uninterrupted sides. The warmth is real, the ritual is the point, and the album art is something you actually get to look at.", tags: ["collecting","music","patient"], time: "30 – 60 min", startingPoint: "Play one record from start to finish.", related: ["Concerts","DJing","Guitar","Watches"] },
};

// Recursively collect all cards from a facet tree (handles nested facets)
function collectFacetCards(facet) {
  return [
    ...(facet.cards || []),
    ...(facet.facets || []).flatMap(collectFacetCards),
  ];
}

// Recursively find a facet by id anywhere in the tree
function findFacet(facets, id) {
  for (const f of facets) {
    if (f.id === id) return f;
    if (f.facets) {
      const found = findFacet(f.facets, id);
      if (found) return found;
    }
  }
  return null;
}

const hobbyNames = [...new Set(categories.flatMap((category) => [
  ...(category.cards || []),
  ...(category.facets || []).flatMap(collectFacetCards),
]))].sort((a, b) => a.localeCompare(b));

const hobbyCategoryByName = Object.fromEntries(categories.flatMap((category) => [
  ...(category.cards || []).map((name) => [name, category.id]),
  ...(category.facets || []).flatMap((facet) =>
    collectFacetCards(facet).map((name) => [name, category.id])
  ),
]));

const hobbyCategoryIdsByName = Object.fromEntries(hobbyNames.map((name) => [
  name,
  categories
    .filter((category) =>
      (category.cards || []).includes(name) ||
      (category.facets || []).some((facet) => collectFacetCards(facet).includes(name))
    )
    .map((category) => category.id),
]));

hobbyNames.forEach((name) => {
  if (hobbies[name]) {
    hobbies[name].category = hobbyCategoryByName[name];
    hobbies[name].categoryIds = hobbyCategoryIdsByName[name];
    hobbies[name].summary = hobbies[name].summary || hobbies[name].blurb;
  }
});

const allHobbies = hobbyNames;

const hobbyIntroVideos = {
  "3D Printing": "https://youtu.be/2vFdwz4U1VQ",
  "Air dry clay": "https://youtu.be/e4lYE5yoVPU",
  "Antiquing": "https://youtu.be/7zXe4WpJFK0",
  "Astronomy": "https://youtu.be/5Kbh3x5TwAU",
  "Bag charms": "https://youtu.be/IXWWZq1EhiI",
  "Balloon Animals": "https://youtu.be/wiXGUY-Ba1I",
  "Barbecue/Smoking": "https://youtu.be/yPAeRiKa0h8",
  "Beatboxing": "https://youtu.be/X2bzi7sUnnM",
  "Bedazzling": "https://youtu.be/M0Lqt0CvrcA",
  "Beekeeping": "https://youtu.be/jeFxOUZreXI",
  "Birdwatching": "https://youtu.be/DSIhFy6tlvI",
  "BMX": "https://youtu.be/Zxo5AQedP3M",
  "Boating": "https://youtu.be/6auqfARAOlU",
  "Bonsai": "https://youtu.be/9pObLDgaBf4",
  "Bowling": "https://youtu.be/TnPE2u7IfvU",
  "Cake Decorating": "https://youtu.be/DD3isr2W0V8",
  "Calisthenics": "https://youtu.be/BhXy55JO3vw",
  "Calligraphy": "https://youtu.be/nj962-cU2PQ",
  "Camping": "https://youtu.be/GrCrmBz6fBA",
  "Candle Making": "https://youtu.be/FxW5eR7Uv3o",
  "Canning": "https://youtu.be/xFEW3yZ42HE",
  "Chess": "https://youtu.be/hF4X7ZkaRTE",
  "Chicken Keeping": "https://youtu.be/6DtfXDKSITk",
  "Coding": "https://youtu.be/lj1AxGnIs5g",
  "Coloring": "https://youtu.be/Ezcz9l3JWEg",
  "Concerts": "https://youtu.be/ATqsHGjlhio",
  "Cosplaying": "https://youtu.be/U_KB51_03Bg",
  "Crochet": "https://youtu.be/aAxGTnVNJiE",
  "Cycling": "https://youtu.be/JGhWkTRxSjk",
  "Disc Golf": "https://youtu.be/WJRNK0eKuNw",
  "DJing": "https://youtu.be/O-pdaMnOJBQ",
  "Duo Lingo": "https://youtu.be/ZPll7lNrsec",
  "Embroidery": "https://youtu.be/aQEbtmsC2fU",
  "Escape Rooms": "https://youtu.be/GvUU9zhV-9A",
  "Fencing": "https://youtu.be/kTw05gC2T9Y",
  "Fidget Trading": "https://youtu.be/jxxDtl-xyoA",
  "Fishing": "https://youtu.be/Vo1YRxxAx2g",
  "Flower Pressing": "https://youtu.be/eBwvQgLZyZQ",
  "Fossil Hunting": "https://youtu.be/1CRoLajT53s",
  "Freediving": "https://youtu.be/HHwLAlQTCCA",
  "Gardening": "https://youtu.be/LAU6qu_dKBk",
  "Graphic Design": "https://youtu.be/dFSia1LZI4Y",
  "Guitar": "https://youtu.be/-X84GG06g-c",
  "Hiking/Trail Walking": "https://youtu.be/upj7N22EMZA",
  "Horseback Riding": "https://youtu.be/jByGqv0Wt-Q",
  "Hydrofoils": "https://youtu.be/fX-r0COL-xA",
  "Jet Skiing": "https://youtu.be/z5v8CIUDJeE",
  "Jewelry Making": "https://youtu.be/Y83sDpQHcHg",
  "Journaling": "https://youtu.be/MXITTbeLDfA",
  "Juggling": "https://youtu.be/dCYDZDlcO6g",
  "LEGO Building": "https://youtu.be/AzHSTxmle3E",
  "Magic": "https://youtu.be/AGDn-c95-o4",
  "Mahjong": "https://youtu.be/qpYF-xmNMew",
  "Makeup Artistry": "https://youtu.be/K3l-HKcNXQo",
  "Martial Arts": "https://youtu.be/_91IJWdT-Iw",
  "Meditation": "https://youtu.be/k0PSUDvLi8E",
  "Model Kit Building": "https://youtu.be/YfjsSMOnmdA",
  "Nail Art": "https://youtu.be/0RKdjyonbWc",
  "Origami": "https://youtu.be/FDH6U1wmazg",
  "Paddleboarding": "https://youtu.be/yubSCrsmBaU",
  "Paintball": "https://youtu.be/z7_OhXfOUDs",
  "Painting": "https://youtu.be/Wla7FB3Vrm0",
  "Parkour": "https://youtu.be/DxEomfCerLY",
  "Photography": "https://youtu.be/ppTr4NVqWgI",
  "Pickleball": "https://youtu.be/rD1O3R9B0Sw",
  "Pilates": "https://youtu.be/CdjRQ6GG8bA",
  "Plant Propagation": "https://youtu.be/_YFf4vqcqhY",
  "Podcasting": "https://youtu.be/1ljTathnfBI",
  "Poetry": "https://youtu.be/ImBO35GznsY",
  "Pottery": "https://youtu.be/Tllu3Qae9g0",
  "Puzzles": "https://youtu.be/K9WqHYd5Y_o",
  "Quilting": "https://youtu.be/5963SW0MILU",
  "Resin Art": "https://youtu.be/mzWqFyhMGhw",
  "Rock Climbing": "https://youtu.be/S-4XZgARAuA",
  "Running": "https://youtu.be/kVnyY17VS9Y",
  "RVing": "https://youtu.be/xLARpnU1e08",
  "Sailing": "https://youtu.be/s18eJD1fLko",
  "Scrapbooking": "https://youtu.be/vMZ0_ADjCzY",
  "Skateboarding": "https://youtu.be/D09NjLWrpB8",
  "Skydiving": "https://youtu.be/8tixsMIOGrw",
  "Slime Making": "https://youtu.be/H9ZhNuo7I9g",
  "Snorkeling": "https://youtu.be/ha1Pk5ndHmY",
  "Snowshoeing": "https://youtu.be/qf2n_oW_CQI",
  "Soap Making": "https://youtu.be/8bKpLWNqAGs",
  "Sourdough": "https://youtu.be/s8dQ2hnYqp0",
  "Swimming": "https://youtu.be/xVeXGKPOH58",
  "Table Tennis": "https://youtu.be/k-MzcgTA-Mw",
  "Thrifting": "https://youtu.be/zG8E9k9WZxk",
  "Tie-Dye": "https://youtu.be/v-BvyNgrthg",
  "Trampolining": "https://youtu.be/8WlJQ2FisI0",
  "Trivia": "https://youtu.be/3ShqXh5tI1s",
  "Video Games": "https://youtu.be/tar9g1qKrDM",
  "Videography": "https://youtu.be/x1WMLywZWGM",
  "Vinyl Records": "https://youtu.be/bCS5nuG80LQ",
  "Voice lessons": "https://youtu.be/jog-nfLldRI",
  "Watches": "https://youtu.be/AdJkqGo_9Qk",
  "Weightlifting": "https://youtu.be/-yz8uI1V6GY",
  "Whitewater Rafting": "https://youtu.be/yuQchF7T2zc",
  "Yoga": "https://youtu.be/j7rKKpwdXNE",
};

const hobbyDetails = {
  "3D Printing": {cost: "$$$", equipment: "Printer, filament or resin, slicer software, tools", community: "Maker spaces, printer clubs"},
  "Air dry clay": {cost: "$", equipment: "Clay, tools, water, acrylic paint, sealant", community: "Craft groups, maker spaces"},
  "Antiquing": {cost: "$$", equipment: "Research guides/apps, measuring tape, transport budget", community: "Antique malls, collector clubs, estate-sale groups"},
  "Astronomy": {cost: "free", equipment: "A clear night sky; binoculars or a telescope are optional", community: "Astronomy clubs, planetariums, dark-sky groups"},
  "Bag charms": {cost: "$", equipment: "Charms, key rings, beads, pliers, clips", community: "Craft fairs, charm swaps, fashion groups"},
  "Balloon Animals": {cost: "$", equipment: "Modeling balloons, hand pump, instructions", community: "Circus groups, entertainer workshops"},
  "Barbecue/Smoking": {cost: "$$", equipment: "Smoker/grill, fuel, thermometer, wood, meat", community: "BBQ clubs, cook-offs"},
  "Beatboxing": {cost: "free", equipment: "Your voice; a metronome or practice app is optional", community: "Beatbox circles, open mics, online groups"},
  "Bedazzling": {cost: "$", equipment: "Rhinestones, glue or applicator, garments, tweezers", community: "Fashion-craft and DIY groups"},
  "Beekeeping": {cost: "$$$", equipment: "Hive, bees, veil/suit, gloves, smoker, hive tool", community: "Beekeepers’ associations, mentor programs"},
  "Birdwatching": {cost: "free", equipment: "A place to observe birds; binoculars and a field guide are optional", community: "Birding walks, Audubon groups, eBird communities"},
  "BMX": {cost: "$$", equipment: "BMX bike, helmet, gloves, pads", community: "BMX parks, bike shops, riding crews"},
  "Boating": {cost: "$$$", equipment: "Boat, life jackets, safety kit, registration, fuel", community: "Marinas, yacht clubs"},
  "Bonsai": {cost: "$$", equipment: "Bonsai tree, shears, wire, soil, pot", community: "Bonsai clubs, specialty nurseries"},
  "Bowling": {cost: "$$", equipment: "Bowling shoes and ball; lane access", community: "Bowling alleys, leagues, social teams"},
  "Cake Decorating": {cost: "$$", equipment: "Cake, frosting, piping bags/tips, turntable", community: "Baking clubs, classes, cake forums"},
  "Calisthenics": {cost: "$", equipment: "Exercise clothes, pull-up bar, parallel bars", community: "Calisthenics parks, street-workout groups"},
  "Calligraphy": {cost: "$", equipment: "Pen or brush, nibs, ink, practice paper", community: "Calligraphy guilds, workshops, lettering groups"},
  "Camping": {cost: "$$", equipment: "Tent, sleeping bag, pad, stove, headlamp", community: "Camping clubs, outdoor retailers, park groups"},
  "Candle Making": {cost: "$$", equipment: "Wax, wicks, vessels, thermometer, fragrance", community: "Craft groups, workshops"},
  "Canning": {cost: "$$", equipment: "Jars, lids, canner, jar lifter, tested recipes", community: "Extension offices, preserving clubs"},
  "Chess": {cost: "$", equipment: "Chess set or app, optional clock, beginner book", community: "Chess clubs, schools, libraries, online servers"},
  "Chicken Keeping": {cost: "$$", equipment: "Coop, run, feeder, waterer, bedding, feed", community: "Poultry groups, feed stores"},
  "Coding": {cost: "free", equipment: "A computer and free code editor or browser-based tutorial", community: "Meetups, hackathons, open-source communities"},
  "Coloring": {cost: "$", equipment: "Coloring books, pencils or markers, sharpener", community: "Coloring circles, libraries, art groups"},
  "Concerts": {cost: "$$", equipment: "Tickets, transportation, earplugs, event budget", community: "Local venues, fan clubs"},
  "Cosplaying": {cost: "$$", equipment: "Costume materials, sewing or foam tools, makeup", community: "Conventions, cosplay and maker communities"},
  "Crochet": {cost: "$", equipment: "Yarn, hooks, scissors, pattern", community: "Yarn shops, crochet circles"},
  "Cycling": {cost: "$$", equipment: "Bicycle, helmet, lights, lock, repair kit", community: "Bike shops, cycling clubs, group rides"},
  "Disc Golf": {cost: "$", equipment: "Starter discs, shoes, course map", community: "Local courses, disc golf clubs"},
  "DJing": {cost: "$$", equipment: "DJ controller, laptop, headphones, DJ software", community: "DJ collectives, clubs, music schools"},
  "Duo Lingo": {cost: "$", equipment: "Phone or computer, app, headphones, notebook", community: "Language exchanges, conversation clubs"},
  "Embroidery": {cost: "$", equipment: "Hoop, fabric, floss, needles, pattern", community: "Stitching groups, craft stores"},
  "Escape Rooms": {cost: "$$", equipment: "Booking fee, team, puzzle-solving skills", community: "Escape-room venues, puzzle groups"},
  "Fencing": {cost: "$$", equipment: "Mask, jacket, glove, weapon, breeches", community: "Fencing clubs and schools"},
  "Fidget Trading": {cost: "$", equipment: "Fidget toys, storage case, value list", community: "School clubs, toy groups"},
  "Fishing": {cost: "$$", equipment: "Rod, reel, line, hooks, bait, tackle box", community: "Angling clubs, bait shops, fishing forums"},
  "Flower Pressing": {cost: "$", equipment: "Flowers, press/books, absorbent paper", community: "Botanical clubs, craft groups"},
  "Fossil Hunting": {cost: "$", equipment: "Field guide, hand lens, brush, safety glasses, permit", community: "Geological societies, museums"},
  "Freediving": {cost: "$$", equipment: "Long fins, mask, wetsuit, weight belt", community: "Freediving schools and dive clubs"},
  "Gardening": {cost: "$", equipment: "Seeds/plants, soil, containers/beds, hand tools", community: "Community gardens, clubs, nurseries"},
  "Graphic Design": {cost: "$$", equipment: "Computer, design software, optional drawing tablet", community: "Design meetups, critique groups"},
  "Guitar": {cost: "$$", equipment: "Guitar, picks, tuner, strap, lesson materials", community: "Music stores, jam groups, instructors"},
  "Hiking/Trail Walking": {cost: "free", equipment: "Shoes, water, daypack, navigation app", community: "Hiking clubs, parks, trail groups"},
  "Horseback Riding": {cost: "$$$", equipment: "Helmet, boots, lessons, horse access", community: "Stables, riding schools"},
  "Hydrofoils": {cost: "$$$", equipment: "Hydrofoil board or boat, mast, foil, helmet", community: "Foiling clubs, watersports schools"},
  "Jet Skiing": {cost: "$$$", equipment: "Personal watercraft, life jacket, trailer, fuel", community: "Marinas, PWC clubs, boating groups"},
  "Jewelry Making": {cost: "$$", equipment: "Beads or wire, pliers, cutters, findings", community: "Bead shops, craft fairs, jewelry groups"},
  "Journaling": {cost: "free", equipment: "A notes app or any paper and pen", community: "Journaling circles, stationery groups"},
  "Juggling": {cost: "free", equipment: "Soft household objects to practice with", community: "Juggling clubs, circus schools"},
  "LEGO Building": {cost: "$$", equipment: "LEGO bricks or sets, storage, building surface", community: "LEGO User Groups, conventions, builder communities"},
  "Magic": {cost: "$", equipment: "Deck of cards, beginner tricks, practice mirror", community: "Magic clubs, local shops"},
  "Mahjong": {cost: "$$", equipment: "Mahjong tile set, table, rule set", community: "Mahjong clubs, community centers, game cafés"},
  "Makeup Artistry": {cost: "$$", equipment: "Makeup palette, brushes, mirror, remover, sanitizer", community: "Beauty groups, makeup classes"},
  "Martial Arts": {cost: "$$", equipment: "Uniform, belt, optional protective gear", community: "Dojos, gyms, martial-arts associations"},
  "Meditation": {cost: "free", equipment: "A quiet space; a cushion, chair, or timer app is optional", community: "Meditation centers, mindfulness groups"},
  "Model Kit Building": {cost: "$$", equipment: "Model kit, hobby knife, nippers, cement, paints", community: "Model clubs, hobby shops"},
  "Nail Art": {cost: "$", equipment: "Polish or gel, brushes, dotting tools, remover", community: "Nail-art groups, beauty classes"},
  "Origami": {cost: "$", equipment: "Origami paper, diagrams or tutorials", community: "Origami societies, libraries"},
  "Paddleboarding": {cost: "$$", equipment: "SUP board, paddle, leash, PFD", community: "SUP clubs, rental shops, lake/beach groups"},
  "Paintball": {cost: "$$", equipment: "Marker, mask, hopper, air tank, protective clothing", community: "Paintball fields, teams"},
  "Painting": {cost: "$", equipment: "Paint, brushes, surface, palette, water container", community: "Art classes, open studios, painting groups"},
  "Parkour": {cost: "free", equipment: "Comfortable clothes and a safe practice space", community: "Parkour gyms and coached groups"},
  "Photography": {cost: "free", equipment: "A phone camera; editing software is optional", community: "Camera clubs, photo walks, galleries"},
  "Pickleball": {cost: "$", equipment: "Paddle, balls, court shoes", community: "Recreation centers, clubs, leagues"},
  "Pilates": {cost: "$", equipment: "Mat, comfortable clothes, optional bands", community: "Studios, community centers, online groups"},
  "Plant Propagation": {cost: "$", equipment: "Cuttings, pots, growing medium, labels", community: "Plant swaps, houseplant groups, nurseries"},
  "Podcasting": {cost: "$$", equipment: "Microphone, headphones, recording software, hosting", community: "Podcast networks, creator groups"},
  "Poetry": {cost: "free", equipment: "A notes app or any paper and pen", community: "Poetry slams, writing workshops, literary groups"},
  "Pottery": {cost: "$$", equipment: "Clay, tools, kiln access, apron; wheel optional", community: "Ceramic studios, pottery clubs"},
  "Puzzles": {cost: "$", equipment: "Jigsaw or logic puzzles, workspace, sorting trays", community: "Puzzle exchanges, cafés, online groups"},
  "Quilting": {cost: "$$", equipment: "Fabric, rotary cutter, mat, ruler, sewing machine", community: "Quilt guilds, fabric shops, quilting bees"},
  "Resin Art": {cost: "$$", equipment: "Epoxy resin, molds, pigments, gloves, ventilation", community: "Resin-art groups, maker spaces"},
  "Rock Climbing": {cost: "$$", equipment: "Climbing shoes, chalk, harness; ropes outdoors", community: "Climbing gyms, outdoor clubs"},
  "Running": {cost: "free", equipment: "Comfortable shoes and clothes you already have", community: "Run clubs, races, park groups"},
  "RVing": {cost: "$$$", equipment: "RV/camper, hookups, leveling gear, supplies", community: "RV clubs, campgrounds, travel groups"},
  "Sailing": {cost: "$$$", equipment: "Sailboat access, PFD, gloves, weather gear", community: "Sailing clubs and schools"},
  "Scrapbooking": {cost: "$$", equipment: "Album, paper, adhesive, scissors, photos", community: "Scrapbooking crops, craft stores"},
  "Skateboarding": {cost: "$$", equipment: "Skateboard, helmet, knee/elbow pads", community: "Skate parks, skate shops"},
  "Skydiving": {cost: "$$$", equipment: "Jump package, jumpsuit, goggles, harness", community: "Licensed drop zones and schools"},
  "Slime Making": {cost: "$", equipment: "Glue, activator, bowl, colorants, containers", community: "Craft groups, maker clubs"},
  "Snorkeling": {cost: "$", equipment: "Mask, snorkel, fins, rash guard", community: "Dive shops, reef groups, beach clubs"},
  "Snowshoeing": {cost: "$$", equipment: "Snowshoes, poles, winter boots, layers", community: "Nordic centers, hiking clubs"},
  "Soap Making": {cost: "$$", equipment: "Oils, molds, scale, goggles, gloves, lye", community: "Soap guilds, workshops"},
  "Sourdough": {cost: "$", equipment: "Flour, water, starter, jar, scale, Dutch oven", community: "Baking groups, bakeries, sourdough forums"},
  "Swimming": {cost: "$", equipment: "Swimsuit, goggles, towel, pool access", community: "Pools, masters clubs, swim teams"},
  "Table Tennis": {cost: "$", equipment: "Paddle, balls, table access, indoor shoes", community: "Clubs, recreation centers, leagues"},
  "Thrifting": {cost: "$", equipment: "Budget, reusable bags, measuring tape", community: "Thrift stores, vintage markets, resale groups"},
  "Tie-Dye": {cost: "$", equipment: "Fabric, dye, gloves, rubber bands, workspace", community: "Craft workshops, maker spaces"},
  "Trampolining": {cost: "$$", equipment: "Trampoline park access or safety-net trampoline", community: "Trampoline gyms and recreation centers"},
  "Trivia": {cost: "$", equipment: "Questions, notebook or phone, team access", community: "Pub quizzes, libraries, trivia leagues"},
  "Video Games": {cost: "$$", equipment: "Console/PC, controller, game, display, internet", community: "Gaming clubs, esports teams, Discord groups"},
  "Videography": {cost: "$$", equipment: "Camera/phone, tripod, microphone, editing software", community: "Film groups, creator meetups"},
  "Vinyl Records": {cost: "$$", equipment: "Turntable, records, speakers/headphones, cleaning brush", community: "Record stores, listening clubs, collector forums"},
  "Voice lessons": {cost: "$$", equipment: "Voice, water, practice space, vocal exercises", community: "Choirs, vocal studios, community theaters"},
  "Watches": {cost: "$$", equipment: "Watch collection, storage case, optional spring-bar tool", community: "Watch clubs, horology forums"},
  "Weightlifting": {cost: "$$", equipment: "Weights or gym membership, shoes, training log", community: "Gyms, lifting clubs, coaching groups"},
  "Whitewater Rafting": {cost: "$$", equipment: "Raft, paddle, helmet, PFD, wetsuit", community: "Outfitters, paddling clubs"},
  "Yoga": {cost: "$", equipment: "Yoga mat, clothes, optional blocks/strap", community: "Studios, parks, community classes"},
};

const sortFindings = [
  { label: "Stable pairings", value: "5", detail: "Chess + Escape Rooms, Guitar + DJing, Bonsai + Plant Propagation, and more" },
  { label: "Card sorts", value: "8", detail: "Repeated sorts helped separate durable relationships from one-off labels" },
  { label: "Ambiguous cards", value: "6", detail: "Sourdough, 3D Printing, Duo Lingo, Astronomy, Thrifting, Antiquing, and Rock Climbing" },
];

// ── Tree test tasks ────────────────────────────────────────────────────────
const tasks = [
  {
    id: "t01",
    text: "Your roommate’s been leaving a fresh sourdough loaf on the counter every Sunday. You want to try making your own starter.",
    targets: ["hobby/Sourdough", "facet/kitchen-food", "category/home-garden"],
    targetLabel: "Sourdough (Home & Garden › Kitchen & Food)",
  },
  {
    id: "t02",
    text: "You drove out to the west desert last weekend and were blown away by the stars. You want to get into stargazing as a hobby.",
    targets: ["hobby/Astronomy", "facet/air-thrill", "category/outdoors"],
    targetLabel: "Astronomy (Outdoors › Air & Thrill)",
  },
  {
    id: "t03",
    text: "A coworker keeps posting clips from the climbing gym and you want to try it.",
    targets: ["hobby/Rock Climbing", "facet/sport-competition", "category/movement"],
    targetLabel: "Rock Climbing (Movement › Sport & Competition)",
  },
  {
    id: "t04",
    text: "Your grandma made the quilt on your bed and you want to learn to make something similar by hand.",
    targets: ["hobby/Crochet", "hobby/Embroidery", "hobby/Quilting", "facet/needle-thread", "facet/craft", "facet/art", "category/creative-outlets"],
    targetLabel: "Quilting / Crochet / Embroidery (Creative Outlets › Art › Craft › Needle & Thread)",
  },
  {
    id: "t05",
    text: "Finals week wrecked you and a friend said she does a 10-minute meditation every morning to cope. You want to try something like it.",
    targets: ["hobby/Meditation", "hobby/Yoga", "hobby/Pilates", "facet/wellness-mind-body", "category/movement"],
    targetLabel: "Meditation / Yoga (Movement › Wellness & Mind-Body)",
  },
  {
    id: "t06",
    text: "You’ve always wanted to build your own app on the side but never started.",
    targets: ["hobby/Coding", "category/education-tech"],
    targetLabel: "Coding (Education & Tech)",
  },
  {
    id: "t07",
    text: "Your friend group needs something fun for Friday night that isn’t just watching a movie.",
    targets: ["hobby/Escape Rooms", "category/games"],
    targetLabel: "Escape Rooms (Games)",
  },
  {
    id: "t08",
    text: "Your brother printed a custom phone stand at school and you want to try designing and printing your own stuff at home.",
    targets: ["hobby/3D Printing", "category/education-tech"],
    targetLabel: "3D Printing (Education & Tech)",
  },
  {
    id: "t09",
    text: "You want something active you can do with a couple friends at the park on a Saturday — nothing that needs a full team.",
    targets: ["hobby/Disc Golf", "hobby/Pickleball", "hobby/Paintball", "facet/sport-competition", "category/movement"],
    targetLabel: "Disc Golf / Pickleball (Movement › Sport & Competition)",
  },
  {
    id: "t10",
    text: "You’ve been watching videos of people finding cool vintage furniture at Deseret Industries and flipping it. You want to get into that.",
    targets: ["hobby/Thrifting", "hobby/Antiquing", "facet/collecting", "category/creative-outlets"],
    targetLabel: "Thrifting / Antiquing (Creative Outlets › Collecting)",
  },
];

const searchConcepts = {
  // Astronomy / stargazing
  stargazing: ["astronomy", "stars", "night sky", "constellation", "telescope", "space", "cosmos"],

  // Mindfulness
  meditation: ["mindfulness", "calm", "stress relief", "morning practice", "breathing", "relaxation", "zen"],

  // Textile crafts
  quilting: ["textiles", "sewing", "handmade", "fabric", "crochet", "embroidery", "knitting", "fiber arts"],

  // Climbing / bouldering
  climbing: ["bouldering", "climbing gym", "rock wall", "rock climbing", "wall climbing"],

  // Thrifting / vintage
  thrifting: ["vintage", "antiquing", "secondhand", "furniture flipping", "thrift shop", "flea market", "resale"],

  // 3D printing / making
  "3d printing": ["maker", "designing", "custom objects", "prototyping", "additive manufacturing", "fabrication"],

  // Coding / programming
  coding: ["programming", "app development", "software", "tech", "web development", "developer", "javascript", "python"],

  // Social / group games
  "escape rooms": ["team puzzle", "friday night", "group activity", "puzzle game", "team building"],

  // Disc golf / outdoor games
  "disc golf": ["park game", "friends", "outdoor game", "frisbee", "disc sport"],

  // Bread baking
  sourdough: ["bread", "starter", "baking", "kitchen", "fermentation", "loaf", "homemade bread"],

  // Paper folding / origami
  origami: ["paper crane", "paper folding", "paper cranes", "paper art", "paper sculpture", "folding paper", "paper animals"],

  // Drawing / sketching
  drawing: ["sketching", "illustration", "pencil art", "art", "sketch", "doodling", "anime art", "figure drawing"],

  // Music / instruments
  guitar: ["instrument", "music", "strumming", "chord", "acoustic", "electric guitar", "playing music"],
  piano: ["keyboard", "keys", "instrument", "music", "playing music", "classical music"],
  music: ["instrument", "playing", "band", "melody", "rhythm", "song writing"],

  // Photography
  photography: ["photos", "camera", "shooting", "photo walk", "portrait", "landscape photography", "editing photos"],

  // Running / fitness outdoors
  running: ["jogging", "marathon", "5k", "trail running", "cardio", "fitness outdoors"],
  hiking: ["trail", "nature walk", "outdoors", "backpacking", "walking in nature", "mountains"],

  // Gaming
  gaming: ["video games", "board games", "tabletop", "rpg", "game night", "dungeons and dragons"],

  // Cooking / food
  cooking: ["recipes", "chef", "meal prep", "kitchen", "culinary", "food", "home cooking"],
  baking: ["cookies", "cake", "pastry", "bread", "kitchen", "dessert", "sweets"],

  // Gardening / plants
  gardening: ["plants", "growing", "garden", "flowers", "vegetables", "herbs", "green thumb", "houseplants"],

  // Reading / writing
  reading: ["books", "novels", "literature", "fiction", "nonfiction", "book club"],
  writing: ["journaling", "creative writing", "fiction", "poetry", "storytelling", "blog"],

  // Yoga / wellness
  yoga: ["stretching", "flexibility", "wellness", "poses", "asana", "flow", "mindfulness"],

  // ── Intent / feeling mappings ─────────────────────────────────────────
  // These map emotional/descriptive words to actual tag values so phrase
  // searches like "something exciting" or "a chill indoor hobby" work.

  // Exciting / thrilling / dangerous
  exciting:   ["adventure", "thrill", "sport", "movement", "adrenaline"],
  thrilling:  ["adventure", "thrill", "adrenaline", "sport"],
  dangerous:  ["thrill", "adventure", "extreme", "risk"],
  adrenaline: ["adventure", "thrill", "sport", "movement"],
  extreme:    ["thrill", "adventure", "sport"],
  edgy:       ["thrill", "adventure", "extreme"],
  wild:       ["adventure", "thrill", "outdoors"],

  // Relaxing / calm / chill / peaceful
  relaxing:   ["relaxing", "wellness", "mindfulness", "reflective", "calm", "peaceful", "patient"],
  calming:    ["relaxing", "wellness", "mindfulness", "patient", "solo", "reflective"],
  chill:      ["relaxing", "solo", "indoor", "patient", "wellness"],
  peaceful:   ["relaxing", "reflective", "wellness", "patient", "solo"],
  "stress relief": ["wellness", "mindfulness", "relaxing", "meditation", "calm"],
  zen:        ["mindfulness", "wellness", "relaxing", "reflective"],
  meditative: ["mindfulness", "wellness", "reflective", "patient"],
  soothing:   ["relaxing", "wellness", "patient", "reflective"],
  mellow:     ["relaxing", "solo", "patient", "reflective"],
  slow:       ["patient", "relaxing", "reflective", "solo"],
  gentle:     ["relaxing", "patient", "wellness", "solo"],
  lowkey:     ["solo", "indoor", "relaxing", "patient"],
  "low key":  ["solo", "indoor", "relaxing", "patient"],

  // Creative / artistic / expressive
  artistic:   ["creative", "making", "visual", "drawing", "painting"],
  expressive: ["creative", "making", "performance", "writing"],
  "hands on": ["making", "creative", "skill"],
  "hands-on": ["making", "creative", "skill"],
  crafty:     ["creative", "making", "handmade", "quilting"],
  crafts:     ["creative", "making", "handmade"],
  craft:      ["creative", "making", "handmade"],
  artistic:   ["creative", "visual", "making", "drawing"],
  imaginative:["creative", "making", "writing", "performance"],
  arty:       ["creative", "visual", "making", "drawing"],

  // Social / group
  social:     ["social", "team", "group"],
  "with friends": ["social", "team", "group"],
  "meet people": ["social", "team", "group"],
  "make friends": ["social", "team", "community"],
  group:      ["social", "team"],
  "team activity": ["social", "team"],
  "group activity": ["social", "team"],
  "go out":   ["social", "outdoors", "adventure"],

  // Solo / alone / independent
  alone:      ["solo", "indoor", "relaxing"],
  solo:       ["solo", "individual"],
  independent: ["solo"],
  "by myself": ["solo"],
  introverted: ["solo", "indoor", "patient", "reflective"],
  introvert:   ["solo", "indoor", "patient", "reflective"],
  quiet:       ["solo", "patient", "reflective", "relaxing"],

  // Physical / active / sporty
  active:     ["fitness", "movement", "sport", "outdoors"],
  physical:   ["fitness", "movement", "sport", "strength"],
  sporty:     ["sport", "fitness", "movement"],
  athletic:   ["sport", "fitness", "movement", "strength"],
  workout:    ["fitness", "movement", "strength", "sport"],
  exercise:   ["fitness", "movement", "sport", "strength"],
  energetic:  ["fitness", "movement", "sport", "adventure"],
  "get fit":  ["fitness", "movement", "strength"],
  "stay fit": ["fitness", "movement", "strength"],
  "lose weight": ["fitness", "movement", "sport"],

  // Mental / intellectual / brain
  intellectual: ["learning", "strategy", "reflective"],
  educational:  ["learning", "strategy", "skill"],
  "brain games": ["strategy", "learning", "puzzle"],
  mental:       ["strategy", "learning", "mindfulness", "wellness"],
  mindful:      ["mindfulness", "wellness", "reflective", "relaxing"],
  thoughtful:   ["reflective", "learning", "strategy", "patient"],
  strategic:    ["strategy", "learning", "skill"],
  puzzle:       ["strategy", "learning", "skill"],
  stimulating:  ["learning", "strategy", "skill", "creative"],

  // Outdoors / nature
  outside:    ["outdoors", "nature"],
  "fresh air": ["outdoors", "nature"],
  "get outside": ["outdoors", "adventure"],
  nature:     ["outdoors", "plants", "animals"],
  "in nature": ["outdoors", "plants"],
  scenery:    ["outdoors", "reflective", "adventure"],

  // Indoor / cozy / home
  indoor:     ["indoor", "home", "solo"],
  cozy:       ["indoor", "home", "relaxing", "patient"],
  cosy:       ["indoor", "home", "relaxing", "patient"],
  "at home":  ["indoor", "home"],
  homebody:   ["indoor", "home", "solo"],
  "stay home": ["indoor", "home", "solo"],

  // Fun / playful / light
  fun:        ["playful", "social", "adventure", "creative"],
  playful:    ["playful", "social", "creative"],
  silly:      ["playful", "social"],
  lighthearted: ["playful", "social", "relaxing"],

  // Productive / learning
  productive: ["learning", "skill", "making", "creative"],
  "learn something": ["learning", "skill", "strategy"],
  "learn a skill": ["learning", "skill", "technique"],
  useful:     ["making", "learning", "skill", "food"],

  // Water-related
  water:      ["water", "outdoors", "adventure", "fitness"],
  "water sports": ["water", "outdoors", "adventure", "fitness"],
  swimming:   ["water", "fitness", "outdoors"],
  ocean:      ["water", "outdoors", "adventure"],
  lake:       ["water", "outdoors", "relaxing"],
};

window.HobbyAtlasData = {
  allHobbies, categories, hobbies, hobbyIntroVideos, hobbyDetails, sortFindings, tasks,
  searchConcepts, findFacet
};
