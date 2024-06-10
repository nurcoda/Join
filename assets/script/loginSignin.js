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

function openSignUpHTML() {
   signUpContainer.innerHTML = `
     <div class="headline-login-wrapper">
               <img src="./assets/img/goback_arrow_icon.png" alt="" class="goback-arrow" onclick="openLogin()" />
               <h1>Sign-up</h1>
               <div class="underline-headline"></div>
            </div>
            <form class="input-login">
               <div class="input-login-field">
                  <input type="text" placeholder="Name" />
                  <img src="./assets/img/person_icon.png" alt="Mail-Icon" class="login-input-icons" />
               </div>
               <div class="input-login-field">
                  <input type="email" placeholder="Email" />
                  <img src="./assets/img/mail_icon.png" alt="Mail-Icon" class="login-input-icons" />
               </div>
               <div class="input-login-field">
                  <input type="password" placeholder="Password" />
                  <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
               </div>
               <div class="input-login-field">
                  <input type="password" placeholder="Confirm Password" />
                  <img src="./assets/img/lock_icon.png" class="login-input-icons" alt="Lock-Icon" />
               </div>

               <div class="accept-privacy-policy-form">
                  <input class="accept-icon" type="checkbox" name="accept-privacy-policy" id="" />
                  <label for="accept-privacy-policy"
                     >I accept the <a href="" class="privacy-policy-link">Privacy policy</a></label
                  >
               </div>

               <div class="login-guestlogin-btn-wrapper">
                  <div class="signup-btn-in-form btns-login" onclick="signUpSucces()">Sign up</div>
               </div>
            </form>
    `;
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
                  <div class="guest-login-btn btns-login">Guest Log in</div>
               </div>
            </form>
    `;
}
