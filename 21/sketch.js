let fps = 60;
let itemSize;
let cI = 0;

let colors = [
  "#9b5de5",
  "#f15bb5",
  "#fee440",
  "#00bbf9",
  "#00f5d4"
];

function setup() {
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });
  background(0);
  itemSize = width * 0.5;
}

function draw() {

  background(0, 1);
  
  bx = getLoopBounce(0.5);
  by = getLoopBounce(0.25);
  
  br = getLoopBounce(1, 0.5);
  or = itemSize * 0.2 * br;
  
  x = width  * 0.2 * bx;
  y = height * 0.3 * by;
  
  push();
    translate(width * 0.5, height * 0.5);
    noFill();  
    stroke(colors[cI]);
    strokeWeight(itemSize * 0.005);
    circle(x, y, itemSize + or);
  pop();
  
  
  let sec = frameCount / fps;
  if (sec % 4 == 0){
    cI++;
    if (cI > colors.length){
      cI = 0;
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
