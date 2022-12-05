let items = 20;
let cubeSizeFactor = 0.6;
let noiseScale = 0.5;
let keySpeed = 0.05;

let cubes = [];
let minNumberCubes = 0;

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
  
  itemSize = width / items;
  cubeSize = itemSize * cubeSizeFactor;

  // smooth();
  // noiseSeed(1);

  addCubes();
  minNumberCubes = cubes.length;
}

function addCubes(){
  for (let l = 0; l < items; l++) {
    addCubeLine(l);
  }
}

function addCubeLine(line){
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let c = new Cube(i, j, line);
      cubes.push(c);
    }
  }
}

function draw() {
  recordSketchPre();
  mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  orbitControl();

  sec = frameCount / fps * speed;
  bounce = (cos(sec * TWO_PI) + 1) * 0.5;

  drawBoxes();

  keysLogic();
  // mouseLogic();

  recordSketchPost(16);
}

function drawBoxes(){
  background(0);
  noStroke();
  ambientLight(180);
  directionalLight(color('white'), 0, 1, -0.5);
  
  translate(- width * 0.5, -width * 0.5, width * 0.5);
  translate(itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);

  // Remove cubes
  let lastCubeLine = false;
  cubes.forEach((cube, i) => {
    if (cube.out){
      cubes.splice(i, 1);
    } else {
      lastCubeLine = cube.l;
    }
  });

  if (cubes.length < Math.pow(items, 3)){
    addCubeLine(lastCubeLine);
  }

  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];
    cube.move();
    cube.draw();
  }
}

// ** CLASSES **
// -------------

class Cube{
  constructor(i, j, l){
    this.i = i;
    this.j = j;
    this.l = l;
    this.visible = false;
    this.out = false;

    this.x = this.i * itemSize;
    this.y = this.j * itemSize;
    this.z = - this.l * itemSize;

    let c = Math.floor(random() * colors.length);
    this.color = color(colors[c]);

    this.limitZ = 100;

    if (random() > 0.5){
      this.visible = true;
    }
  }

  move(){
    this.z += map(mPos.y, 0, width, 0, 10, true);
    if (this.z > this.limitZ){
      this.out = true;
    }
  }

  draw(){
    if (!this.visible){
      return false;
    }
    push();
      translate(this.x, this.y, this.z);
      ambientMaterial(this.color);
      let sizeX = map(mPos.x, 0, width, 0, 1, true);
      let sizeY = map(mPos.y, 0, width, 0, 1, true);
      box(cubeSize * sizeX, cubeSize * sizeY, cubeSize);
    pop();
  }
}


// ** INTERACTIONS **
// ------------------

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


