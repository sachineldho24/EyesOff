import { Container } from 'pixi.js';
import type { Game } from '../Game';

export abstract class Level {
  protected game: Game;
  public container: Container;
  public initialized: boolean = false;
  public onComplete: (() => void) | null = null;

  constructor(game: Game) {
    this.game = game;
    this.container = new Container();
  }

  // Called once when level is first accessed
  abstract init(): void;

  // Called when level becomes active
  abstract enter(): void;

  // Called every frame while level is active
  abstract update(deltaTime: number): void;

  // Called when leaving this level
  abstract exit(): void;

  // Call this when level is completed
  protected complete(): void {
    if (this.onComplete) {
      this.onComplete();
    }
  }

  // Helper to add penalty time
  protected addPenalty(milliseconds: number): void {
    this.game.timer.addPenalty(milliseconds);
    this.game.feedbackManager.error();
  }

  // Helper to get mouse position
  protected getMouseX(): number {
    return this.game.inputManager.getX();
  }

  protected getMouseY(): number {
    return this.game.inputManager.getY();
  }

  protected isMouseDown(): boolean {
    return this.game.inputManager.isDown();
  }

  // Helper to clear container
  protected clearContainer(): void {
    while (this.container.children.length > 0) {
      this.container.removeChildAt(0);
    }
  }
}
