📋 Описание

Простое Todo-приложение на JavaScript с сохранением данных в localStorage.
Функционал:

добавление задач,

отметка выполненных задач,

удаление задач,

поиск по тексту,

сохранение всех данных в браузере.

Улучшенно: 

📊 Счётчики: выводит количество выполненных и невыполненных задач.

🧹 Очистка выполненных: добавлена кнопка «Удалить все выполненные».

🚀 Запуск

Склонировать репозиторий или скачать проект.

Открыть index.html в браузере.
(Сервер не обязателен, так как всё работает в браузере на localStorage.)

📂 Структура проекта
project/
│── index.html        # разметка приложения
│── style.css         # стили
│── main.js           # логика todo-приложения
│── utils.js          # функции для работы с localStorage и датами
└── README.md         # документация

📦 Работа с localStorage

Все задачи сохраняются в браузере с помощью localStorage.
Данные хранятся как массив объектов в формате JSON.

Пример задачи:

{
  "id": 1694789347623,
  "text": "Купить молоко",
  "completed": false,
  "createdAt": "16.09.2025"
}


Функции для работы с хранилищем находятся в utils.js:

const TODOS_KEY = "todos";

// Сохранение списка задач
export const saveTodosIntoLocalStorege = (todos) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

// Загрузка задач
export const getTodosFromLocalStorege = () => {
  return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
};


Использование в main.js:

let todoList = getTodosFromLocalStorege();

addTodoBtn.addEventListener("click", () => {
  if (addTodoInput.value.trim()) {
    const newTodo = {
      id: Date.now(),
      text: addTodoInput.value.trim(),
      completed: false,
      createdAt: getDateRepresentation(new Date()),
    };

    todoList.push(newTodo);
    saveTodosIntoLocalStorege(todoList);
    renderTodos();
  }
});

🎨 Пример рендера задачи

Шаблон задачи берётся из <template> в index.html, а затем клонируется и наполняется данными:

const createTodoLayout = (todo) => {
  const todoElement = document.importNode(todoTemplate.content, true);

  const checkbox = todoElement.querySelector("[data-todo-checkbox]");
  checkbox.checked = todo.completed;

  const todoText = todoElement.querySelector("[data-todo-text]");
  todoText.textContent = todo.text;

  const todoCreatedData = todoElement.querySelector("[data-todo-date]");
  todoCreatedData.textContent = todo.createdAt;

  return todoElement;
};

🔧 Что можно улучшить

🎨 Анимации: плавные переходы при добавлении/удалении задач, hover-эффекты на кнопках.

🌙 Темы: переключатель «светлая/тёмная тема».

🔄 Сортировка: возможность сортировать задачи (например, новые сверху).

📱 Адаптивность: улучшить отображение на мобильных устройствах.

🛠 Используемые технологии

HTML5

CSS3

JavaScript (ES6+)

LocalStorage API