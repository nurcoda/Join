let addTaskSubtasks = [];
let currentPriority = 'medium';
let addTaskState = '';

function openAddTaskPopUp(state) {
  assignedContacts = [];
  currentPriority = 'medium';
  addTaskState = state;
  addTaskSubtasks = [];
  addTaskPopUpBackground.classList.remove('d-none');
  addTaskPopUp.innerHTML = renderAddTaskPopUpHTML();
}

// SUBTASKS

function addNewSubtaskAddTaskPopUp() {
  let inputField = document.getElementById('subtasksInput');
  let input = inputField.value;
  let subtasksListContainer = document.getElementById('subtasksList');

  if (input === '') {
    return;
  }

  let newSubTask = { 'subtask_name': input, 'subtask_isdone': false };
  addTaskSubtasks.push(newSubTask);
  inputField.value = '';
  subtasksListContainer.innerHTML = `${renderSubtasksAddTaskPopUp()}`;
}

function renderSubtasksAddTaskPopUp(i) {
  let subtaskList = '';
  for (let i = 0; i < addTaskSubtasks.length; i++) {
    if (addTaskSubtasks[i] && addTaskSubtasks.length > 0) {
      let subTaskTitle = addTaskSubtasks[i].subtask_name;
      subtaskList += renderSubtasksAddTaskPopUpHTML(i, subTaskTitle);
    }
  }
  return subtaskList;
}

function editSubtaskAddTask(i, subTaskTitle) {
  let subtask = document.getElementById(`subtask${i}`);
  subtask.innerHTML = editSubtaskAddTaskHTML(i, subTaskTitle);
  subtask.style.padding = '2px 0px 2px 0px';
}

function saveEditedSubtaskAddTask(i) {
  input = document.getElementById(`onEditSubtaskInput${i}`);
  addTaskSubtasks[i].subtask_name = input.value;
  renderSubtasksAfterEditAddTask(i);
}

function deleteSubtaskAddTask(i) {
  addTaskSubtasks.splice(i, 1);
  renderSubtasksAfterEditAddTask(i);
}

function renderSubtasksAfterEditAddTask(i) {
  let subtasksList = document.getElementById('subtasksList');
  subtasksList.innerHTML = '';
  if (addTaskSubtasks.length > 0) {
    for (let j = 0; j < addTaskSubtasks.length; j++) {
      let subTaskTitle = addTaskSubtasks[j].subtask_name;
      subtasksList.innerHTML += renderSubtasksAddTaskPopUpHTML(j, subTaskTitle);
    }
  }
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
