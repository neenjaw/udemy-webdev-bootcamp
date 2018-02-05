console.log(`Print all numbers between -10 and 19`);
for (let i = -10, iCnt = 19; i <= iCnt; i += 1) {
  console.log(i);
}

console.log("Print all even numbers between 10 and 40");
for (let i = 10, iCnt = 40; i <= iCnt; i += 2) {
  console.log(i);
}

console.log("Print all odd between 300 and 333");
for (let i = 300, iCnt = 333; i <= iCnt; i += 1) {
  if (i%2) {
    console.log(i);
  }
}

console.log("Print all numbers divisible by 5 and 3 AND between 5 and 50");
for (let i = 5, iCnt = 50; i <= iCnt; i += 1) {
  if ((i%5 === 0) && (i%3 === 0)) {
    console.log(i);
  }
}
