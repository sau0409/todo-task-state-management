import { PubSub } from "../pubsub/pubsub.js";

export class Store {
  constructor(store) {
    let self = this;

    //new instance of pusub class
    self.pubsub = new PubSub();

    //initializing getters action mutations
    self.getters = store.getters || {};
    self.actions = store.actions || {};
    self.mutations = store.mutations || {};

    //creating a proxy for state to catch set events
    self.state = new Proxy(store.state, {
      set(obj, key, value) {
        obj[key] = value;
        console.log('state change');
        //publishing state change event
        self.pubsub.publish("stateChange", self.state);
        return true;
      },
    });
  }

  dispatch(action, data) {
    let self = this;

    //cehck if received action name is present
    if (action in self.actions) {
      self.actions[action](self, data);
      return true;
    } else {
      throw new Error(`Action: ${action}, does not exist`);
    }
  }

  commit(mutation, payload) {
    let self = this;

    //cehck if received mutation name is present
    if (mutation in self.mutations) {
      let newState = self.mutations[mutation](self.state, payload);
      self.state = Object.assign(self.state, newState)
      return true;
    } else {
      throw new Error(`Mutation: ${mutation}, does not exist`);
    }
  }
}
