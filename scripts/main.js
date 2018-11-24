'use strict';

// Read and parse the data when the app starts up
let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
};

// Initial rendering
renderTodos(todos, filters);

// Listen for filter input field, change search text value to that of input
// field, renders filtered todos to page
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

// Create form with single input for todo text
// Setup submit handler and cancel default action
// Add new item to todos array with that text data (completed value of false)
// Rerender the application

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = e.target.elements.newTodo.value.trim();
    if (inputText) {
        todos.push({
            id: uuidv4(),
            text: inputText,
            completed: false
        });
    } else {
        return;
    };
    saveTodos(todos);
    e.target.elements.newTodo.value = '';
    renderTodos(todos, filters);
});

// Create checkbox and setup event listener -> "Hide completed"
// Create new hideCompleted filter (default false)
// Update hideCompleted and rerender list on checkbox change
// Setup renderTodos to remove completed items

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
});

