let fps = 30;
let w = window.innerWidth;
let h = window.innerHeight; 
let canvas; 

let obj = {
  items: 5000,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 0.3,
  playSynth: false,
  fitScreen: true,
};

let camA = 0.1;
let camB = 0.1;

// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let minWalk = 0.00005;
let fM, fN, oscM, oscN;

let scaleLow = [
  'A1', 'B1', 'C#2', 'D2', 'E2', 'F#2', 'G#2', 'A2'
];
let scaleHig = [
  'A3', 'B3', 'C#5', 'D4', 'E4', 'F#4', 'G#4', 'A4'
];
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

let mPos;

function setup() {
  canvas = createCanvas(w, h);
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  captureWebcam();
  setupLil();
  setupItems();
  setBg();
  setNotes();

  itemSize = w * 0.005;

  oscM = new p5.Oscillator('sine'); // set frequency and type
  oscN = new p5.Oscillator('sine'); // set frequency and type
  oscM.amp(0.5);
  oscN.amp(0.5);
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
    let h = scaleHig[i];
    notesFqsLow.push(notes[l]);
    notesFqsHig.push(notes[h]);
  }
}

function draw() {
  drawChladni();
  drawCam();
  drawFeedback();
}

function drawChladni(){
  background(30, 10);

  // tracking interactions
  let m = floor(map(camA, 0.2, 0.8, 1, 10, true));
  let n = floor(map(camB, 0.2, 0.8, 1, 10, true));
  guiM.setValue(m);
  guiN.setValue(n);

  // oscillator frequencies
  fM = floor(map(m, 1, 10, 0, notesFqsLow.length - 1));
  fN = floor(map(n, 1, 10, 0, notesFqsHig.length - 1));
  oscM.freq(notesFqsLow[fM]);
  oscN.freq(notesFqsHig[fN]);

  items.forEach(item => {
    item.update();
    item.draw();
  });
}

function setBg(){
  background(0);
}

window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;  
  resizeCanvas(w, h);
}