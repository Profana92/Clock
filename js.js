/* Readme 
  The file is divided into following chapters:
  1.  Global variables, elements - Lines 9-25
  2.  Variables assignment tests - Lines 26 - 86
  3.  Main Functions - Lines 87-126
  4.  Helper Functions - Lines 127-144
  5.  Timers - Lines 145-147
  6.  Event Listeners - Lines 148 182 */
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

/* Main Functions */
function setClock() {
  let currentDate = new Date();
  let currentDayOfTheMonth = currentDate.getDate();
  let currentHour = currentDate.getHours();
  let currentMinute = (currentDate.getMinutes() / 60) * 360;
  let currentSecond = (currentDate.getSeconds() / 60) * 360;
  let dayRotation =
    (currentDate.getDay() / 7) * 360 + (currentHour / 24) * 51.42857142857142;
  let currentHourRotation =
    (((currentHour + 24) % 12) / 12) * 360 + (currentMinute / 360) * 30;
  setRotation(minuteHand, currentMinute);
  setRotation(secondHand, currentSecond);
  setRotation(dayHand, dayRotation);
  setRotation(hourHand, currentHourRotation);
  setDigitalClock(digitalClock);
  setDateIndicator(currentDayOfTheMonth);
}

function setRotation(element, rotation) {
  element.style.setProperty("--rotation", rotation);
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
  dateIndicator.innerText = `${
    currentDayOfTheMonth < 10 ? "0" : ""
  }${currentDayOfTheMonth}
  `;
}

/* Helper Functions */
function addSecond() {
  currentTimerSeconds += 0.1;
  let timerRotation = (currentTimerSeconds / 60) * 360;
  setRotation(timerHand, timerRotation);
  let currentTimerSecondsPrecision = currentTimerSeconds.toPrecision(4);
  if (currentTimerSecondsPrecision % 1 === 0);
  {
    if (currentTimerSecondsPrecision == 1800) {
      currentTimerSecondsPrecision = 0;
      currentTimerSeconds = 0;
      setRotation(minuteTimerHand, 0);
    } else {
      setRotation(minuteTimerHand, (currentTimerSecondsPrecision / 1800) * 180);
    }
  }
}

/* Timers */
setInterval(setClock, 100);

/* Event Listeners */
timerButton.addEventListener("click", () => {
  if (currentTimerSeconds === 0) {
    interval = setInterval(addSecond, 100);
  } else {
    clearInterval(interval);
    currentTimerSeconds = 0;
  }
});

popupX.addEventListener("click", () => {
  popup1.classList.add("hidden");
});

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
