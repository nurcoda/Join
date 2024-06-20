// +++ !!! +++ !!! +++
// DONT TOUCH THIS
// +++ !!! +++ !!! +++

function initRenderAssignedContacts(i) {
   let assignedUserHTML = "";
   assignedContacts = [];
   if (
      tasks[i] &&
      tasks[i].assigned_user &&
      Array.isArray(tasks[i].assigned_user) &&
      tasks[i].assigned_user.length > 0
   ) {
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
   } else {
      assignedUserHTML = ``;
   }

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

   // Überprüfen, ob tasks[i] definiert ist und ob es assigned_user gibt

   for (let j = 0; j < contacts.length; j++) {
      let isAssigned = false;
      let imgSrc = "./assets/img/check_btn.png";

      if (
         tasks[i] &&
         tasks[i].assigned_user &&
         Array.isArray(tasks[i].assigned_user) &&
         tasks[i].assigned_user.length > 0
      ) {
         for (let k = 0; k < tasks[i].assigned_user.length; k++) {
            let assigned_user_id = getUserIdByName(tasks[i].assigned_user[k].name);
            if (assigned_user_id === contacts[j].id) {
               isAssigned = true;
               imgSrc = "./assets/img/checked_btn_white_svg.svg";
               break;
            }
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

// ___________________________________________
//             SUBTASK SECTION
// ___________________________________________

function showSubtasksIcons() {
   document.getElementById("subtasksPlusIcon").classList.add("d-none");
   document.getElementById("subtasksInputIcons").classList.remove("d-none");
}

function addNewSubtaskEditPopUp(i) {
   let input = document.getElementById("subtasksInput").value;
   let newSubTask = { "subtask_name": input, "subtask_isdone": false };
   if (!tasks[i].subtasks) {
      tasks[i].subtasks = [];
   }
   tasks[i].subtasks.push(newSubTask);
   let subtasksListContainer = document.getElementById("subtasksList");
   subtasksListContainer.innerHTML = `${renderSubtasksEditPopUp(i)}`;
}

function renderSubtasksEditPopUp(i) {
   let subtaskList = "";
   if (tasks[i] && tasks[i].subtasks && Array.isArray(tasks[i].subtasks) && tasks[i].subtasks.length > 0) {
      for (let j = 0; j < tasks[i].subtasks.length; j++) {
         let subTaskTitle = tasks[i].subtasks[j].subtask_name;
         subtaskList += `
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
   } else {
      subtaskList = ``;
   }

   return subtaskList;
}

// SUBTASKS

function editSubtask(i, j, subTaskTitle) {
   let subtask = document.getElementById(`subtask${j}`);
   subtask.innerHTML = `
   <div class="edit-subtask-div">
     <input id="onEditSubtaskInput${j}" class="edit-subtask-input" value="${subTaskTitle}">
   <div class="on-edit-subtask-icons">
     <img onclick="deleteSubtask(${i}, ${j})" src="./assets/img/delete_trashcan_icon.png" alt="">
     <div class="subtasks-seperator"></div>
     <img onclick="saveEditedSubtask(${i}, ${j})" src="./assets/img/addtask_check.svg" alt="">
   </div>`;
   subtask.style.padding = "2px 0px 2px 0px";
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
   let subtasksList = document.getElementById("subtasksList");
   subtasksList.innerHTML = "";
   for (let j = 0; j < tasks[i].subtasks.length; j++) {
      let subTaskTitle = tasks[i].subtasks[j].subtask_name;
      subtasksList.innerHTML += `<div class="edit-pop-up-subtask-wrapper" id="subtask${j}">&bull; ${subTaskTitle} 
      <span class="edit-pop-up-btn-wrapper">
       <span class="edit-subtask-edit-btn">
      <img class="subtask-edit-btn" onclick="editSubtask(${i}, ${j}, '${subTaskTitle}')" src="./assets/img/edit_pen_icon.png" alt=""></span>
      <span class="subtask-delete-btn" class="edit-subtask-delete-btn"><img onclick="deleteSubtask(${i})" src="./assets/img/delete_trashcan_icon.png" alt=""></span>
      </span>
      </div>`;
   }
}

function showEditIcons(event, i) {
   // let DivElement = event.target;
   let icons = document.getElementById(`subtask${i}Icons`);
   icons.classList.remove("d-none");
}

function hideEditIcons(i) {
   let icons = document.getElementById(`subtask${i}Icons`);
   icons.classList.add("d-none");
}

// __________________________________________________________________
//    Find Task

function findTaskInBoard() {
   let searchInput = document.getElementById("searchTask").value.trim().toLowerCase();

   for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name.toLowerCase().includes(searchInput)) {
         console.log(tasks[i].name);
      }
   }
}
