const hourHand = document.querySelector("[data-hand-hour]");
const secondHand = document.querySelector("[data-hand-second]");
const minuteHand = document.querySelector("[data-hand-minute]");
const dayHand = document.querySelector("[data-hand-day]");
const timerHand = document.querySelector("[data-hand-timer]");
const timerButton = document.querySelector(".button");
const digitalClock = document.querySelector("[data-hand-digital-clock]");
const popup1 = document.querySelector("[data-popup1]");
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
  digitalClock
) {
  if (
    hourHand == null ||
    secondHand == null ||
    minuteHand == null ||
    dayHand == null ||
    timerHand == null ||
    timerButton == null ||
    digitalClock == null
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
    digitalClock
  );
} catch (e) {
  console.warn("⛔", e);
}

/* Main code */

/* Functions */
function setClock() {
  let currentDate = new Date();
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
}

function setRotation(element, rotation) {
  element.style.setProperty("--rotation", rotation);
}
function addSecond() {
  currentTimerSeconds += 0.1;
  console.log(currentTimerSeconds);
  let timerRotation = (currentTimerSeconds / 60) * 360;
  setRotation(timerHand, timerRotation);
}
function setTimer() {
  if (currentTimerSeconds === 0) {
    interval = setInterval(addSecond, 100);
    popup1.style.display = "none";
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

/* Timers */
setInterval(setClock, 1000);

/* Event Listeners */
timerButton.addEventListener("click", setTimer);
