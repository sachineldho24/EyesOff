# Eyes OFF - Development TODO

## Project Status: 🟡 In Development

---

## Phase 1: Project Setup & Core Infrastructure
**Target: Foundation**

### Environment Setup
- [ ] Initialize project with Vite + TypeScript
- [ ] Configure ESLint and Prettier
- [ ] Set up folder structure
- [ ] Install and configure PixiJS
- [ ] Create base HTML template
- [ ] Set up asset pipeline (images)

### Core Architecture
- [ ] Create game state machine (Menu → Playing → Results)
- [ ] Implement scene manager
- [ ] Build event bus for game events
- [ ] Create timer utility class (high precision)
- [ ] Implement input manager (mouse tracking)

### Base Components
- [ ] Create reusable Button component
- [ ] Create Text/Label component
- [ ] Create Modal/Overlay component
- [ ] Create Timer display component
- [ ] Create transition screen component
- [ ] Create visual feedback system (flash, shake, color changes)

---

## Phase 2: Pre-Game Screens
**Target: User Onboarding**

### Splash Screen
- [ ] Design splash layout
- [ ] Add logo/title with animation
- [ ] Implement "Press anywhere to start"
- [ ] Add subtle background animation

### Team Registration
- [ ] Create team name input field
- [ ] Add character validation (3-20 chars)
- [ ] Implement duplicate name check
- [ ] Add "Continue" button
- [ ] Store team name in game state

### Tutorial/Rules Screen
- [ ] Create role explanation cards (Navigator/Guide)
- [ ] Design blindfold verification prompt
- [ ] Add "Navigator is Ready" button
- [ ] Create skip option for repeat plays

### Countdown Screen
- [ ] Create 3-2-1-GO countdown animation
- [ ] Add dramatic visual effects
- [ ] Transition to Level 1 on "GO"

---

## Phase 3: Level Development
**Target: Core Gameplay**

### Level 1: Digital Cleanup
- [ ] Create desktop background aesthetic
- [ ] Design file icons (6-8 types)
- [ ] Implement drag-and-drop mechanics
- [ ] Create recycle bin with drop detection
- [ ] Add random file positioning
- [ ] Implement success feedback (visual animation)
- [ ] Add win condition check

### Level 2: Password Panic
- [ ] Create terminal/hacker aesthetic
- [ ] Build on-screen QWERTY keyboard
- [ ] Generate random passwords (6-8 chars)
- [ ] Implement click-to-type functionality
- [ ] Build keyboard shuffle animation
- [ ] Add backspace functionality
- [ ] Create password display (masked for Navigator)
- [ ] Add win condition check

### Level 3: Bomb Defusal
- [ ] Design bomb interface visual
- [ ] Create 6 colored wire graphics
- [ ] Implement wire tangle/overlap effect
- [ ] Generate random wire sequences
- [ ] Build click-to-cut mechanic
- [ ] Add wire cut animation
- [ ] Implement +5 sec penalty system
- [ ] Create sequence tracking
- [ ] Add win condition check

### Level 4: Safe Cracker
- [ ] Design vintage safe visual
- [ ] Create rotary dial (0-99)
- [ ] Implement click-drag rotation
- [ ] Generate 3-number combinations
- [ ] Build direction tracking (R-L-R)
- [ ] Add overshoot detection
- [ ] Create number lock feedback
- [ ] Implement dial sensitivity
- [ ] Add win condition check

### Level 5: Laser Heist
- [ ] Design museum/vault aesthetic
- [ ] Create static laser beams
- [ ] Implement sweeping laser animation
- [ ] Create blinking laser pattern
- [ ] Build 3-zone layout
- [ ] Add checkpoint system
- [ ] Implement laser collision detection
- [ ] Add +3 sec freeze penalty
- [ ] Create cursor "spy" visual
- [ ] Add win condition check

### Level 6: Maze Escape
- [ ] Design maze layout
- [ ] Generate maze with variable widths
- [ ] Implement wall collision detection
- [ ] Create 3 checkpoint markers
- [ ] Build narrow final stretch
- [ ] Add buzzer on wall touch
- [ ] Implement +3 sec freeze penalty
- [ ] Add checkpoint respawn logic
- [ ] Create exit zone detection
- [ ] Add win condition check

---

## Phase 4: Chaos System
**Target: Dynamic Difficulty**

### Chaos Manager
- [ ] Create chaos event scheduler
- [ ] Implement random timing (level-based intervals)
- [ ] Build event queue (no stacking)
- [ ] Add immunity period tracking
- [ ] Create level-based event pools

### Mouse Chaos Events
- [ ] Pointer Glitch (visual jitter)
- [ ] Sensitivity Spike (3x multiplier)
- [ ] Sensitivity Drop (0.3x multiplier)
- [ ] Inverted Controls (flip X/Y)
- [ ] Ghost Cursors (fake cursor spawning)

### Visual Chaos Events
- [ ] Screen Shake (viewport vibration)
- [ ] Zoom Warp (scale transform)
- [ ] Color Invert (CSS filter)
- [ ] Static Burst (overlay effect)

### Chaos UI
- [ ] Create chaos event indicator
- [ ] Add visual warning flash
- [ ] Show remaining duration
- [ ] Add visual effect triggers

---

## Phase 5: Post-Game & Leaderboard
**Target: Completion Loop**

### Results Screen
- [ ] Display final time (MM:SS:mmm)
- [ ] Show per-level time breakdown
- [ ] Calculate leaderboard position
- [ ] Add celebratory animation
- [ ] Create "View Leaderboard" button
- [ ] Create "Play Again" button
- [ ] Create "Exit" button

### Leaderboard System
- [ ] Design leaderboard table layout
- [ ] Implement data storage (LocalStorage)
- [ ] Build sort-by-time logic
- [ ] Show top 10-20 entries
- [ ] Highlight current team position
- [ ] Add timestamp display
- [ ] Create leaderboard reset (admin)

### Data Persistence
- [ ] Create save/load utilities
- [ ] Implement leaderboard CRUD
- [ ] Add data validation
- [ ] Handle storage errors gracefully

---

## Phase 6: Polish & Optimization
**Target: Production Ready**

### Visual Polish
- [ ] Add level transition animations
- [ ] Create smooth screen transitions
- [ ] Add particle effects (optional)
- [ ] Implement loading states
- [ ] Add hover states for interactive elements

### Performance
- [ ] Profile and optimize render loop
- [ ] Ensure 60 FPS on target hardware
- [ ] Optimize asset loading
- [ ] Minimize memory allocations
- [ ] Test input latency

### Testing
- [ ] Test all 6 levels end-to-end
- [ ] Verify timer accuracy
- [ ] Test all chaos events
- [ ] Verify leaderboard persistence
- [ ] Cross-browser testing (Chrome, Firefox, Edge)
- [ ] Test edge cases (rapid clicks, etc.)

---

## Phase 7: Deployment
**Target: Live at Event**

### Build
- [ ] Configure production build
- [ ] Optimize bundle size
- [ ] Generate static assets
- [ ] Test production build locally

### Deployment
- [ ] Choose hosting (Vercel/Netlify/static)
- [ ] Deploy to production
- [ ] Configure custom domain (optional)
- [ ] Test live deployment

### Event Preparation
- [ ] Create admin instructions
- [ ] Document leaderboard reset process
- [ ] Prepare backup/offline version
- [ ] Test on event hardware

---

## Bug Tracker

| ID | Description | Status | Priority |
|----|-------------|--------|----------|
| - | - | - | - |

---

## Notes

### Development Priorities
1. **P0**: Core gameplay loop (levels 1-6 playable)
2. **P1**: Chaos system
3. **P2**: Polish and visuals
4. **P3**: Nice-to-haves

### Key Technical Decisions
- Using PixiJS for 2D rendering (performance)
- TypeScript for type safety
- Vite for fast development builds
- LocalStorage for leaderboard (simple, no backend needed)

### Open Questions
- [ ] Should Level 5 be Laser Heist or Simon Says? (Currently: Laser Heist)
- [ ] Backend for leaderboard or LocalStorage only?
- [ ] Custom cursor or system cursor with effects?

---

## Changelog

| Date | Changes |
|------|---------|
| 2026-02-03 | Initial TODO created |
