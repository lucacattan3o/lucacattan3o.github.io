let items = 20;
let cubeSizeFactor = 0.6;
let fps = 30;
let speed = 0.125;

let cubes = [];
let sec = 0;
let bounce = 0;

let itemSize = 0;
let cubeSize = 0;

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
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);  
  
  itemSize = width / items;
  cubeSize = itemSize * cubeSizeFactor;
}

function draw() {
  recordSketchPre();
  mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  recordSketchPost(12);
}
