let fps = 30;

// Canvas size
let sizeW = 16.5; // cm
let sizeH = 24;   // cm
let inch  = 2.54; // cm
let dpi   = 300;  // px / in
let w, h;
let itemSizeMin;

let obj = {
  itemsX: 10,
  itemsY: 20,
  itemSize: 0.9,
};

let itemSizeW, itemSizeH;
let items = [];

let storageName = 'gui-lube';

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
  w = floor(sizeW * dpi / inch);
  h = floor(sizeH * dpi / inch);

  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();
  setupItems();
}

function setupItems(){
  items = [];
  itemSizeW = width / obj.itemsX;
  itemSizeH = height / obj.itemsY;
  itemSizeMin = Math.min(itemSizeW, itemSizeH);

  for (i = 0; i < obj.itemsX; i++){
    for (j = 0; j < obj.itemsY; j++){
      let x = i * itemSizeW;
      let y = j * itemSizeH;
      
      let item = new Item(x, y);
      items.push(item);
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < items.length; i++) {
    items[i].draw();
  }
}  

