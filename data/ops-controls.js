window.PB_OPS_CONTROLS = {
  equipmentCapacity: [
    { window: "6:45 PM - 7:15 PM", burnersNeed: 3, burnersHave: 4, ovensNeed: 0, ovensHave: 1, steamersNeed: 0, steamersHave: 2, risk: "Low" },
    { window: "7:15 PM - 7:45 PM", burnersNeed: 3, burnersHave: 4, ovensNeed: 1, ovensHave: 1, steamersNeed: 2, steamersHave: 2, risk: "Medium" },
    { window: "7:45 PM - 8:15 PM", burnersNeed: 2, burnersHave: 4, ovensNeed: 1, ovensHave: 1, steamersNeed: 1, steamersHave: 2, risk: "Low" },
    { window: "8:15 PM - 8:45 PM", burnersNeed: 2, burnersHave: 4, ovensNeed: 1, ovensHave: 1, steamersNeed: 1, steamersHave: 2, risk: "Low" }
  ],
  holdSop: [
    { course: "Course 1", component: "Carrot puree", hold: "Hot 60-65C", maxHoldMin: 45, reheatRule: "Reheat once only before plating" },
    { course: "Course 1", component: "Topping + garnish", hold: "Cold 2-5C", maxHoldMin: 120, reheatRule: "Do not heat; dress at send" },
    { course: "Course 2", component: "Shaped kozhukattai", hold: "Ambient covered", maxHoldMin: 90, reheatRule: "Steam only once before send" },
    { course: "Course 3", component: "Rasam reduction", hold: "Hot 70C thermal", maxHoldMin: 60, reheatRule: "Boil 1 min if below 65C" },
    { course: "Course 4", component: "Wrapped paneer parcels", hold: "Cold 2-5C pre-steam", maxHoldMin: 180, reheatRule: "Steam to center-hot before send" },
    { course: "Course 5", component: "Adai discs", hold: "Cold 2-5C", maxHoldMin: 240, reheatRule: "Recrisp in oven before board build" },
    { course: "Course 6", component: "Domes + gel + garnish", hold: "Cold 2-5C", maxHoldMin: 240, reheatRule: "Do not warm domes; steam kozhukattai live" }
  ],
  criticalPath: [
    { when: "6:30 PM", lane: "Pass", action: "Set send order labels and garnish trays" },
    { when: "6:40 PM", lane: "Hot", action: "Bring C1 puree to service temp" },
    { when: "6:50 PM", lane: "Bench", action: "C3 sphere coating starts" },
    { when: "7:00 PM", lane: "Pass", action: "C1 send" },
    { when: "7:10 PM", lane: "Steam", action: "C2 steam start" },
    { when: "7:20 PM", lane: "Pass", action: "C2 send" },
    { when: "7:32 PM", lane: "Oven", action: "C3 bake" },
    { when: "7:40 PM", lane: "Pass", action: "C3 pour send + C4 steam start" },
    { when: "8:00 PM", lane: "Pass", action: "C4 send" },
    { when: "8:14 PM", lane: "Oven", action: "C5 recrisp" },
    { when: "8:20 PM", lane: "Pass", action: "C5 send" },
    { when: "8:35 PM", lane: "Steam", action: "C6 steam" },
    { when: "8:40 PM", lane: "Pass", action: "C6 final plate send" }
  ],
  tastingGates: [
    { gate: "Before Course 1 send", check: "Puree salt-acid balance and topping crunch" },
    { gate: "Before Course 2 send", check: "Wrapper translucency + filling seasoning" },
    { gate: "Before Course 3 send", check: "Rasam intensity and sphere crunch" },
    { gate: "Before Course 4 send", check: "Parcel center temperature and paste balance" },
    { gate: "Before Course 5 send", check: "Crisp adai and topping contrast" },
    { gate: "Before Course 6 send", check: "Dessert sweetness balance + garnish completeness" }
  ],
  throughputTargets: [
    { course: "Course 1", target: "13 portions in 12 min", fallback: "Switch to 2-wave send (7 + 6)" },
    { course: "Course 2", target: "13 portions in 8 min", fallback: "Hold plated drizzle and send in 2 platters" },
    { course: "Course 3", target: "13 bowls in 12 min", fallback: "Batch pour tableside in 2 rounds" },
    { course: "Course 4", target: "13 parcels in 6 min", fallback: "Send 7 then 6 after 3 min" },
    { course: "Course 5", target: "3 boards in 8 min", fallback: "Send 2 boards then final board" },
    { course: "Course 6", target: "13 dessert portions in 15 min", fallback: "Plate base first, garnish in final pass" }
  ],
  resetTasks: [
    { afterCourse: "Course 1", task: "Clear puree containers, reset spoons, wipe pass", durationMin: 4 },
    { afterCourse: "Course 2", task: "Clear steamer trays, reset damp cloth bench", durationMin: 4 },
    { afterCourse: "Course 3", task: "Refill ladle station, clear soup drips", durationMin: 3 },
    { afterCourse: "Course 4", task: "Discard used leaf scraps, reset tong tray", durationMin: 3 },
    { afterCourse: "Course 5", task: "Collect board bowls, pre-stage dessert tools", durationMin: 4 }
  ],
  goNoGo: [
    { time: "6:30 PM", rule: "C1-C3 prep complete and garnish trays staged", statusIfFail: "Delay first send by max 10 min" },
    { time: "7:00 PM", rule: "C2 shaped, C3 rasam hot, C4 wrapped", statusIfFail: "Compress gap between C1 and C2" },
    { time: "7:30 PM", rule: "C4 steamer capacity clear, C5 toppings complete", statusIfFail: "Switch to staggered sends" }
  ],
  contingency: [
    { trigger: "Any course slips >10 min", action: "Cut between-course gap to 12 min for next 2 courses" },
    { trigger: "Oven bottleneck", action: "Prioritize C3 bake first, shift C5 recrisp by +4 min" },
    { trigger: "Steamer bottleneck", action: "Steam C4 first, hold C6 shape under damp cloth" },
    { trigger: "Flavor imbalance at gate", action: "Mandatory micro-adjust before send" }
  ],
  quantityLockCandidates: [
    "Carrot",
    "Tender coconut",
    "Rasam concentrate",
    "Adai batter",
    "Pumpkin",
    "Soda",
    "Mint"
  ]
};