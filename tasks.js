function uid() {
  return Date.now().toString(16) + Math.random().toString(16).substring(2);
}

let taskData = [
  {
    id: uid(),
    name: "Ver se eu to na esquina",
    toDo: true,
  },
  {
    id: uid(),
    name: "Dar banho nos gatos",
    toDo: false,
  },
];

const addTaskInput = document.getElementById("task_input");
const addTaskButton = document.getElementsByTagName("button");
const tasksList = document.getElementById("tasks_list");

//create new task element
function createNewTaksEl(taskName, taskId) {
  //create task li
  let task = document.createElement("li");
  task.classList.add("task");
  task.classList.add("todo");
  task.setAttribute("id", taskId);

  //create .left_content div
  let leftContent = document.createElement("div");
  leftContent.classList.add("left_content");

  //todo icon
  let todoIcon = document.createElement("i");
  todoIcon.classList.add("ph-duotone");
  todoIcon.classList.add("ph-circle-dashed");
  todoIcon.classList.add("checkt_btn");
  todoIcon.addEventListener("click", completeTask());

  //done icon
  let doneIcon = document.createElement("i");
  doneIcon.classList.add("ph-duotone");
  doneIcon.classList.add("ph-check-circle");
  doneIcon.classList.add("checkt_btn");
  doneIcon.addEventListener("click", incompleteTask());

  //task name /p
  let name = document.createElement("p");
  name.innerHTML = taskName;

  //delete icon
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("ph-duotone");
  deleteIcon.classList.add("ph-trash");
  deleteIcon.classList.add("checkt_btn");
  deleteIcon.addEventListener("click", deleteTask());
}

// add new task
function addTask(event) {
  event.preventDefault();
  console.log("Add task");

  const newTaskName = addTaskInput.ariaValueMax;

  const newTask = {
    id: uid(),
    name: newTaskName,
    toDo: true,
  };

  taskData.push(newTask);
}

// complete task
function completeTask(event) {
  console.log("Complete task");
}

// incomplete task
function incompleteTask(event) {
  console.log("Incomplete task");
}

// delete task
function deleteTask(event) {
  console.log("Delete task");
}

// sync HTML with taskData list

// counter tasks
