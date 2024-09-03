// Здесь я  применяю два паттерна.
// Миксин, который будет реализовывать Observer паттерн.
// В моем слуае мне нужен обзервер, который будет отслеживать изменения в списке задач.
// По сути я создам поведение (наблюдателя), которое смогу использовать в любом другом месте.

export const observerMixin = {
  observers: new Set(),
  addObserver(observer) {
    this.observers.add(observer);
  },
  removeObserver(observer) {
    this.observers.delete(observer);
  },
  notify() {
    this.observers.forEach((observer) => observer());
  },
};
