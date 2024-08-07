let items = 9;
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

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(15);
  sketchExportSetup({
    fps: 15,
  });
  background(255);
  itemSize = width / items;
}

function draw() {
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

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (y >= items){
    x = 0;
    y = 0;
    nLoop--;
    if (!nLoop){
      sketchExportEnd();
      noLoop();
    }
  }
}

function drawItem(){
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


