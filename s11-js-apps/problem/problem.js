let Problem = (function(){
  function printReverse(array) {
    for (let i = (array.length - 1); i >= 0; i -= 1) {
      console.log(array[i]);
    }
  }

  function isUniform(array) {
    let result = true;
    let lastValue = null;

    for (let i = 0, iCnt = array.length; i < iCnt; i += 1) {
      if (i === 0) {
        lastValue = array[i];
      } else {
        if (array[i] !== lastValue) {
          result = false;
          break;
        }
      }
    }

    return result;
  }

  function sumArray(array) {
    let sum = 0;

    for (let i = 0, iCnt = array.length; i < iCnt; i++) {
      sum += array[i];
    }

    return sum;
  }

  function max(array) {
    let max = null;

    for (var i = 0; i < array.length; i++) {
      if (i === 0) {
        max = array[i];
      } else if (array[i] > max) {
        max = array[i];
      }
    }

    return max;
  }

  function myForEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
      let result = fn(array[i]);
      if (result) {
        array[i] = result;
      }
    }
  }

  function additionalForEach(fn) {
    for (var i = 0; i < this.length; i++) {
      let result = fn(this[i]);
      if (result) {
        this[i] = result;
      }
    }
  }

  function init() {
    Array.prototype.additionalForEach = additionalForEach;
  }

  return {
    printReverse,
    isUniform,
    sumArray,
    max,
    myForEach,
    init
  };
}());
