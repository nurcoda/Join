let Test = "./assets/script/testData.js";

let contactCardBigContainer = document.getElementById("contactCardBigContainer");
let popUpBackground = document.getElementById("popUpBackground");
let contentPopUp = document.getElementById("contentPopUp");
let closePopUpBtn = document.getElementById("closePopUpBtn");

function renderContact() {
   document.getElementById("contactList").innerHTML = "";
   document.getElementById("contactList").innerHTML += `
          <div class="buttonWrapper">
               <button class="addContactBtn" onclick="openPopUp()">
                  Add new Conatct <img src="./assets/img/person_add_icon.png" alt="" />
               </button>
            </div>
         ${renderEveryContact()}
    `;
}

function renderEveryContact() {
   let everyContactTemplate = "";
   for (let i = 0; i < contacts.length; i++) {
      let avatar;
      avatar = renderAvatar(i, avatar);
      everyContactTemplate += `
          <div class="contact" onclick="renderContactCardInfo(${i})">
           <div class="contactDetails">
           <div class="img-contacts">
              <div id="avatar${i}" class="avatar">${avatar}</div>
           </div>
           <div class="contacts-content-list">
              <span>${contacts[i]["name"]}</span>
              <a href="">Email: ${contacts[i]["email"]}</a>
           </div>
            </div>
        </div>
      `;
   }
   return everyContactTemplate;
}

function renderAvatar(i, avatar) {
   const username = contacts[i]["name"];
   const firstNameInitial = username[0];
   const secondNameInitial = username.split(" ")[1].split("")[0]; //* Auskommentiert weil die bei Herr der Ringe keine Nachnamen zeigen im Array
   avatar = firstNameInitial + secondNameInitial;
   return avatar;
}

function renderContactCardInfo(i) {
   let avatar;
   avatar = renderAvatar(i, avatar);
   contactCardBigContainer.innerHTML = `<div class="contact-card-name-container">
            <div class="avatar avatar-big">${avatar}</div>
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
               <div class="contact-info-phone">+${contacts[i].phone}</div>
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
<<<<<<< HEAD

function renderEditContactCardInfo(i) {
   let avatar;
   avatar = renderAvatar(i, avatar);
   popUpBackground.innerHTML = `<div class="edit-contact-pop-up" id="contentPopUp">
         <img class="edit-close-pop-up-btn" src="./assets/img/close_big_icon.png" alt="" id="closePopUpBtn" />
         <div class="popup-logo-headline-wrapper">
            <div><img class="pop-up-join-logo-small" src="./assets/img/join_logo_small_popup.svg" alt="" /></div>
            <div class="edit-popup-headline">Edit contact</div>
            <div class="edit-underline-from-subline"></div>
         </div>

         <div class="edit-contact-formular">
            <img src="${avatar}" class="avatar big-avatar" />
            <!--  -->
            <!-- Formular muss hier sein -->
            <!-- das return false verhindern neuladen der seite, beim abschicken der Form -->
            <form onsubmit="alert('Die Funktion gibts noch nicht :P'); return false" class="input-fields-edit-contact">
               <input id="input-field-name" class="input-field-name edit-contact-form-input" placeholder="Name"
                  type="text" />
               <br />
               <input id="input-field-mail" class="input-field-mail edit-contact-form-input" placeholder="Email"
                  type="text" /><br />
               <input id="input-field-phone" class="input-field-phone edit-contact-form-input" placeholder="Phone"
                  type="text" />
               <div class="edit-contact-buttons-wrapper">
                  <button class="edit-delete-btn edit-contact-form-btn" onclick="closePopUpByBtn()">Delete</button>
                  <button class="edit-create-contact-btn edit-contact-form-btn"
                     onclick="addPersonToContact()">Save</button>
               </div>
            </form>
         </div>
      </div>
   </div>`;
}

=======
>>>>>>> b148bc53dd68c884b963782724d23b6ebadf72e9
