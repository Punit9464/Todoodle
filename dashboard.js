const taskInput = document.querySelector("#taskInput");
const list = document.querySelector("#taskList");
const tasks = [{ id: 0, content: "Punit"}, { id: 1, content: "Mansi" }];
const addBtn = document.querySelector('#addTaskBtn');
const monthElemennt = document.querySelector("#month");
const dayElement = document.querySelector("#day");
const dateElement = document.querySelector("#date");
const progressBar = document.querySelector('#progressBar');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let idCounter = 0;


window.addEventListener("DOMContentLoaded", () => {
    const date = new Date();
    dateElement.textContent = date.getDate();
    monthElemennt.textContent = months[date.getMonth()];
    dayElement.textContent = days[date.getDay()];

    if(tasks.length) {
        for(let i = 0; i < tasks.length; i++) {
            const listItem = document.createElement("li");
            listItem.textContent = tasks[i].content;
            listItem.id = tasks[i].id;
            list.appendChild(listItem);
        }
        const totalTasks = tasks.length;
        const doneTasks = document.querySelectorAll(".taskDone")?.length;
        const progressBarVal = (doneTasks / totalTasks) * 100;
        progressBar.value = progressBarVal;
    }
});

list.onclick = (event) => {
    event.target.style.textDecoration = 'line-through';
    event.target.classList.add("taskDone");
    updateProgress();
}

addBtn.addEventListener('click', () => {
    if(!taskInput.value) {
        return alert("Enter a task first");
    }
    const task = { content: taskInput.value, id: idCounter++ };
    addTask(task);
});

function addTask(task) {
    tasks.push(task.content);
    
    const listItem = document.createElement("li");
    listItem.textContent = task.content;
    listItem.id = task.id;+

    list.appendChild(listItem);
    taskInput.value = "";
    updateProgress();
}

function markTaskDone() {

}

function updateProgress() {
    const doneTasks = document.querySelectorAll(".taskDone")?.length;
    const totalTasks = tasks.length;
    const progressBarVal = (doneTasks / totalTasks) * 100;

    progressBar.value = progressBarVal;
}