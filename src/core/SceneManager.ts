import type { Game } from '../Game';
import type { Scene } from '../scenes/Scene';
import { GameEvents } from './EventBus';

export class SceneManager {
  private game: Game;
  private scenes: Map<string, Scene> = new Map();
  private currentScene: Scene | null = null;
  private currentSceneName: string = '';

  constructor(game: Game) {
    this.game = game;
  }

  register(name: string, scene: Scene): void {
    this.scenes.set(name, scene);
  }

  get(name: string): Scene | undefined {
    return this.scenes.get(name);
  }

  async switchTo(name: string, data?: Record<string, unknown>): Promise<void> {
    const scene = this.scenes.get(name);
    if (!scene) {
      console.error(`Scene "${name}" not found`);
      return;
    }

    // Exit current scene
    if (this.currentScene) {
      await this.currentScene.exit();
      this.game.app.stage.removeChild(this.currentScene.container);
      this.game.eventBus.emit(GameEvents.SCENE_EXITED, this.currentSceneName);
    }

    // Enter new scene
    this.currentScene = scene;
    this.currentSceneName = name;

    // Initialize scene if needed
    if (!scene.initialized) {
      await scene.init();
      scene.initialized = true;
    }

    // Add scene container to stage
    this.game.app.stage.addChild(scene.container);

    // Enter the scene
    await scene.enter(data);
    this.game.eventBus.emit(GameEvents.SCENE_ENTERED, name);
  }

  update(deltaTime: number): void {
    if (this.currentScene) {
      this.currentScene.update(deltaTime);
    }
  }

  getCurrentScene(): Scene | null {
    return this.currentScene;
  }

  getCurrentSceneName(): string {
    return this.currentSceneName;
  }
}
