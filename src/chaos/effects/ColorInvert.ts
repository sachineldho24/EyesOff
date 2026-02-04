import { ColorMatrixFilter } from 'pixi.js';
import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';

export class ColorInvert extends ChaosEffect {
  private filter: ColorMatrixFilter | null = null;

  constructor(game: Game) {
    super(game);
    this.duration = 3000; // 3 seconds
  }

  getName(): string {
    return 'INVERT';
  }

  protected onStart(): void {
    this.filter = new ColorMatrixFilter();
    this.filter.negative(true);
    this.game.app.stage.filters = [this.filter];
  }

  protected onUpdate(_deltaTime: number): void {
    // Effect is constant during duration
  }

  protected onStop(): void {
    this.game.app.stage.filters = [];
    this.filter = null;
  }
}
