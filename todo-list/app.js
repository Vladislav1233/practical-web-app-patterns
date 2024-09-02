// Здесь создаю глобальные переменные. Применяю паттерн globalThis.
// Так как я использую модульность,
// то я не могу создать переменную в глобальном окружении, которая была бы видна во всем приложении.
globalThis.DOM = {};
const DOM = globalThis.DOM;

document.addEventListener("DOMContentLoaded", () => {
  // Здесь выношу ссылки на элементы DOM, с которыми буду работать во всем приложении.
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", (event) => {
    // TODO
  });

  // Здесь я буду проверять клик на кнопку удаления через
  // клик на список, чтобы не вытаскивать из DOM все кнопки и не вешать много слушателей события.
  DOM.todoInput.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      // TODO
    }
  });
});
