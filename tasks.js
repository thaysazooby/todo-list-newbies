function uid() {
  return Date.now().toString(16) + Math.random().toString(16).substring(2);
}

let taskData = [];

function getLocalStorage () {
  let localData = JSON.parse(localStorage.getItem('task'))
  if (localData.length != 0) {
    taskData = localData
  }
}

function setLocalStorage () {
  localStorage.setItem('task', JSON.stringify(taskData))
}

const addTaskInput = document.getElementById("task_input");
const addTaskButton = document.getElementsByTagName("button")[0];
const tasksList = document.getElementById("tasks_list");
const todoCounterText = document.getElementById("todo_count")
const doneCounterText = document.getElementById("done_count")
const emptyTasks = document.getElementById("empty_tasks")

getLocalStorage()

//empty tasks
function verifyIfListIsEmpty() {
  if(taskData.length === 0) {
    emptyTasks.classList.remove("hidden")
  } else {
    emptyTasks.classList.add("hidden")
  }
}

//counter
function counter(){
  let toDoCounter = 0
  let doneCounter = 0

  toDoCounter = taskData.length
  todoCounterText.innerText = `${toDoCounter}`

  for(const task of taskData){
    if(task.toDo === false) {
      doneCounter++
    }
  }

  doneCounterText.innerText = `${doneCounter}`
}

verifyIfListIsEmpty()
counter()

//create new task element
function createNewTaksEl(taskName, taskId, taskToDo) {
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
  todoIcon.classList.add("check_btn");
  todoIcon.addEventListener("click", completeTask);

  //done icon
  let doneIcon = document.createElement("i");
  doneIcon.classList.add("ph-duotone");
  doneIcon.classList.add("ph-check-circle");
  doneIcon.classList.add("check_btn");
  doneIcon.classList.add("hidden");
  doneIcon.addEventListener("click", incompleteTask);

  //task name /p
  let name = document.createElement("p");
  name.innerHTML = taskName;

  //checando se a task já foi concluída
  if( taskToDo == false) {
    task.classList.remove("todo")
    task.classList.add("done")
    doneIcon.classList.remove("hidden")
    todoIcon.classList.add("hidden")
    name.classList.add("risked")
  }

  //delete icon
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("ph-duotone");
  deleteIcon.classList.add("ph-trash");
  deleteIcon.classList.add("delete_btn");
  deleteIcon.addEventListener("click", deleteTask);

  leftContent.appendChild(todoIcon)
  leftContent.appendChild(doneIcon)
  leftContent.appendChild(name)

  task.appendChild(leftContent)
  task.appendChild(deleteIcon)

  return task  
}

// add new task
function addTask(event) {
  event.preventDefault();

  const newTaskName = addTaskInput.value;

  const newTask = {
    id: uid(),
    name: newTaskName,
    toDo: true,
  };

  taskData.push(newTask);
  const taskElement = createNewTaksEl(newTask.name, newTask.id, newTask.toDo)
  tasksList.appendChild(taskElement)

  addTaskInput.value = ''
  counter()
  verifyIfListIsEmpty()
  setLocalStorage()
} 

// complete task
function completeTask(event) {
  const todoIcon = event.target
  todoIcon.classList.add("hidden")

  const text = todoIcon.parentNode.childNodes[2]
  text.classList.add("risked")

  const taskToCompleteId = todoIcon.parentNode.parentNode.id
  const taskToComplete = document.getElementById(taskToCompleteId)

  taskToComplete.classList.add("done")
  taskToComplete.classList.remove("todo")
  
  const doneIcon = todoIcon.parentNode.childNodes[1]
  doneIcon.classList.remove("hidden")
  
  
  taskData.find((item) => {
    if (item.id === taskToCompleteId){
      item.toDo = false
      }
  })

  counter()
  setLocalStorage()
}

// incomplete task
function incompleteTask(event) {
  const doneIcon = event.target
  doneIcon.classList.add("hidden")

  const text = doneIcon.parentNode.childNodes[2]
  text.classList.remove("risked")

  const taskToIncompleteId = doneIcon.parentNode.parentNode.id
  const taskToIncomplete = document.getElementById(taskToIncompleteId)

  taskToIncomplete.classList.add("todo")
  taskToIncomplete.classList.remove("done")

  const todoIcon = doneIcon.parentNode.childNodes[0]
  todoIcon.classList.remove("hidden")
  
  taskData.find((item) => {
    if(item.id === taskToIncompleteId) {
      item.toDo = true
    }
  })

  counter()
  setLocalStorage()
}

// delete task
function deleteTask(event) {
  const taskToDeleteId = event.target.parentNode.id
  const taskToDelete = document.getElementById(taskToDeleteId)

  const tasksWithoutDeletedOne = taskData.filter(
    (task) => {
      return task.id !== taskToDeleteId
    }
  )

  taskData = tasksWithoutDeletedOne
  tasksList.removeChild(taskToDelete)

  counter()
  verifyIfListIsEmpty()
  setLocalStorage()
}

// sync HTML with taskData list

// for(let i = 0; i < taskData.length; i++) {
//   const currentTask = taskData[i]
//   const taskItem = createNewTaskEl(currentTask.name, currentTask.id);
//   taskList.appendChild(taskItem);
// }

for(const task of taskData) {
  const taskItem = createNewTaksEl(task.name, task.id, task.toDo)
  tasksList.appendChild(taskItem)
}
