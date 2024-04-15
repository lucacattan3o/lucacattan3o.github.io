let fps = 30;
let itemSize;
let cI = 0;

let colors = [
  "#9b5de5",
  "#f15bb5",
  "#fee440",
  "#00bbf9",
  "#00f5d4"
];

// parameters
// [x] speed
// [ ] radius
// [ ] music
// [ ] hue start
// [ ] hue end
// speed of all parameters

let hue;

let obj = {
  speedX: 4,
  speedY: 3,
};

let music, amp, fft, spec;
let smooth = 0.9;

function preload(){
  music = loadSound('music/fabio-servolo-2.mp3', function(){
    amp = new p5.Amplitude();
    amp.setInput(music);
    
    fft = new p5.FFT(smooth, 16);
    fft.setInput(music);
  });
}

function setup() {
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });
  background(0);
  itemSize = width * 0.5;
  setupLil();
  background(0);
}

function draw() {
  background(0, 3); 

  spec = fft.analyze();
  
  let speedX = 0.25 / (5 - obj.speedX);
  let speedY = 0.25 / (5 - obj.speedY);

  bx = getLoopBounce(speedX);
  by = getLoopBounce(speedY);
  
  br = getLoopBounce(0.5 * 0.5 * 0.5, 0.5);
  // br = getMusicEnergy(2);

  // br = 0;

  bh = getLoopBounce(0.5 * 0.5 * 0.5);

  // nice
  hue = map(bh, -1, 1, 180, 300, true);
  // with yellow
  hue = map(bh, -1, 1, 360 + 60, 300, true);
  hue = hue % 360;

  or = itemSize * 0.5 * br;
  let sx = itemSize * getMusicEnergy(2);
  let sy = itemSize * 2 * getMusicEnergy(7);
  
  x = width  * 0.2 * bx;
  y = height * 0.3 * by;
  
  push();
    translate(width * 0.5, height * 0.5);
    translate(x, y);
    noFill();  
    colorMode(HSB, 360, 100, 100);
    fill(hue, 100, 100);
    // noStroke();
    stroke(255);
    strokeWeight(itemSize * 0.005);
    circle(0, 0, itemSize * 0.4 + or);

    // noFill();
    // stroke(hue, 100, 100);
    // rectMode(CENTER);
    // rotate(PI * 0.01 * frameCount);
    // rect(0, 0, sx * 2, sy * 2, 0);

  pop();
  
  
  let sec = frameCount / fps;
  if (sec % 4 == 0){
    cI++;
    if (cI >= colors.length){
      cI = 0;
    }
  }

  if (sec % 1 == 0){
    // console.debug(sec);
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 16 * fps){
    sketchExportEnd();
  }
  
  // drawBars();
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
  localStorage.removeItem('guiSettings21');
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

  const gOsc = gui.addFolder('Oscillation');
  gOsc.add(obj, 'speedX').min(1).max(4).step(1).name('Speed X');
  gOsc.add(obj, 'speedY').min(1).max(4).step(1).name('Speed Y');

  // const guiColors = gui.addFolder('Colors');
  // guiColors.addColor(obj, 'background').name('Background');
  // guiColors.addColor(obj, 'color0').name('Color 0');
  // guiColors.addColor(obj, 'color1').name('Color 1');
  // guiColors.addColor(obj, 'color2').name('Color 2');
  // guiColors.addColor(obj, 'color3').name('Color 3');
  // guiColors.addColor(obj, 'color4').name('Color 4');

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
    switch (event.property) {
      case 'speedY':
      case 'speedX':
        background(0);
        break;
    
      default:
        break;
    }
  });
  
  let saved = localStorage.getItem('guiSettings21');
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem('guiSettings21', JSON.stringify(preset));
};

function keyPressed() {  
  if (keyCode === 32) {
    if (!music.isLooping()){
      music.loop();
      // sketchRecordStart();
    } else {
      music.stop();
      // sketchRecordStop();
    }  
  }
}
