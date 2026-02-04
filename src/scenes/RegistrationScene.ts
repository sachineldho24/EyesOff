import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';

export class RegistrationScene extends Scene {
  private titleText!: Text;
  private inputDisplay!: Text;
  private promptText!: Text;
  private errorText!: Text;
  private inputBox!: Graphics;
  private submitButton!: Container;
  private teamName: string = '';
  private cursorVisible: boolean = true;
  private cursorTimer: number = 0;
  private maxLength: number = 20;
  private minLength: number = 3;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Background
    const background = new Graphics();
    background.rect(0, 0, Game.WIDTH, Game.HEIGHT);
    background.fill(0x0a0a0a);
    this.container.addChild(background);

    // Title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 64,
      fontWeight: 'bold',
      fill: 0xffffff,
    });

    this.titleText = new Text({ text: 'TEAM REGISTRATION', style: titleStyle });
    this.titleText.anchor.set(0.5);
    this.titleText.position.set(Game.WIDTH / 2, 200);
    this.container.addChild(this.titleText);

    // Prompt
    const promptStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 28,
      fill: 0x888888,
    });

    this.promptText = new Text({ text: 'Enter your team name:', style: promptStyle });
    this.promptText.anchor.set(0.5);
    this.promptText.position.set(Game.WIDTH / 2, 350);
    this.container.addChild(this.promptText);

    // Input box
    this.inputBox = new Graphics();
    this.inputBox.roundRect(Game.WIDTH / 2 - 300, 400, 600, 80, 10);
    this.inputBox.fill(0x1a1a1a);
    this.inputBox.stroke({ color: 0x00ffff, width: 2 });
    this.container.addChild(this.inputBox);

    // Input text display
    const inputStyle = new TextStyle({
      fontFamily: 'Courier New, monospace',
      fontSize: 36,
      fill: 0xffffff,
    });

    this.inputDisplay = new Text({ text: '', style: inputStyle });
    this.inputDisplay.anchor.set(0, 0.5);
    this.inputDisplay.position.set(Game.WIDTH / 2 - 280, 440);
    this.container.addChild(this.inputDisplay);

    // Error text
    const errorStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 20,
      fill: 0xff4444,
    });

    this.errorText = new Text({ text: '', style: errorStyle });
    this.errorText.anchor.set(0.5);
    this.errorText.position.set(Game.WIDTH / 2, 510);
    this.container.addChild(this.errorText);

    // Submit button
    this.submitButton = this.createButton('START GAME', Game.WIDTH / 2, 600);
    this.container.addChild(this.submitButton);

    // Instructions
    const instructionStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 18,
      fill: 0x666666,
    });

    const instructions = new Text({
      text: `Team name must be ${this.minLength}-${this.maxLength} characters`,
      style: instructionStyle,
    });
    instructions.anchor.set(0.5);
    instructions.position.set(Game.WIDTH / 2, 700);
    this.container.addChild(instructions);
  }

  private createButton(label: string, x: number, y: number): Container {
    const button = new Container();
    button.position.set(x, y);

    const bg = new Graphics();
    bg.roundRect(-150, -30, 300, 60, 8);
    bg.fill(0x00ffff);
    button.addChild(bg);

    const text = new Text({
      text: label,
      style: new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0x000000,
      }),
    });
    text.anchor.set(0.5);
    button.addChild(text);

    button.eventMode = 'static';
    button.cursor = 'pointer';
    button.on('pointerover', () => {
      bg.tint = 0xaaffff;
    });
    button.on('pointerout', () => {
      bg.tint = 0xffffff;
    });
    button.on('pointerdown', () => this.onSubmit());

    return button;
  }

  enter(): void {
    this.teamName = '';
    this.updateInputDisplay();
    this.errorText.text = '';

    // Add keyboard listener
    window.addEventListener('keydown', this.onKeyDown);
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.onSubmit();
      return;
    }

    if (event.key === 'Backspace') {
      this.teamName = this.teamName.slice(0, -1);
      this.updateInputDisplay();
      return;
    }

    // Only allow alphanumeric and spaces
    if (event.key.length === 1 && /^[a-zA-Z0-9 ]$/.test(event.key)) {
      if (this.teamName.length < this.maxLength) {
        this.teamName += event.key;
        this.updateInputDisplay();
      }
    }
  };

  private updateInputDisplay(): void {
    this.inputDisplay.text = this.teamName + (this.cursorVisible ? '|' : '');
  }

  private onSubmit(): void {
    const trimmedName = this.teamName.trim();

    if (trimmedName.length < this.minLength) {
      this.errorText.text = `Team name must be at least ${this.minLength} characters`;
      this.game.feedbackManager.error();
      return;
    }

    if (trimmedName.length > this.maxLength) {
      this.errorText.text = `Team name must be at most ${this.maxLength} characters`;
      this.game.feedbackManager.error();
      return;
    }

    // Save team name and proceed
    this.game.gameData.setTeamName(trimmedName);
    this.game.sceneManager.switchTo('tutorial');
  }

  update(deltaTime: number): void {
    // Blink cursor
    this.cursorTimer += deltaTime;
    if (this.cursorTimer > 30) {
      this.cursorTimer = 0;
      this.cursorVisible = !this.cursorVisible;
      this.updateInputDisplay();
    }
  }

  exit(): void {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
