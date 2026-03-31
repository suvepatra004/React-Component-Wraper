import "./style.css";
import { setupCounter } from "./counter.js";
import { Todo } from "./todo.js";

const app = document.querySelector("#app");

const renderTodo = Todo();
renderTodo(app);
