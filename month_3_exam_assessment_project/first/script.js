let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;
let timer = null;
let isRunning = false;
let lapCounter = 1;
let lastlapTotalMs = 0;

// Update display
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds.toString().padStart(3, "0");
  document.getElementById("display").innerText = `${h}:${m}:${s}.${ms}`;
}

//convert current stopwatch time to total milliseconds
function getElapsedMilliseconds() {
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
}

//format milliseconds to hh:mm:ss.SSS
function formatTime(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  let milli = ms % 1000;
  return (
    (h < 10 ? "0" + h : h) +
    ":" +
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s) +
    "." +
    milli.toString().padStart(3, "0")
  );
}

// Start timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById("status").innerText = "RUNNING";
    timer = setInterval(() => {
      milliseconds += 10;
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10); // update every 10ms
  }
}

// Stop timer
function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("status").innerText = "STOPPED";
  }
}

// Reset timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  hours = minutes = seconds = milliseconds = 0;
  lapCounter = 1;
  lastlapTotalMs = 0;
  document.getElementById("laps").innerHTML = "";
  updateDisplay();
  document.getElementById("status").innerText = "CLEAR";
}

function lapTime() {
  if (isRunning) {
    let currentTotalMs = getElapsedMilliseconds();
    let LapMs = currentTotalMs - lastlapTotalMs;
    lastlapTotalMs = currentTotalMs;
    let li = document.createElement("li");
    li.innerText = `Lap ${lapCounter++}: ${formatTime(LapMs)}`;
    document
      .getElementById("laps")
      .insertBefore(li, document.getElementById("laps").firstChild);
  }
}

// // Lap function
// function recordLap() {
//   if (isRunning) {
//     let lapTime = document.getElementById("display").innerText;
//     let li = document.createElement("li");
//     li.innerText = `Lap ${lapCounter++}: ${lapTime}`;
//     document.getElementById("laps").insertBefore(li);
//   }
// }

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// Events
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", lapTime);
document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

// Initialize
updateDisplay();

// let hours = 0,
//   minutes = 0,
//   seconds = 0,
//   milliseconds = 0;
// let timer = null;
// let isRunning = false;
// let lapCounter = 1;

// // 🟨 Keep track of the last lap total time
// let lastLapTotalMs = 0;

// // Update display
// function updateDisplay() {
//   let h = hours < 10 ? "0" + hours : hours;
//   let m = minutes < 10 ? "0" + minutes : minutes;
//   let s = seconds < 10 ? "0" + seconds : seconds;
//   let ms = milliseconds.toString().padStart(3, "0");
//   document.getElementById("display").innerText = `${h}:${m}:${s}.${ms}`;
// }

// // Convert current stopwatch time → total milliseconds
// function getTotalMilliseconds() {
//   return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
// }

// // Format milliseconds nicely as 00:00:00.000
// function formatTime(totalMs) {
//   let h = Math.floor(totalMs / 3600000);
//   let m = Math.floor((totalMs % 3600000) / 60000);
//   let s = Math.floor((totalMs % 60000) / 1000);
//   let ms = totalMs % 1000;
//   return (
//     (h < 10 ? "0" + h : h) +
//     ":" +
//     (m < 10 ? "0" + m : m) +
//     ":" +
//     (s < 10 ? "0" + s : s) +
//     "." +
//     ms.toString().padStart(3, "0")
//   );
// }

// // Start timer
// function startTimer() {
//   if (!isRunning) {
//     isRunning = true;
//     document.getElementById("status").innerText = "RUNNING";
//     timer = setInterval(() => {
//       milliseconds += 10;
//       if (milliseconds >= 1000) {
//         milliseconds = 0;
//         seconds++;
//       }
//       if (seconds >= 60) {
//         seconds = 0;
//         minutes++;
//       }
//       if (minutes >= 60) {
//         minutes = 0;
//         hours++;
//       }
//       updateDisplay();
//     }, 10);
//   }
// }

// // Stop timer
// function stopTimer() {
//   if (isRunning) {
//     clearInterval(timer);
//     isRunning = false;
//     document.getElementById("status").innerText = "STOPPED";
//   }
// }

// // Reset timer
// function resetTimer() {
//   clearInterval(timer);
//   isRunning = false;
//   hours = minutes = seconds = milliseconds = 0;
//   lapCounter = 1;
//   lastLapTotalMs = 0; // 🟨 reset lap tracking
//   document.getElementById("laps").innerHTML = "";
//   updateDisplay();
//   document.getElementById("status").innerText = "CLEAR";
// }

// // 🟨 New Lap Logic
// function recordLap() {
//   if (isRunning) {
//     const currentTotal = getTotalMilliseconds();
//     const lapDuration = currentTotal - lastLapTotalMs; // time since last lap
//     lastLapTotalMs = currentTotal; // update for next lap

//     const lapText = `Lap ${lapCounter++}: ${formatTime(
//       lapDuration
//     )} (Total: ${formatTime(currentTotal)})`;

//     const li = document.createElement("li");
//     li.innerText = lapText;
//     document.getElementById("laps").prepend(li); // adds newest lap at top
//   }
// }

// // Toggle theme
// function toggleTheme() {
//   document.body.classList.toggle("dark");
//   document.body.classList.toggle("light");
// }

// // Events
// document.getElementById("start").addEventListener("click", startTimer);
// document.getElementById("stop").addEventListener("click", stopTimer);
// document.getElementById("reset").addEventListener("click", resetTimer);
// document.getElementById("lap").addEventListener("click", recordLap);
// document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

// // Initialize
// updateDisplay();
