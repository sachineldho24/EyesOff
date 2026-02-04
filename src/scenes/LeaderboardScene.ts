import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';
import { Timer } from '../core/Timer';
import { Leaderboard, LeaderboardEntry } from '../data/Leaderboard';

export class LeaderboardScene extends Scene {
  private leaderboard: Leaderboard;
  private entriesContainer!: Container;

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

    // Title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: 64,
      fontWeight: 'bold',
      fill: 0xffffff,
    });

    const title = new Text({ text: '🏆 LEADERBOARD 🏆', style: titleStyle });
    title.anchor.set(0.5);
    title.position.set(Game.WIDTH / 2, 80);
    this.container.addChild(title);

    // Header row
    this.createHeader();

    // Entries container
    this.entriesContainer = new Container();
    this.entriesContainer.position.set(0, 200);
    this.container.addChild(this.entriesContainer);

    // Back button
    const backButton = this.createButton('BACK TO RESULTS', Game.WIDTH / 2 - 200, Game.HEIGHT - 80);
    backButton.on('pointerdown', () => {
      this.game.sceneManager.switchTo('results');
    });
    this.container.addChild(backButton);

    // Play again button
    const playAgainButton = this.createButton('PLAY AGAIN', Game.WIDTH / 2 + 200, Game.HEIGHT - 80);
    playAgainButton.on('pointerdown', () => {
      this.game.restartGame();
    });
    this.container.addChild(playAgainButton);
  }

  private createHeader(): void {
    const headerY = 160;
    const headerStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 20,
      fontWeight: 'bold',
      fill: 0x888888,
    });

    // Rank
    const rankHeader = new Text({ text: 'RANK', style: headerStyle });
    rankHeader.position.set(200, headerY);
    this.container.addChild(rankHeader);

    // Team name
    const teamHeader = new Text({ text: 'TEAM', style: headerStyle });
    teamHeader.position.set(400, headerY);
    this.container.addChild(teamHeader);

    // Time
    const timeHeader = new Text({ text: 'TIME', style: headerStyle });
    timeHeader.anchor.set(1, 0);
    timeHeader.position.set(Game.WIDTH - 200, headerY);
    this.container.addChild(timeHeader);

    // Separator line
    const line = new Graphics();
    line.rect(150, headerY + 35, Game.WIDTH - 300, 2);
    line.fill(0x333333);
    this.container.addChild(line);
  }

  enter(): void {
    // Clear previous entries
    while (this.entriesContainer.children.length > 0) {
      this.entriesContainer.removeChildAt(0);
    }

    // Get leaderboard entries
    const entries = this.leaderboard.getEntries();
    const currentTeam = this.game.gameData.teamName;

    // Display entries
    entries.slice(0, 15).forEach((entry, index) => {
      const row = this.createEntryRow(entry, index + 1, entry.teamName === currentTeam);
      row.position.y = index * 50;
      this.entriesContainer.addChild(row);
    });

    // Show message if no entries
    if (entries.length === 0) {
      const noDataStyle = new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 24,
        fill: 0x666666,
      });

      const noDataText = new Text({ text: 'No entries yet. Be the first!', style: noDataStyle });
      noDataText.anchor.set(0.5);
      noDataText.position.set(Game.WIDTH / 2, 100);
      this.entriesContainer.addChild(noDataText);
    }
  }

  private createEntryRow(entry: LeaderboardEntry, rank: number, isCurrentTeam: boolean): Container {
    const row = new Container();

    // Highlight current team
    if (isCurrentTeam) {
      const highlight = new Graphics();
      highlight.roundRect(150, -5, Game.WIDTH - 300, 45, 5);
      highlight.fill({ color: 0x00ffff, alpha: 0.1 });
      row.addChild(highlight);
    }

    const textColor = isCurrentTeam ? 0x00ffff : 0xffffff;

    // Rank
    const rankStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 24,
      fontWeight: 'bold',
      fill: rank <= 3 ? [0xffd700, 0xc0c0c0, 0xcd7f32][rank - 1] : textColor,
    });

    const rankText = new Text({ text: `#${rank}`, style: rankStyle });
    rankText.position.set(200, 10);
    row.addChild(rankText);

    // Team name
    const teamStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 22,
      fill: textColor,
    });

    const teamText = new Text({ text: entry.teamName, style: teamStyle });
    teamText.position.set(400, 10);
    row.addChild(teamText);

    // Time
    const timeStyle = new TextStyle({
      fontFamily: 'Courier New, monospace',
      fontSize: 22,
      fill: textColor,
    });

    const timeText = new Text({
      text: Timer.format(entry.totalTime),
      style: timeStyle,
    });
    timeText.anchor.set(1, 0);
    timeText.position.set(Game.WIDTH - 200, 10);
    row.addChild(timeText);

    return row;
  }

  private createButton(label: string, x: number, y: number): Container {
    const button = new Container();
    button.position.set(x, y);

    const bg = new Graphics();
    bg.roundRect(-140, -25, 280, 50, 8);
    bg.fill(0x00ffff);
    button.addChild(bg);

    const text = new Text({
      text: label,
      style: new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 18,
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
