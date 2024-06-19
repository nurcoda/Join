let assignedContacts = [];
let tempSubtasks = [];
let currentButtonPrio = "";

let newTask = [];

function setDefaultPriority() {
  setPrioButton("medium");
}

function setPrioButton(prio) {
  changeButtonColorAndImg(prio);
  currentButtonPrio = prio;
}

function changeButtonColorAndImg(prio) {
  const priorities = ["urgent", "medium", "low"];
  const colors = {
    urgent: "#FF3D00",
    medium: "#FFA800",
    low: "#7AE229",
  };

  priorities.forEach((priority) => {
    let button = document.getElementById(priority + "Button");
    let img = document.getElementById(priority + "ButtonImg");
    if (priority === prio) {
      img.src = `./assets/img/prio_${priority}_white_svg.svg`;
      button.style.backgroundColor = colors[priority];
    } else {
      img.src = `./assets/img/prio_${priority}_svg.svg`;
      button.style.backgroundColor = "white";
    }
  });
}

// subtasks

function showSubtasksIcons() {
  document.getElementById("subtasksPlusIcon").classList.add("d-none");
  document.getElementById("subtasksInputIcons").classList.remove("d-none");
}

function hideSubtasksIcons(event) {
  event.stopPropagation(); // Verhindert, dass das Klick-Event weitergeleitet wird
  document.getElementById("subtasksInputIcons").classList.add("d-none");
  document.getElementById("subtasksPlusIcon").classList.remove("d-none");
}

function clearSubtasksInput() {
  let input = document.getElementById("subtasksInput");
  input.value = "";
  hideSubtasksIcons(event);
}

function addNewSubtask() {
  let input = document.getElementById("subtasksInput").value;
  tempSubtasks.push(input);
  renderSubtasks();
  clearSubtasksInput();
}

document.getElementById("subtasksDiv").addEventListener("click", function () {
  document.getElementById("subtasksInput").focus(); // Setzt den Fokus auf das Input-Feld
});

function renderSubtasks() {
  let subtasksList = document.getElementById("subtasksList");
  subtasksList.innerHTML = "";
  for (let i = 0; i < tempSubtasks.length; i++) {
    const subtask = tempSubtasks[i];
    subtasksList.innerHTML += `<div id="subtask${i}">
    <div class="subtask-div" onmouseover="showEditIcons(event, ${i})" onmouseout="hideEditIcons(${i})"><p>• ${subtask}</p>
  <div id="subtask${i}Icons" class="edit-subtask-icons d-none">
  <img onclick="editSubtask(${i})" src="./assets/img/edit_pen_icon.png" alt="">
  <div class="subtasks-seperator"></div>
  <img onclick="deleteSubtask(${i})" src="./assets/img/delete_trashcan_icon.png" alt="">
  </div>
  </div>`;
  }
}

function showEditIcons(event, i) {
  let DivElement = event.target;
  let icons = document.getElementById(`subtask${i}Icons`);
  icons.classList.remove("d-none");
}

function hideEditIcons(i) {
  let icons = document.getElementById(`subtask${i}Icons`);
  icons.classList.add("d-none");
}

function editSubtask(i) {
  let subtask = document.getElementById(`subtask${i}`);
  subtask.innerHTML = `
  <div class="edit-subtask-div">
    <input id="onEditSubtaskInput${i}" class="edit-subtask-input">
  <div class="on-edit-subtask-icons">
    <img onclick="deleteSubtask(${i})" src="./assets/img/delete_trashcan_icon.png" alt="">
    <div class="subtasks-seperator"></div>
    <img onclick="saveEditedSubtask(${i})" src="./assets/img/addtask_check.svg" alt="">
  </div>`;
  subtask.style.padding = "2px 0px 2px 0px";
  subtask.style.width = "432px";
  input = document.getElementById(`onEditSubtaskInput${i}`);
  input.value = subtasks[i];
}

function saveEditedSubtask(i) {
  input = document.getElementById(`onEditSubtaskInput${i}`);
  tempSubtasks.splice(i, 1, input.value);
  renderSubtasks();
}

function deleteSubtask(i) {
  tempSubtasks.splice(i, 1);
  renderSubtasks();
}

// function renderEditSubtask() {

function showAssignedDropdown() {
  document.getElementById("assignedDropdown").classList.remove("d-none");
  showOpenedDropdownIcon();
}

function hideAssignedDropdown() {
  event.stopPropagation();
  document.getElementById("assignedDropdown").classList.add("d-none");
  hideOpenedDropdownIcon();
}

function showOpenedDropdownIcon() {
  document.getElementById("dropdown1").classList.add("d-none");
  document.getElementById("dropdown2").classList.remove("d-none");
}

function hideOpenedDropdownIcon() {
  document.getElementById("dropdown2").classList.add("d-none");
  document.getElementById("dropdown1").classList.remove("d-none");
}

document.getElementById("assignedDiv").addEventListener("click", function () {
  document.getElementById("assignedInput").focus(); // Setzt den Fokus auf das Input-Feld
});

function renderContacts() {
  let dropdown = document.getElementById("assignedDropdown");
  let searchInput = document.getElementById("assignedInput").value.toLowerCase(); // Wert des Suchfelds
  dropdown.innerHTML = ""; // Bereinigen des Dropdown-Inhalts

  // Sortieren der Kontakte alphabetisch nach Namen
  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const isAssigned = assignedContacts.includes(contact); // Prüfen, ob der Kontakt markiert ist
    const contactClass = isAssigned ? "assigned-to-contact marked" : "assigned-to-contact"; // Klasse basierend auf Zuweisungsstatus
    const imgSrc = isAssigned ? "./assets/img/checked_btn_white_svg.svg" : "./assets/img/check_btn.png";

    // Überprüfen, ob der Kontaktname dem Suchkriterium entspricht
    if (contact.name.toLowerCase().includes(searchInput)) {
      // Erstellen des HTML-Strings für jeden Kontakt
      dropdown.innerHTML += `
        <div id="contact${contact.id}" class="${contactClass}" onclick="markContact(${contact.id}, ${i})">
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
}

function addContactToAssigned(i) {
  let contact = contacts[i];
  assignedContacts.push(contact);
  renderAssignedContacts();
}

function removeContactFromAssigned(i) {
  // Kontakt aus dem ursprünglichen Array 'contacts' holen
  let contact = contacts[i];

  // Index des Kontakts im 'assignedContacts' Array finden
  let index = assignedContacts.findIndex((c) => c.id === contact.id);

  // Prüfen, ob der Kontakt gefunden wurde, und nur dann entfernen
  if (index !== -1) {
    assignedContacts.splice(index, 1);
  }

  // Aktualisieren der Anzeige
  renderAssignedContacts();
}

function renderAssignedContacts() {
  let content = document.getElementById("assignedContacts");
  content.innerHTML = "";
  for (let i = 0; i < assignedContacts.length; i++) {
    const contact = assignedContacts[i];
    content.innerHTML += `
    <div class="assigned-contacts-img" style="background-color: ${contact.color}; color: white">
    ${contact.first_two_letters}
  </div>
    `;
  }
}

function markContact(contactId, i) {
  let contact = document.getElementById(`contact${contactId}`);
  let checkbox = document.getElementById(`contactCheckBtn${contactId}`);

  // Umschalten der Markierungsklasse
  contact.classList.toggle("marked");

  // Prüfen, ob die Klasse vorhanden ist, und dementsprechend das Bild ändern
  if (contact.classList.contains("marked")) {
    contact.style.backgroundColor = "#2A3647";
    contact.style.color = "white";
    checkbox.src = "./assets/img/checked_btn_white_svg.svg";
    addContactToAssigned(i);
  } else {
    contact.style.color = "black";
    contact.style.backgroundColor = "white";
    checkbox.src = "./assets/img/check_btn.png";
    removeContactFromAssigned(i);
  }
}

// category

document.getElementById("categoryDiv").addEventListener("click", function () {
  var dropdown = document.getElementById("categoryDropdown");
  dropdown.classList.toggle("d-none"); // Toggle 'd-none' class
  document.getElementById("categoryDiv").style.border = ""; // Remove the red border
});

function selectOption(option) {
  let selection = document.getElementById("categorySelection");
  let hiddenInput = document.getElementById("selectedCategory");

  if (option == 1) {
    selection.innerHTML = "Technical task";
    hiddenInput.value = "Technical task";
  } else if (option == 2) {
    selection.innerHTML = "User story";
    hiddenInput.value = "User story";
  }

  let dropdown = document.getElementById("categoryDropdown");
  dropdown.classList.add("d-none");
}

document.querySelector(".create-task-button").addEventListener("click", function (event) {
  let hiddenInput = document.getElementById("selectedCategory");
  if (hiddenInput.value === "") {
    document.getElementById("categoryDiv").style.border = "1px solid red";
    event.preventDefault(); // Prevent form submission
  } else {
    document.getElementById("categoryDiv").style.border = "none";
  }
});

// funktion fürs dropdownicon flippen fehlt noch

// submit/add a task

function addTask() {
  let title = document.getElementById("titleInput").value;
  let newId = generateId();
  let description = document.getElementById("descriptionText").value;
  let category = document.getElementById("categorySelection").innerHTML;
  let dueDate = document.getElementById("dueDate").value;

  // Dynamisch zugewiesene Kontakte aus assignedContacts Array
  let assignedUsers = assignedContacts.map((contact) => ({
    name: contact.name,
    first_two_letters: contact.first_two_letters,
  }));

  // Dynamisch erstellte Unteraufgaben aus tempSubtasks Array
  let subtasks = tempSubtasks.map((subtask) => ({
    subtask_name: subtask,
    subtask_isdone: false,
  }));

  newTask = {
    name: title,
    id: newId,
    description: description,
    category: category,
    priority: currentButtonPrio,
    due_date: dueDate,
    state: "todo",
    assigned_user: assignedUsers,
    subtasks: subtasks,
  };

  tasks.push(newTask);
  console.log(tasks);
}

function generateId() {
  let generatedId;
  let isUnique = false;

  while (!isUnique) {
    // Generiere eine zufällige 6-stellige Zahl
    generatedId = Math.floor(100000 + Math.random() * 900000);

    // Überprüfen, ob die ID bereits existiert
    isUnique = !tasks.some((task) => task.id === generatedId);
  }

  return generatedId;
}
