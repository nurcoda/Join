const addTaskPopUpBackground = document.getElementById("addTaskPopUpBackground");
const addTaskPopUp = document.getElementById("addTaskPopUp");
const closePopUpBtn = document.getElementById("closePopUpBtn");
const closePopUpBtn_2 = document.getElementById("closePopUpBtn_editTask");
const existingTaskPopUpBackground = document.getElementById("existingTaskPopUpBackground");
const existingTaskPopUp = document.getElementById("existingTaskPopUp");
function openAddTaskPopUp() {
   addTaskPopUpBackground.classList.remove("d-none");
}

function closeAddTaskPopUp() {
   if (event.target === addTaskPopUpBackground || event.target === closePopUpBtn) {
      addTaskPopUpBackground.classList.add("d-none");
   }
}

function openEditTaskPopUp() {
   existingTaskPopUpBackground.classList.remove("d-none");
}

function closeEditTaskPopUp() {
   if (event.target === existingTaskPopUpBackground || event.target === closePopUpBtn_2) {
      existingTaskPopUpBackground.classList.add("d-none");
   }
}

addTaskPopUpBackground.addEventListener("click", closeAddTaskPopUp);
existingTaskPopUpBackground.addEventListener("click", closeEditTaskPopUp);
