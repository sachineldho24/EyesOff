# Eyes OFF - Technical Stack & Architecture

## Overview

This document outlines the technology choices, architecture decisions, and development setup for the Eyes OFF web game.

---

## Tech Stack Summary

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Runtime** | Browser | Modern | Chrome, Firefox, Edge |
| **Language** | TypeScript | 5.x | Type safety, better DX |
| **Build Tool** | Vite | 5.x | Fast builds, HMR |
| **Rendering** | PixiJS | 8.x | 2D WebGL/Canvas rendering |
| **State** | Custom | - | Lightweight state machine |
| **Storage** | LocalStorage | - | Leaderboard persistence |
| **Styling** | CSS Modules | - | Scoped styles for UI |

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │   INPUT      │  │   RENDER     │                            │
│  │   MANAGER    │  │   ENGINE     │                            │
│  │  (Mouse)     │  │  (PixiJS)    │                            │
│  └──────┬───────┘  └──────┬───────┘                            │
│         │                 │                                     │
│         └────────┬────────┘                                     │
│                  │                 │                            │
│                  ▼                 ▼                            │
│         ┌────────────────────────────────────┐                  │
│         │           GAME ENGINE              │                  │
│         │  ┌─────────────────────────────┐   │                  │
│         │  │       STATE MACHINE         │   │                  │
│         │  │  Menu→Game→Results→Leader   │   │                  │
│         │  └─────────────────────────────┘   │                  │
│         │  ┌─────────────────────────────┐   │                  │
│         │  │       SCENE MANAGER         │   │                  │
│         │  │  Splash│Reg│Tutorial│Levels │   │                  │
│         │  └─────────────────────────────┘   │                  │
│         │  ┌─────────────────────────────┐   │                  │
│         │  │       CHAOS SYSTEM          │   │                  │
│         │  │  Event scheduling + effects │   │                  │
│         │  └─────────────────────────────┘   │                  │
│         │  ┌─────────────────────────────┐   │                  │
│         │  │       TIMER SYSTEM          │   │                  │
│         │  │  High-precision tracking    │   │                  │
│         │  └─────────────────────────────┘   │                  │
│         └────────────────────────────────────┘                  │
│                           │                                     │
│                           ▼                                     │
│         ┌────────────────────────────────────┐                  │
│         │          DATA LAYER                │                  │
│         │  ┌───────────┐  ┌───────────────┐  │                  │
│         │  │GameState  │  │ LocalStorage  │  │                  │
│         │  │(in-memory)│  │ (leaderboard) │  │                  │
│         │  └───────────┘  └───────────────┘  │                  │
│         └────────────────────────────────────┘                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Folder Structure

```
EyesOFF/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts                 # Entry point
│   ├── Game.ts                 # Main game class
│   │
│   ├── core/                   # Core systems
│   │   ├── StateMachine.ts     # Game state management
│   │   ├── SceneManager.ts     # Scene transitions
│   │   ├── InputManager.ts     # Mouse input handling
│   │   ├── Timer.ts            # High-precision timer
│   │   ├── EventBus.ts         # Pub/sub events
│   │   └── FeedbackManager.ts  # Visual feedback effects
│   │
│   ├── chaos/                  # Chaos event system
│   │   ├── ChaosManager.ts     # Event scheduler
│   │   ├── effects/
│   │   │   ├── PointerGlitch.ts
│   │   │   ├── SensitivitySpike.ts
│   │   │   ├── SensitivityDrop.ts
│   │   │   ├── InvertedControls.ts
│   │   │   ├── GhostCursors.ts
│   │   │   ├── ScreenShake.ts
│   │   │   ├── ZoomWarp.ts
│   │   │   ├── ColorInvert.ts
│   │   │   └── StaticBurst.ts
│   │   └── ChaosEffect.ts      # Base effect class
│   │
│   ├── scenes/                 # Game scenes
│   │   ├── Scene.ts            # Base scene class
│   │   ├── SplashScene.ts
│   │   ├── RegistrationScene.ts
│   │   ├── TutorialScene.ts
│   │   ├── CountdownScene.ts
│   │   ├── GameplayScene.ts    # Level container
│   │   ├── TransitionScene.ts
│   │   ├── ResultsScene.ts
│   │   └── LeaderboardScene.ts
│   │
│   ├── levels/                 # Level implementations
│   │   ├── Level.ts            # Base level class
│   │   ├── Level1_DigitalCleanup.ts
│   │   ├── Level2_PasswordPanic.ts
│   │   ├── Level3_BombDefusal.ts
│   │   ├── Level4_SafeCracker.ts
│   │   ├── Level5_LaserHeist.ts
│   │   └── Level6_MazeEscape.ts
│   │
│   ├── ui/                     # UI components
│   │   ├── Button.ts
│   │   ├── TextInput.ts
│   │   ├── TimerDisplay.ts
│   │   ├── ChaosIndicator.ts
│   │   └── ProgressBar.ts
│   │
│   ├── data/                   # Data management
│   │   ├── GameState.ts        # Runtime state
│   │   ├── Leaderboard.ts      # Persistence layer
│   │   └── LevelConfig.ts      # Level configurations
│   │
│   ├── utils/                  # Utilities
│   │   ├── math.ts             # Math helpers
│   │   ├── random.ts           # RNG utilities
│   │   ├── time.ts             # Time formatting
│   │   └── collision.ts        # Collision detection
│   │
│   └── assets/                 # Asset references
│       ├── images.ts
│
├── public/                     # Static assets
│   ├── images/
│   │   ├── levels/
│   │   ├── ui/
│   │   └── effects/
│       ├── sfx/
│       └── music/
│
├── docs/                       # Documentation
│   ├── brainstorm.md
│   ├── Eyes_OFF_Complete_Game_Design_Document_v2.md
│   ├── PRD.md
│   ├── TODO.md
│   └── TECHSTACK.md
│
└── tests/                      # Test files
    └── ...
```

---

## Core Systems

### 1. State Machine

Manages high-level game states:

```typescript
enum GameState {
  SPLASH,
  REGISTRATION,
  TUTORIAL,
  COUNTDOWN,
  PLAYING,
  TRANSITION,
  RESULTS,
  LEADERBOARD
}
```

### 2. Scene Manager

Handles scene lifecycle:

```typescript
interface Scene {
  init(): void;          // Setup scene
  enter(): void;         // Transition in
  update(dt: number): void;  // Frame update
  exit(): void;          // Transition out
  destroy(): void;       // Cleanup
}
```

### 3. Input Manager

Mouse tracking with chaos effect modifiers:

```typescript
interface InputState {
  x: number;              // Raw mouse X
  y: number;              // Raw mouse Y
  modifiedX: number;      // After chaos effects
  modifiedY: number;
  isDown: boolean;
  isDragging: boolean;
}
```

### 4. Timer System

High-precision timing using `performance.now()`:

```typescript
class GameTimer {
  private startTime: number;
  private penalties: number = 0;

  getElapsed(): number;           // Current time in ms
  addPenalty(ms: number): void;   // Add time penalty
  getFormatted(): string;         // "MM:SS:mmm"
}
```

### 5. Chaos Manager

Event scheduling and effect application:

```typescript
interface ChaosConfig {
  minInterval: number;    // Min ms between events
  maxInterval: number;    // Max ms between events
  eventPool: ChaosEventType[];
  immunityPeriod: number; // Ms after checkpoint
}
```

---

## Technology Details

### PixiJS (Rendering)

**Why PixiJS?**
- Hardware-accelerated 2D rendering (WebGL with Canvas fallback)
- Excellent performance for 60 FPS target
- Rich sprite/graphics API
- Good documentation and community

**Key Features Used:**
- `Container` for scene hierarchy
- `Sprite` for images
- `Graphics` for shapes (maze walls, wires, etc.)
- `Text` for labels
- `Ticker` for game loop
- `filters` for chaos visual effects

```typescript
// Example: Screen shake using PixiJS
app.stage.position.set(
  Math.random() * intensity - intensity/2,
  Math.random() * intensity - intensity/2
);
```

### Vite (Build Tool)

**Why Vite?**
- Instant dev server startup
- Fast hot module replacement (HMR)
- Optimized production builds
- TypeScript support out of the box
- Asset handling (images)

```typescript
// vite.config.ts
export default defineConfig({
  base: './',  // Relative paths for deployment
  build: {
    target: 'es2020',
    outDir: 'dist'
  }
});
```

### LocalStorage (Persistence)

**Why LocalStorage?**
- No backend required
- Simple API
- Sufficient for leaderboard data
- Works offline

```typescript
// Leaderboard storage
interface LeaderboardEntry {
  teamName: string;
  totalTime: number;
  levelTimes: number[];
  timestamp: string;
}

localStorage.setItem('eyesoff_leaderboard', JSON.stringify(entries));
```

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Frame Rate | 60 FPS | `requestAnimationFrame` timing |
| Input Latency | < 16ms | Mouse event to render |
| Initial Load | < 3s | DOMContentLoaded to interactive |
| Bundle Size | < 500KB | Gzipped production build |
| Memory | < 100MB | Heap snapshot |

### Optimization Strategies

1. **Object Pooling**: Reuse game objects (cursors, particles)
2. **Texture Atlases**: Combine sprites into spritesheets
3. **Event Delegation**: Single listener for mouse events
4. **Lazy Loading**: Load level assets on demand
5. **RAF Sync**: All updates in single `requestAnimationFrame`

---

## Development Setup

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone repository
cd EyesOFF

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |

---

## Dependencies

### Production Dependencies

```json
{
  "pixi.js": "^8.0.0"
}
```

### Development Dependencies

```json
{
  "typescript": "^5.3.0",
  "vite": "^5.0.0",
  "eslint": "^8.56.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "prettier": "^3.2.0"
}
```

---

## Browser Support

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | 100+ | Full |
| Firefox | 100+ | Full |
| Edge | 100+ | Full |
| Safari | 15+ | Tested |

### Required Browser Features
- ES2020 (async/await, optional chaining)
- WebGL 2.0 (with Canvas fallback)
- LocalStorage
- Pointer Events

---

## Deployment

### Static Hosting Options

| Platform | Pros | Cons |
|----------|------|------|
| **Vercel** | Free, easy deploy, preview URLs | - |
| **Netlify** | Free, form handling | - |
| **GitHub Pages** | Free, integrated with repo | Manual deploy |
| **Self-hosted** | Full control | Setup required |

### Build Output

```
dist/
├── index.html          # Entry HTML
├── assets/
│   ├── index-[hash].js # Bundled JS
│   ├── index-[hash].css # Bundled CSS
│   └── [asset files]   # Images
```

### Deployment Commands

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist

# GitHub Pages (manual)
npm run build
# Push dist/ to gh-pages branch
```

---

## Security Considerations

1. **No sensitive data**: Game stores only team names and times
2. **Input validation**: Sanitize team name input
3. **No external APIs**: Fully client-side
4. **CSP headers**: Configure if self-hosting

---

## Future Considerations

### Potential Backend (v2)
If persistent leaderboard across devices is needed:
- Firebase Realtime Database
- Supabase
- Simple REST API

### Potential Features
- WebSocket for real-time leaderboard updates
- Service Worker for offline support
- WebRTC for remote play (Guide on different device)

---

## References

- [PixiJS Documentation](https://pixijs.com/8.x/guides)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
