let fps = 30;
let itemSize;
let cI = 0;

let colors = [
  "#9b5de5",
  "#f15bb5",
  "#fee440",
  "#00bbf9",
  "#00f5d4"
];

// parameters
// hue start
// hue end
// speed of all parameters

let hue;

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
  background(0, 3);
  
  bx = getLoopBounce(0.5 * 0.5);
  by = getLoopBounce(0.25 * 0.5);
  
  br = getLoopBounce(0.5, 0.5);


  bh = getLoopBounce(0.5 * 0.5 * 0.5);

  // nice
  hue = map(bh, -1, 1, 180, 300, true);
  // with yellow
  hue = map(bh, -1, 1, 360 + 60, 300, true);
  hue = hue % 360;

  or = itemSize * 0.2 * br;
  
  x = width  * 0.2 * bx;
  y = height * 0.3 * by;
  
  push();
    translate(width * 0.5, height * 0.5);
    noFill();  
    colorMode(HSB, 360, 100, 100);
    stroke(hue, 100, 100);
    strokeWeight(itemSize * 0.005);
    circle(x, y, itemSize + or);
  pop();
  
  
  let sec = frameCount / fps;
  if (sec % 4 == 0){
    cI++;
    if (cI >= colors.length){
      cI = 0;
    }
  }

  if (sec % 1 == 0){
    // console.debug(sec);
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 16 * fps){
    sketchExportEnd();
  }
}
