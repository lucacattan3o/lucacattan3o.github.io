let items = 20;
let cubeSizeFactor = 0.6;
let fps = 30;
let speed = 0.125;

let cubes = [];
let sec = 0;
let bounce = 0;

let itemSize = 0;
let cubeSize = 0;

let cam = false;
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

  // cam = createCamera();
  // perspective(PI/3, width/height, 0, 1000);

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

  recordSketchPost(12);
}

function drawBoxes(){
  background(0);
  noStroke();
  ambientLight(180);
  directionalLight(color('white'), 0, 1, -0.5);
  
  translate(- width * 0.5, -width * 0.5, width * 0.5);
  translate(itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);
  
  
  // alter camera
  // rotateY(-TWO_PI * 0.05 * sec);
  // rotateX(TWO_PI * 0.01 * sec);
  // translate(0, 0, -width * 2);
  // rotateY(-TWO_PI * 0.25 * sec);

  // Remove out cubes
  let lastCubeLine = false;
  cubes.forEach((cube, i) => {
    if (cube.out){
      cubes.splice(i, 1);
    } else {
      lastCubeLine = cube.l;
    }
  });

  // Add new line of cubes
  if (cubes.length < Math.pow(items, 3)){
    addCubeLine(lastCubeLine);
  }

  // Move them
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

    if (random() > 0.6){
      this.visible = true;
    }
  }

  move(){
    let d = dist(width * 0.5, height * 0.5, mPos.x, mPos.y);
    let increment = map(mPos.y, 0, width, 0, 10, true);
    if (increment == 0){
      increment = 2;
    }
    // increment = 2;
    this.z += increment;
    
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
      if (sizeX == 0 && sizeY == 0){
        sizeX = 0.5;
        sizeY = 0.5;  
      }
      // sizeX = 0.5;
      // sizeY = 0.5;
      box(cubeSize * sizeX, cubeSize * sizeY, cubeSize);
    pop();
  }
}



