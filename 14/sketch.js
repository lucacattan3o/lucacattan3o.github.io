
let fps = 30;
let radius = 0;
let cX, cY;
let xOff, yOff, zOff = 0;
let progress = 0;
let circlePoints = 100;
let noiseScale = 0.01;
let amplitude = 100;

let colors = [
  '#000000',
  '#fca311',
  '#e5e5e5',
  '#ffffff',
];

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
  noiseDetail(1, 0.5);

  radius = width * 0.1;
  amplitude = width * 0.2;
  background(255);
}

function draw() {
  recordSketchPre();
  
  translate(width * 0.5, height * 0.5);
  strokeWeight(1);
  stroke(0, 30);
  noFill();

  // let sec = frameCount / fps * 0.125;
  // radius = width * 0.25 + cos(sec) * 100;
  radius += 0.2;
  amplitude += 0.5;
  zOff += 0.01;

  beginShape();
  for (let i = 0; i < circlePoints; i++) {
    let rad = (1 / circlePoints) * i;

    xOff = cos(rad * TWO_PI) + 2;
    yOff = sin(rad * TWO_PI) + 2;

    let n = noise(xOff, yOff, zOff);
    let tmpRadius = radius + (n * amplitude);

    cX = tmpRadius * cos(rad * TWO_PI);
    cY = tmpRadius * sin(rad * TWO_PI);

    vertex(cX, cY);
  }
  endShape(CLOSE);

  recordSketchPost(15);
}

