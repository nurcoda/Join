let contacts = [
   {
      "phonenumber": 876543221,
      "email": "ander@anders.de",
      "name": "Anders Anderson",
   },
   {
      "phonenumber": 555696969,
      "email": "bunny@lola.de",
      "name": "Lola Bunny",
   },
   {
      "phonenumber": 876543221,
      "email": "ander@anders.de",
      "name": "Anders Anderson",
   },
   {
      "phonenumber": 555696969,
      "email": "bunny@lola.de",
      "name": "Lola Bunny",
   },
   {
      "phonenumber": 876543221,
      "email": "ander@anders.de",
      "name": "Anders Anderson",
   },
   {
      "phonenumber": 555696969,
      "email": "bunny@lola.de",
      "name": "Lola Bunny",
   },
   {
      "phonenumber": 876543221,
      "email": "ander@anders.de",
      "name": "Anders Anderson",
   },
   {
      "phonenumber": 555696969,
      "email": "bunny@lola.de",
      "name": "Lola Bunny",
   },
   {
      "phonenumber": 876543221,
      "email": "ander@anders.de",
      "name": "Anders Anderson",
   },
   {
      "phonenumber": 555696969,
      "email": "bunny@lola.de",
      "name": "Lola Bunny",
   },
   {
      "phonenumber": 876543221,
      "email": "ander@anders.de",
      "name": "Anders Anderson",
   },
   {
      "phonenumber": 555696969,
      "email": "bunny@lola.de",
      "name": "Lola Bunny",
   },
];

function renderContact() {
   for (let i = 0; i < contacts.length; i++) {
      document.getElementById("contactList").innerHTML += `<div class="contact" onclick="renderContactCardInfo(${i})">
           <div class="contactDetails">
           <div class="img-contacts">
              <div id="avatar${i}" class="avatar"></div>
           </div>
           <div class="contacts-content-list">
              <span>${contacts[i]["name"]}</span>
              <a href="">Email: ${contacts[i]["email"]}</a>
           </div>
</div></div>
    `;
      renderAvatar(i);
   }
}

function renderAvatar(i) {
   const avatar = document.getElementById(`avatar${i}`);
   const username = contacts[i]["name"];
   const firstNameInitial = username[0];
   const secondNameInitial = username.split(" ")[1].split("")[0];
   avatar.innerHTML += firstNameInitial + secondNameInitial;
}

let contactCardBigContainer = document.getElementById("contactCardBigContainer");

function renderContactCardInfo(i) {
   contactCardBigContainer.innerHTML = `<div class="contact-card-name-container">
            <div class="avatar avatar-big">AA</div>
            <div>
               <div class="contact-card-name">${contacts[i].name}</div>
               <div class="edit-delete-container">
                  <span class="edit-icon-wrapper">
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
               <div class="contact-info-phone">+${contacts[i].phonenumber}</div>
            </div>
         </div>`;
}
