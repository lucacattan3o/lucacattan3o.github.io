let fps = 30;

let itemSize;
let sec;
let capture;

function setup() {
  createCanvas(1080, 1080);
  frameRate(fps);
  smFrameRate(fps);
  rectMode(CENTER);
  background(0);
}

function draw() {
  background(0, 20);

  itemSize = width * 0.3;

  sec = frameCount / fps;
  if (sec % 1 == 0){
    // console.debug(sec);
  }

  push();
    translate(width * 0.5, height * 0.5);

    let a = getLoop(0.25);
    rotate(TWO_PI * a);

    let b = getLoopBounce(0.25);
    b = map(b, -1, 1, 0.2, 2);

    noFill();
    stroke(255);
    rect(0, 0, itemSize * b);
  pop();
}

function keyPressed(){
  switch (key) {
    case 's':
      capture = P5Capture.getInstance();
      capture.start({
        format: "mp4",
        duration: fps * 8,
        frameRate: fps,
      });
      break;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
