function updateTaskCount() {

    let counter = document.getElementById("taskCount");

    counter.innerText = "Total Tasks: " + tasks.length;
}

function updateStatistics() {

    let completed = tasks.filter(function (task) {

        return task.completed === true;

    }).length;

    let pending = tasks.length - completed;

    document.getElementById("completedCount").innerText =
        "Completed: " + completed;

    document.getElementById("pendingCount").innerText =
        "Pending: " + pending;
}

let tasks = [];

function displayTask(task) {

    let list = document.getElementById("taskList");

    let newTask = document.createElement("li");

    newTask.innerText = task.text;

    if (task.completed) {
        newTask.classList.add("completed-task");
    }

    let completeBtn = document.createElement("button");

    completeBtn.innerText = "Complete";

    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", function () {

        task.completed = !task.completed;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks(tasks);

updateStatistics();

    });

    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {

        tasks = tasks.filter(function (item) {

            return item !== task;

        });

        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks(tasks);

        updateTaskCount();

        updateStatistics();

    });

    let buttonGroup = document.createElement("div");

    buttonGroup.appendChild(completeBtn);

    buttonGroup.appendChild(deleteBtn);

    newTask.appendChild(buttonGroup);

    list.appendChild(newTask);
}

function renderTasks(tasksToShow) {

    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasksToShow.forEach(function (task) {

        displayTask(task);

    });
}

let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    tasks = JSON.parse(savedTasks);

    console.log(tasks);
}

renderTasks(tasks);

updateTaskCount();

updateStatistics();

let button = document.getElementById("addBtn");
let allBtn = document.getElementById("allBtn");

let completedBtn = document.getElementById("completedBtn");

let pendingBtn = document.getElementById("pendingBtn");
let searchInput = document.getElementById("searchInput");
allBtn.addEventListener("click", function(){

    renderTasks(tasks);

});
searchInput.addEventListener("input", function(){

    let searchText = searchInput.value.toLowerCase();

    let filteredTasks = tasks.filter(function(task){

        return task.text.toLowerCase().includes(searchText);

    });

    renderTasks(filteredTasks);

});
completedBtn.addEventListener("click", function(){

    let completedTasks = tasks.filter(function(task){

        return task.completed === true;

    });

    renderTasks(completedTasks);

});
pendingBtn.addEventListener("click", function(){

    let pendingTasks = tasks.filter(function(task){

        return task.completed === false;

    });

    renderTasks(pendingTasks);

});

button.addEventListener("click", function () {

    let task = document.getElementById("taskInput").value;

    if (task === "") {

        alert("Please enter a task");

        return;
    }

    let taskObject = {

        text: task,

        completed: false
    };

    tasks.push(taskObject);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(tasks);

    updateTaskCount();

    updateStatistics();

    document.getElementById("taskInput").value = "";
});