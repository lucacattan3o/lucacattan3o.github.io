let items = 40;
let cubeSizeFactor = 0.95;
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

let xOffset = 0;
let yOffset = 0;

let mPos = false;

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
    fps: fps,
  });
  
  // Standard othographic Camera
  let cam = createCamera();
  cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  cam.setPosition(-width * 1.5, -width * 1.5, width * 2);
  cam.lookAt(0, 0, 0);
  
  smooth();
  noiseSeed(1);
}

function draw() {
  mPos = responsiveMousePos();

  mPos = sketchRecordData('mouse', mPos);

  orbitControl();
  // noStroke();  

  sec = frameCount / fps * speed;
  bounce = (cos(sec * TWO_PI) + 1) * 0.5;

  drawBoxes();

  keysLogic();
  mouseLogic();

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

function drawBoxes(){
  background(255);
  itemSize = width / items;
  cubeSize = itemSize * cubeSizeFactor;

  ambientLight(180);
  directionalLight(color('white'), 0, 1, -0.5);

  // rotateY(TWO_PI * sec * 0.25);
  
  push();
    translate(- width * 0.5, width * 0.125, - height * 0.5);
    translate(itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);

    for (let i = 0; i < items; i++) {
      for (let j = 0; j < items; j++) {
        push();
          let x = i * itemSize;
          let y = j * itemSize;
          translate(x, 0, y);
          drawBox(i, j);
        pop();  
      }
    }
  pop();
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


