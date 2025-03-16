document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const sortButton = document.createElement("button");

  sortButton.textContent = "Sort by Priority";
  sortButton.style.margin = "10px";
  form.appendChild(sortButton);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskInput = document.querySelector("#new-task-description");
    const userInput = document.querySelector("#task-user");
    const durationInput = document.querySelector("#task-duration");
    const dueDateInput = document.querySelector("#task-due-date");
    const priorityInput = document.querySelector("#task-priority");

    if (!taskInput.value.trim()) return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <strong>${taskInput.value}</strong> - ${userInput.value} | ${durationInput.value} | Due: ${dueDateInput.value}
      <button class="delete">DELETE</button>
      <button class="edit">EDIT</button>
      <button class="complete">COMPLETE</button>
    `;

    const priority = priorityInput.value;
    switch (priority) {
      case "high":
        taskItem.style.color = "red";
        taskItem.dataset.priority = "1";
        break;
      case "medium":
        taskItem.style.color = "orange";
        taskItem.dataset.priority = "2";
        break;
      case "low":
        taskItem.style.color = "green";
        taskItem.dataset.priority = "3";
        break;
    }

    taskList.appendChild(taskItem);

    form.reset();
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      event.target.parentElement.remove();
    }

    if (event.target.classList.contains("edit")) {
      const taskItem = event.target.parentElement;
      const newTask = prompt("Edit task:", taskItem.childNodes[0].textContent.trim());
      if (newTask) {
        taskItem.childNodes[0].textContent = newTask;
      }
    }

    if (event.target.classList.contains("complete")) {
      event.target.parentElement.style.textDecoration = "line-through";
    }
  });

  sortButton.addEventListener("click", () => {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => a.dataset.priority - b.dataset.priority);
    taskList.innerHTML = "";
    tasks.forEach((task) => taskList.appendChild(task));
  });
});
