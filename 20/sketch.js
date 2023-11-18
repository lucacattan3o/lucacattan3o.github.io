let fps = 60;

let itemsX = 3;
let itemsY = 3;

let itemSize;

let colors = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
  '#ffffff',
];

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });
  // noLoop();
}

function draw() {

  let mPos = responsiveMousePos();

  if (mPos.x !== 0 && mPos.y !== 0){
    itemsX = map(mPos.x, 0, width,  2, 20, true);
    itemsY = map(mPos.y, 0, height, 2, 20, true);
  }

  itemSizeX = width / itemsX;
  itemSizeY = height / itemsY;

  background(0);
  noStroke();

  // textFont('monospace');
  // textSize(itemSize * 1.1);
  // textAlign(CENTER, CENTER);

  let x = 0;
  let y = 0;

  for (let i = 0; i < itemsX; i++) {

    let itemSizeH = itemSizeX + (getLoopBounce(0.5 * 0.5, i / itemsX) * itemSizeX * 0.5);

    for (let j = 0; j < itemsY; j++) {
      push();
      translate(x, y);

      let itemSizeV = itemSizeY + (getLoopBounce(0.5 * 0.5, j / itemsY) * itemSizeY * 0.5);
        
      // Grid
      strokeWeight(2);
      stroke(250);
      if (i % 2 == 1){
        if (j % 2 == 1){
          fill(colors[0]);
        } else {
          fill(colors[2]);
        }
      } else {
        if (j % 2 == 1){
          fill(colors[2]);
        } else {
          fill(colors[0]);
        }
      }
      rect(0, 0, itemSizeH, itemSizeV);
      
      pop();

      y += itemSizeV;
      if (j >= itemsY - 1){
        y = 0;
      }
    }

    x += itemSizeH;
    if (i >= itemsX - 1) {
      x = 0;
    }    
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
}