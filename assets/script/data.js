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
   pushUsersToContacts(user, contacts);
}

function pushUsersToContacts(user, contacts) {
   user.forEach((singleUser) => {
      let { password, ...userWithoutPassword } = singleUser;
      contacts.push(userWithoutPassword);
   });
}

async function PostData(path = "", data = {}) {
   let response = await fetch(BASE_URL + path + ".json", {
      method: "POST",
      header: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return (responseToJSON = await response.json());
}

async function postSignUpData(path = "", data = {}) {
   let response = await fetch(BASE_URL + path + ".json", {
      method: "POST",
      header: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return (responseToJSON = await response.json());
}

// This function is to sort the data in database in right way, to work with it correctly.
// ONLY NECESSARY WITH TESTDATA JSON, ONE TIME
// USE ONE TIME IF DATA COMES FROM TESTDATA.JSON

async function uploadDataToHaveRightPositionInDB() {
   const dataToUpload = {
      users: user.reduce((acc, u) => ({ ...acc, [u.id]: u }), {}),
      tasks: tasks.reduce((acc, t) => ({ ...acc, [t.id]: t }), {}),
      contacts: contacts.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}),
   };

   try {
      let response = await fetch(BASE_URL + ".json", {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(dataToUpload),
      });

      if (!response.ok) {
         throw new Error("Fehler beim Hochladen der Daten");
      }

      let responseData = await response.json();
      console.log("Daten erfolgreich hochgeladen", responseData);
   } catch (error) {
      console.error("Fehler:", error);
   }
}

// ____________________________________________________________________________
