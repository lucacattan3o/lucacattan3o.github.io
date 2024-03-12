let fps = 60;

let colors = [];

// show debug

let obj = {
  density: 1,
  lines: 5,
  size: 0.8,
  changeDirFreq: 0.5,
  fill: false,
  speed: 7,
  background: '#000000',
  color0: "#390099",
  color1: "#9e0059",
  color2: "#ff0054",
  color3: "#ff5400",
  color4: "#ffbd00",
  showDebug: false,
};

let walker, nItemsH, nItemsW, itemSizeH, itemSizeW, aspectRatio, itemSizeMin, innerSize, offset, comDiv;
let walkerEnd = false;

function setup() {
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });
  setupLil();

  colors = [
    obj.color0,
    obj.color1,
    obj.color2,
    obj.color3,
    obj.color4,
  ];

  comDiv = gcd(width, height);

  setupGrid();
}

function setupGrid(){

  items = [];
  nItemsW = ceil(width / comDiv * obj.density);
  nItemsH = ceil(height / comDiv * obj.density);

  itemSizeW = width / nItemsW;
  itemSizeH = height / nItemsH;

  itemSizeMin = Math.min(itemSizeW, itemSizeH);
  walker = new Walker(nItemsW, nItemsH);
}

function draw() {
  background(obj.background);

  innerSize = itemSizeMin * obj.size;   
  lineSize = innerSize / obj.lines;
  offset = (itemSizeMin - innerSize) * 0.5;

  walker.draw();

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (walkerEnd){
    sketchExportEnd();
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
  localStorage.removeItem('guiSettings20');
  window.location = window.location.href.split("?")[0];
};

obj.startOver = function(){
  saveToStorage();
  window.location = window.location.href.split("?")[0];
};

obj.stopExport = function(){
  walkerEnd = true;
};

obj.saveImage = function(){
  saveCanvas("visual", "png");
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'density').min(1).max(4).step(1).name('Density');
  grid.add(obj, 'showDebug').name('Show Grid');

  const guiColors = gui.addFolder('Colors');
  guiColors.addColor(obj, 'background').name('Background');
  guiColors.addColor(obj, 'color0').name('Color 0');
  guiColors.addColor(obj, 'color1').name('Color 1');
  guiColors.addColor(obj, 'color2').name('Color 2');
  guiColors.addColor(obj, 'color3').name('Color 3');
  guiColors.addColor(obj, 'color4').name('Color 4');

  const guiWalker = gui.addFolder('Walker');
  guiWalker.add(obj, 'lines').min(1).max(5).step(1).name('N. lines');
  guiWalker.add(obj, 'size').min(0.2).max(1).step(0.1).name('Size');
  guiWalker.add(obj, 'changeDirFreq').min(0).max(1).step(0.1).name('Change Direction');
  guiWalker.add(obj, 'fill').name('Fill also single spots');

  const anim = gui.addFolder('Animation');
  anim.add(obj, 'speed').min(1).max(8).step(1).name('Speed');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear Preset');
  gui.add(obj, 'startOver').name('Play Again');

  let exportBtn = gui.add(obj, 'export').name('Export Video');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get('export') == 'true'){
    console.debug('test');
    exportBtn.disable();
    exportBtn.name('Exporting...');

    gui.add(obj, 'stopExport').name('Stop Export');
  }
  
  gui.add(obj, 'saveImage').name('Save Image');

  gui.onChange( event => {
    if (event.property == 'density'){
      setupGrid();
    }
    if (event.property.substring(0, 5) == 'color'){
      let delta = parseInt(event.property.substring(5, 6));
      colors[delta] = event.value;
    }
  });
  
  let saved = localStorage.getItem('guiSettings20');
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem('guiSettings20', JSON.stringify(preset));
};

function gcd(k, n) {
  return k ? gcd(n % k, k) : n;
}