import { Game } from '../Game';
import { EventBus, GameEvents } from './EventBus';

export interface InputState {
  // Raw mouse position
  rawX: number;
  rawY: number;
  // Modified position (after chaos effects)
  x: number;
  y: number;
  // Mouse state
  isDown: boolean;
  isDragging: boolean;
  // Drag data
  dragStartX: number;
  dragStartY: number;
}

export interface ChaosModifiers {
  sensitivityMultiplier: number;
  invertX: boolean;
  invertY: boolean;
  offsetX: number;
  offsetY: number;
}

export class InputManager {
  private game: Game;
  private eventBus: EventBus;

  private state: InputState = {
    rawX: 0,
    rawY: 0,
    x: 0,
    y: 0,
    isDown: false,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
  };

  private modifiers: ChaosModifiers = {
    sensitivityMultiplier: 1,
    invertX: false,
    invertY: false,
    offsetX: 0,
    offsetY: 0,
  };

  private lastRawX: number = 0;
  private lastRawY: number = 0;
  private centerX: number = 0;
  private centerY: number = 0;

  constructor(game: Game) {
    this.game = game;
    this.eventBus = game.eventBus;
  }

  init(): void {
    const canvas = this.game.app.canvas;

    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));

    // Initialize center point for sensitivity calculations
    this.centerX = Game.WIDTH / 2;
    this.centerY = Game.HEIGHT / 2;
    this.lastRawX = this.centerX;
    this.lastRawY = this.centerY;
    this.state.rawX = this.centerX;
    this.state.rawY = this.centerY;
    this.state.x = this.centerX;
    this.state.y = this.centerY;
  }

  private getGameCoords(event: MouseEvent): { x: number; y: number } {
    const canvas = this.game.app.canvas;
    const rect = canvas.getBoundingClientRect();
    const scaleX = Game.WIDTH / rect.width;
    const scaleY = Game.HEIGHT / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  private onMouseMove(event: MouseEvent): void {
    const coords = this.getGameCoords(event);

    // Calculate delta from last position
    const deltaX = coords.x - this.lastRawX;
    const deltaY = coords.y - this.lastRawY;

    // Store raw position
    this.lastRawX = coords.x;
    this.lastRawY = coords.y;
    this.state.rawX = coords.x;
    this.state.rawY = coords.y;

    // Apply chaos modifiers
    let modifiedDeltaX = deltaX * this.modifiers.sensitivityMultiplier;
    let modifiedDeltaY = deltaY * this.modifiers.sensitivityMultiplier;

    if (this.modifiers.invertX) modifiedDeltaX = -modifiedDeltaX;
    if (this.modifiers.invertY) modifiedDeltaY = -modifiedDeltaY;

    // Update modified position
    this.state.x = Math.max(0, Math.min(Game.WIDTH, this.state.x + modifiedDeltaX + this.modifiers.offsetX));
    this.state.y = Math.max(0, Math.min(Game.HEIGHT, this.state.y + modifiedDeltaY + this.modifiers.offsetY));

    // Reset offset after applying
    this.modifiers.offsetX = 0;
    this.modifiers.offsetY = 0;
  }

  private onMouseDown(event: MouseEvent): void {
    this.state.isDown = true;
    this.state.dragStartX = this.state.x;
    this.state.dragStartY = this.state.y;

    this.eventBus.emit(GameEvents.CLICK, this.state.x, this.state.y, event.button);
  }

  private onMouseUp(_event: MouseEvent): void {
    if (this.state.isDragging) {
      this.eventBus.emit(GameEvents.DRAG_END, this.state.x, this.state.y);
    }
    this.state.isDown = false;
    this.state.isDragging = false;
  }

  private onMouseLeave(_event: MouseEvent): void {
    this.state.isDown = false;
    this.state.isDragging = false;
  }

  // Public API
  getState(): InputState {
    return { ...this.state };
  }

  getX(): number {
    return this.state.x;
  }

  getY(): number {
    return this.state.y;
  }

  isDown(): boolean {
    return this.state.isDown;
  }

  isDragging(): boolean {
    return this.state.isDragging;
  }

  startDrag(): void {
    if (this.state.isDown && !this.state.isDragging) {
      this.state.isDragging = true;
      this.eventBus.emit(GameEvents.DRAG_START, this.state.x, this.state.y);
    }
  }

  // Chaos effect modifiers
  setSensitivity(multiplier: number): void {
    this.modifiers.sensitivityMultiplier = multiplier;
  }

  resetSensitivity(): void {
    this.modifiers.sensitivityMultiplier = 1;
  }

  setInvertX(invert: boolean): void {
    this.modifiers.invertX = invert;
  }

  setInvertY(invert: boolean): void {
    this.modifiers.invertY = invert;
  }

  resetInvert(): void {
    this.modifiers.invertX = false;
    this.modifiers.invertY = false;
  }

  addOffset(x: number, y: number): void {
    this.modifiers.offsetX += x;
    this.modifiers.offsetY += y;
  }

  // Reset cursor to center
  resetPosition(): void {
    this.state.x = this.centerX;
    this.state.y = this.centerY;
  }
}

