let items = 10;
let fps = 30;
let speed = 0.125;

let colors = [
  '#000000',
  '#fca311',
  '#e5e5e5',
  '#ffffff',
];

function setup() {
  createCanvas(1080, 1080, WEBGL);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
  });
  
  // Standard othographic Camera
  let cam = createCamera();
  cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  cam.setPosition(-width * 2, -width * 2, width * 2);
  cam.lookAt(0, 0, 0);
  
  smooth();

  // x: red
  // y: green
  // z: blue
  // debugMode();
}

function draw() {
  let mPos = responsiveMousePos();

  mPos = sketchRecordData('mouse', mPos);

  orbitControl();
  noStroke();  

  drawBoxes(mPos);

  if (frameCount == 1){
    sketchRecordStart();
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 16 * fps){
    sketchRecordStop();
    sketchExportEnd();
  }
}

function drawBoxes(mPos){
  background(0);
  let itemSize = width / items;

  ambientLight(80);

  let sec = frameCount / fps * speed;
  
  directionalLight(color('blue'), 0.5, 0.5, 0.5);
  directionalLight(color('red'), -0.5, 0.5, -0.5);
  directionalLight(color('orange'), 0, 0, -1);
  
  // rotateX(TWO_PI * sec * 0.25);
  // rotateZ(TWO_PI * sec * 0.25);
  rotateY(TWO_PI * sec * 0.25);
  
  translate(- width * 0.5, - width * 0.5, - height * 0.5);
  translate(itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);

  let center = createVector(
    items * 0.5 * itemSize - itemSize * 0.5,
    items * 0.5 * itemSize - itemSize * 0.5,
    items * 0.5 * itemSize - itemSize * 0.5
  );

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      for (let w = 0; w < items; w++) {
        push();
          let x = i * itemSize;
          let y = j * itemSize;
          let z = w * itemSize; 

          let pos = createVector(x, y, z);
          let d = Math.abs(center.dist(pos));

          translate(x, y, z);
          
          // Map it to the number of items (0-1)
          let secOffset = map(d, 0, width * 0.75, 0, 1, true);

          let t = ((sec + secOffset) * 1) % 1;
          let bounce = (cos(t * TWO_PI) + 1) * 0.5;

          box(itemSize * bounce * 1);
        pop();
      }     
    }
  }
}


