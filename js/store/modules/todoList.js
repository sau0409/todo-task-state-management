// state of the application

const state = {
  taskList: [],
};

// to fetch current state
const getters = {
  getTaskList: (state) => state.taskList,
};



const actions = {
  addTask(context, data) {
    context.commit("addTask", data);
  },

  deleteTask(context, data) {
    context.commit("deleteTask", data);
  },

  updateTaskStatus(context, data) {
    context.commit("updateTaskStatus", data);
  },
};


const mutations = {
  addTask(state, data) {
    let task = state.taskList.find((task) => {
      return task.task === data.task;
    });
    if (!task) {
      state.taskList.push(data);
    }

    return state;
  },

  deleteTask(state, index) {
    let task = state.taskList[index];

    if (task) {
      state.taskList.splice(index, 1);
    }

    return state;
  },

  updateTaskStatus(state, index) {
    let task = state.taskList[index];
    if (task) {
      task.status = task.status === "" ? "complete" : "";
    }

    return state;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
