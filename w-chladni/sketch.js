let fps = 10;
let w = 1080;
let h = 1080;

let obj = {
  items: 10000,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 0.3,
};

// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let minWalk = 0.0001;

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
}

function setupItems(){
  items = [];
  for (let i = 0; i < obj.items; i++) {
    let item = new Item();
    items.push(item);
  }
}

function draw() {
  background(30, 100);

  items.forEach(item => {
    item.update();
    item.draw();
  });
  // noLoop();
}