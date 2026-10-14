const categories = [
  {
    id: "outdoors",
    label: "Outdoors",
    eyebrow: "Adventure + exploration",
    description: "Get outside and find your next adventure.",
    color: "coral",
    icon: "✦",
    cards: ["Camping", "Fishing", "Jet Skiing", "Hydrofoils", "Boating", "Paddleboarding", "RVing", "Sailing", "Horseback Riding", "Snorkeling", "Fossil Hunting", "Birdwatching", "Snowshoeing", "Skydiving", "Whitewater Rafting", "Freediving", "Hiking/Trail Walking", "Astronomy", "Rock Climbing", "Disc Golf", "Pickleball", "Paintball"],
  },
  {
    id: "movement",
    label: "Movement",
    eyebrow: "Activity + wellness",
    description: "Build strength, skill, and momentum through active hobbies.",
    color: "lavender",
    icon: "✳",
    cards: ["Pilates", "Pickleball", "Swimming", "Bowling", "Disc Golf", "Cycling", "Parkour", "Running", "Skateboarding", "Yoga", "Meditation", "Martial Arts", "Rock Climbing", "BMX", "Weightlifting", "Fencing", "Table Tennis", "Trampolining", "Calisthenics", "Paintball"],
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
    cards: ["Gardening", "Plant Propagation", "Meditation", "Yoga", "Bonsai"],
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
  "Escape Rooms": { category: "games", blurb: "Solve a story-shaped puzzle with a team and a ticking clock.", tags: ["social", "strategy", "adventure"], time: "1 – 2 hrs", startingPoint: "Book a beginner room with three friends.", related: ["Mahjong", "Cosplaying"] },
  "Duo Lingo": { category: "learning", blurb: "Build a small language habit through playful daily practice.", tags: ["learning", "solo", "10 minutes"], time: "10 – 20 min", startingPoint: "Choose a language and complete the first five-minute lesson.", related: ["Podcasting", "Chess"] },
  Painting: { category: "creative-outlets", blurb: "Turn color, texture, and a blank surface into a practice of noticing.", tags: ["creative", "solo", "relaxing"], time: "30 min – 3 hrs", startingPoint: "Pick three colors and paint what is in front of you.", related: ["Photography", "Scrapbooking"] },
  "Nail Art": { category: "creative-outlets", blurb: "A tiny canvas for pattern, color, and a little everyday delight.", tags: ["creative", "fashion", "solo"], time: "30 – 90 min", startingPoint: "Try one accent nail with a two-color palette.", related: ["Painting", "Cosplaying"] },
  Scrapbooking: { category: "creative-outlets", blurb: "Collect moments, paper, and stories into a tactile archive.", tags: ["creative", "collecting", "reflective"], time: "1 – 3 hrs", startingPoint: "Make one page from your last favorite day.", related: ["Photography", "Thrifting/Antiquing"] },
  "3D Printing": { category: "learning", blurb: "Design a useful object, then watch an idea become physical.", tags: ["making", "learning", "tech"], time: "1 – 5 hrs", startingPoint: "Print a small, ready-made model from a library.", related: ["Painting", "Sourdough"] },
  Cosplaying: { category: "creative-outlets", blurb: "Step into a character through costume, craft, and playful world-building.", tags: ["creative", "fashion", "social"], time: "2 hrs – weeks", startingPoint: "Style a character from pieces you already own.", related: ["Nail Art", "Escape Rooms"] },
  Sourdough: { category: "cultivating", blurb: "A patient kitchen ritual with a delicious, shareable finish.", tags: ["food", "making", "patient"], time: "1 hr + rest", startingPoint: "Start a small jar of beginner-friendly starter.", related: ["Bonsai", "3D Printing"] },
  Camping: { category: "outdoors", blurb: "Trade a familiar room for a night under a wider sky.", tags: ["outdoors", "social", "adventure"], time: "1 – 3 days", startingPoint: "Plan one car-camping night close to home.", related: ["Sailing", "Astronomy"] },
  Sailing: { category: "outdoors", blurb: "Learn the language of wind, water, and steady teamwork.", tags: ["outdoors", "adventure", "social"], time: "2 hrs – days", startingPoint: "Take an introductory lesson on calm water.", related: ["Camping", "Whitewater Rafting"] },
  "Whitewater Rafting": { category: "outdoors", blurb: "Follow a river's energy and make a story with your crew.", tags: ["outdoors", "adventure", "social"], time: "1 day", startingPoint: "Join a guided trip on a beginner-friendly river.", related: ["Sailing", "Rock Climbing"] },
  "Rock Climbing": { category: "movement", blurb: "A physical puzzle: find your route, move with intention, repeat.", tags: ["movement", "strategy", "social"], time: "1 – 2 hrs", startingPoint: "Try a beginner route at an indoor gym.", related: ["Parkour", "Escape Rooms"] },
  Parkour: { category: "movement", blurb: "See the everyday environment as a playground for creative movement.", tags: ["movement", "outdoors", "skill"], time: "30 – 90 min", startingPoint: "Learn a safe landing with a qualified coach.", related: ["Rock Climbing", "Pilates"] },
  Trampolining: { category: "movement", blurb: "Find lift, rhythm, and a little joy in a full-body bounce.", tags: ["movement", "playful", "social"], time: "30 – 90 min", startingPoint: "Book an open-jump session and start small.", related: ["Parkour", "Pilates"] },
  Pilates: { category: "movement", blurb: "A mindful movement practice built around control and strength.", tags: ["movement", "wellness", "solo"], time: "30 – 60 min", startingPoint: "Follow a beginner mat session at home.", related: ["Parkour", "Trampolining"] },
  "Jet Skiing": { category: "outdoors", blurb: "A high-energy way to explore a shoreline and make a splash.", tags: ["outdoors", "adventure", "water"], time: "1 – 3 hrs", startingPoint: "Take a guided rental lesson on calm water.", related: ["Sailing", "Whitewater Rafting"] },
  Bonsai: { category: "cultivating", blurb: "Practice patience by shaping a living landscape over years.", tags: ["plants", "patient", "reflective"], time: "20 min / week", startingPoint: "Visit a nursery and choose a beginner tree.", related: ["Plant Propagation", "Sourdough"] },
  "Plant Propagation": { category: "cultivating", blurb: "Turn a small cutting into new growth and a daily moment of care.", tags: ["plants", "patient", "home"], time: "10 min / week", startingPoint: "Propagate a pothos cutting in a glass of water.", related: ["Bonsai", "Sourdough"] },
  Guitar: { category: "creative-outlets", blurb: "Learn the shapes and sounds that let you play along.", tags: ["music", "skill", "social"], time: "15 – 30 min", startingPoint: "Learn three chords to one favorite song.", related: ["DJing", "Podcasting"] },
  DJing: { category: "creative-outlets", blurb: "Shape a room's energy by finding the perfect next track.", tags: ["music", "tech", "social"], time: "30 min – 2 hrs", startingPoint: "Make a 20-minute mix from five songs you love.", related: ["Guitar", "Podcasting"] },
  Podcasting: { category: "creative-outlets", blurb: "Turn curiosity into a conversation, story, or tiny broadcast.", tags: ["media", "learning", "social"], time: "1 – 3 hrs", startingPoint: "Record a five-minute conversation with a friend.", related: ["DJing", "Duo Lingo"] },
  Photography: { category: "creative-outlets", blurb: "Train your eye to notice the light and stories hiding in plain sight.", tags: ["creative", "outdoors", "solo"], time: "20 min – 2 hrs", startingPoint: "Take ten photos of one ordinary object.", related: ["Painting", "Scrapbooking"] },
  "Thrifting/Antiquing": { category: "creative-outlets", blurb: "Search, style, and give a second life to something with a story.", tags: ["fashion", "collecting", "outdoors"], time: "1 – 3 hrs", startingPoint: "Set a $10 challenge at a local secondhand shop.", related: ["Scrapbooking", "Cosplaying"] },
  Astronomy: { category: "outdoors", blurb: "Look farther out and make the night sky feel familiar.", tags: ["learning", "outdoors", "reflective"], time: "30 min – 2 hrs", startingPoint: "Use a sky map to find one constellation.", related: ["Camping", "Duo Lingo"] },
  "Fishing": { category: "outdoors", blurb: "Catch fish using a rod, line, and a little patience.", tags: ["hobby", "exploration"], time: "2 – 4 hrs", startingPoint: "Watch a tutorial on how to use a fishing rod", related: ["Boating","Camping"] },
  "Hydrofoils": { category: "outdoors", blurb: "Glide above the water on a board lifted by underwater wings.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Watch a short hydrofoil ride and learn how the board lifts.", related: ["Paddleboarding","Boating"] },
  "Boating": { category: "outdoors", blurb: "Spend time on the water in a boat.", tags: ["hobby", "exploration"], time: "2 – 4 hrs", startingPoint: "Take a short boat ride with someone experienced.", related: ["Fishing","Sailing"] },
  "Paddleboarding": { category: "outdoors", blurb: "Balance on a board and move across calm water with a paddle.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Rent a board and try kneeling on calm water.", related: ["Snorkeling","Boating"] },
  "RVing": { category: "outdoors", blurb: "Travel and camp with the comforts of a home on wheels.", tags: ["hobby", "exploration"], time: "1 – 2 days", startingPoint: "Tour a local RV and plan a one-night route.", related: ["Camping","Hiking/Trail Walking"] },
  "Horseback Riding": { category: "outdoors", blurb: "Explore trails and practice riding with a horse.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Book a guided beginner trail ride.", related: ["Camping","Hiking/Trail Walking"] },
  "Snorkeling": { category: "outdoors", blurb: "Float at the surface while viewing underwater life.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Practice breathing through a mask in shallow water.", related: ["Freediving","Swimming"] },
  "Fossil Hunting": { category: "outdoors", blurb: "Search rocks and earth for preserved traces of ancient life.", tags: ["hobby", "exploration"], time: "2 – 4 hrs", startingPoint: "Visit a public fossil bed with a small brush.", related: ["Hiking/Trail Walking","Birdwatching"] },
  "Birdwatching": { category: "outdoors", blurb: "Observe and identify birds in their natural habitats.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Spot three birds with a free field guide.", related: ["Hiking/Trail Walking","Photography"] },
  "Snowshoeing": { category: "outdoors", blurb: "Walk across snowy trails with wide shoes that keep you afloat.", tags: ["hobby", "exploration"], time: "1 – 3 hrs", startingPoint: "Rent snowshoes and take a short marked trail.", related: ["Hiking/Trail Walking","Camping"] },
  "Skydiving": { category: "outdoors", blurb: "Free-fall through the sky before gliding safely to the ground.", tags: ["hobby", "exploration"], time: "3 – 5 hrs", startingPoint: "Book a tandem jump with a certified instructor.", related: ["Rock Climbing","BMX"] },
  "Freediving": { category: "outdoors", blurb: "Explore underwater on a single breath.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Take a beginner breathwork and safety class.", related: ["Snorkeling","Swimming"] },
  "Hiking/Trail Walking": { category: "outdoors", blurb: "Walk through natural spaces on marked or unmarked trails.", tags: ["hobby", "exploration"], time: "1 – 3 hrs", startingPoint: "Walk one easy local trail.", related: ["Camping","Birdwatching"] },
  "Disc Golf": { category: "movement", blurb: "Throw flying discs toward a series of targets.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Play the first three holes at a nearby course.", related: ["Pickleball","Camping"] },
  "Pickleball": { category: "movement", blurb: "Play a paddle sport that combines tennis, badminton, and table tennis.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Borrow a paddle and play one beginner game.", related: ["Disc Golf","Table Tennis"] },
  "Paintball": { category: "games", blurb: "Compete in teams while tagging opponents with paint-filled pellets.", tags: ["hobby", "exploration"], time: "2 – 3 hrs", startingPoint: "Join an open beginner paintball session.", related: ["Escape Rooms","Disc Golf"] },
  "Swimming": { category: "movement", blurb: "Move through water for exercise, recreation, or sport.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Swim ten easy laps at a local pool.", related: ["Snorkeling","Yoga"] },
  "Bowling": { category: "movement", blurb: "Roll a heavy ball to knock down pins.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Bowl one game with friends.", related: ["Table Tennis","Trivia"] },
  "Cycling": { category: "movement", blurb: "Ride a bicycle for travel, exercise, or exploration.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Ride a flat two-mile route.", related: ["Running","Hiking/Trail Walking"] },
  "Running": { category: "movement", blurb: "Move at a steady pace on foot for fitness or fun.", tags: ["hobby", "exploration"], time: "20 – 40 min", startingPoint: "Walk for five minutes, then jog for one.", related: ["Cycling","Calisthenics"] },
  "Skateboarding": { category: "movement", blurb: "Ride and perform tricks on a wheeled board.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Practice standing and balancing on a board.", related: ["BMX","Parkour"] },
  "Yoga": { category: "cultivating", blurb: "Use movement, balance, and breathing to support strength and calm.", tags: ["hobby", "exploration"], time: "10 – 30 min", startingPoint: "Follow a ten-minute beginner yoga video.", related: ["Pilates","Meditation"] },
  "Meditation": { category: "cultivating", blurb: "Practice focused attention and quiet awareness.", tags: ["hobby", "exploration"], time: "2 – 15 min", startingPoint: "Set a timer for two quiet minutes.", related: ["Yoga","Journaling"] },
  "Martial Arts": { category: "movement", blurb: "Learn disciplined movements for self-defense, fitness, and focus.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Attend an introductory class.", related: ["Fencing","Calisthenics"] },
  "BMX": { category: "movement", blurb: "Ride a small bike built for jumps, tricks, and technical riding.", tags: ["hobby", "exploration"], time: "30 – 90 min", startingPoint: "Practice riding and braking in an empty lot.", related: ["Skateboarding","Cycling"] },
  "Weightlifting": { category: "movement", blurb: "Build strength by training with weights.", tags: ["hobby", "exploration"], time: "45 – 75 min", startingPoint: "Learn three basic lifts with a coach.", related: ["Calisthenics","Martial Arts"] },
  "Fencing": { category: "movement", blurb: "Practice fast, strategic swordplay with a protective foil, épée, or sabre.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Try a beginner lesson at a local club.", related: ["Martial Arts","Table Tennis"] },
  "Table Tennis": { category: "movement", blurb: "Rally a lightweight ball across a table with paddles.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Rally ten shots with a partner.", related: ["Pickleball","Bowling"] },
  "Calisthenics": { category: "movement", blurb: "Build strength using bodyweight movements.", tags: ["hobby", "exploration"], time: "20 – 40 min", startingPoint: "Try five squats, push-ups, and lunges.", related: ["Weightlifting","Yoga"] },
  "Coding": { category: "learning", blurb: "Create instructions that tell computers what to do.", tags: ["hobby", "exploration"], time: "30 – 90 min", startingPoint: "Make a tiny webpage with one button.", related: ["3D Printing","Graphic Design"] },
  "Gardening": { category: "cultivating", blurb: "Grow and care for plants in soil or containers.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Plant one herb in a sunny pot.", related: ["Plant Propagation","Bonsai"] },
  "Canning": { category: "cultivating", blurb: "Preserve food in sealed jars for longer storage.", tags: ["hobby", "exploration"], time: "2 – 4 hrs", startingPoint: "Follow a tested recipe for one small batch.", related: ["Sourdough","Gardening"] },
  "Candle Making": { category: "cultivating", blurb: "Create candles by melting wax around a wick.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Make one candle from a beginner kit.", related: ["Soap Making","Resin Art"] },
  "Soap Making": { category: "cultivating", blurb: "Make bars of soap by combining oils with a cleansing base.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Try a melt-and-pour soap kit.", related: ["Candle Making","Gardening"] },
  "Cake Decorating": { category: "cultivating", blurb: "Decorate cakes with frosting, piping, and edible details.", tags: ["hobby", "exploration"], time: "30 – 90 min", startingPoint: "Pipe simple stars onto a cupcake.", related: ["Painting","Sourdough"] },
  "Barbecue/Smoking": { category: "cultivating", blurb: "Cook food slowly over smoke or live fire.", tags: ["hobby", "exploration"], time: "4 – 8 hrs", startingPoint: "Smoke one small batch of chicken.", related: ["Camping","Canning"] },
  "Chicken Keeping": { category: "cultivating", blurb: "Care for backyard chickens and collect fresh eggs.", tags: ["hobby", "exploration"], time: "20 – 30 min/day", startingPoint: "Visit a coop and learn the daily routine.", related: ["Gardening","Beekeeping"] },
  "Beekeeping": { category: "cultivating", blurb: "Maintain bee colonies and learn how honey is made.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Tour a local apiary with a beekeeper.", related: ["Gardening","Chicken Keeping"] },
  "Gaming": { category: "games", blurb: "Play video or tabletop games for challenge and fun.", tags: ["hobby", "exploration"], time: "30 min – 2 hrs", startingPoint: "Play one beginner-friendly game for 30 minutes.", related: ["Puzzles","Chess"] },
  "Puzzles": { category: "games", blurb: "Solve pieces, clues, or patterns to complete a larger challenge.", tags: ["hobby", "exploration"], time: "1 – 3 hrs", startingPoint: "Complete a 100-piece puzzle.", related: ["Escape Rooms","Chess"] },
  "Magic": { category: "games", blurb: "Learn illusions and techniques that create surprising effects.", tags: ["hobby", "exploration"], time: "15 – 30 min", startingPoint: "Learn one simple card trick.", related: ["Juggling","Balloon Animals"] },
  "Trivia": { category: "games", blurb: "Test your knowledge by answering questions across many topics.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Join a local trivia night.", related: ["Chess","Escape Rooms"] },
  "LEGO Building": { category: "games", blurb: "Build models and inventions from interlocking LEGO pieces.", tags: ["hobby", "exploration"], time: "1 – 3 hrs", startingPoint: "Build one small set without instructions.", related: ["Model Kit Building","3D Printing"] },
  "Bedazzling": { category: "creative-outlets", blurb: "Decorate clothing or accessories with sparkling gems.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Add gems to one small accessory.", related: ["Nail Art","Jewelry Making"] },
  "Crochet": { category: "creative-outlets", blurb: "Create fabric by looping yarn with a single hook.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Learn the chain stitch with one hook.", related: ["Embroidery","Quilting"] },
  "Air dry clay": { category: "creative-outlets", blurb: "Shape small sculptures that harden without a kiln.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Shape one small pinch pot.", related: ["Pottery","Resin Art"] },
  "Pottery": { category: "creative-outlets", blurb: "Form objects from clay by hand or on a pottery wheel.", tags: ["hobby", "exploration"], time: "2 – 3 hrs", startingPoint: "Take a beginner wheel or hand-building class.", related: ["Air dry clay","Painting"] },
  "Journaling": { category: "creative-outlets", blurb: "Record thoughts, observations, or memories in writing.", tags: ["hobby", "exploration"], time: "5 – 15 min", startingPoint: "Write three sentences about today.", related: ["Poetry","Scrapbooking"] },
  "Bag charms": { category: "creative-outlets", blurb: "Make small decorative charms to attach to a bag.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Make one charm from beads or buttons.", related: ["Jewelry Making","Bedazzling"] },
  "Calligraphy": { category: "creative-outlets", blurb: "Create expressive lettering with careful strokes and spacing.", tags: ["hobby", "exploration"], time: "20 – 40 min", startingPoint: "Practice one alphabet with a brush pen.", related: ["Journaling","Graphic Design"] },
  "Coloring": { category: "creative-outlets", blurb: "Fill illustrations with color as a relaxing creative practice.", tags: ["hobby", "exploration"], time: "20 – 60 min", startingPoint: "Color one page with three colors.", related: ["Painting","Flower Pressing"] },
  "Poetry": { category: "creative-outlets", blurb: "Use rhythm, imagery, and words to express an idea or feeling.", tags: ["hobby", "exploration"], time: "15 – 30 min", startingPoint: "Write a four-line poem about something nearby.", related: ["Journaling","Voice lessons"] },
  "Juggling": { category: "creative-outlets", blurb: "Keep multiple objects moving through the air in a pattern.", tags: ["hobby", "exploration"], time: "15 – 30 min", startingPoint: "Practice tossing one ball between hands.", related: ["Balloon Animals","Magic"] },
  "Balloon Animals": { category: "creative-outlets", blurb: "Twist balloons into playful figures and shapes.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Make a simple balloon dog while following a tutorial.", related: ["Juggling","Magic"] },
  "Embroidery": { category: "creative-outlets", blurb: "Decorate fabric with stitched designs.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Learn a running stitch on scrap fabric.", related: ["Crochet","Quilting"] },
  "Origami": { category: "creative-outlets", blurb: "Fold paper into sculptures, animals, and geometric forms.", tags: ["hobby", "exploration"], time: "15 – 30 min", startingPoint: "Fold one paper crane.", related: ["Air dry clay","Calligraphy"] },
  "Quilting": { category: "creative-outlets", blurb: "Join layers of fabric into a patterned, warm textile.", tags: ["hobby", "exploration"], time: "1 – 3 hrs", startingPoint: "Piece two fabric squares together.", related: ["Crochet","Embroidery"] },
  "Resin Art": { category: "creative-outlets", blurb: "Create glossy decorative pieces by setting colored resin.", tags: ["hobby", "exploration"], time: "2 – 4 hrs", startingPoint: "Make one small resin coaster with a kit.", related: ["Jewelry Making","Air dry clay"] },
  "Model Kit Building": { category: "creative-outlets", blurb: "Assemble and detail small scale models.", tags: ["hobby", "exploration"], time: "2 – 5 hrs", startingPoint: "Assemble one small snap-fit model.", related: ["LEGO Building","3D Printing"] },
  "Jewelry Making": { category: "creative-outlets", blurb: "Design wearable pieces with beads, wire, metal, or cord.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Make one bracelet with elastic cord.", related: ["Bag charms","Resin Art"] },
  "Slime Making": { category: "creative-outlets", blurb: "Mix stretchy, tactile slime in different colors and textures.", tags: ["hobby", "exploration"], time: "20 – 30 min", startingPoint: "Mix one small batch of slime.", related: ["Air dry clay","Resin Art"] },
  "Makeup Artistry": { category: "creative-outlets", blurb: "Use makeup to create expressive looks and designs.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Practice one simple eyeshadow look.", related: ["Nail Art","Cosplaying"] },
  "Graphic Design": { category: "creative-outlets", blurb: "Combine type, color, and images to communicate visually.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Make a simple poster with two fonts.", related: ["Photography","Painting"] },
  "Flower Pressing": { category: "creative-outlets", blurb: "Flatten and preserve flowers for art and keepsakes.", tags: ["hobby", "exploration"], time: "15 – 30 min + 1 week press", startingPoint: "Press a few fresh flowers in a book.", related: ["Gardening","Scrapbooking"] },
  "Tie-Dye": { category: "creative-outlets", blurb: "Create colorful patterns by folding, tying, and dyeing fabric.", tags: ["hobby", "exploration"], time: "2 – 4 hrs", startingPoint: "Tie-dye one plain cotton shirt.", related: ["Painting","Quilting"] },
  "Concerts": { category: "creative-outlets", blurb: "Experience live music and the energy of a performing artist.", tags: ["hobby", "exploration"], time: "2 – 4 hrs", startingPoint: "Find a small local show and buy one ticket.", related: ["Guitar","DJing"] },
  "Videography": { category: "creative-outlets", blurb: "Record and edit moving images to tell a story.", tags: ["hobby", "exploration"], time: "1 – 2 hrs", startingPoint: "Shoot a 30-second video about your day.", related: ["Photography","Podcasting"] },
  "Voice lessons": { category: "creative-outlets", blurb: "Develop singing technique, pitch, and breath control.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Practice one song with a vocal warm-up.", related: ["Guitar","Beatboxing"] },
  "Beatboxing": { category: "creative-outlets", blurb: "Make rhythmic sounds and musical beats with your voice.", tags: ["hobby", "exploration"], time: "15 – 30 min", startingPoint: "Practice a basic kick-and-snare pattern.", related: ["Voice lessons","DJing"] },
  "Watches": { category: "creative-outlets", blurb: "Study, collect, or repair timepieces and their mechanisms.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Learn the parts of one favorite watch.", related: ["Vinyl Records","Thrifting/Antiquing"] },
  "Fidget Trading": { category: "creative-outlets", blurb: "Collect and exchange small tactile toys with other people.", tags: ["hobby", "exploration"], time: "15 – 30 min", startingPoint: "Trade one fidget with a friend.", related: ["Bag charms","Gaming"] },
  "Vinyl Records": { category: "creative-outlets", blurb: "Collect and listen to music on physical vinyl records.", tags: ["hobby", "exploration"], time: "30 – 60 min", startingPoint: "Play one record from start to finish.", related: ["Concerts","DJing"] },
};

const hobbyNames = [...new Set(categories.flatMap((category) => [
  ...(category.cards || []),
  ...(category.facets || []).flatMap((facet) => facet.cards),
]))];

const hobbyCategoryByName = Object.fromEntries(categories.flatMap((category) => [
  ...(category.cards || []).map((name) => [name, category.id]),
  ...(category.facets || []).flatMap((facet) => facet.cards.map((name) => [name, category.id])),
]));

const hobbyCategoryIdsByName = Object.fromEntries(hobbyNames.map((name) => [
  name,
  categories
      .filter((category) => (category.cards || []).includes(name) ||
          (category.facets || []).some((facet) => facet.cards.includes(name)))
      .map((category) => category.id),
]));

hobbyNames.forEach((name) => {
  hobbies[name].category = hobbyCategoryByName[name];
  hobbies[name].categoryIds = hobbyCategoryIdsByName[name];
  hobbies[name].summary ||= hobbies[name].blurb;
});

const allHobbies = hobbyNames;

const sortFindings = [
  { label: "Stable pairings", value: "5", detail: "Chess + Escape Rooms, Guitar + DJing, Bonsai + Plant Propagation, and more" },
  { label: "Card sorts", value: "8", detail: "Repeated sorts helped separate durable relationships from one-off labels" },
  { label: "Ambiguous cards", value: "6", detail: "Sourdough, 3D Printing, Duo Lingo, Astronomy, Thrifting, and Rock Climbing" },
];

// ─── Tree test tasks ────────────────────────────────────────────────────────
const tasks = [
  {
    id: "t01",
    text: "Your roommate's been leaving a fresh sourdough loaf on the counter every Sunday. You want to try making your own starter.",
    targets: ["hobby/Sourdough", "facet/homestead", "category/cultivating"],
    targetLabel: "Sourdough (Cultivating > Homestead)",
  },
  {
    id: "t02",
    text: "You drove out to the west desert last weekend and were blown away by the stars. You want to get into stargazing as a hobby.",
    targets: ["hobby/Astronomy", "category/learning", "category/outdoors"],
    targetLabel: "Astronomy (Learning or Outdoors)",
  },
  {
    id: "t03",
    text: "A coworker keeps posting clips from the climbing gym and you want to try it.",
    targets: ["hobby/Rock Climbing", "category/movement", "category/outdoors"],
    targetLabel: "Rock Climbing (Movement)",
  },
  {
    id: "t04",
    text: "Your grandma made the quilt on your bed and you want to learn to make something similar by hand.",
    targets: ["hobby/Crochet", "hobby/Embroidery", "hobby/Quilting", "facet/art", "category/creative-outlets"],
    targetLabel: "Crochet / Embroidery / Quilting (Creative Outlets > Art)",
  },
  {
    id: "t05",
    text: "Finals week wrecked you and a friend said she does a 10-minute meditation every morning to cope. You want to try something like it.",
    targets: ["hobby/Meditation", "hobby/Yoga", "hobby/Pilates", "category/cultivating", "category/movement"],
    targetLabel: "Meditation / Yoga (Cultivating or Movement)",
  },
  {
    id: "t06",
    text: "You've always wanted to build your own app on the side but never started.",
    targets: ["hobby/Coding", "category/learning"],
    targetLabel: "Coding (Learning)",
  },
  {
    id: "t07",
    text: "Your friend group needs something fun for Friday night that isn't just watching a movie.",
    targets: ["hobby/Escape Rooms", "category/games"],
    targetLabel: "Escape Rooms (Games)",
  },
  {
    id: "t08",
    text: "Your brother printed a custom phone stand at school and you want to try designing and printing your own stuff at home.",
    targets: ["hobby/3D Printing", "category/learning"],
    targetLabel: "3D Printing (Learning)",
  },
  {
    id: "t09",
    text: "You want something active you can do with a couple friends at the park on a Saturday — nothing that needs a full team.",
    targets: ["hobby/Disc Golf", "hobby/Pickleball", "hobby/Paintball", "category/movement", "category/outdoors"],
    targetLabel: "Disc Golf / Pickleball (Movement)",
  },
  {
    id: "t10",
    text: "You've been watching videos of people finding cool vintage furniture at Deseret Industries and flipping it. You want to get into that.",
    targets: ["hobby/Thrifting/Antiquing", "facet/collecting", "category/creative-outlets"],
    targetLabel: "Thrifting/Antiquing (Creative Outlets > Collecting)",
  },
];

// Hand-built concept vocabulary from card-sort labels and tree-test think-alouds.
// Each term is intentionally inspectable: it expands a literal search without
// changing the hierarchy or calling an external service.
const searchConcepts = {
  stargazing: ["astronomy", "stars", "night sky", "constellation"],
  meditation: ["mindfulness", "calm", "stress relief", "morning practice"],
  quilting: ["textiles", "sewing", "handmade", "fabric", "crochet", "embroidery"],
  climbing: ["bouldering", "climbing gym", "rock wall"],
  thrifting: ["vintage", "antiquing", "secondhand", "furniture flipping"],
  "3d printing": ["maker", "designing", "custom objects", "prototyping"],
  coding: ["programming", "app development", "software", "tech"],
  "escape rooms": ["team puzzle", "friday night", "group activity"],
  "disc golf": ["park game", "friends", "outdoor game", "frisbee"],
  sourdough: ["bread", "starter", "baking", "kitchen"],
};

window.HobbyAtlasData = {
  allHobbies, categories, hobbies, sortFindings, tasks, searchConcepts
};
