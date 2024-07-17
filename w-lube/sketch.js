let fps = 60;

// Canvas size
let sizeW = 16.5; // cm
let sizeH = 24;   // cm
let inch  = 2.54; // cm
let dpi   = 300;  // px / in
let w, h;

let obj = {
  density: 4,
};

let itemSize;

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
  // palette = shuffle(palette);
}

function draw() {
  background(0);

  // set itemSize based on paper height
  itemSize = height / (10 * obj.density);

  itemsX = height / itemSize;
  itemsY = (width / itemSize) + 1;

  for (i = 0; i < itemsY; i++){
    for (j = 0; j < itemsX; j++){
      let x = i * itemSize;
      let y = j * itemSize;
      
      push();
        translate(x, y);

        // Construction grid
        push();
          noFill();
          strokeWeight(2);
          stroke(200);
          rect(0, 0, itemSize, itemSize);
        pop();

        push();
          translate(itemSize * 0.5, itemSize * 0.5);
          circle(0, 0, itemSize);
        pop();

      pop();
    }
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
  localStorage.removeItem(storageName);
  window.location = window.location.href.split("?")[0];
};

obj.startOver = function(){
  saveToStorage();
  window.location = window.location.href.split("?")[0];
};

obj.stopExport = function(){
  sketchExportEnd();
};

obj.saveImage = function(){
  let fileName = getFileName('visual');
  saveCanvas(fileName, 'png');
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'density').min(1).max(10).step(1).name('Density');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear Preset');
  gui.add(obj, 'startOver').name('Play Again');

  //let exportBtn = gui.add(obj, 'export').name('Export Video');
  //const queryString = window.location.search;
  //const urlParams = new URLSearchParams(queryString);
  //if (urlParams.get('export') == 'true'){
  //  console.debug('test');
  //  exportBtn.disable();
  //  exportBtn.name('Exporting...');
  //
  //  gui.add(obj, 'stopExport').name('Stop Export');
  //}
  
  gui.add(obj, 'saveImage').name('Save Image');

  // gui.onChange( event => {});
  
  let saved = localStorage.getItem(storageName);
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem(storageName, JSON.stringify(preset));
};

function getFileName(prefix){
  let now = new Date();
  return prefix + '-' + now.getMonth() + '-' + now.getDay() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();
}