import type { Game } from '../Game';

export abstract class ChaosEffect {
  protected game: Game;
  protected duration: number = 0;
  protected elapsed: number = 0;
  protected active: boolean = false;

  constructor(game: Game) {
    this.game = game;
  }

  abstract getName(): string;

  start(): void {
    this.elapsed = 0;
    this.active = true;
    this.onStart();
  }

  stop(): void {
    this.active = false;
    this.onStop();
  }

  update(deltaTime: number): void {
    if (!this.active) return;

    this.elapsed += deltaTime * (1000 / 60); // Convert to ms
    this.onUpdate(deltaTime);

    if (this.elapsed >= this.duration) {
      this.active = false;
    }
  }

  isActive(): boolean {
    return this.active;
  }

  getProgress(): number {
    return Math.min(this.elapsed / this.duration, 1);
  }

  protected abstract onStart(): void;
  protected abstract onUpdate(deltaTime: number): void;
  protected abstract onStop(): void;
}
