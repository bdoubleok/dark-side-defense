/* Dark Side Defense v4 — shared data + sideline section renderer */
const v4ConceptGlossary = [
  { name: "DANGER", cfb: "Cover 3 Match, Cover 3 Sky", structure: "1-high match distribution", desc: "Universal rules engine — who takes crossers, seams, and flats after disguise." },
  { name: "3 LOCK", cfb: "Cover 3 Match + press adjustments", structure: "1-high, all CBs press", desc: "Weak rotation, buzzed hook/curl. Macdonald change-up shell vs RPO and QB run." },
  { name: "POUND", cfb: "Cover 4 Quarters, Cover 4 Palms", structure: "2-high quarters", desc: "Spread 10/11, empty, protect deep sidelines. Foundation quarters ecosystem." },
  { name: "STUFF", cfb: "Cover 4 Palms + adjustments, Cover 6", structure: "2-high asymmetric", desc: "Trips, field-heavy formations, split-field Cover 6 / HQH." },
  { name: "CLOUD", cfb: "Cover 2 Invert, Tampa 2", structure: "2-high invert", desc: "Change-up two-high. Safe shell with cloud/force technique." },
  { name: "SQUAT", cfb: "Cover 4 Palms (vs Bunch) + adj", structure: "2-high tightened", desc: "Bunch = SQUAT. Always. Tighten landmarks — pattern-match dies vs bunch rub." },
  { name: "SAND DEUCE", cfb: "Edge Blitz 3, Sim Pressure 3", structure: "5-man sim pressure", desc: "Constraint every 4–5 plays. Sim pressure complements coverage — does not define you." }
];

const v4GoldenRules = [
  "Never show the same look twice in a row.",
  "Alternate 1-high (DANGER / 3 LOCK) and 2-high (POUND / STUFF / CLOUD).",
  "Mix in SAND DEUCE (Edge Blitz 3) every 4–5 plays.",
  "Bunch = SQUAT. Always.",
  "Red zone = STUFF or SQUAT.",
  "Hurry-up = Simplify to DANGER + POUND only.",
  "Make the QB think every single play."
];

const v4Formations = [
  {
    name: "Nickel 3-3 Over", tag: "PRIMARY", snap: "~45%",
    personnel: "3 DL / 3 LB / 5 DB", source: "3-3-5 base",
    role: "Workhorse. 36 plays available — favorite ~12 for fast access.",
    audibles: ["C3 Match / DANGER", "C4 Quarters / POUND", "C1 Robber", "Edge Blitz 3"],
    plays: [
      { name: "Cover 3 Match", concept: "DANGER", type: "Zone", tag: "SIG" },
      { name: "Cover 3 Buzz Mable", concept: "DANGER", type: "Zone", tag: "SIG" },
      { name: "Cover 3 Sky", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "KEY" },
      { name: "Cover 4 Palms", concept: "STUFF", type: "Zone", tag: "KEY" },
      { name: "Cover 6", concept: "STUFF", type: "Zone", tag: "" },
      { name: "Cover 2 Invert", concept: "CLOUD", type: "Zone", tag: "KEY" },
      { name: "Tampa 2", concept: "CLOUD", type: "Zone", tag: "" },
      { name: "Cover 1 Robber", concept: "ROBBER", type: "Man", tag: "KEY" },
      { name: "Cover 9 Show 2", concept: "", type: "Man", tag: "" },
      { name: "Sim Pressure 3", concept: "SAND DEUCE", type: "Pressure", tag: "KEY" },
      { name: "Edge Blitz 3", concept: "SAND DEUCE", type: "Blitz", tag: "KEY" }
    ]
  },
  {
    name: "Nickel 3-3 Dbl Mug", tag: "DISGUISE", snap: "~12%",
    personnel: "3 DL / 3 LB / 5 DB (A-gap mug)", source: "3-3-5 base",
    role: "A-gap disguise. Show interior pressure, rotate post-snap.",
    audibles: ["C3 Match / DANGER", "Dog 3 Buzz", "Field Sim 3", "C4 Qtrs / POUND"],
    plays: [
      { name: "Cover 3 Match", concept: "DANGER", type: "Zone", tag: "KEY" },
      { name: "Cover 1 Hole", concept: "ROBBER", type: "Man", tag: "" },
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "" },
      { name: "Nickel Dog 3 Buzz", concept: "", type: "Blitz", tag: "SIG" },
      { name: "Mike Blitz 3", concept: "", type: "Blitz", tag: "" },
      { name: "Field Sim 3", concept: "SAND DEUCE", type: "Pressure", tag: "KEY" }
    ]
  },
  {
    name: "Nickel 3-3 Mint", tag: "ANTI-RPO", snap: "~10%",
    personnel: "3 DL / 3 LB / 5 DB (Nickel CB apex)", source: "3-3-5 base",
    role: "Anti-RPO / spread. Tite alignment, nickel CB apex. Pairs with 3-3-5 Mint.",
    audibles: ["Buzz Mable / DANGER", "C4 Qtrs / POUND", "Hot Blitz 3", "Sim P3 / SAND"],
    plays: [
      { name: "Cover 3 Buzz Mable", concept: "DANGER", type: "Zone", tag: "SIG" },
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "" },
      { name: "Cover 4 Palms", concept: "STUFF", type: "Zone", tag: "" },
      { name: "Tampa 2", concept: "CLOUD", type: "Zone", tag: "" },
      { name: "Hot Blitz 3", concept: "", type: "Blitz", tag: "KEY" },
      { name: "Sim Pressure 3", concept: "SAND DEUCE", type: "Pressure", tag: "" }
    ]
  },
  {
    name: "3-3-5 Over Flex", tag: "CHANGE-UP", snap: "~8%",
    personnel: "3 DL / 3 LB / 5 DB (flex)", source: "3-3-5 base",
    role: "Change-up front. CB Bench Blitz is UNIQUE to this formation.",
    audibles: ["C3 Match / DANGER", "C4 Qtrs / POUND", "CB Bench Blitz", "Sim P3"],
    plays: [
      { name: "Cover 3 Match", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "" },
      { name: "Cover 4 Palms", concept: "STUFF", type: "Zone", tag: "" },
      { name: "CB Bench Blitz", concept: "", type: "Blitz", tag: "SIG" },
      { name: "Sim Pressure 3", concept: "SAND DEUCE", type: "Pressure", tag: "" }
    ]
  },
  {
    name: "3-3-5 Mint", tag: "RUN SUPPORT", snap: "~7%",
    personnel: "3 DL / 3 LB / 5 DB (3rd Safety apex)", source: "Add from 3-3-5 Tite",
    role: "Early-down run support. Same tite front as Nickel 3-3 Mint but 3rd safety apex.",
    audibles: ["Buzz Mable / DANGER", "C4 Qtrs / POUND", "Robber Press", "Corner Blitz 3"],
    plays: [
      { name: "Cover 3 Match", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Cover 3 Buzz Mable", concept: "DANGER", type: "Zone", tag: "SIG" },
      { name: "Cover 3 Sky", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "" },
      { name: "Cover 4 Palms", concept: "STUFF", type: "Zone", tag: "" },
      { name: "Cover 6", concept: "STUFF", type: "Zone", tag: "" },
      { name: "Cover 1 Robber Press", concept: "ROBBER", type: "Man", tag: "KEY" },
      { name: "Tampa 2", concept: "CLOUD", type: "Zone", tag: "" },
      { name: "Corner Blitz 3", concept: "", type: "Blitz", tag: "SIG" },
      { name: "Hot Blitz 3", concept: "", type: "Blitz", tag: "" },
      { name: "Tampa Sim Pressure", concept: "SAND DEUCE", type: "Pressure", tag: "" }
    ]
  },
  {
    name: "3-3-5 3 High Odd", tag: "3-SAFETY", snap: "~5%",
    personnel: "3 DL / 3 LB / 5 DB (3-safety shell)", source: "3-3-5 base",
    role: "Three-safety shell. Split-field disguise.",
    audibles: ["C3 Match / DANGER", "C4 Qtrs / POUND", "C1 Robber"],
    plays: [
      { name: "Cover 3 Match", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "" },
      { name: "Cover 1 Robber", concept: "ROBBER", type: "Man", tag: "" }
    ]
  },
  {
    name: "Dime Rush", tag: "PASS DOWN", snap: "~5%",
    personnel: "2 DL / 3 LB / 6 DB", source: "3-3-5 base",
    role: "Six-DB passing set. Mug Sim Pressure + Mug Blitz Tex 3 are the key plays.",
    audibles: ["C4 Qtrs / POUND", "Tampa 2 / CLOUD", "Mug Sim P", "Mug Blitz Tex 3"],
    plays: [
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "" },
      { name: "Tampa 2", concept: "CLOUD", type: "Zone", tag: "" },
      { name: "Mug Sim Pressure", concept: "SAND DEUCE", type: "Pressure", tag: "KEY" },
      { name: "Mug Blitz Tex 3", concept: "", type: "Blitz", tag: "KEY" }
    ]
  },
  {
    name: "Nickel 2-4", tag: "FRONT DIV", snap: "~5%",
    personnel: "2 DL / 4 LB / 5 DB", source: "Add from 3-4",
    role: "Front diversity. 33/36 plays overlap with Over. 2 DL / 4 LB looks different pre-snap.",
    audibles: ["Buzz Mable / DANGER", "Sim P3 / SAND", "Robber", "Buck Slant 3"],
    plays: [
      { name: "Cover 3 Buzz Mable", concept: "DANGER", type: "Zone", tag: "KEY" },
      { name: "Cover 4 Palms", concept: "STUFF", type: "Zone", tag: "" },
      { name: "Cover 1 Robber", concept: "ROBBER", type: "Man", tag: "" },
      { name: "Cover 6", concept: "STUFF", type: "Zone", tag: "" },
      { name: "Cover 6 Willie", concept: "STUFF", type: "Zone", tag: "" },
      { name: "Cover 2 Invert", concept: "CLOUD", type: "Zone", tag: "" },
      { name: "Sim Pressure 3", concept: "SAND DEUCE", type: "Pressure", tag: "KEY" },
      { name: "Edge Blitz 3", concept: "SAND DEUCE", type: "Blitz", tag: "" },
      { name: "Field Sim 3", concept: "SAND DEUCE", type: "Pressure", tag: "" },
      { name: "Nickel Sim 2", concept: "SAND DEUCE", type: "Pressure", tag: "" },
      { name: "Buck Slant 3", concept: "", type: "Stunt", tag: "KEY" }
    ]
  },
  {
    name: "Nickel 2-4 Dbl Mug", tag: "HEAVY MUG", snap: "~1%",
    personnel: "2 DL / 4 LB / 5 DB (mugged)", source: "Add from 3-4",
    role: "Heavy interior mug from 3-4 personnel. Specialist.",
    audibles: ["C3 Match / DANGER", "C4 Qtrs / POUND", "Field Sim 3", "Over Storm Brave"],
    plays: [
      { name: "Cover 3 Match", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Cover 4 Quarters", concept: "POUND", type: "Zone", tag: "" },
      { name: "Field Sim 3", concept: "SAND DEUCE", type: "Pressure", tag: "" },
      { name: "Over Storm Brave", concept: "", type: "Blitz", tag: "KEY" }
    ]
  },
  {
    name: "3-4 Bear", tag: "LOADED BOX", snap: "~2%",
    personnel: "3 DL / 4 LB / 4 DB (bear)", source: "Add from 3-4",
    role: "Short yardage / loaded box. Specific job, not every-down.",
    audibles: ["Cover 1 Hole", "Cover 2 Invert", "Sam Mike 1", "LB Blitz 0"],
    plays: [
      { name: "Cover 1 Hole", concept: "ROBBER", type: "Man", tag: "KEY" },
      { name: "Cover 2 Invert", concept: "CLOUD", type: "Zone", tag: "" },
      { name: "Cover 3 Hard Flat", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Trio Sky Zone", concept: "DANGER", type: "Zone", tag: "" },
      { name: "Sam Mike 1", concept: "", type: "Blitz", tag: "KEY" },
      { name: "LB Blitz 0", concept: "", type: "Blitz", tag: "" }
    ]
  },
  {
    name: "Goal Line 5-3 / 6-2", tag: "GL", snap: "Situational",
    personnel: "5–6 DL / 3 LB / 1–3 DB", source: "3-3-5 base",
    role: "Goal line. Man / gap assignments by tendency.",
    audibles: ["Man / Gap"],
    plays: [
      { name: "Man / Gap", concept: "", type: "Man", tag: "" }
    ]
  }
];

const v4MintGuide = {
  title: "Mint Personnel Guide",
  desc: "Both Mint formations present the same tite front pre-snap. The QB cannot tell which apex defender is active until post-snap.",
  rows: [
    { form: "Nickel 3-3 Mint", apex: "Nickel CB", snap: "~10%", best: "Pass-heavy spread, RPO, QB run" },
    { form: "3-3-5 Mint", apex: "3rd Safety", snap: "~7%", best: "Run-heavy / 2-TE sets" }
  ]
};

const v4FormationReads = [
  { formation: "2×2 Balanced", danger: "STAY", pound: "STAY (Quads/Read)", lock: "STAY", squat: "—", note: "Base look — no check needed." },
  { formation: "3×1 Trips", danger: "STAY (shade)", pound: "STAY (apply TRIX)", lock: "STAY", squat: "—", note: "Apply TRIX within POUND tools." },
  { formation: "Quads (3×1 + RB)", danger: "STAY", pound: "SHADE heavy", lock: "CHECK to POUND", squat: "—", note: "4 receivers one side — quarters shade." },
  { formation: "Empty (3×2)", danger: "STAY", pound: "STAY (excellent)", lock: "STAY", squat: "—", note: "Quarters is primary empty answer." },
  { formation: "Bunch / Snug", danger: "STAY", pound: "BOX/BUDDY", lock: "CHECK out", squat: "CHECK to SQUAT", note: "Bunch kills raw pattern-match." },
  { formation: "Tight #2 (TE)", danger: "STAY", pound: "STAY (tighten)", lock: "STAY", squat: "—", note: "Tighten underneath landmarks." },
  { formation: "Motion flips", danger: "RE-READ", pound: "RE-READ", lock: "RE-SITUATE", squat: "RE-READ", note: "Re-count strength after motion." }
];

const v4ThreeLockTree = [
  { read: "#3 in backfield (2×2)", action: "STAY in base 3 Lock", detail: "Standard match-3 rules apply." },
  { read: "#3 declared to trips (3×1)", action: "FLOOD rules activate", detail: "Trips flood adjustment within 3 Lock." },
  { read: "#3 + RB same side (Quads)", action: "CHECK to Pound", detail: "4 receivers to one side — use quarters tools." },
  { read: "No #3 (Empty)", action: "STAY or CHECK to Pound", detail: "Consider 5th rusher / dime personnel." },
  { read: "#3 away (Bunch weak)", action: "CHECK to SQUAT", detail: "Bunch kills pattern-match — tighten immediately." }
];

const v4PoundTools = [
  { tool: "QUADS", when: "vs 2×2", does: "Full quarters match rules" },
  { tool: "READ", when: "vs detached #2", does: "Safety reads #2 vertical" },
  { tool: "TRIX", when: "vs trips", does: "Trips adjustment within quarters" },
  { tool: "STUMP", when: "vs trips (alt)", does: "Landmark-based trips answer" },
  { tool: "BOX", when: "vs Bunch", does: "Tighten zone landmarks" },
  { tool: "BUDDY", when: "vs Bunch (alt)", does: "Inside/outside bracket on bunch" },
  { tool: "JUMP", when: "vs motion", does: "Jump assignments post-motion" }
];

const v4CoachSettings = [
  { concept: "DANGER", settings: [
    { cat: "Coverage", items: ["Match zones: ON", "Underneath: Moderate", "Play ball aggressive"] },
    { cat: "Alignment", items: ["Safeties: 2-high pre-snap (rotates post-snap)", "CBs: Match technique"] },
    { cat: "Rush", items: ["Rush 4 · Contain ON · Stunts: 24.5%"] }
  ]},
  { concept: "POUND", settings: [
    { cat: "Coverage", items: ["Match zones: ON", "Underneath: Conservative (only seam)"] },
    { cat: "Alignment", items: ["Safeties: 2-high (CRITICAL)", "Weak CB: Press (MEG)"] },
    { cat: "Rush", items: ["Rush 4 · Contain ON"] }
  ]},
  { concept: "3 LOCK", settings: [
    { cat: "Coverage", items: ["Match zones: ON", "Underneath: Moderate-Aggressive"] },
    { cat: "Alignment", items: ["Safeties: 1-high (Sky rotation)", "All CBs: Press"] },
    { cat: "Rush", items: ["Rush 4 · Contain ON"] }
  ]},
  { concept: "STUFF", settings: [
    { cat: "Coverage", items: ["Match zones: ON", "Strong CB: Conservative (CLOUD technique)"] },
    { cat: "Alignment", items: ["Safeties: 2-high (looks like Pound)", "Strong CB: Force"] },
    { cat: "Rush", items: ["Rush 4 · Contain ON"] }
  ]}
];

const v4Situations = [
  { down: "1st & 10 (balanced)", form: "3-3 Over", primary: "DANGER (C3 Match) / POUND", pressure: "Straight 4" },
  { down: "1st & 10 (run-heavy)", form: "Over / 3-3-5 Mint", primary: "DANGER (C3 Sky)", pressure: "Straight 4" },
  { down: "2nd & short (≤3)", form: "3-3 Over", primary: "Cover 1 Hole", pressure: "Blitz selective" },
  { down: "2nd & medium (4-6)", form: "Over / 2-4", primary: "STUFF (Palms) / DANGER", pressure: "Sim every 4–5" },
  { down: "2nd & long (7+)", form: "3-3 Over", primary: "POUND (C4 Qtrs)", pressure: "SAND DEUCE" },
  { down: "3rd & short (1-3)", form: "3-4 Bear / Mug", primary: "Cover 1 Hole", pressure: "Blitz" },
  { down: "3rd & medium (4-6)", form: "Dbl Mug", primary: "DANGER (C3 Match)", pressure: "Sim / Dog" },
  { down: "3rd & long (7+)", form: "Dime Rush / Mug", primary: "POUND (Qtrs) / CLOUD", pressure: "Mug Sim / Tex" },
  { down: "Red Zone", form: "3-3 Over", primary: "STUFF (Palms) / SQUAT", pressure: "Conservative" },
  { down: "Goal Line", form: "GL 5-3 / 6-2", primary: "Man / Gap", pressure: "Blitz" },
  { down: "2-Minute", form: "3-3 Over", primary: "DANGER + POUND only", pressure: "Minimal" },
  { down: "vs Trips", form: "Any Nickel", primary: "DANGER (Buzz) / STUFF (C6)", pressure: "—" },
  { down: "vs Bunch", form: "Any Nickel", primary: "SQUAT (Palms + adj)", pressure: "—" },
  { down: "vs Empty", form: "2-4 / Mug", primary: "POUND (Qtrs)", pressure: "SAND DEUCE" }
];

const v4Recipes = [
  { name: "Show Blitz (A-Gap Disguise)", steps: "Any zone from Over/Mint → Dbl Mug next snap. Show interior pressure pre-snap, rotate post-snap.", benefit: "QB sees mug look, throws hot route into rotating coverage." },
  { name: "Delayed Post-Snap Rotation", steps: "Call DANGER (Buzz Mable) → safety rotates after snap. Pre-snap shell misleads QB read.", benefit: "Disrupts timing on intermediate routes." },
  { name: "POUND ↔ STUFF Disguise Pair", steps: "Alternate POUND (C4 Qtrs) and STUFF (C6). Identical 2-high pre-snap.", benefit: "Same shell, different post-snap match rules — QB can't settle." },
  { name: "D-Line Stunts (Stunt-First)", steps: "Any zone → D-Line Stunts menu. 24.5% stunt rate target.", benefit: "Pressure without sacrificing coverage — stunts over volume blitzing." },
  { name: "Mint Personnel Rotation", steps: "Alternate Nickel 3-3 Mint (CB apex) and 3-3-5 Mint (safety apex). Same tite front.", benefit: "QB can't identify apex defender until post-snap." },
  { name: "SQUAT vs Bunch", steps: "See Bunch → Call C4 Palms → Tighten with BOX/BUDDY tools.", benefit: "Pattern-match dies vs bunch rub — SQUAT is mandatory." },
  { name: "3 LOCK #3 Pre-Snap Read", steps: "Before every snap: count #3 from sideline. Apply decision tree before confirming call.", benefit: "Correct concept selection vs formation strength." }
];

const v4Philosophy = [
  { rule: "Coverage First. Always.", detail: "80.4% zone. No concept over 30%: DANGER ~30%, POUND ~25%, STUFF ~20%." },
  { rule: "Sniper Blitz — Shoot to Kill", detail: "Rank 26 blitz rate. #1 efficiency when you do bring pressure." },
  { rule: "Never the Same Look Twice", detail: "Alternate 1-high (DANGER / 3 LOCK) and 2-high (POUND / STUFF / CLOUD)." },
  { rule: "POUND ↔ STUFF Disguise", detail: "Both 2-high pre-snap. Identical shell, different post-snap match rules." },
  { rule: "Bunch = SQUAT. Always.", detail: "Pattern-match dies against bunch rub routes. Tighten immediately." },
  { rule: "Stop the Run from Two-High", detail: "#1 run defense + 50.9% light box. Don't need 8-man box every snap." },
  { rule: "Hurry-Up = Simplify", detail: "No-huddle: reduce to DANGER + POUND only. No complex robber/pressure combos." },
  { rule: "Recruit the Chess Piece", detail: "300+ slot snaps, 250+ LB, 80+ edge. Build around the hybrid safety." }
];

const v4Recruiting = [
  { pos: "Chess Piece Safety", pri: "CRITICAL", attrs: "6'1+, 85+ Spd, 80+ Tkl, 75+ ZCV", note: "Hybrid — slot, apex, robber. Most important recruit on defense." },
  { pos: "Edge Rushers (×2)", pri: "HIGH", attrs: "84+ Spd, 82+ PMV/FMV, 70+ BSH", note: "Contain + pressure. Tex/Tempe stunt executors." },
  { pos: "Interior DL (×2)", pri: "HIGH", attrs: "85+ BSH, 80+ PMV, 78+ STR", note: "A-gap control, mug looks, 2-gap when needed." },
  { pos: "Corners (×3)", pri: "STD", attrs: "86+ Spd, 82+ MCV, 80+ ZCV, 80+ PRS", note: "Press quarters, match technique, cloud force." },
  { pos: "Off-Ball LB (×1-2)", pri: "STD", attrs: "82+ PRC, 80+ ZCV, 78+ Spd", note: "Hook/curl match, buzz flat, sim pressure dropper." },
  { pos: "Free Safety", pri: "STD", attrs: "88+ Spd, 84+ ZCV, 80+ MCV", note: "Deep half, quarters match, post-snap rotation." }
];

const v4ConceptMap = {
  "Cover 3 Match": "DANGER", "Cover 3 Sky": "DANGER", "Cover 3 Buzz": "3 LOCK",
  "Cover 3 Buzz Mable": "DANGER", "Cover 3 Seam": "DANGER", "Match 3": "DANGER",
  "Cover 3 Hard Flat": "DANGER", "Trio Sky Zone": "DANGER",
  "Cover 4 Quarters": "POUND", "Cover 4 Palms": "STUFF", "Match Quarters": "POUND",
  "Quarters Match": "POUND", "Cover 9 Show 2": "POUND",
  "Cover 6": "STUFF", "Cover 6 Willie": "STUFF", "Cover 6 Match": "STUFF",
  "Cover 4 Solo": "STUFF", "Quarter-Quarter-Half": "STUFF",
  "Cover 2 Invert": "CLOUD", "Tampa 2": "CLOUD", "Cover 2 Cloud": "CLOUD",
  "Cover 1 Robber": "ROBBER", "Cover 1 Hole": "ROBBER", "Cover 2 Man": "ROBBER",
  "Cover 1": "ROBBER",
  "Sim Pressure 3": "SAND DEUCE", "Edge Blitz 3": "SAND DEUCE", "Field Sim 3": "SAND DEUCE",
  "Nickel Sim 2": "SAND DEUCE", "Nickel Sim 3": "SAND DEUCE", "Mug Sim Pressure": "SAND DEUCE",
  "Tampa Sim Pressure": "SAND DEUCE", "Fire Zone 2": "SAND DEUCE", "Fire Zone Blitz": "SAND DEUCE",
  "Tex Stunt": "SAND DEUCE", "Tempe Stunt": "SAND DEUCE", "Exit Stunt": "SAND DEUCE",
  "El Paso Stunt": "SAND DEUCE", "Buck Slant 3": "SAND DEUCE"
};

function v4ConceptTagClass(concept) {
  const map = {
    DANGER: "danger", POUND: "pound", "3 LOCK": "lock", STUFF: "stuff",
    CLOUD: "cloud", SQUAT: "squat", "SAND DEUCE": "sand", ROBBER: "robber"
  };
  return map[concept] || "";
}

function v4Esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function v4RenderSections(pb) {
  const root = pb || document;
  if (!root) return;

  var conceptsEl = root.querySelector("#pb-v4-concepts-body");
  if (conceptsEl) {
    var html = "<p>Seven concept tokens organize every call. Map in-game coverages to these shells — not the other way around.</p>";
    v4ConceptGlossary.forEach(function (c) {
      var cls = v4ConceptTagClass(c.name);
      html += '<article class="v4-card"><div class="v4-card-head"><span class="tag tag-' + cls + '">' + v4Esc(c.name) + '</span><span class="v4-cfb">' + v4Esc(c.cfb) + '</span></div>';
      html += '<p class="v4-structure">' + v4Esc(c.structure) + '</p><p>' + v4Esc(c.desc) + '</p></article>';
    });
    html += '<div class="v4-golden"><h4>Golden Rules</h4><ol>';
    v4GoldenRules.forEach(function (r) { html += "<li>" + v4Esc(r) + "</li>"; });
    html += "</ol></div>";
    conceptsEl.innerHTML = html;
  }

  var readsEl = root.querySelector("#pb-v4-reads-body");
  if (readsEl) {
    var rhtml = '<p>Formation reads and audible checks before the snap.</p>';
    rhtml += '<h4 class="v4-sub">Formation-Read Audible Menu</h4>';
    v4FormationReads.forEach(function (r) {
      rhtml += '<div class="v4-read-row"><strong>' + v4Esc(r.formation) + '</strong><div class="v4-read-grid">';
      [["DANGER", r.danger], ["POUND", r.pound], ["3 LOCK", r.lock], ["SQUAT", r.squat]].forEach(function (pair) {
        var val = pair[1];
        var chk = val.indexOf("CHECK") === 0 ? " v4-check" : "";
        rhtml += '<div class="v4-read-cell"><span class="tag tag-' + v4ConceptTagClass(pair[0]) + '">' + pair[0] + '</span><span class="' + chk + '">' + v4Esc(val) + '</span></div>';
      });
      rhtml += '</div><p class="v4-note">' + v4Esc(r.note) + '</p></div>';
    });
    rhtml += '<h4 class="v4-sub">3 LOCK #3 Decision Tree</h4><p class="v4-note">Count #3 from the sideline before every snap.</p>';
    v4ThreeLockTree.forEach(function (d) {
      rhtml += '<div class="v4-tree-item"><strong>' + v4Esc(d.read) + '</strong> → <em>' + v4Esc(d.action) + '</em><br><span>' + v4Esc(d.detail) + '</span></div>';
    });
    rhtml += '<h4 class="v4-sub">POUND Tool Menu</h4>';
    v4PoundTools.forEach(function (t) {
      rhtml += '<div class="v4-tool-row"><code>' + v4Esc(t.tool) + '</code><span class="v4-when">' + v4Esc(t.when) + '</span><span>' + v4Esc(t.does) + '</span></div>';
    });
    readsEl.innerHTML = rhtml;
  }

  var settingsEl = root.querySelector("#pb-v4-settings-body");
  if (settingsEl) {
    var shtml = "<p>Dynasty coach settings per concept token. Apply when building custom defensive schemes.</p>";
    v4CoachSettings.forEach(function (cs) {
      var cls = v4ConceptTagClass(cs.concept);
      shtml += '<div class="v4-settings-block"><h4><span class="tag tag-' + cls + '">' + v4Esc(cs.concept) + '</span></h4>';
      cs.settings.forEach(function (s) {
        shtml += '<div class="v4-settings-cat"><strong>' + v4Esc(s.cat) + '</strong><ul>';
        s.items.forEach(function (item) { shtml += "<li>" + v4Esc(item) + "</li>"; });
        shtml += "</ul></div>";
      });
      shtml += "</div>";
    });
    shtml += '<div class="v4-golden"><p><strong>Run defense:</strong> Stop the run from two-high shells — #1 run defense uses 50.9% light box rate.</p></div>';
    settingsEl.innerHTML = shtml;
  }

  var recipesEl = root.querySelector("#pb-v4-recipes-body");
  if (recipesEl) {
    var rechtml = "<p>Seven disguise and rotation sequences. Use to keep the QB off-balance.</p>";
    v4Recipes.forEach(function (r, i) {
      rechtml += '<div class="v4-recipe"><h4>' + (i + 1) + ". " + v4Esc(r.name) + '</h4><p><strong>Steps:</strong> ' + v4Esc(r.steps) + '</p><p class="v4-note"><strong>Why:</strong> ' + v4Esc(r.benefit) + '</p></div>';
    });
    recipesEl.innerHTML = rechtml;
  }

  var rulesEl = root.querySelector("#pb-v4-rules-body");
  if (rulesEl) {
    var phtml = "";
    v4Philosophy.forEach(function (p) {
      phtml += '<div class="v4-phil"><div class="v4-phil-rule">' + v4Esc(p.rule) + '</div><p>' + v4Esc(p.detail) + '</p></div>';
    });
    rulesEl.innerHTML = phtml;
  }

  var recruitEl = root.querySelector("#pb-v4-recruit-body");
  if (recruitEl) {
    var rchtml = "<p>Position priorities for dynasty recruiting. Build around the chess-piece safety.</p>";
    v4Recruiting.forEach(function (r) {
      var priCls = r.pri === "CRITICAL" ? "v4-pri-critical" : r.pri === "HIGH" ? "v4-pri-high" : "v4-pri-std";
      rchtml += '<div class="v4-recruit-card"><div class="v4-recruit-head"><strong>' + v4Esc(r.pos) + '</strong><span class="' + priCls + '">' + r.pri + '</span></div>';
      rchtml += '<div class="v4-attrs">' + v4Esc(r.attrs) + '</div><p>' + v4Esc(r.note) + '</p></div>';
    });
    recruitEl.innerHTML = rchtml;
  }

  var callsheetEl = root.querySelector("#pb-v4-callsheet-body");
  if (callsheetEl) {
    var chtml = "<p>14-situation v4 call sheet — formation + primary concept + pressure note.</p>";
    v4Situations.forEach(function (s) {
      chtml += '<div class="v4-sit-row"><div class="v4-sit-head"><strong>' + v4Esc(s.down) + '</strong><span>' + v4Esc(s.form) + '</span></div>';
      chtml += '<div>Primary: <em>' + v4Esc(s.primary) + '</em></div>';
      chtml += '<div class="v4-note">Pressure: ' + v4Esc(s.pressure) + '</div></div>';
    });
    callsheetEl.innerHTML = chtml;
  }

  var mintEl = root.querySelector("#pb-v4-mint-body");
  if (mintEl) {
    var mhtml = "<p>" + v4Esc(v4MintGuide.desc) + "</p><table class='v4-mint-table'><tr><th>Formation</th><th>Apex</th><th>Snap</th><th>Best For</th></tr>";
    v4MintGuide.rows.forEach(function (row) {
      mhtml += "<tr><td>" + v4Esc(row.form) + "</td><td>" + v4Esc(row.apex) + "</td><td>" + v4Esc(row.snap) + "</td><td>" + v4Esc(row.best) + "</td></tr>";
    });
    mhtml += "</table>";
    mintEl.innerHTML = mhtml;
  }
}

function v4GetConceptForPlay(playName) {
  return v4ConceptMap[playName] || null;
}

function v4ConceptToFilterTag(concept) {
  const map = {
    DANGER: "danger", POUND: "pound", "3 LOCK": "lock", STUFF: "stuff",
    CLOUD: "cloud", SQUAT: "squat", "SAND DEUCE": "sand", ROBBER: "robber"
  };
  return map[concept] || "";
}

function v4GetFilterTagsForPlay(playData) {
  const tags = [];
  const conceptTag = v4ConceptToFilterTag(playData.concept);
  if (conceptTag) tags.push(conceptTag);
  // SQUAT is the bunch/red-zone adjustment for Palms, not a separate play name.
  if (playData.name === "Cover 4 Palms") tags.push("squat");
  return tags.filter(function (tag, index) { return tag && tags.indexOf(tag) === index; });
}

function v4EnhanceFormationBlocks(pb) {
  const root = pb || document;
  if (!root) return;
  const nameMap = {
    "nickel 3-3 over": "Nickel 3-3 Over",
    "nickel 2-4": "Nickel 2-4",
    "nickel 2-4 dbl mug": "Nickel 2-4 Dbl Mug",
    "nickel 3-3 dbl mug": "Nickel 3-3 Dbl Mug",
    "3-3-5 over flex": "3-3-5 Over Flex",
    "nickel 3-3 mint": "Nickel 3-3 Mint",
    "3-3-5 mint": "3-3-5 Mint",
    "dime rush": "Dime Rush",
    "3-3-5 3 high odd": "3-3-5 3 High Odd",
    "3-4 bear": "3-4 Bear",
    "goal line 5-3": "Goal Line 5-3 / 6-2",
    "goal line 6-2": "Goal Line 5-3 / 6-2"
  };
  const byName = {};
  v4Formations.forEach(function (f) { byName[f.name] = f; });

  root.querySelectorAll("#pb-playbook .form-block, #playbook .form-block").forEach(function (block) {
    const attr = (block.getAttribute("data-formation") || "").toLowerCase();
    const fName = nameMap[attr];
    if (!fName || !byName[fName] || block.querySelector(".v4-form-meta")) return;
    const f = byName[fName];

    const h4 = block.querySelector("h4");
    if (!h4) return;
    const meta = document.createElement("div");
    meta.className = "v4-form-meta";
    meta.innerHTML = '<span class="v4-snap">' + v4Esc(f.snap) + "</span> · " +
      v4Esc(f.personnel) + " · <em>" + v4Esc(f.source) + "</em><br>" +
      v4Esc(f.role);
    h4.insertAdjacentElement("afterend", meta);

    if (f.audibles && f.audibles.length) {
      const aud = document.createElement("div");
      aud.className = "v4-audibles";
      aud.innerHTML = "<strong>Audibles:</strong> " + f.audibles.map(v4Esc).join(" · ");
      const copyRow = block.querySelector(".copy-row");
      if (copyRow) copyRow.insertAdjacentElement("beforebegin", aud);
    }

    block.querySelectorAll(".play-list li").forEach(function (li) {
      const playName = li.getAttribute("data-play") || li.textContent.trim();
      const playData = f.plays.find(function (p) { return p.name === playName; });
      if (!playData) return;
      if (playData.type) {
        const pill = document.createElement("span");
        pill.className = "v4-type-pill v4-type-" + playData.type.toLowerCase().replace(/\s/g, "-");
        pill.textContent = playData.type;
        li.insertBefore(pill, li.firstChild);
      }
      if (playData.tag) {
        const badge = document.createElement("span");
        badge.className = "v4-play-tag v4-tag-" + playData.tag.toLowerCase();
        badge.textContent = playData.tag;
        li.insertBefore(badge, li.firstChild);
      }
      const filterTags = v4GetFilterTagsForPlay(playData);
      if (filterTags.length) {
        const tags = (li.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
        filterTags.forEach(function (tag) {
          if (tags.indexOf(tag) === -1) tags.push(tag);
        });
        li.setAttribute("data-tags", tags.join(" "));
      }
    });
  });
}
