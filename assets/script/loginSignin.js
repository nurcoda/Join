const toSignUpContainer = document.getElementById("toSignUpContainer");
const loginContainer = document.getElementById("loginContainer");
const signUpContainer = document.getElementById("signUpContainer");
const signUpSuccesContainer = document.getElementById("signUpSuccesContainer");
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
}

function closeSignUpSucces() {
   signUpSuccesContainer.classList.add("d-none");
   window.location.href = "./summary.html";
}

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
       <form id="SignUpData" class="input-login">
           <div class="input-login-field">
               <input type="text" name="name" placeholder="Name" />
               <img src="./assets/img/person_icon.png" alt="Mail-Icon" class="login-input-icons" />
           </div>
           <div class="input-login-field">
               <input type="email" name="email" placeholder="Email" />
               <img src="./assets/img/mail_icon.png" alt="Mail-Icon" class="login-input-icons" />
           </div>
           <div class="input-login-field">
               <input type="password" name="password" placeholder="Password" />
               <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
           </div>
           <div class="input-login-field">
               <input type="password" name="confirmPassword" placeholder="Confirm Password" />
               <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
           </div>
           <div class="accept-privacy-policy-form">
               <input class="accept-icon" type="checkbox" name="acceptPrivacyPolicy" id="acceptPrivacyPolicy" />
               <label for="acceptPrivacyPolicy">I accept the <a href="" class="privacy-policy-link">Privacy policy</a></label>
           </div>
           <div class="login-guestlogin-btn-wrapper">
               <div class="signup-btn-in-form btns-login" onclick="signUpSucces(); postSignUpData('/users/${newId}', returnPostedData());">Sign up</div>
           </div>
       </form>
   `;
}

function returnPostedData() {
   const form = document.getElementById("SignUpData");
   const formData = new FormData(form);

   const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      id: newId,
   };

   return data;
}

function openLoginHTML() {
   loginContainer.innerHTML = `
    <div class="headline-login-wrapper">
               <h1>Log in</h1>
               <div class="underline-headline"></div>
            </div>
            <form class="input-login">
               <div class="input-login-field">
                  <input id="email" type="email" placeholder="Email" />
                  <img src="./assets/img/mail_icon.png" alt="Mail-Icon" class="login-input-icons" />
               </div>
               <div class="input-login-field">
                  <input id="password" type="password" placeholder="Password" />
                  <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
               </div>

               <div class="remember-me-form">
                  <input class="accept-icon" type="checkbox" name="remember-me" id="" />
                  <label for="remember-me">Remember me</label>
               </div>

               <div class="login-guestlogin-btn-wrapper">
                  <div class="login-btn btns-login" onclick="loginUser()">Log in</div>
                  <div id="guest-link" class="guest-login-btn btns-login">Guest Log in</div>
               </div>
            </form>
    `;
}

document.getElementById("guest-link").addEventListener("click", function () {
   window.location.href = "./summary.html";
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
   let email = document.getElementById("email").value;
   let password = document.getElementById("password").value;
   for (let i = 0; i < user.length; i++) {
      if (user[i]["email"].includes(email)) {
         console.log("Email ist da");

         if (user[i]["password"].includes(password)) {
            console.log("Passwort ist auch da");

            window.location.href = "./summary.html";
         }
      } else {
         console.log("passt nicht");
      }
   }
}

//   const userCredential = await auth.signInWithEmailAndPassword(email, password);  //Abfrage von Firebase
// Anmeldedaten stimmen übere
