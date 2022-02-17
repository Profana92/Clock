const hourHand = document.querySelector("[data-hand-hour]");
const secondHand = document.querySelector("[data-hand-second]");
const minuteHand = document.querySelector("[data-hand-minute]");
const dayHand = document.querySelector("[data-hand-day]");
const timerHand = document.querySelector("[data-hand-timer]");
const timerButton = document.querySelector(".button");
const digitalClock = document.querySelector("[data-hand-digital-clock]");
const popup1 = document.querySelector("[data-popup1]");
const popupX = document.querySelector("[data-popupX]");
const dateIndicator = document.querySelector("[data-date]");
const minuteTimerHand = document.querySelector("[data-hand-minute-timer]");
let currentTimerSeconds = 0;
let interval = 0;
/* Tests */
function checkValues(
  hourHand,
  secondHand,
  minuteHand,
  dayHand,
  timerHand,
  timerButton,
  digitalClock,
  popup1,
  dateIndicator,
  minuteTimerHand
) {
  if (
    hourHand == null ||
    secondHand == null ||
    minuteHand == null ||
    dayHand == null ||
    timerHand == null ||
    timerButton == null ||
    digitalClock == null ||
    popup1 == null ||
    dateIndicator == null ||
    minuteTimerHand == null
  ) {
    throw "Elements selection error, please ensure correct assignment";
  }
}

try {
  checkValues(
    hourHand,
    secondHand,
    minuteHand,
    dayHand,
    timerHand,
    timerButton,
    digitalClock,
    popup1,
    dateIndicator,
    minuteTimerHand
  );
} catch (e) {
  console.warn("⛔", e);
}

/* Main code */

/* Functions */
function setClock() {
  let currentDate = new Date();
  let currentDayOfTheMonth = currentDate.getDate();
  let currentHour = currentDate.getHours();
  let currentMinute = (currentDate.getMinutes() / 60) * 360;
  let currentSecond = (currentDate.getSeconds() / 60) * 360;
  let day = currentDate.getDay();
  let dayRotation = (day / 7) * 360 + (currentHour / 24) * 51.42857142857142;
  setRotation(minuteHand, currentMinute);
  setRotation(secondHand, currentSecond);
  setRotation(dayHand, dayRotation);
  currentHour =
    (((currentHour + 24) % 12) / 12) * 360 + (currentMinute / 360) * 30;
  setRotation(hourHand, currentHour);
  setDigitalClock(digitalClock);
  setDateIndicator(currentDayOfTheMonth);
}

function setRotation(element, rotation) {
  element.style.setProperty("--rotation", rotation);
}
function addSecond() {
  currentTimerSeconds += 0.1;
  let timerRotation = (currentTimerSeconds / 60) * 360;
  setRotation(timerHand, timerRotation);
  let currentTimerSecondsPrecision = currentTimerSeconds.toPrecision(4);
  console.log(currentTimerSecondsPrecision);
  if (currentTimerSecondsPrecision % 1 === 0);
  {
    if (currentTimerSecondsPrecision == 30) {
      console.log("reset");
      currentTimerSecondsPrecision = 0;
      currentTimerSeconds = 0;
      setRotation(minuteTimerHand, 0);
    } else {
      setRotation(minuteTimerHand, (currentTimerSecondsPrecision / 30) * 180);
    }
  }
}
function setTimer() {
  if (currentTimerSeconds === 0) {
    interval = setInterval(addSecond, 100);
  } else {
    clearInterval(interval);
    currentTimerSeconds = 0;
  }
}
function setDigitalClock(digitalClock) {
  let digitalClockDate = new Date();
  digitalClock.innerHTML = `${
    digitalClockDate.getHours() < 10 ? "0" : ""
  }${digitalClockDate.getHours()}:${
    digitalClockDate.getUTCMinutes() < 10 ? "0" : ""
  }${digitalClockDate.getMinutes()}:${
    digitalClockDate.getSeconds() < 10 ? "0" : ""
  }${digitalClockDate.getSeconds()}`;
}
function setDateIndicator(currentDayOfTheMonth) {
  dateIndicator.innerHTML = `${
    currentDayOfTheMonth < 10 ? "0" : ""
  }${currentDayOfTheMonth}
  `;
}

/* Timers */
setInterval(setClock, 100);

/* Event Listeners */
timerButton.addEventListener("click", setTimer);

popup1.addEventListener("click", () => {
  if (popup1.classList.contains("position1")) {
    popup1.classList.replace("position1", "position2");
    popup1.innerText = "You can track seconds here, click again";
  } else if (popup1.classList.contains("position2")) {
    popup1.innerText = "whole minutes here, click again";
    popup1.classList.replace("position2", "position3");
  } else if (popup1.classList.contains("position3")) {
    popup1.classList.replace("position3", "position4");
    popup1.innerText = "day of the month is shown here";
  } else {
    popup1.classList.replace("position4", "position1");
    popup1.innerText = "";
    popup1.insertAdjacentHTML(
      "afterbegin",
      " <div data-popupX class='right-align inline'>X</div><div>Click to use timer</div>"
    );
  }
});

popupX.addEventListener("click", hide);
function hide() {
  console.log(popup1);
  popup1.classList.add("hidden");
}
