let selectedContactIndex = null;

async function renderContacts() {
   await loadData();
   document.getElementById("contactList").innerHTML = `
       <div class="buttonWrapper">
           <button class="addContactBtn" onclick="renderAddContactCardInfo(); openPopUP()">
               Add new Contact <img src="./assets/img/person_add_icon.png" alt="" />
           </button>
           <button class="addContactBtnMobile" onclick="renderAddContactCardInfo()"
                 <img src="./assets/img/person_add_icon.png" alt="" />
           </button>
       </div>
   `;
   groupAndDisplayContacts();
}

function groupAndDisplayContacts() {
   let sortedContacts = contacts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
   groupContacts(sortedContacts);
}

function groupContacts(sortedContacts) {
   const groupedContacts = {};
   sortedContacts.forEach((contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groupedContacts[firstLetter]) {
         groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
   });
   let containerContent = "";
   for (const letter in groupedContacts) {
      containerContent += `<div class="contact-letter"><h2 class="letter">${letter}</h2></div>`;
      groupedContacts[letter].forEach((contact) => {
         let i = contacts.findIndex((c) => c.id === contact.id);
         let avatar = renderAvatar(i, contact.color);
         const highlightClass = i === selectedContactIndex ? "highlight" : "";
         containerContent += `
               <div class="contact ${highlightClass}" onclick="renderContactCardInfo(${i}), highlightContact(${i})")">
                   <div id="contact-${i}" class="contactDetails">
                       <div class="img-contacts">
                           <div id="avatar${i}" class="avatar" style="background-color: ${contact.color}">${avatar}</div>
                       </div>
                       <div class="contacts-content-list">
                           <span>${contact.name}</span>
                           <div class="mailLink">${contact.email}</div>
                       </div>
                   </div>
               </div>
           `;
      });
   }
   document.getElementById("contactList").innerHTML += containerContent;
}

function highlightContact(index) {
   if (selectedContactIndex !== null) {
      const previousElement = document.getElementById(`contact-${selectedContactIndex}`);
      if (previousElement) {
         previousElement.classList.remove("highlight");
      }
   }
   selectedContactIndex = index;
   const newElement = document.getElementById(`contact-${selectedContactIndex}`);
   if (newElement) {
      newElement.classList.add("highlight");
   }
}

function colorAvatar(i, color) {
   return `<div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50%;"></div>`;
}

function renderAvatar(i, avatar) {
   const username = contacts[i]["name"];
   const firstNameInitial = username[0];
   const secondNameInitial = username.split(" ")[1].split("")[0];
   avatar = firstNameInitial + secondNameInitial;
   return avatar;
}

function renderContactCardInfo(i) {
   let avatar;
   avatar = renderAvatar(i, avatar); // kontrolliert ob ein plus vorhanden ist wenn ja wird es raus geschnitten
   let phone = contacts[i].phone;
   let x = document.getElementById("headAndContact");
   if (!phone) {
      phone = "";
   }
   if (!phone.startsWith("+")) {
      phone = "+" + phone;
   }

   contactCardBigContainer.innerHTML = `<div class="contact-card-name-container">
      <div class="avatar avatar-big" style="background-color: ${contacts[i].color}">${avatar}</div>
      <div>
         <div class="contact-card-name">${contacts[i].name}</div>
         <div class="edit-delete-container">
            <span class="edit-icon-wrapper" onclick="renderEditContactCardInfo(${i})" >
               <div class="edit-icon"></div><span class="edit-name">Edit</span>
            </span>
            <span class="delete-icon-wrapper">
               <div class="trash-icon"></div><span class="delete-name">Delete</span>
            </span>
         </div>
      </div>
   </div>

   <div id="contact-card-info-container" class="contact-card-info-container">
      <div class="headline-contact-information">Contact Information</div>
      <div class="contact-card-info-wrapper">
         <div class="contact-info-email-headline">Email</div>
         <div class="contact-info-email">${contacts[i].email}</div>
         <div class="contact-info-phone-headline">Phone</div>
         <div class="contact-info-phone">${phone}</div>
      </div>
   </div>`;

   document.querySelector(".edit-icon-wrapper").addEventListener("click", openPopUp);
   document.querySelector(".delete-icon-wrapper").addEventListener("click", function () {
      deleteContact(i);
   });

   if (window.getComputedStyle(x).display === "none") {
      openPopUp();
      popUpBackground.innerHTML = `<div class="contact-card-name-container-mobile">
    <img class="edit-close-pop-up-btn" src="./assets/img/close_big_icon.png" alt="" id="closePopUpBtn" />
   <div class="avatar avatar-big" style="background-color: ${contacts[i].color}">${avatar}</div>
   <div>
      <div class="contact-card-name">${contacts[i].name}</div>
      <div class="edit-delete-container-mobile">
         <span class="edit-icon-wrapper" onclick="renderEditContactCardInfo(${i})" >
            <div class="edit-icon"></div><span class="edit-name">Edit</span>
         </span>
         <span class="delete-icon-wrapper">
            <div class="trash-icon"></div><span class="delete-name">Delete</span>
         </span>
      </div>
   </div>
   <div id="contact-card-info-container" class="contact-card-info-container-mobile">
   <div class="headline-contact-information">Contact Information</div>
   <div class="contact-card-info-wrapper">
      <div class="contact-info-email-headline">Email</div>
      <div class="contact-info-email">${contacts[i].email}</div>
      <div class="contact-info-phone-headline">Phone</div>
      <div class="contact-info-phone">${`+` + contacts[i].phone}</div>
   </div>
</div>
</div>`;

      document.querySelector(".edit-icon-wrapper").addEventListener("click", openPopUp); //* öffnet die Edit Funktion
      document.querySelector(".delete-icon-wrapper").addEventListener("click", function () {
         deleteContact(i);
      }); //löscht die Contact seite
   } //löscht die Contact seite
}

//** Helper Functions */
popUpBackground.addEventListener("click", closePopUp);

function openPopUp() {
   popUpBackground.classList.remove("d-none");
}

function closePopUp() {
   if (event.target === closePopUpBtn) {
      popUpBackground.classList.add("d-none");
   }
}

// ##################
//   DELETE CONTACT
// ##################

async function deleteContact(index) {
   const elementToDelete = document.getElementById(`contact-${index}`);
   if (elementToDelete) {
      if (index === selectedContactIndex) {
         elementToDelete.classList.remove("highlight");
      }
      elementToDelete.remove();
   }

   let isContactAlsoUser = checkIfContactisUser(contacts[index].id);
   if (isContactAlsoUser) {
      let userIndex = findContactIndexById(contacts[index].id);
      deleteUserData(userIndex);
      user.splice(userIndex, 1);
   }

   await deleteContactDataDB(contacts[index].id);
   contacts.splice(index, 1);
   renderContacts();
   document.getElementById("contactCardBigContainer").innerHTML = "";
}

function findContactIndexById(contactsId) {
   let userIndex;
   for (let i = 0; i < user.length; i++) {
      if (user[i].id === contactsId) {
         userIndex = i;
      }
   }
   return userIndex;
}

async function deleteContactDataDB(id) {
   await fetch(`${BASE_URL}/contacts/${id}.json`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
   });
}

function checkIfContactisUser(contactID) {
   const isUser = user.some((singleUser) => singleUser.id === contactID);
   return isUser ? true : false;
}

function deleteUserData(userIndex) {
   let userId = user[userIndex].id;
   deleteUserDataDB(userId);
}

async function deleteUserDataDB(id) {
   await fetch(`${BASE_URL}/users/${id}.json`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
   });
}

// ##################
//    ADD CONTACT
// ##################

function addPersonToContact() {
   event.preventDefault();

   let name = document.getElementById("input-field-name").value;
   let mail = document.getElementById("input-field-mail").value;
   let phone = document.getElementById("input-field-phone").value;
   let nameExists = contacts.some((contact) => contact.name === name);

   if (!nameExists) {
      let contact = { "name": name, "email": mail, "phone": phone, "id": generateId() };
      contacts.push(contact);
      updateNewContactData(contact.id);
   } else {
      let nameAffix = getNameAffixAtDoubleUse();
      let contact = { "name": name + `(${nameAffix})`, "email": mail, "phone": phone, "id": generateId() };
      contacts.push(contact);
      updateNewContactData(contact.id);
   }

   renderContacts();
   closePopUpByBtn();
}

async function updateNewContactData(id) {
   let contactIndex = findUserIndexById(id);
   let updatedContactData = {
      "color": newContactColor(),
      "email": contacts[contactIndex].email,
      "first_two_letters": "Test",
      "id": contacts[contactIndex].id,
      "name": contacts[contactIndex].name,
      "phone": contacts[contactIndex].phone,
   };
   await updateDataContactsDB("contacts/" + contacts[contactIndex].id, updatedContactData);
   renderContacts();
}

// Helper Add Contact

function findUserIndexById(id) {
   return contacts.findIndex((contact) => contact.id === id);
}

function newContactColor() {
   const usedColors = new Set(contacts.map((contact) => contact.color));
   for (const color of colorCodes) {
      if (!usedColors.has(color)) {
         return color;
      }
   }
}

function generateId() {
   const generatedId = Math.floor(100000 + Math.random() * 900000);
   if (user.some((user) => user.id === generatedId)) {
      return generateId(user);
   }
   return generatedId;
}

function getNameAffixAtDoubleUse() {
   let nameAffixString = generateId().toString().substring(0, 3);
   nameAffix = parseInt(nameAffixString, 10);
   return nameAffix;
}

// ________________________________________________

function closePopUpByBtn() {
   document.getElementById("popUpBackground").classList.add("d-none");
}

function renderEditContactCardInfo(i) {
   openPopUp();
   let avatar;
   avatar = renderAvatar(i, avatar);
   popUpBackground.innerHTML = `<div class="edit-contact-pop-up" id="editContentPopUp">
         <img class="edit-close-pop-up-btn" src="./assets/img/close_big_icon.png" alt="" id="closePopUpBtn" />
         <div class="popup-logo-headline-wrapper">
            <div><img class="pop-up-join-logo-small" src="./assets/img/join_logo_small_popup.svg" alt="" /></div>
            <div class="edit-popup-headline">Edit contact</div>
            <div class="edit-underline-from-subline"></div>
         </div>

         <div class="edit-contact-formular">
             <div class="avatar avatar-big" style="background-color: ${contacts[i].color}">${avatar}</div>
            <form class="input-fields-edit-contact">
               <input id="edit-input-field-name" class="input-field-name edit-contact-form-input" placeholder="Name"
                  type="text" value="${contacts[i].name}"/>
               <br />
               <input id="edit-input-field-mail" class="input-field-mail edit-contact-form-input" placeholder="Email"
                  type="e-mail" value="${contacts[i].email}"  /><br />
               <input id="edit-input-field-phone" class="input-field-phone edit-contact-form-input" placeholder="Phone"
                  type="tel" value="+${contacts[i].phone}"/>
               <div class="edit-contact-buttons-wrapper">
                  <div class="edit-delete-btn edit-contact-form-btn-delete" onclick="closePopUpByBtn() ; deleteContact(${i})">Delete</div>
                  <div class="edit-create-contact-btn edit-contact-form-btn"
                     onclick="editSave(${i})">Save</div>
               </div>
            </form>
         </div>
      </div>
   </div>`;
}

function renderAddContactCardInfo() {
   openPopUp();
   popUpBackground.innerHTML = `
   <div class="add-contact-pop-up" id="contentPopUp">
         <img class="close-pop-up-btn" src="./assets/img/close_big_icon.png" alt="" id="closePopUpBtn" />
         <div class="popup-logo-headline-wrapper">
            <div><img class="pop-up-join-logo-small" src="./assets/img/join_logo_small_popup.svg" alt="" /></div>
            <div class="popup-headline">Add contact</div>
            <div class="popup-subline">Tasks are better with a team!</div>
            <div class="underline-from-subline"></div>
         </div>
         <div class="contact-formular">
            <img src="./assets/img/profile_img.svg" class="profile-img-add-contact" />
            <form class="input-fields-add-contact">
               <input id="input-field-name" class="input-field-name add-contact-form-input" placeholder="Name"
                  type="text" />
               <br />
               <input id="input-field-mail" class="input-field-mail add-contact-form-input" placeholder="Email"
                  type="text" /><br />
               <input id="input-field-phone" class="input-field-phone add-contact-form-input" placeholder="Phone"
                  type="text" />
               <div class="add-contact-buttons-wrapper">
                  <button class="cancel-btn add-contact-form-btn" onclick="closePopUpByBtn()">Cancel</button><button
                     class="create-contact-btn add-contact-form-btn" onclick="addPersonToContact()">
                     Create Contact
                  </button>
               </div>
            </form>
         </div>
      </div>
   </div>
   `;
}

function editSave(i) {
   let name = document.getElementById("edit-input-field-name").value; // Liest die geänderten Werte aus den Eingabefeldern
   let email = document.getElementById("edit-input-field-mail").value;
   let phone = document.getElementById("edit-input-field-phone").value;
   if (phone.startsWith("+")) {
      phone = phone.substring(1); // kontrolliert ob ein plus vorhanden ist wenn ja wird es raus geschnitten
   }
   contacts[i].name = name;
   contacts[i].email = email;
   contacts[i].phone = phone;
   closePopUpByBtn();
   renderContactCardInfo(i);
   updateContactData(i);
}

async function updateContactData(i) {
   let updatedContactData = {
      "color": contacts[i].color,
      "email": contacts[i].email,
      "first_two_letters": contacts[i].first_two_letters,
      "id": contacts[i].id,
      "name": contacts[i].name,
      "phone": contacts[i].phone,
   };
   await updateDataContactsDB("contacts/" + contacts[i].id, updatedContactData);
   renderContacts();
}

async function updateDataContactsDB(path, data) {
   console.log(data);
   await fetch(BASE_URL + path + ".json", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "application/json",
      },
   });
}

// function renderContactCardInfoMobile() {
// //   let avatar;
//    avatar = renderAvatar(i, avatar); // kontrolliert ob ein plus vorhanden ist wenn ja wird es raus geschnitten
//    let phone = contacts[i].phone;
//    if (!phone.startsWith('+')) {
//       phone = '+' + phone;
//    }
//    contactCardBigContainer.innerHTML = `<div class="contact-card-name-container">
//             <div class="avatar avatar-big" style="background-color: ${contacts[i].color}">${avatar}</div>
//             <div>
//                <div class="contact-card-name">${contacts[i].name}</div>
//                <div class="edit-delete-container">
//                   <span class="edit-icon-wrapper" onclick="renderEditContactCardInfo(${i})" >
//                      <div class="edit-icon"></div><span class="edit-name">Edit</span>
//                   </span>
//                   <span class="delete-icon-wrapper">
//                      <div class="trash-icon"></div><span class="delete-name">Delete</span>
//                   </span>
//                </div>
//             </div>
//          </div>

//          <div id="contact-card-info-container" class="contact-card-info-container">
//             <div class="headline-contact-information">Contact Information</div>
//             <div class="contact-card-info-wrapper">
//                <div class="contact-info-email-headline">Email</div>
//                <div class="contact-info-email">${contacts[i].email}</div>
//                <div class="contact-info-phone-headline">Phone</div>
//                <div class="contact-info-phone">${`+` + contacts[i].phone}</div>
//             </div>
//          </div>`;
//    document.querySelector(".edit-icon-wrapper").addEventListener("click", openPopUp); //* öffnet die Edit Funktion
//    document.querySelector(".delete-icon-wrapper").addEventListener("click", function () {
//       deleteContact(i);
// }
// }
