let ColorGame = (function(){
  let colors,
      squares,
      rgbPicked,
      rgbHeader,
      msgBar,
      isEasy,
      isWon,
      settings;

  /**
   * Functions to generate random numbers for picks and colors
   */
  function randomRgbValue() {
    let min = 0, max = 255;
    return randomValue(min, max);
  }

  function randomPick() {
    let min, max;

    if (isEasy) {
      min = 0; max = 2;
    } else {
      min = 0; max = 5;
    }

    return randomValue(min, max);
  }

  function randomValue(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  /**
   * function to make a standard rgb string
   */
  function makeRgbString(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Generate rgb colors in the css rgb color format rgb(r, g, b)
   * Will generate an array of 6 if no argument is supplied.
   */
  function generateColors(num) {
    if (num < 1) {
      return undefined;
    }

    let colorArray = [];

    for (var i = 0; i < num; i++) {
      let r = randomRgbValue(),
          g = randomRgbValue(),
          b = randomRgbValue();

      colorArray[i] = makeRgbString(r, g, b);
    }

    return colorArray;
  }

  /**
   * Get the elements that possess the .square class
   */
  function getSquares(squareClass) {
    return document.querySelectorAll(`.${squareClass}`);
  }

  /**
   * get the element that has the rgbHeaderId
   */
  function getRgbHeader(id) {
    return document.getElementById(id);
  }

  /**
   * Get the element that has the msgBarId
   */
  function getMsgBar(id) {
    return document.getElementById(id);
  }

  /**
   * get the difficulty from the element marked by the .selected-difficulty class
   */
  function getdifficulty(className) {
    let text = document.getElementsByClassName(className)[0].textContent.toLowerCase();
    let easy;

    if (text === "easy") {
      easy = true;
    } else {
      easy = false;
    }

    return easy;
  }

  /**
   * reset to page defaults
   */
  function reset() {
    document.querySelector(".top-bar").style.backgroundColor = settings.pageColors.top;
    document.getElementById(settings.newGameBtnId).textContent = "New Colors";
  }

  /**
   * color all the square elements with the colors stored in the colors array
   */
  function colorSquares() {
    for (var i = 0; i < squares.length; i++) {
      if (isEasy && i >= 3) {
        squares[i].style.backgroundColor = "";
      } else {
        squares[i].style.backgroundColor = colors[i];
      }
    }
  }

  /**
   * print the rgbPicked code into the rgbHeader
   */
  function displayPicked() {
    rgbHeader.textContent = rgbPicked;
  }

  /**
   * Display a string in the message element
   */
  function displayMessage(str) {
    msgBar.textContent = str;
  }

  /**
   * win the game
   */
  function winGame() {
    isWon = true;

    displayMessage("Correct!");

    //change the top bar's backgroundColor to the rgbPicked value
    document.querySelector(".top-bar").style.backgroundColor = rgbPicked;

    document.getElementById(settings.newGameBtnId).textContent = "Play again?";

    //change all the squares to the rgbPicked color
    for (var i = 0; i < colors.length; i++) {
      colors[i] = rgbPicked;
    }

    colorSquares();
  }

  /**
   *
   */
  function attachNewGameListener() {
    document.getElementById(settings.newGameBtnId).addEventListener("click", function() {
      newGame();
    });
  }

  function attachEasyListener() {
    document.getElementById(settings.easyBtnId).addEventListener("click", function() {
      if (settings.debug) console.log("> Easy button clicked");

      if (!this.classList.contains('selected-difficulty')) {
        if (settings.debug) console.log("> Changing difficulty to easy");

        changeDifficulty("easy");
      }
    });
  }

  function attachHardListener() {
    document.getElementById(settings.hardBtnId).addEventListener("click", function() {
      if (settings.debug) console.log("> Hard button clicked");

      if (!this.classList.contains('selected-difficulty')) {
        if (settings.debug) console.log("> Changing difficulty to hard");

        changeDifficulty("hard");
      }
    });
  }

  function attachSquareListener() {
    for (var i = 0; i < squares.length; i++) {
      squares[i].addEventListener("click", function() {
        if (!isWon) {
          if (this.style.backgroundColor === rgbPicked) {
            winGame();
          } else {
            displayMessage("Try again!");
            this.style.backgroundColor = "";
          }
        }
      });
    }
  }

  /**
   *
   */
  function init(initialSettings) {
    //catching bad input data
    initialSettings = initialSettings || {};
    settings = initialSettings;

    //setting the initial settings, if not defined in object in arguments
    settings.numberOfColors      = settings.numberOfColors      || 6;
    settings.squareClass         = settings.squareClass         || "square";
    settings.difficultyClassName = settings.difficultyClassName || "selected-difficulty";
    settings.rgbHeaderId         = settings.rgbHeaderId         || "rgb";
    settings.msgBarId            = settings.msgBarId            || 'message';
    settings.newGameBtnId        = settings.newGameBtnId        || 'new-game';
    settings.easyBtnId           = settings.easyBtnId           || 'easy';
    settings.hardBtnId           = settings.hardBtnId           || 'hard';
    settings.newGameBtnId        = settings.newGameBtnId        || 'new-game';

    settings.pageColors          = settings.pageColors          || {};
    settings.pageColors.top      = settings.pageColors.top      || "rgb(70, 125, 218)";
    settings.pageColors.body     = settings.pageColors.body     || "rgb(38, 38, 38)";

    settings.debug               = settings.debug               || true;

    //debug console messaging
    if (settings.debug) console.log("Color Game Initializing");
    if (settings.debug) console.log("> Settings...");
    if (settings.debug) console.log(settings);

    //set initial values
    squares = getSquares(settings.squareClass);
    rgbHeader = getRgbHeader(settings.rgbHeaderId);
    msgBar = getMsgBar(settings.msgBarId);
    isEasy = getdifficulty(settings.difficultyClassName);

    if (settings.debug) console.log("> Initial Values...");
    if (settings.debug) console.log(">> squares: ", squares);
    if (settings.debug) console.log(">> rgbHeader: ", rgbHeader);
    if (settings.debug) console.log(">> msgBar: ", msgBar);
    if (settings.debug) console.log(">> isEasy: ", isEasy);

    //attach all the listeners
    attachNewGameListener();
    attachEasyListener();
    attachHardListener();
    attachSquareListener();

    //ready to go, start a game.
    newGame();
  }

  function newGame() {
    isWon = false;
    colors = generateColors(settings.numberOfColors);
    rgbPicked = colors[randomPick()];

    reset();
    displayPicked();
    colorSquares();

    if (settings.debug) console.log("New Game Started");
  }

  function changeDifficulty(difficulty) {
    if (difficulty === "easy") {
      isEasy = true;
      document.getElementById(settings.easyBtnId).classList.add(settings.difficultyClassName);
      document.getElementById(settings.hardBtnId).classList.remove(settings.difficultyClassName);
    } else if (difficulty === "hard") {
      isEasy = false;
      document.getElementById(settings.hardBtnId).classList.add(settings.difficultyClassName);
      document.getElementById(settings.easyBtnId).classList.remove(settings.difficultyClassName);
    }

    //start a new game with the new difficulty setting
    newGame();
  }

  init();

  return {
    init,
    newGame,
    changeDifficulty
  };
}());
