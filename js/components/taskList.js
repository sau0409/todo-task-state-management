import Task from "./task.js";
import store from "../store/index.js";

export default class TaskList {
  constructor() {
    this.element = document.querySelector(".todo-view__list");
    this.store = store;

    //subscribing to event
    this.store.pubsub.subscribe("stateChange", () => this.render());

    //add event listner for complete and delete btn
    this.element.addEventListener("click", (ev) => {
      //finding which task to upadte/delete
      let att = Object.keys(ev.target.dataset)[0];
      let [operation, index] = att.split("-");
      if (operation === "complete") {
        //dispatch action to update task status state in store
        this.store.dispatch("updateTaskStatus", index);
      } else if (operation === "delete") {
        //dispatch action to dlete state in store
        this.store.dispatch("deleteTask", index);
      }
    });
  }

  render() {
    let item = "";
    let id = 0;

    //checking if data/tasks are there in store

    if (!(this.store.state.taskList.length === 0)) {
      //looping for each task to update

      this.store.state.taskList.forEach((task) => {
        item += new Task(task, id).render();
        id++;
      });

      //inserting new tasks to HTML
      this.element.innerHTML = item;
    } else {
      this.element.innerHTML = `
        <div class="todo-view__item" data-task-${id}>
                        <div class="todo-view__item--main-text">No task added yet!!</div>
                        <ul class="todo-view__item--action">
                            <li class="todo-view__item--action-complete"><a href="#" data-delete-${this.id}
                                    class="todo-view__item--action-complete-link">Complete</a></li>
                            <li class="todo-view__item--action-delete"><a href="#" data-delete-${this.id}
                                    class="todo-view__item--action-delete-link">Delete</a></li>
                        </ul>
                    </div>
        `;
    }
  }
}
