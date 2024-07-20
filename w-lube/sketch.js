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
  showGrid: false,
  itemSize: 0.5,
  strokeSize: 0.5,
  bg: '#000000',
  line: '#ffffff',
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
  setColors();
}

function setColors(){
  console.debug('setColors');
  console.debug('Tot: ' + items.length);
  // shallow copy
  let itemsCopy = JSON.parse(JSON.stringify(items));
  // numero di elementi di un solo colore
  let colTot = floor(items.length / paletteA.length);
  for (let c = 0; c < paletteA.length; c++) {
    for (let i = 0; i < colTot; i++) {
      let ii = floor(random(0, itemsCopy.length));
      // get index to color the real item
      let item = itemsCopy[ii];
      let index = item.index;
      items[index].setColor(c);
      itemsCopy.splice(ii, 1);
    }
  }
}

function draw() {
  background(obj.bg);
  for (let i = 0; i < items.length; i++) {
    items[i].draw();
  }
}  

