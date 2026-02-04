import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';

export class TutorialScene extends Scene {
  private navigatorCard!: Container;
  private guideCard!: Container;
  private readyButton!: Container;

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
      fontSize: 56,
      fontWeight: 'bold',
      fill: 0xffffff,
    });

    const title = new Text({ text: 'KNOW YOUR ROLES', style: titleStyle });
    title.anchor.set(0.5);
    title.position.set(Game.WIDTH / 2, 100);
    this.container.addChild(title);

    // Create role cards
    this.navigatorCard = this.createRoleCard(
      'NAVIGATOR',
      0xff6b6b,
      [
        '🎯 Controls the mouse',
        '🙈 BLINDFOLDED - Cannot see screen',
        '👂 Relies on verbal instructions',
        '🖱️ Must trust their partner completely',
      ],
      Game.WIDTH / 2 - 350,
      350
    );
    this.container.addChild(this.navigatorCard);

    this.guideCard = this.createRoleCard(
      'GUIDE',
      0x4ecdc4,
      [
        '👀 Can see the screen',
        '🔇 NO mouse or keyboard control',
        '🗣️ Gives verbal directions only',
        '🧭 Must communicate clearly and quickly',
      ],
      Game.WIDTH / 2 + 350,
      350
    );
    this.container.addChild(this.guideCard);

    // Warning box
    const warningBox = this.createWarningBox();
    warningBox.position.set(Game.WIDTH / 2, 650);
    this.container.addChild(warningBox);

    // Ready button
    this.readyButton = this.createButton(
      'NAVIGATOR IS BLINDFOLDED - START GAME',
      Game.WIDTH / 2,
      850
    );
    this.container.addChild(this.readyButton);

    // Team name display
    const teamStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 24,
      fill: 0x666666,
    });

    const teamText = new Text({ text: '', style: teamStyle });
    teamText.anchor.set(0.5);
    teamText.position.set(Game.WIDTH / 2, 950);
    this.container.addChild(teamText);
  }

  private createRoleCard(
    title: string,
    color: number,
    points: string[],
    x: number,
    y: number
  ): Container {
    const card = new Container();
    card.position.set(x, y);

    // Card background
    const bg = new Graphics();
    bg.roundRect(-200, -150, 400, 350, 15);
    bg.fill(0x1a1a1a);
    bg.stroke({ color: color, width: 3 });
    card.addChild(bg);

    // Title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: 32,
      fontWeight: 'bold',
      fill: color,
    });

    const titleText = new Text({ text: title, style: titleStyle });
    titleText.anchor.set(0.5);
    titleText.position.set(0, -100);
    card.addChild(titleText);

    // Points
    const pointStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 20,
      fill: 0xcccccc,
      wordWrap: true,
      wordWrapWidth: 350,
    });

    points.forEach((point, index) => {
      const pointText = new Text({ text: point, style: pointStyle });
      pointText.anchor.set(0, 0.5);
      pointText.position.set(-170, -30 + index * 50);
      card.addChild(pointText);
    });

    return card;
  }

  private createWarningBox(): Container {
    const box = new Container();

    const bg = new Graphics();
    bg.roundRect(-400, -40, 800, 80, 10);
    bg.fill(0x2a1a00);
    bg.stroke({ color: 0xffaa00, width: 2 });
    box.addChild(bg);

    const warningStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 22,
      fill: 0xffaa00,
      fontWeight: 'bold',
    });

    const warningText = new Text({
      text: '⚠️  CHAOS EVENTS will randomly disrupt your coordination!  ⚠️',
      style: warningStyle,
    });
    warningText.anchor.set(0.5);
    box.addChild(warningText);

    return box;
  }

  private createButton(label: string, x: number, y: number): Container {
    const button = new Container();
    button.position.set(x, y);

    const bg = new Graphics();
    bg.roundRect(-300, -35, 600, 70, 10);
    bg.fill(0x00ff00);
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
      bg.tint = 0xaaffaa;
    });
    button.on('pointerout', () => {
      bg.tint = 0xffffff;
    });
    button.on('pointerdown', () => this.onReady());

    return button;
  }

  enter(): void {
    // Update team name display
    const teamText = this.container.children.find(
      (child) => child instanceof Text && child.position.y === 950
    ) as Text | undefined;
    if (teamText) {
      teamText.text = `Team: ${this.game.gameData.teamName}`;
    }
  }

  private onReady(): void {
    this.game.sceneManager.switchTo('countdown');
  }

  update(_deltaTime: number): void {
    // Subtle card animations
    const time = Date.now() / 1000;
    this.navigatorCard.position.y = 350 + Math.sin(time * 2) * 5;
    this.guideCard.position.y = 350 + Math.sin(time * 2 + Math.PI) * 5;
  }

  exit(): void {
    // Clean up
  }
}
