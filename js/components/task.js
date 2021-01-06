export default class Task {

  //unique id for each task
  constructor(taskDetails, id) {
    this.taskDetails = taskDetails;
    this.id = id;
  }

  render() {

    
    let status = this.taskDetails.status;
    let strike;
    let text = "Complete";

    //check task status i.e. 'completed' or ''
    if(status === 'complete') {
      strike = "text-decoration: line-through"

      //change text of btn from complete to redo
      text = "Ree-doo"
    }
    return `
        <div class="todo-view__item" data-task-${this.id}>
                        <div class="todo-view__item--main-text" style="${strike}">${this.taskDetails.task}</div>
                        <ul class="todo-view__item--action">
                            <li class="todo-view__item--action-complete"><a href="#"
                            data-complete-${this.id}
                                    class="todo-view__item--action-complete-link">${text}</a></li>
                            <li class="todo-view__item--action-delete"><a href="#"
                            data-delete-${this.id}
                                    class="todo-view__item--action-delete-link">Delete</a></li>
                        </ul>
                    </div>
        `;
  }
}
