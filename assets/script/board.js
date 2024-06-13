const addTaskPopUpBackground = document.getElementById("addTaskPopUpBackground");
const addTaskPopUp = document.getElementById("addTaskPopUp");
const closePopUpBtn = document.getElementById("closePopUpBtn");
const closePopUpBtn_2 = document.getElementById("closePopUpBtn_editTask");
const existingTaskPopUpBackground = document.getElementById("existingTaskPopUpBackground");
const existingTaskPopUp = document.getElementById("existingTaskPopUp");
const todoColumn = document.getElementById("todoColumnContainer");
const inProgressColumn = document.getElementById("inProgressColumnContainer");
const awaitFeedbackColumn = document.getElementById("awaitFeedbackColumnContainer");
const doneColumn = document.getElementById("doneColumnContainer");
let todoCounter = 0;
let inProgressCounter = 0;
let awaitFeedbackCounter = 0;
let doneCounter = 0;

prepareData();
console.log(tasks);
console.log(tasks.state);

/**
 * prepare some incoming data for renderfunctions
 */

function prepareData() {
   renderTasksIntoColumns();
}

/**
 * checks the state of task
 * render tasks in the specific columns.
 * calls a function, to check if there is no task in a specific column
 */

function renderTasksIntoColumns() {
   for (let i = 0; i < tasks.length; i++) {
      switch (tasks[i].state) {
         case "todo":
            todoCounter++;
            todoColumn.innerHTML += renderTasksIntoColumnsHTML(i);
            break;
         case "inprogress":
            inProgressCounter++;
            inProgressColumn.innerHTML += renderTasksIntoColumnsHTML(i);
            break;
         case "awaitfeedback":
            awaitFeedbackCounter++;
            awaitFeedbackColumn.innerHTML += renderTasksIntoColumnsHTML(i);
            break;
         case "done":
            doneCounter++;
            doneColumn.innerHTML += renderTasksIntoColumnsHTML(i);
            break;
         default:
            console.error(`Unknown state: ${tasks[i].state}`);
      }
   }
   checkIfColumnIsEmpty();
}

function renderTasksIntoColumnsHTML(i) {
   return `  <div class="task-card" onclick="openEditTaskPopUp(${tasks[i].id})">
                     <div class="category-user-story task-category">${tasks[i].category}</div>
                     <div class="task-headline">${tasks[i].name}</div>
                     <div class="task-comment">${tasks[i].description}</div>
                     <div class="subtask-counter-wrapper">
                        <div class="subtask-progressbar">
                           <!-- needs to switch with subtasks -->
                           <span class="subtask-bar-half"></span>
                           <span class="subtask-bar-full d-none"></span>
                        </div>
                        <div class="subtask-counter">1/2 Subtasks</div>
                     </div>
                     <div class="member-priority-wrapper">
                        <div class="task-member">
                           ${renderAssignedUserToHTML(i)}
                        </div>
                        <div class="priority-icon">
                           <img src="./assets/img/prio_${
                              tasks[i].priority === "high" ? "urgent" : tasks[i].priority
                           }.png" alt="" />
                        </div>
                     </div>
                  </div>`;
}

function renderAssignedUserToHTML(i) {
   let assignedUserTemplate = "";
   for (let j = 0; j < tasks[i].assigned_user.length; j++) {
      assignedUserTemplate += `<div class="task-member-icon member-icon-1">${tasks[i].assigned_user[j].first_two_letters}</div>`;
   }
   return assignedUserTemplate;
}

/**
 * catch the edgecase, if a column is empty.
 * if a column is empty, it gets a "No tasks to do" sign
 */

function checkIfColumnIsEmpty() {
   if (todoCounter === 0) {
      todoColumn.innerHTML = checkIfColumnIsEmptyHTML();
   }
   if (inProgressCounter === 0) {
      inProgressColumn.innerHTML = checkIfColumnIsEmptyHTML();
   }
   if (awaitFeedbackCounter === 0) {
      awaitFeedbackColumn.innerHTML = checkIfColumnIsEmptyHTML();
   }
   if (doneCounter === 0) {
      done.innerHTML = checkIfColumnIsEmptyHTML();
   }
}

function checkIfColumnIsEmptyHTML() {
   return `<div class="task-card-nothing-to-do task-card">No tasks to do</div>`;
}

/**
 * render the right task in the pop up
 */

function renderEditTaskPopUp(id) {
   for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
         existingTaskPopUpBackground.innerHTML = renderEditTaskPopUpHTML(i);
      }
   }
}

function renderEditTaskPopUpHTML(i) {
   return `  
   <div class="existing-task-popup-board" id="existingTaskPopUp">
               <img
                  src="./assets/img/close_big_icon.png"
                  alt=""
                  class="close-popup-btn"
                  id="closePopUpBtn"
                  onclick="closeEditTaskPopUp()"
               />
               <!-- pop up content -->
               <div class="category-user-story task-category">${tasks[i].category}</div>
               <div class="existing-task-popup-headline">${tasks[i].name}</div>
               <div class="existing-task-popup-description">${tasks[i].description}</div>
               <div class="existing-task-popup-date">Due date: <span id="popUpDate">${tasks[i].due_date}</span></div>
               <div class="existing-task-popup-priority">
                  Priority: <span id="popUpDate">${tasks[i].priority} <img src="./assets/img/prio_${
      tasks[i].priority === "high" ? "urgent" : tasks[i].priority
   }.png" alt="" /></span>
               </div>
               <div class="existing-task-popup-user-wrapper">
                  <div class="popup-user-headline">Assigned to:</div>
                 ${popUpRenderAssignedUser(i)}
               </div>
               <div class="existing-task-popup-subtasks">
                  <div class="popup-subtask-headline">Subtasks</div>
                ${popUpRenderSubTasks(i)}
               </div>
               <div class="popup-delete-edit-btn-wrapper">
                  <div class="popup-delete-btn popup-btn">
                     <div class="popup-delete-icon"></div>
                     Delete
                  </div>
                  <div class="popup-edit-btn popup-btn">
                     <div class="popup-edit-icon"></div>
                     Edit
                  </div>
               </div>
               </div>
              `;
}

function popUpRenderAssignedUser(i) {
   let assignedUserTemplate = "";
   for (let j = 0; j < tasks[i].assigned_user.length; j++) {
      assignedUserTemplate += `  
      <div class="popup-user">
                     <div class="task-member-icon member-icon-1">${tasks[i].assigned_user[j].first_two_letters}</div>
                     ${tasks[i].assigned_user[j].name}
                  </div>
                  `;
   }
   return assignedUserTemplate;
}

function popUpRenderSubTasks(i) {
   let subTasksTemplate = "";
   for (let j = 0; j < tasks[i].subtasks.length; j++) {
      subTasksTemplate += `   
       <div class="popup-subtask-task">
                     <div class="task-done-state task-done-state-checked"></div>
                     <div class="popup-subtask-name">${tasks[i].subtasks[j].subtask_name}</div>
                  </div>    
                  `;
   }
   return subTasksTemplate;
}

/**
 * helper functions
 */

function openAddTaskPopUp() {
   addTaskPopUpBackground.classList.remove("d-none");
}

function closeAddTaskPopUp() {
   if (event.target === addTaskPopUpBackground || event.target === closePopUpBtn) {
      addTaskPopUpBackground.classList.add("d-none");
   }
}

function openEditTaskPopUp(id) {
   existingTaskPopUpBackground.classList.remove("d-none");
   renderEditTaskPopUp(id);
}

function closeEditTaskPopUp() {
   if (event.target === existingTaskPopUpBackground || event.target === closePopUpBtn) {
      existingTaskPopUpBackground.classList.add("d-none");
   }
}

addTaskPopUpBackground.addEventListener("click", closeAddTaskPopUp);
existingTaskPopUpBackground.addEventListener("click", closeEditTaskPopUp);
closePopUpBtn_2.addEventListener("click", closeAddTaskPopUp);
