const taskInput = document.querySelector("#taskInput");
const list = document.querySelector("#taskList");
let tasks = [];
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


window.addEventListener("DOMContentLoaded", async() => {
    const date = new Date();
    dateElement.textContent = date.getDate();
    monthElemennt.textContent = months[date.getMonth()];
    dayElement.textContent = days[date.getDay()];

    const mongoTasks = await todoAPIs.getAllTodos('2025-06-19');
    console.log(mongoTasks);

    if(mongoTasks.length) {
        for(let i = 0; i < tasks.length; i++) {
            const listItem = document.createElement("li");
            listItem.textContent = tasks[i].task;
            listItem.id = tasks[i]._id;
            list.appendChild(listItem);
        }
        const totalTasks = tasks.length + mongoTasks.length;
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
    const task = { task: taskInput.value };
    addTask(task);
});

function addTask(todo) {
    tasks.push(todo.task);

    window.todoAPIs.postTodo(todo);
    
    const listItem = document.createElement("li");
    listItem.textContent = todo.task;
    listItem.id = todo._id;

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