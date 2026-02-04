import type { Game } from '../Game';

interface FeedbackEffect {
  type: 'shake' | 'flash' | 'pulse';
  duration: number;
  elapsed: number;
  intensity: number;
  color?: number;
}

export class FeedbackManager {
  private game: Game;
  private effects: FeedbackEffect[] = [];
  private originalX: number = 0;
  private originalY: number = 0;

  constructor(game: Game) {
    this.game = game;
  }

  init(): void {
    this.originalX = this.game.app.stage.position.x;
    this.originalY = this.game.app.stage.position.y;
  }

  update(deltaTime: number): void {
    // Process active effects
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const effect = this.effects[i];
      effect.elapsed += deltaTime * (1000 / 60); // Convert to ms

      if (effect.elapsed >= effect.duration) {
        // Effect finished
        this.endEffect(effect);
        this.effects.splice(i, 1);
      } else {
        // Apply effect
        this.applyEffect(effect);
      }
    }

    // Reset stage position if no shake effects
    if (!this.effects.some((e) => e.type === 'shake')) {
      this.game.app.stage.position.set(this.originalX, this.originalY);
    }
  }

  private applyEffect(effect: FeedbackEffect): void {
    const progress = effect.elapsed / effect.duration;

    switch (effect.type) {
      case 'shake':
        this.applyShake(effect.intensity, progress);
        break;
      case 'flash':
        // Flash is handled through scene overlay
        break;
      case 'pulse':
        // Pulse is handled through scale
        break;
    }
  }

  private applyShake(intensity: number, progress: number): void {
    // Decrease intensity over time
    const currentIntensity = intensity * (1 - progress);
    const offsetX = (Math.random() - 0.5) * 2 * currentIntensity;
    const offsetY = (Math.random() - 0.5) * 2 * currentIntensity;

    this.game.app.stage.position.set(this.originalX + offsetX, this.originalY + offsetY);
  }

  private endEffect(effect: FeedbackEffect): void {
    switch (effect.type) {
      case 'shake':
        this.game.app.stage.position.set(this.originalX, this.originalY);
        break;
    }
  }

  // Public methods to trigger effects
  shake(duration: number = 300, intensity: number = 10): void {
    this.effects.push({
      type: 'shake',
      duration,
      elapsed: 0,
      intensity,
    });
  }

  flash(duration: number = 100, color: number = 0xffffff): void {
    this.effects.push({
      type: 'flash',
      duration,
      elapsed: 0,
      intensity: 1,
      color,
    });
  }

  pulse(duration: number = 200, intensity: number = 0.1): void {
    this.effects.push({
      type: 'pulse',
      duration,
      elapsed: 0,
      intensity,
    });
  }

  // Success feedback
  success(): void {
    this.flash(150, 0x00ff00);
  }

  // Error feedback
  error(): void {
    this.shake(200, 8);
    this.flash(100, 0xff0000);
  }

  // Chaos event feedback
  chaosStart(): void {
    this.flash(200, 0xff00ff);
  }

  clear(): void {
    this.effects = [];
    this.game.app.stage.position.set(this.originalX, this.originalY);
  }
}
