function setPrioButton(prio) {
  changeButtonColorAndImg(prio);
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
  let subtasksList = document.getElementById("subtasksList");
  // subtasks.push(input);
  subtasksList.innerHTML += `<li>${input}</li>`;
  clearSubtasksInput();
}

document.getElementById("subtasksDiv").addEventListener("click", function () {
  document.getElementById("subtasksInput").focus(); // Setzt den Fokus auf das Input-Feld
});

// assigned to

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
  dropdown.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    dropdown.innerHTML += `
      <div id="contact${contact.id}" class="assigned-to-contact" onclick="markContact(${contact.id})">
        <div class="contact-img-name">
          <img src="./assets/img/Anton.png" alt="" />
          <span>${contact.name}</span>
        </div>
        <img class="check-btn-img" src="./assets/img/check_btn.png" alt="" />
      </div>`;
  }
}

function markContact(contactId) {
  let contact = document.getElementById(`contact${contactId}`);
  contact.style.backgroundColor = "#2A3647";
}

// category

document.getElementById("categoryDiv").addEventListener("click", function () {
  var dropdown = document.getElementById("categoryDropdown");
  dropdown.classList.toggle("d-none"); // Toggle 'd-none' Klasse
});

function selectOption(option) {
  let selection = document.getElementById("categorySelection");
  if (option == 1) {
    selection.innerHTML = "Technical task";
  }
  if (option == 2) {
    selection.innerHTML = "User story";
  }
  let dropdown = document.getElementById("categoryDropdown");
  dropdown.classList.add("d-none");
}


// funktion fürs dropdownicon flippen fehlt noch