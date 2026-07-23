window.PB_COURSES = [
  {
    id: "c1",
    label: "Course 1",
    name: "Carrot & Tender Coconut Iguru",
    className: "c1",
    textClass: "tc1",
    colorLabel: "Orange",
    format: "3 communal platters, ~4 servings each",
    yield: "13 portions",
    summary: "steamed carrot puree, carrot+coconut topping, overnight tamarind tadka dressing, pumpkin seeds, micro coriander, rava tuile",
    prepWindow: "Friday prep + overnight dressing; Saturday final assembly at 7:00 PM",
    procurement: [
      { day: "Wednesday", item: "Check pantry spices/oil/hing" },
      { day: "Thursday", item: "Buy carrots, tamarind, curry leaves" },
      { day: "Friday", item: "Buy tender coconut and micro coriander; make rava tuile shards" }
    ],
    components: [
      {
        name: "Carrot Puree Base",
        ingredients: [
          "1.7 kg Carrots (peeled & roughly chopped)",
          "35 g Fresh Ginger",
          "15 g Green Chilies",
          "150 ml Thick Coconut Milk",
          "Salt to taste"
        ]
      },
      {
        name: "Overnight Tamarind Tadka Dressing",
        ingredients: [
          "250 ml Tamarind Extract (medium concentration)",
          "95 ml Neutral Oil",
          "14 g Mustard Seeds",
          "15 g Curry Leaves (finely chopped)",
          "25 g Fresh Ginger (minced)",
          "15 g Green Chilies (minced)",
          "1.5 g Hing (Asafoetida)",
          "Salt & pinch of jaggery"
        ]
      },
      {
        name: "Fresh Topping & Garnishes",
        ingredients: [
          "350 g Tender Coconut Meat (ultra-fine dice / brunoise)",
          "150 g Fine Carrot Brunoise",
          "110 g Pumpkin Seeds (dry-toasted)",
          "1 bunch Micro Coriander",
          "13 Rava Tuile Shards (rava, rice flour, cumin, pepper batter cooked lacy thin)"
        ]
      }
    ],
    steps: [
      { id: "c1-puree-cook", name: "Steam carrot puree base", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 30, critical: true, dependsOn: ["global-labels"], fail: "Grainy puree", fix: "Steam 8-10 min longer and reblend", ingredients: ["1.7 kg Carrots (peeled & roughly chopped)", "35 g Fresh Ginger", "15 g Green Chilies"], actions: ["Peel and roughly chop carrots", "Steam carrots with ginger and green chilies until completely tender", "Test with fork — no resistance"] },
      { id: "c1-puree-blend", name: "Blend and chill carrot puree", phase: "Prep", when: "Fri Night", station: "Blender", durationMin: 20, critical: true, dependsOn: ["c1-puree-cook"], fail: "Hot hold leads to flavor loss", fix: "Ice bath and re-season", ingredients: ["Steamed carrots (from c1-puree-cook)", "150 ml Thick Coconut Milk", "Salt to taste"], actions: ["Blend until silk-smooth with coconut milk and salt", "Adjust seasoning", "Chill rapidly in shallow tray on ice bath"] },
      { id: "c1-dressing-temper", name: "Make overnight tamarind tadka dressing", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 15, critical: false, dependsOn: ["global-labels"], fail: "Flat dressing", fix: "Re-temper fresh aromatics", ingredients: ["250 ml Tamarind Extract (medium concentration)", "95 ml Neutral Oil", "14 g Mustard Seeds", "15 g Curry Leaves (finely chopped)", "25 g Fresh Ginger (minced)", "15 g Green Chilies (minced)", "1.5 g Hing (Asafoetida)", "Salt & pinch of jaggery"], actions: ["Heat oil until shimmering", "Crackle mustard seeds", "Add curry leaves, minced ginger, green chilies, and hing", "Pour hot tadka directly into tamarind extract", "Whisk well, adjust salt and jaggery", "Cover and let infuse overnight"] },
      { id: "c1-seeds-toast", name: "Toast pumpkin seeds", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 8, critical: false, dependsOn: [], fail: "Soft seeds", fix: "Re-toast in dry pan", ingredients: ["110 g Pumpkin Seeds"], actions: ["Dry-toast in pan until nutty and golden", "Cool fully before storing airtight"] },
      { id: "c1-tuile-stage", name: "Make rava tuile shards", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 20, critical: false, dependsOn: [], fail: "Tuile softens", fix: "Rebake quick batch", ingredients: ["Rava (semolina)", "Rice flour", "Cumin", "Pepper", "Water", "Salt"], actions: ["Mix thin lacy batter", "Cook on hot flat pan until crisp and lacy", "Cool fully and shatter into sail-shaped shards", "Store airtight and dry"] },
      { id: "c1-micro-coriander-stage", name: "Pick and stage micro coriander", phase: "Prep", when: "Fri Night", station: "Cold", durationMin: 5, critical: false, dependsOn: [], fail: "Wilted garnish", fix: "Refresh with backup microgreens", ingredients: ["1 bunch Micro Coriander"], actions: ["Pick clean leaves", "Store dry in lined box in fridge"] },
      { id: "c1-topping-prep", name: "Brunoise topping — carrot + tender coconut", phase: "Pre-Service", when: "Sat 2:45 PM", station: "Cold", durationMin: 20, critical: true, dependsOn: ["c1-puree-blend"], fail: "Soggy topping", fix: "Drain and re-chill uncovered 10 min", ingredients: ["350 g Tender Coconut Meat (ultra-fine dice / brunoise)", "150 g Fine Carrot Brunoise"], actions: ["Dice tender coconut to ultra-fine brunoise", "Cut carrot to matching fine brunoise", "Keep separate and undressed until send time", "Drain on paper and chill uncovered"] },
      { id: "c1-send", name: "Assemble and send Course 1", phase: "Send", when: "7:00 PM", station: "Pass", durationMin: 12, critical: true, dependsOn: ["global-arrival-gate", "c1-topping-prep", "c1-dressing-temper", "c1-seeds-toast", "c1-micro-coriander-stage", "c1-tuile-stage"], fail: "Loss of texture", fix: "Rebuild final topping and replate", ingredients: [], actions: ["Spread cold carrot puree on 3 communal platters", "Toss tender coconut and carrot brunoise with tamarind dressing", "Scatter topping over puree", "Top with toasted pumpkin seeds and micro coriander", "Stand rava tuile shards upright", "Send immediately"] }
    ]
  },
  {
    id: "c2",
    label: "Course 2",
    name: "Ulundu Kozhukattai Dim Sum (Savory)",
    className: "c2",
    textClass: "tc2",
    colorLabel: "Yellow",
    format: "2 communal platters (13 + 15)",
    yield: "28 dumplings (2 per person + 2 spares)",
    summary: "crystal dumpling dough, ulundu filling with coconut, curry leaf oil drizzle",
    prepWindow: "Filling Thu/Fri, dough Sat morning, shaping Sat 4:30 PM",
    procurement: [
      { day: "Wednesday", item: "Check wheat starch and tapioca starch" },
      { day: "Thursday", item: "Buy urad dal, curry leaves, ginger, chili, sesame oil, fresh coconut" }
    ],
    components: [
      {
        name: "Crystal Dumpling Dough",
        ingredients: [
          "280 g Wheat Starch",
          "140 g Tapioca Starch",
          "~420 ml Boiling Hot Water",
          "20 ml Neutral Oil",
          "Pinch of salt"
        ]
      },
      {
        name: "Ulundu (Urad Dal) Filling",
        ingredients: [
          "300 g Whole White Urad Dal (soaked 2 hours)",
          "4 Dry Red Chilies",
          "3 Green Chilies",
          "20 g Fresh Ginger",
          "2 g Hing",
          "12 g Mustard Seeds",
          "15 g Curry Leaves (chopped)",
          "60 g Fresh Grated Coconut",
          "25 ml Sesame/Gingelly Oil",
          "Salt to taste"
        ]
      },
      {
        name: "Finish",
        ingredients: [
          "Curry leaf oil drizzle",
          "Banana leaf liners for mini steamers"
        ]
      }
    ],
    steps: [
      { id: "c2-fill-cook", name: "Cook and temper urad dal filling", phase: "Prep", when: "Thu Night", station: "Stove", durationMin: 30, critical: true, dependsOn: ["global-labels"], fail: "Wet filling tears wrapper", fix: "Reduce further on low heat", ingredients: ["300 g Whole White Urad Dal (soaked 2 hours)", "4 Dry Red Chilies", "3 Green Chilies", "20 g Fresh Ginger", "2 g Hing", "12 g Mustard Seeds", "15 g Curry Leaves (chopped)", "60 g Fresh Grated Coconut", "25 ml Sesame/Gingelly Oil", "Salt"], actions: ["Grind soaked urad dal with red chilies, green chilies, ginger, hing and salt to coarse thick paste (minimal water)", "Steam paste in lined tray 12-15 min until cooked through", "Cool and crumble into fine grains", "Heat sesame oil, crackle mustard seeds and curry leaves", "Toss in crumbled dal and fresh grated coconut", "Cool completely and chill covered"] },
      { id: "c2-fill-portion", name: "Portion 28 urad filling scoops", phase: "Prep", when: "Fri Night", station: "Cold", durationMin: 15, critical: true, dependsOn: ["c2-fill-cook"], fail: "Uneven pieces", fix: "Re-weigh and re-roll portions", ingredients: ["Cooked urad filling"], actions: ["Portion exactly 28 equal scoops (~1 tbsp each)", "Cover and chill until shaping"] },
      { id: "c2-dough-mix", name: "Knead crystal dumpling dough (C2 portion)", phase: "Prep", when: "Sat 10:30 AM", station: "Bench", durationMin: 20, critical: true, dependsOn: ["c2-fill-portion"], fail: "Dough cracks", fix: "Knead with warm water touch-ups", ingredients: ["280 g Wheat Starch", "140 g Tapioca Starch", "~420 ml Boiling Hot Water", "20 ml Neutral Oil", "Pinch of salt"], actions: ["Whisk starches together", "Pour boiling water directly while stirring rapidly to gelatinize", "Knead in oil to smooth elastic dough", "Keep covered under damp cloth", "Note: make as part of combined-crystal-dough batch if doing C2+C6 together"] },
      { id: "c2-shape", name: "Shape 28 savory kozhukattai", phase: "Pre-Service", when: "Sat 4:30 PM", station: "Bench", durationMin: 35, critical: true, dependsOn: ["c2-dough-mix"], fail: "Dry skins", fix: "Mist cloth and re-seal tray", ingredients: ["Crystal dough (28 × ~20g balls)", "28 portions urad filling", "Banana leaf liners"], actions: ["Divide dough into 28 balls (~20g each)", "Roll each into ultra-thin circle", "Place 1 tbsp filling in center and pleat like crystal dim sum / money bag", "Hold under damp cloth in bamboo steamer until service"] },
      { id: "c2-steam", name: "Live-steam savory kozhukattai", phase: "Send", when: "~7:10 PM", station: "Steam", durationMin: 10, critical: true, dependsOn: ["global-arrival-gate", "c2-shape"], fail: "Opaque/raw center", fix: "Steam additional 1-2 min", ingredients: ["28 shaped savory kozhukattai", "Banana leaf liners"], actions: ["Steam on high heat over banana leaves 6-7 min", "Check wrappers turn translucent", "Drizzle curry leaf oil before serving"] },
      { id: "c2-send", name: "Send Course 2 on platters", phase: "Send", when: "~7:20 PM", station: "Pass", durationMin: 8, critical: true, dependsOn: ["c2-steam"], fail: "Dry flavor profile", fix: "Add measured finishing oil", ingredients: ["Steamed kozhukattai", "Curry leaf oil"], actions: ["Drizzle curry leaf oil over hot dumplings", "Send on 2 platters"] }
    ]
  },
  {
    id: "c3",
    label: "Course 3",
    name: "Crispy Potato Rice Spheres + Warm Rasam",
    className: "c3",
    textClass: "tc3",
    colorLabel: "Red",
    format: "Individual bowls, tableside pour",
    yield: "26 spheres (2 per person) + 1.2 L Rasam",
    summary: "potato podimas spheres in sticky rice, idli batter coat, ghee-baked crisp, hot tomato-tamarind rasam pour",
    prepWindow: "Rasam Friday, spheres Saturday morning, bake + pour at service",
    procurement: [
      { day: "Thursday", item: "Buy potatoes, tomatoes, tamarind, rasam aromatics" },
      { day: "Friday", item: "Buy Ponni/Seeraga Samba rice; check thermal jug and serving bowls" }
    ],
    components: [
      {
        name: "Potato Podimas Core",
        ingredients: [
          "850 g Yukon Gold/Boiled Potatoes (mashed coarsely)",
          "15 g Mustard Seeds + 10 g Split Urad Dal",
          "25 g Fresh Ginger (minced) + 15 g Green Chilies",
          "1.5 g Turmeric Powder + 2 g Hing",
          "15 g Curry Leaves + Juice of 1 Lemon",
          "Oil, Salt"
        ]
      },
      {
        name: "Outer Rice Crust",
        ingredients: [
          "700 g Cooked Ponni / Seeraga Samba Rice (warm, lightly mashed with 2 tbsp coconut milk)",
          "120 ml Thin Idli/Dosa Batter (structural binding coat)",
          "45 ml Ghee (for brushing)"
        ]
      },
      {
        name: "Tangy Tomato-Tamarind Rasam",
        ingredients: [
          "1.2 L Water",
          "250 g Tomatoes (blanched & pureed)",
          "80 ml Tamarind Extract",
          "2 tbsp Rasam Powder",
          "1 tsp Black Pepper (coarsely crushed)",
          "1 tsp Cumin",
          "Tadka: Ghee, mustard, hing, curry leaves, fresh coriander"
        ]
      }
    ],
    steps: [
      { id: "c3-podimas", name: "Make potato podimas core balls", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 25, critical: true, dependsOn: ["global-labels"], fail: "Loose mix — spheres won't hold", fix: "Reduce moisture and cool longer", ingredients: ["850 g Yukon Gold/Boiled Potatoes (mashed coarsely)", "15 g Mustard Seeds + 10 g Split Urad Dal", "25 g Fresh Ginger (minced) + 15 g Green Chilies", "1.5 g Turmeric Powder + 2 g Hing", "15 g Curry Leaves + Juice of 1 Lemon", "Oil, Salt"], actions: ["Heat oil, crackle mustard seeds and urad dal", "Add ginger, green chilies, curry leaves, turmeric, hing", "Toss in mashed potatoes, salt, and lemon juice", "Cool completely", "Roll into 26 balls (~25g each)", "Chill on tray until Saturday morning"] },
      { id: "c3-rasam-reduce", name: "Make tomato-tamarind rasam", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 35, critical: true, dependsOn: ["global-labels"], fail: "Thin rasam", fix: "Reduce further and adjust salt/acid", ingredients: ["1.2 L Water", "250 g Tomatoes (blanched & pureed)", "80 ml Tamarind Extract", "2 tbsp Rasam Powder", "1 tsp Black Pepper (coarsely crushed)", "1 tsp Cumin", "Ghee, Mustard, Hing, Curry Leaves, Fresh Coriander (tadka)"], actions: ["Simmer tomato puree, tamarind, rasam powder, pepper and cumin in water for 15 min", "Finish with hot ghee tadka (mustard, hing, curry leaves, coriander)", "Strain into thermal container and refrigerate"] },
      { id: "c3-spheres-build", name: "Encase podimas in sticky rice + coat with idli batter", phase: "Prep", when: "Sat 10:00 AM", station: "Bench", durationMin: 40, critical: true, dependsOn: ["c3-podimas"], fail: "Cracking spheres or loose coating", fix: "Tighten rice layer and recoat; chill before baking", ingredients: ["26 podimas balls (from c3-podimas)", "700 g Cooked Ponni/Seeraga Samba Rice (warm, lightly mashed with 2 tbsp coconut milk)", "120 ml Thin Idli/Dosa Batter (structural binding coat)", "45 ml Ghee (for brushing)"], actions: ["Encase each podimas ball in warm sticky rice (~25g rice per sphere)", "Roll gently to form an even sphere", "Coat each sphere lightly in thin idli batter", "Place on parchment-lined baking tray", "Brush generously with ghee", "Chill tray until 7:25 PM service bake"] },
      { id: "c3-reheat", name: "Reheat rasam and transfer to thermal jug", phase: "Pre-Service", when: "Sat 5:20 PM", station: "Stove", durationMin: 10, critical: true, dependsOn: ["c3-rasam-reduce"], fail: "Cold rasam ruins tableside pour", fix: "Reboil 2 min before transfer", ingredients: ["Rasam from fridge"], actions: ["Bring rasam to full boil", "Taste and adjust seasoning", "Transfer to thermal jug; confirm temp above 70C"] },
      { id: "c3-bake", name: "Bake spheres until shatter-crisp", phase: "Send", when: "Sat 7:25 PM", station: "Oven", durationMin: 15, critical: true, dependsOn: ["c3-spheres-build", "global-arrival-gate"], fail: "Soft exterior", fix: "Extend bake 2-3 min", ingredients: [], actions: ["Preheat oven to 200C", "Brush spheres with ghee", "Bake 12-15 min until shatter-crisp", "Do not open oven in first 10 min"] },
      { id: "c3-pour-send", name: "Plate and send with tableside rasam pour", phase: "Send", when: "~7:40 PM", station: "Pass", durationMin: 12, critical: true, dependsOn: ["c3-bake", "c3-reheat"], fail: "Loss of contrast", fix: "Rebake emergency batch", ingredients: [], actions: ["Place 2 crispy spheres in each warm soup bowl", "Pour hot rasam tableside from thermal jug", "Send immediately"] }
    ]
  },
  {
    id: "c4",
    label: "Course 4",
    name: "Banana Leaf Paneer Parcels (Avial Style)",
    className: "c4",
    textClass: "tc4",
    colorLabel: "Green",
    format: "Individual parcel service",
    yield: "13 parcels, ~100g paneer each",
    summary: "coconut-avial paste, scored paneer blocks, banana leaf wrapped and steamed",
    prepWindow: "Paste Thu, wrap Sat morning, steam during Course 3",
    procurement: [
      { day: "Thursday", item: "Buy paneer, sour curd, fresh coconut, raw mango if using" },
      { day: "Friday", item: "Buy/confirm banana leaves, cumin seeds" }
    ],
    components: [
      {
        name: "Avial / Mor Kuzhambu Steaming Paste",
        ingredients: [
          "280 g Fresh Grated Coconut",
          "20 g Green Chilies",
          "15 g Cumin Seeds",
          "150 g Sour Curd / Hung Yogurt (whisked thick)",
          "30 g Raw Mango (optional, for tartness)",
          "2 g Turmeric Powder + 2 g Hing",
          "20 ml Coconut Oil",
          "Salt to taste"
        ]
      },
      {
        name: "Paneer",
        ingredients: ["1.3 kg Fresh Paneer (cut into 13 equal rectangular slabs, ~100g each)"]
      },
      {
        name: "Wrap & Garnish",
        ingredients: [
          "13 Banana Leaf Squares (softened over flame)",
          "Thinly sliced Curry Leaves",
          "Coconut oil drizzle"
        ]
      }
    ],
    steps: [
      { id: "c4-paste", name: "Blend avial steaming paste", phase: "Prep", when: "Thu Night", station: "Blender", durationMin: 20, critical: true, dependsOn: ["global-labels"], fail: "Paste too thin — leaks in steam", fix: "Reduce curd whey; reblend with more coconut", ingredients: ["280 g Fresh Grated Coconut", "20 g Green Chilies", "15 g Cumin Seeds", "150 g Sour Curd / Hung Yogurt (whisked thick)", "30 g Raw Mango (optional, for tartness)", "2 g Turmeric Powder + 2 g Hing", "20 ml Coconut Oil", "Salt"], actions: ["Blend coconut, green chilies, cumin seeds, raw mango, turmeric with minimal water to fine thick paste", "Fold in sour curd, hing, coconut oil, and salt", "Taste and adjust tartness", "Hold chilled"] },
      { id: "c4-paneer-cut", name: "Cut 13 equal paneer slabs", phase: "Prep", when: "Sat 10:15 AM", station: "Cold", durationMin: 10, critical: true, dependsOn: ["c4-paste"], fail: "Uneven cooking", fix: "Re-cut to consistent size", ingredients: ["1.3 kg Fresh Paneer"], actions: ["Cut paneer into 13 equal rectangular slabs (~100g each)", "Score lightly on all sides for paste absorption", "Keep chilled until wrapping"] },
      { id: "c4-wrap", name: "Coat and wrap 13 paneer parcels in banana leaf", phase: "Prep", when: "Sat 10:30 AM", station: "Bench", durationMin: 25, critical: true, dependsOn: ["c4-paneer-cut"], fail: "Leakage in steam", fix: "Rewrap and pin seam with toothpick", ingredients: ["Scored paneer slabs (from c4-paneer-cut)", "Avial paste (from c4-paste)", "13 Banana Leaf Squares (softened over flame)", "Thinly sliced Curry Leaves", "Coconut oil"], actions: ["Soften banana leaves over flame until pliable", "Coat each paneer slab heavily with avial paste on all sides", "Lay on banana leaf with curry leaves and a drop of coconut oil", "Fold tightly into sealed packet and tie with twine", "Stage seam-side down; refrigerate until steam"] },
      { id: "c4-steam-start", name: "Steam paneer parcels (10 min on high)", phase: "Send", when: "~7:40 PM", station: "Steam", durationMin: 15, critical: true, dependsOn: ["c4-wrap", "global-arrival-gate"], fail: "Cold center", fix: "Steam additional 2-3 min; QC one parcel", ingredients: ["13 wrapped parcels"], actions: ["Load all 13 parcels into steamer(s)", "Steam on high for 10 min", "QC one test parcel for heat-through"] },
      { id: "c4-send", name: "Send Course 4", phase: "Send", when: "~8:00 PM", station: "Pass", durationMin: 6, critical: true, dependsOn: ["c4-steam-start"], fail: "Service delay", fix: "Stagger send in two trays", ingredients: [], actions: ["Serve hot paneer parcels with tongs on plates", "Leaf opens at table"] }
    ]
  },
  {
    id: "c5",
    label: "Course 5",
    name: "Adai Tostada Board",
    className: "c5",
    textClass: "tc5",
    colorLabel: "Blue",
    format: "3 guided self-assembly boards",
    yield: "13 crisp Adai discs (~10-12 cm diameter)",
    summary: "crisp adai discs, avial yogurt crema, sweet pumpkin mash, tempered shallot-tomato relish, steamed veg cubes",
    prepWindow: "Bases by Fri, final crisp and board send at ~8:20 PM",
    procurement: [
      { day: "Wednesday", item: "Check lentils/rice inventory; check chana dal and toor dal" },
      { day: "Thursday", item: "Buy ash gourd, pumpkin, shallots, tomatoes" }
    ],
    components: [
      {
        name: "Adai Tostada Discs",
        ingredients: [
          "200 g Raw Rice + 100 g Boiled Rice",
          "120 g Chana Dal + 120 g Toor Dal + 60 g Urad Dal",
          "6 Dry Red Chilies + 2 g Hing + Salt",
          "Oil/Ghee for par-baking & crisping"
        ]
      },
      {
        name: "Avial Yogurt Crema",
        ingredients: [
          "350 g Thick Hung Curd",
          "100 g Ash Gourd (steamed & blended smooth)",
          "10 g Cumin + 2 Green Chilies (blended into curd base)",
          "Salt"
        ]
      },
      {
        name: "Sweet Pumpkin Mash",
        ingredients: [
          "300 g Red Pumpkin / Kadhu (steamed & mashed)",
          "30 g Jaggery",
          "0.5 tsp Dry Ginger Powder (Sukku)"
        ]
      },
      {
        name: "Tempered Shallot & Tomato Relish",
        ingredients: [
          "150 g Shallots (finely diced)",
          "80 g Tomato Flesh (deseeded & diced)",
          "Lime juice, salt",
          "Mustard / urad dal / curry leaf tadka"
        ]
      },
      {
        name: "Garnish",
        ingredients: ["150 g mixed steamed fine cubes of carrot, beans, and raw banana"]
      }
    ],
    steps: [
      { id: "c5-avial-crema", name: "Make avial yogurt crema", phase: "Prep", when: "Wed Night", station: "Blender", durationMin: 18, critical: true, dependsOn: [], fail: "Thin crema", fix: "Tighten with more hung curd", ingredients: ["350 g Thick Hung Curd", "100 g Ash Gourd (steamed & blended smooth)", "10 g Cumin", "2 Green Chilies", "Salt"], actions: ["Steam ash gourd until soft; blend smooth", "Whisk hung curd with ash gourd puree, green chili, cumin, and salt", "Blend until completely smooth", "Chill in squeeze bottle"] },
      { id: "c5-pumpkin-mash", name: "Make sweet pumpkin mash", phase: "Prep", when: "Wed Night", station: "Stove", durationMin: 18, critical: true, dependsOn: [], fail: "Watery mash", fix: "Reduce on low heat", ingredients: ["300 g Red Pumpkin / Kadhu (steamed & mashed)", "30 g Jaggery", "0.5 tsp Dry Ginger Powder (Sukku)"], actions: ["Steam pumpkin until completely soft", "Mash and add jaggery and sukku", "Cook on low until glossy and thick", "Hold warm in covered container"] },
      { id: "c5-adai-parbake", name: "Par-cook 13 adai discs on Friday", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 35, critical: true, dependsOn: [], fail: "Breakage on reheat", fix: "Increase thickness slightly", ingredients: ["200 g Raw Rice + 100 g Boiled Rice", "120 g Chana Dal + 120 g Toor Dal + 60 g Urad Dal", "6 Dry Red Chilies + 2 g Hing + Salt", "Oil/Ghee for par-baking"], actions: ["Soak rice and lentils together 4 hours with red chilies", "Grind to coarse batter with hing and salt", "Spread into 13 thin rounds on non-stick pan with ghee", "Par-cook to 80%", "Cool and store separated by parchment paper"] },
      { id: "c5-relish", name: "Make shallot-tomato relish", phase: "Prep", when: "Sat 2:30 PM", station: "Stove", durationMin: 15, critical: true, dependsOn: [], fail: "Relish too sharp", fix: "Balance with jaggery and simmer", ingredients: ["150 g Shallots (finely diced)", "80 g Tomato Flesh (deseeded & diced)", "Lime juice, Salt", "Mustard, urad dal, curry leaf tadka"], actions: ["Toss raw shallots and tomatoes with lime juice and salt", "Heat oil and crackle mustard seeds, urad dal, curry leaves", "Pour crackling hot tadka over shallot-tomato mix"] },
      { id: "c5-veg-garnish", name: "Steam veg garnish cubes", phase: "Prep", when: "Sat 3:00 PM", station: "Steam", durationMin: 12, critical: true, dependsOn: [], fail: "Mushy garnish", fix: "Re-steam fresh batch with shorter time", ingredients: ["150 g mixed fine cubes of carrot, beans, and raw banana"], actions: ["Cut carrot, beans, and raw banana into fine matching cubes", "Steam to tender-crisp — not soft", "Cool and hold chilled"] },
      { id: "c5-recrisp", name: "Re-crisp adai discs in oven before service", phase: "Send", when: "~8:05 PM", station: "Oven", durationMin: 8, critical: true, dependsOn: ["c5-adai-parbake", "global-arrival-gate"], fail: "Soft base — board falls flat", fix: "Extend 1-2 min and vent steam", ingredients: ["13 par-cooked adai discs"], actions: ["Preheat oven to 200C", "Place adai discs on tray", "Bake 4-5 min until golden and snap-dry", "Vent steam by cracking oven door 10 sec before board build"] },
      { id: "c5-send", name: "Assemble and send Course 5 tostada boards", phase: "Send", when: "~8:20 PM", station: "Pass", durationMin: 8, critical: true, dependsOn: ["c5-recrisp", "c5-avial-crema", "c5-pumpkin-mash", "c5-relish", "c5-veg-garnish"], fail: "Imbalanced board", fix: "Reportion bowls evenly", ingredients: [], actions: ["Place warm crisp adai disc on board", "Pipe ring of avial crema", "Place dollop of pumpkin mash in center", "Spoon shallot-tomato relish", "Scatter steamed veg cubes", "Give 20-second table assembly instruction"] }
    ]
  },
  {
    id: "c6",
    label: "Course 6",
    name: "Sweet Orange Kozhukattai & Payasam Panna Cotta",
    className: "c6",
    textClass: "tc6",
    colorLabel: "Purple",
    format: "Individual plated dessert (13 portions)",
    yield: "13 Panna Cotta Domes + 13 Sweet Kozhukattais (shape 15 for spares)",
    summary: "cardamom payasam panna cotta domes, orange-jaggery crystal kozhukattai, ginger-panakam fluid gel, karupatti-sukku tuile, mint oil, candied ginger",
    prepWindow: "Domes/gel/tuile Thu-Fri, sweet shaping Sat afternoon, live steam before send, mint oil and candied ginger ready before plating",
    procurement: [
      { day: "Wednesday", item: "Check/buy agar, wheat starch, tapioca starch, flour" },
      { day: "Thursday", item: "Buy whole milk, thick coconut milk, dark karupatti jaggery, cardamom, sukku" },
      { day: "Friday", item: "Buy 2 oranges, mint, 80g fresh ginger; confirm 13 silicone half-sphere molds" }
    ],
    components: [
      {
        name: "Element 1 - Cardamom Payasam Panna Cotta Domes",
        ingredients: [
          "400 ml Whole Dairy Milk",
          "400 ml Thick Coconut Milk",
          "120 g Dark Karupatti (Palm Jaggery) Syrup",
          "6 g Powdered Agar-Agar",
          "1 tsp Green Cardamom Powder"
        ]
      },
      {
        name: "Element 2 - Sweet Orange-Jaggery Crystal Kozhukattais",
        ingredients: [
          "Wrapper: 150 g Wheat Starch",
          "Wrapper: 75 g Tapioca Starch",
          "Wrapper: ~220 ml Boiling Water",
          "Wrapper: 10 ml Neutral Oil",
          "Filling: 200 g Grated Fresh Coconut",
          "Filling: 140 g Dark Jaggery",
          "Filling: Zest of 2 Oranges",
          "Filling: 60 ml Fresh Orange Juice",
          "Filling: 0.5 tsp Cardamom Powder"
        ]
      },
      {
        name: "Element 3 - Ginger-Panakam Fluid Gel",
        ingredients: [
          "250 ml Panakam base (water, jaggery, lime, ginger, cardamom)",
          "3 g Agar-Agar"
        ]
      },
      {
        name: "Element 4 - Karupatti-Sukku Tuile Shards",
        ingredients: [
          "30 g Dark Palm Jaggery Syrup",
          "25 g Melted Unsalted Butter",
          "25 g Egg Whites or Aquafaba",
          "25 g All-Purpose Flour",
          "Pinch Dry Ginger Powder (Sukku)"
        ]
      },
      {
        name: "Element 5 - Garnishes",
        ingredients: [
          "Mint Oil: fresh mint leaves blanched + 50 ml neutral oil, strained",
          "Candied Ginger Ribbons: 80 g fresh ginger simmered in simple syrup"
        ]
      }
    ],
    steps: [
      { id: "c6-dome", name: "Make payasam panna cotta domes (13 molds)", phase: "Prep", when: "Thu Night", station: "Stove/Cold", durationMin: 40, critical: true, dependsOn: ["global-labels"], fail: "Unset domes — unusable", fix: "Reboil agar base and reset into fresh molds", ingredients: ["400 ml Whole Dairy Milk", "400 ml Thick Coconut Milk", "120 g Dark Karupatti (Palm Jaggery) Syrup", "6 g Powdered Agar-Agar", "1 tsp Green Cardamom Powder"], actions: ["Simmer dairy milk with cardamom", "Add jaggery syrup and coconut milk on low heat", "Whisk in agar-agar and bring to full boil exactly 2 min", "Pour into 13 silicone half-sphere molds", "Chill minimum 4 hours until wobbly-set"] },
      { id: "c6-gel", name: "Make ginger-panakam fluid gel", phase: "Prep", when: "Thu Night", station: "Stove/Blender", durationMin: 25, critical: true, dependsOn: ["global-labels"], fail: "Gel too firm or grainy", fix: "Blend with measured warm water; adjust agar next batch", ingredients: ["250 ml Panakam base (water, jaggery, lime, ginger, cardamom)", "3 g Agar-Agar"], actions: ["Boil panakam base with agar-agar for exactly 2 min", "Pour into flat tray and chill until completely firm", "Blend in high-speed blender to silky smooth", "Transfer to piping bag; refrigerate"] },
      { id: "c6-tuile", name: "Bake karupatti-sukku tuile shards", phase: "Prep", when: "Thu Night", station: "Oven", durationMin: 20, critical: false, dependsOn: ["global-labels"], fail: "Loss of crispness", fix: "Rebake a fresh quick batch", ingredients: ["30 g Dark Palm Jaggery Syrup", "25 g Melted Unsalted Butter", "25 g Egg Whites or Aquafaba", "25 g All-Purpose Flour", "Pinch Dry Ginger Powder (Sukku)"], actions: ["Whisk jaggery syrup + butter + egg white/aquafaba", "Fold in flour and sukku", "Spread paper-thin on silicone mat", "Bake at 165C for 6-8 min until glassy", "Cool and break into shards; store airtight"] },
      { id: "c6-filling", name: "Cook sweet orange-jaggery coconut filling", phase: "Prep", when: "Thu Night", station: "Stove", durationMin: 20, critical: true, dependsOn: ["global-labels"], fail: "Leaky filling — MUST be cold before shaping", fix: "Reduce further until spread holds shape; refrigerate overnight", ingredients: ["200 g Grated Fresh Coconut", "140 g Dark Jaggery", "Zest of 2 Oranges", "60 ml Fresh Orange Juice", "0.5 tsp Cardamom Powder"], actions: ["Melt jaggery with orange juice in pan", "Stir in grated coconut and orange zest", "Cook on low 5 min until thick and glossy", "Finish with cardamom", "Cool completely and refrigerate — must be cold before shaping on Saturday"] },
      { id: "c6-candy", name: "Candy ginger ribbons for garnish", phase: "Prep", when: "Fri Night", station: "Stove", durationMin: 20, critical: false, dependsOn: [], fail: "Fibrous garnish", fix: "Slice thinner and re-simmer", ingredients: ["80 g Fresh Ginger (thin ribbons)", "Simple syrup (equal parts water + sugar)"], actions: ["Slice ginger into thin ribbons", "Simmer in simple syrup 10 min until translucent", "Drain and cool; store in syrup in fridge"] },
      { id: "c6-mint", name: "Make mint oil", phase: "Pre-Service", when: "Sat 4:00 PM", station: "Blender", durationMin: 20, critical: true, dependsOn: [], fail: "Bitter oil", fix: "Short blanch and reblend", ingredients: ["Fresh mint leaves (large handful)", "50 ml Neutral Oil"], actions: ["Blanch mint 10 sec in boiling water", "Shock in ice water immediately", "Squeeze dry; blend with neutral oil", "Strain through fine sieve", "Hold in squeeze bottle"] },
      { id: "c6-dough-mix", name: "Knead crystal dumpling dough (C6 sweet portion)", phase: "Pre-Service", when: "Sat 10:30 AM", station: "Bench", durationMin: 15, critical: true, dependsOn: ["c6-filling"], fail: "Dough cracks — sweet wrappers ruined", fix: "Knead with warm water touch-ups", ingredients: ["150 g Wheat Starch", "75 g Tapioca Starch", "~220 ml Boiling Water", "10 ml Neutral Oil", "Salt"], actions: ["Whisk starches", "Pour boiling water while stirring to gelatinize", "Knead in oil; keep under damp cloth", "Note: make as combined-crystal-dough batch with C2 if doing together"] },
      { id: "c6-shape", name: "Shape 15 sweet orange kozhukattai", phase: "Pre-Service", when: "Sat 3:10 PM", station: "Bench", durationMin: 35, critical: true, dependsOn: ["c6-filling", "c6-dough-mix"], fail: "Wrapper cracking — filling MUST be cold", fix: "Warm dough patch knead; keep filling cold throughout", ingredients: ["Crystal dough (15 × ~20g balls)", "15 portions cold orange-jaggery filling"], actions: ["Ensure filling is fully cold before starting", "Roll each dough ball into thin circle", "Fill with cold filling and pleat into moneybag shape", "Hold covered in bamboo steamer; refrigerate"] },
      { id: "c6-steam", name: "Live-steam sweet kozhukattai", phase: "Send", when: "~8:35 PM", station: "Steam", durationMin: 10, critical: true, dependsOn: ["c6-shape", "global-arrival-gate"], fail: "Opaque wrapper — undercooked", fix: "Steam 1-2 min more", ingredients: ["15 shaped sweet kozhukattai"], actions: ["Steam on high 5-6 min until wrappers turn crystal-clear", "Check translucency before plating"] },
      { id: "c6-send", name: "Plate and send Course 6 dessert", phase: "Send", when: "~8:40 PM", station: "Pass", durationMin: 15, critical: true, dependsOn: ["c6-dome", "c6-gel", "c6-tuile", "c6-mint", "c6-candy", "c6-steam"], fail: "Incomplete landscape", fix: "Use garnish fallback checklist before send", ingredients: [], actions: ["Unmold panna cotta dome onto each dessert plate", "Place 1 warm sweet orange kozhukattai alongside", "Pipe dots of ginger-panakam gel", "Drop mint oil", "Scatter candied ginger ribbons", "Crown with upright karupatti-sukku tuile shard", "Send all 13 portions together"] }
    ]
  },
  {
    id: "drink",
    label: "Welcome Drink",
    name: "Panakam Soda",
    className: "drink",
    textClass: "tdrink",
    colorLabel: "Brown",
    format: "Arrival drink",
    yield: "12-14 glasses",
    summary: "panakam base + soda + ice + mint",
    prepWindow: "Friday prep; Saturday arrival service",
    procurement: [
      { day: "Friday", item: "Buy soda, mint, ice backup" }
    ],
    components: [
      { name: "Base", ingredients: ["Palm jaggery", "Dry ginger", "Cardamom", "Lime"] },
      { name: "Serve", ingredients: ["Soda", "Ice", "Mint"] }
    ],
    steps: [
      { id: "drink-base", name: "Make panakam concentrate", phase: "Prep", when: "Fri Night", station: "Cold", durationMin: 15, critical: false, dependsOn: [], fail: "Unbalanced sweetness", fix: "Adjust with lime and jaggery", ingredients: ["Palm jaggery", "Dry ginger", "Cardamom", "Lime"], actions: ["Dissolve palm jaggery in water", "Add dry ginger and cardamom", "Squeeze lime juice; strain", "Balance sweet/acid; chill overnight"] },
      { id: "drink-send", name: "Serve panakam soda on arrival", phase: "Service", when: "Sat 6:00 PM - 7:00 PM", station: "Beverage", durationMin: 45, critical: false, dependsOn: ["drink-base", "global-arrival-gate"], fail: "Flat drink", fix: "Top each glass fresh with soda", ingredients: ["Chilled panakam base", "Soda", "Ice", "Mint"], actions: ["Pour chilled base over ice", "Top with soda", "Garnish with mint sprig", "Serve per glass as guests arrive"] }
    ]
  }
];
