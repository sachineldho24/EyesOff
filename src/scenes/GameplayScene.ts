import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Scene } from './Scene';
import { Game } from '../Game';
import type { Level } from '../levels/Level';
import { Level1_DigitalCleanup } from '../levels/Level1_DigitalCleanup';
import { Level2_PasswordPanic } from '../levels/Level2_PasswordPanic';
import { Level3_BombDefusal } from '../levels/Level3_BombDefusal';
import { Level4_SafeCracker } from '../levels/Level4_SafeCracker';
import { Level5_LaserHeist } from '../levels/Level5_LaserHeist';
import { Level6_MazeEscape } from '../levels/Level6_MazeEscape';
import { ChaosManager } from '../chaos/ChaosManager';
import { GameData } from '../data/GameState';

export class GameplayScene extends Scene {
  private levels: Level[] = [];
  private currentLevel: Level | null = null;
  private timerDisplay!: Text;
  private levelDisplay!: Text;
  private chaosIndicator!: Container;
  private chaosManager!: ChaosManager;
  private cursor!: Graphics;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // Initialize levels
    this.levels = [
      new Level1_DigitalCleanup(this.game),
      new Level2_PasswordPanic(this.game),
      new Level3_BombDefusal(this.game),
      new Level4_SafeCracker(this.game),
      new Level5_LaserHeist(this.game),
      new Level6_MazeEscape(this.game),
    ];

    // Initialize chaos manager
    this.chaosManager = new ChaosManager(this.game);

    // Create UI overlay
    this.createUI();

    // Create custom cursor
    this.cursor = new Graphics();
    this.cursor.circle(0, 0, 12);
    this.cursor.fill(0x00ffff);
    this.cursor.circle(0, 0, 6);
    this.cursor.fill(0xffffff);
    this.cursor.zIndex = 1000;
    this.container.addChild(this.cursor);

    // Enable sorting for z-index
    this.container.sortableChildren = true;
  }

  private createUI(): void {
    // Timer display (top center)
    const timerBg = new Graphics();
    timerBg.roundRect(Game.WIDTH / 2 - 120, 20, 240, 60, 10);
    timerBg.fill({ color: 0x000000, alpha: 0.7 });
    timerBg.zIndex = 900;
    this.container.addChild(timerBg);

    const timerStyle = new TextStyle({
      fontFamily: 'Courier New, monospace',
      fontSize: 36,
      fontWeight: 'bold',
      fill: 0x00ffff,
    });

    this.timerDisplay = new Text({ text: '00:00:000', style: timerStyle });
    this.timerDisplay.anchor.set(0.5);
    this.timerDisplay.position.set(Game.WIDTH / 2, 50);
    this.timerDisplay.zIndex = 901;
    this.container.addChild(this.timerDisplay);

    // Level display (top left)
    const levelBg = new Graphics();
    levelBg.roundRect(20, 20, 200, 40, 8);
    levelBg.fill({ color: 0x000000, alpha: 0.7 });
    levelBg.zIndex = 900;
    this.container.addChild(levelBg);

    const levelStyle = new TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 20,
      fill: 0xffffff,
    });

    this.levelDisplay = new Text({ text: 'Level 1/6', style: levelStyle });
    this.levelDisplay.position.set(30, 30);
    this.levelDisplay.zIndex = 901;
    this.container.addChild(this.levelDisplay);

    // Chaos indicator (top right)
    this.chaosIndicator = new Container();
    this.chaosIndicator.position.set(Game.WIDTH - 220, 20);
    this.chaosIndicator.zIndex = 900;
    this.container.addChild(this.chaosIndicator);

    const chaosBg = new Graphics();
    chaosBg.roundRect(0, 0, 200, 40, 8);
    chaosBg.fill({ color: 0x000000, alpha: 0.7 });
    this.chaosIndicator.addChild(chaosBg);

    const chaosText = new Text({
      text: 'CHAOS: ---',
      style: new TextStyle({
        fontFamily: 'Arial, sans-serif',
        fontSize: 18,
        fill: 0xff00ff,
      }),
    });
    chaosText.position.set(10, 10);
    this.chaosIndicator.addChild(chaosText);
  }

  enter(data?: Record<string, unknown>): void {
    // Check if resuming from a transition
    if (data?.resumeLevel) {
      const level = data.resumeLevel as number;
      this.chaosManager.resume();
      this.startLevel(level);
      return;
    }

    // Fresh game start - reset to level 1
    this.game.gameData.currentLevel = 1;
    this.startLevel(1);
  }

  private startLevel(levelNumber: number): void {
    // Remove current level container
    if (this.currentLevel) {
      this.container.removeChild(this.currentLevel.container);
    }

    // Get the level
    const levelIndex = levelNumber - 1;
    if (levelIndex < 0 || levelIndex >= this.levels.length) {
      console.error(`Invalid level number: ${levelNumber}`);
      return;
    }

    this.currentLevel = this.levels[levelIndex];
    this.game.gameData.startLevel(levelNumber, this.game.timer.getElapsed());

    // Add level container (below UI)
    this.currentLevel.container.zIndex = 0;
    this.container.addChildAt(this.currentLevel.container, 0);

    // Initialize and enter level
    if (!this.currentLevel.initialized) {
      this.currentLevel.init();
      this.currentLevel.initialized = true;
    }
    this.currentLevel.enter();

    // Update level display
    this.levelDisplay.text = `Level ${levelNumber}/${GameData.TOTAL_LEVELS}`;

    // Configure chaos manager for this level
    this.chaosManager.setLevel(levelNumber);
    this.chaosManager.start();

    // Set level completion callback
    this.currentLevel.onComplete = () => this.onLevelComplete();
  }

  private onLevelComplete(): void {
    // Record level time
    this.game.gameData.completeLevel(this.game.timer.getElapsed());

    // Check if game is complete
    if (this.game.gameData.isLastLevel()) {
      this.chaosManager.stop();
      this.game.endGame();
      return;
    }

    // Transition to next level
    const nextLevel = this.game.gameData.getNextLevel();
    this.game.gameData.currentLevel = nextLevel;

    // Show transition screen
    this.chaosManager.pause();
    this.game.sceneManager.switchTo('transition', {
      level: nextLevel,
      callback: () => {
        // Resume gameplay with the next level (don't reset)
        this.game.sceneManager.switchTo('gameplay', { resumeLevel: nextLevel });
      },
    });
  }

  update(deltaTime: number): void {
    // Update timer display
    this.timerDisplay.text = this.game.timer.getFormatted();

    // Update cursor position
    const input = this.game.inputManager.getState();
    this.cursor.position.set(input.x, input.y);

    // Update chaos manager
    this.chaosManager.update(deltaTime);

    // Update chaos indicator
    const chaosText = this.chaosIndicator.children[1] as Text;
    if (this.chaosManager.isActive()) {
      const activeChaos = this.chaosManager.getActiveChaosName();
      chaosText.text = `CHAOS: ${activeChaos}`;
      chaosText.style.fill = 0xff0000;
    } else {
      chaosText.text = 'CHAOS: ---';
      chaosText.style.fill = 0xff00ff;
    }

    // Update current level
    if (this.currentLevel) {
      this.currentLevel.update(deltaTime);
    }
  }

  exit(): void {
    this.chaosManager.stop();
    if (this.currentLevel) {
      this.currentLevel.exit();
    }
  }
}
