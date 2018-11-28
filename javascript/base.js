let todos = [];
let id = 0;
let input = document.getElementById("addTodoTextInput");

let todoList = {
    addTodo: function (todoText, id) {
        todos.push({
            todoText: todoText,
            completed: false,
            id: id
        });
    },
    deleteTodo: function (id) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos.splice(i, 1);
                break;
            }
        }
    },
    toggleState: function (id) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                todos[i].completed = !todos[i].completed;
                break;
            }
        }
    }
};

// Time for space - Emancipator

let handlers = {
    submitInput: function (event) {
        if (event.keyCode == 13) {
            if (input.value == "") {
                document.getElementById("warning").style.display = "block";
                setTimeout(function () {
                    warning.style.display = "none";
                }, 3000);
            } else {
                todoList.addTodo(input.value, id);
                input.value = "";

                id++;

                display.displayTodo(todos[todos.length - 1]);
            }
        }
    },
    toggleState: function (clickedId) {
        display.displayCheck(clickedId);
    },
    deleteTodo: function (clickedId) {
        todoList.deleteTodo(clickedId);
        display.displayDelete(clickedId);
    }
};

let display = {
    displayTodo: function (todo) {
        let todoItem = document.createElement("div");
        let text = document.createElement("p");
        text.id = "todoText" + todo.id;
        let textNode = document.createTextNode(todos[todos.length - 1].todoText);

        todoItem.id = todo.id;
        todoItem.className = "todoItem";

        text.appendChild(textNode);

        let todoList = document.getElementById("todoList");

        // CREATE CHECK BUTTON
        let createCheck = document.createElement("ion-icon");
        createCheck.setAttribute("name", "checkmark-circle-outline");
        createCheck.setAttribute("onclick", "handlers.toggleState(this.id)");
        createCheck.className = "todoItem_check";
        createCheck.id = todo.id;

        // CREATE DELETE BUTTON
        let createDelete = document.createElement("ion-icon");
        createDelete.setAttribute("name", "close");
        createDelete.setAttribute("onclick", "handlers.deleteTodo(this.id)");
        createDelete.className = "todoItem_delete";
        createDelete.id = todo.id;

        todoItem.appendChild(createCheck);
        todoItem.appendChild(text);
        todoItem.appendChild(createDelete);

        todoList.appendChild(todoItem);
    },
    displayCheck: function (id) {
        let x = document.getElementById("todoText" + id);
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == id && todos[i].completed === false) {
                todos[i].completed = !todos[i].completed;
                x.setAttribute("class", "completed");
                break;
            } else if (todos[i].id == id && todos[i].completed === true) {
                x.removeAttribute("class");
                todos[i].completed = !todos[i].completed;
                break;
            };
        };
    },
    displayDelete: function (id) {
        document.getElementById("todoList").removeChild(document.getElementById(id));
    }
};