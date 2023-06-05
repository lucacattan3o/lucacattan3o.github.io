let items = 60;
let cubeSizeFactor = 0.7;
let noiseScale = 0.15;
let keySpeed = 0.8;

let fps = 30;
let speed = 0.125;
let xSpeed = 0;
let ySpeed = 0;

let sec = 0;
let bounce = 0;

let itemSize = 0;
let cubeSize = 0;

let zOffset = 0;

let mPos = false;

let colors = [
  '#001219',
  '#005f73',
  '#0a9396',
  '#94d2bd',
  '#e9d8a6',
  '#ee9b00',
  '#ca6702',
  '#bb3e03',
  '#ae2012',
  '#9b2226'
];

let cam;

function setup() {
  createCanvas(1080, 1080, WEBGL);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });
  
  cam = createCamera();
  cam.setPosition(0, -width, 1);
  // cam.setPosition(0, 0, 0);
  cam.lookAt(0, 0, 0);

  // Standard othographic Camera
  // let cam = createCamera();
  // cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  // cam.setPosition(-width * 1.5, -width * 1.5, width * 2);
  // cam.lookAt(0, 0, 0);
  
  smooth();
  noiseSeed(1);
}

function draw() {
  mPos = responsiveMousePos();

  orbitControl();
  // noStroke();  

  sec = frameCount / fps * speed;
  bounce = (cos(sec * TWO_PI) + 1) * 0.5;

  zOffset += 0.01;

  drawBoxes();

  // keysLogic();
  // mouseLogic();

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 16 * fps){
    sketchExportEnd();
  }
}

function drawBoxes(){
  background(0);
  itemSize = width / items;
  cubeSize = itemSize * cubeSizeFactor;
  radius = width * 0.15;

  ambientLight(180);
  directionalLight(color('white'), 0, 1, -0.5);
  
  push();
    // rotateY(frameCount * 0.05);
    translate(- width * 0.5, -width * 0.5, - height * 0.5);

    for (let i = 0; i < items; i++) {
      for (let j = 0; j < items; j++) {
        for (let k = 0; k < items; k++) {
          push();
            let x = i * itemSize;
            let y = j * itemSize;
            let z = k * itemSize;
            translate(x, z, y);

            let nC = Math.floor(((z * 0.001 + zOffset) % 1) * colors.length);

            let d = isPartOfShape(x, y, z);
            if (d){
              ambientMaterial(colors[nC]);
              noStroke()
              // stroke(255);
              if (d > - itemSize ){
                box(cubeSize * 0.8);
              } else {
                box(cubeSize);
              }
              
            }
          pop();  
        }
      }
    }
  pop();
}

function isPartOfShape(x, y, z){

  let center = createVector(itemSize * items * 0.5, itemSize * items * 0.5);
  let item = createVector(x, y);

  let d = center.dist(item);

  // La differenza tra il centro e l'item in griglia
  // è il vettore che rapprensenta il raggio della shape
  let diff = item.sub(center);
  diff.setMag(10);

  let n = noise(diff.x + 500, diff.y + 500, z * 0.001 + 500 + zOffset);
  // let n = noise(z * 0.0005 + zOffset);
  // let k = z / itemSize;
  // let n = (cos(k + zOffset * 5) + 1) * 0.5;

  let amplitude = itemSize * 2;
  let shapeRadius = radius + (n * amplitude);
  shapeRadius = radius + n * radius;

  if (d < shapeRadius && d > shapeRadius * 0.8){
    return d - shapeRadius;
  }
  return false;
}

function drawBox(i, j){
  let tmpI = (frameCount * xSpeed) + i;
  let tmpJ = (frameCount * ySpeed) + j;
  // 0 - 1 noise value
  let n = noise(tmpI * noiseScale + xOffset, tmpJ * noiseScale + yOffset);
  // x numbers of colors
  let itemHeight = n * (colors.length + 1);
  // Bouncing height
  // height = height * bounce + 1;
  itemHeight = itemHeight * map(mPos.y, height, 0, 0, 1, true);
  let size = Math.floor(itemHeight);
  for (let z = 0; z < size; z++) {
    push();
      ambientMaterial(colors[z]);
      translate(0, -itemSize * z, 0);
      // Last step
      if (z == size - 1){
        let lastItemSize = itemHeight % 1;
        let translateZ =  (cubeSize * 0.5) - (cubeSize * lastItemSize * 0.5);
        translate(0, translateZ, 0);
        box(cubeSize * 0.8, cubeSize * lastItemSize, cubeSize * 0.8);
        // cylinder(cubeSize * 0.5, cubeSize * lastItemSize);
      } else {
        box(cubeSize);
      }
    pop();
  }
}

// ** INTEREACTIONS **
// -------------------

function keysLogic(){
  
  if (keyIsDown(UP_ARROW)){
    yOffset += keySpeed * noiseScale;
  }
  if (keyIsDown(DOWN_ARROW)){
    yOffset -= keySpeed * noiseScale;
  }
  if (keyIsDown(LEFT_ARROW)){
    xOffset += keySpeed * noiseScale;
  }
  if (keyIsDown(RIGHT_ARROW)){
    xOffset -= keySpeed * noiseScale;
  }
}

function mouseLogic(){
  let mX = - (map(mPos.x, 0, width, 0, 2, true) - 1);
  xOffset += mX * noiseScale;
  // let mY = - (map(mPos.y, 0, width, 0, 2, true) - 1);
  // yOffset += mY * noiseScale;

  // Draw mouse position
  // if (mPos.x > 0 && mPos.y > 0){
  //   push();
  //     fill('#fca311');
  //     noStroke();
  //     rotateY(-TWO_PI * 0.125);
  //     translate(mPos.x - width / 2 + 0, - 200, mPos.y - width / 2 + 0);
  //     sphere(itemSize * 0.5);
  //   pop();
  // }
}


