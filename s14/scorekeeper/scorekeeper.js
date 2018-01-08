let Scorekeeper = (function (){
  /**
   * define local variables.
   */
  let settings;
  let playerOneScore;
  let playerTwoScore;
  let done;

  /**
   * init
   */
  function init(initialSettings) {
    initialSettings = initialSettings || {};
    settings = initialSettings;
    settings.playerOneScoreId    = initialSettings.playerOneScoreId || 'player-1-score';
    settings.playerTwoScoreId    = initialSettings.playerTwoScoreId || 'player-2-score';
    settings.rulesId             = initialSettings.rulesId || 'rules';
    settings.winCondition        = initialSettings.winCondition || 5;
    settings.winConditionInputId = initialSettings.winConditionInputId || 'winning-score';
    settings.playerOneButton     = initialSettings.playerOneButton || 'player-1';
    settings.playerTwoButton     = initialSettings.playerTwoButton || 'player-2';
    settings.resetButton         = initialSettings.resetButton || 'reset';
    settings.winnerStyle         = initialSettings.winnerStyle || 'winner';

    reset();
    addPlayerOneButton();
    addPlayerTwoButton();
    addResetButton();
  }

  /**
   * reset
   */
  function reset() {
    let newWinCondition = parseInt(document.getElementById(settings.winConditionInputId).value);
    if (newWinCondition) settings.winCondition = newWinCondition;

    playerOneScore = 0;
    playerTwoScore = 0;
    done = false;

    document.getElementById(settings.playerOneScoreId).classList.remove(settings.winnerStyle);
    document.getElementById(settings.playerTwoScoreId).classList.remove(settings.winnerStyle);

    updateScoreboard();
    updateRules();
  }

  /**
   * updateScoreboard
   */
  function updateScoreboard() {
    let playerOneScoreboard = document.getElementById(settings.playerOneScoreId);
    let playerTwoScoreboard = document.getElementById(settings.playerTwoScoreId);

    playerOneScoreboard.textContent = playerOneScore;
    playerTwoScoreboard.textContent = playerTwoScore;
  }

  /**
   * updateRules
   */
  function updateRules() {
    let rules = document.getElementById(settings.rulesId);
    rules.textContent = `Playing to ${settings.winCondition}`;
  }

  /**
   * addPlayerOneButton
   */
  function addPlayerOneButton() {
    let playerOneButton = document.getElementById(settings.playerOneButton);

    playerOneButton.addEventListener("click", function(){
      if (!done) {
        playerOneScore += 1;

        updateScoreboard();

        if (playerOneScore === settings.winCondition) {
          done = true;
          finishGame(settings.playerOneScoreId);
        }
      }
    });
  }

  /**
   * addPlayerTwoButton
   */
  function addPlayerTwoButton() {
    let playerTwoButton = document.getElementById(settings.playerTwoButton);

    playerTwoButton.addEventListener("click", function(){
      if (!done) {
        playerTwoScore += 1;

        updateScoreboard();

        if (playerTwoScore === settings.winCondition) {
          done = true;
          finishGame(settings.playerTwoScoreId);
        }
      }
    });
  }

  /**
   * addResetButton: adds reset button listener
   */
  function addResetButton() {
    let resetButton = document.getElementById(settings.resetButton);

    resetButton.addEventListener("click", function(){
      reset();
    });
  }

  /**
   * finishGame:
   * Takes an element id and adds the winnerStyle to it.
   */
  function finishGame(elementId) {
    let element = document.getElementById(elementId);
    element.classList.add(settings.winnerStyle);
  }

  init();

  return {
    init
  };
}());
