async function includeHTML() {
   let includeElements = document.querySelectorAll("[w3-include-html]");
   for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/header.html"
      let resp = await fetch(file);
      if (resp.ok) {
         element.innerHTML = await resp.text();
      } else {
         element.innerHTML = "Page not found";
      }
   }
}

document.addEventListener("click", (event) => {
   let headerNav = document.getElementById("headerNav");
   let headerUserIcon = document.getElementById("headerUserIcon");
   if (event.target == headerUserIcon) {
      headerNav.classList.toggle("d-none");
   } else if (event.target != headerNav) {
      headerNav.classList.add("d-none");
   }
});

// function showCurrentUser(){

// }
function getUserFromToken(token) {
   const payload = JSON.parse(atob(token.split('.')[1]));
   return payload;
}

// Funktion, um das Profilbild zu setzen
function setProfileImage(user) {
   const userIcon = document.getElementById('headerUserIcon');
   if (user.profileImageUrl) {
       userIcon.src = user.profileImageUrl;
   }
}

// Überprüfung, ob der Benutzer angemeldet ist und Profilbild setzen
// function checkUser(user) {
//    const token = user.first_two_letters;
//    if (token) {
//        const user = getUserFromToken(token);
//        setProfileImage(user);
//    }
// }

function checkUser(user) {
   console.log('Angemeldeter Benutzer:', user.name);
   document.getElementById('headerUserIcon').innerHTML = user.first_two_letters;
}

