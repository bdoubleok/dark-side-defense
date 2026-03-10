# 🔥 Dark Side Pressure System - User Guide

## What's New

The game plan tool now includes a complete **Pressure/Blitz Menu** integrated into each situation tab. This mirrors Mike Macdonald's disciplined pressure philosophy.

---

## How to Use

### **1. Accessing Pressures**

Navigate to any situation tab (Standard Downs, Passing Downs, etc.) and you'll see:

```
View: [Coverages] [🔥 Pressures]
```

- **Coverages** = Your normal coverage plays (default view)
- **🔥 Pressures** = Stunts and blitzes for this situation

**Note:** Not all situations have pressures. Red Zone and Two-Minute have no pressures (per Macdonald philosophy).

---

### **2. Decision Tree (Passing Downs Only)**

When you click "🔥 Pressures" on the Passing Downs tab, you'll see a decision tree at the top:

```
🎯 SHOULD YOU PRESSURE?

Down & Distance:    ✅ 3rd & 7+
QB Quality:         [Elite] [Average] [Backup]
Last 3 Plays:       [3+ Zones] [Mixed] [Blitzed]
4-Man Rush Working: [Yes] [No]
```

**How it works:**
1. Tap the buttons to set each condition
2. Decision tree evaluates if you should pressure
3. Shows ✅ "ALL CHECKS PASS" or ❌ "DO NOT PRESSURE"
4. Provides recommendation

**Example Results:**
- ✅ **Pressure Approved:** "Tex Stunt (20%) or Sim Pressure 3 (10%)"
- ❌ **Pressure Denied:** "Elite QB will diagnose quickly. Use Cover 4 Palms instead."

---

### **3. Pressure Cards**

Scroll down to see available pressures/stunts:

```
┌─────────────────────────────────────────┐
│ 🔥 Nickel 2-4 Load                20% │
│    Tex Stunt                            │
│    4-Man Stunt                          │
│                                         │
│ DT crashes inside, DE loops inside.     │
│ Creates A/B gap interior pressure...    │
│                                         │
│ ✅ Pocket Passer  ✅ 3rd & 7+          │
│ ❌ Mobile QB      ❌ Repeatedly         │
└─────────────────────────────────────────┘
```

**Card Elements:**
- **🔥 Icon** = Pressure card (vs normal coverage cards)
- **Formation Tag** = Red border (vs blue for coverages)
- **Pressure Type** = "4-Man Stunt", "5-Man Fire Zone", etc.
- **Coverage** = What coverage pairs with this pressure
- **Full Description** = How the pressure works
- **Tags** = When to use, when to avoid

---

### **4. Pressure Tracker**

At the bottom when viewing pressures:

```
📊 PRESSURE LOG                [+ Log Pressure]

Q1, 3:45 - Tex Stunt
Q2, 8:12 - Sim Pressure 3

Pressures Used: 2
Pressure Rate: 8% (2 of 25 plays)
Target: 20-25%
```

**How to Log:**
1. Click "[+ Log Pressure]"
2. Enter pressure name (e.g., "Tex Stunt")
3. Enter quarter (1-4)
4. Enter time (e.g., "3:45")
5. Tracker updates automatically

**Why Track?**
- Ensures you stay within Macdonald's 20-25% blitz rate
- Prevents over-blitzing (common mistake)
- Shows pressure rate in real-time
- Red = over 25% (too much)
- Green = under 25% (good)

**Storage:**
- Saved to browser localStorage
- Persists between sessions
- Clear browser data = resets log

---

## Pressure Breakdown by Situation

### **Standard Downs (3 pressures)**
- Exit Stunt (10%)
- Tex Stunt (10%)
- Pirate Stunt (5%)
- **Philosophy:** Rarely pressure on 1st down

### **Passing Downs (5 pressures)** ⭐ PRIMARY
- Tex Stunt (20%) - Your #1
- Tempe Stunt (15%)
- Exit Stunt (10%)
- El Paso Stunt (5%)
- Sim Pressure 3 (10%) - Only true blitz
- **Philosophy:** Main pressure situation

### **Short Yardage (1 pressure)**
- Pirate Stunt (15%)
- **Philosophy:** Mostly straight rush with 8 in box

### **Red Zone (0 pressures)**
- **Philosophy:** Never blitz in red zone

### **Two-Minute (0 pressures)**
- **Philosophy:** Prevent big plays, no risks

### **vs Air Raid (1 pressure)**
- Fire Zone Blitz (5%)
- **Philosophy:** Occasional change-up only

### **vs Veer & Shoot (1 pressure)**
- Scrape Exchange (5%)
- **Philosophy:** Confuse zone read keys

### **Run Defense (2 pressures)**
- Pirate Stunt (15%) - Primary
- Exit Stunt (10%)
- **Philosophy:** Stunts to stop run, not blitzes

---

## Macdonald's Pressure Rules

### ✅ **When to Pressure:**
1. 3rd & 7+ (after showing 3-4 zones first)
2. Red zone passing situations
3. vs backup QBs
4. After successful straight rush
5. Creative fire zones

### ❌ **Never Pressure:**
1. 1st down
2. 2nd & short
3. vs elite QBs
4. When 4-man rush is winning
5. Goal line run situations
6. Two-minute drill

### 📊 **Target Percentages:**
- **Total Blitz Rate:** 20-25% max (college), 15-20% (NFL)
- **Fire Zones (true blitzes):** 10-15%
- **Stunts (4-man rush):** 10-15%
- **Straight Rush:** 60-70%

---

## Tips for Using the System

### **Pre-Game:**
1. Review pressure cards for each situation
2. Note which pressures are PRIMARY (highlighted)
3. Understand decision tree logic
4. Reset pressure tracker ([+ Log Pressure] to start fresh)

### **During Game:**
1. Click situation tab (e.g., Passing Downs)
2. Click "🔥 Pressures" toggle
3. Check decision tree (if available)
4. Select pressure based on recommendation
5. Log the call
6. Monitor pressure rate

### **Post-Game:**
1. Review pressure log
2. Check if rate was 20-25%
3. Note which pressures worked
4. Adjust for next week

---

## Keyboard-Free Design

All interactions are **touch-optimized**:
- Large tap targets
- No hover states
- Quick selector buttons for decision tree
- Simple log dialog (name, quarter, time)

Works great on:
- ✅ iPad/Android tablets
- ✅ iPhones/Android phones
- ✅ Desktop browsers

---

## Troubleshooting

**Q: I don't see "🔥 Pressures" toggle**
A: That situation has no pressures. Red Zone and Two-Minute never show pressures.

**Q: Decision tree says "DO NOT PRESSURE" - why?**
A: Check which condition failed:
- Elite QB = they'll diagnose it
- Already blitzed = back to zones
- 4-man rush working = stick with it
- Wrong down/distance = only blitz on 3rd & 7+

**Q: Pressure tracker not saving**
A: Uses browser localStorage. Check:
- Browser not in private/incognito mode
- Cookies/storage enabled
- Not clearing browser data

**Q: Pressure rate too high (over 25%)**
A: You're blitzing too much. Macdonald's philosophy:
- Back to straight 4-man rush
- More zone coverages
- Less Sim Pressure 3
- Stunts are okay (4-man rush)

**Q: Can I export pressure log?**
A: Not currently implemented. Log exists only in browser localStorage.

---

## Future Enhancements (Not Yet Built)

- Export/import pressure log
- Multi-game tracking
- Pressure success rate tracking
- Automatic decision tree based on game state
- Voice logging ("Tex Stunt Q1 3:45")
- Pressure tendency analysis

---

## Summary

The pressure system gives you:
1. **Integrated toggle** - Switch between coverages and pressures
2. **Decision tree** - Know when to blitz vs when not to
3. **Full pressure cards** - Stunts + blitzes with complete context
4. **Pressure tracker** - Monitor your blitz rate
5. **Macdonald philosophy** - Built into every decision

Use it to stay disciplined with pressure calls and avoid over-blitzing!
