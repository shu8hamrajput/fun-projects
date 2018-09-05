"use Strict";

todoList = new Array();

function Todo(title, completed = false) {
    this.title = title;
    this.completed = completed;
}


window.onload = function() {
    display();
    document.body.addEventListener("click", screenevent);
    document.body.addEventListener("dragover", dragover);
    document.body.addEventListener("dragend", dragend);
}

function screenevent(event) {
    if (event.target.id == "add")
        addInput();
    else
    if (event.target.id == "del-all")
        deleteAll();
    else
    if (event.target.id == "del-checked")
        deleteChecked();
}

let targetId = null;

function dragover(event) {
    if (event.target.nodeName == "LI")
        targetId = event.target.id;
}

function dragend(event) {
    if (event.target.nodeName == "LI") {
        let srcId = event.target.id;
        todoList = JSON.parse(localStorage.getItem("todo-list"));
        let src = todoList.splice(srcId, 1);
        todoList.splice(targetId, 0, src[0]);
        localStorage.setItem("todo-list", JSON.stringify(todoList));
        display();
    }
}




function addInput() {
    let input = document.getElementById("todo");
    if (input.value) {
        let todo = new Todo(input.value);
        todoList = JSON.parse(localStorage.getItem("todo-list"));
        todoList.push(todo);
        localStorage.setItem("todo-list", JSON.stringify(todoList));
        input.value = "";
        display();
        message(
            "success",
            "<strong>Success!</strong> TODO is ADDED."
        );
    } else {
        message("error", "<strong>Error!</strong> No input is given.");
    }
}

function display() {
    let ul = document.getElementById("todo-list");
    ul.innerHTML = "";
    todoList = JSON.parse(localStorage.getItem("todo-list"));
    if (todoList.length > 0)
        for (let i = 0; i < todoList.length; i++) {
            addTodo(i, todoList[i].title, todoList[i].completed);
        }
}


function addTodo(key, value, completed) {
    let ul = document.getElementById("todo-list");
    let li = document.createElement("li");
    li.setAttribute("class", "todo");
    li.setAttribute("draggable", "true");
    li.setAttribute("id", key);
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "toggleCheckbox(this)");
    checkbox.checked = completed;
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(value));
    let delButton = document.createElement("button");
    delButton.setAttribute("onclick", "deleteListItem(this)");
    delButton.appendChild(document.createTextNode("delete"));
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delButton);
    ul.prepend(li);
}

function toggleCheckbox(elem) {
    let id = elem.parentNode.id;
    todoList = JSON.parse(localStorage.getItem("todo-list"));
    todoList[id].completed = !todoList[id].completed;
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    display();
}


function deleteAll() {
    let ul = document.getElementById("todo-list");
    ul.innerHTML = "";
    todoList = JSON.parse(localStorage.getItem("todo-list"));
    todoList.length = 0;
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    display();
}

function deleteChecked() {
    todoList = JSON.parse(localStorage.getItem("todo-list"));
    for (let i = todoList.length-1; i >-1 ; i--) {
        if (todoList[i].completed == true)
            todoList.splice(i, 1);
    }
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    display();
}
function deleteListItem(elem) {
    let id = elem.parentNode.id;
    todoList = JSON.parse(localStorage.getItem("todo-list"));
    todoList.splice(id, 1);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    display();
}

function message(className, message) {
    let div = document.createElement("div");
    let fieldset = document.getElementById("fieldset");
    div.className = className;
    div.innerHTML = message;
    fieldset.append(div);
    setTimeout(() => div.remove(), 1000);
}

