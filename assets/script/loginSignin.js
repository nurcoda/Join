const toSignUpContainer = document.getElementById("toSignUpContainer");
const loginContainer = document.getElementById("loginContainer");
const signUpContainer = document.getElementById("signUpContainer");
const signUpSuccesContainer = document.getElementById("signUpSuccesContainer");
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
               <div class="signup-btn-in-form btns-login" onclick="signUpSucces(); postSignUpData('/users', returnPostedData());">Sign up</div>
           </div>
       </form>
   `;
}


function returnPostedData() {
   const form = document.getElementById('SignUpData');
   const formData = new FormData(form);

   const data = {
       name: formData.get('name'),
       email: formData.get('email'),
       password: formData.get('password')
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
                  <input type="email" placeholder="Email" />
                  <img src="./assets/img/mail_icon.png" alt="Mail-Icon" class="login-input-icons" />
               </div>
               <div class="input-login-field">
                  <input type="password" placeholder="Password" />
                  <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
               </div>

               <div class="remember-me-form">
                  <input class="accept-icon" type="checkbox" name="remember-me" id="" />
                  <label for="remember-me">Remember me</label>
               </div>

               <div class="login-guestlogin-btn-wrapper">
                  <div class="login-btn btns-login">Log in</div>
                  <div id="guest-link" class="guest-login-btn btns-login" ahref="./board.html">Guest Log in</div>
               </div>
            </form>
    `;
}

document.getElementById('guest-link')
              .addEventListener('click', function () {
                window.location.href = './board.html';
        });
