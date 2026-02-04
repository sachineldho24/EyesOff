import { Graphics, Text, TextStyle } from 'pixi.js';
import { Level } from './Level';
import type { Game } from '../Game';
import { Game as GameClass } from '../Game';

interface MazeCell {
  x: number;
  y: number;
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
  visited: boolean;
}

export class Level6_MazeEscape extends Level {
  private mazeGraphics!: Graphics;
  private cellSize: number = 60;
  private cols: number = 28;
  private rows: number = 14;
  private maze: MazeCell[][] = [];
  private startPos = { x: 0, y: 0 };
  private exitPos = { x: 0, y: 0 };
  private checkpoints: { x: number; y: number; reached: boolean }[] = [];
  private cursorRadius: number = 12;
  private frozen: boolean = false;
  private frozenTimer: number = 0;
  private readonly FREEZE_DURATION = 180; // 3 seconds
  private readonly FREEZE_PENALTY = 3000; // 3 seconds
  private mazeOffsetX: number = 0;
  private mazeOffsetY: number = 0;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Dark background
    const background = new Graphics();
    background.rect(0, 0, GameClass.WIDTH, GameClass.HEIGHT);
    background.fill(0x0a0a0a);
    this.container.addChild(background);

    // Calculate maze position (centered)
    this.mazeOffsetX = (GameClass.WIDTH - this.cols * this.cellSize) / 2;
    this.mazeOffsetY = (GameClass.HEIGHT - this.rows * this.cellSize) / 2;

    // Generate maze
    this.generateMaze();

    // Create maze graphics
    this.mazeGraphics = new Graphics();
    this.container.addChild(this.mazeGraphics);
    this.drawMaze();

    // Add start marker
    const startMarker = new Graphics();
    startMarker.circle(this.startPos.x, this.startPos.y, 25);
    startMarker.fill({ color: 0x00ff00, alpha: 0.5 });
    startMarker.stroke({ color: 0x00ff00, width: 3 });
    this.container.addChild(startMarker);

    const startLabel = new Text({
      text: 'START',
      style: new TextStyle({ fontFamily: 'Arial', fontSize: 14, fill: 0x00ff00 }),
    });
    startLabel.anchor.set(0.5);
    startLabel.position.set(this.startPos.x, this.startPos.y - 40);
    this.container.addChild(startLabel);

    // Add exit marker
    const exitMarker = new Graphics();
    exitMarker.circle(this.exitPos.x, this.exitPos.y, 25);
    exitMarker.fill({ color: 0xffaa00, alpha: 0.5 });
    exitMarker.stroke({ color: 0xffaa00, width: 3 });
    this.container.addChild(exitMarker);

    const exitLabel = new Text({
      text: 'EXIT',
      style: new TextStyle({ fontFamily: 'Arial', fontSize: 14, fill: 0xffaa00 }),
    });
    exitLabel.anchor.set(0.5);
    exitLabel.position.set(this.exitPos.x, this.exitPos.y - 40);
    this.container.addChild(exitLabel);

    // Add checkpoints
    this.addCheckpointMarkers();

    // Instructions
    const instructions = new Text({
      text: 'Navigate to EXIT without touching walls. Wall touch = +3 second freeze.',
      style: new TextStyle({ fontFamily: 'Arial', fontSize: 18, fill: 0x888888 }),
    });
    instructions.anchor.set(0.5);
    instructions.position.set(GameClass.WIDTH / 2, GameClass.HEIGHT - 30);
    this.container.addChild(instructions);
  }

  private generateMaze(): void {
    // Initialize grid
    this.maze = [];
    for (let row = 0; row < this.rows; row++) {
      this.maze[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.maze[row][col] = {
          x: col,
          y: row,
          walls: { top: true, right: true, bottom: true, left: true },
          visited: false,
        };
      }
    }

    // Generate maze using recursive backtracking
    const stack: MazeCell[] = [];
    const startCell = this.maze[0][0];
    startCell.visited = true;
    stack.push(startCell);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = this.getUnvisitedNeighbors(current);

      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.removeWall(current, next);
        next.visited = true;
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    // Set start position (top-left)
    this.startPos = {
      x: this.mazeOffsetX + this.cellSize / 2,
      y: this.mazeOffsetY + this.cellSize / 2,
    };

    // Set exit position (bottom-right)
    this.exitPos = {
      x: this.mazeOffsetX + (this.cols - 0.5) * this.cellSize,
      y: this.mazeOffsetY + (this.rows - 0.5) * this.cellSize,
    };

    // Remove entrance and exit walls
    this.maze[0][0].walls.left = false;
    this.maze[this.rows - 1][this.cols - 1].walls.right = false;

    // Add checkpoints
    this.checkpoints = [
      {
        x: this.mazeOffsetX + Math.floor(this.cols / 3) * this.cellSize + this.cellSize / 2,
        y: this.mazeOffsetY + Math.floor(this.rows / 2) * this.cellSize + this.cellSize / 2,
        reached: false,
      },
      {
        x: this.mazeOffsetX + Math.floor((this.cols * 2) / 3) * this.cellSize + this.cellSize / 2,
        y: this.mazeOffsetY + Math.floor(this.rows / 3) * this.cellSize + this.cellSize / 2,
        reached: false,
      },
      {
        x: this.mazeOffsetX + Math.floor((this.cols * 3) / 4) * this.cellSize + this.cellSize / 2,
        y: this.mazeOffsetY + Math.floor((this.rows * 2) / 3) * this.cellSize + this.cellSize / 2,
        reached: false,
      },
    ];
  }

  private getUnvisitedNeighbors(cell: MazeCell): MazeCell[] {
    const neighbors: MazeCell[] = [];
    const { x, y } = cell;

    if (y > 0 && !this.maze[y - 1][x].visited) neighbors.push(this.maze[y - 1][x]);
    if (x < this.cols - 1 && !this.maze[y][x + 1].visited) neighbors.push(this.maze[y][x + 1]);
    if (y < this.rows - 1 && !this.maze[y + 1][x].visited) neighbors.push(this.maze[y + 1][x]);
    if (x > 0 && !this.maze[y][x - 1].visited) neighbors.push(this.maze[y][x - 1]);

    return neighbors;
  }

  private removeWall(current: MazeCell, next: MazeCell): void {
    const dx = next.x - current.x;
    const dy = next.y - current.y;

    if (dx === 1) {
      current.walls.right = false;
      next.walls.left = false;
    } else if (dx === -1) {
      current.walls.left = false;
      next.walls.right = false;
    } else if (dy === 1) {
      current.walls.bottom = false;
      next.walls.top = false;
    } else if (dy === -1) {
      current.walls.top = false;
      next.walls.bottom = false;
    }
  }

  private drawMaze(): void {
    this.mazeGraphics.clear();

    const wallThickness = 4;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.maze[row][col];
        const x = this.mazeOffsetX + col * this.cellSize;
        const y = this.mazeOffsetY + row * this.cellSize;

        // Draw walls
        if (cell.walls.top) {
          this.mazeGraphics.rect(x, y, this.cellSize, wallThickness);
          this.mazeGraphics.fill(0x00ffff);
        }
        if (cell.walls.right) {
          this.mazeGraphics.rect(x + this.cellSize - wallThickness, y, wallThickness, this.cellSize);
          this.mazeGraphics.fill(0x00ffff);
        }
        if (cell.walls.bottom) {
          this.mazeGraphics.rect(x, y + this.cellSize - wallThickness, this.cellSize, wallThickness);
          this.mazeGraphics.fill(0x00ffff);
        }
        if (cell.walls.left) {
          this.mazeGraphics.rect(x, y, wallThickness, this.cellSize);
          this.mazeGraphics.fill(0x00ffff);
        }
      }
    }
  }

  private addCheckpointMarkers(): void {
    this.checkpoints.forEach((cp, index) => {
      const marker = new Graphics();
      marker.circle(cp.x, cp.y, 15);
      marker.fill({ color: 0x00aaff, alpha: 0.3 });
      marker.stroke({ color: 0x00aaff, width: 2 });
      this.container.addChild(marker);

      const label = new Text({
        text: `${index + 1}`,
        style: new TextStyle({ fontFamily: 'Arial', fontSize: 14, fill: 0x00aaff }),
      });
      label.anchor.set(0.5);
      label.position.set(cp.x, cp.y);
      this.container.addChild(label);
    });
  }

  private checkWallCollision(x: number, y: number): boolean {
    // Check which cell the cursor is in
    const col = Math.floor((x - this.mazeOffsetX) / this.cellSize);
    const row = Math.floor((y - this.mazeOffsetY) / this.cellSize);

    // Check bounds
    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) {
      return true; // Outside maze
    }

    const cell = this.maze[row][col];
    const cellX = this.mazeOffsetX + col * this.cellSize;
    const cellY = this.mazeOffsetY + row * this.cellSize;
    const wallThickness = 4;
    const buffer = this.cursorRadius;

    // Check collision with each wall
    if (cell.walls.top && y - buffer < cellY + wallThickness) return true;
    if (cell.walls.bottom && y + buffer > cellY + this.cellSize - wallThickness) return true;
    if (cell.walls.left && x - buffer < cellX + wallThickness) return true;
    if (cell.walls.right && x + buffer > cellX + this.cellSize - wallThickness) return true;

    // Check adjacent cells for corner cases
    if (col > 0) {
      const leftCell = this.maze[row][col - 1];
      if (leftCell.walls.right && x - buffer < cellX + wallThickness) return true;
    }
    if (col < this.cols - 1) {
      const rightCell = this.maze[row][col + 1];
      if (rightCell.walls.left && x + buffer > cellX + this.cellSize - wallThickness) return true;
    }
    if (row > 0) {
      const topCell = this.maze[row - 1][col];
      if (topCell.walls.bottom && y - buffer < cellY + wallThickness) return true;
    }
    if (row < this.rows - 1) {
      const bottomCell = this.maze[row + 1][col];
      if (bottomCell.walls.top && y + buffer > cellY + this.cellSize - wallThickness) return true;
    }

    return false;
  }

  private checkCheckpoints(x: number, y: number): void {
    this.checkpoints.forEach((cp) => {
      if (!cp.reached) {
        const dist = Math.sqrt((x - cp.x) ** 2 + (y - cp.y) ** 2);
        if (dist < 20) {
          cp.reached = true;
          this.game.feedbackManager.success();
        }
      }
    });
  }

  private checkExit(x: number, y: number): boolean {
    const dist = Math.sqrt((x - this.exitPos.x) ** 2 + (y - this.exitPos.y) ** 2);
    return dist < 30;
  }

  private respawnAtCheckpoint(): void {
    // In a full implementation, we'd teleport the cursor here
    this.game.inputManager.resetPosition();
  }

  enter(): void {
    this.frozen = false;
    this.frozenTimer = 0;
    this.checkpoints.forEach((cp) => (cp.reached = false));

    // Reset cursor to start position
    this.game.inputManager.resetPosition();
  }

  update(deltaTime: number): void {
    if (this.frozen) {
      this.frozenTimer -= deltaTime;
      if (this.frozenTimer <= 0) {
        this.frozen = false;
      }
      return;
    }

    const mouseX = this.getMouseX();
    const mouseY = this.getMouseY();

    // Check checkpoint progress
    this.checkCheckpoints(mouseX, mouseY);

    // Check exit
    if (this.checkExit(mouseX, mouseY)) {
      this.complete();
      return;
    }

    // Check wall collision
    if (this.checkWallCollision(mouseX, mouseY)) {
      this.addPenalty(this.FREEZE_PENALTY);
      this.frozen = true;
      this.frozenTimer = this.FREEZE_DURATION;
      this.game.feedbackManager.error();
      this.respawnAtCheckpoint();
    }
  }

  exit(): void {
    // Clean up
  }
}
