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
              <img src="./assets/img/Anton.png" alt="">
           </div>
           <div class="contacts-content-list">
              <span>${Contacts[i]["Name"]}</span>
              <a href="">Email: ${Contacts[i]["Email"]}</a>
           </div>
</div>
    `
    }

}