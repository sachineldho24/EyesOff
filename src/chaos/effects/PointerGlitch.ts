import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';

export class PointerGlitch extends ChaosEffect {
  constructor(game: Game) {
    super(game);
    this.duration = 3500; // 3-4 seconds
  }

  getName(): string {
    return 'GLITCH';
  }

  protected onStart(): void {
    // Visual effect handled in onUpdate
  }

  protected onUpdate(_deltaTime: number): void {
    // Add visual jitter to cursor (InputManager handles actual position)
    // This creates a visual disturbance without affecting actual cursor position
    const jitterX = (Math.random() - 0.5) * 20;
    const jitterY = (Math.random() - 0.5) * 20;
    this.game.inputManager.addOffset(jitterX, jitterY);
  }

  protected onStop(): void {
    // Reset any visual effects
  }
}
