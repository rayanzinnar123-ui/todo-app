let name_input=document.getElementById('name');
name_input.addEventListener('change',saving_name)
function saving_name(){
    localStorage.setItem('username', name_input.value);
};

document.addEventListener('DOMContentLoaded',load_name);
function load_name(){
    let saved_name=localStorage.getItem('username');
    name_input.value=saved_name || '';
}

let todos = JSON.parse(localStorage.getItem("todos")) || []
let new_todo_form=document.getElementById('new-todo-form')
new_todo_form.addEventListener('submit',adding_task)

function adding_task(event){
    event.preventDefault();
    const category = document.querySelector('input[name="category"]:checked').value;
    const todo={
        content:document.getElementById('content').value,
        category:category,
        completed:false,
        id: new Date().getTime()
    };
    todos.push(todo);
    console.log(todos);
    localStorage.setItem("todos",JSON.stringify(todos));
    event.target.reset();
    displayTodos();
}

function displayTodos(){
    let todoList=document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear existing todos
    todos.forEach((todoElement) => {
        const todoItemContainer = document.createElement('div');
        todoList.appendChild(todoItemContainer);
        todoItemContainer.classList.add('todo-item');

        // create checkbox
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        input.type = 'checkbox';
        input.checked = todoElement.completed;
        span.classList.add('bubble');
        if (todoElement.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        label.appendChild(input);
        label.appendChild(span);
        todoItemContainer.appendChild(label);

        // display content
        const todoContent = document.createElement('div');
        todoContent.classList.add('todo-content'); // ADD THIS LINE
        todoContent.innerHTML = `<input type="text" value="${todoElement.content}" readonly>`;
        todoItemContainer.appendChild(todoContent);

        // strikethru
        if (todoElement.completed) {
            todoItemContainer.classList.add('done');
        }

        // creating buttons
        const buttonsContainer = document.createElement('div');
        const edit_btn = document.createElement('button');
        edit_btn.innerText = 'Edit';
        const delete_btn = document.createElement('button');
        delete_btn.innerText = 'Delete';
        buttonsContainer.classList.add('actions');
        edit_btn.classList.add('edit');
        delete_btn.classList.add('delete');
        buttonsContainer.appendChild(edit_btn);
        buttonsContainer.appendChild(delete_btn);
        todoItemContainer.appendChild(buttonsContainer);

        // completing tasks
        input.addEventListener('change', (e) => {
            todoElement.completed = e.target.checked;
            localStorage.setItem("todos", JSON.stringify(todos));
            displayTodos();
        });
        // add functionality for edit button
        edit_btn.addEventListener('click', () => {
            const content_input = todoContent.querySelector('input');
            content_input.removeAttribute('readonly');
            content_input.focus(); // for cursor inside of input
            content_input.addEventListener('blur', (e) => {
                content_input.setAttribute('readonly', true);
                todoElement.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todos));
                displayTodos();
            });
        });
        delete_btn.addEventListener('click', () => {
  todos = todos.filter(item => item.id !== todoElement.id);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos();
});
    });
}

displayTodos();