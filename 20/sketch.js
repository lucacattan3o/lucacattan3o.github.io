let fps = 60;

let colors = [
  "#ffbe0b",
  // "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff"
];

let obj = {
  density: 1,
  lines: colors.length,
};

let items, nItemsH, nItemsW, itemSizeH, itemSizeW, aspectRatio, itemSizeMin, comDiv;

function setup() {
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });
  setupLil();

  comDiv = gcd(width, height);

 setupGrid();
}

function setupGrid(){
  items = [];
  nItemsW = width / comDiv * obj.density;
  nItemsH = height / comDiv * obj.density;

  itemSizeW = width / nItemsW;
  itemSizeH = height / nItemsH;

  itemSizeMin = Math.min(itemSizeW, itemSizeH);
  lineSize = itemSizeMin / obj.lines;

  for (let i = 0; i < nItemsW; i++) {
    for (let j = 0; j < nItemsH; j++) {
      let item = new Item(i, j);
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

// ** LIL **
// ---------

let GUI = lil.GUI;
let gui;

obj.savePreset = function() {
  saveToStorage();
};

obj.loadPreset = function() {
  gui.load(preset);
};

obj.export = function() {
  saveToStorage();
  let url = window.location.href;    
  if (url.indexOf('?') > -1){
    url += '&export=true';
  } else {
    url += '?export=true';
  }
  window.location.href = url;
};

obj.clearStorage = function() {
  localStorage.removeItem('guiSettings19');
  window.location = window.location.href.split("?")[0];
};

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'density').min(1).max(5).step(1).name('Density');
  grid.add(obj, 'lines').min(1).max(colors.length).step(1).name('Lines');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'export').name('Export video');
  gui.add(obj, 'clearStorage').name('Clear');

  gui.onChange( event => {
    if (event.property == 'density' || event.property == 'lines'){
      setupGrid();
    }
  });
  
  let saved = localStorage.getItem('guiSettings19');
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem('guiSettings19', JSON.stringify(preset));
};

function gcd(k, n) {
  return k ? gcd(n % k, k) : n;
}