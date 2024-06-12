// let subtasks = [];
let subtasksIconsShowing = false;

function setPrioButton(prio) {
  changeButtonColorAndImg(prio);
}

function changeButtonColorAndImg(prio) {
  const priorities = ["urgent", "medium", "low"];
  const colors = {
    urgent: "#FF3D00",
    medium: "#FFA800",
    low: "#7AE229",
  };

  priorities.forEach((priority) => {
    let button = document.getElementById(priority + "Button");
    let img = document.getElementById(priority + "ButtonImg");
    if (priority === prio) {
      img.src = `./assets/img/prio_${priority}_white.png`;
      button.style.backgroundColor = colors[priority];
    } else {
      img.src = `./assets/img/prio_${priority}.png`;
      button.style.backgroundColor = "white";
    }
  });
}

function showSubtasksIcons() {
  document.getElementById("subtasksPlusIcon").classList.add("d-none");
  document.getElementById("subtasksInputIcons").classList.remove("d-none");
}

function hideSubtasksIcons() {
  document.getElementById("subtasksInputIcons").classList.add("d-none");
  document.getElementById("subtasksPlusIcon").classList.remove("d-none");
}

function clearSubtasksInput() {
  let input = document.getElementById("subtasksInput");
  input.value = "";
  hideSubtasksIcons();
}

function addNewSubtask() {
  let input = document.getElementById("subtasksInput").value;
  let subtasksList = document.getElementById("subtasksList");
  // subtasks.push(input);
  subtasksList.innerHTML += `<li>${input}</li>`;
  clearSubtasksInput();
}
