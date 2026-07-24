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
    summary: "steamed carrot puree, carrot+coconut+guava topping, overnight tempered oil dressing, pumpkin seeds, micro coriander, rava tuile",
    prepWindow: "All Fri (2 PM block + evening from 5 PM) + overnight oil dressing; Sat 2:45 PM final topping; assembly 7:00 PM",
    procurement: [
      { day: "Thursday", item: "Shopping only: buy carrots, curry leaves, pumpkin seeds, rava, rice flour; check pantry spices/oil/hing" },
      { day: "Friday morning", item: "Buy tender coconut, ripe guava, micro coriander" }
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
        name: "Overnight Tempered Oil Dressing",
        ingredients: [
          "150 ml Neutral Oil",
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
          "150 g Ripe Guava (fine dice / brunoise, seeds trimmed if fibrous)",
          "110 g Pumpkin Seeds (dry-toasted)",
          "1 bunch Micro Coriander",
          "13 Rava Tuile Shards (rava, rice flour, cumin, pepper batter cooked lacy thin)"
        ]
      }
    ],
    steps: [
      { id: "c1-serving-dishes", name: "Pick 3 communal serving platters for Course 1", phase: "Prep", when: "Fri 2:00 PM", station: "Bench", durationMin: 10, critical: true, dependsOn: [], fail: "Wrong-size dishes at plating time", fix: "Have backup rectangular platter or wooden board on standby", ingredients: [], actions: ["Pull out 3 communal platters wide enough for ~4 servings each", "Check they are food-safe, clean, and stack well in the fridge", "Set them aside on a shelf labeled 'Course 1 platters'", "If unsure, photograph the 3 dishes and confirm they visually work together"] },
      { id: "c1-coconut-procure", name: "Break tender coconut and scoop meat", phase: "Prep", when: "Fri Morning", station: "Bench", durationMin: 20, critical: true, dependsOn: [], fail: "Not enough meat / brown fibers", fix: "Open extra coconut; trim any brown skin", ingredients: ["3-4 Tender Coconuts (to yield 350 g soft white meat)"], actions: ["Crack open tender coconuts and drain the water into a clean jug (reserve for drink base)", "Scoop out only soft white meat with a spoon — avoid any brown or fibrous bits", "Weigh out 350 g minimum", "Store meat submerged in a little of its own water in a covered box in the fridge"] },
      { id: "c1-puree-cook", name: "Steam carrot puree base", phase: "Prep", when: "Fri 7:00 PM", station: "Stove", durationMin: 30, critical: true, dependsOn: ["global-labels"], fail: "Grainy puree", fix: "Steam 8-10 min longer and reblend", ingredients: ["1.7 kg Carrots (peeled & roughly chopped)", "35 g Fresh Ginger", "15 g Green Chilies"], actions: ["Peel and roughly chop carrots", "Steam carrots with ginger and green chilies until completely tender", "Test with fork — no resistance"] },
      { id: "c1-puree-blend", name: "Blend and chill carrot puree", phase: "Prep", when: "Fri 7:30 PM", station: "Blender", durationMin: 20, critical: true, dependsOn: ["c1-puree-cook"], fail: "Hot hold leads to flavor loss", fix: "Ice bath and re-season", ingredients: ["Steamed carrots (from c1-puree-cook)", "150 ml Thick Coconut Milk", "Salt to taste"], actions: ["Blend until silk-smooth with coconut milk and salt", "Adjust seasoning", "Chill rapidly in shallow tray on ice bath"] },
      { id: "c1-dressing-temper", name: "Make overnight tempered oil dressing", phase: "Prep", when: "Fri 8:00 PM", station: "Stove", durationMin: 15, critical: false, dependsOn: ["global-labels"], fail: "Flat dressing", fix: "Re-temper fresh aromatics", ingredients: ["150 ml Neutral Oil", "14 g Mustard Seeds", "15 g Curry Leaves (finely chopped)", "25 g Fresh Ginger (minced)", "15 g Green Chilies (minced)", "1.5 g Hing (Asafoetida)", "Salt & pinch of jaggery"], actions: ["Heat oil until shimmering", "Crackle mustard seeds", "Add curry leaves, minced ginger, green chilies, and hing", "Cook 30 sec so aromatics infuse the oil", "Turn off heat; season lightly with salt and a pinch of jaggery", "Cool to room temp, cover, and let infuse overnight — this is a plain aromatic oil (NO tamarind)"] },
      { id: "c1-seeds-toast", name: "Toast pumpkin seeds", phase: "Prep", when: "Fri 8:30 PM", station: "Stove", durationMin: 8, critical: false, dependsOn: [], fail: "Soft seeds", fix: "Re-toast in dry pan", ingredients: ["110 g Pumpkin Seeds"], actions: ["Dry-toast in pan until nutty and golden", "Cool fully before storing airtight"] },
      { id: "c1-tuile-stage", name: "Make rava tuile shards", phase: "Prep", when: "Fri 8:30 PM", station: "Stove", durationMin: 20, critical: false, dependsOn: [], fail: "Tuile softens", fix: "Rebake quick batch", ingredients: ["Rava (semolina)", "Rice flour", "Cumin", "Pepper", "Water", "Salt"], actions: ["Mix thin lacy batter", "Cook on hot flat pan until crisp and lacy", "Cool fully and shatter into sail-shaped shards", "Store airtight and dry"] },
      { id: "c1-micro-coriander-stage", name: "Pick and stage micro coriander", phase: "Prep", when: "Fri 9:00 PM", station: "Cold", durationMin: 5, critical: false, dependsOn: [], fail: "Wilted garnish", fix: "Refresh with backup microgreens", ingredients: ["1 bunch Micro Coriander"], actions: ["Pick clean leaves", "Store dry in lined box in fridge"] },
      { id: "c1-topping-prep", name: "Brunoise topping — carrot + tender coconut + guava", phase: "Pre-Service", when: "Sat 2:45 PM", station: "Cold", durationMin: 25, critical: true, dependsOn: ["c1-puree-blend", "c1-coconut-procure"], fail: "Soggy topping", fix: "Drain and re-chill uncovered 10 min", ingredients: ["350 g Tender Coconut Meat (ultra-fine dice / brunoise)", "150 g Fine Carrot Brunoise", "150 g Ripe Guava (fine dice / brunoise)"], actions: ["Dice tender coconut to ultra-fine brunoise", "Cut carrot to matching fine brunoise", "Dice guava to matching brunoise; trim seeds if fibrous", "Keep all three separate and undressed until send time", "Drain on paper and chill uncovered"] },
      { id: "c1-send", name: "Assemble and send Course 1", phase: "Send", when: "7:00 PM", station: "Pass", durationMin: 12, critical: true, dependsOn: ["global-arrival-gate", "c1-topping-prep", "c1-dressing-temper", "c1-seeds-toast", "c1-micro-coriander-stage", "c1-tuile-stage", "c1-serving-dishes"], fail: "Loss of texture", fix: "Rebuild final topping and replate", ingredients: [], actions: ["Bring out the 3 pre-selected communal platters", "Spread cold carrot puree on all 3 platters", "In a bowl, toss tender coconut brunoise + carrot brunoise + guava dice with the tempered oil dressing (oil only, no tamarind)", "Scatter dressed topping over puree", "Top with toasted pumpkin seeds and micro coriander", "Stand rava tuile shards upright", "Send immediately"] }
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
    prepWindow: "Filling Fri 6 PM, dough Sat morning, shaping Sat 4:30 PM",
    procurement: [
      { day: "Thursday", item: "Shopping only: buy wheat starch, tapioca starch, urad dal, curry leaves, ginger, chili, sesame oil, fresh coconut" }
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
      { id: "c2-fill-cook", name: "Cook and temper urad dal filling", phase: "Prep", when: "Fri 6:00 PM", station: "Stove", durationMin: 30, critical: true, dependsOn: ["global-labels"], fail: "Wet filling tears wrapper", fix: "Reduce further on low heat", ingredients: ["300 g Whole White Urad Dal (soaked 2 hours — start soak Fri morning or by 1:45 PM)", "4 Dry Red Chilies", "3 Green Chilies", "20 g Fresh Ginger", "2 g Hing", "12 g Mustard Seeds", "15 g Curry Leaves (chopped)", "60 g Fresh Grated Coconut", "25 ml Sesame/Gingelly Oil", "Salt"], actions: ["Confirm dal has been soaking ≥2 hr (drain)", "Grind soaked urad dal with red chilies, green chilies, ginger, hing and salt to coarse thick paste (minimal water)", "Steam paste in lined tray 12-15 min until cooked through", "Cool and crumble into fine grains", "Heat sesame oil, crackle mustard seeds and curry leaves", "Toss in crumbled dal and fresh grated coconut", "Cool completely and chill covered"] },
      { id: "c2-fill-portion", name: "Portion 28 urad filling scoops", phase: "Prep", when: "Fri 6:45 PM", station: "Cold", durationMin: 15, critical: true, dependsOn: ["c2-fill-cook"], fail: "Uneven pieces", fix: "Re-weigh and re-roll portions", ingredients: ["Cooked urad filling"], actions: ["Portion exactly 28 equal scoops (~1 tbsp each)", "Cover and chill until shaping"] },
      { id: "c2-dough-mix", name: "Knead crystal dumpling dough (C2 savory)", phase: "Prep", when: "Sat 10:30 AM", station: "Bench", durationMin: 20, critical: true, dependsOn: ["c2-fill-portion"], fail: "Dough cracks", fix: "Knead with warm water touch-ups", ingredients: ["280 g Wheat Starch", "140 g Tapioca Starch", "~420 ml Boiling Hot Water", "20 ml Neutral Oil", "Pinch of salt"], actions: ["Whisk starches together", "Pour boiling water directly while stirring rapidly to gelatinize", "Knead in oil to smooth elastic dough", "Keep covered under damp cloth", "Note: C6 sweet dough is a SEPARATE rice-tapioca dough — do not combine"] },
      { id: "c2-shape", name: "Shape 28 savory kozhukattai", phase: "Pre-Service", when: "Sat 4:30 PM", station: "Bench", durationMin: 35, critical: true, dependsOn: ["c2-dough-mix"], fail: "Dry skins", fix: "Mist cloth and re-seal tray", ingredients: ["Crystal dough (28 × ~20g balls)", "28 portions urad filling", "Banana leaf liners"], actions: ["Divide dough into 28 balls (~20g each)", "Roll each into ultra-thin circle", "Place 1 tbsp filling in center and pleat like crystal dim sum / money bag", "Hold under damp cloth in bamboo steamer until service"] },
      { id: "c2-steam", name: "Live-steam savory kozhukattai", phase: "Send", when: "~7:10 PM", station: "Steam", durationMin: 10, critical: true, dependsOn: ["global-arrival-gate", "c2-shape"], fail: "Opaque/raw center", fix: "Steam additional 1-2 min", ingredients: ["28 shaped savory kozhukattai", "Banana leaf liners"], actions: ["Steam on high heat over banana leaves 6-7 min", "Check wrappers turn translucent", "Drizzle curry leaf oil before serving"] },
      { id: "c2-send", name: "Send Course 2 on platters", phase: "Send", when: "~7:20 PM", station: "Pass", durationMin: 8, critical: true, dependsOn: ["c2-steam"], fail: "Dry flavor profile", fix: "Add measured finishing oil", ingredients: ["Steamed kozhukattai", "Curry leaf oil"], actions: ["Drizzle curry leaf oil over hot dumplings", "Send on 2 platters"] }
    ]
  },
  {
    id: "c3",
    label: "Course 3",
    name: "Rice-Dal Dome, Potato Podimas & Rasam",
    className: "c3",
    textClass: "tc3",
    colorLabel: "Red",
    format: "Individual plated — dome + podimas + rasam moat",
    yield: "13 portions (~120 g rice-dal dome + ~60 g podimas + 90 ml rasam each)",
    summary: "warm rice + toor dal dome (salt + ghee), potato podimas beside it, tomato-tamarind rasam poured around, finished with ghee and coriander",
    prepWindow: "Rasam Fri 5:30 PM, podimas Fri 6 PM, rice-dal cooked and domed at service (Sat 5 PM)",
    procurement: [
      { day: "Thursday", item: "Shopping only: buy potatoes, tomatoes, tamarind, rasam aromatics, fresh coriander, Ponni/Sona Masoori rice, toor dal, ghee" }
    ],
    components: [
      {
        name: "Rice + Dal Dome Base",
        ingredients: [
          "550 g Raw Ponni or Sona Masoori Rice (cooked soft, ~1.6 kg cooked)",
          "220 g Toor Dal (pressure-cooked plain until soft, mashed lightly)",
          "45 g Ghee (for folding in + drizzle)",
          "Salt to taste"
        ]
      },
      {
        name: "Potato Podimas",
        ingredients: [
          "850 g Yukon Gold / Boiled Potatoes (mashed coarsely)",
          "15 g Mustard Seeds + 10 g Split Urad Dal",
          "25 g Fresh Ginger (minced) + 15 g Green Chilies",
          "1.5 g Turmeric Powder + 2 g Hing",
          "15 g Curry Leaves + Juice of 1 Lemon",
          "Oil, Salt"
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
      },
      {
        name: "Finishing",
        ingredients: [
          "30 ml Warm Ghee (for drizzle at plate)",
          "1 small bunch Fresh Coriander (finely chopped)"
        ]
      }
    ],
    steps: [
      { id: "c3-podimas", name: "Make potato podimas", phase: "Prep", when: "Fri 6:00 PM", station: "Stove", durationMin: 25, critical: true, dependsOn: ["global-labels"], fail: "Soggy podimas", fix: "Cook off moisture on medium heat", ingredients: ["850 g Yukon Gold/Boiled Potatoes (mashed coarsely)", "15 g Mustard Seeds + 10 g Split Urad Dal", "25 g Fresh Ginger (minced) + 15 g Green Chilies", "1.5 g Turmeric Powder + 2 g Hing", "15 g Curry Leaves + Juice of 1 Lemon", "Oil, Salt"], actions: ["Heat oil, crackle mustard seeds and urad dal", "Add ginger, green chilies, curry leaves, turmeric, hing", "Toss in mashed potatoes, salt, and lemon juice", "Cook out any moisture; keep loose and crumbly", "Cool and chill in shallow tray"] },
      { id: "c3-rasam-reduce", name: "Make tomato-tamarind rasam", phase: "Prep", when: "Fri 5:30 PM", station: "Stove", durationMin: 35, critical: true, dependsOn: ["global-labels"], fail: "Thin rasam", fix: "Reduce further and adjust salt/acid", ingredients: ["1.2 L Water", "250 g Tomatoes (blanched & pureed)", "80 ml Tamarind Extract", "2 tbsp Rasam Powder", "1 tsp Black Pepper (coarsely crushed)", "1 tsp Cumin", "Ghee, Mustard, Hing, Curry Leaves, Fresh Coriander (tadka)"], actions: ["Simmer tomato puree, tamarind, rasam powder, pepper and cumin in water for 15 min", "Finish with hot ghee tadka (mustard, hing, curry leaves, coriander)", "Strain into thermal container and refrigerate"] },
      { id: "c3-cook-rice", name: "Cook rice soft (550 g raw Ponni/Sona Masoori)", phase: "Pre-Service", when: "Sat 4:45 PM", station: "Stove", durationMin: 25, critical: true, dependsOn: [], fail: "Grains too firm — dome cracks", fix: "Add splash of hot water, cover 5 min more", ingredients: ["550 g Raw Ponni or Sona Masoori Rice", "~1.4 L Water", "Pinch of salt"], actions: ["Rinse 550 g rice 2-3 times until water runs mostly clear", "Pressure cook / open pot cook with ~1.4 L water and a pinch of salt", "Cook until grains are SOFT and pliable (slightly more water than usual — should mash easily)", "Yields ~1.6 kg cooked rice", "Keep warm and covered"] },
      { id: "c3-cook-dal", name: "Cook plain toor dal (220 g)", phase: "Pre-Service", when: "Sat 4:45 PM", station: "Stove", durationMin: 25, critical: true, dependsOn: [], fail: "Undercooked dal — won't blend into rice", fix: "Pressure-cook 2 more whistles", ingredients: ["220 g Toor Dal", "~650 ml Water", "Pinch of salt"], actions: ["Rinse toor dal 2-3 times", "Pressure-cook plain with water and salt (NO turmeric, NO tempering — keep it plain)", "Cook until very soft", "Mash lightly with a whisk / ladle — leave slightly textured, not smooth"] },
      { id: "c3-rice-dal-mix", name: "Mix rice + dal + salt + ghee into dome mixture", phase: "Pre-Service", when: "Sat 5:15 PM", station: "Bench", durationMin: 10, critical: true, dependsOn: ["c3-cook-rice", "c3-cook-dal"], fail: "Cold or dry — dome won't hold", fix: "Warm briefly in covered pan; add a splash of hot water and extra ghee", ingredients: ["Warm cooked rice (from c3-cook-rice)", "Warm mashed toor dal (from c3-cook-dal)", "30 g Ghee (reserve 15 g for drizzle)", "Salt to taste"], actions: ["While both rice and dal are still warm, gently fold them together in a wide bowl", "Season with salt", "Fold in 30 g of ghee (reserve 15 g warm ghee for plate drizzle)", "Taste and adjust salt", "Cover and keep warm — do not let it dry out (mixture should be soft enough to pack into a dome mold)"] },
      { id: "c3-reheat", name: "Reheat rasam and transfer to thermal jug", phase: "Pre-Service", when: "Sat 5:20 PM", station: "Stove", durationMin: 10, critical: true, dependsOn: ["c3-rasam-reduce"], fail: "Cold rasam", fix: "Reboil 2 min before transfer", ingredients: ["Rasam from fridge"], actions: ["Bring rasam to full boil", "Taste and adjust seasoning", "Transfer to thermal jug; confirm temp above 70C"] },
      { id: "c3-pour-send", name: "Plate Course 3 — dome + podimas + rasam moat", phase: "Send", when: "~7:40 PM", station: "Pass", durationMin: 15, critical: true, dependsOn: ["c3-rice-dal-mix", "c3-podimas", "c3-reheat", "global-arrival-gate"], fail: "Cold plate / collapsed dome", fix: "Warm plates in advance; pack dome mold firmly and invert", ingredients: ["Warm rice-dal mix (from c3-rice-dal-mix)", "Podimas (from c3-podimas, re-warmed)", "Hot rasam (from c3-reheat)", "15 g reserved warm ghee", "Fresh coriander (finely chopped)"], actions: ["Warm plates", "Re-warm podimas in a pan for 2 min", "Pack warm rice-dal mix into a small bowl / dome mold and invert onto center of each plate", "Place a neat scoop of podimas beside the dome", "Pour hot rasam gently around the dome to form a moat (do not drown the dome)", "Drizzle warm ghee over the dome", "Shower chopped coriander on top", "Send immediately"] }
    ]
  },
  {
    id: "c4",
    label: "Course 4",
    name: "Banana Leaf Paneer Parcels — Duet (Classic + Raw Mango)",
    className: "c4",
    textClass: "tc4",
    colorLabel: "Green",
    format: "Duet on plate — 2 mini parcels per guest (1 classic + 1 raw mango)",
    yield: "26 mini parcels (2 × ~25 g each per plate)",
    summary: "two mini avial-paneer parcels per plate: one classic avial paste, one variant with grated raw mango folded into the same base",
    prepWindow: "Paste Fri 3 PM, wrap Sat morning, steam during Course 3",
    procurement: [
      { day: "Thursday", item: "Shopping only: buy paneer (650 g), sour curd, fresh coconut, raw mango (60 g, firm & sour), banana leaves (26 squares), cumin seeds, twine in 2 colors" }
    ],
    components: [
      {
        name: "Avial Paste — Base (used for both variants)",
        ingredients: [
          "280 g Fresh Grated Coconut",
          "20 g Green Chilies",
          "15 g Cumin Seeds",
          "150 g Sour Curd / Hung Yogurt (whisked thick)",
          "2 g Turmeric Powder + 2 g Hing",
          "20 ml Coconut Oil",
          "Salt to taste"
        ]
      },
      {
        name: "Raw Mango Variant Add-in (folded into half the base)",
        ingredients: [
          "60 g Raw Mango (finely grated, sour firm variety)",
          "Extra pinch of salt if mango is very tart"
        ]
      },
      {
        name: "Paneer",
        ingredients: ["650 g Fresh Paneer (cut into 26 mini slabs, ~25 g each)"]
      },
      {
        name: "Wrap & Garnish",
        ingredients: [
          "26 Banana Leaf Squares (softened over flame; palm-size for mini parcels)",
          "Thinly sliced Curry Leaves",
          "Coconut oil drizzle",
          "Twine — 2 colors (e.g. plain jute for classic, red for mango variant)"
        ]
      }
    ],
    steps: [
      { id: "c4-paste", name: "Blend base avial paste + split-and-fold raw mango variant", phase: "Prep", when: "Fri 3:00 PM", station: "Blender", durationMin: 25, critical: true, dependsOn: ["global-labels"], fail: "Paste too thin — leaks in steam", fix: "Reduce curd whey; reblend with more coconut", ingredients: ["280 g Fresh Grated Coconut", "20 g Green Chilies", "15 g Cumin Seeds", "150 g Sour Curd / Hung Yogurt (whisked thick)", "2 g Turmeric Powder + 2 g Hing", "20 ml Coconut Oil", "Salt", "60 g Raw Mango (finely grated) — for variant only"], actions: ["Blend coconut, green chilies, cumin seeds, turmeric with minimal water to fine thick paste", "Fold in sour curd, hing, coconut oil, and salt", "Divide paste equally into TWO containers (label A = classic, B = mango variant)", "Fold grated raw mango into container B; taste and re-season", "Hold both chilled"] },
      { id: "c4-paneer-cut", name: "Cut 26 mini paneer slabs (~25 g each)", phase: "Prep", when: "Sat 10:15 AM", station: "Cold", durationMin: 15, critical: true, dependsOn: ["c4-paste"], fail: "Uneven cooking", fix: "Re-cut to consistent size (~4×3×1.5 cm blocks)", ingredients: ["650 g Fresh Paneer"], actions: ["Cut paneer into 26 equal mini slabs (~25 g each, ~4×3×1.5 cm)", "Score lightly on all sides for paste absorption", "Keep chilled until wrapping"] },
      { id: "c4-wrap", name: "Coat and wrap 26 mini parcels (13 classic + 13 mango)", phase: "Prep", when: "Sat 10:30 AM", station: "Bench", durationMin: 35, critical: true, dependsOn: ["c4-paneer-cut"], fail: "Mixing up variants at plate", fix: "Use two twine colors and stage on two labeled trays", ingredients: ["26 scored mini paneer slabs", "Avial paste A (classic)", "Avial paste B (raw mango)", "26 Banana Leaf Squares (softened over flame)", "Thinly sliced Curry Leaves", "Coconut oil", "Twine — 2 colors"], actions: ["Soften banana leaves over flame until pliable", "Coat 13 paneer slabs heavily with paste A (classic); coat the other 13 with paste B (raw mango)", "Lay each on a leaf with curry leaves and a drop of coconut oil", "Fold tightly into sealed mini packets", "Tie classic parcels with plain twine, mango parcels with colored twine", "Stage on TWO labeled trays (Classic / Mango); refrigerate until steam"] },
      { id: "c4-steam-start", name: "Steam 26 mini parcels (8 min on high)", phase: "Send", when: "~7:40 PM", station: "Steam", durationMin: 12, critical: true, dependsOn: ["c4-wrap", "global-arrival-gate"], fail: "Cold center", fix: "Steam additional 2 min; QC one of each variant", ingredients: ["26 wrapped mini parcels (keep the two trays separated)"], actions: ["Load both trays into steamer(s), keeping classic and mango on separate levels/sections", "Steam on high 7-8 min (mini size cooks faster than 100 g slabs)", "QC one test parcel from each tray for heat-through"] },
      { id: "c4-send", name: "Send Course 4 duet — 1 classic + 1 mango per plate", phase: "Send", when: "~8:00 PM", station: "Pass", durationMin: 8, critical: true, dependsOn: ["c4-steam-start"], fail: "Guest gets 2 of same variant", fix: "Assign a runner to double-check twine colors before send", ingredients: [], actions: ["Plate 1 classic (plain twine) + 1 mango (colored twine) side-by-side on each plate", "Announce the duet at the table — leaves open at table", "Send all 13 plates together"] }
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
    summary: "crisp adai discs (with drumstick leaves), avial yogurt crema, sweet pumpkin mash, tempered shallot-tomato relish, steamed veg cubes",
    prepWindow: "Crema & pumpkin Fri 2 PM, batter par-cook Fri 6:30 PM, final crisp + board send at ~8:20 PM",
    procurement: [
      { day: "Thursday", item: "Shopping only: buy ash gourd, pumpkin, shallots, tomatoes, drumstick leaves (murungai keerai); confirm lentil/rice inventory (chana dal, toor dal, urad dal)" }
    ],
    components: [
      {
        name: "Adai Tostada Discs",
        ingredients: [
          "200 g Raw Rice + 100 g Boiled Rice",
          "120 g Chana Dal + 120 g Toor Dal + 60 g Urad Dal",
          "6 Dry Red Chilies + 2 g Hing + Salt",
          "1 cup (~40 g) Drumstick Leaves (murungai keerai, cleaned and chopped)",
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
      { id: "c5-avial-crema", name: "Make avial yogurt crema", phase: "Prep", when: "Fri 2:00 PM", station: "Blender", durationMin: 18, critical: true, dependsOn: [], fail: "Thin crema", fix: "Tighten with more hung curd", ingredients: ["350 g Thick Hung Curd", "100 g Ash Gourd (steamed & blended smooth)", "10 g Cumin", "2 Green Chilies", "Salt"], actions: ["Steam ash gourd until soft; blend smooth", "Whisk hung curd with ash gourd puree, green chili, cumin, and salt", "Blend until completely smooth", "Chill in squeeze bottle"] },
      { id: "c5-pumpkin-mash", name: "Make sweet pumpkin mash", phase: "Prep", when: "Fri 2:30 PM", station: "Stove", durationMin: 18, critical: true, dependsOn: [], fail: "Watery mash", fix: "Reduce on low heat", ingredients: ["300 g Red Pumpkin / Kadhu (steamed & mashed)", "30 g Jaggery", "0.5 tsp Dry Ginger Powder (Sukku)"], actions: ["Steam pumpkin until completely soft", "Mash and add jaggery and sukku", "Cook on low until glossy and thick", "Hold warm in covered container"] },
      { id: "c5-adai-parbake", name: "Par-cook 13 adai discs (with drumstick leaves)", phase: "Prep", when: "Fri 6:30 PM", station: "Stove", durationMin: 40, critical: true, dependsOn: [], fail: "Breakage on reheat / bitter leaves", fix: "Increase thickness slightly; blanch leaves 10s if very sharp", ingredients: ["200 g Raw Rice + 100 g Boiled Rice", "120 g Chana Dal + 120 g Toor Dal + 60 g Urad Dal", "6 Dry Red Chilies + 2 g Hing + Salt", "1 cup Drumstick Leaves (murungai keerai, cleaned and chopped)", "Oil/Ghee for par-baking"], actions: ["Confirm rice + lentils have soaked ≥4 hr (start by Fri morning or 1:45 PM at latest)", "Grind to coarse batter with hing and salt", "Wash and roughly chop drumstick leaves; pat dry", "Fold drumstick leaves into batter just before spreading", "Spread into 13 thin rounds on non-stick pan with ghee", "Par-cook to 80%", "Cool and store separated by parchment paper"] },
      { id: "c5-test-bake", name: "Test-bake 1 adai disc on Friday to confirm oven reheat works", phase: "Prep", when: "Fri 7:15 PM", station: "Oven", durationMin: 15, critical: true, dependsOn: ["c5-adai-parbake"], fail: "Adai stays soft / burns / cracks — need to adjust temp before Saturday service", fix: "Try lower temp longer bake, or higher temp shorter bake; note the winning setting on the label", ingredients: ["1 spare par-cooked adai disc"], actions: ["Preheat oven to 200C", "Take 1 spare par-cooked adai and place on tray", "Bake 4-5 min — check for even golden color and audible snap when tapped", "If soft: bake 1-2 min more; if too dark: reduce to 190C next time", "Taste it — texture should be crisp on outside, cooked through inside", "WRITE the confirmed oven temp + bake time on the storage container for Saturday service", "If completely wrong (bitter/burnt/soggy), troubleshoot NOW while there's still time — not on Saturday"] },
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
    summary: "cardamom payasam panna cotta domes, Valencia orange-coconut kozhakattai (rice-tapioca wrapper, 16), ginger-panakam fluid gel, karupatti-sukku tuile, salted cashew-karupatti crumb (anchor), mint oil, candied ginger",
    prepWindow: "Domes & filling Fri 2–4 PM (long chill), gel/tuile/crumb Fri evening, sweet shaping Sat afternoon, live steam before send",
    procurement: [
      { day: "Thursday", item: "Shopping only: buy whole milk, thick coconut milk, dark karupatti jaggery, cardamom, sukku, raw whole cashews (100 g), flaky sea salt, plain white sugar, 2 Valencia oranges, 1 lemon, mint, 80 g fresh ginger, ghee/butter, fine roasted rice flour (idiyappam flour), tapioca starch, agar-agar, all-purpose flour; confirm 13 silicone half-sphere molds, parchment/banana leaves for steamer" }
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
        name: "Element 2 - Valencia Orange & Coconut Kozhakattai (16 pieces)",
        ingredients: [
          "Wrapper: 2 cups Fine Roasted Rice Flour (Idiyappam flour)",
          "Wrapper: 2/3 cup Tapioca Starch",
          "Wrapper: 2 to 2.25 cups Rolling Boiling Water",
          "Wrapper: 2 tsp Ghee or Oil",
          "Wrapper: 0.25 tsp Salt",
          "Filling: 2 cups Grated Fresh Coconut (fresh white, no brown skin)",
          "Filling: 1 cup Plain White Sugar",
          "Filling: 2 tbsp Valencia Orange Zest (finely grated)",
          "Filling: 1/4 cup (4 tbsp) Fresh Valencia Orange Juice",
          "Filling: 1 tsp Lemon Juice",
          "Filling: 2 tsp Ghee or Butter",
          "Filling: 0.25 tsp Cardamom Powder"
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
      },
      {
        name: "Element 6 - Salted Roasted Cashew & Karupatti Crumb (dome anchor)",
        ingredients: [
          "100 g Raw Whole Cashews (coarsely chopped)",
          "20 g (1.5 tbsp) Pure Cow Ghee",
          "30 g Dark Karupatti / Palm Jaggery (finely grated)",
          "4 g (~3/4 tsp) Flaky Sea Salt (or coarse Kosher salt)",
          "0.25 tsp Powdered Green Cardamom",
          "0.125 tsp Dry Ginger Powder (Sukku)"
        ]
      }
    ],
    steps: [
      { id: "c6-dome", name: "Make payasam panna cotta domes (13 molds)", phase: "Prep", when: "Fri 2:00 PM", station: "Stove/Cold", durationMin: 40, critical: true, dependsOn: ["global-labels"], fail: "Unset domes — unusable", fix: "Reboil agar base and reset into fresh molds", ingredients: ["400 ml Whole Dairy Milk", "400 ml Thick Coconut Milk", "120 g Dark Karupatti (Palm Jaggery) Syrup", "6 g Powdered Agar-Agar", "1 tsp Green Cardamom Powder"], actions: ["Start EARLY on Fri afternoon so domes get full overnight chill", "Simmer dairy milk with cardamom", "Add jaggery syrup and coconut milk on low heat", "Whisk in agar-agar and bring to full boil exactly 2 min", "Pour into 13 silicone half-sphere molds", "Chill minimum 4 hours (or overnight) until wobbly-set"] },
      { id: "c6-gel", name: "Make ginger-panakam fluid gel", phase: "Prep", when: "Fri 5:00 PM", station: "Stove/Blender", durationMin: 25, critical: true, dependsOn: ["global-labels"], fail: "Gel too firm or grainy", fix: "Blend with measured warm water; adjust agar next batch", ingredients: ["250 ml Panakam base (water, jaggery, lime, ginger, cardamom)", "3 g Agar-Agar"], actions: ["Boil panakam base with agar-agar for exactly 2 min", "Pour into flat tray and chill until completely firm", "Blend in high-speed blender to silky smooth", "Transfer to piping bag; refrigerate"] },
      { id: "c6-tuile", name: "Bake karupatti-sukku tuile shards", phase: "Prep", when: "Fri 5:30 PM", station: "Oven", durationMin: 20, critical: false, dependsOn: ["global-labels"], fail: "Loss of crispness", fix: "Rebake a fresh quick batch", ingredients: ["30 g Dark Palm Jaggery Syrup", "25 g Melted Unsalted Butter", "25 g Egg Whites or Aquafaba", "25 g All-Purpose Flour", "Pinch Dry Ginger Powder (Sukku)"], actions: ["Whisk jaggery syrup + butter + egg white/aquafaba", "Fold in flour and sukku", "Spread paper-thin on silicone mat", "Bake at 165C for 6-8 min until glassy", "Cool and break into shards; store airtight"] },
      { id: "c6-filling", name: "Cook Valencia orange coconut filling (16 balls)", phase: "Prep", when: "Fri 3:30 PM", station: "Stove", durationMin: 15, critical: true, dependsOn: ["global-labels"], fail: "Leaky filling — MUST be cold before shaping", fix: "Reduce further until spread holds shape; refrigerate overnight", ingredients: ["2 cups Grated Fresh Coconut (fresh white, no brown skin)", "1 cup Plain White Sugar", "2 tbsp Valencia Orange Zest (finely grated)", "1/4 cup Fresh Valencia Orange Juice", "1 tsp Lemon Juice", "2 tsp Ghee or Butter", "0.25 tsp Cardamom Powder"], actions: ["Heat 2 tsp ghee in a wide pan over medium-low heat", "Add 2 cups fresh coconut and sauté lightly for 1-2 min", "Stir in 1 cup sugar, 1/4 cup orange juice, and 1 tsp lemon juice", "Cook on low as sugar melts; stir until mixture thickens into a soft, glossy, non-sticky mass (~4-5 min)", "Remove from heat immediately", "Stir in 2 tbsp orange zest and 1/4 tsp cardamom powder", "Cool completely, then divide into exactly 16 equal balls", "Refrigerate overnight — must be fully cold before Saturday shaping"] },
      { id: "c6-candy", name: "Candy ginger ribbons for garnish", phase: "Prep", when: "Fri 9:00 PM", station: "Stove", durationMin: 20, critical: false, dependsOn: [], fail: "Fibrous garnish", fix: "Slice thinner and re-simmer", ingredients: ["80 g Fresh Ginger (thin ribbons)", "Simple syrup (equal parts water + sugar)"], actions: ["Slice ginger into thin ribbons", "Simmer in simple syrup 10 min until translucent", "Drain and cool; store in syrup in fridge"] },
      { id: "c6-crumb", name: "Make salted roasted cashew & karupatti crumb (dome anchor)", phase: "Prep", when: "Fri 8:00 PM", station: "Stove", durationMin: 20, critical: false, dependsOn: ["global-labels"], fail: "Sticky lump / burnt cashews", fix: "Cool fully before pulsing; re-toast a fresh batch if burnt", ingredients: ["100 g Raw Whole Cashews (coarsely chopped)", "20 g (1.5 tbsp) Pure Cow Ghee", "30 g Dark Karupatti / Palm Jaggery (finely grated)", "4 g (~3/4 tsp) Flaky Sea Salt", "0.25 tsp Powdered Green Cardamom", "0.125 tsp Dry Ginger Powder (Sukku)"], actions: ["Heat ghee in a small pan over medium-low heat", "Add chopped cashews and stir continuously until light golden brown and fragrant (~4–5 min)", "Turn off heat; immediately stir in grated karupatti, sea salt, cardamom, and sukku — residual heat coats the cashews in a salty caramel film", "Spread onto parchment paper and cool completely (~10 min)", "Once cold and firm, pulse briefly in a food processor OR crush coarsely with a rolling pin to a coarse 'soil' / crumble texture", "Store airtight at room temp (good for up to 3 days)"] },
      { id: "c6-mint", name: "Make mint oil", phase: "Pre-Service", when: "Sat 4:00 PM", station: "Blender", durationMin: 20, critical: true, dependsOn: [], fail: "Bitter oil", fix: "Short blanch and reblend", ingredients: ["Fresh mint leaves (large handful)", "50 ml Neutral Oil"], actions: ["Blanch mint 10 sec in boiling water", "Shock in ice water immediately", "Squeeze dry; blend with neutral oil", "Strain through fine sieve", "Hold in squeeze bottle"] },
      { id: "c6-dough-mix", name: "Knead translucent rice-tapioca dough (C6 sweet, 16 pieces)", phase: "Pre-Service", when: "Sat 10:30 AM", station: "Bench", durationMin: 15, critical: true, dependsOn: ["c6-filling"], fail: "Dough cracks — sweet wrappers ruined", fix: "Knead with warm water touch-ups; keep under damp cloth", ingredients: ["2 cups Fine Roasted Rice Flour (Idiyappam flour)", "2/3 cup Tapioca Starch", "2 to 2.25 cups Rolling Boiling Water", "2 tsp Ghee or Oil", "0.25 tsp Salt"], actions: ["Whisk rice flour + tapioca starch + salt in a heatproof bowl", "Pour 2 cups rolling boiling water directly over the mixture; stir vigorously with a sturdy spoon into a shaggy dough (add remaining 1/4 cup hot water only if dry flour remains)", "Cover the bowl tightly for 4 minutes to trap the steam", "Add 2 tsp ghee and knead while warm until smooth and glossy", "Cover with a damp towel so it stays soft", "Divide into 16 equal balls (keep covered as you work)"] },
      { id: "c6-shape", name: "Shape 16 Valencia orange kozhakattai", phase: "Pre-Service", when: "Sat 3:10 PM", station: "Bench", durationMin: 25, critical: true, dependsOn: ["c6-filling", "c6-dough-mix"], fail: "Wrapper cracking — filling MUST be cold", fix: "Warm dough patch knead; keep filling cold throughout; work in 2 halves so starch dough doesn't dry out", ingredients: ["16 dough balls", "16 cold orange-coconut filling balls", "Ghee for greasing palms"], actions: ["Ensure filling is fully cold before starting", "Lightly grease palms with ghee", "Flatten a dough ball into a thin disk (thinner at edges, slightly thicker in center)", "Place one orange-coconut filling ball in the center", "Pleat or fold the edges together and pinch firmly at the top to seal into a dim sum pouch / modak shape", "Repeat for all 16; work in 2 halves if slow — starch dough dries quickly", "Hold covered under damp cloth in bamboo steamer; refrigerate"] },
      { id: "c6-steam", name: "Live-steam sweet kozhakattai (2 batches if needed)", phase: "Send", when: "~8:35 PM", station: "Steam", durationMin: 12, critical: true, dependsOn: ["c6-shape", "global-arrival-gate"], fail: "Opaque wrapper — undercooked", fix: "Steam 1-2 min more", ingredients: ["16 shaped sweet kozhakattai", "Parchment paper or greased banana leaves"], actions: ["Line steamer/idli plate with parchment or greased banana leaves", "Arrange kozhakattai with space between each (steam in 2 batches if steamer isn't wide enough)", "Steam on high heat for 8 min", "Turn off heat and REST 2 min before opening — wrappers turn soft, semi-translucent, glossy as they cool slightly"] },
      { id: "c6-send", name: "Plate and send Course 6 dessert", phase: "Send", when: "~8:40 PM", station: "Pass", durationMin: 15, critical: true, dependsOn: ["c6-dome", "c6-gel", "c6-tuile", "c6-mint", "c6-candy", "c6-crumb", "c6-steam"], fail: "Incomplete landscape", fix: "Use garnish fallback checklist before send", ingredients: [], actions: ["Place 1 tablespoon (~15 g) of cashew-karupatti crumb in the center of each dessert plate as an anchor", "Unmold panna cotta dome directly onto the crumb (holds the dome in place + adds crunch)", "Place 1 warm sweet orange kozhukattai alongside", "Pipe dots of ginger-panakam gel", "Drop mint oil", "Scatter candied ginger ribbons", "Crown with upright karupatti-sukku tuile shard", "Send all 13 portions together"] }
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
      { id: "drink-base", name: "Make panakam concentrate", phase: "Prep", when: "Fri 9:30 PM", station: "Cold", durationMin: 15, critical: false, dependsOn: [], fail: "Unbalanced sweetness", fix: "Adjust with lime and jaggery", ingredients: ["Palm jaggery", "Dry ginger", "Cardamom", "Lime"], actions: ["Dissolve palm jaggery in water", "Add dry ginger and cardamom", "Squeeze lime juice; strain", "Balance sweet/acid; chill overnight"] },
      { id: "drink-send", name: "Serve panakam soda on arrival", phase: "Service", when: "Sat 6:00 PM - 7:00 PM", station: "Beverage", durationMin: 45, critical: false, dependsOn: ["drink-base", "global-arrival-gate"], fail: "Flat drink", fix: "Top each glass fresh with soda", ingredients: ["Chilled panakam base", "Soda", "Ice", "Mint"], actions: ["Pour chilled base over ice", "Top with soda", "Garnish with mint sprig", "Serve per glass as guests arrive"] }
    ]
  }
];
