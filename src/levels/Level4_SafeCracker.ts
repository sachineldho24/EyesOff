import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Level } from './Level';
import type { Game } from '../Game';
import { Game as GameClass } from '../Game';

export class Level4_SafeCracker extends Level {
  private dial!: Container;
  private dialAngle: number = 0;
  private combination: number[] = [];
  private currentStep: number = 0;
  private currentDirection: number = 1; // 1 = right (clockwise), -1 = left
  private expectedDirections = [1, -1, 1]; // R-L-R pattern
  private currentNumber: number = 0;
  private isDragging: boolean = false;
  private lastMouseAngle: number = 0;
  private numberDisplay!: Text;
  private combinationDisplay!: Container;
  private statusDisplay!: Text;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Safe background
    const background = new Graphics();
    background.rect(0, 0, GameClass.WIDTH, GameClass.HEIGHT);
    background.fill(0x1a1a1a);
    this.container.addChild(background);

    // Safe door
    const safeDoor = new Graphics();
    safeDoor.roundRect(300, 100, GameClass.WIDTH - 600, GameClass.HEIGHT - 200, 30);
    safeDoor.fill(0x3a3a3a);
    safeDoor.stroke({ color: 0x555555, width: 8 });
    this.container.addChild(safeDoor);

    // Metal texture pattern
    for (let i = 0; i < 20; i++) {
      const line = new Graphics();
      const y = 120 + i * 40;
      line.rect(320, y, GameClass.WIDTH - 640, 2);
      line.fill({ color: 0x444444, alpha: 0.3 });
      this.container.addChild(line);
    }

    // Create combination dial
    this.createDial();

    // Combination display (for Guide)
    this.createCombinationDisplay();

    // Instructions
    const instructionStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 22,
      fill: 0xaaaaaa,
    });

    const instructions = new Text({
      text: 'Turn the dial: RIGHT to first number, LEFT to second, RIGHT to third',
      style: instructionStyle,
    });
    instructions.anchor.set(0.5);
    instructions.position.set(GameClass.WIDTH / 2, GameClass.HEIGHT - 60);
    this.container.addChild(instructions);

    // Status display
    this.statusDisplay = new Text({
      text: 'Step 1: Turn RIGHT to ##',
      style: new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 28,
        fill: 0x00ffff,
      }),
    });
    this.statusDisplay.anchor.set(0.5);
    this.statusDisplay.position.set(GameClass.WIDTH / 2, 180);
    this.container.addChild(this.statusDisplay);
  }

  private createDial(): void {
    this.dial = new Container();
    this.dial.position.set(GameClass.WIDTH / 2, GameClass.HEIGHT / 2 + 50);
    this.container.addChild(this.dial);

    // Outer ring
    const outerRing = new Graphics();
    outerRing.circle(0, 0, 200);
    outerRing.fill(0x2a2a2a);
    outerRing.stroke({ color: 0x666666, width: 8 });
    this.dial.addChild(outerRing);

    // Inner dial
    const innerDial = new Graphics();
    innerDial.circle(0, 0, 170);
    innerDial.fill(0x1a1a1a);
    innerDial.stroke({ color: 0x444444, width: 4 });
    this.dial.addChild(innerDial);

    // Number markings
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2 - Math.PI / 2;
      const isMainMark = i % 10 === 0;
      const innerRadius = isMainMark ? 140 : 155;
      const outerRadius = 170;

      const mark = new Graphics();
      mark.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
      mark.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
      mark.stroke({ color: isMainMark ? 0xffffff : 0x666666, width: isMainMark ? 3 : 1 });
      this.dial.addChild(mark);

      // Number labels for main marks
      if (isMainMark) {
        const labelRadius = 125;
        const label = new Text({
          text: i.toString(),
          style: new TextStyle({
            fontFamily: 'Arial, sans-serif',
            fontSize: 18,
            fill: 0xffffff,
          }),
        });
        label.anchor.set(0.5);
        label.position.set(Math.cos(angle) * labelRadius, Math.sin(angle) * labelRadius);
        this.dial.addChild(label);
      }
    }

    // Center hub
    const centerHub = new Graphics();
    centerHub.circle(0, 0, 40);
    centerHub.fill(0x3a3a3a);
    centerHub.stroke({ color: 0x555555, width: 3 });
    this.dial.addChild(centerHub);

    // Dial handle/grip
    const grip = new Graphics();
    grip.roundRect(-15, -80, 30, 50, 5);
    grip.fill(0x666666);
    grip.stroke({ color: 0x888888, width: 2 });
    this.dial.addChild(grip);

    // Current number display
    this.numberDisplay = new Text({
      text: '00',
      style: new TextStyle({
        fontFamily: 'Courier New, monospace',
        fontSize: 48,
        fill: 0x00ff00,
        fontWeight: 'bold',
      }),
    });
    this.numberDisplay.anchor.set(0.5);
    this.numberDisplay.position.set(0, 0);
    this.dial.addChild(this.numberDisplay);

    // Indicator arrow (fixed position)
    const indicator = new Graphics();
    indicator.moveTo(0, -210);
    indicator.lineTo(-15, -235);
    indicator.lineTo(15, -235);
    indicator.closePath();
    indicator.fill(0xff0000);
    this.container.addChild(indicator);
    indicator.position.set(GameClass.WIDTH / 2, GameClass.HEIGHT / 2 + 50);

    // Make dial interactive
    this.dial.eventMode = 'static';
    this.dial.cursor = 'grab';
    this.dial.hitArea = { contains: (x: number, y: number) => x * x + y * y < 200 * 200 };
  }

  private createCombinationDisplay(): void {
    this.combinationDisplay = new Container();
    this.combinationDisplay.position.set(GameClass.WIDTH - 250, 200);
    this.container.addChild(this.combinationDisplay);

    const bg = new Graphics();
    bg.roundRect(0, 0, 200, 200, 10);
    bg.fill(0x1a1a1a);
    bg.stroke({ color: 0xffaa00, width: 2 });
    this.combinationDisplay.addChild(bg);

    const title = new Text({
      text: '🔐 COMBINATION',
      style: new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
        fill: 0xffaa00,
      }),
    });
    title.anchor.set(0.5);
    title.position.set(100, 25);
    this.combinationDisplay.addChild(title);
  }

  private updateCombinationDisplay(): void {
    // Remove old numbers
    while (this.combinationDisplay.children.length > 2) {
      this.combinationDisplay.removeChildAt(2);
    }

    const labels = ['1st (RIGHT)', '2nd (LEFT)', '3rd (RIGHT)'];

    this.combination.forEach((num, index) => {
      const y = 60 + index * 45;

      const text = new Text({
        text: `${labels[index]}: ${num.toString().padStart(2, '0')}`,
        style: new TextStyle({
          fontFamily: 'Courier New, monospace',
          fontSize: 18,
          fill: index < this.currentStep ? 0x00ff00 : 0xffffff,
        }),
      });
      text.position.set(20, y);
      this.combinationDisplay.addChild(text);

      if (index < this.currentStep) {
        const check = new Text({
          text: '✓',
          style: new TextStyle({ fontSize: 20, fill: 0x00ff00 }),
        });
        check.position.set(170, y);
        this.combinationDisplay.addChild(check);
      }
    });
  }

  private updateStatus(): void {
    if (this.currentStep >= 3) {
      this.statusDisplay.text = 'UNLOCKED!';
      this.statusDisplay.style.fill = 0x00ff00;
      return;
    }

    const direction = this.expectedDirections[this.currentStep] === 1 ? 'RIGHT' : 'LEFT';
    const target = this.combination[this.currentStep];
    this.statusDisplay.text = `Step ${this.currentStep + 1}: Turn ${direction} to ${target
      .toString()
      .padStart(2, '0')}`;
  }

  enter(): void {
    // Generate random combination
    this.combination = [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ];
    this.currentStep = 0;
    this.dialAngle = 0;
    this.currentNumber = 0;
    this.dial.rotation = 0;

    this.updateCombinationDisplay();
    this.updateStatus();
    this.numberDisplay.text = '00';
  }

  update(_deltaTime: number): void {
    const mouseX = this.getMouseX();
    const mouseY = this.getMouseY();
    const mouseDown = this.isMouseDown();

    // Calculate mouse position relative to dial center
    const dialCenterX = GameClass.WIDTH / 2;
    const dialCenterY = GameClass.HEIGHT / 2 + 50;
    const dx = mouseX - dialCenterX;
    const dy = mouseY - dialCenterY;
    const mouseAngle = Math.atan2(dy, dx);

    if (mouseDown) {
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);

      if (!this.isDragging && distFromCenter < 200) {
        // Start dragging
        this.isDragging = true;
        this.lastMouseAngle = mouseAngle;
        this.dial.cursor = 'grabbing';
      }

      if (this.isDragging) {
        // Calculate rotation delta
        let angleDelta = mouseAngle - this.lastMouseAngle;

        // Handle angle wrapping
        if (angleDelta > Math.PI) angleDelta -= Math.PI * 2;
        if (angleDelta < -Math.PI) angleDelta += Math.PI * 2;

        // Apply rotation
        this.dialAngle += angleDelta;
        this.dial.rotation = this.dialAngle;

        // Calculate current number (100 numbers = 2*PI radians)
        const rawNumber = ((-this.dialAngle / (Math.PI * 2)) * 100) % 100;
        this.currentNumber = Math.round(rawNumber < 0 ? rawNumber + 100 : rawNumber);
        this.numberDisplay.text = this.currentNumber.toString().padStart(2, '0');

        // Determine rotation direction
        this.currentDirection = angleDelta > 0 ? -1 : 1; // Clockwise = right

        // Check if we've hit the target number
        this.checkTarget();

        this.lastMouseAngle = mouseAngle;
      }
    } else {
      if (this.isDragging) {
        this.isDragging = false;
        this.dial.cursor = 'grab';
      }
    }
  }

  private checkTarget(): void {
    if (this.currentStep >= 3) return;

    const target = this.combination[this.currentStep];
    const expectedDir = this.expectedDirections[this.currentStep];

    // Check if we're on the target number with the correct direction
    if (this.currentNumber === target && this.currentDirection === expectedDir) {
      // Success!
      this.currentStep++;
      this.updateCombinationDisplay();
      this.updateStatus();
      this.game.feedbackManager.success();

      if (this.currentStep >= 3) {
        // Safe opened!
        setTimeout(() => this.complete(), 500);
      }
    }
  }

  exit(): void {
    this.isDragging = false;
  }
}
