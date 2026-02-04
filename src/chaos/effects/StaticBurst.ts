import { Graphics } from 'pixi.js';
import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';
import { Game as GameClass } from '../../Game';

export class StaticBurst extends ChaosEffect {
  private staticOverlay: Graphics | null = null;
  private pixelSize: number = 8;

  constructor(game: Game) {
    super(game);
    this.duration = 2000; // 2 seconds
  }

  getName(): string {
    return 'STATIC';
  }

  protected onStart(): void {
    this.staticOverlay = new Graphics();
    this.staticOverlay.zIndex = 998;
    this.game.app.stage.addChild(this.staticOverlay);
  }

  protected onUpdate(_deltaTime: number): void {
    if (!this.staticOverlay) return;

    this.staticOverlay.clear();

    const progress = this.getProgress();
    const alpha = 0.4 * (1 - progress * 0.5);

    // Draw random static pixels
    const cols = Math.ceil(GameClass.WIDTH / this.pixelSize);
    const rows = Math.ceil(GameClass.HEIGHT / this.pixelSize);

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        // Only draw some pixels (sparse static)
        if (Math.random() > 0.7) {
          const brightness = Math.random();
          const color = Math.floor(brightness * 255);
          const hexColor = (color << 16) | (color << 8) | color;

          this.staticOverlay.rect(
            x * this.pixelSize,
            y * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          );
          this.staticOverlay.fill({ color: hexColor, alpha });
        }
      }
    }
  }

  protected onStop(): void {
    if (this.staticOverlay) {
      this.game.app.stage.removeChild(this.staticOverlay);
      this.staticOverlay.destroy();
      this.staticOverlay = null;
    }
  }
}
