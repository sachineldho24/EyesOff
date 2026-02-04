import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';

export class ScreenShake extends ChaosEffect {
  private intensity: number = 15;

  constructor(game: Game) {
    super(game);
    this.duration = 3000; // 3 seconds
  }

  getName(): string {
    return 'SHAKE';
  }

  protected onStart(): void {
    // Shake handled in onUpdate
  }

  protected onUpdate(_deltaTime: number): void {
    const progress = this.getProgress();
    const currentIntensity = this.intensity * (1 - progress * 0.5);

    const offsetX = (Math.random() - 0.5) * 2 * currentIntensity;
    const offsetY = (Math.random() - 0.5) * 2 * currentIntensity;

    this.game.app.stage.position.set(offsetX, offsetY);
  }

  protected onStop(): void {
    this.game.app.stage.position.set(0, 0);
  }
}
