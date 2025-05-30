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
  unit = width * 0.1;
  if (width < 800){
    unit = width * 0.15;
  }
  if (width < 400){
    unit = width * 0.2;
  }

  updateSoundVars();

  // interactions
  ixVel();
  ixAmp();
  ixBg();
  ixExpressions();
  
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

function turnMicOn(){
  let audioContextState = getAudioContext().state;
  if (audioContextState !== 'running') {
    getAudioContext().resume();
  }
  mic.start();
  micOn = true;
}

function turnMicOff(){
  if (micOn){
    mic.stop();
  }
  micOn = false;
}

function updateSoundVars(){
  if (obj.micMode == 'Manual'){
    return;
  }

  if (micOn){
    soundVol = mic.getLevel() * obj.micVolGain;
  } else {
    soundVol = obj.micVolSimulation;
  }
  
  if (soundVol > 10){
    soundVol = 10;
  }

  waveform = fft.waveform();
}

function ixVel(){
  if (obj.micMode == 'Manual'){
    return;
  }

  if (soundVol > obj.micLevelB){
    guiVel.setValue(4);
  } else if (soundVol > obj.micLevelA) {
    guiVel.setValue(2);
  } else {
    guiVel.setValue(matildaIdleVel);
  }
}

function ixAmp(){
  if (obj.micMode == 'Manual'){
    return;
  }

  // if (soundVol < (obj.micLevelA * 0.25)){
  //   guiAmp.setValue(0.05);
  // } else {
  //   guiAmp.setValue(0.1);
  // }
}

function ixBg(){
  if (obj.micMode == 'Manual'){
    return;
  }

  if (soundVol > obj.micLevelA){
    if (frameCount % 20 == 0){
      bgs = shuffle(bgs);
    }
  }
  if (soundVol > obj.micLevelB){
    if (frameCount % 2 == 0){
      bgs = shuffle(bgs);
    }
  }
  if (soundVol > obj.micLevelA){
    background(bgs[0]);
  }
}

function ixExpressions(){
  if (obj.micMode == 'Manual'){
    return;
  }

  let s = frameCount / fps;
  let n = noise(frameCount * 0.01);

  if (soundVol < obj.micLevelA){
    if (s % 3 !== 0){
      return;
    }
    if (n < 0.33){
      expIdle();
    } else if (n < 0.66) {
      expBored();
    } else {
      expSad();
    }
  } else if (soundVol < obj.micLevelB){
    if (s % 1 !== 0){
      return;
    }
    if (n < 0.33){
      expIdle();
    } else if (n < 0.66) {
      expHappy();
    } else {
      expEnjoyed();
    }
  } else {
    if (n < 0.2){
      expEnjoyed();
    } else {
      expOh();
    }
  }
}

// ** EXPRESSIONS **
// -----------------

function expIdle(){
  guiMouth.setValue('Idle');
  guiEyelidY.setValue(1.2);
  guiEyebrowsDelta.setValue(0);
}

function expBored(){
  guiMouth.setValue('Bored');
  guiEyelidY.setValue(1.4);
  guiEyebrowsY.setValue(0.05);
  guiEyebrowsDelta.setValue(0.5);
}

function expSad(){
  guiMouth.setValue('Sad');
  guiEyelidY.setValue(1.3);
  guiEyebrowsY.setValue(0);
  guiEyebrowsDelta.setValue(0.1);
}

function expEnjoyed(){
  guiMouth.setValue('Happy');
  guiEyelidY.setValue(1.5);
  guiEyebrowsY.setValue(0);
  guiEyebrowsDelta.setValue(-0.5);
}

function expHappy(){
  guiMouth.setValue('Happy');
  guiEyelidY.setValue(0.5);
  guiEyebrowsY.setValue(0);
  guiEyebrowsDelta.setValue(0);
}

function expOh(){
  guiMouth.setValue('Wow');
  guiEyelidY.setValue(0.5);
  guiEyebrowsY.setValue(-0.1);
  guiEyebrowsDelta.setValue(1);
}

function drawMic(){
  if (obj.micMode == 'Manual'){
    return;
  }
  
  let barH = unit;

  push();
    
    fill(255);
    let vol = round(soundVol, 1, true);
    translate(unit * 0.5, unit * 0.5);
    rect(0, 0, unit * 0.5, barH);
    fill(palette[0]);

    push();
      translate(0, barH);
      rotate(PI);
      rect(-unit * 0.5, 0, unit * 0.5, unit * 0.1 * vol);
    pop();

    push();
      translate(0, barH - unit * 0.1 * obj.micLevelA);
      strokeWeight(strokeW * 0.5);
      line(0, 0, unit * 0.5, 0);
    pop();
    push();
      translate(0, barH - unit * 0.1 * obj.micLevelB);
      strokeWeight(strokeW * 0.5);
      line(0, 0, unit * 0.5, 0);
    pop();

    textSize(unit * 0.15);
    textFont('Courier');
    fill(0);
    text(vol, unit * 0.08, unit * 0.2);
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
    if (obj.micMode == 'Real Mic' && soundVol > (obj.micLevelA * 0.5)){
      point.x = waveform[i] * obj.micSoundDisplacement * 10;
    } else {
      point.x = cos(angle);
    }
  });
}