"use strict";
/* VARIABLES */
const d = document,
  staff = 8,
  $warnings = d.querySelector(".warnings");
let i = 8,
  collaborators = 8,
  flag = false;

/* LISTENERS */
d.addEventListener("DOMContentLoaded", () => {
  printSchedule();
  printCollaborators();
  eventListeners();
});

/* FUNCTIONS */
// Show warning message to user
const showWarning = (message) => {
  const $message = d.createElement("P");
  $message.classList.add("warning");
  $message.textContent = message;
  $warnings.appendChild($message);
  setTimeout(() => {
    $warnings.removeChild($message);
    flag = false;
  }, 4000);
};

// Handle schedule according to user selection
const handleSchedule = (aId) => {
  if (flag) return;
  const $div = d.querySelector(`#${aId}`);
  if (collaborators === 0 && $div.dataset.free === "true") {
    flag = true;
    showWarning("Sorry, all of our staff are busy.");
  } else if ($div.dataset.free === "true" && collaborators > 0) {
    $div.setAttribute("data-free", false);
    $div.classList.remove("available");
    $div.classList.add("reserved");
    collaborators--;
    printCollaborators();
  } else {
    $div.setAttribute("data-free", true);
    $div.classList.remove("reserved");
    $div.classList.add("available");
    collaborators++;
    printCollaborators();
  }
};

// Event listeners
const eventListeners = () => {
  d.addEventListener("click", (e) => {
    if (e.target.name === "time") {
      handleSchedule(e.target.id, e);
    }
  });
};

// Print staff availability
const printCollaborators = () => {
  const $collaborators = d.querySelector("#collaborators");
  $collaborators.textContent = `Currently available ${collaborators} of ${staff} 🏍️`;
  if (collaborators === 0) {
    showWarning("All of our staff are busy.");
  }
};

// Print schedule, from 8am to 8pm, 30 minutes interval
const printSchedule = () => {
  const $times = d.querySelector(".times");
  let genId = 0;
  while (i <= 20) {
    genId++;
    const $div = d.createElement("DIV");
    $div.id = `t${genId}`;
    $div.name = "time";
    $div.setAttribute("data-free", true);
    $div.classList.add("time", "available");
    let hours = undefined,
      minutes = undefined,
      period = undefined;
    if (i < 12) {
      hours = i;
      period = "AM";
    } else {
      i === 12 || i === 12.5 ? (hours = 12) : (hours = i - 12);
      period = "PM";
    }
    Number.isInteger(i) ? (minutes = "00") : (minutes = 30);
    $div.textContent = `${Math.floor(hours)}:${minutes} ${period}`;
    $times.appendChild($div);
    i += 0.5;
  }
};
