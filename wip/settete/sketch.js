let fps = 60;

let unit;

let palette = [
  '#BEBEFF',
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  smFrameRate(fps);
  setupLil();
}

function draw() {
  background(0);
  unit = width / 10;

  
  
  drawMatilda();
}  

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawMatilda(){
  let speed = obj.vel;
  let tildaW = width * 0.2;
  let tildaH = tildaW * 2;
  
  let eyeSize = tildaW * 0.5;
  let eyeSep = eyeSize * 0.4;
  let eyeAspect = 1.18;
  let pupilSize = eyeSize * 0.35;
  let pupilAspect = 1.4;

  let amp = tildaW * 0.1;

  strokeWeight(tildaW * 0.005);

  push();
    translate(width * 0.5, height - tildaH * 0.5);

    // body
    push();
      noStroke();
      fill(palette[0]);
      drawTilde(0, 0, tildaW, tildaH, amp, speed, 30);
    pop();

    // eyes
    push();
      stroke(0);
      let bx = getLoopBounce(speed * 0.5 * 0.5 * 0.65, 0.55);
      translate(amp * 0.8 * bx, -tildaH * 0.25)
      
      ellipse(-eyeSep, 0, eyeSize, eyeSize * eyeAspect);
      ellipse(eyeSep, 0, eyeSize, eyeSize * eyeAspect);

      fill(0);
      ellipse(-eyeSep, 0, pupilSize, pupilSize * pupilAspect);
      ellipse(eyeSep, 0, pupilSize, pupilSize * pupilAspect);
    pop();
  pop();
}

function drawTilde(x, y, w, h, amp, speed, points){
  push();
  translate(x, y + h * 0.5);

  let anim = 0;
  if (speed){
    anim = getAnimation(speed);
  }
  
  beginShape();

  // Linea superiore
  vertex(-w * 0.5, 0);
  vertex(w * 0.5, 0);

  // Curva destra
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points * 0.5, 0, PI);
    angle += anim;
    let x = w * 0.5;
    x = x + map(sin(-angle), -1, 1, -amp, amp);
    let y = - i * (h / points);
    vertex(x, y);
  }

  // Linea inferiore
  vertex(w * 0.5, -h);
  vertex(-w * 0.5, -h);

  // Curva sinistra
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points * 0.5, 0, PI);
    angle -= anim;
    let x = -w * 0.5;
    x = x + map(sin(angle), -1, 1, -amp, amp);
    let y = -h + i * (h / points);
    vertex(x, y);
  }

  endShape(CLOSE);
  pop();
}