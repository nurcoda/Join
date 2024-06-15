const addTaskPopUpBackground = document.getElementById("addTaskPopUpBackground");
const addTaskPopUp = document.getElementById("addTaskPopUp");
const closePopUpBtn = document.getElementById("closePopUpBtn");
const closePopUpBtn_2 = document.getElementById("closePopUpBtn_editTask");
const editTaskPopUpBackground = document.getElementById("editTaskPopUpBackground");
const editTaskPopUp = document.getElementById("editTaskPopUp");
const todoColumn = document.getElementById("todoColumnContainer");
const inProgressColumn = document.getElementById("inProgressColumnContainer");
const awaitFeedbackColumn = document.getElementById("awaitFeedbackColumnContainer");
const doneColumn = document.getElementById("doneColumnContainer");
let todoCounter = 0;
let inProgressCounter = 0;
let awaitFeedbackCounter = 0;
let doneCounter = 0;

// _________________________________________________
// TODO: THIS IS A FUNCTION FOR TESTING- HAS TO BE DELETED!
// THIS IS A FUNCTION FOR TESTING- HAS TO BE DELETED!
// THIS IS A FUNCTION FOR TESTING- HAS TO BE DELETED!
addUsersToContacts(user, contacts);
function addUsersToContacts(users, contacts) {
   users.forEach((user) => {
      let { password, ...userWithoutPassword } = user;
      contacts.push(userWithoutPassword);
   });
}
// _________________________________________________

renderTasksIntoColumns();

function clearAllColums() {
   todoColumn.innerHTML = "";
   inProgressColumn.innerHTML = "";
   awaitFeedbackColumn.innerHTML = "";
   doneColumn.innerHTML = "";
}

/**
 * checks the state of task
 * render tasks in the specific columns.
 * calls a function, to check if there is no task in a specific column
 */

function renderTasksIntoColumns() {
   clearAllColums();
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

// render subtasks bar

function renderSubTasksToHTML(i) {
   let subTasksTemplate = "";
   let calculatedWidth = calcWidthOfProgressBar(i);
   let subTasksDone = countSubTask(i);
   subTasksTemplate += `   
                  <span class="subtask-bar-half" style="width: ${calculatedWidth}%"></span>
                     </div>
                  <div class="subtask-counter">${subTasksDone}/${tasks[i].subtasks.length} Subtasks</div>    
                  `;

   return subTasksTemplate;
}

// render assigned user

function renderAssignedUserToHTML(i) {
   let assignedUserTemplate = "";
   for (let j = 0; j < tasks[i].assigned_user.length; j++) {
      let assignedUserBackgroundColor = getColorAssignedUser(tasks[i].assigned_user[j].name);
      assignedUserTemplate += `<div class="task-member-icon" style="background-color: ${assignedUserBackgroundColor}">${tasks[i].assigned_user[j].first_two_letters}</div>`;
   }
   return assignedUserTemplate;
}

function getColorAssignedUser(name) {
   let assignedUser = contacts.find((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
   return assignedUser.color;
}

function countSubTask(i) {
   let subTaskDone = 0;
   subTasksDone = 0;
   for (let j = 0; j < tasks[i].subtasks.length; j++) {
      if (tasks[i].subtasks[j].subtask_isdone == true) {
         subTasksDone++;
      }
   }
   return subTasksDone;
}

function calcWidthOfProgressBar(i, calculatedWidth) {
   subTasksDone = countSubTask(i);
   calculatedWidth = (subTasksDone * 100) / tasks[i].subtasks.length;
   return calculatedWidth;
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
         editTaskPopUpBackground.innerHTML = renderEditTaskPopUpHTML(i);
      }
   }
}

function deleteTask(id) {
   let taskToDeleteIndex = tasks.findIndex((task) => task.id === id);
   tasks.splice(taskToDeleteIndex, 1);
   editTaskPopUpBackground.classList.add("d-none");
   renderTasksIntoColumns();
}

/**
 * checks how many assigned user in this task
 * @param {task} i
 * @returns assigned user template
 */

function popUpRenderAssignedUser(i) {
   let assignedUserTemplate = "";
   for (let j = 0; j < tasks[i].assigned_user.length; j++) {
      let assignedUserBackgroundColor = getColorAssignedUser(tasks[i].assigned_user[j].name);
      assignedUserTemplate += `  
      <div class="popup-user">
                     <div class="task-member-icon" style="background-color: ${assignedUserBackgroundColor}">${tasks[i].assigned_user[j].first_two_letters}</div>
                     ${tasks[i].assigned_user[j].name}
                  </div>
                  `;
   }
   return assignedUserTemplate;
}

/**
 * checks if subtask is done
 * if done, box is checked
 * @param {task} i
 * @returns subtasktemplate
 */

function popUpRenderSubTasks(i) {
   let subTasksTemplate = "";
   let subTaskDone;
   for (let j = 0; j < tasks[i].subtasks.length; j++) {
      tasks[i].subtasks[j].subtask_isdone ? (subTaskDone = "task-done-state-checked") : (subTaskDone = "");

      subTasksTemplate += `   
                  <div class="popup-subtask-task">
                     <div class="task-done-state ${subTaskDone}"></div>
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
   editTaskPopUpBackground.classList.remove("d-none");
   renderEditTaskPopUp(id);
}

function closeEditTaskPopUp() {
   if (event.target === editTaskPopUpBackground || event.target === closePopUpBtn) {
      editTaskPopUpBackground.classList.add("d-none");
   }
}

addTaskPopUpBackground.addEventListener("click", closeAddTaskPopUp);
editTaskPopUpBackground.addEventListener("click", closeEditTaskPopUp);
closePopUpBtn_2.addEventListener("click", closeAddTaskPopUp);

// HTML TEMPLATES

function renderTasksIntoColumnsHTML(i) {
   return `  <div class="task-card" onclick="openEditTaskPopUp(${tasks[i].id})">
                     <div class="category-user-story task-category">${tasks[i].category}</div>
                     <div class="task-headline">${tasks[i].name}</div>
                     <div class="task-comment">${tasks[i].description}</div>
                     <div class="subtask-counter-wrapper">
                        <div class="subtask-progressbar">
                           <!-- needs to switch with subtasks -->
                          ${renderSubTasksToHTML(i)}
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

function renderEditTaskPopUpHTML(i) {
   return `  
   <div class="existing-task-popup-board" id="editTaskPopUp">
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
                  Priority: <span id="popUpDate">${tasks[i].priority} <img src="./assets/img/prio_
                  ${tasks[i].priority === "high" ? "urgent" : tasks[i].priority}.png" alt="" />
               </span>
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
                  <div class="popup-delete-btn popup-btn" onclick="deleteTask(${tasks[i].id})">
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
