export class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (eventName in this.events) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  unsubscribe(eventName, callback) {
    if (eventName in this.events) {
      if (this.events[eventName].includes(callback)) {
        this.events = this.events[eventName].filter((cbk) => {
          return cbk !== callback;
        });
      }
    }
  }

  publish(eventName, data = {}) {
    if (eventName in this.events) {
      this.events[eventName].forEach((fun) => {
        fun(data);
      });
    }
  }
}
