import type { Game } from '../Game';
import { ChaosEffect } from './ChaosEffect';
import { PointerGlitch } from './effects/PointerGlitch';
import { SensitivitySpike } from './effects/SensitivitySpike';
import { SensitivityDrop } from './effects/SensitivityDrop';
import { InvertedControls } from './effects/InvertedControls';
import { GhostCursors } from './effects/GhostCursors';
import { ScreenShake } from './effects/ScreenShake';
import { ZoomWarp } from './effects/ZoomWarp';
import { ColorInvert } from './effects/ColorInvert';
import { StaticBurst } from './effects/StaticBurst';
import { GameEvents } from '../core/EventBus';

interface LevelChaosConfig {
  minInterval: number;
  maxInterval: number;
  availableEffects: string[];
}

const LEVEL_CONFIGS: Record<number, LevelChaosConfig> = {
  1: {
    minInterval: 900, // 15 seconds at 60fps
    maxInterval: 1200, // 20 seconds
    availableEffects: ['pointer_glitch', 'screen_shake'],
  },
  2: {
    minInterval: 720, // 12 seconds
    maxInterval: 900, // 15 seconds
    availableEffects: ['pointer_glitch', 'sensitivity_drop', 'screen_shake', 'zoom_warp', 'static_burst'],
  },
  3: {
    minInterval: 600, // 10 seconds
    maxInterval: 720, // 12 seconds
    availableEffects: [
      'pointer_glitch',
      'sensitivity_spike',
      'sensitivity_drop',
      'screen_shake',
      'zoom_warp',
      'color_invert',
      'static_burst',
    ],
  },
  4: {
    minInterval: 480, // 8 seconds
    maxInterval: 600, // 10 seconds
    availableEffects: [
      'pointer_glitch',
      'sensitivity_spike',
      'sensitivity_drop',
      'inverted_controls',
      'ghost_cursors',
      'screen_shake',
      'zoom_warp',
      'color_invert',
      'static_burst',
    ],
  },
  5: {
    minInterval: 480, // 8 seconds
    maxInterval: 600, // 10 seconds
    availableEffects: [
      'pointer_glitch',
      'sensitivity_spike',
      'sensitivity_drop',
      'inverted_controls',
      'ghost_cursors',
      'screen_shake',
      'zoom_warp',
      'color_invert',
      'static_burst',
    ],
  },
  6: {
    minInterval: 360, // 6 seconds
    maxInterval: 480, // 8 seconds
    availableEffects: [
      'pointer_glitch',
      'sensitivity_spike',
      'sensitivity_drop',
      'inverted_controls',
      'ghost_cursors',
      'screen_shake',
      'zoom_warp',
      'color_invert',
      'static_burst',
    ],
  },
};

export class ChaosManager {
  private game: Game;
  private effects: Map<string, ChaosEffect> = new Map();
  private activeEffect: ChaosEffect | null = null;
  private timer: number = 0;
  private nextTrigger: number = 0;
  private running: boolean = false;
  private paused: boolean = false;
  private currentLevel: number = 1;
  private immunityTimer: number = 0;

  constructor(game: Game) {
    this.game = game;
    this.initializeEffects();
  }

  private initializeEffects(): void {
    // Mouse chaos effects
    this.effects.set('pointer_glitch', new PointerGlitch(this.game));
    this.effects.set('sensitivity_spike', new SensitivitySpike(this.game));
    this.effects.set('sensitivity_drop', new SensitivityDrop(this.game));
    this.effects.set('inverted_controls', new InvertedControls(this.game));
    this.effects.set('ghost_cursors', new GhostCursors(this.game));

    // Visual chaos effects
    this.effects.set('screen_shake', new ScreenShake(this.game));
    this.effects.set('zoom_warp', new ZoomWarp(this.game));
    this.effects.set('color_invert', new ColorInvert(this.game));
    this.effects.set('static_burst', new StaticBurst(this.game));
  }

  setLevel(level: number): void {
    this.currentLevel = Math.min(Math.max(level, 1), 6);
    this.resetTimer();
  }

  start(): void {
    this.running = true;
    this.paused = false;
    this.resetTimer();
    this.setImmunity();
  }

  stop(): void {
    this.running = false;
    if (this.activeEffect) {
      this.activeEffect.stop();
      this.activeEffect = null;
    }
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
    this.setImmunity();
  }

  setImmunity(duration: number = 180): void {
    this.immunityTimer = duration;
  }

  private resetTimer(): void {
    const config = LEVEL_CONFIGS[this.currentLevel];
    this.nextTrigger =
      config.minInterval + Math.random() * (config.maxInterval - config.minInterval);
    this.timer = 0;
  }

  update(deltaTime: number): void {
    if (!this.running || this.paused) return;

    // Update immunity timer
    if (this.immunityTimer > 0) {
      this.immunityTimer -= deltaTime;
    }

    // Update active effect
    if (this.activeEffect) {
      this.activeEffect.update(deltaTime);
      if (!this.activeEffect.isActive()) {
        this.activeEffect.stop();
        this.activeEffect = null;
        this.game.eventBus.emit(GameEvents.CHAOS_ENDED);
        this.resetTimer();
      }
      return; // Don't trigger new effects while one is active
    }

    // Check if immune
    if (this.immunityTimer > 0) return;

    // Update timer
    this.timer += deltaTime;

    // Trigger new effect
    if (this.timer >= this.nextTrigger) {
      this.triggerRandomEffect();
    }
  }

  private triggerRandomEffect(): void {
    const config = LEVEL_CONFIGS[this.currentLevel];
    const availableEffects = config.availableEffects;

    // Pick random effect
    const effectName = availableEffects[Math.floor(Math.random() * availableEffects.length)];
    const effect = this.effects.get(effectName);

    if (effect) {
      this.activeEffect = effect;
      this.activeEffect.start();
      this.game.feedbackManager.chaosStart();
      this.game.eventBus.emit(GameEvents.CHAOS_STARTED, effectName);
    }
  }

  isActive(): boolean {
    return this.activeEffect !== null;
  }

  getActiveChaosName(): string {
    return this.activeEffect?.getName() || '';
  }
}
