function renderEditContactCardInfoHTML(i, avatar) {
  return `
        
        <div class="edit-contact-pop-up" id="editContentPopUp">
        <div class="error-message-add-contact d-none" id="errorMessageAddContact">Please enter surname and lastname</div>
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
                    type="number" value="${contacts[i].phone}"/>
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

function renderAddContactCardInfoHTML() {
  return `
 
     <div class="add-contact-pop-up" id="contentPopUp">
      <div class="error-message-add-contact d-none" id="errorMessageAddContact">Please enter surname and lastname</div>
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
                    type="email" /><br />
                 <input id="input-field-phone" class="input-field-phone add-contact-form-input" placeholder="Phone"
                    type="number" />
                 <div class="add-contact-buttons-wrapper">
                    <button class="cancel-btn add-contact-form-btn" onclick="closePopUpByBtn()">Cancel</button><button
                       class="create-contact-btn add-contact-form-btn" onclick="addPersonToContact()">
                       Create Contact
                    </button>
                 </div>
              </form>
           </div>
        </div>
     </div>`;
}

function renderContactCardInfoHTML(i, avatar, phone) {
  return `<div class="contact-card-name-container">
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
}

function groupContactsHTML(i, avatar, contact) {
  return `
               <div class="contact" onclick="renderContactCardInfo(${i}), highlightContact(${i})")">
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
}

function renderContactsHTML() {
  return `
       <div class="buttonWrapper">
           <button class="addContactBtn" onclick="renderAddContactCardInfo(); openPopUP()">
               Add new Contact <img src="./assets/img/person_add_icon.png" alt="" />
           </button>
           <button class="addContactBtnMobile" onclick="renderAddContactCardInfo()"
                 <img src="./assets/img/person_add_icon.png" alt="" />
           </button>
       </div>
   `;
}
