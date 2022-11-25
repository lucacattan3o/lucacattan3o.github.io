let items = 20;
let cubeSizeFactor = 0.95;
let noiseScale = 0.15;

let fps = 30;
let speed = 0.05;
let itemSize = 0;
let cubeSize = 0;

let xOffset = 0;
let yOffset = 0;

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
  let cam = createCamera();
  cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  cam.setPosition(-width * 1.5, -width * 1.5, width * 2);
  cam.lookAt(0, 0, 0);
  
  smooth();
  noiseSeed(1);
}

function draw() {
  recordSketchPre();
  let mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  orbitControl();
  // noStroke();  

  drawBoxes(mPos);

  recordSketchPost(16);
}

function drawBoxes(mPos){
  background(255);
  itemSize = width / items;
  cubeSize = itemSize * cubeSizeFactor;

  ambientLight(180);
  directionalLight(color('white'), 0, 1, -0.5);

  // let sec = frameCount / fps * speed;
  // rotateY(TWO_PI * sec * 0.25);
  
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

  keysLogic();
}

function drawBox(i, j){
  let tmpI = (frameCount * speed) + i;
  let n = noise(tmpI * noiseScale + xOffset, j * noiseScale + yOffset);
  let height = n * (colors.length + 1);
  let size = Math.floor(height);
  for (let z = 0; z < size; z++) {
    push();
      ambientMaterial(colors[z]);
      translate(0, -itemSize * z, 0);
      // Last step
      if (z == size - 1){
        let lastItemSize = height % 1;
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

function keysLogic() {
  if (keyIsDown(UP_ARROW)){
    yOffset += 1 * noiseScale;
  }
  if (keyIsDown(DOWN_ARROW)){
    yOffset -= 1 * noiseScale;
  }
  if (keyIsDown(LEFT_ARROW)){
    xOffset += 1 * noiseScale;
  }
  if (keyIsDown(RIGHT_ARROW)){
    xOffset -= 1 * noiseScale;
  }
}


