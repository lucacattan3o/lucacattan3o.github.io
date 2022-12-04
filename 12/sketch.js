let items = 20;
let cubeSizeFactor = 0.6;
let noiseScale = 0.5;
let keySpeed = 0.05;

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
  recordSketchSetFps(fps);
  
  // Standard othographic Camera
  // let cam = createCamera();
  // cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  // cam.setPosition(-width * 1.5, -width * 1.5, width * 2);
  // cam.lookAt(0, 0, 0);
  
  smooth();
  noiseSeed(1);
}

function draw() {
  recordSketchPre();
  mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  orbitControl();

  sec = frameCount / fps * speed;
  bounce = (cos(sec * TWO_PI) + 1) * 0.5;

  itemSize = width / items;
  cubeSize = itemSize * cubeSizeFactor;

  drawBoxes();

  keysLogic();
  // mouseLogic();

  recordSketchPost(16);
}

function drawBoxes(){
  background(0);
  

  ambientLight(180);
  directionalLight(color('white'), 0, 1, -0.5);

  // rotateY(TWO_PI * sec * 0.25);
  
  push();
    translate(- width * 0.5, -width * 0.5, - height * 0.5);
    translate(itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);
    translate(0, 0, - frameCount * 1.5);

    for (let i = 0; i < items; i++) {
      for (let j = 0; j < items; j++) {
        for (let l = 0; l < items; l++) {
          push();
            let x = i * itemSize;
            let y = j * itemSize;
            let z = l * itemSize;
            translate(x, z, y);
            drawBox(i, j, l);
          pop();  
        }
      }
    }
  pop();
}

function drawBox(i, j, l){
  let tmpI = (frameCount * xSpeed) + i;
  let tmpJ = (frameCount * ySpeed) + j;
  // 0 - 1 noise value
  let p = noise(tmpI * noiseScale + xOffset, tmpJ * noiseScale + yOffset, l * noiseScale);

  // let p = noise(i, j, l);
  if (p > 0.6){
    let tmpP = map(p, 0.6, 1, 0, 1, true);
    let z = Math.floor(tmpP * colors.length);
    ambientMaterial(colors[z]);
    stroke(255);
    strokeWeight(0.25);
    // noStroke();
    box(cubeSize);
  }
}

// ** INTEREACTIONS **
// -------------------

function keysLogic(){
  if (keyIsDown(UP_ARROW)){
    yOffset -= keySpeed * noiseScale;
  }
  if (keyIsDown(DOWN_ARROW)){
    yOffset += keySpeed * noiseScale;
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


