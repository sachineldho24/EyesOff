import { Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';

export class TransitionScene extends Scene {
  private levelText!: Text;
  private levelNameText!: Text;
  private countdownText!: Text;
  private timer: number = 0;
  private duration: number = 180; // 3 seconds at 60fps
  private nextLevel: number = 1;
  private callback: (() => void) | null = null;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Background
    const background = new Graphics();
    background.rect(0, 0, Game.WIDTH, Game.HEIGHT);
    background.fill(0x0a0a0a);
    this.container.addChild(background);

    // Level number
    const levelStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 48,
      fill: 0x888888,
    });

    this.levelText = new Text({ text: 'LEVEL 1', style: levelStyle });
    this.levelText.anchor.set(0.5);
    this.levelText.position.set(Game.WIDTH / 2, Game.HEIGHT / 2 - 80);
    this.container.addChild(this.levelText);

    // Level name
    const nameStyle = new TextStyle({
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: 72,
      fontWeight: 'bold',
      fill: 0xffffff,
    });

    this.levelNameText = new Text({ text: 'Digital Cleanup', style: nameStyle });
    this.levelNameText.anchor.set(0.5);
    this.levelNameText.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
    this.container.addChild(this.levelNameText);

    // Countdown
    const countdownStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 36,
      fill: 0x00ffff,
    });

    this.countdownText = new Text({ text: 'Starting in 3...', style: countdownStyle });
    this.countdownText.anchor.set(0.5);
    this.countdownText.position.set(Game.WIDTH / 2, Game.HEIGHT / 2 + 100);
    this.container.addChild(this.countdownText);

    // Progress bar background
    const progressBg = new Graphics();
    progressBg.roundRect(Game.WIDTH / 2 - 200, Game.HEIGHT - 150, 400, 20, 5);
    progressBg.fill(0x333333);
    this.container.addChild(progressBg);
  }

  enter(data?: Record<string, unknown>): void {
    this.timer = 0;

    if (data) {
      this.nextLevel = (data.level as number) || 1;
      this.callback = (data.callback as () => void) || null;
    }

    const levelName = this.game.gameData.getCurrentLevelName();
    this.levelText.text = `LEVEL ${this.nextLevel}`;
    this.levelNameText.text = levelName;
    this.countdownText.text = 'Starting in 3...';
  }

  update(deltaTime: number): void {
    this.timer += deltaTime;

    const progress = this.timer / this.duration;
    const secondsLeft = Math.ceil(3 - progress * 3);

    if (secondsLeft > 0) {
      this.countdownText.text = `Starting in ${secondsLeft}...`;
    } else {
      this.countdownText.text = 'GO!';
    }

    // Update progress bar
    const progressBar = new Graphics();
    progressBar.roundRect(
      Game.WIDTH / 2 - 200,
      Game.HEIGHT - 150,
      400 * Math.min(progress, 1),
      20,
      5
    );
    progressBar.fill(0x00ffff);

    // Remove old progress bar and add new one
    if (this.container.children.length > 5) {
      this.container.removeChildAt(5);
    }
    this.container.addChild(progressBar);

    // Transition complete
    if (this.timer >= this.duration) {
      if (this.callback) {
        const cb = this.callback;
        this.callback = null; // Prevent multiple calls
        cb();
      }
    }
  }

  exit(): void {
    this.callback = null;
  }
}
