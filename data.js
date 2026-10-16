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
        cards: ["Camping","RVing","Horseback Riding","Snowshoeing","Hiking/Trail Walking","Fossil Hunting","Birdwatching"],
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
        cards: ["Pickleball","Bowling","Disc Golf","Martial Arts","Fencing","Table Tennis","Rock Climbing"],
      },
      {
        id: "fitness-training",
        label: "Fitness & Training",
        description: "Build endurance, strength, and physical fitness.",
        cards: ["Swimming","Cycling","Running","Weightlifting"],
      },
      {
        id: "wheels-tricks",
        label: "Wheels & Tricks",
        description: "Move fast, go big, and master your board or bike.",
        cards: ["Skateboarding","BMX","Parkour","Trampolining"],
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
        cards: ["Gardening","Plant Propagation","Bonsai"],
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
        cards: ["Candle Making","Soap Making"],
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
        cards: ["Mahjong","Chess","Puzzles","Magic","Trivia","LEGO Building"],
      },
      {
        id: "active",
        label: "Active",
        description: "Get up, get out, and play with some energy.",
        cards: ["Paintball","Escape Rooms","Video Games"],
      },
    ],
  },
  {
    id: "creative-outlets",
    label: "Creative outlets",
    eyebrow: "Art + media + collecting",
    description: "Make, document, share, and collect things that matter to you.",
    color: "lavender",
    icon: "\u2733",
    facets: [
      {
        id: "collecting",
        label: "Collecting",
        description: "Gather, preserve, and give meaning to objects and memories.",
        cards: ["Watches","Thrifting/Antiquing","Bag charms","Fidget Trading","Vinyl Records"],
      },
      {
        id: "music-performance",
        label: "Music & Performance",
        description: "Create and share music and live performances.",
        cards: ["Guitar","Voice lessons","Beatboxing","DJing","Concerts"],
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
            cards: ["Painting","Graphic Design","Coloring"],
          },
          {
            id: "words-story",
            label: "Words & Story",
            description: "Express ideas and feelings through writing.",
            cards: ["Poetry","Journaling"],
          },
          {
            id: "novelty",
            label: "Novelty",
            description: "Playful performance arts and crowd-pleasing skills.",
            cards: ["Juggling","Balloon Animals"],
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
                cards: ["Scrapbooking","Calligraphy","Flower Pressing"],
              },
              {
                id: "build-create",
                label: "Build & Create",
                description: "Shape, mold, and construct physical objects.",
                cards: ["Pottery","Air dry clay","Resin Art","Origami","Model Kit Building","Slime Making","Bedazzling","Tie-Dye"],
              },
            ],
          },
          {
            id: "fashion-beauty",
            label: "Fashion & Beauty",
            description: "Create and adorn wearable art and expressive looks.",
            cards: ["Cosplaying","Nail Art","Makeup Artistry","Jewelry Making"],
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
    cards: ["Duo Lingo","Coding","3D Printing"],
  },
];

const hobbies = {
  Chess: { blurb: "A timeless strategy game for quiet focus or friendly competition.", tags: ["indoor","strategy","social"], time: "15 min – 2 hrs", startingPoint: "Play one short game online or at a local club.", related: ["Mahjong","Escape Rooms"] },
  Mahjong: { blurb: "A tactile, social strategy game with a rhythm all its own.", tags: ["indoor","strategy","social"], time: "1 – 3 hrs", startingPoint: "Find a beginner table and learn the tiles together.", related: ["Chess","Escape Rooms"] },
  "Escape Rooms": { blurb: "Solve a story-shaped puzzle with a team and a ticking clock.", tags: ["social","strategy","adventure"], time: "1 – 2 hrs", startingPoint: "Book a beginner room with three friends.", related: ["Mahjong","Cosplaying"] },
  "Duo Lingo": { blurb: "Build a small language habit through playful daily practice.", tags: ["learning","solo","10 minutes"], time: "10 – 20 min", startingPoint: "Choose a language and complete the first five-minute lesson.", related: ["Podcasting","Chess"] },
  Painting: { blurb: "Turn color, texture, and a blank surface into a practice of noticing.", tags: ["creative","solo","relaxing"], time: "30 min – 3 hrs", startingPoint: "Pick three colors and paint what is in front of you.", related: ["Photography","Scrapbooking"] },
  "Nail Art": { blurb: "A tiny canvas for pattern, color, and a little everyday delight.", tags: ["creative","fashion","solo"], time: "30 – 90 min", startingPoint: "Try one accent nail with a two-color palette.", related: ["Painting","Cosplaying"] },
  Scrapbooking: { blurb: "Collect moments, paper, and stories into a tactile archive.", tags: ["creative","collecting","reflective"], time: "1 – 3 hrs", startingPoint: "Make one page from your last favorite day.", related: ["Photography","Thrifting/Antiquing"] },
  "3D Printing": { blurb: "Design a useful object, then watch an idea become physical.", tags: ["making","learning","tech"], time: "1 – 5 hrs", startingPoint: "Print a small, ready-made model from a library.", related: ["Painting","Sourdough"] },
  Cosplaying: { blurb: "Step into a character through costume, craft, and playful world-building.", tags: ["creative","fashion","social"], time: "2 hrs – weeks", startingPoint: "Style a character from pieces you already own.", related: ["Nail Art","Escape Rooms"] },
  Sourdough: { blurb: "A patient kitchen ritual with a delicious, shareable finish.", tags: ["food","making","patient"], time: "1 hr + rest", startingPoint: "Start a small jar of beginner-friendly starter.", related: ["Bonsai","3D Printing"] },
  Camping: { blurb: "Trade a familiar room for a night under a wider sky.", tags: ["outdoors","social","adventure"], time: "1 – 3 days", startingPoint: "Plan one car-camping night close to home.", related: ["Sailing","Astronomy"] },
  Sailing: { blurb: "Learn the language of wind, water, and steady teamwork.", tags: ["outdoors","adventure","social"], time: "2 hrs – days", startingPoint: "Take an introductory lesson on calm water.", related: ["Camping","Whitewater Rafting"] },
  "Whitewater Rafting": { blurb: "Follow a river's energy and make a story with your crew.", tags: ["outdoors","adventure","social"], time: "1 day", startingPoint: "Join a guided trip on a beginner-friendly river.", related: ["Sailing","Rock Climbing"] },
  "Rock Climbing": { blurb: "A physical puzzle: find your route, move with intention, repeat.", tags: ["movement","strategy","social"], time: "1 – 2 hrs", startingPoint: "Try a beginner route at an indoor gym.", related: ["Parkour","Escape Rooms"] },
  Parkour: { blurb: "See the everyday environment as a playground for creative movement.", tags: ["movement","outdoors","skill"], time: "30 – 90 min", startingPoint: "Learn a safe landing with a qualified coach.", related: ["Rock Climbing","Pilates"] },
  Trampolining: { blurb: "Find lift, rhythm, and a little joy in a full-body bounce.", tags: ["movement","playful","social"], time: "30 – 90 min", startingPoint: "Book an open-jump session and start small.", related: ["Parkour","Pilates"] },
  Pilates: { blurb: "A mindful movement practice built around control and strength.", tags: ["movement","wellness","solo"], time: "30 – 60 min", startingPoint: "Follow a beginner mat session at home.", related: ["Parkour","Trampolining"] },
  "Jet Skiing": { blurb: "A high-energy way to explore a shoreline and make a splash.", tags: ["outdoors","adventure","water"], time: "1 – 3 hrs", startingPoint: "Take a guided rental lesson on calm water.", related: ["Sailing","Whitewater Rafting"] },
  Bonsai: { blurb: "Practice patience by shaping a living landscape over years.", tags: ["plants","patient","reflective"], time: "20 min / week", startingPoint: "Visit a nursery and choose a beginner tree.", related: ["Plant Propagation","Sourdough"] },
  "Plant Propagation": { blurb: "Turn a small cutting into new growth and a daily moment of care.", tags: ["plants","patient","home"], time: "10 min / week", startingPoint: "Propagate a pothos cutting in a glass of water.", related: ["Bonsai","Sourdough"] },
  Guitar: { blurb: "Learn the shapes and sounds that let you play along.", tags: ["music","skill","social"], time: "15 – 30 min", startingPoint: "Learn three chords to one favorite song.", related: ["DJing","Podcasting"] },
  DJing: { blurb: "Shape a room's energy by finding the perfect next track.", tags: ["music","tech","social"], time: "30 min – 2 hrs", startingPoint: "Make a 20-minute mix from five songs you love.", related: ["Guitar","Podcasting"] },
  Podcasting: { blurb: "Turn curiosity into a conversation, story, or tiny broadcast.", tags: ["media","learning","social"], time: "1 – 3 hrs", startingPoint: "Record a five-minute conversation with a friend.", related: ["DJing","Duo Lingo"] },
  Photography: { blurb: "Train your eye to notice the light and stories hiding in plain sight.", tags: ["creative","outdoors","solo"], time: "20 min – 2 hrs", startingPoint: "Take ten photos of one ordinary object.", related: ["Painting","Scrapbooking"] },
  "Thrifting/Antiquing": { blurb: "Search, style, and give a second life to something with a story.", tags: ["fashion","collecting","outdoors"], time: "1 – 3 hrs", startingPoint: "Set a $10 challenge at a local secondhand shop.", related: ["Scrapbooking","Cosplaying"] },
  Astronomy: { blurb: "Look farther out and make the night sky feel familiar.", tags: ["learning","outdoors","reflective"], time: "30 min – 2 hrs", startingPoint: "Use a sky map to find one constellation.", related: ["Camping","Duo Lingo"] },
  Fishing: { blurb: "Catch fish using a rod, line, and a little patience.", tags: ["outdoors","relaxing","solo"], time: "2 – 4 hrs", startingPoint: "Watch a tutorial on how to use a fishing rod.", related: ["Boating","Camping"] },
  Hydrofoils: { blurb: "Glide above the water on a board lifted by underwater wings.", tags: ["outdoors","adventure","water"], time: "1 – 2 hrs", startingPoint: "Watch a short hydrofoil ride and learn how the board lifts.", related: ["Paddleboarding","Boating"] },
  Boating: { blurb: "Spend time on the water in a boat.", tags: ["outdoors","relaxing","social"], time: "2 – 4 hrs", startingPoint: "Take a short boat ride with someone experienced.", related: ["Fishing","Sailing"] },
  Paddleboarding: { blurb: "Balance on a board and move across calm water with a paddle.", tags: ["outdoors","water","fitness"], time: "1 – 2 hrs", startingPoint: "Rent a board and try kneeling on calm water.", related: ["Snorkeling","Boating"] },
  RVing: { blurb: "Travel and camp with the comforts of a home on wheels.", tags: ["outdoors","travel","social"], time: "1 – 2 days", startingPoint: "Tour a local RV and plan a one-night route.", related: ["Camping","Hiking/Trail Walking"] },
  "Horseback Riding": { blurb: "Explore trails and practice riding with a horse.", tags: ["outdoors","animals","skill"], time: "1 – 2 hrs", startingPoint: "Book a guided beginner trail ride.", related: ["Camping","Hiking/Trail Walking"] },
  Snorkeling: { blurb: "Float at the surface while viewing underwater life.", tags: ["outdoors","water","exploration"], time: "1 – 2 hrs", startingPoint: "Practice breathing through a mask in shallow water.", related: ["Freediving","Swimming"] },
  "Fossil Hunting": { blurb: "Search rocks and earth for preserved traces of ancient life.", tags: ["outdoors","learning","solo"], time: "2 – 4 hrs", startingPoint: "Visit a public fossil bed with a small brush.", related: ["Hiking/Trail Walking","Birdwatching"] },
  Birdwatching: { blurb: "Observe and identify birds in their natural habitats.", tags: ["outdoors","learning","patient"], time: "30 – 60 min", startingPoint: "Spot three birds with a free field guide.", related: ["Hiking/Trail Walking","Photography"] },
  Snowshoeing: { blurb: "Walk across snowy trails with wide shoes that keep you afloat.", tags: ["outdoors","winter","fitness"], time: "1 – 3 hrs", startingPoint: "Rent snowshoes and take a short marked trail.", related: ["Hiking/Trail Walking","Camping"] },
  Skydiving: { blurb: "Free-fall through the sky before gliding safely to the ground.", tags: ["outdoors","adventure","thrill"], time: "3 – 5 hrs", startingPoint: "Book a tandem jump with a certified instructor.", related: ["Rock Climbing","BMX"] },
  Freediving: { blurb: "Explore underwater on a single breath.", tags: ["outdoors","water","fitness"], time: "1 – 2 hrs", startingPoint: "Take a beginner breathwork and safety class.", related: ["Snorkeling","Swimming"] },
  "Hiking/Trail Walking": { blurb: "Walk through natural spaces on marked or unmarked trails.", tags: ["outdoors","fitness","solo"], time: "1 – 3 hrs", startingPoint: "Walk one easy local trail.", related: ["Camping","Birdwatching"] },
  "Disc Golf": { blurb: "Throw flying discs toward a series of targets across a course.", tags: ["outdoors","sport","social"], time: "1 – 2 hrs", startingPoint: "Play the first three holes at a nearby course.", related: ["Pickleball","Camping"] },
  Pickleball: { blurb: "Play a paddle sport that combines tennis, badminton, and ping-pong.", tags: ["sport","social","fitness"], time: "1 – 2 hrs", startingPoint: "Borrow a paddle and play one beginner game.", related: ["Disc Golf","Table Tennis"] },
  Paintball: { blurb: "Compete in teams while tagging opponents with paint-filled pellets.", tags: ["social","adventure","team"], time: "2 – 3 hrs", startingPoint: "Join an open beginner paintball session.", related: ["Escape Rooms","Disc Golf"] },
  Swimming: { blurb: "Move through water for exercise, recreation, or sport.", tags: ["fitness","water","solo"], time: "30 – 60 min", startingPoint: "Swim ten easy laps at a local pool.", related: ["Snorkeling","Yoga"] },
  Bowling: { blurb: "Roll a heavy ball to knock down pins.", tags: ["sport","social","indoor"], time: "1 – 2 hrs", startingPoint: "Bowl one game with friends.", related: ["Table Tennis","Trivia"] },
  Cycling: { blurb: "Ride a bicycle for travel, exercise, or exploration.", tags: ["fitness","outdoors","solo"], time: "1 – 2 hrs", startingPoint: "Ride a flat two-mile route.", related: ["Running","Hiking/Trail Walking"] },
  Running: { blurb: "Move at a steady pace on foot for fitness or fun.", tags: ["fitness","solo","outdoors"], time: "20 – 40 min", startingPoint: "Walk for five minutes, then jog for one.", related: ["Cycling","Calisthenics"] },
  Skateboarding: { blurb: "Ride and perform tricks on a wheeled board.", tags: ["skill","outdoors","solo"], time: "30 – 60 min", startingPoint: "Practice standing and balancing on a board.", related: ["BMX","Parkour"] },
  Yoga: { blurb: "Use movement, balance, and breathing to support strength and calm.", tags: ["wellness","solo","fitness"], time: "10 – 30 min", startingPoint: "Follow a ten-minute beginner yoga video.", related: ["Pilates","Meditation"] },
  Meditation: { blurb: "Practice focused attention and quiet awareness.", tags: ["wellness","solo","mindfulness"], time: "2 – 15 min", startingPoint: "Set a timer for two quiet minutes.", related: ["Yoga","Journaling"] },
  "Martial Arts": { blurb: "Learn disciplined movements for self-defense, fitness, and focus.", tags: ["sport","skill","fitness"], time: "1 – 2 hrs", startingPoint: "Attend an introductory class.", related: ["Fencing","Calisthenics"] },
  BMX: { blurb: "Ride a small bike built for jumps, tricks, and technical riding.", tags: ["skill","outdoors","thrill"], time: "30 – 90 min", startingPoint: "Practice riding and braking in an empty lot.", related: ["Skateboarding","Cycling"] },
  Weightlifting: { blurb: "Build strength by training with weights.", tags: ["fitness","solo","strength"], time: "45 – 75 min", startingPoint: "Learn three basic lifts with a coach.", related: ["Calisthenics","Martial Arts"] },
  Fencing: { blurb: "Practice fast, strategic swordplay with a protective foil, épée, or sabre.", tags: ["sport","skill","social"], time: "1 – 2 hrs", startingPoint: "Try a beginner lesson at a local club.", related: ["Martial Arts","Table Tennis"] },
  "Table Tennis": { blurb: "Rally a lightweight ball across a table with paddles.", tags: ["sport","social","indoor"], time: "30 – 60 min", startingPoint: "Rally ten shots with a partner.", related: ["Pickleball","Bowling"] },
  Calisthenics: { blurb: "Build strength using bodyweight movements.", tags: ["fitness","solo","strength"], time: "20 – 40 min", startingPoint: "Try five squats, push-ups, and lunges.", related: ["Weightlifting","Yoga"] },
  Coding: { blurb: "Create instructions that tell computers what to do.", tags: ["learning","tech","creative"], time: "30 – 90 min", startingPoint: "Make a tiny webpage with one button.", related: ["3D Printing","Graphic Design"] },
  Gardening: { blurb: "Grow and care for plants in soil or containers.", tags: ["plants","outdoors","patient"], time: "30 – 60 min", startingPoint: "Plant one herb in a sunny pot.", related: ["Plant Propagation","Bonsai"] },
  Canning: { blurb: "Preserve food in sealed jars for longer storage.", tags: ["food","making","patient"], time: "2 – 4 hrs", startingPoint: "Follow a tested recipe for one small batch.", related: ["Sourdough","Gardening"] },
  "Candle Making": { blurb: "Create candles by melting wax around a wick.", tags: ["making","home","creative"], time: "1 – 2 hrs", startingPoint: "Make one candle from a beginner kit.", related: ["Soap Making","Resin Art"] },
  "Soap Making": { blurb: "Make bars of soap by combining oils with a cleansing base.", tags: ["making","home","creative"], time: "1 – 2 hrs", startingPoint: "Try a melt-and-pour soap kit.", related: ["Candle Making","Gardening"] },
  "Cake Decorating": { blurb: "Decorate cakes with frosting, piping, and edible details.", tags: ["food","creative","making"], time: "30 – 90 min", startingPoint: "Pipe simple stars onto a cupcake.", related: ["Painting","Sourdough"] },
  "Barbecue/Smoking": { blurb: "Cook food slowly over smoke or live fire.", tags: ["food","outdoors","patient"], time: "4 – 8 hrs", startingPoint: "Smoke one small batch of chicken.", related: ["Camping","Canning"] },
  "Chicken Keeping": { blurb: "Care for backyard chickens and collect fresh eggs.", tags: ["animals","home","patient"], time: "20 – 30 min/day", startingPoint: "Visit a coop and learn the daily routine.", related: ["Gardening","Beekeeping"] },
  Beekeeping: { blurb: "Maintain bee colonies and learn how honey is made.", tags: ["animals","outdoors","patient"], time: "1 – 2 hrs", startingPoint: "Tour a local apiary with a beekeeper.", related: ["Gardening","Chicken Keeping"] },
  "Video Games": { blurb: "Play video or tabletop games for challenge and fun.", tags: ["indoor","strategy","social"], time: "30 min – 2 hrs", startingPoint: "Play one beginner-friendly game for 30 minutes.", related: ["Puzzles","Chess"] },
  Puzzles: { blurb: "Solve pieces, clues, or patterns to complete a larger challenge.", tags: ["indoor","solo","patient"], time: "1 – 3 hrs", startingPoint: "Complete a 100-piece puzzle.", related: ["Escape Rooms","Chess"] },
  Magic: { blurb: "Learn illusions and techniques that create surprising effects.", tags: ["skill","social","performance"], time: "15 – 30 min", startingPoint: "Learn one simple card trick.", related: ["Juggling","Balloon Animals"] },
  Trivia: { blurb: "Test your knowledge by answering questions across many topics.", tags: ["social","learning","indoor"], time: "1 – 2 hrs", startingPoint: "Join a local trivia night.", related: ["Chess","Escape Rooms"] },
  "LEGO Building": { blurb: "Build models and inventions from interlocking LEGO pieces.", tags: ["making","creative","indoor"], time: "1 – 3 hrs", startingPoint: "Build one small set without instructions.", related: ["Model Kit Building","3D Printing"] },
  Bedazzling: { blurb: "Decorate clothing or accessories with sparkling gems.", tags: ["creative","fashion","making"], time: "30 – 60 min", startingPoint: "Add gems to one small accessory.", related: ["Nail Art","Jewelry Making"] },
  Crochet: { blurb: "Create fabric by looping yarn with a single hook.", tags: ["making","creative","patient"], time: "30 – 60 min", startingPoint: "Learn the chain stitch with one hook.", related: ["Embroidery","Quilting"] },
  "Air dry clay": { blurb: "Shape small sculptures that harden without a kiln.", tags: ["making","creative","solo"], time: "1 – 2 hrs", startingPoint: "Shape one small pinch pot.", related: ["Pottery","Resin Art"] },
  Pottery: { blurb: "Form objects from clay by hand or on a pottery wheel.", tags: ["making","creative","skill"], time: "2 – 3 hrs", startingPoint: "Take a beginner wheel or hand-building class.", related: ["Air dry clay","Painting"] },
  Journaling: { blurb: "Record thoughts, observations, or memories in writing.", tags: ["reflective","solo","writing"], time: "5 – 15 min", startingPoint: "Write three sentences about today.", related: ["Poetry","Scrapbooking"] },
  "Bag charms": { blurb: "Make small decorative charms to attach to a bag.", tags: ["creative","making","fashion"], time: "30 – 60 min", startingPoint: "Make one charm from beads or buttons.", related: ["Jewelry Making","Bedazzling"] },
  Calligraphy: { blurb: "Create expressive lettering with careful strokes and spacing.", tags: ["creative","writing","skill"], time: "20 – 40 min", startingPoint: "Practice one alphabet with a brush pen.", related: ["Journaling","Graphic Design"] },
  Coloring: { blurb: "Fill illustrations with color as a relaxing creative practice.", tags: ["creative","solo","relaxing"], time: "20 – 60 min", startingPoint: "Color one page with three colors.", related: ["Painting","Flower Pressing"] },
  Poetry: { blurb: "Use rhythm, imagery, and words to express an idea or feeling.", tags: ["writing","creative","reflective"], time: "15 – 30 min", startingPoint: "Write a four-line poem about something nearby.", related: ["Journaling","Voice lessons"] },
  Juggling: { blurb: "Keep multiple objects moving through the air in a pattern.", tags: ["skill","performance","solo"], time: "15 – 30 min", startingPoint: "Practice tossing one ball between hands.", related: ["Balloon Animals","Magic"] },
  "Balloon Animals": { blurb: "Twist balloons into playful figures and shapes.", tags: ["skill","performance","social"], time: "30 – 60 min", startingPoint: "Make a simple balloon dog while following a tutorial.", related: ["Juggling","Magic"] },
  Embroidery: { blurb: "Decorate fabric with stitched designs.", tags: ["making","creative","patient"], time: "30 – 60 min", startingPoint: "Learn a running stitch on scrap fabric.", related: ["Crochet","Quilting"] },
  Origami: { blurb: "Fold paper into sculptures, animals, and geometric forms.", tags: ["making","creative","solo"], time: "15 – 30 min", startingPoint: "Fold one paper crane.", related: ["Air dry clay","Calligraphy"] },
  Quilting: { blurb: "Join layers of fabric into a patterned, warm textile.", tags: ["making","creative","patient"], time: "1 – 3 hrs", startingPoint: "Piece two fabric squares together.", related: ["Crochet","Embroidery"] },
  "Resin Art": { blurb: "Create glossy decorative pieces by setting colored resin.", tags: ["making","creative","visual"], time: "2 – 4 hrs", startingPoint: "Make one small resin coaster with a kit.", related: ["Jewelry Making","Air dry clay"] },
  "Model Kit Building": { blurb: "Assemble and detail small scale models.", tags: ["making","patient","solo"], time: "2 – 5 hrs", startingPoint: "Assemble one small snap-fit model.", related: ["LEGO Building","3D Printing"] },
  "Jewelry Making": { blurb: "Design wearable pieces with beads, wire, metal, or cord.", tags: ["making","creative","fashion"], time: "1 – 2 hrs", startingPoint: "Make one bracelet with elastic cord.", related: ["Bag charms","Resin Art"] },
  "Slime Making": { blurb: "Mix stretchy, tactile slime in different colors and textures.", tags: ["making","creative","playful"], time: "20 – 30 min", startingPoint: "Mix one small batch of slime.", related: ["Air dry clay","Resin Art"] },
  "Makeup Artistry": { blurb: "Use makeup to create expressive looks and designs.", tags: ["creative","fashion","skill"], time: "30 – 60 min", startingPoint: "Practice one simple eyeshadow look.", related: ["Nail Art","Cosplaying"] },
  "Graphic Design": { blurb: "Combine type, color, and images to communicate visually.", tags: ["creative","tech","visual"], time: "1 – 2 hrs", startingPoint: "Make a simple poster with two fonts.", related: ["Photography","Painting"] },
  "Flower Pressing": { blurb: "Flatten and preserve flowers for art and keepsakes.", tags: ["creative","plants","patient"], time: "15 – 30 min + 1 week press", startingPoint: "Press a few fresh flowers in a book.", related: ["Gardening","Scrapbooking"] },
  "Tie-Dye": { blurb: "Create colorful patterns by folding, tying, and dyeing fabric.", tags: ["creative","making","colorful"], time: "2 – 4 hrs", startingPoint: "Tie-dye one plain cotton shirt.", related: ["Painting","Quilting"] },
  Concerts: { blurb: "Experience live music and the energy of a performing artist.", tags: ["music","social","experience"], time: "2 – 4 hrs", startingPoint: "Find a small local show and buy one ticket.", related: ["Guitar","DJing"] },
  Videography: { blurb: "Record and edit moving images to tell a story.", tags: ["media","creative","tech"], time: "1 – 2 hrs", startingPoint: "Shoot a 30-second video about your day.", related: ["Photography","Podcasting"] },
  "Voice lessons": { blurb: "Develop singing technique, pitch, and breath control.", tags: ["music","skill","performance"], time: "30 – 60 min", startingPoint: "Practice one song with a vocal warm-up.", related: ["Guitar","Beatboxing"] },
  Beatboxing: { blurb: "Make rhythmic sounds and musical beats with your voice.", tags: ["music","skill","performance"], time: "15 – 30 min", startingPoint: "Practice a basic kick-and-snare pattern.", related: ["Voice lessons","DJing"] },
  Watches: { blurb: "Study, collect, or repair timepieces and their mechanisms.", tags: ["collecting","learning","patient"], time: "30 – 60 min", startingPoint: "Learn the parts of one favorite watch.", related: ["Vinyl Records","Thrifting/Antiquing"] },
  "Fidget Trading": { blurb: "Collect and exchange small tactile toys with other people.", tags: ["collecting","social","playful"], time: "15 – 30 min", startingPoint: "Trade one fidget with a friend.", related: ["Bag charms","Video Games"] },
  "Vinyl Records": { blurb: "Collect and listen to music on physical vinyl records.", tags: ["collecting","music","patient"], time: "30 – 60 min", startingPoint: "Play one record from start to finish.", related: ["Concerts","DJing"] },
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
]))];

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

const sortFindings = [
  { label: "Stable pairings", value: "5", detail: "Chess + Escape Rooms, Guitar + DJing, Bonsai + Plant Propagation, and more" },
  { label: "Card sorts", value: "8", detail: "Repeated sorts helped separate durable relationships from one-off labels" },
  { label: "Ambiguous cards", value: "6", detail: "Sourdough, 3D Printing, Duo Lingo, Astronomy, Thrifting, and Rock Climbing" },
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
    targets: ["hobby/Thrifting/Antiquing", "facet/collecting", "category/creative-outlets"],
    targetLabel: "Thrifting/Antiquing (Creative Outlets › Collecting)",
  },
];

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
  allHobbies, categories, hobbies, sortFindings, tasks, searchConcepts, findFacet
};
