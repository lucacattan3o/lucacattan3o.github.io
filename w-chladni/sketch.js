let fps = 10;
let w = 1080;
let h = 1080;

let obj = {
  items: 15000,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 0.2,
  playSynth: false,
};

// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let minWalk = 0.00005;
let oscM, oscN;

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
  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();
  setupItems();

  itemSize = w * 0.01;

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

function draw() {
  background(30, 10);

  // mouse interaction
  let mPos = responsiveMousePos();
  let m = floor(map(mPos.x, 0, w, 1, 10, true));
  let n = floor(map(mPos.y, 0, h, 1, 10, true));
  guiM.setValue(m);
  guiN.setValue(n);

  // oscillator frequencies
  let fM = map(m, 1, 10, 40, 440);
  let fN = map(n, 1, 10, 40, 440);
  oscM.freq(fM);
  oscN.freq(fN);

  items.forEach(item => {
    item.update();
    item.draw();
  });
  // noLoop();
}