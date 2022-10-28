let items = 20;
let fps = 30;
let speed = 0.25;

function setup() {
  createCanvas(1080, 1080, WEBGL);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  // ortho(-width / 2, width / 2, height / 2, -height / 2, -100, 10000);
  // ortho();
}

function draw() {
  recordSketchPre();
  let mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  orbitControl();
  // normalMaterial();
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

  rotateX(PI * frameCount * 0.001);
  rotateY(PI * frameCount * 0.001);
  
  // Go to the top left
  translate(- width * 0.5, - height * 0.5, 0);
  translate(itemSize * 0.5, itemSize * 0.5, 0);
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      push();
        translate(i * itemSize, j * itemSize, 0);
        // rotateX(PI * 0.25 * t);
        // rotateY(PI * 0.25 * t);
        box(itemSize * 1.1 * bounce);
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


