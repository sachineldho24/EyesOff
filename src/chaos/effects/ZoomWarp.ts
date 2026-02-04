import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';
import { Game as GameClass } from '../../Game';

export class ZoomWarp extends ChaosEffect {
  private zoomIn: boolean = true;
  private maxZoom: number = 1.3;
  private minZoom: number = 0.8;

  constructor(game: Game) {
    super(game);
    this.duration = 2000; // 2 seconds
  }

  getName(): string {
    return 'ZOOM';
  }

  protected onStart(): void {
    // Randomly decide zoom in or out
    this.zoomIn = Math.random() > 0.5;
  }

  protected onUpdate(_deltaTime: number): void {
    const progress = this.getProgress();

    // Zoom in then out (or vice versa)
    let scale: number;
    if (progress < 0.5) {
      // First half: zoom
      const zoomProgress = progress * 2;
      scale = this.zoomIn
        ? 1 + (this.maxZoom - 1) * zoomProgress
        : 1 - (1 - this.minZoom) * zoomProgress;
    } else {
      // Second half: return to normal
      const returnProgress = (progress - 0.5) * 2;
      scale = this.zoomIn
        ? this.maxZoom - (this.maxZoom - 1) * returnProgress
        : this.minZoom + (1 - this.minZoom) * returnProgress;
    }

    // Apply scale from center
    this.game.app.stage.scale.set(scale);
    this.game.app.stage.position.set(
      (GameClass.WIDTH / 2) * (1 - scale),
      (GameClass.HEIGHT / 2) * (1 - scale)
    );
  }

  protected onStop(): void {
    this.game.app.stage.scale.set(1);
    this.game.app.stage.position.set(0, 0);
  }
}
