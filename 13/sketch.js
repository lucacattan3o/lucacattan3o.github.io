let fps = 30;
let radius = 0;
let cX, cY;
let xOff, yOff, zOff = 0;
let progress = 0;
let circlePoints = 100;
let noiseScale = 0.01;
let amplitude = 100;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
  })

  let detail = 1;
  let amp = 0.2;
  noiseDetail(detail, amp);

  radius = width * 0.1;
  // try with different amplitude
  amplitude = width * 0.4;
  background(0);
}

function draw() {
  
  translate(width * 0.5, height * 0.5);
  strokeWeight(1);
  stroke(255, 30);
  noFill();

  radius += 0.2;
  amplitude += 0.5;
  
  // try 0.1 - faster
  zOff += 0.02;

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

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
    noLoop();
  }
}