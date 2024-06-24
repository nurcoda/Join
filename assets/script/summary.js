// Zähler initialisieren
let toDoCounter = 0;
let inProgressCounter = 0;
let awaitFeedbackCounter = 0;
let doneCounter = 0;



async function tasksInBoardCounter() {
    const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";
    let response = await fetch(BASE_URL + ".json");
    let responseAsJson = await response.json();

    // Laden der Daten
    let tasks = Object.values(responseAsJson.tasks);

    // Zählen der Aufgaben und Klassifizieren nach Zustand
    tasks.forEach(task => {
        switch (task.state) {
            case "todo":
                toDoCounter++;
                break;
            case "inprogress":
                inProgressCounter++;
                break;
            case "awaitfeedback":
                awaitFeedbackCounter++;
                break;
            case "done":
                doneCounter++;
                break;
            default:
                console.error(`Unknown state: ${task.state}`);
        }
    });

    // Anzeige der Anzahl der Aufgaben auf der Webseite
    let totalTasks = tasks.length;
    let totalTasksElement = document.getElementById('totalTasks');
    totalTasksElement.innerHTML = totalTasks;

    let taskToDoElement = document.getElementById('toDoTasks');
    taskToDoElement.innerHTML = toDoCounter;

    let inProgressElement = document.getElementById('progressTasks');
    inProgressElement.innerHTML = inProgressCounter;

    let feedbackTasksElement = document.getElementById('feedbackTasks');
    feedbackTasksElement.innerHTML = awaitFeedbackCounter;

    let doneTasksElement = document.getElementById('doneTasks')
    doneTasksElement.innerHTML = doneCounter;
}

document.addEventListener("DOMContentLoaded", function () {
    function getTimeOfDay() {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 5 && hour < 12) {
            return "Good morning,";
        } else if (hour >= 12 && hour < 17) {
            return "Good afternoon,";
        } else {
            return "Good evening,";
        }
    }

    let greetingText = document.getElementById("greetingText");
    greetingText.textContent = getTimeOfDay();
});