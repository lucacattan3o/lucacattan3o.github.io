let fps = 60;

// Canvas size
let sizeW = 16.5 * 2 + 10 * 2 + 1; // cm
let sizeH = 24;   // cm
let inch  = 2.54; // cm
let dpi   = 300;  // px / in
let w, h;

let obj = {
  density: 4,
};

let itemSize;

let storageName = 'gui-noise';

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
  noLoop();

  // set itemSize based on paper height
  itemSize = height / (10 * obj.density);
}

function draw() {
  background(0);

  itemsX = height / itemSize;
  itemsY = (width / itemSize) + 1;

  for (i = 0; i < itemsY; i++){
    for (j = 0; j < itemsX; j++){
      let x = i * itemSize;
      let y = j * itemSize;
      
      push();
        translate(x, y);

        // -- Item start -- 
        let noiseScale  = 0.1;
        let noiseScale2 = 0.05;
        
        let n = noise(i * noiseScale, j * noiseScale);
        let n2 = noise(i * noiseScale2 + 100, j * noiseScale2 + 100);

        // Construction grid
        push();
          noFill();
          strokeWeight(1);
          stroke(200);
          // rect(0, 0, itemSize, itemSize);
        pop();

        // Original setup
        // drawSquare(   n, palette[2], 0.5, 0.7);
        drawSquare(   n, palette[2], 0.5, 0.6);
        drawTriangle( n, palette[0], 0.4, 0.5);
        drawArrow(    n, palette[5], 0.3, 0.4);
        drawPlus(     n, palette[4], 0.1, 0.25);

        // New layer
        if (n < 0.3 || n > 0.4){
          drawDots(     n2, palette[3], 0.2, 0.3);
          drawRhombus(  n2, palette[4], 0.7, 0.8);
          drawCircle(   n2, palette[1], 0.5 , 0.55);
        }
        

        /*
        if (nb > 0.7 && nb < 0.8){
          stroke(palette[2]);
          strokeWeight(itemSize * 0.1);
          line(itemSize * 0.1, itemSize * 0.1, itemSize * 0.9, itemSize * 0.9);
          line(itemSize * 0.1, itemSize * 0.9, itemSize * 0.9, itemSize * 0.1);
        }
        */
      
        // -- Item end -- 
      pop();
    }
  }
}  

function drawSquare(n, color, min, max){
  if (n > min && n < max){
    push();
    noStroke();
    fill(color);
    translate(itemSize * 0.5, itemSize * 0.5);
    rectMode(CENTER);
    rect(0, 0, itemSize * 0.8);
    pop();
  }
}

function drawArrow(n, color, min, max){
  if (n > min && n <= max){
    push();
    stroke(color);
    strokeWeight(itemSize * 0.1);
    line(itemSize * 0.1, itemSize * 0.1, itemSize * 0.8, itemSize * 0.1);
    line(itemSize * 0.1, itemSize * 0.1, itemSize * 0.1, itemSize * 0.8);
    line(itemSize * 0.1, itemSize * 0.1, itemSize * 0.8, itemSize * 0.8);
    pop();
  }
}

function drawTriangle(n, color, min, max){
  if (n > min && n <= max){
    push();
    fill(color);
    noStroke();
    triangle(
      itemSize * 0.9, itemSize * 0.1,
      itemSize * 0.9, itemSize * 0.9,
      itemSize * 0.1, itemSize * 0.9
    );
    pop();
  }
}

function drawPlus(n, color, min, max){
  if (n > min && n < max){
    push();
      stroke(color);
      strokeWeight(itemSize * 0.1);
      line(itemSize * 0.1, itemSize * 0.5, itemSize * 0.9, itemSize * 0.5);
      line(itemSize * 0.5, itemSize * 0.1, itemSize * 0.5, itemSize * 0.9);
    pop();
  }
}

function drawDots(n, color, min, max){
  if (n > min && n < max){
    push();
      translate(itemSize * 0.5, itemSize * 0.5);
      fill(color);
      noStroke();
      circle(0, 0, itemSize * 0.4);
    pop();
  }
}

function drawCircle(n, color, min, max){
  if (n > min && n < max){
    push();
      translate(itemSize * 0.5, itemSize * 0.5);
      noFill();
      stroke(color);
      strokeWeight(itemSize * 0.1);
      circle(0, 0, itemSize * 0.4);
    pop();
  }
}

function drawRhombus(n, color, min, max){
  if (n > min && n < max){
    push();
      translate(itemSize * 0.5, itemSize * 0.5);
      rotate(PI * 0.25);
      fill(color);
      noStroke();
      rectMode(CENTER);
      rect(0, 0, itemSize * 0.4);
    pop();
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