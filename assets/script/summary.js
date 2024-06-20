function tasksInBoardCounter() {
    let taskNumbers = document.querySelectorAll('.taskNumber');// Alle Elemente mit der Klasse "taskNumber" auswählen
    let totalTasks = 0;// Zähler für die Gesamtanzahl der Task
    for (let i = 0; i < taskNumbers.length; i++) {
        totalTasks += parseInt(taskNumbers[i].textContent, 10); // Schleife durch die ausgewählten Elemente und addiere deren Textinhalt zum Zähler
    }
    console.log(`Total tasks in board: ${totalTasks}`);// Ausgabe der Gesamtanzahl der Tasks (kann angepasst werden)
    let totalTasksElement = document.getElementById('totalTasks');
    if (totalTasksElement) {
        totalTasksElement.innerHTML = `<p class="taskNumber" id="totalTasks">${totalTasks}</p>`
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(tasksInBoardCounter, 1000); // 1 Sekunde Verzögerung, um sicherzustellen, dass alle Inhalte geladen sind
});