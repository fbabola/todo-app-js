// 1. Delete dummy data
// 2. Read and parse the data when the app starts up
// 3. Stringify and write the data when new data is added


let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
};

// Initial rendering
renderTodos(todos, filters);

// Listen for filter input field and change search text value to that of input
// field and renders filtered todos to page
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

// 1. Create form with single input for todo text
// 2. Setup submit handler and cancel default action
// 3. Add new item to todos array with that text data (completed value of false)
// 4. Rerender the application

document.querySelector('#todo-form').addEventListener('submit', function (e) {
    e.preventDefault();
    todos.push({
        text: e.target.elements.newTodo.value,
        completed: false
    });
    saveTodos(todos);
    e.target.elements.newTodo.value = '';
    renderTodos(todos, filters);
});

// 1. Create checkbox and setup event listener -> "Hide completed"
// 2. Create new hideCompleted filter (default false)
// 3. Update hideCompleted and rerender list on checkbox change
// 4. Setup renderTodos to remove completed items

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
});
