// +++ !!! +++ !!! +++
// DONT TOUCH THIS
// +++ !!! +++ !!! +++

function initRenderAssignedContacts(i) {
   let assignedUserHTML = "";
   assignedContacts = [];
   tasks[i].assigned_user.forEach((user) => {
      let user_id = getUserIdByName(user.name);
      let assignedUser = getUserObjectById(user_id);
      assignedContacts.push(assignedUser);
      let assignedUserColor = getColorAssignedUser(user.name);
      assignedUserHTML += `
       <div class="assigned-contacts-img" style="background-color: ${assignedUserColor}; color:white;" data-id="${user_id}">
          ${user.first_two_letters}
       </div>
       `;
   });
   return assignedUserHTML;
}

function renderAssignedContactsPopUp(i) {
   assignedContacts = [];
   let assignedUser = "";
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
   let dropdown = document.getElementById("assignedDropdown");
   dropdown.innerHTML = "";

   for (let j = 0; j < contacts.length; j++) {
      let isAssigned = false;
      let imgSrc = "./assets/img/check_btn.png";
      for (let k = 0; k < tasks[i].assigned_user.length; k++) {
         let assigned_user_id = getUserIdByName(tasks[i].assigned_user[k].name);
         if (assigned_user_id === contacts[j].id) {
            isAssigned = true;
            imgSrc = "./assets/img/checked_btn_white_svg.svg";
            break;
         }
      }

      dropdown.innerHTML += `
         <div id="contact${contacts[j].id}" class="assigned-to-contact ${
         isAssigned ? "marked" : ""
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
}

function getUserIdByName(userName) {
   const user = contacts.find((user) => user.name.includes(userName));
   return user ? user.id : null;
}

function markContactEditPopUp(contactId, i) {
   let contact = document.getElementById(`contact${contactId}`);
   let checkbox = document.getElementById(`contactCheckBtn${contactId}`);
   contact.classList.toggle("marked");
   renderAssignedContactsEditPopUp();

   if (contact.classList.contains("marked")) {
      contact.style.backgroundColor = "#2A3647";
      contact.style.color = "white";
      checkbox.src = "./assets/img/checked_btn_white_svg.svg";
      addContactToAssignedEditPopUp(contactId);
   } else {
      contact.style.color = "black";
      contact.style.backgroundColor = "white";
      checkbox.src = "./assets/img/check_btn.png";
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
      document.querySelector(`#assignedContacts .assigned-contacts-img[data-id="${contactId}"]`).remove();
   }
}

function renderSingleAssignedContact(contact) {
   let content = document.getElementById("assignedContacts");
   content.innerHTML += `
      <div class="assigned-contacts-img" data-id="${contact.id}" style="background-color: ${contact.color}; color: white;">
         ${contact.first_two_letters}
      </div>`;
}

function renderAssignedContactsEditPopUp() {
   let content = document.getElementById("assignedContacts");
   content.innerHTML = "";
   for (let i = 0; i < assignedContacts.length; i++) {
      const contact = assignedContacts[i];
      content.innerHTML += `
         <div class="assigned-contacts-img" data-id="${contact.id}" style="background-color: ${contact.color}; color: white;">
            ${contact.first_two_letters}
         </div>`;
   }
}

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
