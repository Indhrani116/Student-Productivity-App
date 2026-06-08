function updateTaskCount(){

    let counter = document.getElementById("taskCount");

    counter.innerText = "Total Tasks: " + tasks.length;

}
let tasks = [];

function displayTask(task){

    let list = document.getElementById("taskList");

    let newTask = document.createElement("li");

    newTask.innerText = task;

    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function(){

    tasks = tasks.filter(function(item){

        return item !== task;

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    newTask.remove();
    updateTaskCount();

});

    newTask.appendChild(deleteBtn);

    list.appendChild(newTask);
}

let savedTasks = localStorage.getItem("tasks");

if(savedTasks){
    tasks = JSON.parse(savedTasks);
    console.log(tasks);
}

tasks.forEach(function(task){

    displayTask(task);

});
 updateTaskCount();

let button = document.getElementById("addBtn");

button.addEventListener("click", function(){

    let task = document.getElementById("taskInput").value;

    if(task === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(task);
    updateTaskCount();

    document.getElementById("taskInput").value = "";

});