let selectedContactIndex = null;

async function renderContacts() {
  await loadData();
  document.getElementById('contactList').innerHTML = renderContactsHTML();
  groupAndDisplayContacts();
}

function groupAndDisplayContacts() {
  let sortedContacts = contacts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  groupContacts(sortedContacts);
}

function groupContacts(sortedContacts) {
  const groupedContacts = {};

  sortedContacts.forEach((contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!groupedContacts[firstLetter]) {
      groupedContacts[firstLetter] = [];
    }
    groupedContacts[firstLetter].push(contact);
  });

  let containerContent = '';
  for (const letter in groupedContacts) {
    containerContent += `<div class="contact-letter"><h2 class="letter">${letter}</h2></div>`;
    groupedContacts[letter].forEach((contact) => {
      let i = contacts.findIndex((c) => c.id === contact.id);
      let avatar = renderAvatar(i, contact.color);
      containerContent += groupContactsHTML(i, avatar, contact);
    });
  }

  document.getElementById('contactList').innerHTML += containerContent;
}

function highlightContact(index) {
  if (selectedContactIndex !== null) {
    const previousElement = document.getElementById(`contact-${selectedContactIndex}`);
    if (previousElement) {
      previousElement.classList.remove('highlight');
    }
  }
  selectedContactIndex = index;
  const newElement = document.getElementById(`contact-${selectedContactIndex}`);
  if (newElement) {
    newElement.classList.add('highlight');
  }
}

function colorAvatar(i, color) {
  return `<div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50%;"></div>`;
}
function renderAvatar(i, avatar) {
  const username = contacts[i]['name'];
  const firstNameInitial = username[0];
  let secondNameInitial = '';

  const nameParts = username.split(' ');
  if (nameParts.length > 1) {
    secondNameInitial = nameParts[1][0];
  }

  avatar = firstNameInitial.toUpperCase() + secondNameInitial.toUpperCase();
  return avatar;
}

function renderContactCardInfo(i) {
  let avatar = renderAvatar(i);
  let phone = contacts[i].phone || '';

  if (!phone.startsWith('+')) {
    phone = '+' + phone;
  }

  contactCardBigContainer.innerHTML = renderContactCardInfoHTML(i, avatar, phone);
  document.querySelector('.edit-icon-wrapper').addEventListener('click', openPopUp);
  document.querySelector('.delete-icon-wrapper').addEventListener('click', () => deleteContact(i));
}

// ##################
//   DELETE CONTACT
// ##################

async function deleteContact(index) {
  isContactAssignedToTask(index);
  isContactAlsoUser(index);
  await deleteContactDataDB(contacts[index].id);
  renderContacts();
  document.getElementById('contactCardBigContainer').innerHTML = '';
}

async function deleteContactDataDB(id) {
  await fetch(`${BASE_URL}/contacts/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function deleteAssignedUserFromTaskDB(taskId, updatedTask) {
  await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  });
}

// Delete ASSIGNED USER Helper Functions

async function isContactAssignedToTask(index) {
  let username = contacts[index].name;
  tasks.forEach(async (task) => {
    if (task.assigned_user && task.assigned_user.some((user) => user.name === username)) {
      await deleteAssignedUserFromTask(task.id, username);
    }
  });
}

async function deleteAssignedUserFromTask(taskId, username) {
  let task = tasks.find((task) => task.id === taskId);
  if (task) {
    let updatedAssignedUsers = task.assigned_user.filter((user) => user.name !== username);
    let updatedTask = getUpdatedTask(task, updatedAssignedUsers);
    deleteAssignedUserFromTaskDB(taskId, updatedTask);
  }
}

function getUpdatedTask(task, updatedAssignedUsers) {
  return {
    'id': task.id,
    'name': task.name,
    'description': task.description,
    'category': task.category,
    'priority': task.priority,
    'due_date': task.due_date,
    'state': task.state,
    'assigned_user': updatedAssignedUsers
  };
}

// Delete Helper Functions

function isContactAlsoUser(index) {
  let isContactAlsoUser = checkIfContactisUser(contacts[index].id);
  if (isContactAlsoUser) {
    let userIndex = findContactIndexById(contacts[index].id);
    deleteUserData(userIndex);
    user.splice(userIndex, 1);
  }
}

function findContactIndexById(contactId) {
  let userIndex;
  for (let i = 0; i < user.length; i++) {
    if (user[i].id === contactId) {
      userIndex = i;
    }
  }
  return userIndex;
}

function checkIfContactisUser(contactID) {
  const isUser = user.some((singleUser) => singleUser.id === contactID);
  return isUser ? true : false;
}

function deleteUserData(userIndex) {
  let userId = user[userIndex].id;
  deleteUserDataDB(userId);
}

async function deleteUserDataDB(id) {
  await fetch(`${BASE_URL}/users/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// ##################
//    ADD CONTACT
// ##################

function addPersonToContact() {
  event.preventDefault();
  let name = document.getElementById('input-field-name').value;
  let mail = document.getElementById('input-field-mail').value;
  let phone = document.getElementById('input-field-phone').value;
  let nameExists = contacts.some((contact) => contact.name === name);
  let mailExists = contacts.some((contact) => contact.email === mail);

  if (!checkNamesLength(name)) {
    return;
  }

  if (mailExists) {
    mailExistsAlready();
    return;
  }

  if (!nameExists) {
    let contact = { 'name': name, 'email': mail, 'phone': phone, 'id': generateId() };
    contacts.push(contact);
    updateNewContactData(contact.id);
  } else {
    let nameAffix = getNameAffixAtDoubleUse();
    let contact = { 'name': name + `(${nameAffix})`, 'email': mail, 'phone': phone, 'id': generateId() };
    contacts.push(contact);
    updateNewContactData(contact.id);
  }

  renderContacts();
  closePopUpByBtn();
}

function mailExistsAlready() {
  let errorMessage = document.getElementById('errorMessageAddContact');
  errorMessage.innerHTML = 'This mail exsists already.';
  errorMessage.classList.remove('d-none');
  setTimeout(() => {
    errorMessage.classList.add('d-none');
  }, 1800);
}

async function updateNewContactData(id) {
  let contactIndex = findUserIndexById(id);
  let updatedContactData = {
    'color': newContactColor(),
    'email': contacts[contactIndex].email,
    'first_two_letters': 'Test',
    'id': contacts[contactIndex].id,
    'name': contacts[contactIndex].name,
    'phone': contacts[contactIndex].phone
  };
  await updateDataContactsDB('contacts/' + contacts[contactIndex].id, updatedContactData);
  renderContacts();
}

// Helper Add Contact

function findUserIndexById(id) {
  return contacts.findIndex((contact) => contact.id === id);
}

function newContactColor() {
  const usedColors = new Set(contacts.map((contact) => contact.color));
  for (const color of colorCodes) {
    if (!usedColors.has(color)) {
      return color;
    }
  }
}

function generateId() {
  const generatedId = Math.floor(100000 + Math.random() * 900000);
  if (user.some((user) => user.id === generatedId)) {
    return generateId(user);
  }
  return generatedId;
}

function getNameAffixAtDoubleUse() {
  let nameAffixString = generateId().toString().substring(0, 3);
  nameAffix = parseInt(nameAffixString, 10);
  return nameAffix;
}

function checkNamesLength(name) {
  let nameWords = name.trim().split(' ');

  if (nameWords.length < 2) {
    nameIsToShort();
    return false;
  }

  if (nameWords.length > 3) {
    nameIsToLong();
    return false;
  }

  return true;
}

function nameIsToShort() {
  let errorMessage = document.getElementById('errorMessageAddContact');
  errorMessage.innerHTML = 'Please use surname and lastname';
  errorMessage.classList.remove('d-none');
  setTimeout(() => {
    errorMessage.classList.add('d-none');
  }, 1800);
}

function nameIsToLong() {
  let errorMessage = document.getElementById('errorMessageAddContact');
  errorMessage.innerHTML = 'Please only use 3 names';
  errorMessage.classList.remove('d-none');
  setTimeout(() => {
    errorMessage.classList.add('d-none');
  }, 1800);
}

// ##################
//    EDIT CONTACT
// ##################

function editSave(i) {
  let name = document.getElementById('edit-input-field-name').value;
  let email = document.getElementById('edit-input-field-mail').value;
  let phone = document.getElementById('edit-input-field-phone').value;

  if (phone.startsWith('+')) {
    phone = phone.substring(1);
  }

  contacts[i].name = name;
  contacts[i].email = email;
  contacts[i].phone = phone;

  if (!checkNamesLength(name)) {
    return;
  }

  closePopUpByBtn();
  renderContactCardInfo(i);
  updateContactData(i);
}

async function updateContactData(i) {
  let updatedContactData = {
    'color': contacts[i].color,
    'email': contacts[i].email,
    'first_two_letters': contacts[i].first_two_letters,
    'id': contacts[i].id,
    'name': contacts[i].name,
    'phone': contacts[i].phone
  };
  await updateDataContactsDB('contacts/' + contacts[i].id, updatedContactData);
  renderContacts();
}

async function updateDataContactsDB(path, data) {
  await fetch(BASE_URL + path + '.json', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

//** Helper Functions */
// ________________________________________________

function closePopUpByBtn() {
  document.getElementById('popUpBackground').classList.add('d-none');
}

function renderEditContactCardInfo(i) {
  openPopUp();
  let avatar;
  avatar = renderAvatar(i, avatar);
  if (!contacts[i].phone) {
    contacts[i].phone = '';
  }
  popUpBackground.innerHTML = renderEditContactCardInfoHTML(i, avatar);
}

function renderAddContactCardInfo() {
  openPopUp();
  popUpBackground.innerHTML = renderAddContactCardInfoHTML();
}

popUpBackground.addEventListener('click', closePopUp);

function openPopUp() {
  popUpBackground.classList.remove('d-none');
}

function closePopUp() {
  if (event.target === closePopUpBtn) {
    popUpBackground.classList.add('d-none');
  }
}
