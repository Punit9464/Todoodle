const taskInput = document.querySelector("#taskInput")
const taskList = document.querySelector("#taskList")
const addBtn = document.querySelector("#addTaskBtn")
const monthElement = document.querySelector("#month")
const dayElement = document.querySelector("#day")
const dateElement = document.querySelector("#date")
const progressBar = document.querySelector("#progressBar")
const progressText = document.querySelector("#progress-text")
const taskCounter = document.querySelector("#task-counter")
const emptyState = document.querySelector("#emptyState")
const finishDayBtn = document.querySelector("#finishDayBtn")

let tasks = []


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
  "December",
]

function createTaskElement(todo) {
  const taskItem = document.createElement("li")
  taskItem.className = `task-item ${todo.isDone ? "completed" : ""}`
  taskItem.id = todo.id

  taskItem.innerHTML = `
        <div class="task-content">${todo.task}</div>
        <div class="task-actions">
            <button class="task-btn check-btn" onclick="toggleTask('${todo.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            </button>
            <button class="task-btn delete-btn" onclick="deleteTask('${todo.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                </svg>
            </button>
        </div>
    `

  return taskItem
}

function addTodoToList(todo) {
  const item = document.createElement("li")
  item.className = `task-item ${todo.isDone ? "completed" : ""}`
  item.id = todo.id

  const taskContent = document.createElement("div")
  taskContent.className = "task-content"
  taskContent.textContent = todo.task

  const actionsContainer = document.createElement("div")
  actionsContainer.className = "task-actions"

  const checkBtn = document.createElement("button")
  checkBtn.className = "task-btn check-btn"
  checkBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
    `
  checkBtn.onclick = () => toggleTask(todo.id)

  const deleteBtn = document.createElement("button")
  deleteBtn.className = "task-btn delete-btn"
  deleteBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        </svg>
    `
  deleteBtn.onclick = () => deleteTask(todo.id)

  actionsContainer.appendChild(checkBtn)
  actionsContainer.appendChild(deleteBtn)

  item.appendChild(taskContent)
  item.appendChild(actionsContainer)

  taskList.append(item)
  updateUI()
}

function toggleTask(taskId) {
  const taskElement = document.getElementById(taskId)
  const task = tasks.find((t) => t.id === taskId)

  if (task) {
    task.isDone = !task.isDone
    taskElement.classList.toggle("completed")

    if (window.todoAPIs) {
      window.todoAPIs.updateTodo(task.id);
    }

    updateProgress()
  }
}

function deleteTask(taskId) {
  const taskElement = document.getElementById(taskId)
  const taskIndex = tasks.findIndex((t) => t.id === taskId)

  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1)
    taskElement.remove()

    if (window.todoAPIs) {
      window.todoAPIs.deleteTodo(taskId)
    }

    updateUI()
  }
}

function addTask(taskText) {
  const todo = {
    task: taskText
  }

  tasks.push(todo)

  if (window.todoAPIs) {
    window.todoAPIs.postTodo(todo)
  }

  addTodoToList(todo)
  taskInput.value = ""
  updateUI()
}

function updateProgress() {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.isDone).length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  progressBar.style.width = `${progressPercentage}%`
  progressText.textContent = `${progressPercentage}% Complete`
}

function updateTaskCounter() {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.isDone).length
  taskCounter.textContent = `${completedTasks}/${totalTasks} tasks`
}

function updateEmptyState() {
  if (tasks.length === 0) {
    emptyState.classList.remove("hidden")
  } else {
    emptyState.classList.add("hidden")
  }
}


function updateUI() {
  updateProgress()
  updateTaskCounter()
  updateEmptyState()
}


addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim()
  if (!taskText) {
    taskInput.focus()
    return
  }
  addTask(taskText)
})

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click()
  }
})

finishDayBtn.addEventListener("click", async () => {
  const completedTasks = tasks.filter((task) => task.isDone).length
  const totalTasks = tasks.length

  if (totalTasks === 0) {
    alert("Add some tasks first to complete your day!")
    return
  }

  if (completedTasks === totalTasks) {
    // alert(`🎉 Excellent work! You've completed all ${totalTasks} tasks today. You're unstoppable!`)
     await Swal.fire({
      title: `🎉 Excellent work! You've completed all ${totalTasks} tasks today. You're unstoppable!`,
      toast: true,
      position: 'top',
      icon: 'success',
      theme: 'light',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  } else {
    const remaining = totalTasks - completedTasks
    // alert(`You've completed ${completedTasks} out of ${totalTasks} tasks. ${remaining} tasks remaining. Finish strong!`);
    await Swal.fire({
      title: `You've completed ${completedTasks} out of ${totalTasks} tasks. ${remaining} tasks remaining. Finish strong!`,
      toast: true,
      position: 'top',
      icon: 'info',
      theme: 'light',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    return;
  }
  return;
})

window.addEventListener("DOMContentLoaded", async () => {
  const date = new Date()
  dateElement.textContent = date.getDate()
  monthElement.textContent = months[date.getMonth()]
  dayElement.textContent = days[date.getDay()]

  if (window.todoAPIs) {
    try {
      const mongoTasks = await window.todoAPIs.getAllTodos(date.toISOString().slice(0, 10))
      if (mongoTasks && mongoTasks.length) {
        tasks = mongoTasks
        mongoTasks.forEach((task) => {
          const taskElement = createTaskElement(task)
          taskList.appendChild(taskElement)
        })
      }
    } catch (error) {
      console.log("Backend not available, running in demo mode")
    }
  }

  updateUI()
  taskInput.focus()
})
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;