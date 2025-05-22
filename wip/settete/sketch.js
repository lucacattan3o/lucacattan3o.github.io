let fps = 30;

let unit;

let palette = [
  '#BEBEFF',
  '#f664d0',
];

let debugColor = '#03FFBC';

let matildaBg = palette[0];

let ref;

let bodyPoints = [];
let nPoints = 64 * 2;

let mic, fft;
let micOn = false;
let soundVol = 0;
let waveform = [];
let bins = nPoints;

function preload(){
  ref = loadImage('./imgs/matilde-state3.png');
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

function mousePressed(){
  // console.debug(waveform);
  // console.debug('test');
}

function draw() {
  background(0);
  unit = width / 10;

  micInteraction();
  
  // drawReference();
  drawMatilda(width * 0.5, height * 0.5);
  drawMic();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawReference(){
  push();
    translate(width * 0.2, height * 0.49);
    scale(0.5);
    imageMode(CENTER);
    image(ref, 0, 0);
  pop();
}

function toggleMic(){
  let audioContextState = getAudioContext().state;
  if (audioContextState !== 'running') {
    getAudioContext().resume();
  }
  if (micOn){
    mic.stop();
  } else {
    mic.start();
  }
  micOn = !micOn;
}

function micInteraction(){
  if (micOn){
    soundVol = mic.getLevel();
    // simple sound interaction
    if (soundVol > 4){
      guiVel.setValue(5);
    } else {
      guiVel.setValue(1);
    }
    // complex
    waveform = fft.waveform();
  }
}

function drawMic(){
  if (!micOn){
    return;
  }

  push();
    textSize(unit * 0.2);
    fill(255);
    let vol = round(soundVol, 1);
    translate(unit * 0.5, unit * 0.5);
    rect(0, 0, unit * 0.5, unit * 3);
    fill(palette[0]);

    push();
      translate(0, unit * 3);
      rotate(PI);
      rect(-unit * 0.5, 0, unit * 0.5, unit * 0.1 * vol);
    pop();

    textFont('Courier');
    fill(0);
    text(vol, unit * 0.06, unit * 0.2);
  pop();
}

function updateBodyPoints(){
  if (!obj.vel){
    return;
  }

  let a = getLoop(obj.vel);
  bodyPoints.forEach((point, i) => {
    // let anim = a * TWO_PI * obj.vel;
    anim = a * TWO_PI;
    let angle = (i * TWO_PI / nPoints - PI * 0.5) + anim;
    point.x = cos(angle);
    if (micOn){
      point.x += waveform[i] * obj.soundAmp;
    }
  });
}