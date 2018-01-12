let Tapapat = (function(){
  let settings;

  function randomRgbColor() {
    return makeRgbString(randomRgbValue(), randomRgbValue(), randomRgbValue());
  }

  function makeRgbString(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  function randomRgbValue() {
    let min = 0, max = 255;
    return randomValue(min, max);
  }

  function randomValue(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function init(initialSettings) {
    //catching bad input data
    initialSettings = initialSettings || {};
    settings = initialSettings;

    //setting the initial settings, if not defined in object in arguments
    settings.debug = settings.debug  || true;

    //debug console messaging
    if (settings.debug) console.log("Tapapat Initializing");
  }

  return {
    init
  };

}());
