"use strict";
const d = document,
  staff = 8,
  $collaborators = d.querySelector("#collaborators"),
  $aside = d.querySelector("aside"),
  $schedule = d.querySelector(".schedule");
let i = 8,
  collaborators = 8,
  flag = false;

d.addEventListener("DOMContentLoaded", () => {
  printSchedule();
  printCollaborators();
  eventListeners();
});

const handleSchedule = (aId) => {
  if (flag) return;
  const $div = d.querySelector(`#${aId}`);
  if (flag === false && collaborators === 0 && $div.dataset.free === "true") {
    flag = true;
    const $p = d.createElement("P");
    $p.classList.add("warning");
    $p.textContent = "Sorry, all of our staff are busy.";
    $collaborators.appendChild($p);
    setTimeout(() => {
      $collaborators.removeChild($p);
      flag = false;
    }, 2000);
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
//busy, free
// reserved, available
const eventListeners = () => {
  d.addEventListener("click", (e) => {
    if (e.target.name === "time") {
      handleSchedule(e.target.id, e);
    }
  });
};

const printCollaborators = () => {
  $collaborators.classList.add("staff");
  $collaborators.textContent = `${collaborators} of ${staff}`;
  if (collaborators === 0) {
    $aside.classList.add("warning");
    $aside.textContent = "All of our staff are busy.";
  } else {
    $aside.classList.remove("warning");
    $aside.textContent = null;
  }
};

const printSchedule = () => {
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
    $schedule.appendChild($div);
    i += 0.5;
  }
};
