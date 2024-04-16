let fps = 30;

let nItems = 16;

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

  itemSize = width / nItems;
  worldCenter = createVector(width * 0.5, width * 0.5, width * 0.5);

}


function draw() {  
  orbitControl();
  
  ambientLight(255);
  directionalLight(color(255), 0, 1, -0.5);

  mPos = responsiveMousePos();
  
  drawSphere();

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport(18);
  if (frameCount == 18 * fps){
    sketchExportEnd();
  }
}

function drawSphere(){
  background(0);

  rotateY(sec * TWO_PI * 0.125);

  push();
    translate(- width * 0.5, - width * 0.5, - width * 0.5);

    // Reverse loop
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.update();
      item.draw();
    }
  pop();
}
