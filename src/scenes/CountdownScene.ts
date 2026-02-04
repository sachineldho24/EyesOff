import { Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';

export class CountdownScene extends Scene {
  private countdownText!: Text;
  private currentCount: number = 3;
  private timer: number = 0;
  private countdownDuration: number = 60; // frames per number
  private started: boolean = false;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Background
    const background = new Graphics();
    background.rect(0, 0, Game.WIDTH, Game.HEIGHT);
    background.fill(0x0a0a0a);
    this.container.addChild(background);

    // Countdown text
    const countdownStyle = new TextStyle({
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: 300,
      fontWeight: 'bold',
      fill: 0xffffff,
      dropShadow: {
        color: 0x00ffff,
        blur: 30,
        distance: 0,
      },
    });

    this.countdownText = new Text({ text: '3', style: countdownStyle });
    this.countdownText.anchor.set(0.5);
    this.countdownText.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
    this.container.addChild(this.countdownText);

    // Team name
    const teamStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 32,
      fill: 0x888888,
    });

    const teamText = new Text({ text: '', style: teamStyle });
    teamText.anchor.set(0.5);
    teamText.position.set(Game.WIDTH / 2, 150);
    this.container.addChild(teamText);

    // "Get Ready" text
    const readyStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 48,
      fill: 0x00ffff,
    });

    const readyText = new Text({ text: 'GET READY!', style: readyStyle });
    readyText.anchor.set(0.5);
    readyText.position.set(Game.WIDTH / 2, Game.HEIGHT - 200);
    this.container.addChild(readyText);
  }

  enter(): void {
    this.currentCount = 3;
    this.timer = 0;
    this.started = false;
    this.countdownText.text = '3';
    this.countdownText.scale.set(1);
    this.countdownText.alpha = 1;

    // Update team name
    const teamText = this.container.children.find(
      (child) => child instanceof Text && child.position.y === 150
    ) as Text | undefined;
    if (teamText) {
      teamText.text = `Team: ${this.game.gameData.teamName}`;
    }

    this.started = true;
  }

  update(deltaTime: number): void {
    if (!this.started) return;

    this.timer += deltaTime;

    // Animate current number
    const progress = this.timer / this.countdownDuration;
    const scale = 1 + progress * 0.3;
    const alpha = 1 - progress * 0.5;

    this.countdownText.scale.set(scale);
    this.countdownText.alpha = Math.max(0.5, alpha);

    // Move to next number
    if (this.timer >= this.countdownDuration) {
      this.timer = 0;
      this.currentCount--;

      if (this.currentCount > 0) {
        this.countdownText.text = this.currentCount.toString();
        this.countdownText.scale.set(1);
        this.countdownText.alpha = 1;

        // Flash effect
        this.game.feedbackManager.flash(100, 0x00ffff);
      } else if (this.currentCount === 0) {
        // Show "GO!"
        this.countdownText.text = 'GO!';
        this.countdownText.style.fill = 0x00ff00;
        this.countdownText.scale.set(1);
        this.countdownText.alpha = 1;

        // Big flash
        this.game.feedbackManager.flash(200, 0x00ff00);
      } else {
        // Start the game
        this.started = false;
        this.game.startGame();
      }
    }
  }

  exit(): void {
    this.countdownText.style.fill = 0xffffff;
  }
}
