import { Application } from 'pixi.js';
import { StateMachine, GameState } from './core/StateMachine';
import { SceneManager } from './core/SceneManager';
import { InputManager } from './core/InputManager';
import { Timer } from './core/Timer';
import { EventBus } from './core/EventBus';
import { FeedbackManager } from './core/FeedbackManager';
import { GameData } from './data/GameState';

// Import scenes
import { SplashScene } from './scenes/SplashScene';
import { RegistrationScene } from './scenes/RegistrationScene';
import { TutorialScene } from './scenes/TutorialScene';
import { CountdownScene } from './scenes/CountdownScene';
import { GameplayScene } from './scenes/GameplayScene';
import { TransitionScene } from './scenes/TransitionScene';
import { ResultsScene } from './scenes/ResultsScene';
import { LeaderboardScene } from './scenes/LeaderboardScene';

export class Game {
  public app: Application;
  public stateMachine: StateMachine;
  public sceneManager: SceneManager;
  public inputManager: InputManager;
  public timer: Timer;
  public eventBus: EventBus;
  public feedbackManager: FeedbackManager;
  public gameData: GameData;

  private container: HTMLElement;
  private initialized: boolean = false;

  // Game dimensions
  public static readonly WIDTH = 1920;
  public static readonly HEIGHT = 1080;

  constructor(container: HTMLElement) {
    this.container = container;
    this.app = new Application();
    this.eventBus = new EventBus();
    this.stateMachine = new StateMachine(this.eventBus);
    this.sceneManager = new SceneManager(this);
    this.inputManager = new InputManager(this);
    this.timer = new Timer();
    this.feedbackManager = new FeedbackManager(this);
    this.gameData = new GameData();
  }

  async start(): Promise<void> {
    if (this.initialized) return;

    // Initialize PixiJS application
    await this.app.init({
      width: Game.WIDTH,
      height: Game.HEIGHT,
      backgroundColor: 0x0a0a0a,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      antialias: true,
    });

    // Add canvas to container
    this.container.appendChild(this.app.canvas);

    // Scale to fit window while maintaining aspect ratio
    this.resizeToFit();
    window.addEventListener('resize', () => this.resizeToFit());

    // Initialize managers
    this.inputManager.init();
    this.feedbackManager.init();

    // Register scenes
    this.registerScenes();

    // Start with splash screen
    this.stateMachine.setState(GameState.SPLASH);
    this.sceneManager.switchTo('splash');

    // Start game loop
    this.app.ticker.add((ticker) => this.update(ticker.deltaTime));

    this.initialized = true;
    console.log('Eyes OFF initialized successfully');
  }

  private registerScenes(): void {
    this.sceneManager.register('splash', new SplashScene(this));
    this.sceneManager.register('registration', new RegistrationScene(this));
    this.sceneManager.register('tutorial', new TutorialScene(this));
    this.sceneManager.register('countdown', new CountdownScene(this));
    this.sceneManager.register('gameplay', new GameplayScene(this));
    this.sceneManager.register('transition', new TransitionScene(this));
    this.sceneManager.register('results', new ResultsScene(this));
    this.sceneManager.register('leaderboard', new LeaderboardScene(this));
  }

  private update(deltaTime: number): void {
    // Update current scene
    this.sceneManager.update(deltaTime);

    // Update feedback effects
    this.feedbackManager.update(deltaTime);
  }

  private resizeToFit(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gameRatio = Game.WIDTH / Game.HEIGHT;
    const windowRatio = windowWidth / windowHeight;

    let newWidth: number;
    let newHeight: number;

    if (windowRatio > gameRatio) {
      // Window is wider than game
      newHeight = windowHeight;
      newWidth = newHeight * gameRatio;
    } else {
      // Window is taller than game
      newWidth = windowWidth;
      newHeight = newWidth / gameRatio;
    }

    this.app.canvas.style.width = `${newWidth}px`;
    this.app.canvas.style.height = `${newHeight}px`;
  }

  // Public methods for game flow
  public startGame(): void {
    this.timer.start();
    this.gameData.reset();
    this.stateMachine.setState(GameState.PLAYING);
    this.sceneManager.switchTo('gameplay');
  }

  public endGame(): void {
    this.timer.stop();
    this.gameData.totalTime = this.timer.getElapsed();
    this.stateMachine.setState(GameState.RESULTS);
    this.sceneManager.switchTo('results');
  }

  public restartGame(): void {
    this.timer.reset();
    this.gameData.reset();
    this.stateMachine.setState(GameState.REGISTRATION);
    this.sceneManager.switchTo('registration');
  }
}
