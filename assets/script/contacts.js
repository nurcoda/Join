let Contacts= [
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

function renderContact(){
    for(let i=0; i<Contacts.length; i++){
           document.getElementById("contactList").innerHTML += `<div class="contact">
   <div>
    Name: ${Contacts[i]["Name"]} <br>
                    Email: ${Contacts[i]["Email"]}

                  
   </div>
</div>
    `
    }
 
}