import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Level } from './Level';
import type { Game } from '../Game';
import { Game as GameClass } from '../Game';

interface Key {
  container: Container;
  char: string;
  x: number;
  y: number;
}

export class Level2_PasswordPanic extends Level {
  private keys: Key[] = [];
  private keysContainer!: Container;
  private password: string = '';
  private currentInput: string = '';
  private correctCount: number = 0;
  private shuffleThreshold: number = 2;
  private passwordDisplay!: Text;
  private inputDisplay!: Text;

  private readonly PASSWORDS = [
    'run4it',
    'bypass7',
    'crack2',
    'go1den',
    'hack3r',
    'c0de99',
    'key123',
    'pass42',
  ];

  private readonly KEY_LAYOUT = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ];

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Terminal background
    const background = new Graphics();
    background.rect(0, 0, GameClass.WIDTH, GameClass.HEIGHT);
    background.fill(0x0a0a0a);
    this.container.addChild(background);

    // Scanlines effect
    for (let y = 0; y < GameClass.HEIGHT; y += 4) {
      const line = new Graphics();
      line.rect(0, y, GameClass.WIDTH, 1);
      line.fill({ color: 0x000000, alpha: 0.2 });
      this.container.addChild(line);
    }

    // Terminal header
    const headerStyle = new TextStyle({
      fontFamily: 'Courier New, monospace',
      fontSize: 28,
      fill: 0x00ff00,
    });

    const header = new Text({ text: '[ SYSTEM ACCESS TERMINAL ]', style: headerStyle });
    header.anchor.set(0.5);
    header.position.set(GameClass.WIDTH / 2, 80);
    this.container.addChild(header);

    // Password display (for Guide only)
    const passwordLabel = new Text({
      text: 'TARGET PASSWORD:',
      style: new TextStyle({
        fontFamily: 'Courier New, monospace',
        fontSize: 20,
        fill: 0x888888,
      }),
    });
    passwordLabel.anchor.set(0.5);
    passwordLabel.position.set(GameClass.WIDTH / 2, 150);
    this.container.addChild(passwordLabel);

    this.passwordDisplay = new Text({
      text: '',
      style: new TextStyle({
        fontFamily: 'Courier New, monospace',
        fontSize: 48,
        fill: 0x00ffff,
        letterSpacing: 8,
      }),
    });
    this.passwordDisplay.anchor.set(0.5);
    this.passwordDisplay.position.set(GameClass.WIDTH / 2, 200);
    this.container.addChild(this.passwordDisplay);

    // Input display
    const inputBox = new Graphics();
    inputBox.roundRect(GameClass.WIDTH / 2 - 250, 270, 500, 70, 8);
    inputBox.fill(0x1a1a1a);
    inputBox.stroke({ color: 0x00ff00, width: 2 });
    this.container.addChild(inputBox);

    this.inputDisplay = new Text({
      text: '_ _ _ _ _ _',
      style: new TextStyle({
        fontFamily: 'Courier New, monospace',
        fontSize: 40,
        fill: 0x00ff00,
        letterSpacing: 8,
      }),
    });
    this.inputDisplay.anchor.set(0.5);
    this.inputDisplay.position.set(GameClass.WIDTH / 2, 305);
    this.container.addChild(this.inputDisplay);

    // Keyboard container
    this.keysContainer = new Container();
    this.keysContainer.position.set(GameClass.WIDTH / 2, 500);
    this.container.addChild(this.keysContainer);

    // Create keyboard
    this.createKeyboard();
  }

  private createKeyboard(): void {
    this.keys = [];
    const keyWidth = 70;
    const keyHeight = 70;
    const keySpacing = 10;

    this.KEY_LAYOUT.forEach((row, rowIndex) => {
      const rowWidth = row.length * (keyWidth + keySpacing) - keySpacing;
      const startX = -rowWidth / 2;

      row.forEach((char, colIndex) => {
        const x = startX + colIndex * (keyWidth + keySpacing);
        const y = rowIndex * (keyHeight + keySpacing);

        const key = this.createKey(char, x, y, keyWidth, keyHeight);
        this.keys.push(key);
        this.keysContainer.addChild(key.container);
      });
    });
  }

  private createKey(char: string, x: number, y: number, width: number, height: number): Key {
    const container = new Container();
    container.position.set(x, y);

    const bg = new Graphics();
    bg.roundRect(0, 0, width, height, 8);
    bg.fill(0x2a2a2a);
    bg.stroke({ color: 0x444444, width: 2 });
    container.addChild(bg);

    const text = new Text({
      text: char.toUpperCase(),
      style: new TextStyle({
        fontFamily: 'Courier New, monospace',
        fontSize: 28,
        fill: 0xffffff,
        fontWeight: 'bold',
      }),
    });
    text.anchor.set(0.5);
    text.position.set(width / 2, height / 2);
    container.addChild(text);

    container.eventMode = 'static';
    container.cursor = 'pointer';
    container.on('pointerdown', () => this.onKeyPress(char));
    container.on('pointerover', () => {
      bg.tint = 0x00ff00;
    });
    container.on('pointerout', () => {
      bg.tint = 0xffffff;
    });

    return { container, char, x, y };
  }

  private shuffleKeyboard(): void {
    // Get all character positions
    const positions = this.keys.map((k) => ({ x: k.x, y: k.y }));

    // Shuffle positions
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Apply shuffled positions with animation
    this.keys.forEach((key, index) => {
      key.x = positions[index].x;
      key.y = positions[index].y;
      key.container.position.set(key.x, key.y);
    });

    this.game.feedbackManager.shake(200, 5);
  }

  private onKeyPress(char: string): void {
    if (char === '⌫') {
      // Backspace
      if (this.currentInput.length > 0) {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateInputDisplay();
      }
      return;
    }

    if (this.currentInput.length >= this.password.length) return;

    const expectedChar = this.password[this.currentInput.length];

    if (char.toLowerCase() === expectedChar.toLowerCase()) {
      // Correct!
      this.currentInput += char;
      this.correctCount++;
      this.updateInputDisplay();
      this.game.feedbackManager.success();

      // Check for shuffle
      if (this.correctCount % this.shuffleThreshold === 0) {
        this.shuffleKeyboard();
      }

      // Check for completion
      if (this.currentInput.length === this.password.length) {
        this.complete();
      }
    } else {
      // Wrong key - visual feedback but allow retry
      this.game.feedbackManager.error();
    }
  }

  private updateInputDisplay(): void {
    let display = '';
    for (let i = 0; i < this.password.length; i++) {
      if (i < this.currentInput.length) {
        display += this.currentInput[i].toUpperCase();
      } else {
        display += '_';
      }
      if (i < this.password.length - 1) display += ' ';
    }
    this.inputDisplay.text = display;
  }

  enter(): void {
    // Pick random password
    this.password = this.PASSWORDS[Math.floor(Math.random() * this.PASSWORDS.length)];
    this.currentInput = '';
    this.correctCount = 0;

    // Update displays
    this.passwordDisplay.text = this.password.toUpperCase();
    this.updateInputDisplay();

    // Reset keyboard positions
    this.keysContainer.removeChildren();
    this.createKeyboard();
  }

  update(_deltaTime: number): void {
    // Check for hover states handled by PixiJS events
  }

  exit(): void {
    // Clean up
  }
}
