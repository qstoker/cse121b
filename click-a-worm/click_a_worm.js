const timeOnStart = new Date().getTime();
let timerLength = 59000; // in milliseconds, minus one interval
let secondInterval = 1000;
let holeInterval = 400;
let timerEnded = false;
let score = 0;
let holes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10));

///////* Game Timer *///////

// this timer is called every 1000 milliseconds until timerLength hits 0
let gameDuration = setInterval((x) => {
  if (timerLength >= 0) {
    let { minutes, seconds } = getTimeLeft(timerLength); // calculate minutes and seconds left
    document.querySelector("#timer").innerHTML = minutes + " : " + seconds; // display timer
    timerLength -= 1000; // tick timer closer to stopping
  } else {
    timerEnded = true; // notify the hole timer that the game timer has stopped
    clearInterval(gameDuration); // stop timer
  }
}, secondInterval);

///////* Holes Timer *///////

// multiple times a second:
let holeTimer = setInterval((x) => {
  // loop through each hole
  holes.forEach((value, timerIndex) => {
    let timerSelector = "#hole_" + timerIndex;
    /* while the game timer is running: */ if (!timerEnded) {
      if (value > 0) {
        holes[timerIndex] -= 1; // tick hole's countdown
      } else {
        // change hole to worm or vice versa
        if (document.querySelector(timerSelector).className == "fa-solid fa-circle") {
          changeHole(timerIndex, 4, 1, timerSelector, "fa-solid fa-worm fa-bounce", "#763323");
        } else {
          changeHole(timerIndex, 20, 5, timerSelector, "fa-solid fa-circle", "#1c160b");
        }
      }
    }
    // when the game timer has ended:
    else {
      document.querySelector(timerSelector).setAttribute("class", "fa-solid fa-circle"); // make all worms holes
      document.querySelector(timerSelector).style.color = "#1c160b";
      clearInterval(holeTimer); // stop timer
    }
  });
}, holeInterval);

///////* Click Handling *///////

// hole click listeners:
document.querySelector("#hole_0").addEventListener("click", clickWorm);
document.querySelector("#hole_1").addEventListener("click", clickWorm);
document.querySelector("#hole_2").addEventListener("click", clickWorm);
document.querySelector("#hole_3").addEventListener("click", clickWorm);
document.querySelector("#hole_4").addEventListener("click", clickWorm);
document.querySelector("#hole_5").addEventListener("click", clickWorm);
document.querySelector("#hole_6").addEventListener("click", clickWorm);
document.querySelector("#hole_7").addEventListener("click", clickWorm);
document.querySelector("#hole_8").addEventListener("click", clickWorm);
document.querySelector("#hole_9").addEventListener("click", clickWorm);
document.querySelector("#hole_10").addEventListener("click", clickWorm);
document.querySelector("#hole_11").addEventListener("click", clickWorm);
document.querySelector("#hole_12").addEventListener("click", clickWorm);
document.querySelector("#hole_13").addEventListener("click", clickWorm);
document.querySelector("#hole_14").addEventListener("click", clickWorm);
document.querySelector("#hole_15").addEventListener("click", clickWorm);
// bird click listener:
document.querySelector("#bird").addEventListener("click", clickBird);

// when a hole is clicked: if it's a worm, set it to a hole for a random amount of time
// and increase the score and game speed
function clickWorm() {
  let clickIndex = this.id.replace(/\D/g, "");
  let clickSelector = "#" + this.id;

  if (document.querySelector(clickSelector).className == "fa-solid fa-worm fa-bounce") {
    changeHole(clickIndex, 15, 5, clickSelector, "fa-solid fa-circle", "#1c160b");
    updateScoreAndSpeed(1, 2);
  }
}

// when a bird is clicked, make it invisible and increase the score and game speed
function clickBird() {
  document.querySelector("#bird").style.visibility = "hidden";
  updateScoreAndSpeed(20, 10);
}

///////* General Functions *///////

function getTimeLeft(remainingTime) {
  // calculate minutes and seconds from milliseconds
  let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  // prefix a zero to single digit numbers (e.g. '7' -> '07')
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return { minutes, seconds };
}

function changeHole(holeIndex, newTimeChance, newTimeMin, selector, className, color) {
  // time until next change
  holes[holeIndex] = Math.floor(Math.random() * newTimeChance + newTimeMin);
  // change icon and color
  document.querySelector(selector).setAttribute("class", className);
  document.querySelector(selector).style.color = color;
}

function updateScoreAndSpeed(points, speed) {
  // update score
  score += points;
  document.querySelector("#score").innerHTML = score;
  // increase speed
  if (holeInterval > 150) {
    holeInterval -= speed;
  }
}
