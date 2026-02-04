# Eyes OFF - Product Requirements Document (PRD)

## Document Info
| Field | Value |
|-------|-------|
| **Product Name** | Eyes OFF |
| **Version** | 1.0 |
| **Status** | In Development |
| **Target Release** | Technical Fest 2026 |

---

## 1. Executive Summary

**Eyes OFF** is a two-player cooperative web game where one blindfolded player (Navigator) controls the mouse while their partner (Guide) provides verbal instructions. The game tests communication, trust, and coordination through 6 progressively challenging levels with random chaos events.

### Success Metrics
- Average session completion: 4-8 minutes
- Target frame rate: 60 FPS
- Input latency: < 16ms
- Page load time: < 3 seconds

---

## 2. Problem Statement

Technical fests need engaging, spectator-friendly games that:
- Encourage teamwork and communication
- Create memorable, shareable moments
- Work reliably on standard hardware
- Support competitive leaderboards

---

## 3. Target Users

### Primary Users
- **College students** participating in technical fest events
- **Event organizers** running gaming competitions

### User Personas

| Persona | Description | Needs |
|---------|-------------|-------|
| **Navigator** | Blindfolded player with mouse control | Responsive controls, clear visual feedback |
| **Guide** | Sighted player giving verbal instructions | Clear visuals, readable UI elements |
| **Spectator** | Audience watching the gameplay | Large UI, visible drama, entertainment value |
| **Admin** | Event staff managing the competition | Leaderboard management, easy reset |

---

## 4. Product Requirements

### 4.1 Functional Requirements

#### FR-001: Team Registration
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001.1 | Team name input (3-20 characters) | P0 |
| FR-001.2 | Duplicate name validation against leaderboard | P1 |
| FR-001.3 | Blindfold verification prompt before game start | P0 |

#### FR-002: Game Timer
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-002.1 | Continuous timer across all 6 levels | P0 |
| FR-002.2 | Display format: MM:SS:mmm | P0 |
| FR-002.3 | Timer visible during gameplay | P0 |
| FR-002.4 | Penalties added directly to running time | P0 |
| FR-002.5 | No pause functionality | P0 |

#### FR-003: Level System
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-003.1 | 6 sequential levels | P0 |
| FR-003.2 | 3-second transition between levels | P0 |
| FR-003.3 | Level-specific win conditions | P0 |
| FR-003.4 | Per-level time tracking | P1 |

#### FR-004: Chaos Events
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-004.1 | Random chaos event triggers (6-20 sec intervals based on level) | P0 |
| FR-004.2 | 5 Mouse chaos types | P0 |
| FR-004.3 | 4 Visual chaos types | P0 |
| FR-004.4 | No event stacking (one at a time) | P0 |
| FR-004.5 | Level transition immunity (3 sec) | P1 |
| FR-004.6 | Checkpoint immunity (2 sec) | P1 |

#### FR-005: Leaderboard
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-005.1 | Store team name + total time | P0 |
| FR-005.2 | Sort by fastest time | P0 |
| FR-005.3 | Display top 10-20 teams | P0 |
| FR-005.4 | Persist across sessions | P0 |
| FR-005.5 | Real-time updates | P1 |

### 4.2 Level Requirements

#### Level 1: Digital Cleanup
| ID | Requirement | Priority |
|----|-------------|----------|
| L1-001 | 6-8 draggable file icons | P0 |
| L1-002 | Recycle bin drop zone | P0 |
| L1-003 | Random file positions each playthrough | P0 |
| L1-004 | Visual feedback on successful drop | P0 |

#### Level 2: Password Panic
| ID | Requirement | Priority |
|----|-------------|----------|
| L2-001 | On-screen QWERTY keyboard | P0 |
| L2-002 | 6-8 character password (letters + numbers) | P0 |
| L2-003 | Keyboard shuffle after every 2 correct inputs | P0 |
| L2-004 | Backspace functionality | P1 |
| L2-005 | Visual feedback for correct/wrong input | P0 |

#### Level 3: Bomb Defusal
| ID | Requirement | Priority |
|----|-------------|----------|
| L3-001 | 6 colored wires (Red, Blue, Green, Yellow, White, Black) | P0 |
| L3-002 | 4-wire cutting sequence | P0 |
| L3-003 | Tangled/overlapping wire visuals | P0 |
| L3-004 | +5 second penalty for wrong wire | P0 |
| L3-005 | Wire cut animation | P1 |

#### Level 4: Safe Cracker
| ID | Requirement | Priority |
|----|-------------|----------|
| L4-001 | Rotary dial (0-99) | P0 |
| L4-002 | 3-number combination | P0 |
| L4-003 | Right-Left-Right direction pattern | P0 |
| L4-004 | Click and drag rotation control | P0 |
| L4-005 | Overshoot requires full rotation back | P0 |
| L4-006 | Number lock confirmation visual | P1 |

#### Level 5: Laser Heist
| ID | Requirement | Priority |
|----|-------------|----------|
| L5-001 | Laser beam obstacles (static + moving) | P0 |
| L5-002 | 3 zones with increasing difficulty | P0 |
| L5-003 | Checkpoint at each zone start | P0 |
| L5-004 | +3 second freeze on laser touch | P0 |
| L5-005 | Sweeping and blinking laser patterns | P0 |

#### Level 6: Maze Escape
| ID | Requirement | Priority |
|----|-------------|----------|
| L6-001 | Maze with clear start and exit | P0 |
| L6-002 | Wall collision detection | P0 |
| L6-003 | +3 second freeze on wall touch | P0 |
| L6-004 | 3 checkpoints within maze | P0 |
| L6-005 | Narrow final stretch | P0 |
| L6-006 | Variable path widths | P1 |

### 4.3 Chaos Event Specifications

#### Mouse Chaos Events
| Event | Duration | Effect |
|-------|----------|--------|
| Pointer Glitch | 3-4 sec | Visual cursor jitter (position unchanged) |
| Sensitivity Spike | 4-5 sec | 3x mouse sensitivity |
| Sensitivity Drop | 4-5 sec | 0.3x mouse sensitivity |
| Inverted Controls | 5-6 sec | X/Y axis flipped |
| Ghost Cursors | 4 sec | 2-3 fake cursors with delayed mirroring |

#### Visual Chaos Events
| Event | Duration | Effect |
|-------|----------|--------|
| Screen Shake | 3 sec | Screen vibration |
| Zoom Warp | 2 sec | Sudden zoom in/out |
| Color Invert | 3 sec | Negative color filter |
| Static Burst | 2 sec | TV static overlay |

### 4.4 Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | Frame rate | 60 FPS minimum |
| NFR-002 | Input latency | < 16ms mouse-to-cursor |
| NFR-003 | Initial load time | < 3 seconds |
| NFR-004 | Display resolution | 1920x1080 optimized |
| NFR-005 | Browser support | Chrome, Firefox, Edge (latest) |
| NFR-006 | No external dependencies at runtime | Offline capable after load |
| NFR-007 | No audio | Visual feedback only |

---

## 5. User Flows

### 5.1 Main Game Flow
```
[Splash Screen]
      │
      ▼
[Team Registration] ─── Enter team name
      │
      ▼
[Rules/Tutorial] ─── Role explanation + blindfold verification
      │
      ▼
[Countdown 3-2-1-GO]
      │
      ▼
[Level 1: Digital Cleanup]
      │ (3s transition)
      ▼
[Level 2: Password Panic]
      │ (3s transition)
      ▼
[Level 3: Bomb Defusal]
      │ (3s transition)
      ▼
[Level 4: Safe Cracker]
      │ (3s transition)
      ▼
[Level 5: Laser Heist]
      │ (3s transition)
      ▼
[Level 6: Maze Escape]
      │
      ▼
[Results Screen] ─── Final time + per-level breakdown
      │
      ▼
[Leaderboard] ─── Position shown
      │
      ├──► [Play Again]
      └──► [Exit]
```

### 5.2 Chaos Event Flow
```
[Game Running]
      │
      ▼
[Random Timer: 6-20 sec based on level]
      │
      ▼
[Check: Is another event active?] ──Yes──► [Wait]
      │
      No
      ▼
[Check: Immunity period?] ──Yes──► [Wait]
      │
      No
      ▼
[Select Random Event from level pool]
      │
      ▼
[Apply Effect + Visual Indicator]
      │
      ▼
[Duration Timer]
      │
      ▼
[Remove Effect]
      │
      ▼
[Reset Random Timer]
```

---

## 6. UI/UX Requirements

### 6.1 Visual Design Principles
- High contrast for visibility from distance
- Large, readable fonts (spectator-friendly)
- Clear visual feedback for all interactions
- Consistent color coding across levels

### 6.2 Screen Specifications

| Screen | Key Elements |
|--------|--------------|
| Splash | Logo, "Press to Start", subtle animation |
| Registration | Team name input, validation feedback |
| Tutorial | Role cards, blindfold verification button |
| Gameplay | Timer (top), level content (center), chaos indicator |
| Transition | Level name, progress indicator, 3s countdown |
| Results | Final time, per-level times, leaderboard position |
| Leaderboard | Rank, team name, time columns |

---

## 7. Data Requirements

### 7.1 Data Storage
| Data | Storage | Persistence |
|------|---------|-------------|
| Leaderboard entries | LocalStorage / Backend DB | Permanent |
| Current game state | Memory | Session only |
| Level configurations | Static JSON | Permanent |

### 7.2 Leaderboard Entry Schema
```json
{
  "teamName": "string (3-20 chars)",
  "totalTime": "number (milliseconds)",
  "levelTimes": [
    { "level": 1, "time": "number" },
    { "level": 2, "time": "number" },
    { "level": 3, "time": "number" },
    { "level": 4, "time": "number" },
    { "level": 5, "time": "number" },
    { "level": 6, "time": "number" }
  ],
  "timestamp": "ISO 8601 datetime"
}
```

---

## 8. Constraints & Assumptions

### Constraints
- Must work on standard event hardware (1920x1080 monitors)
- No internet required during gameplay (after initial load)
- Single mouse input only (no keyboard for Navigator)
- No mobile support required

### Assumptions
- Event staff will verify blindfolds physically
- Players have working mouse with standard sensitivity
- Modern browser (Chrome/Firefox/Edge 2024+)

---

## 9. Out of Scope (v1.0)

- Mobile/touch support
- Multiplayer networking (local play only)
- Custom level editor
- Achievement system
- Replay recording
- Voice chat integration
- Bonus/Easter egg levels

---

## 10. Acceptance Criteria

### Game Complete When:
- [ ] All 6 levels playable start to finish
- [ ] Timer accurately tracks MM:SS:mmm
- [ ] All 9 chaos events functional
- [ ] Leaderboard persists across sessions
- [ ] 60 FPS maintained during gameplay
- [ ] Works on Chrome, Firefox, Edge
- [ ] Full game completable in 4-8 minutes

---

## 11. Appendix

### A. Difficulty Progression Table
| Level | Chaos Frequency | Event Pool |
|-------|-----------------|------------|
| 1 | 15-20 sec | Pointer Glitch, Screen Shake |
| 2 | 12-15 sec | + Sensitivity Drop, Zoom Warp, Static Burst |
| 3 | 10-12 sec | + Sensitivity Spike, Color Invert |
| 4 | 8-10 sec | + All events |
| 5 | 8-10 sec | All events |
| 6 | 6-8 sec | All events (higher severe chance) |

### B. Penalty Summary
| Action | Penalty |
|--------|---------|
| Wrong wire (Level 3) | +5 seconds |
| Wall touch (Level 6) | +3 seconds + freeze |
| Laser touch (Level 5) | +3 seconds + freeze |
