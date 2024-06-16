document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-todo button');
    const inputField = document.querySelector('.add-todo input');
    const todosContainer = document.querySelector('.todos');

    addButton.addEventListener('click', () => {
        const todoText = inputField.value.trim();
        if (todoText) {
            todosContainer.appendChild(createTodoItem(todoText));
            inputField.value = ''; // Clear input field after adding
        }
    });

    function createTodoItem(text) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';

        const todoTextDiv = document.createElement('div');
        todoTextDiv.className = 'todo-text';
        const p = document.createElement('p');
        p.textContent = text;
        todoTextDiv.appendChild(p);

        const todoActionsDiv = document.createElement('div');
        todoActionsDiv.className = 'todo-actions';
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';

        editButton.addEventListener('click', function() {
            if (editButton.textContent === 'Edit') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = p.textContent;
                todoTextDiv.replaceChild(input, p);
                editButton.textContent = 'Save';
            } else {
                p.textContent = todoTextDiv.querySelector('input').value;
                todoTextDiv.replaceChild(p, todoTextDiv.querySelector('input'));
                editButton.textContent = 'Edit';
            }
        });

        deleteButton.addEventListener('click', function() {
            todosContainer.removeChild(todoDiv);
        });

        todoActionsDiv.appendChild(editButton);
        todoActionsDiv.appendChild(deleteButton);

        todoDiv.appendChild(todoTextDiv);
        todoDiv.appendChild(todoActionsDiv);

        return todoDiv;
    }
});