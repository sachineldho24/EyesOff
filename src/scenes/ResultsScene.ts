import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';
import { Timer } from '../core/Timer';
import { Leaderboard } from '../data/Leaderboard';

export class ResultsScene extends Scene {
  private leaderboard: Leaderboard;

  constructor(game: Game) {
    super(game);
    this.leaderboard = new Leaderboard();
  }

  init(): void {
    // Background
    const background = new Graphics();
    background.rect(0, 0, Game.WIDTH, Game.HEIGHT);
    background.fill(0x0a0a0a);
    this.container.addChild(background);
  }

  enter(): void {
    // Clear previous content (except background)
    while (this.container.children.length > 1) {
      this.container.removeChildAt(1);
    }

    const gameData = this.game.gameData;

    // Save to leaderboard
    const position = this.leaderboard.addEntry({
      teamName: gameData.teamName,
      totalTime: gameData.totalTime,
      levelTimes: gameData.levelTimes.map((lt) => lt.time),
      timestamp: new Date().toISOString(),
    });

    // Title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: 72,
      fontWeight: 'bold',
      fill: 0x00ff00,
    });

    const title = new Text({ text: '🎉 COMPLETED! 🎉', style: titleStyle });
    title.anchor.set(0.5);
    title.position.set(Game.WIDTH / 2, 120);
    this.container.addChild(title);

    // Team name
    const teamStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 32,
      fill: 0x888888,
    });

    const teamText = new Text({ text: `Team: ${gameData.teamName}`, style: teamStyle });
    teamText.anchor.set(0.5);
    teamText.position.set(Game.WIDTH / 2, 200);
    this.container.addChild(teamText);

    // Final time
    const timeStyle = new TextStyle({
      fontFamily: 'Courier New, monospace',
      fontSize: 80,
      fontWeight: 'bold',
      fill: 0x00ffff,
    });

    const timeText = new Text({
      text: Timer.format(gameData.totalTime),
      style: timeStyle,
    });
    timeText.anchor.set(0.5);
    timeText.position.set(Game.WIDTH / 2, 300);
    this.container.addChild(timeText);

    // Rank
    const rankStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 36,
      fill: 0xffaa00,
    });

    const totalEntries = this.leaderboard.getEntries().length;
    const rankText = new Text({
      text: `🏆 Rank: #${position} of ${totalEntries} teams`,
      style: rankStyle,
    });
    rankText.anchor.set(0.5);
    rankText.position.set(Game.WIDTH / 2, 400);
    this.container.addChild(rankText);

    // Level breakdown
    this.createLevelBreakdown(480);

    // Buttons
    const viewLeaderboardBtn = this.createButton('VIEW LEADERBOARD', Game.WIDTH / 2 - 200, 900);
    viewLeaderboardBtn.on('pointerdown', () => {
      this.game.sceneManager.switchTo('leaderboard');
    });
    this.container.addChild(viewLeaderboardBtn);

    const playAgainBtn = this.createButton('PLAY AGAIN', Game.WIDTH / 2 + 200, 900);
    playAgainBtn.on('pointerdown', () => {
      this.game.restartGame();
    });
    this.container.addChild(playAgainBtn);
  }

  private createLevelBreakdown(startY: number): void {
    const gameData = this.game.gameData;

    // Background box
    const box = new Graphics();
    box.roundRect(Game.WIDTH / 2 - 350, startY - 20, 700, 350, 15);
    box.fill(0x1a1a1a);
    box.stroke({ color: 0x333333, width: 2 });
    this.container.addChild(box);

    // Title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 24,
      fontWeight: 'bold',
      fill: 0xffffff,
    });

    const title = new Text({ text: 'LEVEL BREAKDOWN', style: titleStyle });
    title.anchor.set(0.5);
    title.position.set(Game.WIDTH / 2, startY + 20);
    this.container.addChild(title);

    // Level times
    const levelStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 20,
      fill: 0xcccccc,
    });

    const timeValueStyle = new TextStyle({
      fontFamily: 'Courier New, monospace',
      fontSize: 20,
      fill: 0x00ffff,
    });

    gameData.levelTimes.forEach((lt, index) => {
      const y = startY + 70 + index * 45;

      // Level name
      const levelText = new Text({
        text: `Level ${lt.level}: ${lt.name}`,
        style: levelStyle,
      });
      levelText.position.set(Game.WIDTH / 2 - 320, y);
      this.container.addChild(levelText);

      // Level time
      const timeText = new Text({
        text: Timer.format(lt.time),
        style: timeValueStyle,
      });
      timeText.anchor.set(1, 0);
      timeText.position.set(Game.WIDTH / 2 + 320, y);
      this.container.addChild(timeText);
    });
  }

  private createButton(label: string, x: number, y: number): Container {
    const button = new Container();
    button.position.set(x, y);

    const bg = new Graphics();
    bg.roundRect(-140, -30, 280, 60, 10);
    bg.fill(0x00ffff);
    button.addChild(bg);

    const text = new Text({
      text: label,
      style: new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 20,
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

    return button;
  }

  update(_deltaTime: number): void {
    // Animations if needed
  }

  exit(): void {
    // Clean up
  }
}
