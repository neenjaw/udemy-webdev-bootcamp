let colors = [
  "rgb(255, 0, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 0, 255)",
  "rgb(255, 0, 255)",
  "rgb(255, 255, 0)",
  "rgb(0, 255, 255)"
];

let squares = document.querySelectorAll(".square");

for (var i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
}

let rgbPicked = colors[2];
let rgb = document.getElementById('rgb');
rgb.textContent = rgbPicked;
