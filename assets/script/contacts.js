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
</div>
    `;
        renderAvatar(i);
    }
}

function renderAvatar(i) {
    const avatar = document.getElementById(`avatar${i}`)
    const username = contacts[i]["name"] // will be fetching the username, just used my to illustrate
    const firstNameInitial = username[0]
    const secondNameInitial = username.split(' ')[1].split('')[0]
    avatar.innerHTML += firstNameInitial + secondNameInitial
}

function renderContactCardInfo(i){
    document.getElementById(`contact-card-info-container`).innerHTML= 
    ` <div class="headline-contact-information">Contact Information</div>
            <div class="">
               <div class="">Email</div>
               <div class="">${contacts[i]["email"]}</div>
               <div class="">Phone</div>
               <div class="">${contacts[i]["phonenumber"]}</div>`
}
