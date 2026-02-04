import { EventBus, GameEvents } from './EventBus';

export enum GameState {
  SPLASH = 'splash',
  REGISTRATION = 'registration',
  TUTORIAL = 'tutorial',
  COUNTDOWN = 'countdown',
  PLAYING = 'playing',
  TRANSITION = 'transition',
  RESULTS = 'results',
  LEADERBOARD = 'leaderboard',
}

export class StateMachine {
  private currentState: GameState = GameState.SPLASH;
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  getState(): GameState {
    return this.currentState;
  }

  setState(newState: GameState): void {
    const previousState = this.currentState;
    this.currentState = newState;
    this.eventBus.emit(GameEvents.STATE_CHANGED, newState, previousState);
  }

  is(state: GameState): boolean {
    return this.currentState === state;
  }

  isPlaying(): boolean {
    return this.currentState === GameState.PLAYING;
  }
}
