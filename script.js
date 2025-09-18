import { saveTodosIntoLocalStorege, getTodosFromLocalStorege, getDateRepresentation } from "./utils.js";

const addTodoInput = document.querySelector("[data-add-todo-input]"); //инпут
const addTodoBtn = document.querySelector("[data-add-todo-btn]");//кнопка добавить
const searchTodoInput = document.querySelector("[data-search-todo-input]"); // поле поиска
const todosContainer = document.querySelector("[data-todo-container]")//лист куда добавляются задачи
const todoTemplate = document.querySelector("[data-todo-template]")//шаблон разметки
const clearCompletedBtn = document.querySelector("[data-clear-completed-btn]")//кнопка удаления всех выполненных дел
const statsContainer = document.querySelector("[data-todo-stats]")

const updateStats = () => {
    const completedCount = todoList.filter(todo => todo.completed).length;
    const notCompletedCount = todoList.filter(todo => !todo.completed).length;

    statsContainer.textContent = `Выполненные: ${completedCount} | Невыолненные: ${notCompletedCount}`
}

let todoList = getTodosFromLocalStorege();
let filteredTodosList = [];

clearCompletedBtn.addEventListener("click", () => {
    todoList =todoList.filter(todo => !todo.completed);
    saveTodosIntoLocalStorege(todoList);

    if (searchTodoInput.value.trim()) {
        filterAndRenderFilteredTodos(searchTodoInput.value.trim())
    }
    else {
        renderTodos();
        updateStats();
    }
})

addTodoBtn.addEventListener("click", () => {
    if (addTodoInput.value.trim()) {
        const newTodo = {
            id: Date.now (),
            text: addTodoInput.value.trim(),
            completed: false,
            createdAt: getDateRepresentation(new Date()), //дата создания
        }
        todoList.push(newTodo);
        addTodoInput.value = "";
      
       saveTodosIntoLocalStorege(todoList)
       renderTodos()
    }
})

addTodoInput.addEventListener("input", () => {
    if (searchTodoInput.value.trim()) {
        searchTodoInput.value = "";
        renderTodos();
    }
})

searchTodoInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.trim();
    
    filterAndRenderFilteredTodos(searchValue);
})

const filterAndRenderFilteredTodos = (searchValue) => {
    filteredTodosList = todoList.filter((t) => {
       return t.text.includes(searchValue);
    })
    renderFilteredTodos()
    updateStats();
    
}

const createTodoLayout = (todo) => {
    const todoElement = document.importNode(todoTemplate.content, true) //здесь мы обращаемся к шаблону и берем его контент прям весь

    const checkbox = todoElement.querySelector("[data-todo-checkbox]");
    checkbox.checked = todo.completed;

    const todoText = todoElement.querySelector("[data-todo-text]");
    todoText.textContent = todo.text;

    const todoCreatedData = todoElement.querySelector("[data-todo-date]");
    todoCreatedData.textContent = todo.createdAt;

    const removeTodoBtn = todoElement.querySelector("[data-remove-todo-btn]");
    removeTodoBtn.disabled = !todo.completed;

    checkbox.addEventListener("change", (e) => {
        todoList = todoList.map((t) => {
            if (t.id === todo.id) {
                t.completed = e.target.checked;
            }
            return t;
        })
        
        saveTodosIntoLocalStorege(todoList);

        if (searchTodoInput.value.trim()) {
            filterAndRenderFilteredTodos(searchTodoInput.value.trim());
        } else {
            renderTodos();
            updateStats();
        }
    })

    removeTodoBtn.addEventListener("click", () => {
        todoList = todoList.filter((t) => {
            if (t.id !== todo.id) {
                return t;
            }
        })
        saveTodosIntoLocalStorege(todoList);

        if (searchTodoInput.value.trim()) {
            filterAndRenderFilteredTodos(searchTodoInput.value.trim());
        } else {
            renderTodos();
            updateStats();
        }
    })

    return todoElement;
}

const renderTodos = () => {
    todosContainer.innerHTML = "";

    if (todoList.length === 0) {
        todosContainer.innerHTML = "<h3> No todos...</h3>";
        return;
    }

    todoList.forEach((todo) => {
        const todoElement = createTodoLayout(todo);
        todosContainer.append(todoElement)

    });
}

const renderFilteredTodos = () => {
    todosContainer.innerHTML = "";

    if (filteredTodosList.length === 0) {
        todosContainer.innerHTML = "<h3> No todos...</h3>";
        return;
    }

    filteredTodosList.forEach((todo) => {
        const todoElement = createTodoLayout(todo);
        todosContainer.append(todoElement)

    });
}


renderTodos();
updateStats();