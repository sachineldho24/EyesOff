import { Container } from 'pixi.js';
import type { Game } from '../Game';

export abstract class Scene {
  protected game: Game;
  public container: Container;
  public initialized: boolean = false;

  constructor(game: Game) {
    this.game = game;
    this.container = new Container();
  }

  // Called once when scene is first accessed
  abstract init(): Promise<void> | void;

  // Called when scene becomes active
  abstract enter(data?: Record<string, unknown>): Promise<void> | void;

  // Called every frame while scene is active
  abstract update(deltaTime: number): void;

  // Called when leaving this scene
  abstract exit(): Promise<void> | void;

  // Helper to clear container
  protected clearContainer(): void {
    while (this.container.children.length > 0) {
      this.container.removeChildAt(0);
    }
  }
}
