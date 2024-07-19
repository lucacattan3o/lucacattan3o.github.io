let fps = 30;
let w = 1080;
let h = 1080;

let obj = {
  items: 10000,
  freqM: 7,
  freqN: 2,
  vibration: 0.02
};

// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let minWalk = 0.002;

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

  itemSize = w * 0.002;
}

function setupItems(){
  items = [];
  for (let i = 0; i < obj.items; i++) {
    let pos = createVector(random(0, w), random(0, h));
    let item = new Item(pos);
    items.push(item);
  }
}

function draw() {
  background(0, 80);

  items.forEach(item => {
    item.update();
    item.draw();
  });
  // noLoop();
}