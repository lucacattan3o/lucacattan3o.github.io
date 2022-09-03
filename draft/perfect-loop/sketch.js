let items = 16;
let sec = 0;
let fps = 30;

// 1    = 1 complete loop in 1 second
// 0.5  = 1 complete loop in 2 seconds
// 0.25 = 1 complete loop in 4 seconds
let speed = 0.25;
let secEnd = 4;
recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
}

function draw() {
  recordSketchPre();

  background(255);

  // Ottengo un counter proporzionale al framerate
  // che può essere accelerato con il parametro speed
  let timeFrame = frameCount * speed / fps;
  console.debug('Timeframe: ' + timeFrame);

  // Dal timeframe posso ottenere il valore dei radianti
  // Moltiplicando * 2PI
  // Si ottengono valori un po' incomprensibili (non facile ragionare in radianti)
  // è più facile portarsi dietro il timeFrame e moltiplicarlo * 2 PI
  let rad = timeFrame * 2 * PI;
  // console.debug('Radians: ' + rad);

  let deg = rad * (180 / PI);
  console.debug(deg + '°');

  // Default mode in p5.js is RADIANS (angleMode())
  let bounce = cos(timeFrame * 2 * PI);
  console.debug('Bounce: ' + bounce);
  
  rectMode(CENTER);
  fill(100);
  translate(width * 0.5, height * 0.5);
  
  push();
    fill(100);
    rotate(timeFrame * 2 * PI);
    scale(bounce, 1);
    rect(0, 0, width, 10);
  pop();

  push();
    fill(50);
    // 0.25 = 90°
    rotate((timeFrame + 0.25) * 2 * PI);
    rect(0, 0, width, 10);
  pop();

  if ((frameCount) % fps == 0){
    sec++;
    console.log('Sec: ' + sec);
  }

  if (sec == secEnd){
    noLoop();
  }
  recordSketchPost(secEnd);
}

function angleOffset(index, tot){
  return ((PI / (tot - 1)) * (index));
};


