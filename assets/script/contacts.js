let Test = "./assets/script/testData.js";
let selectedContactIndex = null;

function groupAndDisplayContacts() {

   const sortedContacts = contacts.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;

   });
   groupContacts(sortedContacts);
}
function groupContacts(sortedContacts) {
   const groupedContacts = {};
   sortedContacts.forEach(contact => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groupedContacts[firstLetter]) {
         groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
   });
   let containerContent = '';
   for (const letter in groupedContacts) {
      containerContent += `<div class="contact-letter"><h2 class="letter">${letter}</h2></div>`;
      groupedContacts[letter].forEach(contact => {
         let i = contacts.findIndex(c => c.id === contact.id);
         let avatar = renderAvatar(i, contact.color);
         const highlightClass = (i === selectedContactIndex) ? 'highlight' : '';
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
   document.getElementById("contactList").innerHTML = containerContent;
}

function highlightContact(index) {
   if (selectedContactIndex !== null) {
      document.getElementById(`contact-${selectedContactIndex}`).classList.remove('highlight');
   }
   selectedContactIndex = index;
   document.getElementById(`contact-${selectedContactIndex}`).classList.add('highlight');
}

function renderContact() {
   document.getElementById("contactList").innerHTML = `
       <div class="buttonWrapper">
           <button class="addContactBtn" onclick="openPopUp()">
               Add new Contact <img src="./assets/img/person_add_icon.png" alt="" />
           </button>
       </div>
   `;
   groupAndDisplayContacts();
}

function colorAvatar(i, color) {
   // Diese Funktion sollte das Avatar-Rendering übernehmen
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
   if (!phone.startsWith('+')) {
      phone = '+' + phone;
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
               <div class="contact-info-phone">${`+` + contacts[i].phone}</div>
            </div>
         </div>`;
   document.querySelector(".edit-icon-wrapper").addEventListener("click", openPopUp); //* öffnet die Edit Funktion
   document.querySelector(".delete-icon-wrapper").addEventListener("click", function () {
      deleteContact(i);
   }); //löscht die Contact seite
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

function deleteContact(i) {
   contacts.splice(i, 1);
   renderContact();
   document.getElementById("contactCardBigContainer").innerHTML = ""; // Kontaktkarte leeren
}
//**Add to Contacts */

function addPersonToContact() {
   let name = document.getElementById("input-field-name").value;
   let mail = document.getElementById("input-field-mail").value;
   let phone = document.getElementById("input-field-phone").value; //** Inhalt der Inputfelder */

   let contact = { "name": name, "email": mail, "phone": phone }; //**Inhalt in Objekt zusammenfügen */

   contacts.push(contact);
   renderContact(); //*Kontaktliste neu laden
   closePopUpByBtn();
}

function closePopUpByBtn() {
   document.getElementById("popUpBackground").classList.add("d-none");
}

function renderEditContactCardInfo(i) {
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

function editSave(i) {
   let name = document.getElementById('edit-input-field-name').value;  // Liest die geänderten Werte aus den Eingabefeldern
   let email = document.getElementById('edit-input-field-mail').value;
   let phone = document.getElementById('edit-input-field-phone').value;
   if (phone.startsWith('+')) {
      phone = phone.substring(1); // kontrolliert ob ein plus vorhanden ist wenn ja wird es raus geschnitten
   }
   contacts[i].name = name;  // Aktualisiert die Daten im contacts Array
   contacts[i].email = email;
   contacts[i].phone = phone;
   closePopUpByBtn(); //Schließe das Pop-Up oder aktualisiere die Anzeige
   console.log("Kontakt erfolgreich aktualisiert:", contacts[i]); // Optional: Zeige eine Erfolgsmeldung oder aktualisiere die Anzeige
   renderContactCardInfo(i); // ruft nochmal die Funktion aus 
   groupAndDisplayContacts(); // zum speichern wir diese funktion erneut aufgerufen
}
