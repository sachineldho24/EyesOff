import { Graphics, Text, TextStyle } from 'pixi.js';
import { Level } from './Level';
import type { Game } from '../Game';
import { Game as GameClass } from '../Game';

interface Laser {
  graphics: Graphics;
  type: 'static' | 'sweeping' | 'blinking' | 'gate';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  sweepRange: number;
  sweepSpeed: number;
  blinkState: boolean;
  blinkTimer: number;
  blinkDuration: number;
  gateOpen: boolean;
  gateTimer: number;
  active: boolean;
}

interface Checkpoint {
  x: number;
  y: number;
  reached: boolean;
}

export class Level5_LaserHeist extends Level {
  private lasers: Laser[] = [];
  private checkpoints: Checkpoint[] = [];
  private startPos = { x: 100, y: GameClass.HEIGHT / 2 };
  private exitPos = { x: GameClass.WIDTH - 100, y: GameClass.HEIGHT / 2 };
  private cursorRadius: number = 15;
  private frozen: boolean = false;
  private frozenTimer: number = 0;
  private readonly FREEZE_DURATION = 180; // 3 seconds at 60fps
  private readonly FREEZE_PENALTY = 3000; // 3 seconds

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Dark vault background
    const background = new Graphics();
    background.rect(0, 0, GameClass.WIDTH, GameClass.HEIGHT);
    background.fill(0x0a0808);
    this.container.addChild(background);

    // Grid pattern (floor tiles)
    for (let x = 0; x < GameClass.WIDTH; x += 100) {
      for (let y = 0; y < GameClass.HEIGHT; y += 100) {
        const tile = new Graphics();
        tile.rect(x, y, 100, 100);
        tile.stroke({ color: 0x1a1515, width: 1 });
        this.container.addChild(tile);
      }
    }

    // Create zones
    this.createZone1(); // Easy
    this.createZone2(); // Medium
    this.createZone3(); // Hard

    // Create checkpoints
    this.createCheckpoints();

    // Start point
    const startMarker = new Graphics();
    startMarker.circle(this.startPos.x, this.startPos.y, 40);
    startMarker.fill({ color: 0x00ff00, alpha: 0.3 });
    startMarker.stroke({ color: 0x00ff00, width: 3 });
    this.container.addChild(startMarker);

    const startLabel = new Text({
      text: 'START',
      style: new TextStyle({ fontFamily: 'Arial', fontSize: 16, fill: 0x00ff00 }),
    });
    startLabel.anchor.set(0.5);
    startLabel.position.set(this.startPos.x, this.startPos.y + 60);
    this.container.addChild(startLabel);

    // Exit point
    const exitMarker = new Graphics();
    exitMarker.circle(this.exitPos.x, this.exitPos.y, 40);
    exitMarker.fill({ color: 0xffaa00, alpha: 0.3 });
    exitMarker.stroke({ color: 0xffaa00, width: 3 });
    this.container.addChild(exitMarker);

    const exitLabel = new Text({
      text: 'EXIT',
      style: new TextStyle({ fontFamily: 'Arial', fontSize: 16, fill: 0xffaa00 }),
    });
    exitLabel.anchor.set(0.5);
    exitLabel.position.set(this.exitPos.x, this.exitPos.y + 60);
    this.container.addChild(exitLabel);

    // Zone labels
    this.addZoneLabel('ZONE 1: LOBBY', 300, 50);
    this.addZoneLabel('ZONE 2: GALLERY', 800, 50);
    this.addZoneLabel('ZONE 3: VAULT', 1400, 50);
  }

  private addZoneLabel(text: string, x: number, y: number): void {
    const label = new Text({
      text,
      style: new TextStyle({ fontFamily: 'Arial', fontSize: 20, fill: 0x666666 }),
    });
    label.anchor.set(0.5);
    label.position.set(x, y);
    this.container.addChild(label);
  }

  private createZone1(): void {
    // Zone 1: Easy - Static beams + 1 slow sweeping
    this.createLaser('static', 250, 150, 250, 450);
    this.createLaser('static', 400, 300, 400, 600);
    this.createLaser('static', 300, 700, 500, 700);
    this.createLaser('sweeping', 450, 400, 550, 400, { sweepRange: 60, sweepSpeed: 0.02 });
  }

  private createZone2(): void {
    // Zone 2: Medium - Mix of types
    this.createLaser('static', 650, 200, 650, 500);
    this.createLaser('static', 800, 400, 800, 700);
    this.createLaser('sweeping', 700, 300, 850, 300, { sweepRange: 45, sweepSpeed: 0.03 });
    this.createLaser('sweeping', 900, 500, 1000, 500, { sweepRange: 50, sweepSpeed: 0.025 });
    this.createLaser('blinking', 750, 600, 950, 600, { blinkDuration: 90 });
    this.createLaser('blinking', 850, 150, 850, 350, { blinkDuration: 120 });
  }

  private createZone3(): void {
    // Zone 3: Hard - Dense grid
    this.createLaser('static', 1100, 200, 1100, 500);
    this.createLaser('static', 1250, 300, 1250, 700);
    this.createLaser('static', 1400, 150, 1400, 400);
    this.createLaser('sweeping', 1150, 400, 1300, 400, { sweepRange: 40, sweepSpeed: 0.04 });
    this.createLaser('sweeping', 1350, 550, 1500, 550, { sweepRange: 50, sweepSpeed: 0.035 });
    this.createLaser('sweeping', 1200, 650, 1350, 650, { sweepRange: 35, sweepSpeed: 0.045 });
    this.createLaser('blinking', 1450, 300, 1600, 300, { blinkDuration: 75 });
    this.createLaser('gate', 1550, 400, 1550, 600, { blinkDuration: 100 });
  }

  private createLaser(
    type: Laser['type'],
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options?: { sweepRange?: number; sweepSpeed?: number; blinkDuration?: number }
  ): void {
    const graphics = new Graphics();
    this.container.addChild(graphics);

    const laser: Laser = {
      graphics,
      type,
      x1,
      y1,
      x2,
      y2,
      angle: Math.atan2(y2 - y1, x2 - x1),
      sweepRange: options?.sweepRange || 45,
      sweepSpeed: options?.sweepSpeed || 0.02,
      blinkState: true,
      blinkTimer: 0,
      blinkDuration: options?.blinkDuration || 60,
      gateOpen: false,
      gateTimer: 0,
      active: true,
    };

    this.lasers.push(laser);
  }

  private createCheckpoints(): void {
    this.checkpoints = [
      { x: 550, y: GameClass.HEIGHT / 2, reached: false },
      { x: 1000, y: GameClass.HEIGHT / 2, reached: false },
      { x: 1500, y: GameClass.HEIGHT / 2, reached: false },
    ];

    this.checkpoints.forEach((cp, index) => {
      const marker = new Graphics();
      marker.circle(cp.x, cp.y, 25);
      marker.fill({ color: 0x00aaff, alpha: 0.2 });
      marker.stroke({ color: 0x00aaff, width: 2, alpha: 0.5 });
      this.container.addChild(marker);

      const label = new Text({
        text: `CP${index + 1}`,
        style: new TextStyle({ fontFamily: 'Arial', fontSize: 12, fill: 0x00aaff }),
      });
      label.anchor.set(0.5);
      label.position.set(cp.x, cp.y);
      this.container.addChild(label);
    });
  }

  private updateLasers(deltaTime: number): void {
    this.lasers.forEach((laser) => {
      laser.graphics.clear();

      switch (laser.type) {
        case 'sweeping': {
          const sweep = Math.sin(Date.now() * laser.sweepSpeed) * laser.sweepRange;
          const sweepAngle = (sweep * Math.PI) / 180;
          const length = Math.sqrt((laser.x2 - laser.x1) ** 2 + (laser.y2 - laser.y1) ** 2);
          const newX2 = laser.x1 + Math.cos(laser.angle + sweepAngle) * length;
          const newY2 = laser.y1 + Math.sin(laser.angle + sweepAngle) * length;
          this.drawLaserBeam(laser.graphics, laser.x1, laser.y1, newX2, newY2);
          laser.active = true;
          break;
        }
        case 'blinking': {
          laser.blinkTimer += deltaTime;
          if (laser.blinkTimer >= laser.blinkDuration) {
            laser.blinkTimer = 0;
            laser.blinkState = !laser.blinkState;
          }
          if (laser.blinkState) {
            this.drawLaserBeam(laser.graphics, laser.x1, laser.y1, laser.x2, laser.y2);
          }
          laser.active = laser.blinkState;
          break;
        }
        case 'gate': {
          laser.gateTimer += deltaTime;
          if (laser.gateTimer >= laser.blinkDuration) {
            laser.gateTimer = 0;
            laser.gateOpen = !laser.gateOpen;
          }
          if (!laser.gateOpen) {
            this.drawLaserBeam(laser.graphics, laser.x1, laser.y1, laser.x2, laser.y2);
          }
          laser.active = !laser.gateOpen;
          break;
        }
        default:
          this.drawLaserBeam(laser.graphics, laser.x1, laser.y1, laser.x2, laser.y2);
          laser.active = true;
      }
    });
  }

  private drawLaserBeam(g: Graphics, x1: number, y1: number, x2: number, y2: number): void {
    // Glow effect
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke({ color: 0xff0000, width: 12, alpha: 0.3 });

    // Core beam
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke({ color: 0xff0000, width: 4 });

    // Bright center
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke({ color: 0xff6666, width: 2 });

    // Emitter points
    g.circle(x1, y1, 8);
    g.fill(0xff0000);
    g.circle(x2, y2, 8);
    g.fill(0xff0000);
  }

  private checkLaserCollision(x: number, y: number): boolean {
    for (const laser of this.lasers) {
      if (!laser.active) continue;

      let x1 = laser.x1,
        y1 = laser.y1,
        x2 = laser.x2,
        y2 = laser.y2;

      // For sweeping lasers, calculate current position
      if (laser.type === 'sweeping') {
        const sweep = Math.sin(Date.now() * laser.sweepSpeed) * laser.sweepRange;
        const sweepAngle = (sweep * Math.PI) / 180;
        const length = Math.sqrt((laser.x2 - laser.x1) ** 2 + (laser.y2 - laser.y1) ** 2);
        x2 = laser.x1 + Math.cos(laser.angle + sweepAngle) * length;
        y2 = laser.y1 + Math.sin(laser.angle + sweepAngle) * length;
      }

      const dist = this.pointToLineDistance(x, y, x1, y1, x2, y2);
      if (dist < this.cursorRadius + 4) {
        return true;
      }
    }
    return false;
  }

  private pointToLineDistance(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSq = dx * dx + dy * dy;

    if (lengthSq === 0) return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);

    let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));

    const nearestX = x1 + t * dx;
    const nearestY = y1 + t * dy;

    return Math.sqrt((px - nearestX) ** 2 + (py - nearestY) ** 2);
  }

  private checkCheckpoints(x: number, y: number): void {
    this.checkpoints.forEach((cp) => {
      if (!cp.reached) {
        const dist = Math.sqrt((x - cp.x) ** 2 + (y - cp.y) ** 2);
        if (dist < 30) {
          cp.reached = true;
          this.game.feedbackManager.success();
        }
      }
    });
  }

  private checkExit(x: number, y: number): boolean {
    const dist = Math.sqrt((x - this.exitPos.x) ** 2 + (y - this.exitPos.y) ** 2);
    return dist < 40;
  }

  private respawnAtCheckpoint(): void {
    this.game.inputManager.resetPosition();
  }

  enter(): void {
    this.frozen = false;
    this.frozenTimer = 0;
    this.checkpoints.forEach((cp) => (cp.reached = false));
  }

  update(deltaTime: number): void {
    // Update laser animations
    this.updateLasers(deltaTime);

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

    // Check laser collision
    if (this.checkLaserCollision(mouseX, mouseY)) {
      this.addPenalty(this.FREEZE_PENALTY);
      this.frozen = true;
      this.frozenTimer = this.FREEZE_DURATION;
      this.respawnAtCheckpoint();
    }
  }

  exit(): void {
    // Clean up
  }
}
