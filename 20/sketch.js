let fps = 60;

let obj = {
  itemsX: 9,
  itemsY: 16,
  lines: 5,
};

let colors = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff"
];

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
  lineSize = itemSizeMin / obj.lines;

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
  let nInt = floor(n * 10);

  noFill();
  noStroke();
  // fill(n * 255);
  // rect(0, 0, itemSizeMin);

  translate(itemSizeMin * 0.5, itemSizeMin * 0.5);
  push();
  

  if (nInt == 4){
    drawItemLines();
  }
  if (nInt == 7){
    rotate(PI * 1.5);
    drawItemLines();
  }

  if (nInt == 3){
    drawItemCurve();
  }
  if (nInt == 5){
    rotate(HALF_PI);
    drawItemCurve();
  }
  if (nInt == 6){
    rotate(PI);
    drawItemCurve();
  }
  if (nInt == 2){
    rotate(PI * 1.5);
    drawItemCurve();
  }

  pop();

  fill(255);
  textSize(itemSizeMin * 0.2);
  // text(nInt, 0, 0);
  
  // translate(itemSizeMin * 0.5, itemSizeMin * 0.5);
  // fill(255);
  // circle(0, 0, itemSizeMin);
}

function drawItemLines(){
  translate(-itemSizeMin * 0.5, -itemSizeMin * 0.5);
  for (let i = 0; i < obj.lines; i++) {
    let x = i * lineSize;
    push();
      translate(x, 0);
      fill(colors[i]);
      rect(0, 0, lineSize, itemSizeMin);
    pop();
  }
}

function drawItemCurve(){
  translate(-itemSizeMin * 0.5, -itemSizeMin * 0.5);
  for (let i = 0; i < obj.lines; i++) {
    let ii = obj.lines - i;
    let radius = ii * lineSize * 2;
    fill(colors[ii - 1]);
    arc(0, 0, radius, radius, 0, HALF_PI);
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
  grid.add(obj, 'itemsX').min(1).max(20).step(1).name('Items X');
  grid.add(obj, 'itemsY').min(1).max(20).step(1).name('Items Y');
  grid.add(obj, 'lines').min(1).max(5).step(1).name('Lines');


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