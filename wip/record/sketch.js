let fps = 60;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
}

function draw() {
  recordSketchPre();

  let mPos = responsiveMousePos();
  
  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  if (mPos.x !== 0 && mPos.x !== 0){
    fill(0);
    circle(mPos.x, mPos.y, 40);
  }

  recordSketchPost(2);
}


