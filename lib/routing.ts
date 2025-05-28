interface RoutingEvent {
  id: string;
  type: string;
  payload?: any;
}

class RoutingQueue {
  private events: RoutingEvent[] = [];
  private subscribers: Set<() => void> = new Set();

  subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  getEvents() {
    return this.events;
  }

  addEvent(event: RoutingEvent) {
    this.events.push(event);
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback());
  }

  async run() {
    if (this.events.length === 0) return;

    const event = this.events[0];
    try {
      // Process the event
      await this.processEvent(event);
      
      // Remove the processed event
      this.events.shift();
      this.notifySubscribers();
    } catch (error) {
      console.error('Error processing routing event:', error);
      // Remove the failed event to prevent blocking the queue
      this.events.shift();
      this.notifySubscribers();
    }
  }

  private async processEvent(event: RoutingEvent) {
    // Implement your routing logic here
    switch (event.type) {
      case 'NAVIGATE':
        // Handle navigation
        break;
      case 'REDIRECT':
        // Handle redirects
        break;
      default:
        console.warn('Unknown routing event type:', event.type);
    }
  }
}

export const routingQueue = new RoutingQueue(); 