let fps = 60;

let obj = {
  density: 2,
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
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  let now = new Date();
  sketchExportSetup({
    fps: fps,
    name: 'video-' + now.getMonth() + '-' + now.getDay() + '-' + now.getHours() + '-' + now.getMinutes(),
  });
  setupLil();
  // palette = shuffle(palette);
}

function draw() {
  background(0);

  let itemsX = 9 * obj.density;
  let itemsY = 16 * obj.density;
  
  itemSizeW = width  / itemsX;
  itemSizeH = height / itemsY;

  mPos = responsiveMousePos();

  let offsetX = -mPos.x * 0.001;
  offsetX = frameCount * 0.005;
  // offsetX = 0;
  let offsetY = -mPos.y * 0.001;
  offsetY = frameCount * 0.005;
  // offsetY = 0;

  for (i = 0; i < itemsX + 20; i++){
    for (j = 0; j < itemsY; j++){
      let x = i * itemSizeW;
      let y = j * itemSizeH;
      
      push();
        translate(x, y);

        // -- Item start -- 
        let noiseScale = 0.1;
        // let z = map(getLoopBounce(0.125), -1, 1, 0, 1); 
        let n = noise(i * noiseScale + offsetX, j * noiseScale + offsetY); 
        
        let nb = noise(
          (i + 100) * noiseScale + offsetX,
          (j + 100) * noiseScale + offsetY
        );
        
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
            stroke(palette[5]);
            strokeWeight(itemSizeW * 0.1);
            line(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.8, itemSizeH * 0.1);
            line(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.1, itemSizeH * 0.8);
            line(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.8, itemSizeH * 0.8);
          }
          if (n > 0.4 && n <= 0.5){
            // triangle
            fill(palette[0]);
            noStroke();
            triangle(
              itemSizeW * 0.9, itemSizeH * 0.1,
              itemSizeW * 0.9, itemSizeH * 0.9,
              itemSizeW * 0.1, itemSizeH * 0.9
            );
          }
          if (n > 0.5 && n < 0.7){
            // square
            fill(palette[2]);
            noStroke();
            rect(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.8, itemSizeH * 0.8);
          }


          if (n > 0.1 && n < 0.2){
            push();
            // dots
            translate(itemSizeW * 0.5, itemSizeH * 0.5);
            fill(palette[4]);
            noStroke();
            // circle(0, 0, itemSizeW * 0.5);
            pop();
          }

          if (n > 0.1 && n < 0.25){
            push();
              // plus
              stroke(palette[4]);
              strokeWeight(itemSizeW * 0.1);
              line(itemSizeW * 0.1, itemSizeH * 0.5, itemSizeW * 0.9, itemSizeH * 0.5);
              line(itemSizeW * 0.5, itemSizeH * 0.1, itemSizeW * 0.5, itemSizeH * 0.9);
            pop();
          }

          /*
          if (nb > 0.7 && nb < 0.8){
            stroke(palette[2]);
            strokeWeight(itemSizeW * 0.1);
            line(itemSizeW * 0.1, itemSizeH * 0.1, itemSizeW * 0.9, itemSizeH * 0.9);
            line(itemSizeW * 0.1, itemSizeH * 0.9, itemSizeW * 0.9, itemSizeH * 0.1);
          }
          */
          
      
        pop();
      
        // -- Item end -- 
      pop();
    }
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 15 * fps){
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
  saveCanvas("visual", "png");
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'density').min(1).max(5).step(1).name('Density');

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