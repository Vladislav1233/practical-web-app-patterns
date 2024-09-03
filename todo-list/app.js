import { TodoList } from "./webapp/classes.js";
import { Command, CommandExecutor, Commands } from "./webapp/commands.js";
import { LocalStorage } from "./webapp/storage.js";

// Здесь создаю глобальные переменные. Применяю паттерн globalThis.
// Так как я использую модульность,
// то я не могу создать переменную в глобальном окружении, которая была бы видна во всем приложении.
globalThis.DOM = {};
const DOM = globalThis.DOM;

function renderList() {
  DOM.todoList.innerHTML = "";
  const list = TodoList.getInstance();
  for (let todo of list.items) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
      ${todo.text} <button class="delete-btn">X</button>
    `;
    li.dataset.text = todo.text;
    DOM.todoList.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Здесь выношу ссылки на элементы DOM, с которыми буду работать во всем приложении.
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", (event) => {
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  // Здесь я буду проверять клик на кнопку удаления через
  // клик на список, чтобы не вытаскивать из DOM все кнопки и не вешать много слушателей события.
  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const todo = event.target.parentNode.dataset.text;
      const cmd = new Command(Commands.DELETE, [todo]);
      CommandExecutor.execute(cmd);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  TodoList.getInstance().addObserver(renderList);
});

document.addEventListener("DOMContentLoaded", () => {
  LocalStorage.load();
});

// С этого момента можно начать видеть преимущества дизайн паттернов и декомпозиции.
// Для shortcut я просто применяю команды.
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "p") {
    event.preventDefault();
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  }
  if (event.ctrlKey && event.key === "z") {
    event.preventDefault();
    const cmd = new Command(Commands.UNDO);
    CommandExecutor.execute(cmd);
  }
});
