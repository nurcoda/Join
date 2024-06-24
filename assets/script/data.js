let user = [];
let contacts = [];
let tasks = [];
const BASE_URL = "https://join-61eb9-default-rtdb.europe-west1.firebasedatabase.app/";

loadData();

async function loadData() {
   let response = await fetch(BASE_URL + ".json");
   let responseAsJson = await response.json();
   try {
      user = Object.values(responseAsJson.users);
      contacts = Object.values(responseAsJson.contacts);
      tasks = Object.values(responseAsJson.tasks);
   } catch (error) {}
   pushUsersToContacts(user, contacts);
}

async function postSignUpData(path, data = {}) {
   let response = await fetch(BASE_URL + path + ".json", {
      method: "POST",
      header: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return (responseToJSON = await response.json());
}

//Maybe used later?

// async function PostData(path = "", data = {}) {
//    let response = await fetch(BASE_URL + path + ".json", {
//       method: "POST",
//       header: {
//          "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//    });
//    return (responseToJSON = await response.json());
// }

// This function is to sort the data in database in right way, to work with it correctly.
// ONLY NECESSARY WITH TESTDATA JSON, ONE TIME
// USE ONE TIME IF DATA COMES FROM TESTDATA.JSON

async function uploadTestData() {
   await loadData();
   pushUsersToContacts(user, contacts);
   await uploadDataToHaveCorrectKeyInDB();
}

async function uploadDataToHaveCorrectKeyInDB() {
   const dataToUpload = {
      users: user.reduce((acc, u) => (u ? { ...acc, [u.id]: u } : acc), {}),
      tasks: tasks.reduce((acc, t) => (t ? { ...acc, [t.id]: t } : acc), {}),
      contacts: contacts.reduce((acc, c) => (c ? { ...acc, [c.id]: c } : acc), {}),
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

function pushUsersToContacts(user, contacts) {
   user.forEach((singleUser) => {
      let { password, ...userWithoutPassword } = singleUser;
      const usernameExists = contacts.find((contact) => contact.name === userWithoutPassword.username);
      const idExists = contacts.find((contact) => contact.id === userWithoutPassword.id);
      if (!usernameExists && !idExists) {
         contacts.push(singleUser);
      }
   });
}
// ____________________________________________________________________________
