let taskData = [
    {
        id: 1,
        name: 'Ver se eu to na esquina',
        toDo: true,
    },
    {
        id: 2,
        name: 'Dar banho nos gatos',
        toDo: false,
    }
]

const addTaskInput = document.getElementById("task_input")
const addTaskButton = document.getElementsByTagName("button")
const tasksList = document.getElementById("tasks_list")

// add new task
function addTask(event) {
   event.preventDefault()
   console.log('Add task')
}

// complete task
function completeTask(event) {
    console.log('Complete task')
}

// incomplete task
function incompleteTask(event) {
    console.log('Incomplete task')
}

// delete task
function deleteTask(event) {
    console.log('Delete task')
}

// sync HTML with taskData list

// counter tasks

