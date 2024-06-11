let Contacts = [
    {
        "phonenumber": 876543221,
        "Email": "ander@anders.de",
        "Name": "Anders Anderson",
    },
    {
        "phonenumber": 555696969,
        "Email": "bunny@lola.de",
        "Name": "Lola Bunny",
    },

];

function renderContact() {
    for (let i = 0; i < Contacts.length; i++) {
        document.getElementById("contactList").innerHTML += `<div class="contact">
           <div class="contactDetails">
           <div class="img-contacts">
              <div id="avatar${i}" class="avatar"></div>
           </div>
           <div class="contacts-content-list">
              <span>${Contacts[i]["Name"]}</span>
              <a href="">Email: ${Contacts[i]["Email"]}</a>
           </div>
</div>
    `;
    renderAvatar(i);
    }
}

function renderAvatar(i){
    const avatar = document.getElementById(`avatar${i}`)
    const username = Contacts[i]["Name"] // will be fetching the username, just used my to illustrate
    const firstNameInitial = username[0]
    const secondNameInitial = username.split(' ')[1].split('')[0]
    avatar.innerHTML += firstNameInitial + secondNameInitial
}

