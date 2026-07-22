const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(filter = "") {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        if (!task.text.toLowerCase().includes(filter.toLowerCase())) {
            return;
        }

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        taskDiv.innerHTML = `
        <div class="task-info">
            <div class="task-title">${task.text}</div>

            <div class="priority">
                Priority : ${task.priority}
            </div>

            <div class="date">
                Due : ${task.date || "No Date"}
            </div>
        </div>

        <div class="actions">

            <button class="complete-btn">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button class="delete-btn">
                Delete
            </button>

        </div>
        `;

        const completeBtn = taskDiv.querySelector(".complete-btn");

        completeBtn.addEventListener("click", () => {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks(searchInput.value);

        });

        const deleteBtn = taskDiv.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks(searchInput.value);

        });

        taskList.appendChild(taskDiv);

    });

}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: text,

        priority: priority.value,

        date: dueDate.value,

        completed: false

    });

    saveTasks();

    displayTasks(searchInput.value);

    taskInput.value = "";

    dueDate.value = "";

});

searchInput.addEventListener("keyup", () => {

    displayTasks(searchInput.value);

});

displayTasks();