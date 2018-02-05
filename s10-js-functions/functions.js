function isEven(number) {
  if (number%2 === 0) return true;

  return false;
}

function factorial(num) {
  if (num < 0) return undefined;
  if (num % 1 !== 0) return undefined;

  if (num === 0) return 1;

  return num * factorial(num - 1);
}

function kebabToSnake(str) {
  return str.split("-").join("_");
}

function kebabToSnake2(str) {
  return str.replace(/-/g, "_");
}
