'use strict';

// Gets todos saved by the specific user
const getSavedTodos = () => {
    // Gets stored todos
    const todosJSON = localStorage.getItem('todos-stored');

    try {
        // Updates todo list with stored todos
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    };
};

// Saves a user's todos to their local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos-stored', JSON.stringify(todos));
}

const findTodoByID = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    return todoIndex;
}

// Removes a todo from list based on its unique ID
const removeTodo = (id) => {
    const todoIndex = findTodoByID(id);

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    };
}

// Toggles a todo's completed value
const toggleTodo = (id) => {
    const todoIndex = findTodoByID(id);

    // Flips completed value to its opposite
    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
    };
};

// Setup filters (searchText) and wire up a new filter input to change it
// Render and rerender the latest filtered data

const renderTodos = (todos, filters) => {
    // Gets array containing not completed todos for summary and filtering purposes
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    
    // bases filtered todo list on whether the user wants to hide completed
    // todos
    // Not shorthand notation due to length of return lines
    let filteredTodos = [];
    if (filters.hideCompleted) {
        filteredTodos = incompleteTodos.filter((todo) => {
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        })
    } else {
        filteredTodos = todos.filter(function (todo) {
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        });
    };
    

    // Clears list for rendering purpose and generates line telling how many
    // todos left
    document.querySelector('#todo-list').innerHTML = '';
    document.querySelector('#todo-list').appendChild(generateSummaryDOM(incompleteTodos));

    // Puts all incomplete todos on page under individual containers
    filteredTodos.forEach((todo) => {
        document.querySelector('#todo-list').appendChild(generateTodoDOM(todo));
    });
};

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const newTodo = document.createElement('label');
    const container = document.createElement('div');
    const todoText = document.createElement('span');
    const newCheckbox = document.createElement('input');
    const removeButton = document.createElement('button');

    // Set up checkbox
    newCheckbox.setAttribute('type', 'checkbox');
    // Tells user if todo is completed by checking it off
    newCheckbox.checked = todo.completed;
    container.appendChild(newCheckbox);
    // Allows user to set todo's completed status
    newCheckbox.addEventListener('change', (e) => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    // Set up todo text
    todoText.textContent = todo.text;
    container.appendChild(todoText);

    // Set up the container
    newTodo.classList.add('list-item');
    container.classList.add('list-item__container');
    newTodo.appendChild(container);

    // Set up delete button
    removeButton.textContent = 'Delete';
    removeButton.classList.add('button', 'button--text');
    newTodo.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    return newTodo;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2');
    summary.classList.add('list-title');
    if (incompleteTodos.length > 1) {
        summary.textContent = `You have ${incompleteTodos.length} todos left.`;
    } else if (incompleteTodos.length === 1) {
        summary.textContent = 'You have 1 todo left.';
    } else {
        summary.textContent = 'You have no todos left.';
    };

    return summary;
};