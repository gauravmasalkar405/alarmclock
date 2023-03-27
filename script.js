const d = new Date();
let hour = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();
let session = "AM";
let sound = new Audio("alarm_01.mp3");

let hr = document.getElementById("hour");
let min = document.getElementById("minute");
let sc = document.getElementById("second");
let sess = document.getElementById("session");

let btn = document.getElementById("set-alarm");

let alarms = [];
let minuteInput;
let hourInput;
let sessionInput;

// getting values of alarm
btn.addEventListener("click", () => {
  minuteInput = document.getElementById("minute-input").value;
  hourInput = document.getElementById("hour-input").value;
  sessionInput = document.getElementById("session-input").value;

  // giving alert if user has not entered any values
  if (minuteInput == "" || hourInput == "") {
    alert("This is not a valid alarm");
  } else {
    // create new alarm div
    let newAlarm = document.createElement("div");
    newAlarm.classList.add("Alarm-list");

    // add alarm time span
    let alarmTime = document.createElement("p");
    alarmTime.classList.add("alarm");

    let hourSpan = document.createElement("span");
    hourSpan.textContent = hourInput;

    let colonSpan1 = document.createElement("span");
    colonSpan1.textContent = ":";

    let minuteSpan = document.createElement("span");
    minuteSpan.textContent = minuteInput;

    let colonSpan2 = document.createElement("span");
    colonSpan2.textContent = ":";

    let sessionSpan = document.createElement("span");
    sessionSpan.textContent = sessionInput;

    alarmTime.appendChild(hourSpan);
    alarmTime.appendChild(colonSpan1);
    alarmTime.appendChild(minuteSpan);
    alarmTime.appendChild(colonSpan2);
    alarmTime.appendChild(sessionSpan);

    //new alarm will be created everytime when set alarm button is clicked
    let alarm = {
      hour: hourInput,
      minute: minuteInput,
      session: sessionInput,
      element: newAlarm,
    };

    alarms.push(alarm);

    // add delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    //it will remove alarm when we click delete button
    deleteButton.addEventListener("click", () => {
      // Remove the alarm from the alarms array
      alarms.splice(alarms.indexOf(alarm), 1);
      newAlarm.remove();
    });

    // append time and button to new alarm div
    newAlarm.appendChild(alarmTime);
    newAlarm.appendChild(deleteButton);

    // append new alarm div to main container
    let mainContainer = document.querySelector(".main-container");
    mainContainer.insertBefore(newAlarm, btn.parentNode.nextSibling);
  }
});

//setting up clock
function timer() {
  seconds++;
  if (seconds > 59) {
    seconds = 0;
    minutes++;
  }
  if (minutes > 59) {
    minutes = 0;
    hour++;
  }

  if (hour > 12) {
    hour = hour - 12;
    session = "PM";
  }

  document.getElementById("session").textContent = session;

  let hrString = hour;
  let minString = minutes;
  let secString = seconds;

  if (hour < 10) {
    hrString = "0" + hrString;
  }
  if (minutes < 10) {
    minString = "0" + minString;
  }
  if (seconds < 10) {
    secString = "0" + secString;
  }

  hr.textContent = hrString;
  min.textContent = minString;
  sc.textContent = secString;

  // ======================SETTING ALARM================

  // Check for alarms to ring

  function checkAlarms() {
    for (let i = 0; i < alarms.length; i++) {
      let alarm = alarms[i];
      if (
        alarm.hour == hour &&
        alarm.minute == minutes &&
        alarm.session == session
      ) {
        sound.play();
        // Remove the alarm element from the DOM
        alarm.element.remove();
        // Remove the alarm from the alarms array
        alarms.splice(i, 1);
        i--;
      }
    }
  }

  // Call the checkAlarms function every second

  setInterval(checkAlarms, 1000);

  setTimeout(timer, 1000);
}

timer();
