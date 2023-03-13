let fps = 30;

let items = 10;

let capture;
let backgroundPixels = null;

function setup() {
  createCanvas(1080, 1080, WEBGL);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
}

function draw() {
  recordSketchPre();

  recordSketchPost(8);
}
