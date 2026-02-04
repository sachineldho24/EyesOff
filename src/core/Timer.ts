export class Timer {
  private startTime: number = 0;
  private pausedTime: number = 0;
  private penalties: number = 0;
  private running: boolean = false;
  private paused: boolean = false;

  start(): void {
    if (this.running) return;
    this.startTime = performance.now();
    this.running = true;
    this.paused = false;
  }

  stop(): void {
    if (!this.running) return;
    this.pausedTime = this.getElapsed();
    this.running = false;
  }

  pause(): void {
    if (!this.running || this.paused) return;
    this.pausedTime = this.getElapsed();
    this.paused = true;
  }

  resume(): void {
    if (!this.paused) return;
    this.startTime = performance.now() - this.pausedTime;
    this.paused = false;
  }

  reset(): void {
    this.startTime = 0;
    this.pausedTime = 0;
    this.penalties = 0;
    this.running = false;
    this.paused = false;
  }

  addPenalty(milliseconds: number): void {
    this.penalties += milliseconds;
  }

  getElapsed(): number {
    if (!this.running) return this.pausedTime + this.penalties;
    if (this.paused) return this.pausedTime + this.penalties;
    return performance.now() - this.startTime + this.penalties;
  }

  getElapsedSeconds(): number {
    return this.getElapsed() / 1000;
  }

  getFormatted(): string {
    return Timer.format(this.getElapsed());
  }

  isRunning(): boolean {
    return this.running && !this.paused;
  }

  static format(milliseconds: number): string {
    const totalMs = Math.floor(milliseconds);
    const ms = totalMs % 1000;
    const totalSeconds = Math.floor(totalMs / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    const pad = (n: number, length: number) => n.toString().padStart(length, '0');
    return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(ms, 3)}`;
  }
}
