import TaskList from "./components/taskList.js";
import TaskStat from "./components/taskStat.js";
import store from "./store/index.js";

//disable default behaviour of links
document.addEventListener("click", (ev) => ev.preventDefault());

//create list
let list = new TaskList();
let stat = new TaskStat();
//initial rendering
list.render();
stat.render();

let input = document.querySelector(".todo-create__input");
let button = document.querySelector(".todo-create__button");


//listning to submit button
button.addEventListener("click", () => {
  let task = {
    task: input.value,
    status: "",
  };
  input.value = "";

  //dispatch add event
  store.dispatch("addTask", task);
  //pusblish item added
  store.pubsub.publish("itemAdded");
});
