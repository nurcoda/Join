async function tasksInBoardCounter() {
    const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";
    let response = await fetch(BASE_URL + ".json");
    let responseAsJson = await response.json();

    // Laden der Daten
    let tasks = Object.values(responseAsJson.tasks);


    // Zählen der Aufgaben
    let totalTasks = tasks.length;

    // Anzeige der Anzahl der Aufgaben auf der Webseite
    let totalTasksElement = document.getElementById('totalTasks');
    totalTasksElement.innerHTML = `<p class="taskNumber" id="totalTasks">${totalTasks}</p>`;
}