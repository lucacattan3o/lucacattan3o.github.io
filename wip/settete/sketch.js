let fps = 60;

let unit;

let palette = [
  '#BEBEFF',
];

let matildaBg = palette[0];

let 
  tildaW, tildaH,
  eyeSize, eyeSep, eyeAspect,
  pupilSize, pupilAspect, pupilDist;

let ref;

function preload(){
  ref = loadImage('./imgs/ref.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  smFrameRate(fps);
  setupLil();
}

function draw() {
  background(0);
  unit = width / 10;
  
  drawReference();
  // drawMatilda();
}  

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawReference(){
  push();
    translate(width * 0.5, height * 0.49);
    imageMode(CENTER);
    scale(1.9);
    image(ref, 0, 0);
  pop();
}

function drawMatilda(){
  let speed = obj.vel;
  
  tildaW = width * 0.2;
  tildaH = tildaW * 2;
  
  eyeSize = tildaW * 0.56;
  eyeSep = eyeSize * 0.4;
  eyeAspect = 1.2;
  pupilSize = eyeSize * 0.33;
  pupilAspect = 1.5;
  pupilDist = eyeSize * 0.5;

  let amp = tildaW * 0.12;

  strokeWeight(tildaW * 0.005);

  push();
    translate(width * 0.5, height * 0.5);

    // body
    push();
      noStroke();
      fill(matildaBg);
      // noFill();
      drawTilde(0, 0, tildaW, tildaH, amp, speed, 60);
    pop();
  pop();

  // eyes
  push();
    stroke(0);
    let bx = 0;
    if (speed){
      bx = getLoopBounce(speed * 0.5 * 0.5 * 0.5, 0.55);
    }
    let x = width * 0.5;
    x = x + amp * 0.8 * bx;
    let y = height * 0.5 - tildaH * 0.18;
    drawEye(x - eyeSep, y);
    drawEye(x + eyeSep, y);
  pop();
}

function drawEye(x, y){
  push();
    translate(x, y);
    fill(matildaBg);
    noStroke();
    
    // Colore palpebra
    ellipse(0, 0, eyeSize, eyeSize * eyeAspect);

    push();
      clip(maskEye);

      // sclera (parte bianca dell'occhio)
      // serve per simulare la palpebra
      fill(255);
      stroke(0);
      circle(0, eyeSize * obj.eyelidY, eyeSize * 1.5);

      // pupilla che segue il mouse
      let a = atan2(y - mouseY, x - mouseX);
      let d = dist(x, y, mouseX, mouseY);
      let r = pupilDist * map(d, 0, width, 0, 1, true);

      push();
        clip(maskEyelid);
        fill(0);
        rotate(a);  
        translate(-r, 0);
        rotate(-a);
        ellipse(0, 0, pupilSize, pupilSize * pupilAspect);
      pop();
    pop();

    noFill();
    stroke(0);
    ellipse(0, 0, eyeSize, eyeSize * eyeAspect);
  pop();
}

function maskEye(){
  ellipse(0, 0, eyeSize, eyeSize * eyeAspect);
}
function maskEyelid(){
  circle(0, eyeSize * obj.eyelidY, eyeSize * 1.5);
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
    // 0.5  > PI
    // 0.25 > 
    angle += PI;
    angle += anim;
    let x = w * 0.5;
    x = x + map(sin(angle), -1, 1, -amp, amp);
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