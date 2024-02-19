let fps = 60;

let obj = {
  itemsX: 9,
  itemsY: 16,
};

let itemSizeH, itemSizeW, aspectRatio, itemSizeMin;

function setup() {
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });
  setupLil();
}

function draw() {
  background(0);
  itemSizeW = width / obj.itemsX;
  itemSizeH = height / obj.itemsY;
  
  aspectRatio = itemSizeW / itemSizeH;
  itemSizeMin = Math.min(itemSizeW, itemSizeH);

  for (let i = 0; i < obj.itemsX; i++) {
    for (let j = 0; j < obj.itemsY; j++) {
      let x = i * itemSizeW;
      let y = j * itemSizeH;
      push();
        translate(x, y);
        drawItem(i, j);
      pop();
    }
  }
}  

function drawItem(i, j){

  // test scaling
  if (aspectRatio > 1){
    scale(aspectRatio, 1);
  }
  if (aspectRatio < 1){
    scale(1, 1 / aspectRatio);
  }

  let n = noise(i * 0.1, j * 0.1);

  noFill();
  noStroke();
  fill(n * 255);
  rect(0, 0, itemSizeMin);
  
  // translate(itemSizeMin * 0.5, itemSizeMin * 0.5);
  // fill(255);
  // circle(0, 0, itemSizeMin);
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
  grid.add(obj, 'itemsX').min(1).max(20).step(1).name('Items X');
  grid.add(obj, 'itemsY').min(1).max(20).step(1).name('Items Y');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'export').name('Export video');
  gui.add(obj, 'clearStorage').name('Clear');

  // gui.onChange( event => {});
  
  let saved = localStorage.getItem('guiSettings19');
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem('guiSettings19', JSON.stringify(preset));
};