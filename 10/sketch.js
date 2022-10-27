// recordSketch(false);

let fps = 60;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
}

function draw() {
  recordSketchPre();

  let mX = responsiveMouseX();
  let mY = responsiveMouseY();
  
  recordSketchMouseRec(mX, mY);

  let mPos = recordSketchMouseGet(mX, mY);
  mX = mPos.mX;
  mY = mPos.mY;

  // console.debug(mPos);

  // background(255);

  if (mX !== 0 && mY !== 0){
    fill(0);
    rectMode(CENTER);
    rect(mX, mY, 40, 40);
  }

  recordSketchPost(10);
}


