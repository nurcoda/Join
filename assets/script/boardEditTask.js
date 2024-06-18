function showAssignedDropdown() {
   document.getElementById("assignedDropdown").classList.remove("d-none");
   showOpenedDropdownIcon();
}

function renderAssignedContactsPopUp(i) {
   let assignedUser = "";
   tasks[i].assigned_user.forEach((user) => {
      let assignedUserColor = getColorAssignedUser(user.name);
      assignedUser += `
       <div class="assigned-contacts-img" style="background-color: ${assignedUserColor}; color:white;">${user.first_two_letters}</div>
       `;
   });
   return assignedUser;
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

// document.getElementById("assignedDiv").addEventListener("click", function () {
//    document.getElementById("assignedInput").focus(); // Setzt den Fokus auf das Input-Feld
// });

let assignedContacts = [];

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

function addContactToAssigned(i) {
   let contact = contacts[i];
   assignedContacts.push(contact);
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

function removeContactFromAssigned(i) {
   let contact = contacts[i];
   let index = assignedContacts.findIndex((c) => c.id === contact.id);
   if (index !== -1) {
      assignedContacts.splice(index, 1);
   }
   renderAssignedContacts();
}
