import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';

export class InvertedControls extends ChaosEffect {
  constructor(game: Game) {
    super(game);
    this.duration = 5500; // 5-6 seconds
  }

  getName(): string {
    return 'INVERTED';
  }

  protected onStart(): void {
    this.game.inputManager.setInvertX(true);
    this.game.inputManager.setInvertY(true);
  }

  protected onUpdate(_deltaTime: number): void {
    // Effect is continuous
  }

  protected onStop(): void {
    this.game.inputManager.resetInvert();
  }
}
