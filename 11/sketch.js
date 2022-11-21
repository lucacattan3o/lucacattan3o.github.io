let items = 40;
let itemSize = 0;
let noiseScale = 0.1;

let fps = 30;
let speed = 0.125;

let colors = [
  '#081C15',
  '#1B4332',
  '#2D6A4F',
  '#40916C',
  '#52B788',
  '#74C69D',
  '#95D5B2',
  '#B7E4C7',
  '#D8F3DC',
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
  cam.setPosition(-width * 1.5, -width * 2, width * 2);
  cam.lookAt(0, 0, 0);
  
  smooth();
  noiseSeed();

  // x: red
  // y: green
  // z: blue
  // debugMode();
}

function draw() {
  recordSketchPre();
  let mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  orbitControl();
  noStroke();  

  drawBoxes(mPos);

  recordSketchPost(16);
}

function drawBoxes(mPos){
  background(255);
  itemSize = width / items;

  ambientLight(180);

  let sec = frameCount / fps * speed;
  
  
  // directionalLight(color('blue'), 0.5, 0.5, 0.5);
  // directionalLight(color('red'), -0.5, 0.5, -0.5);
  directionalLight(color('white'), 0, 1, -0.5);
  
  // rotateX(TWO_PI * sec * 0.25);
  // rotateZ(TWO_PI * sec * 0.25);
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
}

function drawBox(i, j){
  let tmpI = (frameCount * 0.05) + i;
  let n = noise(tmpI * noiseScale, j * noiseScale);
  let size = Math.floor(n * (colors.length + 1));
  for (let z = 0; z < size; z++) {
    push();
    translate(0, -itemSize * 1 * z, 0);
    ambientMaterial(colors[z]);
    box(itemSize * 0.95, itemSize * 1 * 0.95, itemSize * 0.95);
    pop();
  }
}


