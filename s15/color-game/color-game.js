//TODO: Implement guesses
//TODO: Implement win
//TODO: Implement easy mode

let ColorGame = (function(){
  let colors,
      squares,
      rgbPicked,
      rgbHeader,
      msgBar,
      isEasy,
      settings;

  /**
   * Functions to generate random numbers for picks and colors
   */
  function randomRgbValue() {
    let min = 0, max = 255;
    return randomValue(min, max);
  }

  function randomPick() {
    let min=0, max=5;
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

  function getSquares(squareClass) {
    return document.querySelectorAll(`.${squareClass}`);
  }

  function getRgbHeader(id) {
    return document.getElementById(id);
  }

  function getMsgBar(id) {
    return document.getElementById(id);
  }

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
   *
   */
  function colorSquares() {
    for (var i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = colors[i];
    }
  }

  function displayPicked() {
    rgbHeader.textContent = rgbPicked;
  }

  function displayMessage(str) {
    msgBar.textContent = str;
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

  /**
   *
   */
  function init(initialSettings) {
    initialSettings = initialSettings || {};
    settings = initialSettings;
    settings.squareClass         = settings.squareClass         || "square";
    settings.numberOfColors      = settings.numberOfColors      || 6;
    settings.rgbHeaderId         = settings.rgbHeaderId         || "rgb";
    settings.msgBarId            = settings.msgBarId            || 'message';
    settings.newGameBtnId        = settings.newGameBtnId        || 'new-game';
    settings.easyBtnId           = settings.easyBtnId           || 'easy';
    settings.hardBtnId           = settings.hardBtnId           || 'hard';
    settings.newGameBtnId        = settings.newGameBtnId        || 'new-game';
    settings.difficultyClassName = settings.difficultyClassName || "selected-difficulty";
    settings.debug               = settings.debug               || true;

    if (settings.debug) console.log("Color Game Initializing");
    if (settings.debug) console.log("> Settings...");
    if (settings.debug) console.log(settings);

    squares = getSquares(settings.squareClass);
    rgbHeader = getRgbHeader(settings.rgbHeaderId);
    msgBar = getMsgBar(settings.msgBarId);
    isEasy = getdifficulty(settings.difficultyClassName);

    attachNewGameListener();
    attachEasyListener();
    attachHardListener();

    newGame();
  }

  function newGame() {
    colors = generateColors(settings.numberOfColors);
    rgbPicked = colors[randomPick()];

    displayPicked();
    colorSquares();
    displayMessage('New Game Started');

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
  }

  init();

  return {
    init,
    newGame,
    changeDifficulty
  };
}());
