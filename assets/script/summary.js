// async function tasksInBoardCounter() {
//     const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";
//     let response = await fetch(BASE_URL + ".json");
//     let responseAsJson = await response.json();

//     // Laden der Daten
//     let tasks = Object.values(responseAsJson.tasks);


//     // Zählen der Aufgaben
//     let totalTasks = tasks.length;

//     // Anzeige der Anzahl der Aufgaben auf der Webseite
//     let totalTasksElement = document.getElementById('totalTasks');
//     totalTasksElement.innerHTML = totalTasks;

//     // Zählen der Aufgaben und Klassifizieren nach Zustand
//     tasks.forEach(task => {
//         switch (task.state) {
//             case "todo":
//                 toDoCounter++;
//                 break;
//             case "inprogress":
//                 inProgressCounter++;
//                 break;
//             case "awaitfeedback":
//                 awaitFeedbackCounter++;
//                 break;
//             case "done":
//                 doneCounter++;
//                 break;
//             default:
//                 console.error(`Unknown state: ${task.state}`);
//         }
//     });

//     let taskToDoElement = document.getElementById('taskToDo');
//     taskToDoElement.innerHTML = taskToDo;
// }
async function tasksInBoardCounter() {
    const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";
    let response = await fetch(BASE_URL + ".json");
    let responseAsJson = await response.json();

    // Laden der Daten
    let tasks = Object.values(responseAsJson.tasks);

    // Zähler initialisieren
    let toDoCounter = 0;
    let inProgressCounter = 0;
    let awaitFeedbackCounter = 0;
    let doneCounter = 0;

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

    // Anzeige der Anzahl der Aufgaben je nach Zustand auf der Webseite
    let taskToDoElement = document.getElementById('toDoTasks');
    taskToDoElement.innerHTML = toDoCounter;
    // Hier die anderen Counter auch entsprechend einfügen

    // Beispiel:
    // let inProgressElement = document.getElementById('inProgressTasks');
    // inProgressElement.innerHTML = inProgressCounter;
}
