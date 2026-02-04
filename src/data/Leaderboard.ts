export interface LeaderboardEntry {
  teamName: string;
  totalTime: number;
  levelTimes: number[];
  timestamp: string;
}

const STORAGE_KEY = 'eyesoff_leaderboard';

export class Leaderboard {
  private entries: LeaderboardEntry[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        this.entries = JSON.parse(data);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      this.entries = [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
    } catch (error) {
      console.error('Failed to save leaderboard:', error);
    }
  }

  addEntry(entry: LeaderboardEntry): number {
    this.entries.push(entry);
    this.entries.sort((a, b) => a.totalTime - b.totalTime);
    this.save();

    // Return the position (1-indexed)
    return this.entries.findIndex((e) => e === entry) + 1;
  }

  getEntries(): LeaderboardEntry[] {
    return [...this.entries];
  }

  getTopEntries(count: number = 10): LeaderboardEntry[] {
    return this.entries.slice(0, count);
  }

  getPosition(teamName: string): number | null {
    const index = this.entries.findIndex((e) => e.teamName === teamName);
    return index >= 0 ? index + 1 : null;
  }

  clear(): void {
    this.entries = [];
    this.save();
  }

  isDuplicate(teamName: string): boolean {
    return this.entries.some((e) => e.teamName.toLowerCase() === teamName.toLowerCase());
  }
}
