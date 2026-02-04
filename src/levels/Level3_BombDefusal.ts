import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Level } from './Level';
import type { Game } from '../Game';
import { Game as GameClass } from '../Game';

interface Wire {
  graphics: Graphics;
  color: number;
  colorName: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlPoints: { x: number; y: number }[];
  cut: boolean;
  index: number;
}

export class Level3_BombDefusal extends Level {
  private wires: Wire[] = [];
  private sequence: number[] = [];
  private currentStep: number = 0;
  private sequenceDisplay!: Container;
  private readonly WIRE_COLORS = [
    { color: 0xff0000, name: 'RED' },
    { color: 0x0066ff, name: 'BLUE' },
    { color: 0x00cc00, name: 'GREEN' },
    { color: 0xffcc00, name: 'YELLOW' },
    { color: 0xffffff, name: 'WHITE' },
    { color: 0x333333, name: 'BLACK' },
  ];
  private readonly PENALTY_TIME = 5000; // 5 seconds

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Bomb casing background
    const background = new Graphics();
    background.rect(0, 0, GameClass.WIDTH, GameClass.HEIGHT);
    background.fill(0x1a1a1a);
    this.container.addChild(background);

    // Bomb panel
    const panel = new Graphics();
    panel.roundRect(200, 150, GameClass.WIDTH - 400, GameClass.HEIGHT - 300, 20);
    panel.fill(0x2a2a2a);
    panel.stroke({ color: 0x444444, width: 4 });
    this.container.addChild(panel);

    // Warning stripes
    this.addWarningStripes();

    // Title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial Black, sans-serif',
      fontSize: 36,
      fill: 0xff0000,
    });

    const title = new Text({ text: '⚠️ EXPLOSIVE DEVICE ⚠️', style: titleStyle });
    title.anchor.set(0.5);
    title.position.set(GameClass.WIDTH / 2, 100);
    this.container.addChild(title);

    // Sequence display panel
    this.createSequenceDisplay();

    // Wire panel
    this.createWirePanel();

    // Instructions
    const instructionStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 20,
      fill: 0x888888,
    });

    const instructions = new Text({
      text: 'Cut the wires in the correct sequence. Wrong wire = +5 second penalty.',
      style: instructionStyle,
    });
    instructions.anchor.set(0.5);
    instructions.position.set(GameClass.WIDTH / 2, GameClass.HEIGHT - 80);
    this.container.addChild(instructions);
  }

  private addWarningStripes(): void {
    const stripeWidth = 30;
    const stripeHeight = 20;

    for (let x = 0; x < GameClass.WIDTH; x += stripeWidth * 2) {
      const stripe = new Graphics();
      stripe.rect(x, 0, stripeWidth, stripeHeight);
      stripe.fill(0xffcc00);
      stripe.rect(x, GameClass.HEIGHT - stripeHeight, stripeWidth, stripeHeight);
      stripe.fill(0xffcc00);
      this.container.addChild(stripe);
    }
  }

  private createSequenceDisplay(): void {
    this.sequenceDisplay = new Container();
    this.sequenceDisplay.position.set(GameClass.WIDTH - 350, 200);
    this.container.addChild(this.sequenceDisplay);

    // Panel background
    const bg = new Graphics();
    bg.roundRect(0, 0, 280, 350, 10);
    bg.fill(0x1a1a1a);
    bg.stroke({ color: 0x00ff00, width: 2 });
    this.sequenceDisplay.addChild(bg);

    // Title
    const title = new Text({
      text: 'CUT SEQUENCE',
      style: new TextStyle({
        fontFamily: 'Courier New, monospace',
        fontSize: 18,
        fill: 0x00ff00,
      }),
    });
    title.anchor.set(0.5);
    title.position.set(140, 30);
    this.sequenceDisplay.addChild(title);
  }

  private updateSequenceDisplay(): void {
    // Remove old sequence items
    while (this.sequenceDisplay.children.length > 2) {
      this.sequenceDisplay.removeChildAt(2);
    }

    // Add sequence items
    this.sequence.forEach((wireIndex, step) => {
      const wire = this.wires[wireIndex];
      const y = 70 + step * 70;

      // Step number
      const stepText = new Text({
        text: `${step + 1}.`,
        style: new TextStyle({
          fontFamily: 'Courier New, monospace',
          fontSize: 24,
          fill: step < this.currentStep ? 0x00ff00 : 0xffffff,
        }),
      });
      stepText.position.set(20, y);
      this.sequenceDisplay.addChild(stepText);

      // Color indicator
      const colorBox = new Graphics();
      colorBox.roundRect(60, y - 5, 40, 30, 5);
      colorBox.fill(wire.color);
      colorBox.stroke({ color: 0xffffff, width: 1 });
      this.sequenceDisplay.addChild(colorBox);

      // Color name
      const colorText = new Text({
        text: wire.colorName,
        style: new TextStyle({
          fontFamily: 'Arial, sans-serif',
          fontSize: 20,
          fill: step < this.currentStep ? 0x00ff00 : 0xffffff,
        }),
      });
      colorText.position.set(110, y);
      this.sequenceDisplay.addChild(colorText);

      // Checkmark if completed
      if (step < this.currentStep) {
        const check = new Text({
          text: '✓',
          style: new TextStyle({
            fontFamily: 'Arial, sans-serif',
            fontSize: 28,
            fill: 0x00ff00,
          }),
        });
        check.position.set(240, y - 5);
        this.sequenceDisplay.addChild(check);
      }
    });
  }

  private createWirePanel(): void {
    const panelX = 250;
    const panelY = 200;
    const panelWidth = 600;
    const panelHeight = 500;

    // Wire connection points
    const startY = panelY + 50;
    const endY = panelY + panelHeight - 50;
    const wireSpacing = panelWidth / 7;

    // Create wires with tangled paths
    this.wires = [];

    this.WIRE_COLORS.forEach((wireColor, index) => {
      const startX = panelX + 50 + index * wireSpacing;

      // Randomize end position for tangling
      const endIndex = this.shuffleIndex(index, this.WIRE_COLORS.length);
      const endX = panelX + 50 + endIndex * wireSpacing;

      // Generate control points for bezier curve (tangling)
      const controlPoints = this.generateControlPoints(startX, startY, endX, endY, index);

      const wire: Wire = {
        graphics: new Graphics(),
        color: wireColor.color,
        colorName: wireColor.name,
        startX,
        startY,
        endX,
        endY,
        controlPoints,
        cut: false,
        index,
      };

      this.drawWire(wire);
      this.container.addChild(wire.graphics);
      this.wires.push(wire);
    });
  }

  private shuffleIndex(index: number, length: number): number {
    // Create some randomization for wire end positions
    const offsets = [-2, -1, 0, 1, 2];
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    return Math.max(0, Math.min(length - 1, index + offset));
  }

  private generateControlPoints(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    _index: number
  ): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const segments = 3;

    for (let i = 1; i <= segments; i++) {
      const t = i / (segments + 1);
      const baseX = startX + (endX - startX) * t;
      const baseY = startY + (endY - startY) * t;

      // Add random offset for tangling
      const offsetX = (Math.random() - 0.5) * 150;
      const offsetY = (Math.random() - 0.5) * 50;

      points.push({ x: baseX + offsetX, y: baseY + offsetY });
    }

    return points;
  }

  private drawWire(wire: Wire): void {
    wire.graphics.clear();

    if (wire.cut) {
      // Draw cut wire segments
      const midY = (wire.startY + wire.endY) / 2;

      wire.graphics.moveTo(wire.startX, wire.startY);
      wire.graphics.lineTo(wire.startX + 10, midY - 20);
      wire.graphics.stroke({ color: wire.color, width: 8 });

      wire.graphics.moveTo(wire.endX - 10, midY + 20);
      wire.graphics.lineTo(wire.endX, wire.endY);
      wire.graphics.stroke({ color: wire.color, width: 8 });
    } else {
      // Draw full wire with bezier curves
      wire.graphics.moveTo(wire.startX, wire.startY);

      const points = [
        { x: wire.startX, y: wire.startY },
        ...wire.controlPoints,
        { x: wire.endX, y: wire.endY },
      ];

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const midX = (p0.x + p1.x) / 2;
        const midY = (p0.y + p1.y) / 2;

        wire.graphics.quadraticCurveTo(p0.x, (p0.y + midY) / 2, midX, midY);
      }

      wire.graphics.lineTo(wire.endX, wire.endY);
      wire.graphics.stroke({ color: wire.color, width: 8 });

      // Add connector circles
      wire.graphics.circle(wire.startX, wire.startY, 12);
      wire.graphics.fill(wire.color);
      wire.graphics.stroke({ color: 0xffffff, width: 2 });

      wire.graphics.circle(wire.endX, wire.endY, 12);
      wire.graphics.fill(wire.color);
      wire.graphics.stroke({ color: 0xffffff, width: 2 });
    }

    // Make wire interactive
    wire.graphics.eventMode = 'static';
    wire.graphics.cursor = 'crosshair';
    wire.graphics.hitArea = {
      contains: (x: number, y: number) => this.isPointNearWire(wire, x, y),
    };
    wire.graphics.on('pointerdown', () => this.onWireCut(wire));
  }

  private isPointNearWire(wire: Wire, x: number, y: number): boolean {
    if (wire.cut) return false;

    // Check distance from wire path
    const threshold = 20;

    const points = [
      { x: wire.startX, y: wire.startY },
      ...wire.controlPoints,
      { x: wire.endX, y: wire.endY },
    ];

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const dist = this.pointToSegmentDistance(x, y, p1.x, p1.y, p2.x, p2.y);
      if (dist < threshold) return true;
    }

    return false;
  }

  private pointToSegmentDistance(
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

    if (lengthSq === 0) {
      return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
    }

    let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
    t = Math.max(0, Math.min(1, t));

    const nearestX = x1 + t * dx;
    const nearestY = y1 + t * dy;

    return Math.sqrt((px - nearestX) ** 2 + (py - nearestY) ** 2);
  }

  private onWireCut(wire: Wire): void {
    if (wire.cut) return;

    const expectedWireIndex = this.sequence[this.currentStep];

    if (wire.index === expectedWireIndex) {
      // Correct wire!
      wire.cut = true;
      this.drawWire(wire);
      this.currentStep++;
      this.updateSequenceDisplay();
      this.game.feedbackManager.success();

      if (this.currentStep >= this.sequence.length) {
        this.complete();
      }
    } else {
      // Wrong wire!
      this.addPenalty(this.PENALTY_TIME);
      this.game.feedbackManager.error();
    }
  }

  enter(): void {
    // Generate random sequence (4 wires)
    const indices = [0, 1, 2, 3, 4, 5];
    this.sequence = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * indices.length);
      this.sequence.push(indices[randomIndex]);
      indices.splice(randomIndex, 1);
    }

    this.currentStep = 0;

    // Reset wires
    this.wires.forEach((wire) => {
      wire.cut = false;
      this.drawWire(wire);
    });

    this.updateSequenceDisplay();
  }

  update(_deltaTime: number): void {
    // Hover effects handled by PixiJS
  }

  exit(): void {
    // Clean up
  }
}
