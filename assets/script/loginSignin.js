const toSignUpContainer = document.getElementById("toSignUpContainer");
const loginContainer = document.getElementById("loginContainer");
const signUpContainer = document.getElementById("signUpContainer");

function openSignUp() {
   loginContainer.classList.add("d-none");
   toSignUpContainer.classList.add("d-none");
   signUpContainer.classList.remove("d-none");
}

function openLogin() {
   loginContainer.classList.remove("d-none");
   toSignUpContainer.classList.remove("d-none");
   signUpContainer.classList.add("d-none");
}
