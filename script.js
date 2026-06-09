function updateTaskCount(){

    let counter = document.getElementById("taskCount");

    counter.innerText = "Total Tasks: " + tasks.length;

}
function updateStatistics(){

    let completed = tasks.filter(function(task){

        return task.completed === true;

    }).length;

    let pending = tasks.length - completed;

    document.getElementById("completedCount").innerText =
    "Completed: " + completed;

    document.getElementById("pendingCount").innerText =
    "Pending: " + pending;
}
let tasks = [];

function displayTask(task){

    let list = document.getElementById("taskList");

    let newTask = document.createElement("li");

   newTask.innerText =
"[" + task.category + "] " + task.text;
   if(task.completed){
    newTask.classList.add("completed-task");
}

    let completeBtn = document.createElement("button");

    completeBtn.innerText = "Complete";

    completeBtn.classList.add("complete-btn");

   completeBtn.addEventListener("click", function(){

    task.completed = !task.completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    newTask.classList.toggle("completed-task");
    updateStatistics();

});



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

    let buttonGroup = document.createElement("div");

buttonGroup.appendChild(completeBtn);
buttonGroup.appendChild(deleteBtn);

newTask.appendChild(buttonGroup);

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
 updateStatistics();

let button = document.getElementById("addBtn");

button.addEventListener("click", function(){

    let task = document.getElementById("taskInput").value;
    let category = document.getElementById("categoryInput").value;

    if(task === ""){
        alert("Please enter a task");
        return;
    }

   let taskObject = {
    text: task,
    category: category,
    completed: false
};

tasks.push(taskObject);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(taskObject);
    updateTaskCount();
    updateStatistics();

    document.getElementById("taskInput").value = "";

});