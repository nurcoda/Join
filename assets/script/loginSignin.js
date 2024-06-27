const toSignUpContainer = document.getElementById("toSignUpContainer");
const loginContainer = document.getElementById("loginContainer");
const signUpContainer = document.getElementById("signUpContainer");
const signUpSuccesContainer = document.getElementById("signUpSuccesContainer");
let currentUser = sessionStorage.getItem("name");
let currentUserAvatar = sessionStorage.getItem("loggedIn");
let newId = generateId();

openLogin();

function openLogin() {
  loginContainer.classList.remove("d-none");
  toSignUpContainer.classList.remove("d-none");
  signUpContainer.classList.add("d-none");
  openLoginHTML();
}

function openSignUp() {
  loginContainer.classList.add("d-none");
  toSignUpContainer.classList.add("d-none");
  signUpContainer.classList.remove("d-none");
  openSignUpHTML();
}

function signUpSucces() {
  signUpSuccesContainer.classList.remove("d-none");
  setTimeout(function () {
    signUpSuccesContainer.classList.add("d-none");
    window.location.href = "./summary.html"; // Blende den Div-Container nach 2 Sekunden aus
  }, 1500); // 2000 Millisekunden = 2 Sekunden
}

function closeSignUpSucces() {}

// function openSignUpHTML() {
//    signUpContainer.innerHTML = `
//      <div class="headline-login-wrapper">
//                <img src="./assets/img/goback_arrow_icon.png" alt="" class="goback-arrow" onclick="openLogin()" />
//                <h1>Sign-up</h1>
//                <div class="underline-headline"></div>
//             </div>
//             <form id="SignUpData" class="input-login">
//                <div class="input-login-field">
//                   <input type="text" placeholder="Name" />
//                   <img src="./assets/img/person_icon.png" alt="Mail-Icon" class="login-input-icons" />
//                </div>
//                <div class="input-login-field">
//                   <input type="email" placeholder="Email" />
//                   <img src="./assets/img/mail_icon.png" alt="Mail-Icon" class="login-input-icons" />
//                </div>
//                <div class="input-login-field">
//                   <input type="password" placeholder="Password" />
//                   <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
//                </div>
//                <div class="input-login-field">
//                   <input type="password" placeholder="Confirm Password" />
//                   <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
//                </div>

//                <div class="accept-privacy-policy-form">
//                   <input class="accept-icon" type="checkbox" name="accept-privacy-policy" id="" />
//                   <label for="accept-privacy-policy"
//                      >I accept the <a href="" class="privacy-policy-link">Privacy policy</a></label
//                   >
//                </div>

//                <div class="login-guestlogin-btn-wrapper">
//                   <div class="signup-btn-in-form btns-login" onclick="signUpSucces() postSignUpData("users",returnPostedData())">Sign up</div>
//                </div>
//             </form>
//     `;
// }

// function returnPostedData(email, name, password){
//    let email = document.getElementById('SignUpData').elements[0];
//    let name = document.getElementById('SignUpData').elements[1];
//    let password = document.getElementById('SignUpData').elements[2];

//    // return {"email": email, "name": name, "password": password};
// }

function openSignUpHTML() {
  signUpContainer.innerHTML = `
       <div class="headline-login-wrapper">
           <img src="./assets/img/goback_arrow_icon.png" alt="" class="goback-arrow" onclick="openLogin()" />
           <h1>Sign-up</h1>
           <div class="underline-headline"></div>
       </div>
       <form id="SignUpData" class="input-login" onsubmit="validateSignUpForm(); return false;">
         <div class="input-login-field">
           <input required type="text" name="name" placeholder="Name" onfocus="resetNameError()" />
           <img src="./assets/img/person_icon.png" alt="Person Icon" class="login-input-icons" />
           <span id="nameErrorMessage" class="error-message"></span>
         </div>
         <div class="input-login-field">
           <input id="newMail" required type="email" name="email" placeholder="Email" />
           <img src="./assets/img/mail_icon.png" alt="Mail Icon" class="login-input-icons" />
         </div>
         <div class="input-login-field">
  <input id="signupPassword" oninput="updatePasswordVisibilityIcon('signupPassword')" type="password" name="password" placeholder="Password" required />
  <img id="signupPasswordToggle" src="./assets/img/lock_icon.png" onclick="togglePasswordVisibility('signupPassword')" class="login-input-icons" alt="Lock Icon" />
</div>
<div class="input-login-field">
  <input id="signupConfirmPassword" oninput="updatePasswordVisibilityIcon('signupConfirmPassword')" type="password" name="confirmPassword" placeholder="Confirm Password" required />
  <img id="signupConfirmPasswordToggle" src="./assets/img/lock_icon.png" onclick="togglePasswordVisibility('signupConfirmPassword')" class="login-input-icons" alt="Lock Icon" />
  <span id="passwordsDontMatchText"></span>
</div>

         <div class="accept-privacy-policy-form">
           <input required class="accept-icon" type="checkbox" name="acceptPrivacyPolicy" id="acceptPrivacyPolicy" />
           <label for="acceptPrivacyPolicy">I accept the <a href="#" class="privacy-policy-link">Privacy policy</a></label>
         </div>
         <div class="login-guestlogin-btn-wrapper">
           <button class="signup-btn-in-form btns-login">Sign up</button>
         </div>
       </form>
   `;

  // Event-Listener zum Zurücksetzen der Fehlerzustände beim Klicken auf die Input-Felder
  const nameInputField = document.getElementsByName('name')[0];
  nameInputField.addEventListener('focus', resetNameError);

  const confirmPasswordInput = document.getElementsByName('confirmPassword')[0];
  confirmPasswordInput.addEventListener('focus', resetPasswordError);
}

// Funktionen zum Zurücksetzen der Fehlerzustände
function resetNameError() {
  const nameInputField = document.getElementsByName('name')[0];
  const nameErrorMessage = document.getElementById('nameErrorMessage');
  nameInputField.style.border = "1px solid #ccc";
  nameErrorMessage.innerHTML = "";
}

function resetPasswordError() {
  const confirmPasswordId = document.getElementById('signupConfirmPassword');
  const dontMatchText = document.getElementById('passwordsDontMatchText');
  confirmPasswordId.style.border = "1px solid #ccc";
  dontMatchText.innerHTML = "";
}

function returnPostedData() {
  const form = document.getElementById("SignUpData");
  const formData = new FormData(form);
  let input = formData.get("name");
  let words = input.split(" ");
  let firstLetters = words.map((word) => word.charAt(0)).join("");
  const firstLetter = firstLetters.toUpperCase();

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    first_two_letters: firstLetter,
    id: newId,
    color: newContactColor(),
  };
  // Überprüfung, ob die E-Mail-Adresse im Array vorhanden ist
  const emailExists = user.some((item) => item.email === formData.get("email"));
  let Newuser = firstLetters.toUpperCase();
  sessionStorage.setItem("loggedIn", Newuser);
  if (emailExists) {
    alert("Die E-Mail-Adresse ist bereits im Array vorhanden.");
    document.getElementById("SignUpData").reset();

    //  document.getElementById('SignUpData').reset();
  } else {
    console.log("Die E-Mail-Adresse ist nicht im Array vorhanden.");
    return data;
  }
}

async function postSignUpData(path, data) {
  if (returnPostedData === "") {
    return;
  }
  console.log(path);
  console.log(data);
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJSON = await response.json());
}



function validateSignUpForm() {
  event.preventDefault();

  const form = document.getElementById('SignUpData');
  const formData = new FormData(form);
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const confirmPasswordId = document.getElementById('signupConfirmPassword');
  const dontMatchText = document.getElementById('passwordsDontMatchText');
  const nameInput = formData.get('name');
  const nameInputField = document.getElementsByName('name')[0];
  const nameErrorMessage = document.getElementById('nameErrorMessage');
  let hasError = false;

  // Zurücksetzen der vorherigen Fehlerzustände
  nameInputField.style.border = "1px solid #ccc";
  nameErrorMessage.innerHTML = "";

  confirmPasswordId.style.border = "1px solid #ccc";
  dontMatchText.innerHTML = "";

  // Überprüfen, ob die Passwörter übereinstimmen
  if (password !== confirmPassword) {
    confirmPasswordId.style.border = "1px solid #FF001F";
    dontMatchText.innerHTML = "Your Passwords don't match. Try again.";
    hasError = true;
  }

  // Split name into words
  let words = nameInput.trim().split(/\s+/);

  // Check number of names entered
  if (words.length !== 2 && words.length !== 3) {
    nameInputField.style.border = "1px solid #FF001F";
    nameErrorMessage.innerHTML = "Please enter first and last name.";
    hasError = true;
  }

  // Check if there are errors, if so, stop further processing
  if (hasError) {
    return;
  }

  // Check if email is already registered
  if (!user.some((item) => item.email === formData.get('email'))) {
    // Assuming 'newId' is defined or provided
    postSignUpData('/users/' + newId, returnPostedData());
    signUpSucces();
  } else {
    alert('Email address is already registered.');
    return;
  }
}


// Von Alex, um den usern einen Farbcode zu geben

function newContactColor() {
  const usedColors = new Set(contacts.map((contact) => contact.color));
  for (const color of colorCodes) {
    if (!usedColors.has(color)) {
      return color;
    }
  }
}

function openLoginHTML() {
  loginContainer.innerHTML = `
    <div class="headline-login-wrapper">
               <h1>Log in</h1>
               <div class="underline-headline"></div>
            </div>
            <form id="input-login" class="input-login" onsubmit="loginUser(); return false";>
               <div class="input-login-field">
                  <input required id="email" type="email" placeholder="Email" />
                  <img src="./assets/img/mail_icon.png" alt="Mail-Icon" class="login-input-icons" />
               </div>
               <div class="input-login-field">
                <input id="loginPassword" oninput="updatePasswordVisibilityIcon('loginPassword')" type="password" name="password" placeholder="Password" required />
                <img id="loginPasswordToggle" src="./assets/img/lock_icon.png" onclick="togglePasswordVisibility('loginPassword')" class="login-input-icons" alt="Lock Icon" />
                <span id="loginPasswordWrongText" class="login-error-message">Wrong password! Try again.</span>
               </div>
               <div class="remember-me-form">
                  <input class="accept-icon" type="checkbox" name="remember-me" id="" />
                  <label for="remember-me">Remember me</label>
               </div>

               <div class="login-guestlogin-btn-wrapper">
                  <button class="login-btn btns-login">Log in</button>
                  <div id="guest-link" onclick="loginGuest()" class="guest-login-btn btns-login">Guest Log in</div>
               </div>
            </form>
    `;
}

function loginGuest() {
  window.location.href = "summary.html";
}

function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId);
  const passwordToggle = document.getElementById(inputId + 'Toggle');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordToggle.src = './assets/img/visibility.svg'; // Passwort sichtbar machen
  } else {
    passwordInput.type = 'password';
    if (passwordInput.value.length > 0) {
      passwordToggle.src = './assets/img/visibility_off.svg'; // Passwort verstecken, wenn Text im Input
    } else {
      passwordToggle.src = './assets/img/lock_icon.png'; // Passwort verstecken, wenn kein Text im Input
    }
  }
}


function updatePasswordVisibilityIcon(inputId) {
  const passwordInput = document.getElementById(inputId);
  const passwordToggle = document.getElementById(inputId + 'Toggle');

  if (passwordInput.value.length > 0) {
    passwordToggle.src = './assets/img/visibility_off.svg'; // Passwort verstecken, wenn Text im Input
  } else {
    passwordToggle.src = './assets/img/lock_icon.png'; // Passwort verstecken, wenn kein Text im Input
  }
}


function generateId() {
  let generatedId;
  let isUnique = false;

  while (!isUnique) {
    // Generiere eine zufällige 6-stellige Zahl
    generatedId = Math.floor(100000 + Math.random() * 900000);

    // Überprüfen, ob die ID bereits existiert
    isUnique = !user.some((user) => user.id === generatedId);
  }

  return generatedId;
}

// function loginUser() {
//   let email = document.getElementById('email').value;
//   let password = document.getElementById('password').value;

//   // Überprüfung, ob die E-Mail-Adresse im Array vorhanden ist
//   const emailExists = user.some((item) => item.email === document.getElementById('email').value);

//   if (emailExists) {
//     console.log('Die E-Mail-Adresse ist korrekt.');
//     const passwordExists = user.some((item) => item.password === document.getElementById('password').value);
//     if (passwordExists) {
//       console.log('Beides korrekt');
//         sessionStorage.setItem('status', 'loggedIn');
//         checkUser(user);
//     window.location.href = './summary.html';
//     } else {
//       alert('Passwort ist nicht korrekt.');
//       document.getElementById('input-login').reset();
//     }
//   } else {
//     alert('Bitte Registriere dich unter SignUP.');
//     document.getElementById('input-login').reset();
//   }
// }

function loginUser() {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("loginPassword").value;
  const passwordInput = document.getElementById("loginPassword");
  const passwordWrongText = document.getElementById("loginPasswordWrongText");

  // Benutzer im Array finden
  const Currentuser = user.find((item) => item.email === email);

  if (Currentuser) {
    if (Currentuser.password === password) {
      sessionStorage.setItem("loggedIn", Currentuser.first_two_letters);
      sessionStorage.setItem("name", Currentuser.name);
      checkUser(Currentuser); // Stellen Sie sicher, dass checkUser definiert ist
      window.location.href = "./summary.html";
    } else {
      showInvalidCredentialsToast();
      passwordWrongText.classList.add("show");
      passwordInput.style.border = "1px solid #FF001F"; // Setzt den roten Rand bei falschem Passwort
    }
  } else {
    showInvalidCredentialsToast();
    passwordWrongText.classList.add("show");
    passwordInput.style.border = "1px solid #FF001F"; // Setzt den roten Rand bei falscher E-Mail
  }

  // Setzt die Fehleranzeige zurück, wenn auf das Passwortfeld geklickt wird
  passwordInput.addEventListener("focus", resetLoginPasswordError);
}

function showInvalidCredentialsToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function resetLoginPasswordError() {
  const passwordInput = document.getElementById("loginPassword");
  const passwordWrongText = document.getElementById("loginPasswordWrongText");

  passwordInput.style.border = "1px solid #ccc"; // Setzt den Rand zurück
  passwordWrongText.classList.remove("show"); // Versteckt den Fehlermeldungstext
}


//   const userCredential = await auth.signInWithEmailAndPassword(email, password);  //Abfrage von Firebase
// Anmeldedaten stimmen übere
function deleteSession() {
  sessionStorage.clear();
}

const toast = document.getElementById("toast");

// Annahme: Zeige die Toast-Nachricht an, wenn die Anmeldeinformationen falsch sind
// Beispiel-Logik:

