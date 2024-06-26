let addTaskSubtasks = [];
let currentPriority = 'medium';
let addTaskState = '';

function openAddTaskPopUp(state) {
  assignedContacts = [];
  currentPriority = 'medium';
  addTaskState = state;
  addTaskSubtasks = [];
  addTaskPopUpBackground.classList.remove('d-none');
  renderAddTaskPopUp();
}

// SUBTASKS

function addNewSubtaskEditPopUp() {
  let inputField = document.getElementById('subtasksInput');
  let input = inputField.value;
  let newSubTask = { 'subtask_name': input, 'subtask_isdone': false };
  addTaskSubtasks.push(newSubTask);
  inputField.value = '';
  let subtasksListContainer = document.getElementById('subtasksList');
  subtasksListContainer.innerHTML = `${renderSubtasksEditPopUp()}`;
}

function renderSubtasksEditPopUp(i) {
  let subtaskList = '';
  for (let i = 0; i < addTaskSubtasks.length; i++) {
    if (addTaskSubtasks[i] && addTaskSubtasks.length > 0) {
      let subTaskTitle = addTaskSubtasks[i].subtask_name;
      subtaskList += renderSubtasksaddTaskPopUpHTML(i, subTaskTitle);
    }
  }
  return subtaskList;
}

function editSubtask(i, subTaskTitle) {
  let subtask = document.getElementById(`subtask${i}`);
  subtask.innerHTML = editSubtaskAddTaskHTML(i, subTaskTitle);
  subtask.style.padding = '2px 0px 2px 0px';
}

function saveEditedSubtask(i) {
  input = document.getElementById(`onEditSubtaskInput${i}`);
  addTaskSubtasks[i].subtask_name = input.value;
  renderSubtasksAfterEdit(i);
}

function deleteSubtask(i) {
  addTaskSubtasks.splice(i, 1);
  renderSubtasksAfterEdit(i);
}

function renderSubtasksAfterEdit(i) {
  let subtasksList = document.getElementById('subtasksList');
  subtasksList.innerHTML = '';
  if (addTaskSubtasks.length > 0) {
    for (let j = 0; j < addTaskSubtasks.length; j++) {
      let subTaskTitle = addTaskSubtasks[j].subtask_name;
      subtasksList.innerHTML += renderSubtasksaddTaskPopUpHTML(j, subTaskTitle);
    }
  }
}

function showEditIcons(event, i) {
  let icons = document.getElementById(`subtask${i}Icons`);
  icons.classList.remove('d-none');
}

function hideEditIcons(i) {
  let icons = document.getElementById(`subtask${i}Icons`);
  icons.classList.add('d-none');
}

async function getInputAddTaskBoard() {
  event.preventDefault();
  let newTask = {
    'name': document.getElementById('titleInput').value,
    'description': document.getElementById('descriptionText').value,
    'id': generateId(),
    'due_date': formatDueDate(document.getElementById('dueDate').value),
    'category': document.getElementById('categorySelection').innerHTML,
    'priority': currentPriority,
    'state': addTaskState,
    'assigned_user': assignedContacts.map((contact) => ({
      'name': contact.name,
      'first_two_letters': contact.first_two_letters
    })),
    'subtasks': addTaskSubtasks.map((subtask) => ({
      'subtask_name': subtask.subtask_name,
      'subtask_isdone': false
    }))
  };
  tasks.push(newTask);
  await addTaskBoardToDB(`tasks/${newTask.id}`, newTask);
  closePopUpAndReloadBoard();
}

async function addTaskBoardToDB(path, data) {
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function closePopUpAndReloadBoard() {
  renderTasksIntoColumns();
  addTaskPopUpBackground.classList.add('d-none');
}

function formatDueDate(dueDate) {
  return dueDate.split('-').reverse().join('/');
}

function generateId() {
  let generatedId = Math.floor(100000 + Math.random() * 900000);
  if (tasks.some((task) => task.id === generatedId)) {
    return generateId();
  }
  return generatedId;
}

function renderAddTaskPopUp() {
  addTaskPopUp.innerHTML = ` 
    <img
            src="./assets/img/close_big_icon.png"
            alt=""
            class="close-popup-btn"
            id="closePopUpBtn"
            onclick="closeAddTaskPopUp()"
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
                </div>
                <div id="categoryDropdown" class="d-none">
                    <span class="category-option" onclick="selectOption(1)">Technical task</span>
                    <span class="category-option" onclick="selectOption(2)">User story</span>
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
                        <img src="./assets/img/addtask_check.svg" class="subtasks-icon" onclick="addNewSubtaskEditPopUp()" alt="" />
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

// Helper Add Task

function renderContactsDropdownAddTask() {
  let dropdown = document.getElementById('assignedDropdown');
  let searchInput = document.getElementById('assignedInput').value.toLowerCase(); // Wert des Suchfelds
  dropdown.innerHTML = '';
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const isAssigned = assignedContacts.includes(contact); // Prüfen, ob der Kontakt markiert ist
    const contactClass = isAssigned ? 'assigned-to-contact marked' : 'assigned-to-contact'; // Klasse basierend auf Zuweisungsstatus
    const imgSrc = isAssigned
      ? './assets/img/checked_btn_white_svg.svg'
      : './assets/img/check_btn.png';

    // Überprüfen, ob der Kontaktname dem Suchkriterium entspricht
    if (contact.name.toLowerCase().includes(searchInput)) {
      // Erstellen des HTML-Strings für jeden Kontakt
      dropdown.innerHTML += `
        <div id="contact${contact.id}" class="${contactClass}" onclick="markContactEditPopUp(${contact.id}, ${i}); event.stopPropagation();">
          <div class="contact-img-name">
            <div class="two-letters-img" style="background-color: ${contact.color}; color: white;">
              ${contact.first_two_letters}
            </div>
            <span>${contact.name}</span>
          </div>
          <img id="contactCheckBtn${contact.id}" class="check-btn-img" src="${imgSrc}" alt="" />
        </div>`;
    }
  }
  if (dropdown.innerHTML == '') {
    dropdown.innerHTML = "<span class='no-contacts-text'>No contacts found.</span>";
  }
}

function setPrioButtonAddTask(prio) {
  changeButtonColorAndImgAddTask(prio);
  currentPriority = prio;
}

function changeButtonColorAndImgAddTask(prio) {
  let prioBtnContainer = document.getElementById('prioBtnContainer');
  prioBtnContainer.innerHTML = `${getPrioButtonAddTask(prio)}`;
}

function getPrioButtonAddTask(prio) {
  if (prio === 'high') {
    return getPrioButtonHighAddTaskHTML(prio);
  }
  if (prio === 'medium') {
    return getPrioButtonMediumAddTaskHTML(prio);
  }
  if (prio === 'low') {
    return getPrioButtonLowAddTaskHTML(prio);
  }
}

function renderCategoryAddTask() {
  event.stopPropagation(); // Stop propagation to prevent immediate re-closing
  let dropdown = document.getElementById('categoryDropdown');
  let categoryDiv = document.getElementById('categoryDiv');
  let requiredText = document.getElementById('requiredText3');

  if (dropdown.classList.contains('d-none')) {
    dropdown.classList.remove('d-none'); // Show dropdown
    showOpenedCategoryIcon();
  } else {
    dropdown.classList.add('d-none'); // Hide dropdown
    hideOpenedCategoryIcon();
  }

  if (categoryDiv.style.border !== '1px solid #FF8190') {
    categoryDiv.style.border = '1px solid #d1d1d1'; // Set default border
    requiredText.innerHTML = '';
  }
}

function selectOption(option) {
  let selection = document.getElementById('categorySelection');
  let hiddenInput = document.getElementById('selectedCategory');

  if (option == 1) {
    selection.innerHTML = 'Technical Task';
    hiddenInput.value = 'Technical Task';
  } else if (option == 2) {
    selection.innerHTML = 'User Story';
    hiddenInput.value = 'User Story';
  }

  let dropdown = document.getElementById('categoryDropdown');
  dropdown.classList.add('d-none');
  hideOpenedCategoryIcon();
}

function showOpenedCategoryIcon() {
  document.getElementById('categoryIcon1').classList.add('d-none');
  document.getElementById('categoryIcon2').classList.remove('d-none');
}

function hideOpenedCategoryIcon() {
  document.getElementById('categoryIcon2').classList.add('d-none');
  document.getElementById('categoryIcon1').classList.remove('d-none');
}
