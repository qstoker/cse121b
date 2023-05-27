////////////* Global Code *////////////

const timeOnStart = new Date().getTime();
let gameLength = 59000; // in milliseconds, minus one interval
let secondInterval = 1000;
let holeInterval = 400;
let birdAppearanceInterval = Math.floor(Math.random() * 10000 + 10000);
let birdStayInterval = Math.floor(Math.random() * 100 + 900);
let score = 0;
let holes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 20 + 3));

// enable clicking (including start button)
addClickListeners();

////////////* Functions *////////////

/******** Timers ********/

function gameTimer() {
  if (gameLength >= 0) {
    let { minutes, seconds } = getTimeLeft(gameLength); // calculate minutes and seconds left
    document.querySelector("#timer").innerHTML = minutes + " : " + seconds; // display timer
    gameLength -= 1000; // tick timer closer to stopping
    setTimeout(gameTimer, secondInterval);
  }
}

function holeTimer() {
  // loop through each hole
  holes.forEach((value, timerIndex) => {
    let timerSelector = "#hole_" + timerIndex;
    if (gameLength >= 0) {
      // while the game timer is running:
      if (value > 0) {
        holes[timerIndex] -= 1; // tick hole's countdown
      } else {
        // change hole to worm or vice versa
        if (document.querySelector(timerSelector).className == "fa-solid fa-circle") {
          changeHole(timerIndex, 8, 2, timerSelector, "fa-solid fa-worm fa-bounce", "#763323"); // circle to worm
        } else {
          changeHole(timerIndex, 40, 10, timerSelector, "fa-solid fa-circle", "#1c160b"); // worm to circle
        }
      }
    } else {
      // on the last run of the timer:
      document.querySelector(timerSelector).setAttribute("class", "fa-solid fa-circle"); // make all worms holes
      document.querySelector(timerSelector).style.color = "#1c160b";
      document.querySelector("#start-banner").style.visibility = "visible";
    }
  });
  // restart timer if game is still going
  if (gameLength >= 0) {
    setTimeout(holeTimer, holeInterval);
  }
}

function birdAppearanceTimer() {
  if (gameLength >= 0) {
    let birdHeight = Math.floor(Math.random() * (window.innerHeight - 480) + 50); // random number in range
    birdHeight = birdHeight.toString() + "px"; // convert to string

    document.querySelector("#bird").style.bottom = birdHeight;
    document.querySelector("#bird").style.visibility = "visible";

    setTimeout(birdStayTimer, birdStayInterval);
  }
}

function birdStayTimer() {
  if (document.querySelector("#bird").style.visibility == "visible") {
    document.querySelector("#bird").style.visibility = "hidden";
    if (score > 10) {
      updateScoreAndSpeed(-10, 10);
    } else {
      updateScoreAndSpeed(-score, 10);
    }
  }
  setTimeout(birdAppearanceTimer, birdAppearanceInterval);
}

/******** Reused ********/

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
  if (holeInterval > 100) {
    holeInterval -= speed;
  }
}

/******** Clicking ********/

function clickStart() {
  gameLength = 59000;
  holeInterval = 400;
  updateScoreAndSpeed(-score, 0);
  document.querySelector("#start-banner").style.visibility = "hidden"; // hide start banner
  // start the timers (they repeat until gameLength hits 0)
  setTimeout(gameTimer, secondInterval);
  setTimeout(holeTimer, holeInterval);
  setTimeout(birdAppearanceTimer, birdAppearanceInterval);
}

// when a hole is clicked: if it's a worm, set it to a hole for a random amount of time
// and increase the score and game speed
function clickWorm() {
  let clickIndex = this.id.replace(/\D/g, "");
  let clickSelector = "#" + this.id;

  if (document.querySelector(clickSelector).className == "fa-solid fa-worm fa-bounce") {
    changeHole(clickIndex, 15, 5, clickSelector, "fa-solid fa-circle", "#1c160b");
    updateScoreAndSpeed(1, 3);
  }
  // console.log(holeInterval); //
}

// when a bird is clicked, make it invisible and increase the score and game speed
function clickBird() {
  document.querySelector("#bird").style.visibility = "hidden";
  updateScoreAndSpeed(10, 0);
}

function addClickListeners() {
  // start button click listener:
  document.querySelector("#start-button").addEventListener("click", clickStart);
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
}
