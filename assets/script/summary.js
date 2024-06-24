function initPage() {
    includeHTML();
    tasksInBoardCounter();
    getTimeOfDay();
    fetchDeadline();
}

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

document.addEventListener("DOMContentLoaded", function () {
    const greetingText = document.getElementById("greetingText");
    greetingText.textContent = getTimeOfDay();
});


async function fetchDeadline() {
    const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";
    try {
        let response = await fetch(BASE_URL + ".json");
        let responseAsJson = await response.json();

        // Angenommen, "tasks" ist ein Array von Objekten
        let tasks = responseAsJson.tasks;

        if (tasks && tasks.length > 0) {
            let nextDueDate = findNextDueDate(tasks);

            // Überprüfen, ob ein nächstes Fälligkeitsdatum gefunden wurde
            if (nextDueDate) {
                document.getElementById("deadlineDate").innerText = nextDueDate;
            } else {
                console.error("Kein gültiges Fälligkeitsdatum gefunden.");
            }
        } else {
            console.error("Keine Aufgaben gefunden.");
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}

function findNextDueDate(tasks) {
    // Filtere nur Aufgaben mit einem gültigen due_date
    let validTasks = tasks.filter(task => task.due_date);

    // Sortiere die Aufgaben nach dem due_date aufsteigend
    validTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    // Gib das due_date der ersten Aufgabe zurück (das früheste)
    return validTasks.length > 0 ? validTasks[0].due_date : null;
}

// async function fetchDeadline() {
//     const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";
//     try {
//         let response = await fetch(BASE_URL + ".json");
//         let responseAsJson = await response.json();

//         // Angenommen, "tasks" ist ein Array von Objekten
//         let tasks = responseAsJson.tasks;
//         if (tasks && tasks.length > 0) {
//             // Wir nehmen an, dass wir das erste Element im Array verwenden
//             let dueDate = tasks[0].due_date;

//             // Überprüfen, ob "due_date" vorhanden ist
//             if (dueDate) {
//                 document.getElementById("deadlineDate").innerText = dueDate;
//             } else {
//                 console.error("due_date nicht gefunden.");
//             }
//         } else {
//             console.error("Keine Aufgaben gefunden.");
//         }
//     } catch (error) {
//         console.error("Fehler beim Abrufen der Daten:", error);
//     }
// }

// document.getElementById('guest-link')
//     .addEventListener('click', function () {
//         window.location.href = './board.html';
//     });