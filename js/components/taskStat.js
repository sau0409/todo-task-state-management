import store from "../store/index.js";

console.log(store);

export default class TaskStat {
  constructor() {
    this.element = document.querySelector(".todo-stat");
    this.store = store;

    //subscribing to events
    this.store.pubsub.subscribe("stateChange", () => this.render());
  }

  render() {
    let count = this.store.state.taskList.length;

    let completeTaskCount = this.store.state.taskList.filter((task) => {
      return task.status === "complete";
    }).length;

    //% of task done
    let perVal = (completeTaskCount / count) * 100;

    //final value for css stroke-dashoffset
    let finalValue = count ===0 ?440:440 - (440 * perVal) / 100;

    let el = `<div class="todo-stat__container">
      <svg class="todo-stat__circle">
          <circle class="todo-stat__circle1" r=70 cx="100" cy="75"></circle>
          <circle class="todo-stat__circle2" style="stroke-dashoffset: ${finalValue}" r=70 cx="100" cy="75"></circle>
      </svg>
      <div class="todo-stat__data">
          <span>${completeTaskCount} / ${count}</span>
      </div>
      </div>`;
    
    this.element.innerHTML = el;
  }
}
