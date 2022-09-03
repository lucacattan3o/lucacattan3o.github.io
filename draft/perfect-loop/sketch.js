let items = 16;
let sec = 0;
let fps = 30;

// 1    = 1 complete loop in 1 second
// 0.5  = 1 complete loop in 2 seconds
// 0.25 = 1 complete loop in 4 seconds
let speed = 0.125;
let secEnd = 8;

let circleSize = false;

recordSketch(true);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);

  circleSize = width * 0.4; 
}

function draw() {
  recordSketchPre();

  background(255, 255, 255, 10);

  // Ottengo i secondi a partire dal frameCount
  let sec = frameCount / fps;
  console.debug('Sec: ' + sec);

  // Moltiplicando i secondi per * TWO_PI ottengo un angolo in radianti
  // Si ottengono valori un po' incomprensibili (non facile ragionare in radianti)
  // è più facile portarsi dietro i secondi e moltiplicarli * TWO_PI
  let rad = sec * speed * TWO_PI;
  // console.debug('Radians: ' + rad);

  // Per passare da radianti a gradi si può usare questa formula
  let deg = rad * (180 / PI);
  console.debug(deg + '°');
  
  stroke(0);
  translate(width * 0.5, height * 0.5);
  strokeWeight(width * 0.002);
  fill(color('#ffc107'));

  push();
    rotate(sec * speed * TWO_PI);
    line(0, 0, circleSize, 0);
    translate(circleSize, 0);
    circle(0, 0, width * 0.015);
  pop();
  
  let bounceCos = bounce(sec, speed);
  push();
    translate(0, circleSize * 1.1);
    translate(bounceCos * circleSize, 0);
    rect(0, 0, width * 0.015);
  pop();

  // Timing offset
  let bounceCosB = bounce(sec, speed, 1 / 50);
  push();
    translate(0, circleSize * 1.15);
    translate(bounceCosB * circleSize, 0);
    rect(0, 0, width * 0.015);
  pop();

  // Timing offset
  bounceCosC = bounce(sec, speed, 2 / 50);
  push();
    translate(0, circleSize * 1.2);
    translate(bounceCosC * circleSize, 0);
    rect(0, 0, width * 0.015);
  pop();

  let bounceSin = sin(sec * speed * TWO_PI);
  push();
    translate(circleSize * 1.1, 0);
    translate(0, bounceSin * circleSize);
    rect(0, 0, width * 0.015);
  pop();


  fill(0, 0, 255);
  
  // console.debug('Bounce: ' + bounce);

  // push();
  //   fill(50);
  //   // 0.25 = 90°
  //   rotate((sec + 1) * 0.125 * TWO_PI);
  //   rect(0, 0, width, 10);
  // pop();

  if (frameCount % fps == 0){
    console.log('Sec: ' + sec);
  }

  if (sec == secEnd){
    noLoop();
  }
  recordSketchPost(secEnd);
}

/**
 * 
 * Offset should be beetween 0 and 1
 */
function bounce(sec, speed = 1, offset = 0){
  let s = sec;
  if (offset){
    s = s + (offset / speed);
  }
  return cos(s * speed * TWO_PI);
}


