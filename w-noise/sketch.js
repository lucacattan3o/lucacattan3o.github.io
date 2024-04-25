let fps = 60;

let obj = {
  itemsX: 9 * 2,
  itemsY: 16 * 2,
};

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
  createCanvas(1080, 1980);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });
  setupLil();

  palette = shuffle(palette);
}

function draw() {
  background(0);
  
  itemSizeW = width  / obj.itemsX;
  itemSizeH = height / obj.itemsY;

  mPos = responsiveMousePos();

  let offsetX = -mPos.x * 0.001;
  offsetX = frameCount * 0.005;
  let offsetY = -mPos.y * 0.001;

  for (i = 0; i < obj.itemsX + 20; i++){
    for (j = 0; j < obj.itemsY; j++){
      let x = i * itemSizeW;
      let y = j * itemSizeH;
      
      push();
        translate(x, y);

        // -- Item start -- 
        let noiseScale = 0.1;
        // let z = map(getLoopBounce(0.125), -1, 1, 0, 1); 
        let n = noise(i * noiseScale + offsetX, j * noiseScale + offsetY);   
        
        // Construction grid
        push();
          noFill();
          strokeWeight(1);
          stroke(200);
          // rect(0, 0, itemSizeW, itemSizeH);
        pop();
        
        push();
          if (n > 0.3 && n <= 0.4){
            // arrow
            stroke(palette[1]);
            strokeWeight(itemSizeW * 0.1);
            line(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.8, itemSizeH * 0.1);
            line(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.1, itemSizeH * 0.8);
            line(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.8, itemSizeH * 0.8);
          }
          if (n > 0.4 && n <= 0.5){
            // triangle
            fill(palette[2]);
            stroke(0);
            triangle(
              itemSizeW, 0,
              itemSizeW, itemSizeH,
              0, itemSizeH
            );
          }
          if (n > 0.5 && n < 0.7){
            // square
            fill(palette[3]);
            stroke(0);
            rect(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.8, itemSizeH * 0.8);
          }
      
        pop();
      
        // -- Item end -- 
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
  walkerEnd = true;
};

obj.saveImage = function(){
  saveCanvas("visual", "png");
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'itemsX').min(1).max(40).step(1).name('Items X');
  grid.add(obj, 'itemsY').min(1).max(40).step(1).name('Items Y');

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