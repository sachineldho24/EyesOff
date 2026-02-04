import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';

export class SensitivityDrop extends ChaosEffect {
  constructor(game: Game) {
    super(game);
    this.duration = 4500; // 4-5 seconds
  }

  getName(): string {
    return 'SLUGGISH';
  }

  protected onStart(): void {
    this.game.inputManager.setSensitivity(0.3);
  }

  protected onUpdate(_deltaTime: number): void {
    // Effect is continuous
  }

  protected onStop(): void {
    this.game.inputManager.resetSensitivity();
  }
}
