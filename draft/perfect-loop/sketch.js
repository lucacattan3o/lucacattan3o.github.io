let items = 16;
let sec = 0;
recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(30);
}

function draw() {
  recordSketchPre();

  background(255);
  let angle = frameCount / 30 * 1;
  console.debug(angle);
  let bounce = cos(angle);
  
  push();
    translate(width * 0.5, height * 0.5);
    scale(bounce);
    rectMode(CENTER);
    fill(100);
    rect(0, 0, width, height);
  pop();

  if ((frameCount) % 30 == 0){
    sec++;
    console.log('Sec: ' + sec);
  }

  if (sec == 3){
    console.debug(frameCount);
    noLoop();
  }
  recordSketchPost(3);
}

function angleOffset(index, tot){
  return ((PI / (tot - 1)) * (index));
};


