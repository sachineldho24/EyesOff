type EventCallback = (...args: unknown[]) => void;

export class EventBus {
  private listeners: Map<string, Set<EventCallback>> = new Map();

  on(event: string, callback: EventCallback): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: EventCallback): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  emit(event: string, ...args: unknown[]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }

  once(event: string, callback: EventCallback): void {
    const wrapper = (...args: unknown[]) => {
      this.off(event, wrapper);
      callback(...args);
    };
    this.on(event, wrapper);
  }

  clear(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

// Event types
export const GameEvents = {
  // State events
  STATE_CHANGED: 'state:changed',

  // Scene events
  SCENE_ENTERED: 'scene:entered',
  SCENE_EXITED: 'scene:exited',

  // Level events
  LEVEL_STARTED: 'level:started',
  LEVEL_COMPLETED: 'level:completed',
  LEVEL_FAILED: 'level:failed',

  // Chaos events
  CHAOS_STARTED: 'chaos:started',
  CHAOS_ENDED: 'chaos:ended',

  // Game events
  TIMER_TICK: 'timer:tick',
  PENALTY_ADDED: 'penalty:added',

  // Input events
  CLICK: 'input:click',
  DRAG_START: 'input:drag_start',
  DRAG_END: 'input:drag_end',
} as const;
