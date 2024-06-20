let user;
let contacts;
let tasks;

const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";

loadData();
async function loadData() {
   let response = await fetch(BASE_URL + ".json");
   let responseAsJson = await response.json();
   console.log(typeof responseAsJson.contacts);
   user = Object.values(responseAsJson.users);
   tasks = Object.values(responseAsJson.tasks);
   contacts = Object.values(responseAsJson.contacts);
}
