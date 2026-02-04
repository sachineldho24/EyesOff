import { Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';

export class SplashScene extends Scene {
  private title!: Text;
  private subtitle!: Text;
  private promptText!: Text;
  private background!: Graphics;
  private blinkTimer: number = 0;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Background
    this.background = new Graphics();
    this.background.rect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.background.fill(0x0a0a0a);
    this.container.addChild(this.background);

    // Title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: 120,
      fontWeight: 'bold',
      fill: 0xffffff,
      dropShadow: {
        color: 0x00ffff,
        blur: 20,
        distance: 0,
      },
    });

    this.title = new Text({ text: 'EYES OFF', style: titleStyle });
    this.title.anchor.set(0.5);
    this.title.position.set(Game.WIDTH / 2, Game.HEIGHT / 2 - 80);
    this.container.addChild(this.title);

    // Subtitle
    const subtitleStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 32,
      fill: 0x888888,
    });

    this.subtitle = new Text({ text: 'A Cooperative Chaos Game', style: subtitleStyle });
    this.subtitle.anchor.set(0.5);
    this.subtitle.position.set(Game.WIDTH / 2, Game.HEIGHT / 2 + 40);
    this.container.addChild(this.subtitle);

    // Prompt
    const promptStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 24,
      fill: 0x00ffff,
    });

    this.promptText = new Text({ text: 'Click anywhere to start', style: promptStyle });
    this.promptText.anchor.set(0.5);
    this.promptText.position.set(Game.WIDTH / 2, Game.HEIGHT - 150);
    this.container.addChild(this.promptText);

    // Add decorative elements
    this.addDecorativeElements();
  }

  private addDecorativeElements(): void {
    // Top line
    const topLine = new Graphics();
    topLine.rect(Game.WIDTH / 2 - 300, Game.HEIGHT / 2 - 160, 600, 3);
    topLine.fill(0x00ffff);
    this.container.addChild(topLine);

    // Bottom line
    const bottomLine = new Graphics();
    bottomLine.rect(Game.WIDTH / 2 - 200, Game.HEIGHT / 2 + 90, 400, 2);
    bottomLine.fill(0x444444);
    this.container.addChild(bottomLine);

    // Corner decorations
    const corners = [
      { x: 50, y: 50 },
      { x: Game.WIDTH - 50, y: 50 },
      { x: 50, y: Game.HEIGHT - 50 },
      { x: Game.WIDTH - 50, y: Game.HEIGHT - 50 },
    ];

    corners.forEach((pos) => {
      const corner = new Graphics();
      corner.rect(pos.x - 20, pos.y - 2, 40, 4);
      corner.fill(0x333333);
      corner.rect(pos.x - 2, pos.y - 20, 4, 40);
      corner.fill(0x333333);
      this.container.addChild(corner);
    });
  }

  enter(): void {
    // Add click listener
    this.container.eventMode = 'static';
    this.container.cursor = 'pointer';
    this.container.on('pointerdown', this.onStart.bind(this));
  }

  private onStart(): void {
    this.container.off('pointerdown');
    this.game.sceneManager.switchTo('registration');
  }

  update(deltaTime: number): void {
    // Blink the prompt text
    this.blinkTimer += deltaTime;
    if (this.blinkTimer > 30) {
      this.blinkTimer = 0;
      this.promptText.visible = !this.promptText.visible;
    }

    // Subtle title animation
    this.title.scale.set(1 + Math.sin(Date.now() / 1000) * 0.02);
  }

  exit(): void {
    this.container.off('pointerdown');
  }
}
