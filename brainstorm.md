# Eyes OFF - Game Design Document

## Overview

**Eyes OFF** is a two-player cooperative web game designed for college technical fests. It tests communication, trust, and coordination between teammates under pressure.

### Player Roles

| Role | Can See Screen? | Controls | Responsibility |
|------|-----------------|----------|----------------|
| **Navigator** | No (Blindfolded) | Mouse | Execute actions based on verbal instructions |
| **Guide** | Yes | Voice only | Provide clear, real-time directions to Navigator |

### Core Objective
Complete all 6 levels as fast as possible. Total time is recorded on a leaderboard in minutes, seconds, and milliseconds.

---

## Game Flow

```
[Start Screen] → [Team Registration] → [Rules/Tutorial] → [Level 1] → ... → [Level 6] → [Final Score + Leaderboard]
                                                              ↓
                                                    [Chaos Events Randomly Trigger]
```

### Pre-Game
1. Team enters their name
2. Brief tutorial explaining controls and roles
3. Countdown before Level 1 begins

### During Game
- Timer runs continuously across all levels
- Chaos events trigger randomly (every 8-15 seconds)
- Short transition screens between levels (3 seconds)
- No pausing allowed

### Post-Game
- Final time displayed (MM:SS:mmm format)
- Breakdown of time per level
- Position on leaderboard
- Option to retry or exit

---

## Level Descriptions

### Level 1: Digital Cleanup
**Theme:** Drag and drop files into recycle bin

**Setup:**
- 6-8 file icons scattered randomly on a desktop background
- One recycle bin in a corner
- Files have different sizes (small files = fewer points, large files = more points but harder to grab)

**Win Condition:** All files successfully dropped into recycle bin

**Communication Challenge:** Guide must describe file positions using intuitive directions ("move left... more... stop! Now down a bit...")

---

### Level 2: Password Panic
**Theme:** Type a password by clicking an on-screen keyboard

**Setup:**
- A large on-screen QWERTY keyboard displayed
- A password field at the top showing target password (visible to Guide only)
- Password is 6-8 characters, mix of letters and numbers
- Keys shuffle positions after every 2 correct keystrokes

**Win Condition:** Successfully input the entire password

**Communication Challenge:** Guide must quickly spell out letters while Navigator hunts for each key. Key shuffling forces constant re-navigation.

**Why it works:** Tests rapid communication and adaptation. The shuffling mechanic creates natural frustration and urgency.

---

### Level 3: Bomb Defusal
**Theme:** Cut the right wires in sequence on a bomb interface

**Setup:**
- A "bomb" interface with 6 colored wires
- A code panel showing which wires to cut and in what order (visible to Guide only)
- Sequence requires cutting 4 wires in correct order
- Wrong wire = 5 second penalty added to timer
- Wires are tangled/overlapping making them hard to trace

**Win Condition:** Cut all required wires in correct sequence

**Communication Challenge:** Guide must describe wire colors AND positions clearly. "The red wire... no, the OTHER red wire, the one that goes behind the blue one!"

**Why it works:** Color descriptions can be ambiguous. Overlapping wires create visual confusion that's hard to verbalize.

---

### Level 4: Safe Cracker
**Theme:** Crack a vault by entering the correct combination on a rotary dial

**Setup:**
- A large vintage safe with a rotating combination dial (numbers 0-99)
- A 3-number combination displayed on a "stolen note" (visible to Guide only)
- Navigator must click and drag to rotate the dial
- Combination requires: Right to first number, Left to second number, Right to third number
- Dial is sensitive - overshooting means rotating back around
- A "click" indicator shows when dial passes over numbers

**Win Condition:** Enter all 3 numbers in the correct sequence and direction

**Communication Challenge:** Guide must communicate both the target number AND when to stop. "Keep going right... 45... 46... 47... STOP! Now go left... slowly..."

**Why it works:** Precision-based challenge where overshooting is punishing. The directional changes (right-left-right) add confusion. Tests patience and precise communication timing.

---

### Level 5: Laser Heist
**Theme:** Navigate through a laser security grid in a museum heist scenario

**Setup:**
- Dark museum/vault environment with red laser beams
- Entry point on one side, exit on the opposite
- 3 zones of increasing complexity:
  - Zone 1 (Lobby): Static beams + 1 slow sweeping beam
  - Zone 2 (Gallery): Mix of static, sweeping, and blinking beams
  - Zone 3 (Vault): Dense grid with multiple sweeping beams and gate sequences
- Cursor represented as a small glowing "spy" dot
- Checkpoints at the start of each zone

**Laser Types:**
- **Static Beam**: Does not move; permanent obstacle
- **Sweeping Beam**: Rotates back and forth like a pendulum
- **Blinking Beam**: Turns on/off at regular intervals
- **Gate Beam**: Two parallel beams that open and close alternately

**Win Condition:** Reach the exit without touching any lasers

**Communication Challenge:** Guide must call out timing windows: "Wait... wait... NOW GO! Straight up! STOP! Another one coming... wait... NOW!"

**Why it works:** Introduces timing-based challenges. Tests patience and rhythm recognition. Perfect preparation for the precision demands of the maze finale.

---

### Level 6: Maze Escape
**Theme:** Navigate through a maze without touching walls — The Grand Finale

**Setup:**
- A maze with a clear start point (green) and exit (red/gold)
- Walls are sensitive - touching them triggers a buzzer and 3-second freeze penalty
- Path width varies: comfortable (40px) → medium → narrow (15px)
- 3 checkpoints that save progress (hitting a wall returns to last checkpoint, not start)
- Final stretch before exit is extra narrow (the ultimate test)

**Win Condition:** Reach the exit point

**Communication Challenge:** Guide must give constant micro-directions. "Tiny bit up... hold... now right... STOP! Wall above you. Down first, then right..."

**Why it works:** Classic "Operation" style tension. Every movement matters. The freeze penalty on wall touch creates dramatic moments. As the finale, it combines all skills learned: precision, patience, trust, and continuous communication.

---

## Chaos Events

Chaos events trigger randomly during gameplay to increase difficulty and frustration.

### Mouse Chaos

| Event | Description | Duration | Frustration Level |
|-------|-------------|----------|-------------------|
| **Pointer Glitch** | Cursor visually jitters/shakes while actual position remains stable | 3-4 sec | Medium |
| **Sensitivity Spike** | Mouse becomes extremely sensitive (tiny movements = big cursor jumps) | 4-5 sec | High |
| **Sensitivity Drop** | Mouse becomes sluggish (large movements = tiny cursor movements) | 4-5 sec | Medium |
| **Inverted Controls** | Mouse X/Y movements are flipped (up=down, left=right) | 5-6 sec | Very High |
| **Ghost Cursors** | 2-3 fake cursors appear and mirror real cursor's movement with slight delay | 4 sec | Very High |

### Visual Chaos

| Event | Description | Duration | Frustration Level |
|-------|-------------|----------|-------------------|
| **Screen Shake** | Entire screen vibrates/shakes | 3 sec | Medium |
| **Zoom Warp** | Screen zooms in/out suddenly | 2 sec | Medium |
| **Color Invert** | Screen colors invert (makes Guide's descriptions momentarily wrong) | 3 sec | High |
| **Static Burst** | TV static overlay appears on screen | 2 sec | Medium |

---

## Difficulty Progression

| Level | Base Difficulty | Chaos Frequency | Chaos Intensity |
|-------|-----------------|-----------------|-----------------|
| 1 | Easy | Low (every 15-20 sec) | Mild events only |
| 2 | Medium | Medium (every 12-15 sec) | Mild + Medium events |
| 3 | Medium-Hard | Medium (every 10-12 sec) | All event types |
| 4 | Hard | High (every 8-10 sec) | All event types |
| 5 | Hard | High (every 8-10 sec) | All event types |
| 6 | Very Hard | Very High (every 6-8 sec) | All event types, higher chance of severe |

---

## Leaderboard

- **Metric:** Fastest Overall Time
- **Format:** MM:SS:mmm (minutes, seconds, milliseconds)
- **Example:** 03:45:127 (3 minutes, 45 seconds, 127 milliseconds)

---

## Technical Considerations

- **Framework:** HTML5 Canvas or WebGL for smooth cursor tracking
- **Responsive:** Should work on standard 1920x1080 monitors
- **Accessibility:** High contrast mode option, colorblind-friendly wire colors
- **Anti-cheat:** Navigator's blindfold should be verified by event staff

---

## Summary

Eyes OFF creates memorable, hilarious moments through:
1. **Communication breakdown** - Simple instructions become complex under pressure
2. **Chaos escalation** - Random events keep players on edge
3. **Team bonding** - Success requires trust and coordination
4. **Spectator appeal** - Watching blindfolded navigation is entertaining for audiences

The game balances frustration with achievability - hard enough to be challenging, fair enough to be completable.
