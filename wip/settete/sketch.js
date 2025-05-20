let fps = 30;

let unit;

let palette = [
  '#BEBEFF',
  '#f664d0',
];

let matildaBg = palette[0];

let ref;

let bodyPoints = [];
let nPoints = 64;

let mic, fft;
let micOn = false;
let soundVol = 0;
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

function draw() {
  background(0);
  unit = width / 10;

  if (micOn){
    soundVol = mic.getLevel();
    // simple sound interaction
    if (soundVol > 0.5){
      guiVel.setValue(4);
    } else{
      guiVel.setValue(1);
    }
    // waveform = fft.waveform();
  }
  
  drawReference();
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
    // point.x += waveform[i] * obj.soundAmp;
  });
}