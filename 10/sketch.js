let items = 64;
let fps = 30;
let speed = 0.5;

function setup() {
  createCanvas(1080, 1080, WEBGL);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  ortho(-width / 2, width / 2, height / 2, -height / 2, -100, 10000);
}

function draw() {
  recordSketchPre();
  let mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  orbitControl();
  normalMaterial();
  ambientLight(120);

  directionalLight(color('#fff'), -1, 1, 0.5);

  let sec = frameCount / fps * speed;
  let t = sec % 1;
  let bounce = (cos(t * TWO_PI) + 1) * 0.5;

  background(0);
  noStroke();
  fill(255);
  orbitControl();

  
  let itemSize = 80;

  // rotateZ(-PI * 0.25);
  translate(width * 0.5 - (itemSize * items), 0, 0);
  rotateX(PI * 0.25);
  rotateY(PI * 0.25);

  
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      push();
        translate(i * itemSize, 0, j * itemSize);
        box(itemSize * 0.5 * bounce);
      pop();        
    }
  }


  // Draw mouse position
  // if (mPos.x > 0 && mPos.y > 0){
  //   translate(mPos.x, mPos.y);
  //   box(60);
  // }

  recordSketchPost(8);
}


