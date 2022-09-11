let items = 8;
let x = 0;
let y = 0;
let itemSize = false;

let colors = [
  '#000000',
  // '#14213d',
  '#fca311',
  '#e5e5e5',
  '#ffffff',
];

recordSketch(true);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(15);
  background(255);
  itemSize = width / items;
}

function draw() {
  recordSketchPre();
  rectMode(CENTER);
  strokeCap(ROUND);

  if (x < items){
    push();
      translate(itemSize * x, itemSize * y);
      translate(itemSize * 0.5, itemSize * 0.5);
      drawItem();
    pop();
    x++;
  } else {
    x = 0;
    y++;
  }

  if (y >= items){
    noLoop();
    recordSketchSave();
  }
  recordSketchCapture();
}

function drawItem(){
  noStroke();
  let bColor = randomColor();
  fill(bColor);
  rect(0, 0, itemSize, itemSize);

  let cColor = randomColor();
  fill(cColor);
  arc(0, 0, itemSize * 0.7, itemSize * 0.7, 0, TWO_PI);
  // translate(itemSize * 0.25 * random(-1, 1), itemSize * 0.25 * random(-1, 1));
  // arc(0, 0, itemSize * 0.2, itemSize * 0.2, 0, TWO_PI);
}

function randomColor(){
  let i = Math.floor(random(0, colors.length));
  return colors[i];
}


