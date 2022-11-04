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
  recordSketchSetFps(fps);

  // Prospective camera
  // let camDist = width;
  // camera(-camDist * 0.5, -camDist * 0.5, camDist, 0, 0, 0);
  
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
  recordSketchPre();
  let mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  orbitControl();
  noStroke();  

  // growingBoxes(mPos);
  // lightSetup(mPos);

  drawBoxes(mPos);

  // Draw mouse position
  // if (mPos.x > 0 && mPos.y > 0){
  //   translate(mPos.x, mPos.y);
  //   box(60);
  // }

  recordSketchPost(16);
}

function lightSetup(mPos){
  background(0);
  let itemSize = width / items;

  ambientLight(250);
  let lightDist = itemSize * 5;
  // 4 lights in top corners
  pointLight(255, 0, 0, lightDist, -lightDist, lightDist);
  pointLight(255, 0, 0, -lightDist, -lightDist, -lightDist);
  pointLight(0, 0, 255, lightDist, -lightDist, -lightDist);
  pointLight(0, 0, 255, -lightDist, -lightDist, lightDist);

  // Base plane
  specularMaterial(color(colors[7]));
  shininess(100);
  push();
    translate(0, itemSize * 0.1, 0);  
    box(width, itemSize * 0.01, height);
  pop();

  // Blue box
  push();
    translate(0, -itemSize * 0.1, 0);
    specularMaterial(color(colors[2]));
    shininess(10);
    box(itemSize, itemSize * 0.2, itemSize);
  pop();

  // Orange box
  push();
    translate(itemSize, -itemSize * 0.5, 0);
    specularMaterial(color(colors[3]));
    shininess(10);
    box(itemSize, itemSize, itemSize);
  pop();

  // Sphere
  push();
    translate(0, -itemSize * 0.7, 0);
    specularMaterial(color(colors[4]));
    shininess(10);
    sphere(itemSize * 0.5);
  pop();

  // Moving box
  push();
    // X, Y, Z
    translate(mPos.x - width * 0.5, - itemSize * 0.5, 0);
    specularMaterial(color(colors[0]));
    box(itemSize * 0.8);
  pop();
}

function drawBoxes(mPos){
  background(255);
  let itemSize = width / items;

  ambientLight(90);

  let sec = frameCount / fps * speed;
  // Yellow light
  directionalLight(color(colors[1]), -0.5, 0.25, -0.5);
  // White light
  directionalLight(color(colors[3]), 0.5, 0.25, 0.5);
  rotateY(TWO_PI * sec * 0.25);
  // rotateZ(frameCount * 0.001);

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
          let secOffset = map(d, 0, width, 0, 1, true);

          let t = ((sec + secOffset) * 1) % 1;
          let bounce = (cos(t * TWO_PI) + 1) * 0.5;

          box(itemSize * bounce * 0.9);
        pop();
      }     
    }
  }
}

function growingBoxes(mPos){
  ambientLight(150);

  directionalLight(color('red'), -1, -1, -1);
  directionalLight(color('blue'), 1, 1, -1);
  directionalLight(color('green'), 0, 0, -1);

  let sec = frameCount / fps * speed;
  let t = sec % 1;
  let bounce = (cos(t * TWO_PI) + 1) * 0.5;

  background(0);
  noStroke();
  fill(255);
  orbitControl();

  let itemSize = width / items;

  // rotateX(PI * 0.25);
  // rotateZ(PI * 0.25);

  rotateY(PI * frameCount * 0.001);
  rotateX(PI * frameCount * 0.002);
  
  // Go to the top left
  translate(- width * 0.5, - height * 0.5, 0);
  translate(itemSize * 0.5, itemSize * 0.5, 0);
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      push();
        translate(i * itemSize, j * itemSize, 0);
        // rotateX(PI * 0.25 * t);
        // rotateY(PI * 0.25 * t);
        let d = dist(mPos.x, mPos.y, i * itemSize, j * itemSize);
        let z = map(d, 0, width * 0.25, 0, 300, true);
        let deep = map(d, 0, width * 0.25, itemSize * 8, itemSize * 0.8, true);
        if (mPos.x !== 0 && mPos.y !== 0){
          translate(0, 0, -z);
        }
        box(itemSize * 0.8, itemSize * 0.8, deep);
      pop();        
    }
  }
}


