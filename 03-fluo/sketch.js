let items = 31;
let fps = 8;

let colors = [
  [245, 255, 78 ],
  [246, 255, 123],
  [255, 111, 211],
  [255, 187, 235],
  [255, 140, 221],
  [255, 206, 113],
  [255, 157, 118],
  [255, 129, 119],
  [163, 248, 123],
  [0,   213, 134],
  [208, 255, 114],
  [0,   196, 139],
  [207, 107, 208],
  [140, 107, 205],
  [99,  103, 202],
  [90,  111, 207],
  [144, 220, 249],
  [29,  199, 242],
];

let bgColorStart = colors[2];
let bgColorEnd   = colors[14];

let itemColorStart = colors[0];
let itemColorEnd   = colors[8];

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });
  background(0);
}

function draw() {
  // Animated background
  let bc = getColorBounce();
  let c = lerpColor(color(bgColorStart), color(bgColorEnd), bc);
  background(c);
  
  drawGrid();

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 4 * fps){
    sketchExportEnd();
  }
}

function getColorBounce(){
  let b = getLoopBounce(0.25, 0);
  return (b + 1) * 0.5;
}

function drawGrid(){
  const padding = width * 0.125 / items;
  const paddingTot = padding * (items + 1);
  const itemSize = (width - paddingTot) / items;

  rectMode(CENTER);
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = (itemSize + padding) * i + padding;
      let y = (itemSize + padding) * j + padding;
      
      // Go to the center of the item
      x = x + itemSize * 0.5;
      y = y + itemSize * 0.5;

      // Calculate di angle / multiple of framerate
      let angle = frameCount / 30 * 1;

      // Add some angle offset based on the position
      // Calculate the distance with the center of the sketch
      let d = Math.abs(dist(x, y, width * 0.5, height * 0.5));
      // Map it to the number of items
      let offset = map(d, 0, width, 0, 1);
      
      // Bounce with offset
      let bounce = getLoopBounce(0.5, offset * -1);
      // Mapped to 0 - 1
      let b = (bounce + 1) * 0.5;
  
      // Color transition
      let bc = getColorBounce();
      let c = lerpColor(color(itemColorStart), color(itemColorEnd), bc);

      push();
        translate(x, y);
        fill(c);
        noStroke();
        rectMode(CENTER); 
        rect(0, 0, itemSize * b);
      pop();
    }
  }
}

// ** OLD **
// ---------

function gridBlack(itemSize){
  fill(255);
  noStroke();
  rect(0, 0, itemSize);
}

function gridOne(itemSize, bounce){
  push();
    scale(bounce);
    noStroke();
    fill(colors[0]);
    rect(0, 0, itemSize);
  pop();

  // noFill();
  // stroke(colors[8]);
  // // scale(1 - bounce);
  // strokeWeight(itemSize * 0.05);
  // rect(0, 0, itemSize * (1 - bounce));
}

function gridTwo(itemSize, bounce){
  push();
    noFill();  
    stroke(colors[2]);
    // stroke(255)
    strokeWeight(itemSize * 0.05);
    rect(0, 0, itemSize * 2 * bounce);
  pop();
}


