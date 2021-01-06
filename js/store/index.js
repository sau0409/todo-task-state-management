import {Store} from './store.js';
import todoList from './modules/todoList.js';

const store = new Store(todoList);

export default store
