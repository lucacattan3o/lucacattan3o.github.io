let fps = 30;

let unit;

let palette = [
  '#BEBEFF',
];

let matildaBg = palette[0];

let 
  matildaW, matildaH,
  eyeSize, eyeSep, eyeAspect,
  pupilSize, pupilAspect, pupilDist;

let ref;

let bodyPoints = [];
let nPoints = 64;

let mic, fft;
let waveform = [];
let bins = nPoints;

function preload(){
  ref = loadImage('./imgs/matilde-idle.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  smFrameRate(fps);
  setupLil();
  setupBodyPoints();
  setupAudio();
  strokeJoin(ROUND);
}

function setupAudio(){
  mic = new p5.AudioIn();
  mic.start();
  mic.amp(40);
  
  fft = new p5.FFT(0.99, bins);
  fft.setInput(mic);
}

function setupBodyPoints(){
  for (let i = 0; i < nPoints; i++) {
    bodyPoints.push({
      delta: i,
      x: cos(i * TWO_PI / nPoints - PI * 0.5),
    });
  }
}

function updateBodyPoints(){
  if (!obj.vel){
    return;
  }

  let a = getLoop();
  waveform = fft.waveform();
  bodyPoints.forEach((point, i) => {
    let anim = a * TWO_PI * obj.vel;
    let angle = (i * TWO_PI / nPoints - PI * 0.5) + anim;
    point.x = cos(angle);
    point.x += waveform[i] * obj.soundAmp;
  });
}

function mousePressed(){
  // console.debug(waveform);
}

function draw() {
  background(0);
  unit = width / 10;
  
  // drawReference();
  drawMatilda(width * 0.5, height * 0.5);
}  

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawReference(){
  push();
    translate(width * 0.2, height * 0.49);
    imageMode(CENTER);
    image(ref, 0, 0);
  pop();
}

function drawMatilda(matildaX, matildaY){
  
  matildaW = width * 0.2;
  matildaH = matildaW * 1.4;
  
  eyeSize = matildaW * 0.5;
  eyeSep = eyeSize * 0.4;
  eyeAspect = 1.2;
  pupilSize = eyeSize * 0.25;
  pupilAspect = 1.5;
  pupilDist = eyeSize * 0.5;

  let amp = matildaW * 0.1;

  updateBodyPoints();

  strokeWeight(matildaW * 0.018);

  push();
    translate(matildaX, matildaY);

    // body
    push();
      noStroke();
      fill(matildaBg);
      drawSmartTilde(0, 0, matildaW, matildaH, amp, nPoints);
    pop();
  pop();

  // eyes
  push();
    stroke(0);
    let x = matildaX + (0.7 * amp * bodyPoints[26].x) ;
    let y = matildaY - matildaH * 0.1;
    drawEye(x - eyeSep, y);
    drawEye(x + eyeSep, y);
  pop();

  drawEyebrows(matildaX, matildaY, amp);
  
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
      circle(0, eyeSize * obj.eyelidY, eyeSize * 3);

      // pupilla che segue il mouse
      let a = atan2(y - mouseY, x - mouseX);
      let d = dist(x, y, mouseX, mouseY);
      let r = pupilDist * map(d, 0, width, 0, 1, true);

      // clippo la pupilla sotto la palpebra
      push();
        clip(maskEyelid);
        fill(0);
        rotate(a);  
        translate(-r, 0);
        rotate(-a);
        ellipse(0, 0, pupilSize, pupilSize * pupilAspect);
      pop();
    pop();

    // traccia occhio
    noFill();
    stroke(0);
    ellipse(0, 0, eyeSize, eyeSize * eyeAspect);
  pop();
}

function drawEyebrows(matildaX, matildaY, amp){
  let eyebrowsSpace = matildaW * 0.27;

  let eyebrowsDelta = obj.eyebrowsDelta * 0.1;

  push();
    translate(matildaX, matildaY);
    let ebx = amp * 0.5 * bodyPoints[25].x;
    translate(ebx, -matildaH * 0.35);
    translate(0, eyeSize * obj.eyebrowsY);

    fill(0);
    if (obj.eyebrows == 'Tilde'){
      push();
        translate(-eyebrowsSpace, eyeSize * eyebrowsDelta);
        rotate(PI * 0.5);
        drawTilde(0, 0, eyeSize * 0.4, eyeSize * 0.8, eyeSize * 0.06, 0, 10);
      pop();
      push();
        translate(eyebrowsSpace, eyeSize * -eyebrowsDelta);
        rotate(PI * 0.5);
        drawTilde(0, 0, eyeSize * 0.4, eyeSize * 0.8, eyeSize * 0.06, 0, 10);
      pop();
    }
    if (obj.eyebrows == 'Happy'){
      push();
        strokeCap(SQUARE);
        strokeWeight(eyeSize * 0.3);
        push();
          translate(-eyebrowsSpace, eyeSize * eyebrowsDelta);
          bezier(
            -eyeSize * 0.35, 0, 
            -eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.35, 0
          );
        pop();
        push();
          translate(eyebrowsSpace, eyeSize * -eyebrowsDelta);
          bezier(
            -eyeSize * 0.35, 0, 
            -eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.35, 0
          );
        pop();
      pop();
    }
  pop();
}

function maskEye(){
  ellipse(0, 0, eyeSize, eyeSize * eyeAspect);
}
function maskEyelid(){
  circle(0, eyeSize * obj.eyelidY, eyeSize * 3);
}

function drawSmartTilde(x, y, w, h, amp, points){
  push();
  translate(x, y - h * 0.5);
  let firstPoint = {
    x: null,
    y: null,
  };
  beginShape();
    for (let i = 0; i < points; i++) {
      let point = bodyPoints[i];
      let x = w * 0.5;
      x = x + map(point.x, -1, 1, -amp, amp);
      let y = i * (h / points);
      if (i == 0){
        firstPoint.x = x;
        firstPoint.y = y;
      }
      vertex(x, y);
      // text(i, x + 30, y);
    };
    for (let i = (points - 1); i >= 0; i--) {
      let point = bodyPoints[i];
      let x = -w * 0.5;
      x = x - map(point.x, 1, -1, -amp, amp);
      let y = i * (h / points);
      vertex(x, y);
    };
    vertex(firstPoint.x, firstPoint.y);
  endShape();
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