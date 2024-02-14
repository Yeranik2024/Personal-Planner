/* Listens for the "DOMContentLoaded" event before executing the provided callback function.
Calls loadMotivationalMessage() and loadTasks() when the document is fully loaded.
*/

document.addEventListener('DOMContentLoaded', () => {        
    loadMotivationalMessage();
    loadTasks();
});

/* Defines a function openMyDay that prompts the user to enter a task.
If the user enters a task, it calls the addTask function.*/

function openMyDay() {
    const taskInput = prompt('Enter your task:');
    if (taskInput) {
        addTask(taskInput);
    }
}

/* Defines a function addTask that adds a task to the task list.
Creates an li element with the provided text.
Adds a click event listener to toggle the "completed" class and saves tasks.
Appends the task to the task list and saves tasks.
*/

function addTask(taskText) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    taskList.appendChild(taskItem);
    saveTasks();
}

/* Defines a function saveTasks that saves tasks to localStorage.
Creates an array of tasks by iterating through the task list.
Saves the tasks array as a JSON string in localStorage.*/

function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll('#taskList li');

    taskElements.forEach((taskElement) => {
        tasks.push({
            text: taskElement.textContent,
            completed: taskElement.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* Defines a function loadTasks that loads tasks from localStorage.
Parses the JSON string from localStorage or uses an empty array if there are no tasks.
Calls addTaskElement for each task.*/

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => {
        addTaskElement(task.text, task.completed);
    });
}


/* Defines a function loadMotivationalMessage that loads a random motivational message.
Chooses a random message from the messages array and updates the text content of the motivational section. */

function loadMotivationalMessage() {
    const messages = [
        'The only way to do great work is to love what you do.',
        'Don\`t watch the clock; do what it does. Keep going.',
        'Success is not final, failure is not fatal: It is the courage to continue that counts.'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('motivationalMessage').textContent = randomMessage;
}
