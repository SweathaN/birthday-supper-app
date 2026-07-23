window.PB_COMBINED_STEPS = [
  {
    id: "combined-crystal-dough",
    name: "One crystal dough batch for C2 (savory) + C6 (sweet) wrappers",
    combines: ["c2-dough-mix", "c6-dough-mix"],
    courseId: "combined", courseLabel: "C2 + C6 Shared",
    phase: "Prep", when: "Sat 10:30 AM", station: "Bench", durationMin: 25, critical: true,
    dependsOn: ["c2-fill-portion", "c6-filling"],
    fail: "Dough cracks for both courses", fix: "Knead with warm water touch-ups; keep covered",
    ingredients: [
      "430 g Wheat Starch total (280g C2 + 150g C6)",
      "215 g Tapioca Starch total (140g C2 + 75g C6)",
      "~640 ml Boiling Hot Water (proportional)",
      "30 ml Neutral Oil", "Salt"
    ],
    actions: [
      "Whisk all wheat starch and tapioca starch together",
      "Pour boiling water while stirring rapidly to gelatinize the full batch",
      "Knead in oil to smooth elastic dough; keep covered under damp cloth",
      "While still warm, divide: 28 × ~20g balls for C2 (savory) → hold under damp cloth until 4:30 PM shaping",
      "Divide: 15 × ~20g balls for C6 (sweet) → hold under separate damp cloth until 3:10 PM shaping with COLD filling"
    ]
  }
];
