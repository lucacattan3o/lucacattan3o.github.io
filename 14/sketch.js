
let fps = 30;
let radius = 0;
let cX, cY;
let progress = 0;
let circlePoints = 100;
let noiseScale = 0.01;

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
  frameRate(fps);
  recordSketchSetFps(fps);

  radius = width * 0.3;
}

function draw() {
  recordSketchPre();

  background(255, 10);
  
  translate(width * 0.5, height * 0.5);
  strokeWeight(1);
  noFill();

  beginShape();
  for (let i = 0; i < circlePoints; i++) {
    let rad = (1 / circlePoints) * i;

    let tmpRadius = radius + (noise((i + progress) * noiseScale) * radius * 0.5);
    progress += 0.1;

    cX = tmpRadius * cos(rad * TWO_PI);
    cY = tmpRadius * sin(rad * TWO_PI);

    vertex(cX, cY);
  }
  endShape(CLOSE);
  // noLoop();

  

  recordSketchPost(15);
}

