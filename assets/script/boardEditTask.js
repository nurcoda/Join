// +++ !!! +++ !!! +++
// DONT TOUCH THIS
// +++ !!! +++ !!! +++

function initRenderAssignedContacts(i) {
  let assignedUserHTML = '';
  assignedContacts = [];
  if (tasks[i].assigned_user && tasks[i].assigned_user.length > 0) {
    tasks[i].assigned_user.forEach((user) => {
      let user_id = getUserIdByName(user.name);
      let assignedUser = getUserObjectById(user_id);
      assignedContacts.push(assignedUser);
      let assignedUserColor = getColorAssignedUser(user.name);
      assignedUserHTML += initRenderAssignedContactsHTML(assignedUserColor, user, user_id);
    });
  } else {
    assignedUserHTML = ``;
  }
  return assignedUserHTML;
}

function renderAssignedContactsPopUp(i) {
  assignedContacts = [];
  let assignedUser = '';
  tasks[i].assigned_user.forEach((user) => {
    let user_id = getUserIdByName(user.name);
    let assignedUser = getUserObjectById(user_id);
    assignedContacts.push(assignedUser);
    let assignedUserColor = getColorAssignedUser(user.name);
    assignedUser += `
       <div class="assigned-contacts-img" style="background-color: ${assignedUserColor}; color:white;" data-id="${user_id}">
          ${user.first_two_letters}
       </div>
       `;
  });
  return assignedUser;
}

function getUserObjectById(user_id) {
  return contacts.find((user) => user.id === user_id);
}
/**
 * render dropdown contactlist to assign user
 * checks, assigned user and marks them
 * @param {*} i
 */

function renderContactsDropdownPopUpEdit(i) {
  let dropdown = document.getElementById('assignedDropdown');
  dropdown.innerHTML = '';

  for (let j = 0; j < contacts.length; j++) {
    let isAssigned = false;
    let imgSrc = './assets/img/check_btn.png';

    if (tasks[i].assigned_user && tasks[i].assigned_user.length > 0) {
      for (let k = 0; k < tasks[i].assigned_user.length; k++) {
        let assigned_user_id = getUserIdByName(tasks[i].assigned_user[k].name);

        if (assigned_user_id === contacts[j].id) {
          isAssigned = true;
          imgSrc = './assets/img/checked_btn_white_svg.svg';
          break;
        }
      }
    }
    dropdown.innerHTML += renderContactsDropdownPopUpEditHTML(j, imgSrc, isAssigned);
  }
}

function getUserIdByName(userName) {
  const user = contacts.find((user) => user.name.includes(userName));
  return user ? user.id : null;
}

function markContactEditPopUp(contactId, i) {
  let contact = document.getElementById(`contact${contactId}`);
  let checkbox = document.getElementById(`contactCheckBtn${contactId}`);
  contact.classList.toggle('marked');
  renderAssignedContactsEditPopUp();

  if (contact.classList.contains('marked')) {
    contact.style.backgroundColor = '#2A3647';
    contact.style.color = 'white';
    checkbox.src = './assets/img/checked_btn_white_svg.svg';
    addContactToAssignedEditPopUp(contactId);
  } else {
    contact.style.color = 'black';
    contact.style.backgroundColor = 'white';
    checkbox.src = './assets/img/check_btn.png';
    removeContactFromAssignedEditPopUp(contactId);
  }
}

function addContactToAssignedEditPopUp(contactId) {
  let contact = contacts.find((c) => c.id === contactId);
  if (contact && !assignedContacts.some((c) => c.id === contactId)) {
    assignedContacts.push(contact);
    renderSingleAssignedContact(contact);
  }
}

function removeContactFromAssignedEditPopUp(contactId) {
  let index = assignedContacts.findIndex((c) => c.id === contactId);
  if (index !== -1) {
    assignedContacts.splice(index, 1);
    document
      .querySelector(`#assignedContacts .assigned-contacts-img[data-id="${contactId}"]`)
      .remove();
  }
}

function renderSingleAssignedContact(contact) {
  let content = document.getElementById('assignedContacts');
  content.innerHTML += `
      <div class="assigned-contacts-img" data-id="${contact.id}" style="background-color: ${contact.color}; color: white;">
         ${contact.first_two_letters}
      </div>`;
}

function renderAssignedContactsEditPopUp() {
  let content = document.getElementById('assignedContacts');
  content.innerHTML = '';
  for (let i = 0; i < assignedContacts.length; i++) {
    const contact = assignedContacts[i];
    content.innerHTML += `
         <div class="assigned-contacts-img" data-id="${contact.id}" style="background-color: ${contact.color}; color: white;">
            ${contact.first_two_letters}
         </div>`;
  }
}

function showAssignedDropdown() {
  document.getElementById('assignedDropdown').classList.remove('d-none');
  showOpenedDropdownIcon();
}

function hideAssignedDropdown() {
  event.stopPropagation();
  document.getElementById('assignedDropdown').classList.add('d-none');
  hideOpenedDropdownIcon();
}

function showOpenedDropdownIcon() {
  document.getElementById('dropdown1').classList.add('d-none');
  document.getElementById('dropdown2').classList.remove('d-none');
}

function hideOpenedDropdownIcon() {
  document.getElementById('dropdown2').classList.add('d-none');
  document.getElementById('dropdown1').classList.remove('d-none');
}

// ___________________________________________
//             SUBTASK SECTION
// ___________________________________________

function showSubtasksIcons() {
  document.getElementById('subtasksPlusIcon').classList.add('d-none');
  document.getElementById('subtasksInputIcons').classList.remove('d-none');
}

function addNewSubtaskEditPopUp(i) {
  let input = document.getElementById('subtasksInput').value;
  let newSubTask = { 'subtask_name': input, 'subtask_isdone': false };
  if (!tasks[i].subtasks) {
    tasks[i].subtasks = [];
  }
  tasks[i].subtasks.push(newSubTask);
  let subtasksListContainer = document.getElementById('subtasksList');
  subtasksListContainer.innerHTML = `${renderSubtasksEditPopUp(i)}`;
}

function renderSubtasksEditPopUp(i) {
  let subtaskList = '';

  if (tasks[i].subtasks && tasks[i].subtasks.length > 0) {
    for (let j = 0; j < tasks[i].subtasks.length; j++) {
      let subTaskTitle = tasks[i].subtasks[j].subtask_name;
      subtaskList += renderSubtasksEditPopUpHTML(i, j, subTaskTitle);
    }
  } else {
    subtaskList = ``;
  }

  return subtaskList;
}

// SUBTASKS

function editSubtask(i, j, subTaskTitle) {
  let subtask = document.getElementById(`subtask${j}`);
  subtask.innerHTML = editSubtaskHTML(i, j, subTaskTitle);
  subtask.style.padding = '2px 0px 2px 0px';
}

function saveEditedSubtask(i, j) {
  input = document.getElementById(`onEditSubtaskInput${j}`);
  tasks[i].subtasks[j].subtask_name = input.value;
  renderSubtasksAfterEdit(i, j);
}

function deleteSubtask(i, j) {
  tasks[i].subtasks.splice(j, 1);
  renderSubtasksAfterEdit(i, j);
}

function renderSubtasksAfterEdit(i, j) {
  let subtasksList = document.getElementById('subtasksList');
  subtasksList.innerHTML = '';
  for (let j = 0; j < tasks[i].subtasks.length; j++) {
    let subTaskTitle = tasks[i].subtasks[j].subtask_name;
    subtasksList.innerHTML += renderSubtasksAfterEditHTML(i, j, subTaskTitle);
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

// __________________________________________________________________;
// Find Task

let matchedTasks = [];
let matchedTasksIndex = [];

function findTaskInBoard() {
  matchedTasks = [];
  matchedTasksIndex = [];
  let searchInput = document.getElementById('searchTask').value.trim().toLowerCase();

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].name.toLowerCase().includes(searchInput)) {
      matchedTasks.push(tasks[i]);
    }
  }

  for (let j = 0; j < matchedTasks.length; j++) {
    matchedTasksIndex.push(findTaskIndexById(matchedTasks[j].id));
  }

  renderTasksIntoColumnsSearching();
}

function findTaskIndexById(id) {
  let basicIndex = tasks.findIndex((task) => task.id === id);
  return basicIndex;
}

function renderTasksIntoColumnsSearching() {
  clearAllColums();
  for (let i = 0; i < matchedTasks.length; i++) {
    switch (matchedTasks[i].state) {
      case 'todo':
        todoCounter++;
        todoColumn.innerHTML += renderTasksIntoColumnsHTML(matchedTasksIndex[i]);
        break;
      case 'inprogress':
        inProgressCounter++;
        inProgressColumn.innerHTML += renderTasksIntoColumnsHTML(matchedTasksIndex[i]);
        break;
      case 'awaitfeedback':
        awaitFeedbackCounter++;
        awaitFeedbackColumn.innerHTML += renderTasksIntoColumnsHTML(matchedTasksIndex[i]);
        break;
      case 'done':
        doneCounter++;
        doneColumn.innerHTML += renderTasksIntoColumnsHTML(matchedTasksIndex[i]);
        break;
      default:
        console.error(`Unknown state: ${task.state}`);
    }
  }
  checkIfColumnIsEmpty();
}

// _________________________________
//   ##### ADD TASK BOARD ###########
// _________________________________

let addTaskSubtasks = [];

function openAddTaskPopUp() {
  addTaskSubtasks = [];
  addTaskPopUpBackground.classList.remove('d-none');
  renderAddTaskPopUp();
}

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

// SUBTASKS

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

        <form id="addTaskForm" class="add-task-form">
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

// async function addTask(event) {
//    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

//    const createTaskButton = document.getElementById("createTaskButton");
//    createTaskButton.disabled = true; // Button deaktivieren um die Erstellung von mehreren gleichen Tasks zu vermeiden

//    let title = document.getElementById("titleInput").value;

//    // Check for duplicate task titles
//    if (tasks.some((task) => task.name === title)) {
//      pendingTaskData = {
//        title: title,
//        description: document.getElementById("descriptionText").value,
//        category: document.getElementById("categorySelection").innerHTML,
//        dueDate: document.getElementById("dueDate").value,
//        assignedUsers: assignedContacts.map((contact) => ({
//          name: contact.name,
//          first_two_letters: contact.first_two_letters,
//        })),
//        subtasks: tempSubtasks.map((subtask) => ({
//          subtask_name: subtask,
//          subtask_isdone: false,
//        })),
//      };
//      showDuplicateTaskModal();
//      createTaskButton.disabled = false; // Re-enable the button if duplicate is found
//      return; // Exit the function to prevent creating a duplicate task
//    }

//    let newId = generateId();
//    let description = document.getElementById("descriptionText").value;
//    let category = document.getElementById("categorySelection").innerHTML;
//    let dueDate = document.getElementById("dueDate").value;
//    let formattedDueDate = formatDueDate(dueDate);

//    // Dynamisch zugewiesene Kontakte aus assignedContacts Array
//    let assignedUsers = assignedContacts.map((contact) => ({
//      name: contact.name,
//      first_two_letters: contact.first_two_letters,
//    }));

//    // Dynamisch erstellte Unteraufgaben aus tempSubtasks Array
//    let subtasks = tempSubtasks.map((subtask) => ({
//      subtask_name: subtask,
//      subtask_isdone: false,
//    }));

//    let newTask = {
//      name: title,
//      id: newId,
//      description: description,
//      category: category,
//      priority: currentButtonPrio,
//      due_date: formattedDueDate,
//      state: "todo",
//      assigned_user: assignedUsers,
//      subtasks: subtasks,
//    };

//    // Aufgabe zum lokalen Array hinzufügen
//    tasks.push(newTask);

//    // Aufgabe in Firebase speichern
//    await updateData(`tasks/${newId}`, newTask);

//    showToast();

//    // Schließen des Popups nach dem Erstellen der Aufgabe
//    closeModal();
//  }
