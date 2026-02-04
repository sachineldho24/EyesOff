export interface LevelTime {
  level: number;
  name: string;
  time: number;
}

export class GameData {
  public teamName: string = '';
  public totalTime: number = 0;
  public currentLevel: number = 1;
  public levelTimes: LevelTime[] = [];
  public levelStartTime: number = 0;

  // Level names
  public static readonly LEVEL_NAMES: string[] = [
    'Digital Cleanup',
    'Password Panic',
    'Bomb Defusal',
    'Safe Cracker',
    'Laser Heist',
    'Maze Escape',
  ];

  public static readonly TOTAL_LEVELS = 6;

  reset(): void {
    this.teamName = '';
    this.totalTime = 0;
    this.currentLevel = 1;
    this.levelTimes = [];
    this.levelStartTime = 0;
  }

  setTeamName(name: string): void {
    this.teamName = name.trim();
  }

  startLevel(levelNumber: number, startTime: number): void {
    this.currentLevel = levelNumber;
    this.levelStartTime = startTime;
  }

  completeLevel(endTime: number): void {
    const levelTime = endTime - this.levelStartTime;
    this.levelTimes.push({
      level: this.currentLevel,
      name: GameData.LEVEL_NAMES[this.currentLevel - 1],
      time: levelTime,
    });
  }

  getCurrentLevelName(): string {
    return GameData.LEVEL_NAMES[this.currentLevel - 1] || 'Unknown';
  }

  isLastLevel(): boolean {
    return this.currentLevel >= GameData.TOTAL_LEVELS;
  }

  getNextLevel(): number {
    return this.currentLevel + 1;
  }
}
