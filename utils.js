const TODOS_KEY ="todos"

//функция сохранения 
export const saveTodosIntoLocalStorege = (todos) => {
    localStorage.setItem("TODOS_KEY", JSON.stringify(todos))
}

export const getTodosFromLocalStorege = () => {
    return JSON.parse(localStorage.getItem("TODOS_KEY")) || [];
}

export const getDateRepresentation = (todoCreateDate) => {
    return Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    }).format(todoCreateDate)
}
