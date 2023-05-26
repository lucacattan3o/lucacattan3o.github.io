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
  test = recordSketchData('test', [155, 200, 325]);

  if (mPos.x !== 0 && mPos.y !== 0){
    circle(mPos.x, mPos.y, 200);
  }

  recordSketchPost(2);
}
