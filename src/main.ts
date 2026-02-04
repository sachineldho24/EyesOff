import { Game } from './Game';

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  if (!container) {
    console.error('Game container not found');
    return;
  }

  const game = new Game(container);
  game.start();

  // Make game accessible for debugging
  (window as unknown as { game: Game }).game = game;
});
