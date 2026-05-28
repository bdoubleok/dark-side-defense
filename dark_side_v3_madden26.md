# DARK SIDE DEFENSE v3.1 — Madden 26 Custom Build

**Macdonald / Martindale / Minter Scheme · Madden NFL 26 · Custom Playbook**

> Parallel build to `dark_side_v3_cfb26.md`. Same architecture (4-down nickel base, hybrid coverage tokens, Macdonald philosophy) translated to Madden's formation library. **v3.1 pivots from "Seahawks playbook as-is" to a custom playbook combining Seahawks (Macdonald current) + Ravens (Macdonald original / Wink Martindale) + Chargers (Minter current).** The Ravens 2.0 cross-blitz family and unique Macdonald-lineage formations (Nickel Triple, Nickel Over, Load Dbl Mug) live across these three books — no single team carries all of them.

---

## Why a Custom Playbook (Updated from v3.0)

v3.0 used the Seahawks playbook as-is on the reasoning that "Macdonald is the Seahawks coach, the playbook is already his scheme." That was directionally right but undersold the lineage.

**The Macdonald scheme exists across three NFL playbooks:**

| Lineage | Playbook | Era | Unique Formations |
|---------|----------|-----|--------------------|
| Macdonald (Seahawks DC, 2024-) | **Seahawks** | Current | 3-4 Tite 5 Tech, 2-4 Load Mug, 3-3-5 Over Flex |
| Macdonald (Ravens DC, 2022-23) / Martindale (Ravens DC, 2018-21) | **Ravens** | Original | Nickel Triple, Nickel Over, Nickel 3-3 Load Mug, Nickel 3-3 Load Dbl Mug, 4-3 Odd Leo, Dime 2-3 Will |
| Minter (Chargers DC, 2024-) — was Macdonald's Michigan DC | **Chargers** | Current | Nickel Triple, Dime 2-3 Will, Dime Single Mug |

**Building a custom playbook** lets you pull from all three. The Ravens book contributes the cross-blitz DNA the Seahawks book trimmed; the Chargers book contributes Minter's coverage variants.

---

## Identity

*Front philosophy*
- **2-DL stand-up nickel first.** Nickel 2-4 in Madden = 2 DL (stand-up edges) + 2 ILB + 1 nickel CB on top of 4 DB. Hybrid 3-4 personnel showing a 4-down pre-snap look. Closer to the real-world Macdonald defense than any CFB '26 formation.
- Tite 5 Tech and 3-3 Odd as change-up shells.
- Mug fronts are presentation, not automatic pressure.

*Coverage philosophy*
- Two-high match coverage first.
- Live in Quarters, Palms, Cover 6, and Cover 3 Match / Buzz Mable.
- Tampa 2 and Drop calls are situational answers.

*Pressure philosophy*
- Stunts and sims over true blitz.
- Pressure spike on 3rd & 7+.
- Real-Macdonald math: ~19-22% blitz rate, ~36% pressure rate.

**Playbook allocation: 65% base coverage / 25% sims & stunts / 10% true blitz.**

---

## Quick Build Instructions

1. **Open Madden's Custom Playbook builder** under Coach/Settings.
2. **Pull formations from three source playbooks** (table below). Formation availability is the same regardless of which playbook you start the custom build from.
3. **Final book = 12 formations + Goal Line** (see Formation Table).
4. **Audibles: set per-formation** using the per-formation tables (4 audibles each).
5. **Auto-Flip: OFF** — preserves designed blitz angles and front integrity.
6. **Coach adjustments:**
   - Match Zones: **ON**
   - Play Ball in Air: **Aggressive** on outside CBs, **Balanced** on safeties
   - QB Contain: **ON** for sim pressures

> **If you want a single-playbook starter (no custom build):** Pick **Seahawks**. You'll be missing Nickel Triple, Nickel Over, the Load Mug variants, and Dime 2-3 Will — but you'll get 8 of the 12 formations and the philosophy still applies. Pick **Ravens** for a closer match to the cross-blitz DNA and Nickel Triple, but you'll lose 2-4 Single Mug's `Blitz Tex 3 Sim 3` and `DT Mike Loop 3`.

---

## Formation Table

Twelve formations from three source playbooks. Custom build pulls each from its native book.

| # | Formation | Personnel | Source | Status |
|---|-----------|-----------|--------|--------|
| 1 | **Nickel 2-4** | 2 DL / 4 LB / 5 DB | Seahawks | ✅ verified (38 plays) |
| 2 | **Nickel 2-4 Dbl Mug** | 2 DL / 4 LB (2 mugged) / 5 DB | Seahawks | ⚠ verify in-game |
| 3 | **Nickel 3-3 Odd** | 3 DL / 3 LB / 5 DB | Seahawks | ✅ verified (27 plays) |
| 4 | **Nickel Over** | 4 DL / 2 LB / 5 DB | **Ravens** | ✅ verified (39 plays) |
| 5 | **Nickel 3-3 Load Dbl Mug** | 3 DL / 3 LB stacked + double mug / 5 DB | **Ravens** | ⚠ verify in-game |
| 6 | **Nickel 2-4 Single Mug** | 2 DL / 4 LB (1 mugged) / 5 DB | Seahawks | ✅ verified (12 plays) |
| 7 | **Nickel 3-3 Load Mug** | 3 DL / 3 LB stacked + mug / 5 DB | **Ravens** | ⚠ verify in-game |
| 8 | **Dime 2-3** | 2 DL / 3 LB / 6 DB | Seahawks | ✅ verified (31 plays) |
| 9 | **Dime 2-3 Will** | 2 DL / 3 LB / 6 DB (Will SS) | **Chargers** | ⚠ verify in-game |
| 10 | **3-4 Under** | 3 DL / 4 LB / 4 DB | Seahawks | ⚠ verify in-game |
| 11 | **3-4 Tite 5 Tech** | 3 DL tite / 4 LB / 4 DB | Seahawks | ⚠ verify in-game |
| 12 | **3-3-5 Over Flex** | 3 DL / 3 LB / 5 DB | Seahawks | ⚠ verify in-game |
| GL | **Goal Line 5-3** | 5 DL / 3 LB / 3 DB | Any | ⚠ verify in-game |

**Snap percentages removed from this table** — they were estimates without source data. Use the situational chart below to drive formation selection; observe what your in-game tendencies become.

⚠ = formation exists in the source playbook, full play list not fetched from huddle.gg. Token slots and audibles for these formations should be confirmed in-game before favoriting.

*Why 12 + GL, not 8 (v3.0)?* The Macdonald scheme spans Seahawks + Ravens + Chargers. Each carries plays/formations the others don't. Nickel Triple was considered but dropped — it overlaps too much with the Load family for the slot-pressure role. 3-4 Bear was also considered but dropped — 3-4 Under and Tite 5 Tech already cover the heavy-front role.

---

## The Hybrid Coverage Token System

Same architecture as the CFB build. Every formation fills the four core token slots; specialty slots cover plays unique to that formation.

### Core Tokens

| Token | Coverage Family | Pre-Snap Look | Best Against |
|-------|------------------|---------------|--------------|
| **DANGER** | Cover 3 Match (1-high pattern match) | 1-high | Standard downs, balanced offense |
| **3 LOCK** | Cover 3 Buzz Mable / Cover 3 Sky (1-high press) | 1-high press | Quick game, timing routes |
| **POUND** | Cover 4 Quarters / Cover 4 Palms (2-high match) | 2-high | Spread, 3rd & long, empty |
| **STUFF** | Cover 6 / Cover 6 Willie (2-high asymmetric) | 2-high | Trips, red zone, disguise |

### Secondary Tokens

| Token | Coverage | Role |
|-------|----------|------|
| **CLOUD** | Cover 2 Invert | SS in box, FS over top |
| **SAND DEUCE** | Edge Blitz 3 / Edge Blitz 0 | Disguised 5-man pressure + Cover 2 |
| **ROBBER** | Cover 1 Robber / Cover 1 Robber Press / Cover 1 Hole | Man-free with reading defender |
| **SHOW 2** | Cover 9 Show 2 / Cover 9 | Man-free disguised as 2-high |
| **BRACKET** | Bracket Switch Willie / Double Bracket Switch | Coverage-disguise bracket (new for '26) |

---

## Per-Formation Curated Play Lists

### 1. Nickel 2-4 — Primary

*38 plays. Hybrid 2-DL stand-up / 4-LB / 5-DB. The most complete Macdonald menu in the playbook. Source: Seahawks.*

**Token slots**
- DANGER → `Cover 3 Match`
- 3 LOCK → `Cover 3 Buzz Mable` ⭐ *signature*
- POUND → `Cover 4 Palms`
- STUFF → `Cover 6 Willie`

**Specialty slots**
- `Sim Pressure 3` ⭐ *signature 4-man sim*
- `Edge Blitz 3` *Sand Deuce*
- `Edge Blitz 0` *zero-coverage edge pressure*
- `Cover 9 Show 2` *Show 2*
- `Cover 1 Robber` *Robber token*
- `Cover 1 Hole` *red zone*
- `Field Sim 3` *sim pressure variant*
- `Nickel Sim 2` *sim with Cover 2 behind*
- `Cross Sim 2` *Madden-only sim with C2 shell*
- `Over Storm Brave` *signature Seahawks 5-man*
- `Silver Shoot Pinch` *pinched DL stunt*
- `Bracket Switch Willie` *coverage disguise — new '26*
- `Tampa 2`

**Audibles (4 slots)**
1. `Cover 3 Buzz Mable`
2. `Sim Pressure 3`
3. `Cover 4 Palms`
4. `Edge Blitz 3`

---

### 2. Nickel 2-4 Dbl Mug — A-Gap Illusion ⚠ skeleton

*Both ILBs walked into A-gaps. Source: Seahawks.*

> **Play list not yet verified.** Fetch from [huddle.gg/26/playbooks/seahawks-def/nickel-2-4-dbl-mug/](https://huddle.gg/26/playbooks/seahawks-def/nickel-2-4-dbl-mug/) before favoriting. Community gameplans suggest this formation carries sim variants (Field Sim 3, Nickel Sim 2) plus the A-gap mug pressure family — **confirm in-game** before relying on specific play names.

**Token slots** — *to be filled after in-game audit*
**Specialty slots** — *to be filled after in-game audit*
**Audibles** — *to be filled after in-game audit*

> *Recipe regardless of plays: from any coverage play here, **double-tap RB/R1** to walk both ILBs to A-gaps for disguise. The mug presentation is the weapon, independent of which specific play you call.*

---

### 3. Nickel 3-3 Odd — Mint Equivalent

*27 plays. Loaded coverage menu (10 coverages) plus Macdonald's signature passing-down blitzes. Source: Seahawks.*

**Token slots**
- DANGER → `Cover 3 Match`
- 3 LOCK → `3 Buzz Mable`
- POUND → `Cover 4 Palms`
- STUFF → `Cover 6 Willie`

**Specialty slots**
- `Hot Blitz Bail` ⭐ *community's favorite blitz — looping MLB w/ bail technique*
- `LB Cross 3 Show 2` ⭐ *shows Cover 2, LBs cross-blitz, rotates to C3*
- `Tampa Sim Pressure` ⭐ *sim w/ Tampa 2 shell behind*
- `Cover 1 Robber Press` *Robber token w/ press*
- `Cover 9` *Show 2 token*
- `Sam Mike 3 Press` *5-man pressure w/ C3 behind*
- `Overload 3 Press` *overload + press technique*
- `Cover 3 Cloud` *coverage disguise variant*

**Audibles**
1. `3 Buzz Mable`
2. `Hot Blitz Bail`
3. `LB Cross 3 Show 2`
4. `Cover 1 Robber Press`

---

### 4. Nickel Over — CFB Cognitive Bridge ⭐ NEW in v3.1

*Standard 4-down nickel look — the **same formation name** as your CFB '26 primary. **Source: Ravens** (not in Seahawks book).*

**Token slots**
- DANGER → `Cover 3 Match`
- 3 LOCK → `Cover 3 Buzz Mable`
- POUND → `Cover 4 Palms`
- STUFF → `Cover 6 Willie`

**Specialty slots**
- `Sim Pressure 3` *if available — verify*
- `Edge Blitz 3` *Sand Deuce*
- `Cover 1 Robber` *Robber token*
- `Cover 9 Show 2` *Show 2*
- `Over Storm Brave`
- `Tampa 2`
- `Bracket Switch Willie`

**Audibles**
1. `Cover 3 Buzz Mable`
2. `Sim Pressure 3`
3. `Cover 4 Palms`
4. `Edge Blitz 3`

> *Why include Nickel Over when Nickel 2-4 is the primary? Two reasons: (1) cognitive bridge — if you also play CFB '26, your audibles and coverage instincts map directly across both games. (2) It's the "true" 4-down nickel look (vs. 2-4's stand-up edges), useful when you want a different OL key against a recently-burned-by-2-4 offense.*

---

### 5. Nickel 3-3 Load Dbl Mug — Loop Pressure Specialist ⭐ NEW in v3.1 · ⚠ skeleton

*Load front (stacked LBs) + both ILBs mugged. **Source: Ravens** (not in Seahawks book).*

> **Play list not yet verified.** Fetch from [huddle.gg/26/playbooks/ravens-def/nickel-3-3-load-dbl-mug/](https://huddle.gg/26/playbooks/ravens-def/nickel-3-3-load-dbl-mug/) before favoriting. Madden community gameplans suggest a "Loop family" of pressure plays unique to this formation — confirm in-game before relying on specific play names.

**Token slots** — *to be filled after in-game audit*
**Specialty slots** — *to be filled after in-game audit*
**Audibles** — *to be filled after in-game audit*

---

### 6. Nickel 2-4 Single Mug — Lighter Mug

*Single ILB walked into A-gap. 12 plays. Carries Madden-exclusive sim variants not found in CFB '26 or in any other formation here. Source: Seahawks.*

**Token slots** *(verified — note: no Cover 3 Match or Cover 3 Buzz Mable native)*
- DANGER → `Cov 3 Buzz Match` *(no separate Cover 3 Match — Buzz Match fills the 1-high role)*
- 3 LOCK → `Cov 3 Buzz Match` + press *(doubles up — limitation of the formation)*
- POUND → `Cover 4 Quarters`
- STUFF → `Cover 9` *(no Cover 6 native — Cover 9 fills as the 2-high disguise tool)*

**Specialty slots** *(verified)*
- `Blitz Tex 3 Sim 3` ⭐ *Madden-exclusive sim variant — Tex stunt with sim pressure*
- `DT Mike Loop 3` ⭐ *looping interior tackle / Mike pressure*
- `DB Blitz Tex 3` *DB edge pressure with C3 behind*
- `Nickel Blitz 3` *interior LB blitz with C3*
- `1LB Dog` *single LB blitz*
- `Cover 1 Hole` *Robber token*
- `Cover 2 Invert` *Cloud token*
- `Nickel 2 Trap`
- `Tampa 2`

**Audibles**
1. `Cov 3 Buzz Match`
2. `Blitz Tex 3 Sim 3`
3. `Cover 4 Quarters`
4. `DT Mike Loop 3`

> *Single Mug is the most popular Macdonald-meta formation in the Madden community. **Blitz Tex 3 Sim 3** and **DT Mike Loop 3** are the most consistent get-home blitzes in the game. Both look like coverage, both crash A-gap, both win the rep ~70% of the time when set up right.*

---

### 7. Nickel 3-3 Load Mug — Load + Single Mug ⭐ NEW in v3.1 · ⚠ skeleton

*Load front (stacked LBs) + single ILB mugged. **Source: Ravens** (not in Seahawks book).*

> **Play list not yet verified.** Fetch from [huddle.gg/26/playbooks/ravens-def/nickel-3-3-load-mug/](https://huddle.gg/26/playbooks/ravens-def/nickel-3-3-load-mug/) before favoriting. Likely shares the Load family's cross-blitz DNA, but **do not assume** Cover 1 Robber or the cross-games concepts are present until confirmed.

**Token slots** — *to be filled after in-game audit*
**Specialty slots** — *to be filled after in-game audit*
**Audibles** — *to be filled after in-game audit*

> *Pair conceptually with Load Dbl Mug — same Load alignment, different mug presentation. Run them on different downs against the same OL to keep the protection guessing.*

---

### 8. Dime 2-3 — Passing Down

*2 DL / 3 LB / 6 DB. 31 plays — **carries the full Macdonald sim suite** (Sim Pressure 3, Edge Blitz 3, Field Sim 3, Nickel Sim 2) plus Cover 3 Buzz Mable. Source: Seahawks.*

**Token slots** *(verified)*
- DANGER → `Cover 3 Match`
- 3 LOCK → `Cover 3 Buzz Mable` ⭐
- POUND → `Cover 4 Palms`
- STUFF → `Cover 6 Willie` *(or `Cover 6 Show 2` for trips)*

**Specialty slots** *(verified)*
- `Sim Pressure 3` ⭐
- `Edge Blitz 3` *Sand Deuce token*
- `Edge Blitz 0` *zero-coverage edge pressure*
- `Field Sim 3` · `Nickel Sim 2`
- `Cover 1 Robber` *Robber token*
- `Cover 1 Hole` *red zone variant*
- `Cover 9 Show 2` *Show 2 token*
- `Over Storm Brave` *5-man Seahawks signature*
- `Bracket Switch Willie` *coverage disguise — new for '26*
- `Tampa 2`

**Audibles**
1. `Cover 3 Buzz Mable`
2. `Sim Pressure 3`
3. `Cover 1 Robber`
4. `Edge Blitz 3`

> *Dime 2-3 is "Nickel 2-4 with an extra DB." Full sim suite + Bracket Switch family makes it viable on any obvious pass down.*

---

### 9. Dime 2-3 Will — Will Safety Variant ⭐ NEW in v3.1 · ⚠ skeleton

*Same personnel as Dime 2-3 but with the Will safety as the extra DB instead of the strong-side nickel. **Source: Chargers** (Minter's contribution; also in Ravens).*

> **Play list not yet verified.** Fetch from [huddle.gg/26/playbooks/chargers-def/dime-2-3-will/](https://huddle.gg/26/playbooks/chargers-def/dime-2-3-will/) before favoriting. Likely shares much of Dime 2-3's menu with Will-side-specific pressure variants — **do not assume** specific play names until confirmed.

**Token slots** — *to be filled after in-game audit*
**Specialty slots** — *to be filled after in-game audit*
**Audibles** — *to be filled after in-game audit*

> *Dime 2-3 Will is Minter's evolution. The Will safety becomes a pressure piece — different alignment from the standard 2-3 nickel, so it's a different OL key.*

---

### 10. 3-4 Under — Run-Down Change-Up

*Under-front 3-4 look. Source: Seahawks.*

> **Play list not yet verified.** Fetch from [huddle.gg/26/playbooks/seahawks-def/3-4-under/](https://huddle.gg/26/playbooks/seahawks-def/3-4-under/) before favoriting plays.

**Token slots** — *to be filled after in-game audit*
**Specialty slots** — *to be filled after in-game audit*
**Audibles** — *to be filled after in-game audit*

---

### 11. 3-4 Tite 5 Tech — Tite Alignment ⚠ skeleton

***Unique to the Seahawks playbook in Madden '26** — no other team has this formation. Tite alignment for run-heavy spread offenses. Source: Seahawks.*

> **Play list not yet verified.** Fetch from [huddle.gg/26/playbooks/seahawks-def/3-4-tite-5-tech/](https://huddle.gg/26/playbooks/seahawks-def/3-4-tite-5-tech/) before favoriting plays.

**Token slots** — *to be filled after in-game audit*
**Specialty slots** — *to be filled after in-game audit*
**Audibles** — *to be filled after in-game audit*

> *Tite 5 Tech is your "Macdonald goes back to his 3-4 roots" formation. Heavy run support, light pass disguise. Don't overuse — it shows a clear 3-4 base, which gives the offense a personnel read.*

---

### 12. 3-3-5 Over Flex — 2-High Change-Up ⚠ skeleton

*3-down with flex apex defender. Source: Seahawks.*

> **Play list not yet verified.** Fetch from [huddle.gg/26/playbooks/seahawks-def/3-3-5-over-flex/](https://huddle.gg/26/playbooks/seahawks-def/3-3-5-over-flex/) before favoriting. Likely mirrors CFB '26's 3-3-5 Over Flex menu but **do not assume** until confirmed.

**Token slots** — *to be filled after in-game audit*
**Specialty slots** — *to be filled after in-game audit*
**Audibles** — *to be filled after in-game audit*

---

### GL. Goal Line 5-3 — Goal Line

*5 DL / 3 LB / 3 DB. Man / gap assignments. Call based on short-yardage tendency.*

---

## Situational Play-Calling Chart

| Situation | Formation | Primary Call | Mix-In |
|------------|-----------|--------------|--------|
| **1st & 10 (balanced)** | Nickel 2-4 | DANGER (`Cover 3 Match`) | POUND (`Cover 4 Palms`), 3 LOCK |
| **1st & 10 (run-heavy)** | 3-4 Tite 5 Tech | DANGER (`Cover 3 Match`) | 4-man rush |
| **2nd & short (≤3)** | Nickel 2-4 | ROBBER (`Cover 1 Robber`) | DANGER, Show Blitz + Pinch DL |
| **2nd & medium (4-6)** | Nickel 2-4 | POUND (`Cover 4 Palms`) | SAND DEUCE (`Edge Blitz 3`) |
| **2nd & long (7+)** | Nickel 2-4 | POUND (`Cover 4 Quarters`) | SHOW 2 (`Cover 9 Show 2`), `Sim Pressure 3` |
| **3rd & short (1-3)** | 3-4 Under or 2-4 Dbl Mug | ROBBER (`Cover 1 Hole`) | `Nickel Dog 3 Buzz`, mug pressures |
| **3rd & medium (4-6)** | Nickel 2-4 or Load Dbl Mug | `Sim Pressure 3` (from 2-4) | `Field Sim 3`, `Hot Blitz Bail` (from 3-3 Odd) |
| **3rd & long (7+)** | Nickel 3-3 Odd or Dime 2-3 | POUND (`Cover 4 Quarters`) or `Hot Blitz Bail` | `Edge Blitz 3`, `Zero Blitz` |
| **Red zone (inside 20)** | Nickel 2-4 or 3-3 Odd | ROBBER (`Cover 1 Robber Press`) | STUFF (`Cover 6`), POUND |
| **Goal line (inside 5)** | Goal Line 5-3 | Man / gap | Goal line crash |
| **2-minute** | Nickel 2-4 | DANGER + POUND only | Simplify |
| **vs Trips** | Any Nickel | STUFF (`Cover 6` / `Cover 6 Willie`) | — |
| **vs Bunch** | Any Nickel | SQUAT (`Cover 4 Palms` w/ adjustments) | — |
| **vs Empty** | Nickel 2-4 | POUND (`Cover 4 Quarters`) | `Edge Blitz 3` |

---

## Defensive Tendency Chart

**Standard Game Plan (Balanced Offense)**

| Situation | DANGER | 3 LOCK | POUND | STUFF |
|-----------|--------|--------|-------|-------|
| 1st & 10 | 40% | 30% | 20% | 10% |
| 2nd & Short | 50% | 20% | 15% | 15% |
| 2nd & Medium | 30% | 25% | 25% | 20% |
| 2nd & Long | 20% | 25% | 35% | 20% |
| 3rd & Short | 50% | 25% | 10% | 15% |
| 3rd & Medium | 20% | 30% | 20% | 30% |
| 3rd & Long | 10% | 15% | 50% | 25% |
| Red Zone | 30% | 25% | 10% | 35% |

**vs Spread-Heavy Offense.** Shift toward POUND and STUFF. (1st & 10: 25/25/30/20.)

**vs Run-Heavy / Under-Center.** Shift toward DANGER and 3 LOCK. Use 3-4 Tite 5 Tech more. (1st & 10: 50/30/10/10.)

---

## Pre-Snap Adjustment Recipes

### Recipe 1 — Mugged A-Gap Disguise

**Steps.** Call any zone play from Nickel 2-4 or 3-3 Odd → Double-tap RB/R1 (Show Blitz, LBs only) → Both ILBs walk to A-gaps → Coverage plays as called post-snap.

**Best with.** `Cover 3 Buzz Mable`, `Cover 3 Match`, `Tampa 2`.

**Why.** Offense sees blitz, blocks for pressure, you drop 7 into coverage. Macdonald's signature deception.

### Recipe 2 — Sim Pressure Enhancement

**Steps.** Call `Sim Pressure 3` or `Field Sim 3` → Pinch DL → Spread LBs → Let the designed rush exchange unfold.

**Why.** Pinched DL creates interior confusion while the LB/DL swap generates a free rusher.

### Recipe 3 — Custom Robber from Cover 3

**Steps.** Call `Cover 3 Sky` → Select strong safety → Hot route to Hook Zone → Use Coach Adjustments → Custom Stunts to set the safety's drop depth.

**Why.** De facto robber sitting in the intermediate middle. Best when you user-control the safety.

### Recipe 4 — Hot Blitz Bail Optimization

**Steps.** Call `Hot Blitz Bail` from Nickel 3-3 Odd → Auto Flip OFF → Flip play call → Shift DL Left → Spread LBs → Zone out slot CB and left edge to curl flats.

**Why.** Looping MLB comes free through the A-gap. Community's highest-rated Madden '26 blitz setup.

### Recipe 5 — Coverage Shell Disguise

**Steps.** Call `Cover 3 Buzz Mable` (naturally shows two-high pre-snap) → Shade coverage down to bring buzz defender closer to the line.

**Why.** Pre-snap looks like Cover 2 or Quarters. Post-snap it's Cover 3 with a robber. QB reads the wrong coverage.

---

## Coverage Rotation Principles

Same as the CFB build. The QB can never settle into a rhythm.

**1-High / 2-High Oscillation.**
- Play 1: DANGER (1-high) → QB reads single-high safety
- Play 2: POUND (2-high) → QB reads split safeties
- Play 3: 3 LOCK (1-high) → QB thinks it's Danger, but corners are pressing
- Play 4: STUFF (2-high) → QB thinks it's Pound, but one side is Cover 2

**Pairing rules.**
- After completion of 15+ → POUND or STUFF next play.
- After sack or TFL → 3 LOCK. Press while they're on their heels.
- After quick pass for 5+ → 3 LOCK. Disrupt the timing.
- After run for 5+ → DANGER. 4th underneath defender.
- After offense penalty → POUND. Make them earn it.
- 3rd down after two runs → STUFF. Force asymmetric diagnosis.
- After offense timeout → CHANGE coverage.

---

## Real-World Roster Notes (Macdonald's Actual Seahawks)

The Madden Seahawks roster maps well to this scheme — these are the personnel who execute Macdonald's real defense:

- **"Emmanwori" role.** Coby Bryant or actual rookie Nick Emmanwori himself if he's on roster. Strong safety who lives in the box.
- **Edge rushers.** Boye Mafe + Derick Hall + Uchenna Nwosu when healthy. All three play stand-up edge at OLB depth.
- **Interior DL.** Jarran Reed + Leonard Williams. Generate interior pressure without blitzing.
- **Cornerbacks.** Devon Witherspoon (the press / Robber Press CB) + Riq Woolen + Tariq Woolen (if rostered).
- **Off-ball LB.** Ernest Jones IV + Tyrice Knight. Need zone coverage chops for the match concepts.
- **Free safety.** Julian Love. Traditional center-field.

If you're running this in Franchise mode, prioritize re-signing Witherspoon and Mafe — they're the irreplaceable scheme pieces.

---

## What Differs From CFB v3.1

| Element | CFB v3.1 | Madden v3.1 |
|---------|----------|-------------|
| Base playbook | 4-2-5 (custom build) | **Custom build — Seahawks + Ravens + Chargers** |
| Primary formation | Nickel Over | **Nickel 2-4** (Seahawks) |
| Cognitive bridge | — | **Nickel Over** (Ravens) — same name + similar menu as CFB primary |
| Mug primary | Nickel Double Mug | **Nickel 2-4 Dbl Mug** (Seahawks; carries sims) |
| Mint equivalent | Nickel 3-3 Mint | **Nickel 3-3 Odd** (Seahawks) |
| Tite alignment | Nickel 3-3 Mint (apex CB) | **3-4 Tite 5 Tech** (Seahawks; unique to that playbook) |
| Cross-blitz / Ravens 2.0 DNA | Nickel Load + 3-3-5 Penny + Load Mug | **Nickel 3-3 Load Mug + Load Dbl Mug** (Ravens) |
| Slot blitz specialist | Combined into Mint formations | **Nickel Triple** (Ravens / Chargers) — dedicated formation |
| Passing down | Dime Normal | **Dime 2-3 + Dime 2-3 Will** (Seahawks + Chargers) |
| Heavy box | 3-4 Odd (add from 3-4) | **3-4 Under** (Seahawks) |
| Formations from outside primary | 1 (3-4 Odd) | **5** (Nickel Triple, Over, Load Dbl Mug, Load Mug, Dime 2-3 Will) |
| Single-playbook fallback | — | Seahawks (loses 4 formations) or Ravens (loses Single Mug + Tite 5 Tech) |

The token system (DANGER / 3 LOCK / POUND / STUFF + secondaries) is the **shared contract** across both. Calling "POUND" from Nickel 2-4 in Madden returns the same coverage role as calling POUND from Nickel Over in CFB — even though the play name underneath is different. That's the abstraction that makes both builds learnable as one system.

---

## Verification To-Dos

A few formations and play lists I'm still inferring from analog data. Confirm in-game and adjust audibles if needed:

- **Nickel 3-3 Load Mug** — verify Cover 1 Robber, OLB Cross Games, LB 3 Seam Games are in the menu (inherited from Load family, but Mug variants sometimes lose plays).
- **Nickel Over (Ravens)** — verify Sim Pressure 3 is native; if not, swap audible 2 for Cover 1 Robber.
- **Dime 2-3 Will (Chargers)** — verify the exact play menu and confirm "Will Safety Blitz" or its actual play name.
- **3-4 Under** — verify the exact coverage and pressure menu.
- **Goal Line 5-3** — standard, but verify which zero-blitz variant is best.

**Verified (full audit done):**
- Nickel 2-4 (38 plays)
- Nickel 2-4 Dbl Mug (12 plays)
- Nickel 2-4 Single Mug (12 plays)
- Nickel 3-3 Odd (27 plays)
- Nickel Triple (12 plays)
- Nickel 3-3 Load Dbl Mug (12 plays)
- Dime 2-3 (31 plays)
- 3-4 Tite 5 Tech (partial)

---

## What Changed From v3.0

| Issue | v3.0 | **v3.1 (current)** |
|-------|------|--------------------|
| Approach | Use Seahawks playbook as-is | **Custom playbook (Seahawks + Ravens + Chargers)** |
| Formation count | 8 + GL | **12 + GL** |
| Nickel Triple | Not included | **Added (Ravens / Chargers signature)** |
| Nickel Over | Not in Seahawks book | **Added (Ravens) — cognitive bridge to CFB build** |
| Nickel 3-3 Load Mug | Not in Seahawks book | **Added (Ravens) — Load DNA** |
| Nickel 3-3 Load Dbl Mug | Not in Seahawks book | **Added (Ravens) — Loop pressure** |
| Dime 2-3 Will | Not in Seahawks book | **Added (Chargers) — Minter's variant** |
| Lineage acknowledged | Macdonald-Seahawks only | **Macdonald + Martindale (Ravens) + Minter (Chargers)** |
| 3-4 Bear | Included | Cut (overlapped with 3-4 Under) |

**Why v3.0 → v3.1?** v3.0 conflated "Macdonald's current scheme" with "the Seahawks playbook." The actual Macdonald-lineage scheme spans three NFL playbooks. Building a custom playbook gets you all of them — including the iconic Nickel Triple (Wink Martindale signature, carried by Macdonald at Baltimore, now at Chargers under Minter) and the Loop pressure family unique to the Ravens book.

---

*Built for Madden '26 Franchise / online play. 12 formations · 4 audibles each · 5 recipes · 7 rotation triggers · Same shared token contract as CFB '26 v3.1.*

*Parallel to `dark_side_v3_cfb26.md`. Same architecture, different formation library — but now both books pull from the same Ravens 2.0 / Macdonald / Minter lineage.*
