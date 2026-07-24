// Master shopping list — one row per ingredient.
// Quantities are MERGED across all courses that use the item.
// `aliases` are matched (case-insensitive substring) against the Quantity Book
// so ticking a shopping row also ticks the corresponding Quantity Book row(s).
window.PB_PROCUREMENT = [
  // ────── Thursday: Vegetables (non-perishable / firm) ──────
  { id: "carrots", day: "Thursday", category: "Vegetables", item: "Carrots", qty: "1.8 kg", usedIn: "C1 puree (1.7 kg) + C5 veg garnish", aliases: ["carrot"] },
  { id: "potatoes", day: "Thursday", category: "Vegetables", item: "Yukon Gold / boiling potatoes", qty: "900 g", usedIn: "C3 podimas", aliases: ["potato"] },
  { id: "ash-gourd", day: "Thursday", category: "Vegetables", item: "Ash gourd", qty: "500 g", usedIn: "C5 avial crema", aliases: ["ash gourd"] },
  { id: "red-pumpkin", day: "Thursday", category: "Vegetables", item: "Red pumpkin (kadhu)", qty: "350 g", usedIn: "C5 sweet mash", aliases: ["pumpkin"] },
  { id: "shallots", day: "Thursday", category: "Vegetables", item: "Shallots", qty: "220 g", usedIn: "C5 relish", aliases: ["shallot"] },
  { id: "tomatoes", day: "Thursday", category: "Vegetables", item: "Tomatoes", qty: "350 g", usedIn: "C3 rasam (250 g) + C5 relish (80 g)", aliases: ["tomato"] },
  { id: "french-beans", day: "Thursday", category: "Vegetables", item: "French beans", qty: "60 g", usedIn: "C5 veg garnish cubes", aliases: ["beans"] },
  { id: "raw-banana", day: "Thursday", category: "Vegetables", item: "Raw banana", qty: "1 nos (~150 g)", usedIn: "C5 veg garnish cubes", aliases: ["raw banana", "steamed veg"] },
  { id: "raw-mango", day: "Thursday", category: "Vegetables", item: "Raw mango (firm, sour)", qty: "100 g", usedIn: "C4 mango variant paste", aliases: ["raw mango"] },
  { id: "curry-leaves", day: "Thursday", category: "Vegetables", item: "Curry leaves", qty: "1 large bunch (~60 g)", usedIn: "C1, C2, C3, C5 tadkas", aliases: ["curry leaves", "curry leaf"] },
  { id: "ginger", day: "Thursday", category: "Vegetables", item: "Fresh ginger", qty: "250 g", usedIn: "C1, C2, C3, C4, C6 candy (80 g), drink", aliases: ["fresh ginger", "ginger"] },
  { id: "green-chilies", day: "Thursday", category: "Vegetables", item: "Green chilies", qty: "60 g", usedIn: "C1, C2, C3, C4, C5", aliases: ["green chili", "green chilies"] },
  { id: "limes", day: "Thursday", category: "Vegetables", item: "Limes / lemons", qty: "6 nos", usedIn: "C3 podimas, C4, C6, drink", aliases: ["lime", "lemon"] },

  // ────── Thursday: Dairy & Protein ──────
  { id: "paneer", day: "Thursday", category: "Dairy & Protein", item: "Paneer (fresh block)", qty: "650 g", usedIn: "C4 parcels", aliases: ["paneer"] },
  { id: "thick-curd", day: "Thursday", category: "Dairy & Protein", item: "Thick sour curd", qty: "600 g", usedIn: "C4 avial paste (200 g) + C5 hung curd crema (350 g)", aliases: ["curd"] },
  { id: "whole-milk", day: "Thursday", category: "Dairy & Protein", item: "Whole dairy milk", qty: "500 ml", usedIn: "C6 panna cotta dome", aliases: ["whole dairy milk", "dairy milk"] },
  { id: "thick-coconut-milk", day: "Thursday", category: "Dairy & Protein", item: "Thick coconut milk (tinned)", qty: "600 ml", usedIn: "C1 puree (150 ml) + C6 dome (400 ml)", aliases: ["coconut milk"] },
  { id: "fresh-coconut", day: "Thursday", category: "Dairy & Protein", item: "Fresh coconut (whole)", qty: "2 large (~500 g grated)", usedIn: "C2 filling (60 g), C4 paste (170 g), C6 filling (200 g)", aliases: ["fresh coconut", "grated coconut"] },
  { id: "ghee", day: "Thursday", category: "Dairy & Protein", item: "Pure cow ghee", qty: "250 g", usedIn: "C1, C3 (45 g rice-dal + drizzle), C6 crumb (20 g), C6 filling (10 g)", aliases: ["ghee"] },
  { id: "unsalted-butter", day: "Thursday", category: "Dairy & Protein", item: "Unsalted butter", qty: "30 g", usedIn: "C6 tuile", aliases: ["unsalted butter", "butter"] },

  // ────── Thursday: Grains, Lentils, Flours ──────
  { id: "sona-masoori-rice", day: "Thursday", category: "Grains & Lentils", item: "Ponni / Sona Masoori rice", qty: "550 g", usedIn: "C3 rice-dal dome", aliases: ["raw ponni", "sona masoori", "ponni"] },
  { id: "raw-rice-adai", day: "Thursday", category: "Grains & Lentils", item: "Raw rice (for adai)", qty: "200 g", usedIn: "C5 adai batter", aliases: ["raw rice"] },
  { id: "boiled-rice", day: "Thursday", category: "Grains & Lentils", item: "Boiled / parboiled rice", qty: "100 g", usedIn: "C5 adai batter", aliases: ["boiled rice", "parboiled"] },
  { id: "toor-dal", day: "Thursday", category: "Grains & Lentils", item: "Toor dal", qty: "400 g", usedIn: "C3 dome (220 g) + C4 paste (50 g) + C5 adai (120 g)", aliases: ["toor dal"] },
  { id: "urad-dal-whole", day: "Thursday", category: "Grains & Lentils", item: "Whole white urad dal", qty: "300 g", usedIn: "C2 kozhukattai filling", aliases: ["whole white urad", "whole urad", "urad dal"] },
  { id: "urad-dal-split", day: "Thursday", category: "Grains & Lentils", item: "Split urad dal", qty: "100 g", usedIn: "C3 podimas tadka + C5 adai batter (60 g)", aliases: ["split urad", "urad dal"] },
  { id: "chana-dal", day: "Thursday", category: "Grains & Lentils", item: "Chana dal", qty: "150 g", usedIn: "C5 adai batter", aliases: ["chana dal"] },
  { id: "idiyappam-flour", day: "Thursday", category: "Grains & Lentils", item: "Fine roasted rice flour (Idiyappam flour)", qty: "250 g", usedIn: "C6 sweet kozhakattai wrapper", aliases: ["idiyappam", "rice flour"] },
  { id: "wheat-starch", day: "Thursday", category: "Grains & Lentils", item: "Wheat starch", qty: "300 g", usedIn: "C2 crystal dough", aliases: ["wheat starch"] },
  { id: "tapioca-starch", day: "Thursday", category: "Grains & Lentils", item: "Tapioca starch", qty: "250 g", usedIn: "C2 (140 g) + C6 sweet wrapper (90 g)", aliases: ["tapioca starch"] },
  { id: "rava", day: "Thursday", category: "Grains & Lentils", item: "Rava (fine semolina)", qty: "100 g", usedIn: "C1 rava tuile", aliases: ["rava", "semolina"] },
  { id: "rice-flour-tuile", day: "Thursday", category: "Grains & Lentils", item: "Regular rice flour", qty: "100 g", usedIn: "C1 tuile batter", aliases: ["rice flour"] },
  { id: "apf", day: "Thursday", category: "Grains & Lentils", item: "All-purpose flour (maida)", qty: "50 g", usedIn: "C6 tuile", aliases: ["all purpose", "all-purpose", "apf", "maida", "flour"] },

  // ────── Thursday: Spices, Seasonings, Pantry ──────
  { id: "mustard-seeds", day: "Thursday", category: "Spices & Pantry", item: "Mustard seeds", qty: "80 g", usedIn: "C1, C2, C3, C4, C5 tadkas", aliases: ["mustard"] },
  { id: "cumin-seeds", day: "Thursday", category: "Spices & Pantry", item: "Cumin seeds", qty: "30 g", usedIn: "C1 tuile, C3 rasam, C4, C5", aliases: ["cumin"] },
  { id: "black-pepper", day: "Thursday", category: "Spices & Pantry", item: "Whole black pepper", qty: "25 g", usedIn: "C3 rasam + C1 tuile", aliases: ["pepper"] },
  { id: "dry-red-chilies", day: "Thursday", category: "Spices & Pantry", item: "Dry red chilies", qty: "12 nos", usedIn: "C2 (4) + C5 (6) + spares", aliases: ["dry red chili", "red chili"] },
  { id: "turmeric", day: "Thursday", category: "Spices & Pantry", item: "Turmeric powder", qty: "small jar", usedIn: "C3 podimas + pantry", aliases: ["turmeric"] },
  { id: "hing", day: "Thursday", category: "Spices & Pantry", item: "Hing (asafoetida)", qty: "small jar", usedIn: "All tadkas", aliases: ["hing", "asafoetida"] },
  { id: "cardamom", day: "Thursday", category: "Spices & Pantry", item: "Green cardamom pods", qty: "50 pods", usedIn: "C1, C2, C6 (dome/filling/crumb), drink", aliases: ["cardamom"] },
  { id: "sukku", day: "Thursday", category: "Spices & Pantry", item: "Dry ginger powder (sukku)", qty: "small jar", usedIn: "C5 pumpkin mash, C6 (crumb/tuile), drink", aliases: ["sukku", "dry ginger"] },
  { id: "rasam-powder", day: "Thursday", category: "Spices & Pantry", item: "Rasam powder", qty: "30 g", usedIn: "C3 rasam", aliases: ["rasam powder", "rasam aromatics"] },
  { id: "salt-flaky", day: "Thursday", category: "Spices & Pantry", item: "Flaky sea salt", qty: "small jar", usedIn: "C6 crumb finish", aliases: ["flaky", "sea salt"] },
  { id: "tamarind", day: "Thursday", category: "Spices & Pantry", item: "Tamarind (block or paste)", qty: "150 g block", usedIn: "C3 rasam", aliases: ["tamarind"] },
  { id: "agar", day: "Thursday", category: "Spices & Pantry", item: "Agar-agar powder", qty: "15 g", usedIn: "C6 dome (6 g) + C6 gel (3 g) + spare", aliases: ["agar"] },

  // ────── Thursday: Oils, Sweeteners, Nuts ──────
  { id: "neutral-oil", day: "Thursday", category: "Oils & Fats", item: "Neutral oil (sunflower/refined)", qty: "400 ml", usedIn: "C1, C2, C4, C5, C6 mint oil", aliases: ["neutral oil"] },
  { id: "sesame-oil", day: "Thursday", category: "Oils & Fats", item: "Sesame / gingelly oil", qty: "50 ml", usedIn: "C2 filling temper + C2 curry leaf oil", aliases: ["sesame", "gingelly", "curry leaf oil"] },
  { id: "white-sugar", day: "Thursday", category: "Sweeteners", item: "Plain white sugar", qty: "300 g", usedIn: "C6 orange filling (1 cup) + candy syrup + spare", aliases: ["plain white sugar", "sugar"] },
  { id: "regular-jaggery", day: "Thursday", category: "Sweeteners", item: "Regular jaggery", qty: "50 g", usedIn: "C5 pumpkin mash", aliases: ["jaggery"] },
  { id: "karupatti", day: "Thursday", category: "Sweeteners", item: "Dark karupatti / palm jaggery", qty: "600 g", usedIn: "C6 dome/gel/tuile/crumb + drink base", aliases: ["karupatti", "palm jaggery", "dark jaggery"] },
  { id: "cashews", day: "Thursday", category: "Nuts & Seeds", item: "Raw whole cashews", qty: "100 g", usedIn: "C6 crumb", aliases: ["cashew"] },
  { id: "pumpkin-seeds", day: "Thursday", category: "Nuts & Seeds", item: "Pumpkin seeds (pepitas)", qty: "110 g", usedIn: "C1 topping", aliases: ["pumpkin seed"] },

  // ────── Thursday: Miscellaneous ──────
  { id: "banana-leaves", day: "Thursday", category: "Miscellaneous", item: "Banana leaves (squares)", qty: "30 squares", usedIn: "C4 parcels (26) + C2/C6 steamer liners", aliases: ["banana leaves", "banana leaf"] },
  { id: "twine", day: "Thursday", category: "Miscellaneous", item: "Cooking twine, 2 colors", qty: "1 roll each", usedIn: "C4 tagging classic vs mango parcels", aliases: ["twine"] },

  // ────── Friday morning: Fresh perishables + start soaks ──────
  { id: "tender-coconut", day: "Friday morning", category: "Fresh perishables", item: "Tender coconuts", qty: "3-4 nos (for 350 g meat)", usedIn: "C1 topping + water reserve for drink", aliases: ["tender coconut"] },
  { id: "guava", day: "Friday morning", category: "Fresh perishables", item: "Ripe guava", qty: "200 g", usedIn: "C1 topping brunoise", aliases: ["guava"] },
  { id: "micro-coriander", day: "Friday morning", category: "Fresh perishables", item: "Micro coriander", qty: "1 bunch", usedIn: "C1 garnish", aliases: ["micro coriander"] },
  { id: "coriander-bunch", day: "Friday morning", category: "Fresh perishables", item: "Fresh coriander (regular)", qty: "1 small bunch", usedIn: "C3 finishing shower", aliases: ["fresh coriander"] },
  { id: "drumstick-leaves", day: "Friday morning", category: "Fresh perishables", item: "Drumstick leaves (murungai keerai)", qty: "1 cup (~100 g)", usedIn: "C5 adai batter fold-in", aliases: ["drumstick", "murungai"] },
  { id: "mint", day: "Friday morning", category: "Fresh perishables", item: "Fresh mint", qty: "80 g / 2 bunches", usedIn: "C6 mint oil + drink", aliases: ["mint"] },
  { id: "valencia-oranges", day: "Friday morning", category: "Fresh perishables", item: "Valencia oranges", qty: "3 nos", usedIn: "C6 sweet kozhakattai filling (zest + juice)", aliases: ["orange", "valencia"] },
  { id: "soda", day: "Friday morning", category: "Fresh perishables", item: "Soda water", qty: "3.5 L", usedIn: "Welcome drink", aliases: ["soda"] },
  { id: "ice", day: "Friday morning", category: "Fresh perishables", item: "Ice", qty: "3 kg", usedIn: "Welcome drink", aliases: ["ice"] }
];