let items = 8;
let nLoop = 1;
let x = 0;
let y = 0;
let itemSize = false;
let fps = 60;

let colors = [
  '#000000',
  '#fca311',
  '#e5e5e5',
  '#ffffff',
];

// colors = [
//   // '#000000',
//   // '#780000',
//   '#c1121f',
//   '#fdf0d5',
//   '#003049',
//   '#669bbc',
//   // '#ffffff'
// ];

let itemList = [];

recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
  background(255);
  itemSize = width / items;
  setupItemList();
}

function setupItemList(){
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) { 
      itemList.push({i, j});
    }
  }
}

function draw() {
  recordSketchPre();
  rectMode(CENTER);
  strokeCap(ROUND);

  let item = getRandomItem();
  if (item){
    push();
      translate(itemSize * item.i, itemSize * item.j);
      translate(itemSize * 0.5, itemSize * 0.5);
      drawItem();
    pop();
  } else {
    // noLoop();
    if (frameCount % (fps * 5) == 0){
      background(255,255,255);
      setupItemList();
    }
    // recordSketchSave();
  }

  recordSketchPost(15);
  // recordSketchCapture();
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

function getRandomItem(){
  if (itemList.length > 0){
    let i = Math.floor(random(0, itemList.length));
    let item = itemList[i];
    itemList.splice(i, 1);
    return item;
  } else {
    return false;
  }
}

function randomColor(){
  let i = Math.floor(random(0, colors.length));
  return colors[i];
}


