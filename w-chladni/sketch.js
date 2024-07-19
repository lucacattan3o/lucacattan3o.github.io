let fps = 30;
let w = 1080;
let h = 1080;

let obj = {
  items: 3000,
  freqM: 2,
  freqN: 5,
  vibration: 5
};

let itemSize;
let items = [];

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
  background(0, 10);

  items.forEach(item => {
    item.update();
    item.draw();
  });
}