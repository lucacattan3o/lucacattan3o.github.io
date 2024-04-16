let fps = 30;

let nItems = 50;

let mPos;

let worldCenter;

let sec;
let bounce;
let items = [];
let itemSize, radius;

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
    - width * 0.4,
    - width * 0.9);
  cam.lookAt(0, 0, 0);

  itemSize = width * 0.01;
  radius = width * 0.4;
  worldCenter = createVector(width * 0.5, width * 0.5, width * 0.5);

  setupItems();
}

function setupItems(){
  let unique = 0;

  let slice = TWO_PI / nItems;
  for (let i = 0; i < nItems; i++) {
    for (let j = 0; j < nItems; j++) {
      let alpha = i * slice;
      let beta = j * slice;

      let x = sin(alpha) * cos(beta) * radius;
      let y = sin(alpha) * sin(beta) * radius;
      let z = cos(alpha) * radius;

      let item = new Item(x, y, z, unique);
      unique++;
      items.push(item);
    }
  }
  console.debug(items);
}

function draw() {  
  orbitControl();
  
  ambientLight(255);
  directionalLight(color(255), 0, 1, -0.5);

  mPos = responsiveMousePos();

  drawItems();

  

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport(18);
  if (frameCount == 18 * fps){
    sketchExportEnd();
  }
}

function drawItems(){
  background(0);

  rotateY(frameCount * 0.004);

  ambientMaterial(colors[2]);
  // sphere(100, 10, 10);
  

  push();
    // Reverse loop
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      // item.update();
      item.draw();
    }
  pop();
}
