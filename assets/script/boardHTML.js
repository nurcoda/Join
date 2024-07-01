function renderTasksIntoColumnsHTML(i) {
  return `
    <div class="task-card" draggable="true" ondragstart="startDragging(${
      tasks[i].id
    })" onclick="openEditTaskPopUp(event, ${tasks[i].id})" id="taskCard${tasks[i].id}">
      <div class="${
        tasks[i].category === 'User Story' || tasks[i].category === 'User story'
          ? 'category-user-story'
          : 'category-technical-task'
      } task-category">
        ${tasks[i].category}
      </div>
      <img src="./assets/img/three_dots_icon.png" alt="three dots" class="change-state-icon" onclick="toggleChangeStateDropdown(${
        tasks[i].id
      })" id="stateDropdownIcon${tasks[i].id}">
      <div class="state-dropdown d-none" id="stateDropdown${tasks[i].id}">
        <div class="state-dropdown-element" onclick="setNewState(${i}, 'todo')">To do</div>
        <div class="state-dropdown-element"  onclick="setNewState(${i}, 'inprogress')">In progress</div>
        <div class="state-dropdown-element"  onclick="setNewState(${i}, 'awaitfeedback')">Await feedback</div>
        <div class="state-dropdown-element"  onclick="setNewState(${i}, 'done')">Done</div>
      </div>
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
            <img src="./assets/img/prio_${tasks[i].priority === 'high' ? 'urgent' : tasks[i].priority}.png" alt="" />
          </div>
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
                   <input id="taskName" class="title-input" type="text" value="${tasks[i].name}" required />
                   
                   <label class="margin-top-16px">Description</label>
                   <textarea id="taskDescription" class="description-text">${tasks[i].description}</textarea>
                   
                   <label for="dueDate">Due date</label>
                   <input id="dueDate" class="date-input-edit-popup" type="date" value="${formateDueDateEditPopUp(
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
                 <div class="existing-task-popup-date">Due date: <span id="popUpDate">${tasks[i].due_date}</span></div>
                 <div class="existing-task-popup-priority">
                    Priority: <span id="popUpDate">${tasks[i].priority} <img src="./assets/img/prio_${
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
                         <div class="two-letters-img" style="background-color: ${contacts[j].color}; color: white;">
                             ${contacts[j].first_two_letters}
                         </div>
                         <span>${contacts[j].name}</span>
                     </div>
                     <img id="contactCheckBtn${contacts[j].id}" class="check-btn-img" src="${imgSrc}" alt="" />
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
       <img onclick="deleteSubtask(${i})" src="./assets/img/delete_trashcan_icon.png" alt="">
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

function renderSubtasksAddTaskPopUpHTML(i, subTaskTitle) {
  return `
     <div class="edit-pop-up-subtask-wrapper" id="subtask${i}">
         &bull; ${subTaskTitle} 
         <span class="edit-pop-up-btn-wrapper">
             <span class="edit-subtask-edit-btn">
      <img class="subtask-edit-btn" onclick="editSubtaskAddTask(${i}, '${subTaskTitle}')" src="./assets/img/edit_pen_icon.png" alt="">
             </span>
             <span class="subtask-delete-btn edit-subtask-delete-btn">
                 <img onclick="deleteSubtaskAddTask(${i})" src="./assets/img/delete_trashcan_icon.png" alt="">
             </span>
         </span>
     </div>`;
}

function editSubtaskAddTaskHTML(i, subTaskTitle) {
  return `
     <div class="edit-subtask-div">
       <input id="onEditSubtaskInput${i}" class="edit-subtask-input" value="${subTaskTitle}">
     <div class="on-edit-subtask-icons">
       <img onclick="deleteSubtaskAddTask(${i})" src="./assets/img/delete_trashcan_icon.png" alt="">
       <div class="subtasks-seperator"></div>
       <img onclick="saveEditedSubtaskAddTask(${i})" src="./assets/img/addtask_check.svg" alt="">
     </div>`;
}

function renderAddTaskPopUpHTML() {
  return ` 
    <img
            src="./assets/img/close_big_icon.png"
            alt=""
            class="close-popup-btn"
            id="closePopUpBtn"
            onclick="closeAddTaskPopUpCross()"
          />

         <h2>Add Task</h2>

        <form id="addTaskForm" class="add-task-form" onsubmit="getInputAddTaskBoard()">
            <div class="add-task-left">
                <label>Title<span class="asterisk">*</span></label>
                <input id="titleInput" autocomplete="off"  class="title-input" type="text" placeholder="Enter a title" required />
                <!-- <span class="red-required-text">This field is required</span> -->

                <label class="margin-top-16px">Description</label>
                <textarea id="descriptionText" class="description-text" placeholder="Enter a Description"></textarea>
                <label class="margin-top-16px">Assigned to</label>

                <div id="assignedDiv" class="assigned-to-div" onclick="showAssignedDropdown(); renderContactsDropdownAddTask()">
                    <input id="assignedInput" type="text" class="assigned-input" autocomplete="off" onkeyup="renderContactsDropdownAddTask()" placeholder="Select contacts to assign" />
                    <img id="dropdown1" src="./assets/img/arrow_drop_down_svg.svg" class="dropdown-icon" alt="" />
                    <img id="dropdown2" src="./assets/img/arrow_dropdown2_svg.svg" class="d-none dropdown-icon" alt="" onclick="hideAssignedDropdown()"/>
                </div>
                <div id="assignedContacts"></div>
                <div id="assignedDropdown" class="assigned-dropdown assigned-scrollbar d-none"></div>
                <span class="required-text"><span class="asterisk">*</span>This field is required</span>

            </div>

            <div class="seperator"></div>

            <div class="add-task-right">
                <label for="dueDate">Due date<span class="asterisk">*</span></label>
                <input id="dueDate" class="date-input" type="date" required />
                
                <label class="margin-top-16px">Prio</label>
                <div id="prioBtnContainer" class="prio-buttons">
                ${getPrioButtonMediumAddTaskHTML('medium')}
                </div>

                  <label class="margin-top-16px">Category<span class="asterisk">*</span></label>
                <div id="categoryDiv" onclick="renderCategoryAddTask()" class="category-div">
                    <span id="categorySelection">Select task category</span>
                    <img id="categoryIcon1" class="dropdown-icon" src="./assets/img/arrow_drop_down_svg.svg" alt="" />
                    <img id="categoryIcon2" src="./assets/img/arrow_dropdown2_svg.svg" class="d-none dropdown-icon" alt="" />
                     <div id="categoryDropdown" class="d-none">
                    <span class="category-option" onclick="selectOption(1)">Technical task</span>
                    <span class="category-option" onclick="selectOption(2)">User story</span>
                </div>
                </div>
               
                <input type="hidden" id="selectedCategory" name="category" required />
                <span id="requiredText3" class="red-required-text"></span>
                  
                <label >Subtasks</label>
                <div id="subtasksDiv" class="subtasks-div" onclick="showSubtasksIcons()">
                    <input id="subtasksInput" autocomplete="off"  min="1" type="text" placeholder="Add new subtask" />
                    <img id="subtasksPlusIcon" class="subtasks-icon" src="./assets/img/add_svg.svg" alt="" />
                    <div id="subtasksInputIcons" class="d-none">
                        <img src="./assets/img/addtask_close.svg" class="subtasks-icon" onclick="clearSubtasksInput()" alt="" />
                        <div class="subtasks-seperator"></div>
                        <img src="./assets/img/addtask_check.svg" class="subtasks-icon" onclick="addNewSubtaskAddTaskPopUp()" alt="" />
                    </div>
                </div>
                <div id="subtasksList" class="subtasks-scrollbar"></div>
                <div class="clear-and-task-button">
                    <button class="clear-button" type="button" onclick="resetForm()">
                        Clear
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.14434 8.40005L2.24434 13.3C2.061 13.4834 1.82767 13.575 1.54434 13.575C1.261 13.575 1.02767 13.4834 0.844336 13.3C0.661003 13.1167 0.569336 12.8834 0.569336 12.6C0.569336 12.3167 0.661003 12.0834 0.844336 11.9L5.74434 7.00005L0.844336 2.10005C0.661003 1.91672 0.569336 1.68338 0.569336 1.40005C0.569336 1.11672 0.661003 0.883382 0.844336 0.700049C1.02767 0.516715 1.261 0.425049 1.54434 0.425049C1.82767 0.425049 2.061 0.516715 2.24434 0.700049L7.14434 5.60005L12.0443 0.700049C12.2277 0.516715 12.461 0.425049 12.7443 0.425049C13.0277 0.425049 13.261 0.516715 13.4443 0.700049C13.6277 0.883382 13.7193 1.11672 13.7193 1.40005C13.7193 1.68338 13.6277 1.91672 13.4443 2.10005L8.54434 7.00005L13.4443 11.9C13.6277 12.0834 13.7193 12.3167 13.7193 12.6C13.7193 12.8834 13.6277 13.1167 13.4443 13.3C13.261 13.4834 13.0277 13.575 12.7443 13.575C12.461 13.575 12.2277 13.4834 12.0443 13.3L7.14434 8.40005Z" />
                        </svg>
                    </button>
                    <button id="createTaskButton" type="submit" class="create-task-button">
                        Create Task <img src="./assets/img/check_white_svg.svg" alt="" />
                    </button>
                </div>
            </div>

            <div id="toastDiv" class="d-none">Task added to board <img src="./assets/img/board-icon.png" alt="" /></div>
        </form>
        <!-- Modal for confirmation -->
        <div id="duplicateTaskModal" class="task-modal">
            <div class="task-modal-content">
                <img src="./assets/img/close_big_icon.png" class="task-close" alt="">
                <p>A task with this title already exists. Are you sure you want to create another one?</p>
                <button id="confirmDuplicateTask">Yes, create task</button>
                <button id="cancelDuplicateTask" onclick="closeModal()">Cancel</button>
            </div>
        </div>
   `;
}
