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

  // Super funzione che registra la variabile
  // se c'è in funzione play, la sovrascrive
  mPos = recordSketchData('mouse', mPos);
  mPressed = recordSketchData('pressed', mouseIsPressed);

  if (mPos.x !== 0 && mPos.y !== 0){
    if (mPressed){
      fill(0);
      stroke(255);
    } else {
      fill(255);
      stroke(0);
    }
    circle(mPos.x, mPos.y, 200);
  }

  recordSketchPost(4);
}
