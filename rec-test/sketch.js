let fps = 60;

let mPos;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
}

function draw() {
  recordSketchPre();

  mPos = responsiveMousePos();

  // todo: do this in a single function, why not?
  // Store, if requested, the mouse position
  recordSketchMouseRec(mPos);

  // Override, if stored, the mouse position
  mPos = recordSketchMouseGet(mPos);

  if (mPos.x !== 0 && mPos.y !== 0){
    circle(mPos.x, mPos.y, 200);
  }

  recordSketchPost(8);
}
