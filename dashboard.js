let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let totalTasks = tasks.length;

let completedTasks = tasks.filter(function(task) {
    return task.completed === true;
}).length;

let pendingTasks = totalTasks - completedTasks;

let progress = 0;

if(totalTasks > 0){
    progress = Math.round((completedTasks / totalTasks) * 100);
}

document.getElementById("dashboardTasks").innerText = totalTasks;

document.getElementById("dashboardPending").innerText = pendingTasks;

document.getElementById("dashboardCompleted").innerText = completedTasks;

document.getElementById("dashboardProgress").innerText = progress + "%";

document.getElementById("progressFill").style.width =
    progress + "%";