let fps = 10;
let w = 1080;
let h = 1080;

let obj = {
  items: 15000,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 0.2,
};

// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let minWalk = 0.00005;

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
  background(30, 10);

  // let bounce = (getLoopBounceLinear(0.25 * 0.25 * 0.25) + 1) * 0.5;
  // obj.freqM = (map(bounce, 0, 1, 1, 10, true));
  let mPos = responsiveMousePos();
  let m = map(mPos.x, 0, w, 1, 10, true);
  let n = map(mPos.y, 0, h, 1, 10, true);
  guiM.setValue(floor(m));
  guiN.setValue(floor(n));
  // obj.freqM = m;
  // obj.freqN = n;
  // console.debug(obj.freqM);

  items.forEach(item => {
    item.update();
    item.draw();
  });
  // noLoop();
}