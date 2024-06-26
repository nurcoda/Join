function renderTasksIntoColumnsHTML(i) {
  return `  <div class="task-card" draggable="true" ondragstart="startDragging(${
    tasks[i].id
  })" onclick="openEditTaskPopUp(${tasks[i].id})">
                       <div class="${
                         tasks[i].category === 'User Story' || tasks[i].category === 'User story'
                           ? 'category-user-story'
                           : 'category-technical-task'
                       } task-category">${tasks[i].category}</div>
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
                               tasks[i].priority === 'high' ? 'urgent' : tasks[i].priority
                             }.png" alt="" />
                          </div>
                       </div>
                    </div>`;
}

function renderEditTaskHTML(i) {
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
           <form action="" onsubmit="getEditedTask(${i});" class="add-task-form edit-task-form">
               <div class="add-task-left">
                   <label>Title</label>
                   <input id="taskName" class="title-input" type="text" value="${
                     tasks[i].name
                   }" required />
                   
                   <label class="margin-top-16px">Description</label>
                   <textarea id="taskDescription" class="description-text">${
                     tasks[i].description
                   }</textarea>
                   
                   <label for="dueDate">Due date</label>
                   <input id="dueDate" class="date-input" type="date" value="${formateDueDateEditPopUp(
                     i
                   )}" required />
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
                   
                       <ul id="subtasksList">
                           ${renderSubtasksEditPopUp(i)}
                       </ul>
                  
               </div>
               <button class="ok-btn-edit-task" type="submit">Ok<img src="./assets/img/checkmark_white.png" alt=""></button>
           </form>
           <div class="ok-btn-edit-task-wrapper"></div>
       </div>
   `;
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
                 <div class="${
                   tasks[i].category === 'User Story' || tasks[i].category === 'User story'
                     ? 'category-user-story'
                     : 'category-technical-task'
                 } task-category">${tasks[i].category}</div>
                 <div class="existing-task-popup-headline">${tasks[i].name}</div>
                 <div class="existing-task-popup-description">${tasks[i].description}</div>
                 <div class="existing-task-popup-date">Due date: <span id="popUpDate">${
                   tasks[i].due_date
                 }</span></div>
                 <div class="existing-task-popup-priority">
                    Priority: <span id="popUpDate">${
                      tasks[i].priority
                    } <img src="./assets/img/prio_${
    tasks[i].priority === 'high' ? 'urgent' : tasks[i].priority
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

function getPrioButtonHighHTML(i) {
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

function getPrioButtonMediumHTML(i) {
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

function getPrioButtonLowHTML(i) {
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

// EditTask

function initRenderAssignedContactsHTML(assignedUserColor, user, user_id) {
  return `    
           <div class="assigned-contacts-img" style="background-color: ${assignedUserColor}; color:white;" data-id="${user_id}">
                     ${user.first_two_letters}
           </div>
             `;
}

function renderContactsDropdownPopUpEditHTML(j, imgSrc, isAssigned) {
  return `
     <div id="contact${contacts[j].id}" class="assigned-to-contact ${
    isAssigned ? 'marked' : ''
  }" onclick="markContactEditPopUp(${contacts[j].id}, ${j})">
                     <div class="contact-img-name">
                         <div class="two-letters-img" style="background-color: ${
                           contacts[j].color
                         }; color: white;">
                             ${contacts[j].first_two_letters}
                         </div>
                         <span>${contacts[j].name}</span>
                     </div>
                     <img id="contactCheckBtn${
                       contacts[j].id
                     }" class="check-btn-img" src="${imgSrc}" alt="" />
                 </div>`;
}

function renderSubtasksEditPopUpHTML(i, j, subTaskTitle) {
  return `
                 <div class="edit-pop-up-subtask-wrapper" id="subtask${j}">
                     &bull; ${subTaskTitle} 
                     <span class="edit-pop-up-btn-wrapper">
                         <span class="edit-subtask-edit-btn">
                             <img class="subtask-edit-btn" onclick="editSubtask(${i}, ${j}, '${subTaskTitle}')" src="./assets/img/edit_pen_icon.png" alt="">
                         </span>
                         <span class="subtask-delete-btn edit-subtask-delete-btn">
                             <img onclick="deleteSubtask(${i}, ${j})" src="./assets/img/delete_trashcan_icon.png" alt="">
                         </span>
                     </span>
                 </div>`;
}

function editSubtaskHTML(i, j, subTaskTitle) {
  return `
     <div class="edit-subtask-div">
       <input id="onEditSubtaskInput${j}" class="edit-subtask-input" value="${subTaskTitle}">
     <div class="on-edit-subtask-icons">
       <img onclick="deleteSubtask(${i}, ${j})" src="./assets/img/delete_trashcan_icon.png" alt="">
       <div class="subtasks-seperator"></div>
       <img onclick="saveEditedSubtask(${i}, ${j})" src="./assets/img/addtask_check.svg" alt="">
     </div>`;
}

// ADD TASK

function getPrioButtonHighAddTaskHTML(prio) {
  return `            
      <button type="button" id="urgentButton" onclick="setPrioButtonAddTask('high')" style="background-color: #FF3D00; color: white">
              Urgent <img id="urgentButtonImg" src="./assets/img/prio_urgent_white_svg.svg" alt="" />
            </button>
            <button type="button" id="mediumButton" onclick="setPrioButtonAddTask('medium')">
              Medium <img id="mediumButtonImg" src="./assets/img/prio_medium_svg.svg" alt="" />
            </button>
            <button type="button" id="lowButton" onclick="setPrioButtonAddTask('low')">
              Low <img id="lowButtonImg" src="./assets/img/prio_low_svg.svg" alt="" />
            </button>`;
}

function getPrioButtonMediumAddTaskHTML(prio) {
  return `            
       <button type="button" id="urgentButton" onclick="setPrioButtonAddTask('high')" >
              Urgent <img id="urgentButtonImg" src="./assets/img/prio_urgent_svg.svg" alt="" />
            </button>
            <button type="button" id="mediumButton" onclick="setPrioButtonAddTask('medium')" style="background-color: #FFA800; color: white">
              Medium <img id="mediumButtonImg" src="./assets/img/prio_medium_white_svg.svg" alt="" />
            </button>
            <button type="button" id="lowButton" onclick="setPrioButtonAddTask('low')">
              Low <img id="lowButtonImg" src="./assets/img/prio_low_svg.svg" alt="" />
            </button>`;
}

function getPrioButtonLowAddTaskHTML(prio) {
  return `            
      <button type="button" id="urgentButton" onclick="setPrioButtonAddTask('high')" >
              Urgent <img id="urgentButtonImg" src="./assets/img/prio_urgent.png" alt="" />
            </button>
            <button type="button" id="mediumButton" onclick="setPrioButtonAddTask('medium')">
              Medium <img id="mediumButtonImg" src="./assets/img/prio_medium_svg.svg" alt="" />
            </button>
            <button type="button" id="lowButton"  onclick="setPrioButtonAddTask('low')" style="background-color: #7AE229; color: white">
              Low <img id="lowButtonImg" src="./assets/img/prio_low_white_svg.svg" alt="" />
            </button>`;
}
