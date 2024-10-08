import { observerMixin } from "./mixins.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }
  // Value Object паттерн. Где мы сравниваем не то, что объекты у нас разные, а то, равные ли у них значения свойств.
  equals(other) {
    return this.text === other.text;
  }
}

// Я хочу чтобы у меня был только один экземпляр списка задач.
// Соответственно TodoList - кандидиат для Singleton паттерна.
// Но в таком варианте кода существует проблема, что экземпляров я могу создать сколько угодно.
export class TodoList {
  #data = new Set();
  get items() {
    return this.#data;
  }

  // Singleton паттерн. Чтобы его реализовать я могу создать переменную
  // в которой сохраню один инстанс, соответственно если переменная будет
  // заполнена, тогда новый экземпляр нам не нужен и выкинем ошибку.

  // Singleton
  static instance = null;
  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }

  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() to access the list");
    }
  }

  add(todoItem) {
    const array = Array.from(this.#data);
    const todoExists = array.filter((t) => t.equals(todoItem)).length > 0;
    if (!todoExists) {
      this.#data.add(todoItem);
      this.notify();
    }
  }
  delete(todo) {
    const array = Array.from(this.#data);
    const todoToDelete = array.filter((t) => t.text == todo);
    this.#data.delete(todoToDelete[0]);
    this.notify();
  }
  find(text) {
    const array = Array.from(this.#data);
    return array.find((i) => i.text == text);
  }
  replaceList(list) {
    this.#data = list;
    this.notify();
  }
}

// Применяем миксин к экземпляру TodoList
Object.assign(TodoList.prototype, observerMixin);
