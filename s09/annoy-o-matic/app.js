let there = false;

while (!there) {
  let answer = prompt("Are we there yet?");
  if (
    answer.indexOf("yes") >= 0 ||
    answer.indexOf("ya") >= 0 || 
    answer.indexOf("Yeah") >= 0
  ) {
    there = true;
  }
}

alert("Yay! We've arrived!");
