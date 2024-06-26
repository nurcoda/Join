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

function showCurrentUser(){

}
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
function checkUser() {
   const token = localStorage.getItem('token');
   if (token) {
       const user = getUserFromToken(token);
       setProfileImage(user);
   }
}

// Beispiel für die Benutzeranmeldung und JWT-Speicherung
async function login(username, password) {
   const response = await fetch('/login', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ username, password })
   });
   
   const data = await response.json();
   if (response.ok) {
       localStorage.setItem('token', data.token);
       return data.token;
   } else {
       console.error(data.message);
   }
}