"use strict";
const d = document,
  staff = 8,
  $schedule = d.querySelector(".schedule"),
  $elements = d.querySelector(".elements");
let i = 8,
  element = 8;

d.addEventListener("DOMContentLoaded", () => {
  printSchedule();
  printElements();
  eventListeners();
});

const handleSchedule = (aId) => {
  const $div = d.querySelector(`#${aId}`);
  if (element === 0 && $div.dataset.free === "true") {
    return;
  } else if ($div.dataset.free === "true" && element > 0) {
    $div.setAttribute("data-free", false);
    $div.classList.remove("available");
    $div.classList.add("reserved");
    element--;
  } else {
    $div.setAttribute("data-free", true);
    $div.classList.remove("reserved");
    $div.classList.add("available");
    element++;
  }
  console.log(element);
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

const printElements = () => {
  $elements.textContent = `${element} of ${staff}`;
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
