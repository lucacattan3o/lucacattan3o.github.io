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
  itemSize: 0.5,
};

let itemSizeW, itemSizeH;
let items = [];

let storageName = 'gui-lube';

let paletteA = [
  "#c85bba",
  "#edb964",
  "#d4d86a",
  "#25b148",
  "#dc7d67",
];

let paletteB = [
  "#8e55af",
  "#d3d243",
  "#1292ac",
  "#49a941",
  "#e7af67",
  "#d75a99",
  "#ada0a4"
];

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

  let index = 0;
  for (i = 0; i < obj.itemsX; i++){
    for (j = 0; j < obj.itemsY; j++){
      let x = i * itemSizeW;
      let y = j * itemSizeH;
      let item = new Item(x, y, index);
      items.push(item);
      index++;
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < items.length; i++) {
    items[i].draw();
  }
}  

