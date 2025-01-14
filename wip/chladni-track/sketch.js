let fps = 60;
let w = window.innerWidth;
let h = window.innerHeight; 
let canvas; 

let obj = {
  items: 500,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 0.4,
  playSynth: false,
  fitScreen: false,
};


// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let minWalk = 0.00005;
let fM, fN, oscM, oscN;

let scaleLow = ['A1', 'B1', 'C#2', 'D2', 'E2', 'F#2', 'G#2', 'A2'];
    scaleLow = ['D3', 'G3', 'A3', 'D4'];
    scaleLow = ['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4'];
let scaleHig = ['D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5'];


let notesFqsLow = [];
let notesFqsHig = [];

let storageName = 'gui-chladni';

let palette = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  '#ffffff'
];

function preload(){
  ml5Preload();
}

function setup() {
  canvas = createCanvas(w, h);
  frameRate(fps);
  ml5Capture();
  setupLil();
  setupItems();
  setBg();
  setNotes();

  itemSize = w * 0.005;

  oscM = new p5.Oscillator('sine'); // set frequency and type
  oscN = new p5.Oscillator('sine'); // set frequency and type
  oscM.amp(0.5);
  oscN.amp(0.5);

  background(30);
}

function setupItems(){
  items = [];
  for (let i = 0; i < obj.items; i++) {
    let item = new Item();
    items.push(item);
  }
}

function setNotes(){
  for (i = 0; i < scaleLow.length; i++){
    let l = scaleLow[i];
    notesFqsLow.push(notes[l]);
  }
  for (i = 0; i < scaleHig.length; i++){
    let h = scaleHig[i];
    notesFqsHig.push(notes[h]);
  }
}

function draw() {
  drawChladni();
  push();
    translate(100, h - 200);
    scale(0.25, 0.25);
    ml5TranslateToCenter();
    ml5DrawCam();
    // drawMusicUi();

    push();
      clip(ml5CamMask);
      ml5DrawHands();
      // ml5DrawKeypoints();
    pop();
  pop();
}

function drawChladni(){
  background(30, 10);

  // tracking interactions
  let ly = 0;
  let ry = 0;
  let lAmp = 0.5;
  let rAmp = 0.5;
  let lHand = ml5GetHand('Left');
  let rHand = ml5GetHand('Right');
  if (lHand){
    ly = 1 - lHand.vals.y;
    lAmp = map(lHand.vals.amp, 0, 1, 0.1, 1, true);
  }
  if (rHand){
    ry = 1 - rHand.vals.y;
    rAmp = map(rHand.vals.amp, 0, 1, 0.1, 1, true);
  }

  fM = floor(map(ly, 0.2, 0.8, 1, notesFqsLow.length, true));
  fN = floor(map(ry, 0.2, 0.8, 1, notesFqsHig.length, true));
  guiM.setValue(fM);
  guiN.setValue(fN);

  // oscillator frequencies
  oscM.freq(notesFqsLow[fM - 1]);
  oscN.freq(notesFqsHig[fN - 1]);
  oscM.amp(lAmp);
  oscM.amp(rAmp);

  items.forEach(item => {
    item.update();
    item.draw();
  });
}

function setBg(){
  background(0);
}

function drawMusicUi(){
  let size = ml5CamHeight / scaleLow.length;
  for (let i = 0; i < scaleLow.length; i++) {
    const note = scaleLow[i];
    let x = 20;
    let y = i * size;
    push();
    translate(x, y);
    line(0, 0, 100, 0);
    pop();
  }
}

window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;  
  resizeCanvas(w, h);
  ml5Stop();
  ml5Capture();
}