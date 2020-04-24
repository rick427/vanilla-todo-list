const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);


//Add todo
function addTodo(e){
    e.preventDefault();

    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //save to LS
    saveLocalTodos(todoInput.value);

    //check mark button
    const comptButton = document.createElement('button');
    comptButton.innerHTML = '<i class="fas fa-check"></i>';
    comptButton.classList.add('complete-btn');
    todoDiv.appendChild(comptButton);

    //trash mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('delete-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = ''
}

function deleteOrCheck(e){
  const item = e.target;
  //delete todo
  if(item.classList[0] === 'delete-btn'){
    const todo = item.parentElement;
    // Add animation and event listener to wait till transtion ends
    // then remove item from the DOM
    todo.classList.add('fall');
    removeTodosLs(todo)
    todo.addEventListener('transitionend', () => {
        todo.remove();
    })
  }

  //check todo
  if(item.classList[0] === 'complete-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none"
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none"
                }
                break;
        }
    });
    console.log(todos)
}

//save to local storage
function saveLocalTodos(todo){
    //check if things exist in LS
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//get todos from local storage
function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check mark button
        const comptButton = document.createElement('button');
        comptButton.innerHTML = '<i class="fas fa-check"></i>';
        comptButton.classList.add('complete-btn');
        todoDiv.appendChild(comptButton);

        //trash mark button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('delete-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

function removeTodosLs(todo){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}