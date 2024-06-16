document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".add-todo button");
  const inputField = document.querySelector(".add-todo input");
  const todosContainer = document.querySelector(".todos");

  // Load todos from localStorage
  loadTodos();

  addButton.addEventListener("click", () => {
    addTodo();
  });

  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  });

  function addTodo() {
    const todoText = inputField.value.trim();
    if (todoText) {
      todosContainer.appendChild(createTodoItem(todoText, false));
      saveTodos();
      inputField.value = "";
    }
  }

  function createTodoItem(text, isDone) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    const todoTextDiv = document.createElement("div");
    todoTextDiv.className = "todo-text";
    const p = document.createElement("p");
    p.textContent = text;
    if (isDone) {
      p.style.textDecoration = "line-through";
    }
    todoTextDiv.appendChild(p);

    const todoActionsDiv = document.createElement("div");
    todoActionsDiv.className = "todo-actions";
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";

    editButton.addEventListener("click", function () {
      if (editButton.textContent === "Edit") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = p.textContent;
        todoTextDiv.replaceChild(input, p);
        editButton.textContent = "Save";
      } else {
        p.textContent = todoTextDiv.querySelector("input").value;
        todoTextDiv.replaceChild(p, todoTextDiv.querySelector("input"));
        editButton.textContent = "Edit";
        saveTodos();
      }
    });

    deleteButton.addEventListener("click", function () {
      todosContainer.removeChild(todoDiv);
      saveTodos();
    });

    p.addEventListener("click", function () {
      if (p.style.textDecoration === "line-through") {
        p.style.textDecoration = "none";
      } else {
        p.style.textDecoration = "line-through";
      }
      saveTodos();
    });

    p.addEventListener("dblclick", function () {
      if (p.style.textDecoration === "line-through") {
        p.style.textDecoration = "none";
      } else {
        p.style.textDecoration = "line-through";
      }
      saveTodos();
    });

    todoActionsDiv.appendChild(editButton);
    todoActionsDiv.appendChild(deleteButton);

    todoDiv.appendChild(todoTextDiv);
    todoDiv.appendChild(todoActionsDiv);

    return todoDiv;
  }

  function saveTodos() {
    const todos = [];
    todosContainer.querySelectorAll(".todo").forEach((todoDiv) => {
      const text = todoDiv.querySelector(".todo-text p").textContent;
      const isDone = todoDiv.querySelector(".todo-text p").style.textDecoration === "line-through";
      todos.push({ text, isDone });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      JSON.parse(savedTodos).forEach((todo) => {
        todosContainer.appendChild(createTodoItem(todo.text, todo.isDone));
      });
    }
  }
});
