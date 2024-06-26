const toSignUpContainer = document.getElementById('toSignUpContainer');
const loginContainer = document.getElementById('loginContainer');
const signUpContainer = document.getElementById('signUpContainer');
const signUpSuccesContainer = document.getElementById('signUpSuccesContainer');
let newId = generateId();

openLogin();

function openLogin() {
  loginContainer.classList.remove('d-none');
  toSignUpContainer.classList.remove('d-none');
  signUpContainer.classList.add('d-none');
  openLoginHTML();
}

function openSignUp() {
  loginContainer.classList.add('d-none');
  toSignUpContainer.classList.add('d-none');
  signUpContainer.classList.remove('d-none');
  openSignUpHTML();
}

function signUpSucces() {
  signUpSuccesContainer.classList.remove('d-none');
  setTimeout(function () {
    signUpSuccesContainer.classList.add('d-none');
    window.location.href = './summary.html'; // Blende den Div-Container nach 2 Sekunden aus
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
       <form id="SignUpData" class="input-login" onsubmit="checkNames(); return false;">
           <div class="input-login-field">
               <input required type="text" name="name" placeholder="Name" />
               <img src="./assets/img/person_icon.png" alt="Mail-Icon" class="login-input-icons" />
           </div>
           <div class="input-login-field">
               <input id="newMail" required type="email" name="email" placeholder="Email" />
               <img src="./assets/img/mail_icon.png" alt="Mail-Icon" class="login-input-icons" />
           </div>
           <div class="input-login-field">
               <input id="password" onmouseover="showPassword()" type="password" name="password" placeholder="Password" required />
               <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
           </div>
           <div class="input-login-field">
               <input type="password" name="confirmPassword" placeholder="Confirm Password" />
               <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
           </div>
           <div class="accept-privacy-policy-form">
               <input required class="accept-icon" type="checkbox" name="acceptPrivacyPolicy" id="acceptPrivacyPolicy" />
               <label for="acceptPrivacyPolicy">I accept the <a href="" class="privacy-policy-link">Privacy policy</a></label>
           </div>
           <div class="login-guestlogin-btn-wrapper">
               <button class="signup-btn-in-form btns-login">Sign up</button>
           </div>
       </form>
   `;
}
function showPassword() {
  let password = document.getElementById('password').value;
  if (!password === '') {
    password.type = 'password'; // Passwort im Klartext anzeigen
  } else {
    password.type = 'text'; // Passwort wieder verbergen
  }
}

function returnPostedData() {
  const form = document.getElementById('SignUpData');
  const formData = new FormData(form);
  let input = formData.get('name');
  let words = input.split(' ');
  let firstLetters = words.map((word) => word.charAt(0)).join('');
  const firstLetter = firstLetters.toUpperCase();

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    first_two_letters: firstLetter,
    id: newId,
    'color': newContactColor()
  };
  // Überprüfung, ob die E-Mail-Adresse im Array vorhanden ist
  const emailExists = user.some((item) => item.email === formData.get('email'));

  if (emailExists) {
    alert('Die E-Mail-Adresse ist bereits im Array vorhanden.');
    document.getElementById('SignUpData').reset();

    //  document.getElementById('SignUpData').reset();
  } else {
    console.log('Die E-Mail-Adresse ist nicht im Array vorhanden.');
    return data;
  }
}

async function postSignUpData(path, data) {
  if (returnPostedData === '') {
    return;
  }
  console.log(path);
  console.log(data);
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return (responseToJSON = await response.json());
}

function checkNames() {
  const form = document.getElementById('SignUpData');
  let newMail = document.getElementById('newMail').value;
  const formData = new FormData(form);
  let input = formData.get('name');
  let words = input.split(/\s+/);
  if (words.length <= 3) {
    console.log(returnPostedData());
    
    if (! user.some((item) => item.email === formData.get('email'))) {
      postSignUpData('/users/' + newId, returnPostedData());
      signUpSucces();
    } else {
      return;
    }
  } else {
    alert('Bitte geben Sie maximal 3 Namen ein.');
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
                  <input required id="password" type="password" placeholder="Password" />
                  <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
               </div>

               <div class="remember-me-form">
                  <input class="accept-icon" type="checkbox" name="remember-me" id="" />
                  <label for="remember-me">Remember me</label>
               </div>

               <div class="login-guestlogin-btn-wrapper">
                  <button class="login-btn btns-login">Log in</button>
                  <div id="guest-link" class="guest-login-btn btns-login">Guest Log in</div>
               </div>
            </form>
    `;
}

document.getElementById('guest-link').addEventListener('click', function () {
  window.location.href = './summary.html';
});

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

function loginUser() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  // Überprüfung, ob die E-Mail-Adresse im Array vorhanden ist
  const emailExists = user.some((item) => item.email === document.getElementById('email').value);

  if (emailExists) {
    console.log('Die E-Mail-Adresse ist korrekt.');
    const passwordExists = user.some((item) => item.password === document.getElementById('password').value);
    if (passwordExists) {
      console.log('Beides korrekt');
      window.location.href = './summary.html';
    } else {
      alert('Du bist ein HACKER.');
      document.getElementById('input-login').reset();
    }
  } else {
    alert('Bitte Registriere dich unter SignUP.');
    document.getElementById('input-login').reset();
  }
}

//   const userCredential = await auth.signInWithEmailAndPassword(email, password);  //Abfrage von Firebase
// Anmeldedaten stimmen übere
