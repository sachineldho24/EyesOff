# Eyes OFF

A two-player cooperative chaos game designed for college technical fests. One player controls the mouse while the other watches the screen - communication is key as random chaos events disrupt gameplay!

## Game Concept

**Eyes OFF** challenges two players to work together under pressure:
- **Player 1 (Mouse Controller)**: Controls the mouse but cannot see the screen
- **Player 2 (Screen Watcher)**: Sees the screen but cannot touch the mouse

Together, they must complete 6 increasingly difficult levels while random "chaos events" disrupt their coordination.

## Features

- **6 Unique Levels** with progressive difficulty
- **9 Chaos Effects** that randomly disrupt gameplay
- **Team Registration** with custom team names
- **Leaderboard** with persistent scores (LocalStorage)
- **Visual Feedback System** for all game events
- **Precise Timer** with MM:SS:mmm format

## Levels

| Level | Name | Objective |
|-------|------|-----------|
| 1 | Digital Cleanup | Drag 7 files to the Recycle Bin |
| 2 | Password Panic | Type a password on a shuffling on-screen keyboard |
| 3 | Bomb Defusal | Cut wires in the correct color sequence |
| 4 | Safe Cracker | Rotate a dial to enter a 3-number combination (R-L-R) |
| 5 | Laser Heist | Navigate through a laser security grid |
| 6 | Maze Escape | Navigate a maze without touching walls |

## Chaos Effects

### Mouse Chaos (5 effects)
- **Pointer Glitch**: Cursor jitters randomly
- **Sensitivity Spike**: Mouse becomes hyper-sensitive (3x)
- **Sensitivity Drop**: Mouse becomes sluggish (0.3x)
- **Inverted Controls**: Mouse axes are reversed
- **Ghost Cursors**: Multiple fake cursors appear

### Visual Chaos (4 effects)
- **Screen Shake**: Display vibrates
- **Zoom Warp**: Screen zooms in/out
- **Color Invert**: Colors are inverted
- **Static Burst**: TV static overlay appears

## Tech Stack

- **TypeScript 5.x** - Type-safe JavaScript
- **Vite 7.x** - Fast build tool and dev server
- **PixiJS 8.x** - 2D WebGL/Canvas rendering
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sachineldho24/EyesOff.git
cd EyesOff

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

### Development

The dev server runs at `http://localhost:3000` by default.

## Project Structure

```
src/
├── Game.ts              # Main game orchestrator
├── main.ts              # Entry point
├── core/                # Core systems
│   ├── InputManager.ts  # Mouse input handling
│   ├── SceneManager.ts  # Scene transitions
│   ├── StateMachine.ts  # Game state management
│   ├── Timer.ts         # Game timer
│   ├── EventBus.ts      # Pub/sub events
│   └── FeedbackManager.ts # Visual feedback
├── scenes/              # Game screens
│   ├── SplashScene.ts   # Title screen
│   ├── RegistrationScene.ts
│   ├── TutorialScene.ts
│   ├── GameplayScene.ts
│   ├── TransitionScene.ts
│   ├── ResultsScene.ts
│   └── LeaderboardScene.ts
├── levels/              # Game levels
│   ├── Level.ts         # Base level class
│   ├── Level1_DigitalCleanup.ts
│   ├── Level2_PasswordPanic.ts
│   ├── Level3_BombDefusal.ts
│   ├── Level4_SafeCracker.ts
│   ├── Level5_LaserHeist.ts
│   └── Level6_MazeEscape.ts
├── chaos/               # Chaos system
│   ├── ChaosManager.ts  # Chaos event scheduler
│   ├── ChaosEffect.ts   # Base effect class
│   └── effects/         # Individual effects
└── data/                # Data management
    ├── GameState.ts     # Game data
    └── Leaderboard.ts   # Score persistence
```

## How to Play

1. **Form a team** of two players
2. **Assign roles**: One controls the mouse (eyes closed/away), one watches the screen
3. **Register** your team name
4. **Complete all 6 levels** as fast as possible
5. **Communicate** - the screen watcher must guide the mouse controller
6. **Adapt** to chaos events that randomly disrupt gameplay

## Game Flow

```
Splash Screen → Registration → Tutorial → Countdown → Gameplay → Results → Leaderboard
                                              ↑          |
                                              └──────────┘
                                           (Level transitions)
```

## Configuration

The game runs at 1920x1080 resolution and scales to fit the browser window while maintaining aspect ratio.

## License

MIT License

## Credits

Developed for college technical fest gaming events.

Built with Claude Opus 4.5
