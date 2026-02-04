# Eyes OFF — Complete Game Design Document

## 🎮 Game Identity

**Title:** Eyes OFF  
**Genre:** Two-Player Cooperative Chaos Game  
**Platform:** Web Browser (HTML5)  
**Target Audience:** College technical fest participants and spectators  
**Session Length:** 4-8 minutes per complete playthrough  

---

## Concept Statement

Eyes OFF is a high-tension, two-player cooperative experience where trust meets chaos. One player navigates blindly with only a mouse, while their partner becomes their eyes—shouting directions through increasingly absurd obstacles. It's designed to create unforgettable moments of miscommunication, triumphant coordination, and spectacular failures that entertain both players and spectators alike.

**The Core Fantasy:** "I am your eyes. Trust me."

---

## Player Roles — The Dynamic Duo

### The Navigator (Player 1)
| Attribute | Details |
|-----------|---------|
| **Physical State** | Blindfolded — cannot see the screen under any circumstances |
| **Input Device** | Mouse only (movement + clicks) |
| **Mental State** | Relies entirely on auditory instructions; must process verbal commands into physical actions |
| **Emotional Journey** | Vulnerability → Trust → Frustration → Elation |

**What Makes This Role Challenging:**
- Must translate abstract directions ("a little to the left") into precise movements
- Cannot anticipate what's coming next
- Must resist the urge to peek
- Deals with the psychological weight of being "blind" in a visual game

### The Guide (Player 2)
| Attribute | Details |
|-----------|---------|
| **Physical State** | Full vision of the screen |
| **Input Device** | Voice only — no mouse, no keyboard |
| **Mental State** | Must process visual information and translate it into clear, rapid verbal instructions |
| **Emotional Journey** | Confidence → Panic → Adaptation → Mastery |

**What Makes This Role Challenging:**
- Must describe spatial relationships quickly and accurately
- Deals with the gap between what they see and what they can communicate
- Must stay calm when the Navigator makes mistakes
- Experiences the unique frustration of seeing the solution but being unable to execute it

---

## Complete Game Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GAME FLOW DIAGRAM                              │
└─────────────────────────────────────────────────────────────────────────────┘

[SPLASH SCREEN]
      │
      ▼
[TEAM REGISTRATION]
      │ • Team name entry
      │ • Optional: Player names
      ▼
[RULES & ROLE EXPLANATION]
      │ • Animated tutorial
      │ • Role clarification
      │ • Blindfold verification prompt
      ▼
[COUNTDOWN — 3... 2... 1... GO!]
      │
      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ⏱️ TIMER BEGINS                                    │
│                                                                             │
│  [LEVEL 1: Digital Cleanup]                                                 │
│         │                                                                   │
│         ▼ (3-second transition)                                             │
│  [LEVEL 2: Password Panic]                                                  │
│         │                                                                   │
│         ▼ (3-second transition)                                             │
│  [LEVEL 3: Bomb Defusal]                                                    │
│         │                                                                   │
│         ▼ (3-second transition)                                             │
│  [LEVEL 4: Safe Cracker]                                                    │
│         │                                                                   │
│         ▼ (3-second transition)                                             │
│  [LEVEL 5: Laser Heist]                                                     │
│         │                                                                   │
│         ▼ (3-second transition)                                             │
│  [LEVEL 6: Maze Escape]                                                     │
│                                                                             │
│                          ⏱️ TIMER STOPS                                     │
└─────────────────────────────────────────────────────────────────────────────┘
      │
      ▼
[RESULTS SCREEN]
      │ • Final time displayed
      │ • Per-level breakdown
      │ • Leaderboard position
      ▼
[LEADERBOARD]
      │ • Top teams displayed
      │ • Retry or Exit options
      ▼
[END / REPLAY]
```

---

## Pre-Game Sequence

### 1. Splash Screen
- Game logo with subtle glitch animation
- "Press anywhere to begin" prompt
- Background: Abstract visualization of a cursor lost in darkness

### 2. Team Registration
- **Input:** Team name (required, 3-20 characters)
- **Validation:** No duplicate names on current leaderboard
- **Visual:** Clean, minimal interface — nothing that distracts from the game ahead

### 3. Rules & Role Explanation
**Screen 1 — The Concept**
> "One of you is BLIND. One of you is MUTE (to the game).  
> Together, you must survive six challenges.  
> Your only weapons: trust and communication."

**Screen 2 — Navigator Instructions**
> "NAVIGATOR: You control the mouse. You see NOTHING.  
> Put on your blindfold now. Your partner is your lifeline."

**Screen 3 — Guide Instructions**
> "GUIDE: You see everything. You control NOTHING.  
> Your voice is the Navigator's only map. Speak clearly. Speak fast."

**Screen 4 — Chaos Warning**
> "WARNING: The game will fight back.  
> Random chaos events will disrupt your coordination.  
> Stay calm. Adapt. Overcome."

**Screen 5 — Blindfold Verification**
> "GUIDE: Confirm your Navigator is blindfolded.  
> [NAVIGATOR IS READY] — large clickable button"

### 4. Countdown
- Full-screen "3... 2... 1... GO!" with dramatic visual effects
- Timer begins the instant "GO!" appears
- Immediate transition to Level 1

---

## Level Descriptions — Deep Dive

---

### Level 1: Digital Cleanup

**Theme:** Nostalgic desktop chaos — cleaning up a messy virtual workspace  
**Difficulty:** ★☆☆☆☆ (Tutorial/Warm-up)  
**Estimated Duration:** 30-45 seconds  

#### Visual Design
- Classic operating system desktop aesthetic (reminiscent of Windows 98/XP)
- Scattered file icons: documents, folders, images, mystery files
- A single recycle bin positioned in one corner (randomized each playthrough)
- Soft, familiar color palette — intentionally comforting before chaos begins

#### Mechanics

| Element | Details |
|---------|---------|
| **File Count** | 6-8 files, randomly positioned |
| **File Sizes** | Small (easy to grab), Medium, Large (harder to grab, larger hitbox) |
| **Recycle Bin** | Fixed position, generous drop zone |
| **Drag Mechanic** | Click and hold to grab → drag → release to drop |
| **Success Feedback** | File disappears with satisfying visual animation |
| **Miss Feedback** | File snaps back to original position |

#### Communication Dynamics
- Guide must establish directional vocabulary: "Left, right, up, down, stop"
- Tests baseline coordination before complexity increases
- Natural teaching moment for both players

#### Win Condition
All files successfully deposited in recycle bin.

#### Why This Level Works
- **Low stakes:** Builds confidence without immediate punishment
- **Establishes trust:** Players learn each other's communication style
- **Spectator-friendly:** Audiences can easily follow the action
- **Nostalgia hook:** Familiar interface creates instant recognition

---

### Level 2: Password Panic

**Theme:** Hacking under pressure — cracking into a secure system  
**Difficulty:** ★★☆☆☆  
**Estimated Duration:** 45-75 seconds  

#### Visual Design
- Sleek "hacking terminal" aesthetic with dark background
- Large on-screen QWERTY keyboard (keys clearly labeled and well-spaced)
- Password field at top showing target password (visible to Guide only)
- "ACCESS DENIED" / "ACCESS GRANTED" status indicator
- Subtle scanline effect for atmosphere

#### Mechanics

| Element | Details |
|---------|---------|
| **Password Length** | 6-8 characters |
| **Character Types** | Lowercase letters + numbers (no symbols or capitals for clarity) |
| **Keyboard Layout** | Standard QWERTY, but keys shuffle positions after every 2 correct keystrokes |
| **Key Click** | Single click to input character |
| **Mistake Handling** | Backspace key available to delete last character |
| **Visual Feedback** | Correct keystroke = green flash; keyboard shuffles with animation |

#### The Shuffle Mechanic — Design Philosophy
The keyboard shuffle is the soul of this level. It forces:
1. **Constant re-navigation:** The Guide can't say "Q is in the top-left" twice
2. **Rapid adaptation:** Both players must adjust to new layouts every few seconds
3. **Communication stress:** The Guide must track both the PASSWORD and the KEYBOARD simultaneously

#### Sample Passwords
- `run4it`
- `bypass7`
- `crack2me`
- `g0lden`

*(Passwords are readable, pronounceable, and avoid ambiguous characters like 0/O, 1/l)*

#### Communication Dynamics
- **Spelling challenge:** "B... R... A... V... O... 7"
- **Location challenge:** "It's in the second row, fourth from left... wait, it moved!"
- **Speed vs. accuracy tension:** Rushing causes typos; careful play burns time

#### Win Condition
Complete password successfully entered.

#### Why This Level Works
- **Mechanical escalation:** Introduces clicking precision after drag-and-drop
- **Artificial pressure:** The shuffle creates urgency even without a visible threat
- **Memorable moments:** "WHERE DID THE 'E' GO?!" becomes a recurring panic phrase
- **Skill expression:** Expert teams develop rapid alphabet-grid communication

---

### Level 3: Bomb Defusal

**Theme:** High-stakes action movie moment — the classic "cut the wire" scenario  
**Difficulty:** ★★★☆☆  
**Estimated Duration:** 45-90 seconds  

#### Visual Design
- Open bomb casing revealing internal components
- 6 colored wires running across the interface, intentionally tangled and overlapping
- Wire colors: Red, Blue, Green, Yellow, White, Black
- Code panel (visible to Guide only) showing the defusal sequence
- Timer display (showing overall game time, not a bomb countdown — avoids redundant pressure)
- Wire-cutting animation when clicked

#### Mechanics

| Element | Details |
|---------|---------|
| **Total Wires** | 6 wires |
| **Wires to Cut** | 4 in specific sequence |
| **Wire Design** | Tangled, overlapping, some cross behind others |
| **Cut Action** | Single click on wire (generous hitbox) |
| **Wrong Wire** | +5 second penalty added to timer; wrong wire visually sparks |
| **Correct Wire** | Wire snaps with satisfying animation; checkbox marks progress |

#### Wire Tangle Philosophy
The wires are deliberately designed to create **descriptive ambiguity**:
- "The red wire" — but two wires appear red
- "The one on the left" — but wires cross over each other
- "The one that goes behind the blue" — requires tracing the wire path

This forces the Guide to develop **compound descriptions**:
> "Okay, there's a red wire that starts at the top-left, goes down, crosses BEHIND the blue one, and ends at the bottom-right. That's the one. The OTHER red wire stays on top."

#### Sample Defusal Sequences
- Blue → Yellow → Red (behind blue) → White
- Green → Black → Yellow → Red (in front)
- White → Blue → Green → Black

#### Communication Dynamics
- **Color + position + path:** Triple-layered descriptions
- **Confirmation protocol:** "Are you on the right one? Describe what you see." "I can't see anything!" "Right, sorry."
- **Penalty psychology:** Wrong cuts don't reset but cost time, creating "sunk cost" tension

#### Win Condition
All 4 correct wires cut in the correct sequence.

#### Why This Level Works
- **Pop culture resonance:** Everyone knows the "which wire?" trope
- **Communication complexity:** Simple colors become surprisingly hard to describe
- **Penalty without failure:** +5 seconds stings but doesn't end the run
- **Spectator tension:** Audience can follow along and anticipate mistakes

---

### Level 4: Safe Cracker

**Theme:** Heist movie tension — cracking a vault with nothing but feel and timing  
**Difficulty:** ★★★★☆  
**Estimated Duration:** 60-120 seconds  

#### Visual Design
- Vintage bank vault door with large circular combination dial
- Dial displays numbers 0-99 around its circumference
- A "stolen note" in the corner shows the combination (visible to Guide only)
- Dial indicator/needle pointing to current number
- Subtle tick marks between numbers for precision
- Metallic, industrial color scheme

#### Mechanics

| Element | Details |
|---------|---------|
| **Combination Length** | 3 numbers (e.g., 72 - 31 - 85) |
| **Dial Range** | 0-99 (100 positions) |
| **Rotation Control** | Click and drag horizontally to rotate |
| **Direction Pattern** | RIGHT to first number → LEFT to second → RIGHT to third |
| **Sensitivity** | Dial is intentionally sensitive; small mouse movements = significant rotation |
| **Overshoot Penalty** | Must rotate all the way back around (no reversing mid-number) |
| **Number Lock** | When correct number is reached with correct direction, brief visual confirmation appears |

#### The Overshoot Problem
This level's brilliance lies in the **precision vs. speed tradeoff**:
- Moving quickly risks overshooting the target number
- Moving slowly is safe but burns precious time
- Overshooting by even 1 number means rotating nearly 360° back around
- The Guide must communicate not just the target, but the **approach**:
  > "Okay, coming up on 72... 68... 69... 70... SLOW DOWN... 71... almost... STOP!"

#### Direction Confusion
The RIGHT-LEFT-RIGHT pattern creates natural confusion:
- After dialing right to find the first number, the Navigator must "switch gears" mentally
- Under pressure, "go left" can be misinterpreted
- The Guide must be extremely clear about direction changes

#### Sample Combinations
- 72 → 31 → 85
- 15 → 67 → 42
- 88 → 09 → 54

#### Communication Dynamics
- **Continuous feedback loop:** Unlike discrete clicks, dialing requires constant updates
- **Counting together:** "45... 46... 47... 48..."
- **Celebration and despair:** Successfully hitting a number feels amazing; overshooting feels devastating
- **Direction coaching:** "Now LEFT. The other left. Yes. Keep going left."

#### Win Condition
All 3 numbers entered in correct sequence with correct rotation directions.

#### Why This Level Works
- **Unique mechanic:** Rotation is different from clicking or dragging
- **Sustained tension:** No safe moments — every rotation matters
- **Skill ceiling:** Expert teams can dial quickly with confident communication
- **Satisfying payoff:** The vault door swinging open after the final number is cinematic

---

### Level 5: Laser Heist

**Theme:** Museum heist — threading through a laser security grid  
**Difficulty:** ★★★★☆  
**Estimated Duration:** 60-90 seconds  

#### Concept Overview
This level transforms the cursor into a thief navigating through a deadly laser security system. The Navigator must guide their cursor from the entry point to the exit without touching any laser beams. The twist: lasers move in predictable patterns, creating timing-based windows of opportunity.

#### Visual Design
- Dark museum/vault environment with dramatic red laser beams
- Entry point on one side, exit/goal on the opposite
- Laser beams arranged in multiple "zones" of increasing complexity
- Beams visibly sweep, rotate, or blink according to their patterns
- Cursor represented as a small, glowing "spy" dot
- Visible "safe path" hints (darker areas where lasers don't reach)

#### Laser Types

| Laser Type | Behavior | Challenge |
|------------|----------|-----------|
| **Static Beam** | Does not move; permanent obstacle | Route planning |
| **Sweeping Beam** | Rotates back and forth like a pendulum | Timing windows |
| **Blinking Beam** | Turns on/off at regular intervals | Rhythm recognition |
| **Gate Beam** | Two parallel beams that open and close alternately | Speed and commitment |

#### Level Layout — Three Zones

**Zone 1: The Lobby (Easy)**
- 2-3 static beams requiring simple navigation
- 1 slow sweeping beam with wide timing window
- Purpose: Introduce the mechanic gently

**Zone 2: The Gallery (Medium)**
- Mix of static and sweeping beams
- 2 blinking beams requiring rhythm recognition
- Narrower passages
- Purpose: Build complexity and confidence

**Zone 3: The Vault (Hard)**
- Dense laser grid with multiple sweeping beams
- Gate beam sequence requiring committed movement
- Final stretch to exit
- Purpose: Climactic challenge before the maze finale

#### Mechanics

| Element | Details |
|---------|---------|
| **Touch Penalty** | Instant teleport back to zone checkpoint + 3-second freeze |
| **Checkpoints** | Start of each zone (3 total) |
| **Cursor Size** | Small, forgiving hitbox — we want close calls, not frustration |
| **Laser Patterns** | Clearly telegraphed; Guide can predict timing |
| **Exit Trigger** | Reach the exit zone to complete the level |

#### Communication Dynamics
This level demands **continuous, real-time communication**:

> "Okay, stop there. There's a laser sweeping left to right above you... wait for it... it's passing... NOW GO! Straight up! STOP! Okay, another one coming... wait... NOW! Go right!"

**Key Communication Skills Tested:**
- **Timing calls:** "Wait... wait... NOW!"
- **Micro-directions:** "Tiny bit up... stop... tiny bit right... stop..."
- **Pattern recognition:** Guide must internalize laser rhythms and translate them to commands
- **Patience coaching:** Preventing the Navigator from rushing into danger

#### Why This Level Works
- **Visual spectacle:** Lasers are inherently cinematic and exciting
- **Timing introduces new skill:** Previous levels tested precision; this tests patience and rhythm
- **Heist fantasy:** Everyone wants to be a movie spy dodging lasers
- **Perfect pre-maze training:** Continuous cursor control prepares for Level 6
- **Checkpoint mercy:** Failures are punishing but not catastrophic
- **Spectator gasps:** Near-misses create audible crowd reactions

---

### Level 6: Maze Escape — The Grand Finale

**Theme:** Ultimate test of coordination — escape the labyrinth without touching the walls  
**Difficulty:** ★★★★★  
**Estimated Duration:** 90-150 seconds  

#### Visual Design
- Classic maze structure with clear start (green) and exit (red/gold)
- Walls rendered with high contrast against the path
- Path width varies: some sections generous, others nail-bitingly narrow
- Three visible checkpoint markers within the maze
- Subtle pulsing animation on the exit to draw the eye
- Minimalist design — no distractions, just pure navigation

#### Maze Structure

```
[START] ════════════════════╗
                            ║
    ╔════════════════╗      ║
    ║                ║      ║
    ║   [CHECKPOINT 1]      ║
    ║                ║      ║
    ╚═══╗    ╔═══════╝      ║
        ║    ║              ║
        ║    ║   ╔══════════╝
        ║    ║   ║
        ║    ╚═══╝
        ║         [CHECKPOINT 2]
        ║    ╔═══════════════╗
        ║    ║               ║
        ╚════╝               ║
                             ║
    [CHECKPOINT 3]           ║
                             ║
    ═══════════════════╗     ║
                       ║     ║
    ╔══════════════════╝     ║
    ║                        ║
    ║    [NARROW FINAL STRETCH - EXTREMELY TIGHT]
    ║                        ║
    ║                   [EXIT]
```

#### Mechanics

| Element | Details |
|---------|---------|
| **Wall Touch** | Triggers buzzer + 3-second freeze + returns to last checkpoint |
| **Checkpoints** | 3 throughout maze; auto-save progress |
| **Path Width** | Varies from comfortable (40px) to nerve-wracking (15px) |
| **Final Stretch** | Ultra-narrow corridor requiring perfect precision |
| **Exit Zone** | Generous finish area — reward for reaching it |

#### Passage Design Philosophy

**Wide Passages (Early Maze)**
- Allows Navigator to build confidence
- Guide can give general directions
- Purpose: Let the team find their rhythm

**Medium Passages (Mid Maze)**
- Requires more precise instructions
- "Left... little more... stop! Now up."
- Purpose: Test developing coordination

**Narrow Passages (Late Maze)**
- Pixel-perfect movement required
- "Tiny bit right... TINY... stop. Okay, now forward slowly..."
- Purpose: Create memorable tension

**The Final Stretch (Last 10% of Maze)**
- The narrowest corridor in the entire game
- Walls almost touching on both sides
- Purpose: Climactic final challenge; teams either nail it or agonize

#### Communication Dynamics
The maze demands **absolute focus** from both players:

**Guide's Challenge:**
- Must constantly track cursor position relative to walls
- Must anticipate upcoming turns and prepare Navigator
- Must stay calm when Navigator makes small errors
- Must provide continuous micro-adjustments in tight sections

**Navigator's Challenge:**
- Must trust Guide's instructions completely
- Must develop "feel" for mouse sensitivity
- Must resist urge to move when Guide says stop
- Must handle the psychological pressure of the final stretch

**Sample Dialogue:**
> "Okay, you're in a corridor going up. Keep going... keep going... STOP. Turn right. Good. Now this part gets narrow. Go slow. Tiny movements. Up a bit... more... STOP you're near the wall. Okay left, very slowly... yes... keep going... oh god this is tight... you're doing great... STOP! Wait. Okay forward... forward... YOU'RE OUT! GO GO GO!"

#### Win Condition
Navigator's cursor reaches the exit zone.

#### Why This Level Works
- **Climactic finale:** Everything has built to this moment
- **Pure skill test:** No tricks, no surprises — just coordination under pressure
- **Checkpoint mercy:** Players never lose everything, but still feel the sting of failure
- **The Final Stretch:** Creates a "boss fight" feeling without an actual enemy
- **Celebration potential:** Finishing feels like a genuine accomplishment
- **Spectator investment:** Audiences hold their breath during narrow passages

---

## Chaos Events — The Game Fights Back

Chaos events are the secret sauce that transforms Eyes OFF from a coordination test into an unforgettable experience. They trigger randomly during gameplay, disrupting carefully built communication patterns and forcing both players to adapt on the fly.

### Chaos Event Philosophy
1. **Disruptive but not destructive:** Events make things harder, never impossible
2. **Brief duration:** Long enough to matter, short enough to survive
3. **Escalating presence:** Early levels have fewer, milder events; later levels are chaos storms
4. **Spectator entertainment:** Events create visible drama for audiences

---

### Mouse Chaos Events

| Event | Description | Duration | Frustration Level | Visual Cue |
|-------|-------------|----------|-------------------|------------|
| **Pointer Glitch** | Cursor visually jitters and shakes randomly while actual position remains stable | 3-4 sec | ★★☆☆☆ Medium | Cursor flickers with static effect |
| **Sensitivity Spike** | Mouse becomes extremely sensitive; tiny movements cause huge cursor jumps | 4-5 sec | ★★★★☆ High | Cursor trails with motion blur |
| **Sensitivity Drop** | Mouse becomes sluggish; large movements produce minimal cursor movement | 4-5 sec | ★★☆☆☆ Medium | Cursor moves through "mud" effect |
| **Inverted Controls** | Mouse X and Y axes are flipped; up=down, left=right | 5-6 sec | ★★★★★ Very High | Screen edges flash with warning colors |
| **Ghost Cursors** | 2-3 fake cursors appear and mirror real cursor's movement with slight delay | 4 sec | ★★★★★ Very High | Multiple cursors visible simultaneously |

#### Mouse Chaos — Detailed Breakdown

**Pointer Glitch**
- The cursor appears to vibrate or shake erratically
- ACTUAL cursor position is unchanged — this is purely visual
- Creates doubt: "Am I actually where I think I am?"
- Guide must reassure Navigator: "It's just a glitch, your real position is fine"

**Sensitivity Spike**
- A tiny mouse movement sends the cursor flying across the screen
- Requires Navigator to make micro-movements (barely moving the mouse)
- Guide must warn: "STOP MOVING! Sensitivity spike! Only tiny movements!"
- Often causes accidental wall touches in maze or wire cuts in bomb level

**Sensitivity Drop**
- The opposite problem: Navigator moves mouse dramatically, cursor barely responds
- Requires exaggerated movements to make progress
- Creates frustration but rarely causes direct failures
- Guide must encourage: "Keep moving, it's slow but you're getting there"

**Inverted Controls**
- The most disorienting event
- Guide must completely flip their instructions: "Go up" now means move mouse DOWN
- Both players must mentally recalibrate in real-time
- Often leads to hilarious miscommunication
- WARNING: This event should never trigger during the final stretch of the maze

**Ghost Cursors**
- Multiple cursors appear, all moving similarly but with slight offsets
- Only ONE is real; the others are decoys
- Guide must track which cursor is actually the Navigator's
- Usually, the real cursor is the one that appeared first (subtle hint)
- Creates chaos: "Which one am I?!" "You're the one on the left... wait, they all moved..."

---

### Visual Chaos Events

| Event | Description | Duration | Frustration Level | Visual Cue |
|-------|-------------|----------|-------------------|------------|
| **Screen Shake** | Entire game screen vibrates rapidly | 3 sec | ★★☆☆☆ Medium | Obvious shaking effect |
| **Zoom Warp** | Screen suddenly zooms in or out dramatically | 2 sec | ★★☆☆☆ Medium | Jarring scale change |
| **Color Invert** | All colors on screen invert (negative filter) | 3 sec | ★★★☆☆ High | Negative color effect |
| **Static Burst** | TV static overlay covers portion of screen | 2 sec | ★★☆☆☆ Medium | Analog TV static |

#### Visual Chaos — Detailed Breakdown

**Screen Shake**
- The entire game interface vibrates rapidly
- Makes precise visual tracking difficult for Guide
- Guide may struggle to give accurate position information
- Duration is short enough to "ride out"

**Zoom Warp**
- Screen suddenly zooms in (disorienting) or out (elements become tiny)
- Zoom In: Cursor becomes huge, spatial awareness distorted
- Zoom Out: Everything shrinks, harder to see precise positions
- Snaps back to normal after duration

**Color Invert**
- All colors flip to their opposites
- Blue becomes orange, red becomes cyan, etc.
- Catastrophic for wire-cutting level: "Cut the red wire" — but which one IS red now?
- Guide must either remember original colors or quickly recalibrate
- This event should trigger infrequently on Level 3 (bomb) due to high impact

**Static Burst**
- Analog TV static overlay appears
- Partially obscures view but doesn't fully blind
- Creates "signal interference" aesthetic
- More atmospheric than mechanically challenging

---

### Chaos Event Frequency & Intensity by Level

| Level | Chaos Frequency | Available Events |
|-------|-----------------|------------------|
| **Level 1** | Every 18-22 seconds | Pointer Glitch, Screen Shake only |
| **Level 2** | Every 14-18 seconds | Pointer Glitch, Screen Shake, Zoom Warp, Static Burst |
| **Level 3** | Every 10-14 seconds | All events except Inverted Controls |
| **Level 4** | Every 8-12 seconds | All events |
| **Level 5** | Every 8-10 seconds | All events |
| **Level 6** | Every 6-10 seconds | All events (higher chance of severe events) |

### Chaos Event Spawn Rules
1. **Minimum gap:** At least 5 seconds between events
2. **Level transition immunity:** No events in first 3 seconds of any level
3. **Checkpoint immunity:** No events for 2 seconds after returning from checkpoint
4. **No stacking:** Only one chaos event can be active at a time
5. **Final stretch protection:** Inverted Controls should not trigger in Level 6's final narrow stretch (would be unfair)

---

## Difficulty Progression Matrix

| Level | Name | Primary Skill | Communication Type | Chaos Load | Estimated Time |
|-------|------|---------------|-------------------|------------|----------------|
| 1 | Digital Cleanup | Basic drag-drop | Directional (left/right/up/down) | Light | 30-45s |
| 2 | Password Panic | Precision clicking | Spelling + location | Medium | 45-75s |
| 3 | Bomb Defusal | Sequence memory | Color + position + path | Medium | 45-90s |
| 4 | Safe Cracker | Rotational precision | Counting + timing | Heavy | 60-120s |
| 5 | Laser Heist | Timing & patience | Rhythm + micro-direction | Heavy | 60-90s |
| 6 | Maze Escape | Sustained precision | Continuous micro-direction | Very Heavy | 90-150s |

### Skill Progression Philosophy
Each level builds on previous skills while introducing new challenges:

1. **Level 1:** Learn to communicate position → Learn to drag objects
2. **Level 2:** Apply position skills → Add clicking precision
3. **Level 3:** Apply clicking → Add sequence memory and ambiguous descriptions
4. **Level 4:** Introduce rotation → Add continuous communication
5. **Level 5:** Introduce timing windows → Add patience and rhythm
6. **Level 6:** Combine everything → Ultimate continuous precision test

---

## Level Transitions

Between each level, a brief transition screen appears:

**Duration:** 3 seconds (counts toward total time)

**Content:**
- Level name and number
- Brief tagline (e.g., "Level 4: Safe Cracker — Trust Your Partner's Count")
- Progress indicator (showing completed levels)

**Purpose:**
- Brief mental reset for both players
- Builds anticipation for next challenge
- Prevents jarring instant transitions

---

## Timer & Scoring System

### Timer Mechanics
- **Format:** MM:SS:mmm (Minutes : Seconds : Milliseconds)
- **Start:** Begins at "GO!" during countdown
- **End:** Stops when Navigator enters Level 6 exit zone
- **Continuous:** Timer never pauses, even during transitions
- **Penalties:** Added directly to running time

### Penalty Summary

| Event | Penalty |
|-------|---------|
| Wrong wire cut (Level 3) | +5.000 seconds |
| Wall touch in maze (Level 6) | +3.000 seconds freeze (time passes) |
| Laser touch (Level 5) | +3.000 seconds freeze (time passes) |

### Score Display
- Always visible in corner of screen during gameplay
- Large, clear font for spectator visibility
- Flashes briefly when penalties are added

---

## Leaderboard System

### Data Tracked
- **Team Name:** As entered during registration
- **Total Time:** Final time in MM:SS:mmm format
- **Date:** Timestamp of completion

### Display Format
```
╔══════════════════════════════════════════════════════════════╗
║                    🏆 LEADERBOARD 🏆                         ║
╠══════╦══════════════════════════╦════════════════════════════╣
║ RANK ║ TEAM NAME                ║ TIME                       ║
╠══════╬══════════════════════════╬════════════════════════════╣
║  1   ║ BlindFaithers           ║ 03:42:127                   ║
║  2   ║ TrustFall               ║ 03:58:891                   ║
║  3   ║ NoEyeDeer               ║ 04:15:044                   ║
║  4   ║ SightUnseen             ║ 04:23:562                   ║
║  5   ║ BatSignal               ║ 04:31:718                   ║
║ ...  ║ ...                      ║ ...                        ║
╚══════╩══════════════════════════╩════════════════════════════╝
```

### Leaderboard Rules
- Top 10 (or 20) displayed publicly
- All completions stored in database
- Ties broken by earlier completion timestamp
- Leaderboard updates in real-time
- Optional: Display during idle/attract mode

---

## Results Screen

After completing all 6 levels, players see:

### Immediate Results
- **Final Time:** Large, prominent display
- **Leaderboard Position:** "You placed #X out of Y teams!"
- **Time Breakdown:** Per-level times shown

```
╔════════════════════════════════════════════════════════════╗
║                    🎉 COMPLETED! 🎉                        ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║              FINAL TIME: 04:23:562                         ║
║                                                            ║
║              🏆 RANK: #4 of 47 teams                       ║
║                                                            ║
╠════════════════════════════════════════════════════════════╣
║                     LEVEL BREAKDOWN                        ║
╠═════════════════════════════════╦══════════════════════════╣
║ Level 1: Digital Cleanup        ║ 00:38:221                ║
║ Level 2: Password Panic         ║ 00:52:104                ║
║ Level 3: Bomb Defusal           ║ 01:01:447                ║
║ Level 4: Safe Cracker           ║ 00:49:892                ║
║ Level 5: Laser Heist            ║ 00:58:331                ║
║ Level 6: Maze Escape            ║ 00:43:567                ║
╚═════════════════════════════════╩══════════════════════════╝
║                                                            ║
║        [VIEW LEADERBOARD]      [PLAY AGAIN]      [EXIT]    ║
╚════════════════════════════════════════════════════════════╝
```

---

## Technical Specifications

### Target Platform
- **Primary:** Modern web browsers (Chrome, Firefox, Edge, Safari)
- **Display:** Optimized for 1920×1080 resolution
- **Input:** USB/wireless mouse with standard sensitivity
- **Feedback:** Visual feedback only (no audio)

### Framework Recommendations
- **Rendering:** HTML5 Canvas or WebGL (Pixi.js recommended)
- **Framework:** Vanilla JS or lightweight framework (Phaser.js for games)
- **State Management:** Simple state machine for game flow
- **Timing:** requestAnimationFrame for smooth updates; performance.now() for precise timing

### Performance Targets
- **Frame Rate:** 60 FPS minimum
- **Input Latency:** < 16ms mouse-to-cursor response
- **Load Time:** < 3 seconds for all assets

### Accessibility Considerations
- **High Contrast Mode:** Option for visually impaired Guides
- **Colorblind Mode:** Alternative wire colors using patterns/labels
- **Visual Cues:** Clear visual feedback for all important events
- **Font Sizing:** Large, readable fonts throughout

### Anti-Cheat Considerations
- **Blindfold verification:** Prompt Guide to confirm Navigator is blindfolded
- **Event staff presence:** Game designed for monitored play at technical fest
- **No keyboard shortcuts:** All navigation requires mouse; no keyboard cheats possible
- **Server-side timing:** Time validation on server to prevent client manipulation

---

## Spectator Experience Design

Eyes OFF is designed to be entertaining for audiences, not just players.

### Why Spectators Matter
- Technical fests draw crowds
- Watching skilled teams creates excitement
- Watching struggling teams creates humor
- Word-of-mouth drives participation

### Spectator-Friendly Features
1. **Large UI elements:** Visible from a distance
2. **Clear visual feedback:** Audiences can understand what's happening
3. **Verbal dialogue:** The shouted instructions ARE the entertainment
4. **Dramatic moments:** Chaos events create visible drama
5. **Leaderboard display:** Shows competition context

### Recommended Setup
- Large monitor or projected display
- Clear viewing area for audience

---

## Summary — What Makes Eyes OFF Special

### Core Experience Pillars

1. **Communication Breakdown Comedy**  
   Simple instructions become hilariously complex under pressure. "Go left... no, YOUR left... no wait, MY left is your left..."

2. **Trust Under Fire**  
   The Navigator must surrender control to their partner. This vulnerability creates genuine bonding moments.

3. **Chaos as Character**  
   The game itself becomes an adversary. Random events transform every playthrough into a unique story.

4. **Accessible Skill Ceiling**  
   Easy to understand, difficult to master. New teams can complete it; expert teams can achieve incredible times.

5. **Spectator Sport Potential**  
   The visible struggle, the shouted instructions, the near-misses — it's entertainment for everyone watching.

### Design Philosophy
Eyes OFF succeeds when players walk away with a story to tell. Whether it's the time they perfectly navigated the laser grid, or the time inverted controls made them cut the wrong wire five times in a row — every playthrough should create memories.

The game is hard enough to challenge, fair enough to complete, and chaotic enough to be unforgettable.

---

## 🎭 Optional Bonus Levels — "Trust Issues" Mode

### Philosophy: Why Bonus Levels?

The core 6 levels of Eyes OFF test coordination, communication, and precision. But what if the game itself was actively trying to deceive you? What if the floor beneath your cursor was a lie? What if the exit was a trap?

Enter **Trust Issues Mode** — a collection of optional bonus levels inspired by the cruel genius of **Level Devil** and the unforgiving simplicity of **Flappy Bird**. These levels transform Eyes OFF from a coordination challenge into a psychological warfare simulator where the game becomes the third player... and it's playing against you.

**Design Mantra:** "The game is lying. The Guide must learn the lies. The Navigator must trust the liar."

### How Bonus Levels Work

| Aspect | Details |
|--------|---------|
| **Unlock Condition** | Complete all 6 main levels (any time) |
| **Availability** | Separate "Bonus Mode" on main menu |
| **Scoring** | Separate leaderboard for bonus completion |
| **Difficulty** | Significantly harder than main game |
| **Deaths/Failures** | Instant respawn; counted but no timer penalty |
| **Completion** | Reach exit of each bonus level |

### Bonus Level Progression

```
[BONUS MODE MENU]
      │
      ├──► [Bonus 1: Flappy Chaos] ─── Unlocked by default
      │
      ├──► [Bonus 2: Trust Issues] ─── Unlocked after Bonus 1
      │
      ├──► [Bonus 3: Gravity Gauntlet] ─── Unlocked after Bonus 2
      │
      └──► [Bonus 4: The Troll Maze] ─── Unlocked after Bonus 3 (Final Challenge)
```

---

### Bonus Level 1: Flappy Chaos

**Inspiration:** Flappy Bird  
**Core Mechanic:** Continuous auto-scrolling with click-to-rise controls  
**Difficulty:** ★★★★☆  
**Estimated Attempts:** 5-15 before completion  

#### Concept Overview

The cursor transforms into a small bird/object that constantly falls due to "gravity." Clicking the mouse makes it rise. The screen auto-scrolls horizontally, pushing obstacles toward the player. Navigate through gaps without touching anything.

**The Twist for Eyes OFF:** The Navigator can't see where the gaps are. The Guide must call out the rhythm of clicks needed to thread through each obstacle.

#### Visual Design

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│    ████████                              ████████              │
│    ████████                              ████████              │
│    ████████         ◉ ←(cursor/bird)     ████████              │
│    ████████                              ████████              │
│                                                                │
│                     ████████                                   │
│    ████████         ████████                      ████████     │
│    ████████         ████████                      ████████     │
│    ████████         ████████                      ████████     │
│                                                                │
│    ──────────────────────────────────────────────────────►     │
│                      SCROLLING DIRECTION                       │
└────────────────────────────────────────────────────────────────┘
```

- Side-scrolling 2D environment
- Pipes/obstacles with gaps of varying heights
- Bird/cursor represented as a small glowing orb
- Clear visual distinction between safe space and obstacles
- Distance counter showing progress

#### Mechanics

| Element | Details |
|---------|---------|
| **Gravity** | Cursor falls at constant rate when not clicking |
| **Click Action** | Each click gives upward boost (like Flappy Bird) |
| **Scroll Speed** | Constant; cannot be paused or slowed |
| **Gap Size** | Generous at start, progressively narrower |
| **Collision** | Any touch = instant death + restart from beginning |
| **Level Length** | 15-20 obstacles to pass |
| **Win Condition** | Reach the end without dying |

#### Communication Dynamics

This level creates a unique rhythm-based communication challenge:

**Guide's Role:**
- Must anticipate upcoming gaps and prepare Navigator
- Calls out click timing: "Click... click... HOLD... click click click... wait... click..."
- Must judge Navigator's current height vs. upcoming gap position
- Develops shorthand: "Double tap!" "Coast down!" "Rapid fire!"

**Navigator's Role:**
- Must internalize the click-to-rise, release-to-fall rhythm
- Trusts Guide's timing completely
- Cannot hesitate — the screen keeps moving regardless

**Sample Dialogue:**
> "Okay, coast down... keep falling... falling... NOW CLICK! Again! Good, you're through. Coast... coast... upcoming gap is HIGH, start clicking NOW! Click click click! Hold! You're too high, stop clicking! Fall... fall... CLICK! Perfect!"

#### Why This Level Works

1. **Rhythm over precision:** Tests a completely different skill than main levels
2. **Instant death tension:** Every obstacle could end the run
3. **Spectator excitement:** Audiences can see the upcoming doom
4. **Communication innovation:** Guide develops musical/rhythmic callouts
5. **Replayability:** Random gap patterns keep it fresh
6. **Satisfying mastery:** Successfully threading gaps feels incredible

#### Chaos Events (Modified for Flappy)

| Event | Effect | Duration |
|-------|--------|----------|
| **Gravity Flip** | Cursor now rises by default, clicking makes it fall | 4 sec |
| **Speed Surge** | Scroll speed doubles temporarily | 3 sec |
| **Ghost Pipes** | Fake translucent obstacles appear (pass through safely) | 5 sec |
| **Sticky Click** | Each click gives MORE lift than normal | 3 sec |

---

### Bonus Level 2: Trust Issues

**Inspiration:** Level Devil  
**Core Mechanic:** Deceptive platformer where nothing is what it seems  
**Difficulty:** ★★★★★  
**Estimated Attempts:** 10-30 before completion  

#### Concept Overview

A seemingly simple path from start to exit... except the game is lying. Floors vanish. Safe platforms are traps. The exit might be fake. Spikes appear from nowhere. The entire level is designed to betray expectations and punish assumptions.

**The Eyes OFF Twist:** The Guide can see some trap telegraphs (subtle visual hints), but many traps only activate when triggered. The Guide must LEARN the level through the Navigator's deaths, building a mental map of "safe" paths.

**Core Philosophy:** Every death teaches something. Every lesson must be communicated.

#### Visual Design

```
WHAT IT LOOKS LIKE:                    WHAT IT ACTUALLY IS:
┌─────────────────────────┐            ┌─────────────────────────┐
│                         │            │                         │
│  [START]                │            │  [START]                │
│     │                   │            │     │                   │
│     ▼                   │            │     ▼                   │
│  ═══════════            │            │  ═══╳╳╳╳╳═══            │ (floor vanishes)
│           │             │            │           │             │
│           ▼             │            │           ▼             │
│        ═══════════      │            │        ═══════════      │
│                  │      │            │        ▲▲▲▲▲▲▲▲▲▲      │ (spikes pop up)
│                  ▼      │            │                  │      │
│              [EXIT]     │            │              [FAKE]     │ (fake exit = death)
│                         │            │     [REAL EXIT]←hidden │
└─────────────────────────┘            └─────────────────────────┘
```

- Clean, innocent-looking 2D platformer aesthetic
- Solid-looking platforms that may or may not be real
- Multiple paths, most of which are traps
- The cursor acts as a character that must navigate platforms
- Click to jump, hold direction to move

#### Trap Types — The Arsenal of Deception

| Trap | Appearance | Reality | Telegraph (for Guide) |
|------|------------|---------|----------------------|
| **Vanishing Floor** | Solid platform | Disappears when cursor touches it | Subtle shimmer effect (barely visible) |
| **Pop-Up Spikes** | Safe floor | Spikes emerge from floor after 0.5s of standing | Tiny dots on surface |
| **Fake Exit** | Door identical to real exit | Kills instantly when entered | Very slight color difference |
| **Ceiling Crusher** | Normal ceiling | Drops down when cursor passes underneath | Hairline crack texture |
| **Reverse Platform** | Solid platform | Only solid when cursor is NOT on it; touching makes it vanish | Inverted shadow |
| **Bait Coin** | Collectible coin/gem | Triggers trap when collected | Pulsing slightly too fast |
| **Lying Arrow** | Helpful direction sign | Points toward death | Arrow color slightly off |
| **Delayed Death Zone** | Empty space | Kills cursor 1 second after entering | Very faint red tint |
| **Safe-Looking Pit** | Short pit, looks jumpable | Much deeper than it appears | Bottom is oddly dark |

#### Mechanics

| Element | Details |
|---------|---------|
| **Movement** | Cursor moves with mouse; click to jump |
| **Death** | Instant respawn at level start |
| **Death Counter** | Visible counter showing attempts |
| **Trap Activation** | Most traps activate on proximity/touch |
| **Trap Memory** | Traps reset on death; Guide must remember |
| **Level Structure** | 3-4 "rooms" with checkpoint after each |
| **Win Condition** | Reach the REAL exit |

#### The Learning Loop

This level is designed around **iterative failure**:

```
[ATTEMPT 1]
Navigator walks forward → Floor vanishes → Death
Guide learns: "That floor is fake"

[ATTEMPT 2]  
Guide: "Jump over that first platform, it's fake"
Navigator jumps → Lands on second platform → Spikes pop up → Death
Guide learns: "Don't stand on the second platform"

[ATTEMPT 3]
Guide: "Jump over first, then IMMEDIATELY jump again from second"
Navigator double-jumps → Lands on third → Reaches door → Fake exit → Death
Guide learns: "That's a fake exit, need to find the real one"

[ATTEMPT 4...]
```

#### Communication Dynamics

**Guide's Evolution:**
1. **First attempts:** Discovers traps through Navigator's deaths
2. **Middle attempts:** Builds mental map; gives specific warnings
3. **Late attempts:** Has memorized safe path; gives confident instructions
4. **Success:** Flawless navigation through memorized route

**Navigator's Trust Test:**
- Must believe Guide's increasingly specific warnings
- "Don't touch that platform" sounds paranoid until you've died 5 times
- Develops faith that Guide has learned from their shared failures

**Sample Dialogue (Attempt 7):**
> "Okay, I've learned this room. Jump over the first platform — it's a trap. Land on the second but IMMEDIATELY jump, spikes come up. Third platform is safe. NOW STOP. See the exit on the right? That's fake. The real exit is hidden in the LEFT wall. Go left, there's an invisible passage."

#### Room Concepts

**Room 1: The Welcoming Lie**
- Looks like a simple straight path
- First platform vanishes
- Second platform has delayed spikes
- Introduction to "nothing is safe"

**Room 2: The False Choice**
- Two paths: left looks dangerous (spikes visible), right looks safe
- Right path has invisible death zones
- Left path's "spikes" are actually decorative (safe to walk on)
- Lesson: The obvious safe route is the trap

**Room 3: The Ceiling Will Betray You**
- Long corridor with low ceiling
- Random ceiling sections drop as crusher traps
- Guide must remember which sections are safe
- Some sections drop ONLY on second pass (return trip)

**Room 4: The Exit Paradox**
- Four visible exits in the final room
- Three are fake (instant death)
- One is real but hidden behind a fake wall
- Guide must discover through elimination (or notice subtle visual tells)

#### Why This Level Works

1. **Subverted expectations:** Punishes gaming instincts; rewards paranoia
2. **Shared learning:** Deaths become collaborative lessons
3. **Guide mastery:** Creates expert-level knowledge accumulation
4. **Dark humor:** Deaths become increasingly funny as patterns emerge
5. **Triumph payoff:** Finally beating it after 20 deaths feels EARNED
6. **Spectator engagement:** Audience sees traps coming; gasps at each death

---

### Bonus Level 3: Gravity Gauntlet

**Inspiration:** Level Devil gravity mechanics + orientation puzzles  
**Core Mechanic:** Gravity shifts unpredictably, flipping the entire world  
**Difficulty:** ★★★★★  
**Estimated Attempts:** 8-20 before completion  

#### Concept Overview

Navigate through a vertical obstacle course... but gravity doesn't stay in one direction. At trigger points throughout the level, gravity flips — up becomes down, the "ceiling" becomes the "floor," and all your spatial references invert instantly.

**The Eyes OFF Twist:** When gravity flips, the Guide's entire descriptive vocabulary must invert. "Go up" becomes wrong; "go toward what WAS the ceiling" becomes necessary. Both players must rapidly rebuild their shared spatial language.

#### Visual Design

```
GRAVITY: NORMAL                         GRAVITY: FLIPPED
┌─────────────────────────┐            ┌─────────────────────────┐
│        [CEILING]        │            │  ▲▲▲ [NOW THE FLOOR]    │
│                         │            │        ◉ (cursor)       │
│     ◉ (cursor)          │            │                         │
│   ══════════            │            │   ══════════            │
│                         │            │                         │
│        ══════════       │            │        ══════════       │
│                         │            │                         │
│  ▲▲▲ [FLOOR W/SPIKES]   │            │      [NOW CEILING]      │
└─────────────────────────┘            └─────────────────────────┘

Cursor falls DOWN                      Cursor falls UP
```

- Vertical tower structure
- Platforms, spikes, and obstacles on BOTH floor and ceiling
- Gravity flip trigger zones (visually marked with swirling portals)
- Clear visual indication when gravity state changes (screen briefly rotates)
- Cursor represented as a character affected by current gravity

#### Gravity Mechanics

| Element | Details |
|---------|---------|
| **Normal Gravity** | Cursor falls downward; "floor" is at bottom |
| **Flipped Gravity** | Cursor falls upward; "ceiling" becomes floor |
| **Flip Trigger** | Passing through portal zones instantly flips gravity |
| **Flip Transition** | Brief 0.5s animation showing world rotation |
| **Jump Direction** | Always "away from current floor" (up when normal, down when flipped) |
| **Hazard Positions** | Spikes and traps placed on BOTH surfaces |

#### Level Structure

**Section 1: Gentle Introduction**
- Platforms with spikes only on bottom surface
- One gravity flip partway through
- After flip, those same platforms now have spikes "above" (from cursor's new perspective)
- Teaches: Flipping changes which hazards matter

**Section 2: Flip Timing**
- Multiple flip zones in sequence
- Some platforms only safe in ONE gravity state
- Requires intentional flipping at right moments
- Teaches: Gravity flips can be strategic, not just disorienting

**Section 3: The Alternator**
- Rapid flip zone sequence (flip-flip-flip-flip)
- Must maintain orientation through multiple rapid inversions
- Guide must track "are we normal or flipped?" constantly
- Teaches: Mental flexibility under pressure

**Section 4: The Choice**
- Fork in path; one route requires normal gravity, one requires flipped
- Wrong choice = long backtrack and re-flip
- Guide must read ahead and choose optimal route
- Teaches: Planning across gravity states

**Section 5: The Finale**
- Complex platforming sequence requiring 6-7 gravity flips
- Some flips are mandatory (in the path), some are optional (shortcuts)
- Hazards on both surfaces throughout
- Exit only accessible in specific gravity state

#### Communication Dynamics

**The Language Problem:**
- Standard directions ("up," "down," "above," "below") break when gravity flips
- Teams must develop flip-aware vocabulary:
  - "Toward the CURRENT floor" vs. "toward the ORIGINAL floor"
  - "With gravity" vs. "against gravity"
  - "Ceiling-ward" / "Ground-ward" (relative to original orientation)

**Guide's Challenge:**
- Must track current gravity state at all times
- Must translate hazard positions for current orientation
- "There are spikes above you" — but are they dangerous right now?
- Must prepare Navigator for upcoming flips

**Navigator's Challenge:**
- Must rebuild spatial model after each flip
- "Jump" changes direction; must trust Guide's flip-state awareness
- Cannot rely on muscle memory for direction

**Sample Dialogue:**
> "Okay, gravity is normal. Move right, jump over the pit... good. See that swirly portal thing? I mean, I see it, you don't. Anyway, go through it — gravity will flip. Ready? Go through NOW. [FLIP HAPPENS] Okay! Gravity is flipped! You're falling UP now. There's a platform above you — I mean, it's your new floor. Land on it. The spikes that were on the ceiling are now below you, so don't fall off the right side..."

#### Gravity Flip Chaos Events

| Event | Effect | Cruelty Level |
|-------|--------|---------------|
| **Stealth Flip** | Gravity flips without visual warning | High |
| **Double Flip** | Two instant consecutive flips (net: no change, but disorienting) | Medium |
| **Sticky Gravity** | Flip zones temporarily disabled; must find alternate route | Medium |
| **Oscillation** | Gravity rapidly alternates for 3 seconds | Very High |

#### Why This Level Works

1. **Spatial disorientation:** Challenges fundamental navigation assumptions
2. **Language breakdown:** Forces creative communication solutions
3. **Strategic depth:** Flips become tools, not just obstacles
4. **Shared confusion:** Both players experience disorientation together
5. **Memorable moments:** "Wait, which way is down again?!" becomes recurring panic
6. **Mastery arc:** Early chaos gives way to confident flip-state tracking

---

### Bonus Level 4: The Troll Maze — Ultimate Challenge

**Inspiration:** Level Devil's cruelest design + classic maze frustration  
**Core Mechanic:** A maze where the walls themselves are deceptive and actively malicious  
**Difficulty:** ★★★★★★ (Yes, six stars)  
**Estimated Attempts:** 15-40+ before completion  

#### Concept Overview

This is the final bonus level — the ultimate test of trust, communication, and perseverance. It's a maze like Level 6 of the main game, but the maze is ALIVE with deception. Walls move. Paths that existed moments ago vanish. Dead ends that looked permanent suddenly open. The exit relocates. Nothing stays true.

**The Eyes OFF Twist:** The Guide must navigate a maze that keeps lying to them, while the Navigator can't see the lies at all. The Guide must communicate not just "where to go" but "what used to be there" and "what might change."

**Design Philosophy:** "The maze remembers your path and changes to spite you."

#### Visual Design

```
[INITIAL STATE]                        [AFTER NAVIGATOR PASSES POINT A]
┌─────────────────────────┐            ┌─────────────────────────┐
│ ◉ ══════════╗           │            │ ◉ ══════════╗           │
│             ║           │            │      ║      ║           │
│   ╔═════════╝   ═══╗    │            │   ╔══╩══════╝   ═══╗    │
│   ║               A║    │            │   ║               A║    │
│   ║   ═══════╗     ║    │            │   ║   ════════════ ║    │
│   ║          ║     ║    │            │   ║          ║     ║    │
│   ╚══════════╝     ║    │            │   ╚══════════╝     ║    │
│                    ║    │            │         ▲          ║    │
│   ════════════════ ║    │            │   ══════║═════════ ║    │
│                [EXIT]   │            │         ║     [EXIT]    │
└─────────────────────────┘            └─────────────────────────┘
                                       
                                       (Walls shifted! New path and blocks appeared!)
```

- Classic maze aesthetic with thick, visible walls
- Walls that occasionally "shimmer" to indicate instability
- Exit door visible but frequently blocked or relocated
- Breadcrumb trail showing Navigator's path (fades over time)
- Warning indicators before major shifts

#### Maze Deception Types

| Deception | Behavior | Trigger |
|-----------|----------|---------|
| **Closing Wall** | Open passage slams shut after cursor passes | Proximity + delay |
| **Opening Wall** | Solid wall suddenly dissolves, revealing new path | Time-based |
| **Rotating Section** | 3×3 section of maze rotates 90°, changing all connections | Cursor enters section |
| **The Follower** | A wall segment slowly chases cursor through maze | Constant slow pursuit |
| **Path Swap** | Two paths exchange open/closed states simultaneously | Random timer |
| **Exit Relocation** | Exit door moves to new position in maze | Cursor gets within 3 squares |
| **Fake Checkpoint** | Looks like checkpoint; actually resets more progress | Touching it |
| **Memory Wipe** | Breadcrumb trail suddenly erases; Guide loses path reference | Random |
| **Shortcut Trap** | Wall opens revealing "shortcut"; it's actually a dead-end trap | Navigator approaches |
| **The Betrayal** | A section Guide has confirmed as safe suddenly becomes deadly | Repeated safe passage |

#### Mechanics

| Element | Details |
|---------|---------|
| **Wall Touch** | Death + return to last REAL checkpoint |
| **Real Checkpoints** | 3 in maze; visually distinct from fakes (subtle tells) |
| **Maze Changes** | Occur every 10-15 seconds OR triggered by position |
| **Exit Behavior** | Relocates twice before staying fixed |
| **The Follower** | Slow but persistent; blocks retreat paths |
| **Win Condition** | Reach the (finally stationary) exit |

#### The Follower — Special Mechanic

A unique hazard that adds urgency to the maze:

- A solid wall segment that slowly moves toward the cursor
- Speed: About 1/3 of comfortable cursor movement speed
- Cannot be stopped, cannot be destroyed
- If it touches cursor = death
- If it blocks the path to exit = must find alternate route
- Creates soft time pressure without explicit timer

**Communication Impact:**
> "Okay, the Follower is coming from behind you. You have maybe 15 seconds before it blocks the left path. We need to move NOW, but carefully — don't hit the walls."

#### Communication Dynamics

**The Evolving Map:**
- Guide must track not just current state but HISTORY of changes
- "That path was open before but it closed behind you"
- "There's a new path on the left that wasn't there 10 seconds ago"
- Must communicate uncertainty: "I THINK this path is stable, but..."

**Dealing with Exit Relocation:**
> "Okay, I see the exit in the bottom-right... wait, you got close and it MOVED. It's now in the top-left. Okay, recalculating... wait, that path we came from is closed now. We need to find another way."

**Trust at Maximum:**
- Navigator must believe Guide's increasingly strange reports
- "The wall is literally following us" sounds unhinged
- "The exit teleported" sounds like a bad excuse
- But it's all true, and survival depends on trust

**Sample Dialogue (Mid-Attempt):**
> "Stop. STOP. The wall behind you just closed. We can't go back anymore. The Follower is coming from the left, so we HAVE to go right. But last time we went right, there was a dead end — let me check... okay, a new path opened up! Go right, then immediate left. Watch the walls, they're tight here. Good, keep going... OH NO the exit moved again! It's behind us now but we CAN'T go back because of the Follower! There has to be another path... THERE! Wall on your right just opened! Go go go!"

#### Psychological Design

This level is designed to test mental endurance:

1. **Learned helplessness:** Early attempts feel impossible
2. **Pattern recognition:** Changes follow rules; expert Guides learn them
3. **Adaptation:** Teams develop communication shortcuts for common situations
4. **Perseverance:** Completion requires refusing to quit
5. **Triumph:** Finally winning feels like defeating a malevolent entity

#### Why This Level Works (And Why It's Last)

1. **Ultimate culmination:** Every skill learned across all levels is required
2. **Unfair but beatable:** Feels impossible until you learn the patterns
3. **Shared adversity:** Both players united against the maze's cruelty
4. **Story potential:** "Remember when the exit teleported THREE times?"
5. **Bragging rights:** Completing this is a genuine achievement
6. **Spectator drama:** Audience watches the maze betray players in real-time

---

## Bonus Mode — Scoring & Leaderboard

### Bonus Mode Metrics

| Metric | Details |
|--------|---------|
| **Completion Time** | Total time to complete all 4 bonus levels |
| **Death Counter** | Total deaths across all bonus levels |
| **Best Attempt** | Lowest death count for a full completion |

### Bonus Leaderboard Display

```
╔══════════════════════════════════════════════════════════════════╗
║               🏆 BONUS MODE LEADERBOARD 🏆                       ║
╠══════╦══════════════════════╦═══════════════╦════════════════════╣
║ RANK ║ TEAM NAME            ║ TIME          ║ DEATHS             ║
╠══════╬══════════════════════╬═══════════════╬════════════════════╣
║  1   ║ TrollSlayers         ║ 08:42:331     ║ 47                 ║
║  2   ║ DeathWishers         ║ 09:15:892     ║ 52                 ║
║  3   ║ NeverGiveUp          ║ 10:33:104     ║ 68                 ║
║ ...  ║ ...                  ║ ...           ║ ...                ║
╚══════╩══════════════════════╩═══════════════╩════════════════════╝
```

### Achievement Badges (Optional)

| Badge | Requirement | Rarity |
|-------|-------------|--------|
| **Flappy Master** | Beat Bonus 1 in under 60 seconds | Uncommon |
| **Trust Verified** | Beat Bonus 2 with under 15 deaths | Rare |
| **Gravity Defier** | Beat Bonus 3 without using any optional flip zones | Very Rare |
| **Maze Conqueror** | Beat Bonus 4 with under 25 deaths | Legendary |
| **Deathless Run** | Beat any bonus level without dying | Mythic |
| **Completionist** | Beat all bonus levels | Epic |

---

## Bonus Levels — Design Summary

| Level | Core Challenge | Key Skill | Spectator Appeal |
|-------|---------------|-----------|------------------|
| **Flappy Chaos** | Rhythm + timing | Click coordination | Watching near-misses |
| **Trust Issues** | Learning through death | Memory + communication | Laughing at repeated deaths |
| **Gravity Gauntlet** | Spatial adaptation | Orientation flexibility | "Which way is down?!" moments |
| **The Troll Maze** | Everything at once | Perseverance | The maze actively betraying players |

### Why Include Bonus Levels?

1. **Extended content:** Gives completionists more to do
2. **Difficulty scaling:** Hardcore players get their challenge
3. **Meme potential:** "Trust Issues" becomes a reference point
4. **Technical fest appeal:** Creates memorable moments for spectators
5. **Replayability:** Separate leaderboard encourages return plays
6. **Marketing hook:** "Can you beat the Troll Maze?" is compelling

---

## Appendix: Sample Playthrough Timeline

**00:00** — Timer starts  
**00:38** — Level 1 complete (files cleaned)  
**00:41** — Level 2 begins  
*00:55 — Chaos: Pointer Glitch (3s)*  
**01:33** — Level 2 complete (password entered)  
**01:36** — Level 3 begins  
*01:48 — Chaos: Color Invert (3s) — "WHICH RED?!"*  
*02:01 — Wrong wire — +5s penalty*  
**02:37** — Level 3 complete (bomb defused)  
**02:40** — Level 4 begins  
*02:58 — Chaos: Sensitivity Spike — overshoot number 2*  
**03:29** — Level 4 complete (safe opened)  
**03:32** — Level 5 begins  
*03:45 — Chaos: Ghost Cursors — confusion ensues*  
*03:58 — Laser touch — +3s freeze*  
**04:22** — Level 5 complete (lasers cleared)  
**04:25** — Level 6 begins  
*04:38 — Wall touch — +3s freeze, back to checkpoint*  
*04:55 — Chaos: Inverted Controls — chaos ensues*  
*05:12 — Wall touch — +3s freeze*  
**05:47** — LEVEL 6 COMPLETE — MAZE ESCAPED!

**FINAL TIME: 05:47:331**

---

## Appendix: Bonus Mode Sample Playthrough

*(A typical first successful Bonus Mode completion)*

### Bonus 1: Flappy Chaos
**Attempt 1:** Crash at obstacle 3 (too slow to react)  
**Attempt 2:** Crash at obstacle 7 (gravity flip chaos event)  
**Attempt 3:** Crash at obstacle 12 (overcompensated)  
**Attempt 4:** Crash at obstacle 18 (so close!)  
**Attempt 5:** SUCCESS — **00:52:441** (5 deaths)

### Bonus 2: Trust Issues
**Attempts 1-3:** Die to vanishing floor in Room 1  
**Attempt 4:** Die to spike trap in Room 2  
**Attempts 5-8:** Die to various Room 2 traps (learning process)  
**Attempt 9:** Die to ceiling crusher in Room 3  
**Attempts 10-14:** Die to fake exits in Room 4  
**Attempt 15:** SUCCESS — **02:34:892** (15 deaths)

### Bonus 3: Gravity Gauntlet
**Attempts 1-2:** Complete disorientation; die immediately after first flip  
**Attempts 3-5:** Learn flip timing; die in The Alternator section  
**Attempts 6-8:** Die in The Choice section (wrong gravity state)  
**Attempt 9:** Die in finale (6th flip confusion)  
**Attempt 10:** SUCCESS — **01:48:227** (10 deaths)

### Bonus 4: The Troll Maze
**Attempts 1-5:** Die to various closing walls; learn basic patterns  
**Attempts 6-10:** Die to The Follower blocking retreat paths  
**Attempts 11-15:** Die to exit relocation (THREE times!)  
**Attempts 16-19:** Die to fake checkpoint (cruel)  
**Attempt 20:** Die to Betrayal trap (a "safe" path suddenly deadly)  
**Attempts 21-26:** Progressive improvement; dying later each time  
**Attempt 27:** SUCCESS — **04:12:558** (27 deaths)

### Bonus Mode Summary
**Total Time:** 09:28:118  
**Total Deaths:** 57  
**Leaderboard Position:** #12 of 31 completions

---

## Document Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Initial | Core 6 levels, chaos events, leaderboard system |
| 2.0 | Current | Added 4 optional bonus levels (Trust Issues Mode) |

---

*Document Version: 2.0*  
*Eyes OFF — Where Trust Meets Chaos*  
*"The game is lying. Trust your partner anyway."*
