import { Graphics } from 'pixi.js';
import { ChaosEffect } from '../ChaosEffect';
import type { Game } from '../../Game';

export class GhostCursors extends ChaosEffect {
  private ghostCursors: Graphics[] = [];
  private positions: { x: number; y: number }[] = [];
  private historyLength: number = 10;
  private positionHistory: { x: number; y: number }[] = [];

  constructor(game: Game) {
    super(game);
    this.duration = 4000; // 4 seconds
  }

  getName(): string {
    return 'GHOSTS';
  }

  protected onStart(): void {
    // Create 2-3 ghost cursors
    const numGhosts = 2 + Math.floor(Math.random() * 2);

    for (let i = 0; i < numGhosts; i++) {
      const ghost = new Graphics();
      ghost.circle(0, 0, 12);
      ghost.fill({ color: 0x00ffff, alpha: 0.5 });
      ghost.circle(0, 0, 6);
      ghost.fill({ color: 0xffffff, alpha: 0.5 });
      ghost.zIndex = 999;

      this.ghostCursors.push(ghost);
      this.game.app.stage.addChild(ghost);

      // Initialize positions with offset
      this.positions.push({
        x: this.game.inputManager.getX() + (Math.random() - 0.5) * 100,
        y: this.game.inputManager.getY() + (Math.random() - 0.5) * 100,
      });
    }

    this.positionHistory = [];
  }

  protected onUpdate(_deltaTime: number): void {
    const currentX = this.game.inputManager.getX();
    const currentY = this.game.inputManager.getY();

    // Add current position to history
    this.positionHistory.push({ x: currentX, y: currentY });
    if (this.positionHistory.length > this.historyLength * this.ghostCursors.length) {
      this.positionHistory.shift();
    }

    // Update ghost positions with delay
    this.ghostCursors.forEach((ghost, index) => {
      const delay = (index + 1) * 5; // Different delay for each ghost
      const historyIndex = Math.max(0, this.positionHistory.length - delay);

      if (this.positionHistory[historyIndex]) {
        // Add some random offset
        const offset = 30 + index * 20;
        ghost.position.set(
          this.positionHistory[historyIndex].x + Math.sin(Date.now() / 200 + index) * offset,
          this.positionHistory[historyIndex].y + Math.cos(Date.now() / 200 + index) * offset
        );
      }

      // Fade based on progress
      ghost.alpha = 0.5 * (1 - this.getProgress() * 0.5);
    });
  }

  protected onStop(): void {
    // Remove ghost cursors
    this.ghostCursors.forEach((ghost) => {
      this.game.app.stage.removeChild(ghost);
      ghost.destroy();
    });
    this.ghostCursors = [];
    this.positions = [];
    this.positionHistory = [];
  }
}
