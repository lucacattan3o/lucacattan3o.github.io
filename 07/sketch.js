let items = 8;
let nLoop = 1;
let x = 0;
let y = 0;
let itemSize = false;

let colors = [
  '#000000',
  '#fca311',
  '#e5e5e5',
  '#ffffff',
];

recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(15);
  recordSketchSetFps(15);
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
    x = 0;
    y = 0;
    nLoop--;
    if (!nLoop){
      noLoop();
      recordSketchSave();
    }
  }
  recordSketchCapture();
}

function drawItem(){
  noStroke();
  let shuffledColors = shuffle(colors);

  fill(shuffledColors[0]);
  rect(0, 0, itemSize, itemSize);

  fill(shuffledColors[1]);

  let rX = random(0, 1);
  if (rX >= 0.5){ rX = -1; } else { rX = 1; }

  let rY= random(0, 1);
  if (rY>= 0.5){ rY= -1; } else { rY= 1; }

  push();
    translate(rX * itemSize * 0.5, rY * itemSize * 0.5);

    if (rX == -1){
      if (rY == 1){
        rotate(-PI * 0.5);
      }
    } else {
      if (rY == 1){
        rotate(PI);
      } else {
        rotate(PI * 0.5);
      }
    }   
    arc(0, 0, itemSize * 2, itemSize * 2, 0, PI * 0.5); 
  pop();
}

function drawItemB(){
  noStroke();

  fill(randomColor());
  rect(0, 0, itemSize, itemSize);

  fill(randomColor());
  arc(0, 0, itemSize * 0.7, itemSize * 0.7, 0, TWO_PI);
}

function randomColor(){
  let i = Math.floor(random(0, colors.length));
  return colors[i];
}


