const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const inputTask = $("#input-task");
const formTask = $("#form-task");

let tasks;
const tasksList = localStorage.getItem("tasks");

if (tasksList === null) {
  tasks = [];
} else {
  tasks = JSON.parse(tasksList);
}

formTask.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTask.value.trim() === "") return;

  tasks.push(inputTask.value);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  inputTask.value = "";
  loadTasks(tasks);
});

function loadTasks(tasks) {
  const taskList = $("#task-list");
  taskList.innerHTML = "";

  tasks.forEach((el, i) => {
    const task = document.createElement("div");
    task.classList.add(
      "flex",
      "gap-4",
      "justify-between",
      "items-center",
      "px-4",
      "py-2",
      "text-sm",
      "rounded-lg",
      "bg-neutral-700"
    );
    task.innerHTML = `
    <p>${el}</p>
    <div class="flex gap-2 items-center">
      <button id="delete-task" data-index="${i}" class="p-2 rounded-lg cursor-pointer bg-red-500/30">
        🗑️
      </button>
      <button id="complete-task" data-index="${i}" class="p-2 rounded-lg cursor-pointer bg-green-500/30">
        ✅
      </button>
    </div>
  `;
    taskList.appendChild(task);

    const deleteTaskBtn = task.querySelector("#delete-task");
    const completeTaskBtn = task.querySelector("#complete-task");

    deleteTaskBtn.addEventListener("click", () => deleteTask(i));
    completeTaskBtn.addEventListener("click", () => completeTask(i));
  });

  if (!tasks.length) {
    const noTasks = document.createElement("p");
    noTasks.classList.add("text-center", "text-neutral-400", "text-sm", "py-4");
    noTasks.textContent = "No hay tareas";
    taskList.appendChild(noTasks);
  }
}

function deleteTask(i) {
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks(tasks);
}

function completeTask(i) {
  if (tasks[i].startsWith("✅ ")) return;
  tasks[i] = "✅ " + tasks[i];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks(tasks);
}

loadTasks(tasks);
