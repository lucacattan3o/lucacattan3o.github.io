let fps = 30;

// Canvas size
let sizeW = 16.5; // cm
let sizeH = 24;   // cm
let inch  = 2.54; // cm
let dpi   = 300;  // px / in
let w, h;
let itemSizeMin;

let obj = {
  itemsX: 16,
  itemsY: 16,
  // Palette A
  palAitems: 16,
  palAhueOffset: 0,
  palAsat: 80,
  palAbri: 100,
  // Palette B
  palBitems: 16,
  palBhueOffset: 0,
  palBsat: 70,
  palBbri: 40,
  // Grid
  showGrid: false,
  useRandom: false,
  itemSize: 0.5,
  bgSize: 0.8,
  strokeSize: 0.5,
  bg: '#000000',
  line: '#ffffff',
  randomSize: false,
};

let itemSizeW, itemSizeH;
let items = [];

let storageName = 'gui-lube';

let paletteA = [];
let paletteB = [];

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
  colorMode(HSB, 360, 100, 100);

  setupLil();
  setupColors();
  setupItems();
}

function setupItems(){
  items = [];
  itemSizeW = width / obj.itemsX;
  itemSizeH = height / obj.itemsY;
  itemSizeMin = Math.min(itemSizeW, itemSizeH);

  index = 0;
  for (j = 0; j < obj.itemsY; j++){
    for (i = 0; i < obj.itemsX; i++){
      let x = i * itemSizeW;
      let y = j * itemSizeH;
      let item = new Item(x, y, i, j, index);
      items.push(item);
      index++;
    }
  }
  if (obj.useRandom){
    setColors();
  }
}

function setupColors(){
  console.debug('setupColors');
  paletteA = [];
  let sliceA = 360 / obj.palAitems;
  for (let i = 0; i < obj.palAitems; i++) {
    let hue = (sliceA * i + obj.palAhueOffset) % 360;
    let c = color(hue, obj.palAsat, obj.palAbri);
    paletteA.push(c);
  }

  paletteB = [];
  let sliceB = 360 / obj.palBitems;
  for (let i = 0; i < obj.palBitems; i++) {
    let hue = (sliceB * i + obj.palBhueOffset) % 360;
    let c = color(hue, obj.palBsat, obj.palBbri);
    paletteB.push(c);
  }
}

function setColors(){
  console.debug('-- setColors -- ');
  console.debug('Tot: ' + items.length);
  // shallow copy
  let itemsCopy = JSON.parse(JSON.stringify(items));
  // numero di elementi di un solo colore
  let colTot = floor(items.length / paletteA.length);
  let out = items.length % colTot;
  if (out){
    console.debug('Resto: ' + out + '(colori random)');
  }
  for (let c = 0; c < paletteA.length; c++) {
    for (let i = 0; i < colTot; i++) {
      let ii = floor(random(0, itemsCopy.length));
      // get index to color the real item
      let item = itemsCopy[ii];
      let index = item.index;
      items[index].setColorA(c);

      // il colore secondario è sempre preso in sequenze
      let bi = i % paletteB.length;
      items[index].setColorB(bi);
      
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

