let fps = 30;

let unit;

let palette = [
  '#BEBEFF',
  '#f664d0',
  '#212121'
];

let bgs = [
  '#73FFBA',
  '#9CF7FF',
  '#FF9B69',
  '#FFF673'
];

let debugColor = '#03FFBC';

let matildaBg = palette[0];
let matildaIdleVel = 0.5;

let ref;
let mouthImgs = [];

let bodyPoints = [];
let nPoints = 8 * 2 * 2 * 2 * 2;

let mic, fft;
let micOn = false;
let soundVol = 0;
let waveform = [];
let bins = nPoints;

function preload(){
  ref = loadImage('./imgs/matilde-state3.png');
  mouthImgs[0] = loadImage('./imgs/mouth-smile.png');
  mouthImgs[1] = loadImage('./imgs/mouth-wow.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  smFrameRate(fps);
  setupLil();
  setupBodyPoints();
  setupAudio();
  strokeJoin(ROUND);
  imageMode(CENTER);
}

function setupAudio(){
  mic = new p5.AudioIn();
  mic.amp(1);
  fft = new p5.FFT(0.99, bins);
  fft.setInput(mic);
}

function setupBodyPoints(){
  for (let i = 0; i < nPoints; i++) {
    bodyPoints.push({
      delta: i,
      x: 0, // cos(i * TWO_PI / nPoints - PI * 0.5),
    });
  }
}

function mousePressed(){
  // console.debug(waveform);
  // console.debug('test');
}

function draw() {
  background(palette[2]);
  unit = width / 10;

  bgInteractions();
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
    soundVol = mic.getLevel() * obj.volGain;
    if (soundVol > 10){
      soundVol = 10;
    }
    // simple sound interaction
    if (soundVol > obj.levelB){
      guiVel.setValue(4);
    } else if (soundVol > obj.levelA) {
      guiVel.setValue(2);
    } else {
      guiVel.setValue(matildaIdleVel);
    }
    // complex
    waveform = fft.waveform();
  }
}

function bgInteractions(){
  if (soundVol > obj.levelA){
    if (frameCount % 20 == 0){
      bgs = shuffle(bgs);
    }
  }
  if (soundVol > obj.levelB){
    if (frameCount % 2 == 0){
      bgs = shuffle(bgs);
    }
  }
  if (soundVol > obj.levelA){
    background(bgs[0]);
  }
}

function drawMic(){
  if (!micOn){
    return;
  }

  let barH = unit;

  push();
    textSize(unit * 0.2);
    fill(255);
    let vol = round(soundVol, 1);
    translate(unit * 0.5, unit * 0.5);
    rect(0, 0, unit * 0.5, barH);
    fill(palette[0]);

    push();
      translate(0, barH);
      rotate(PI);
      rect(-unit * 0.5, 0, unit * 0.5, unit * 0.1 * vol);
    pop();

    push();
      translate(0, barH - unit * 0.1 * obj.levelA);
      strokeWeight(strokeW * 0.5);
      line(0, 0, unit * 0.5, 0);
    pop();
    push();
      translate(0, barH - unit * 0.1 * obj.levelB);
      strokeWeight(strokeW * 0.5);
      line(0, 0, unit * 0.5, 0);
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
    let anim = a * TWO_PI * obj.vel;
    anim = a * TWO_PI;
    let angle = (i * TWO_PI / nPoints - PI * 0.5) + anim;
    if (soundVol > obj.levelA){
      point.x = 0;
    } else {
      point.x = cos(angle);
    }
    if (micOn){
      if (soundVol > 0.2){
        point.x += waveform[i] * obj.soundAmp * 10;
      }
    }
  });
}