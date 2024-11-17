let fps = 30;
let w = window.innerWidth;
let h = window.innerHeight; 
let canvas; 

let obj = {
  items: 1000,
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
  // sketchExportSetup({
  //   fps: fps,
  //   name: getFileName('video'),
  // });
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
  // drawChladni();
  ml5DrawCam();
  // ml5DrawKeypoints();
  ml5DrawHands();
  // drawFeedback();
}

function drawChladni(){
  background(30, 10);

  // tracking interactions
  fM = floor(map(camA, 0.2, 0.8, 1, notesFqsLow.length, true));
  fN = floor(map(camB, 0.2, 0.8, 1, notesFqsHig.length, true));
  guiM.setValue(fM);
  guiN.setValue(fN);

  // oscillator frequencies
  // fM = floor(map(m, 1, 10, 0, notesFqsLow.length - 1));
  // fN = floor(map(n, 1, 10, 0, notesFqsHig.length - 1));
  oscM.freq(notesFqsLow[fM - 1]);
  oscN.freq(notesFqsHig[fN - 1]);

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
  ml5Stop();
  ml5Capture();
}