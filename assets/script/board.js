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
let assignedContacts = [];

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
   tasks.forEach((task, index) => {
      switch (task.state) {
         case "todo":
            todoCounter++;
            todoColumn.innerHTML += renderTasksIntoColumnsHTML(index);
            break;
         case "inprogress":
            inProgressCounter++;
            inProgressColumn.innerHTML += renderTasksIntoColumnsHTML(index);
            break;
         case "awaitfeedback":
            awaitFeedbackCounter++;
            awaitFeedbackColumn.innerHTML += renderTasksIntoColumnsHTML(index);
            break;
         case "done":
            doneCounter++;
            doneColumn.innerHTML += renderTasksIntoColumnsHTML(index);
            break;
         default:
            console.error(`Unknown state: ${task.state}`);
      }
   });
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
   tasks[i].assigned_user.forEach((user) => {
      let assignedUserBackgroundColor = getColorAssignedUser(user.name);
      assignedUserTemplate += `<div class="task-member-icon" style="background-color: ${assignedUserBackgroundColor}">${user.first_two_letters}</div>`;
   });
   return assignedUserTemplate;
}

function getColorAssignedUser(name) {
   let assignedUser = contacts.find((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
   return assignedUser.color;
}

function countSubTask(i) {
   let subTasksDone = 0;
   tasks[i].subtasks.forEach((subtask) => {
      if (subtask.subtask_isdone) {
         subTasksDone++;
      }
   });
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

function renderTaskPopUp(id) {
   tasks.forEach((task, index) => {
      if (task.id == id) {
         editTaskPopUpBackground.innerHTML = renderTaskPopUpHTML(index);
      }
   });
}

function formateDueDateEditPopUp(i) {
   formattedDuDate = tasks[i].due_date;
   formattedDuDate = formattedDuDate.split("/").reverse().join("-");
   return formattedDuDate;
}

function renderEditTask(i) {
   editTaskPopUpBackground.innerHTML = `
       <div class="existing-task-popup-board" id="editTaskPopUp">
           <img
               src="./assets/img/close_big_icon.png"
               alt=""
               class="close-popup-btn"
               id="closePopUpBtn"
               onclick="closePopUpOnClick()"
           />
           <!-- pop up content -->
           <form action="" onsubmit="getEditedTask(${i});" class="add-task-form edit-task-form">
               <div class="add-task-left">
                   <label>Title</label>
                   <input id="taskName" class="title-input" type="text" value="${tasks[i].name}" required />
                   
                   <label class="margin-top-16px">Description</label>
                   <textarea id="taskDescription" class="description-text">${tasks[i].description}</textarea>
                   
                   <label for="dueDate">Due date</label>
                   <input id="dueDate" class="date-input" type="date" value="${formateDueDateEditPopUp(i)}" required />
               </div>
               
               <div class="add-task-right">
                   <label class="margin-top-16px">Prio</label>
                   <div class="prio-buttons" id="prioBtnContainer">
                       ${getPrioButton(i)}
                   </div>
                   
                   <label class="margin-top-16px">Assigned to</label>
                   <div id="assignedDiv" class="assigned-to-div" onclick="showAssignedDropdown(), renderContactsDropdownPopUpEdit(${i})">
                       <input id="assignedInput" type="text" class="assigned-input" placeholder="Select contacts to assign" />
                       <img id="dropdown1" src="./assets/img/arrow_drop_down_svg.svg" class="dropdown-icon" alt="" />
                       <img id="dropdown2" src="./assets/img/arrow_dropdown2_svg.svg" class="d-none dropdown-icon" onclick="hideAssignedDropdown()" alt="" />
                   </div>
                   <div id="assignedContacts">
                   ${initRenderAssignedContacts(i)}
                   </div>
                   <div id="assignedDropdown" class="assigned-dropdown assigned-scrollbar d-none"></div>
                   
                   <label class="margin-top-16px">Subtasks</label>
                   <div id="subtasksDiv" class="subtasks-div" onclick="showSubtasksIcons()">
                       <input id="subtasksInput" min="1" type="text" placeholder="Add new subtask" />
                       <img id="subtasksPlusIcon" class="subtasks-icon" src="./assets/img/add_svg.svg" alt="" />
                       <div id="subtasksInputIcons" class="d-none">
                           <img src="./assets/img/addtask_close.svg" class="subtasks-icon" onclick="clearSubtasksInput()" alt="" />
                           <div class="subtasks-seperator"></div>
                           <img src="./assets/img/addtask_check.svg" class="subtasks-icon" onclick="addNewSubtaskEditPopUp(${i})" alt="" />
                       </div>
                   </div>
                   <div>
                       <ul id="subtasksList">
                           ${renderSubtasksEditPopUp(i)}
                       </ul>
                   </div>
               </div>
               <button class="ok-btn-edit-task" type="submit">Ok<img src="./assets/img/checkmark_white.png" alt=""></button>
           </form>
           <div class="ok-btn-edit-task-wrapper"></div>
       </div>
   `;
}

function getEditedTask(i) {
   event.preventDefault();
   editedName = document.getElementById("taskName").value;
   editedDescription = document.getElementById("taskDescription").value;
   editedDueDate = document.getElementById("dueDate").value;
   tasks[i].name = editedName;
   tasks[i].description = editedDescription;
   tasks[i].due_date = editedDueDate;
   tasks[i].assigned_user = assignedContacts;
   editTaskPopUpBackground.innerHTML = renderTaskPopUpHTML(i);
   renderTasksIntoColumns();
}

// Edit-Task-Form-functions

function showSubtasksIcons() {
   document.getElementById("subtasksPlusIcon").classList.add("d-none");
   document.getElementById("subtasksInputIcons").classList.remove("d-none");
}

function addNewSubtaskEditPopUp(i) {
   let input = document.getElementById("subtasksInput").value;
   let newSubTask = { "subtask_name": input, "subtask_isdone": false };
   tasks[i].subtasks.push(newSubTask);
   let subtasksListContainer = document.getElementById("subtasksList");
   subtasksListContainer.innerHTML = `${renderSubtasksEditPopUp(i)}`;
}

function renderSubtasksEditPopUp(i) {
   let subtaskList = "";
   for (let j = 0; j < tasks[i].subtasks.length; j++) {
      subtaskList += `<li>${tasks[i].subtasks[j].subtask_name}</li>`;
   }
   return subtaskList;
}

function setPrioButton(prio, i) {
   changeButtonColorAndImg(prio, i);
}

function changeButtonColorAndImg(prio, i) {
   tasks[i].priority = prio;
   let prioBtnContainer = document.getElementById("prioBtnContainer");
   prioBtnContainer.innerHTML = `${getPrioButton(i)}`;
}

function getPrioButton(i) {
   if (tasks[i].priority === "high") {
      return `            
      <button type="button" id="urgentButton" onclick="setPrioButton('high', ${i})" style="background-color: #FF3D00; color: white">
              Urgent <img id="urgentButtonImg" src="./assets/img/prio_urgent_white_svg.svg" alt="" />
            </button>
            <button type="button" id="mediumButton" onclick="setPrioButton('medium',${i})">
              Medium <img id="mediumButtonImg" src="./assets/img/prio_medium_svg.svg" alt="" />
            </button>
            <button type="button" id="lowButton" onclick="setPrioButton('low',${i})">
              Low <img id="lowButtonImg" src="./assets/img/prio_low_svg.svg" alt="" />
            </button>`;
   }
   if (tasks[i].priority === "medium") {
      return `            
      <button type="button" id="urgentButton" onclick="setPrioButton('high',${i})" >
              Urgent <img id="urgentButtonImg" src="./assets/img/prio_urgent_svg.svg" alt="" />
            </button>
            <button type="button" id="mediumButton" onclick="setPrioButton('medium',${i})" style="background-color: #FFA800; color: white">
              Medium <img id="mediumButtonImg" src="./assets/img/prio_medium_white_svg.svg" alt="" />
            </button>
            <button type="button" id="lowButton" onclick="setPrioButton('low',${i})">
              Low <img id="lowButtonImg" src="./assets/img/prio_low_svg.svg" alt="" />
            </button>`;
   }
   if (tasks[i].priority === "low") {
      return `            
      <button type="button" id="urgentButton" onclick="setPrioButton('high',${i})" >
              Urgent <img id="urgentButtonImg" src="./assets/img/prio_urgent.png" alt="" />
            </button>
            <button type="button" id="mediumButton" onclick="setPrioButton('medium',${i})">
              Medium <img id="mediumButtonImg" src="./assets/img/prio_medium_svg.svg" alt="" />
            </button>
            <button type="button" id="lowButton" onclick="setPrioButton('low',${i})" style="background-color: #7AE229; color: white">
              Low <img id="lowButtonImg" src="./assets/img/prio_low_white_svg.svg" alt="" />
            </button>`;
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
   tasks[i].assigned_user.forEach((user) => {
      let assignedUserBackgroundColor = getColorAssignedUser(user.name);
      assignedUserTemplate += `  
      <div class="popup-user">
         <div class="task-member-icon" style="background-color: ${assignedUserBackgroundColor}">${user.first_two_letters}</div>
         ${user.name}
      </div>
      `;
   });
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
   tasks[i].subtasks.forEach((subtask) => {
      subtask.subtask_isdone ? (subTaskDone = "task-done-state-checked") : (subTaskDone = "");
      subTasksTemplate += `   
      <div class="popup-subtask-task">
         <div class="task-done-state ${subTaskDone}"></div>
         <div class="popup-subtask-name">${subtask.subtask_name}</div>
      </div>    
      `;
   });
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
   renderTaskPopUp(id);
}

function closeEditTaskPopUp() {
   if (event.target === editTaskPopUpBackground || event.target === closePopUpBtn) {
      editTaskPopUpBackground.classList.add("d-none");
   }
}

function closePopUpOnClick() {
   editTaskPopUpBackground.classList.add("d-none");
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

function renderTaskPopUpHTML(i) {
   return `  
   <div class="existing-task-popup-board" id="editTaskPopUp">
               <img
                  src="./assets/img/close_big_icon.png"
                  alt=""
                  class="close-popup-btn"
                  id="closePopUpBtn"
                  onclick="closePopUpOnClick()"
               />
               <!-- pop up content -->
               <div class="category-user-story task-category">${tasks[i].category}</div>
               <div class="existing-task-popup-headline">${tasks[i].name}</div>
               <div class="existing-task-popup-description">${tasks[i].description}</div>
               <div class="existing-task-popup-date">Due date: <span id="popUpDate">${tasks[i].due_date}</span></div>
               <div class="existing-task-popup-priority">
                  Priority: <span id="popUpDate">${tasks[i].priority} <img src="./assets/img/prio_${
      tasks[i].priority === "high" ? "urgent" : tasks[i].priority
   }.png" alt="" />
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
                  <div class="popup-edit-btn popup-btn" onclick="renderEditTask(${i})">
                     <div class="popup-edit-icon"></div>
                     Edit
                  </div>
               </div>
               </div>
              `;
}
