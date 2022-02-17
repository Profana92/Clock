const hourHand = document.querySelector("[data-hand-hour]");
const secondHand = document.querySelector("[data-hand-second]");
const minuteHand = document.querySelector("[data-hand-minute]");
const dayHand = document.querySelector("[data-hand-day]");
const timerHand = document.querySelector("[data-hand-timer]");
const timerButton = document.querySelector(".button");
const digitalClock = document.querySelector("[data-hand-digital-clock]");
const popup1 = document.querySelector("[data-popup1]");
const popupX = document.querySelector("[data-popupX]");
const div1 = document.querySelector("[data-div1]");
const div2 = document.querySelector("[data-div2]");
const div3 = document.querySelector("[data-div3]");
const div4 = document.querySelector("[data-div4]");
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
  popupX,
  dateIndicator,
  minuteTimerHand,
  div1,
  div2,
  div3,
  div4
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
    popupX == null ||
    dateIndicator == null ||
    div1 == null ||
    div2 == null ||
    div3 == null ||
    div4 == null ||
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
    popupX,
    div1,
    div2,
    div3,
    div4,
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
    if (currentTimerSecondsPrecision == 1800) {
      console.log("reset");
      currentTimerSecondsPrecision = 0;
      currentTimerSeconds = 0;
      setRotation(minuteTimerHand, 0);
    } else {
      setRotation(minuteTimerHand, (currentTimerSecondsPrecision / 1800) * 180);
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

popupX.addEventListener("click", hide);
function hide() {
  console.log(popup1);
  popup1.classList.add("hidden");
}

popup1.addEventListener("click", () => {
  if (popup1.classList.contains("position1")) {
    popup1.classList.replace("position1", "position2");
    div1.classList.add("hidden");
    div2.classList.remove("hidden");
    popupX.classList.add("hidden");
  } else if (popup1.classList.contains("position2")) {
    popup1.classList.replace("position2", "position3");
    div2.classList.add("hidden");
    div3.classList.remove("hidden");
  } else if (popup1.classList.contains("position3")) {
    popup1.classList.replace("position3", "position4");
    div3.classList.add("hidden");
    div4.classList.remove("hidden");
  } else {
    div1.classList.remove("hidden");
    div4.classList.add("hidden");
    popup1.classList.replace("position4", "position1");
    popupX.classList.remove("hidden");
  }
});
