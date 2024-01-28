let fps = 30;

let nItems = 32;
let nCircles = 32;

let items = [];
let connections = {};
let mPos;

let worldCenter;

let sec;
let bounce;
let speed = 0.125;

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

colors = [
  "#2d00f7",
  "#6a00f4",
  "#8900f2",
  "#a100f2",
  "#b100e8",
  "#bc00dd",
  "#d100d1",
  "#db00b6",
  "#e500a4",
  "#f20089"
];

let music;
let amp, fft, spec;
let smooth = 0.7;

function preload(){
  music = loadSound('fm-belfast.mp3', function(){
    amp = new p5.Amplitude();
    amp.setInput(music);
    
    fft = new p5.FFT(smooth, 16);
    fft.setInput(music);
  });
}

function setup() {
  createCanvas(1080, 1080, WEBGL);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });

  // Standard othographic Camera
  let cam = createCamera();
  // cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  cam.setPosition(
    - width * 0.9,
    - width * 0,
    - width * 0.9);
  cam.lookAt(0, 0, 0);

  worldCenter = createVector(width * 0.5, width * 0.5, width * 0.5);
  
  createItems();
}

function createItems(){

  let radius = width * 0.4;
  let vh = radius / nCircles;

  for (let i = 0; i <= nCircles; i++) {
    let z = (- radius) + i * vh * 2;
    let freq = map(i, 0, nCircles, -15, 15, true);
    rad = radius * sin(PI * i / nCircles);
    let item = new Item(z, vh * 0.7, rad, freq);
    items.push(item);
  }
}

function draw() {

  spec = fft.analyze();

  sec = frameCount / fps * speed;
  bounce = (cos(sec * TWO_PI) + 1) * 0.25;
  
  orbitControl();
  
  ambientLight(255);
  directionalLight(color(255), 0, 1, -0.5);

  mPos = responsiveMousePos();
  
  drawItems();

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport(18);
  if (frameCount == 18 * fps){
    sketchExportEnd();
  }
}

function drawItems(){
  background(0);

  rotateY(sec * TWO_PI * 0.5);
  rotateX(sec * TWO_PI * 0.5);
  // rotateZ(sec * TWO_PI * 0.25);

  push();

    ambientMaterial('#fff');
    // sphere(400, 10, 10);

    // Reverse loop
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.update();
      item.draw();
    }
  pop();
}

function keyPressed() {  
  if (keyCode === 32) {
    if (!music.isLooping()){
      music.loop();
      sketchRecordStart();
    } else {
      music.stop();
      sketchRecordStop();
    }  
  }
}
