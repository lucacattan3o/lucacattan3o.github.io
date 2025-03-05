let fps = 60;

let palette = [
  "ffffff",
  "ffbe0b",
  "3a86ff",
  "5900b3",
  "000000",
];

let stereoColors = null;
let w, h;

let bg = '#000000';
let mPos;
let font;
let dmImage = null;
let redrawImage = false;
let mouseIsPressedManually = false;

let sizeW = 35;   // cm
let sizeH = 15;   // cm
let inch = 2.54;  // cm
let dpi = 300;    // px / in


let levels = []

let items = [];

function preload(){
  font = loadFont('./../common/fonts/Raleway-Italic.ttf');
}

function setup() {
  setupCanvas();
  setupLil();
  setupStereo();
  background(bg);
  setupDepth();
  rectMode(CENTER);

  // Ottieni il canvas
  let canvas = document.querySelector('canvas');

  // Aggiungi l'event listener per 'mousedown'
  canvas.addEventListener('mousedown', function(event) {
    mouseIsPressedManually = true;
  });

  // Aggiungi l'event listener per 'mouseup'
  canvas.addEventListener('mouseup', function(event) {
    mouseIsPressedManually = false;
  });
}

function setupDepth(){
  background(bg);
  if (obj.depthMode == 'Rivers'){
    setupLevels();
  } else {

  }
}

function setupCanvas(){
  w = floor(obj.canvasW * obj.canvasMulty);
  h = floor(obj.canvasH * obj.canvasMulty);
  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);

  let img = document.getElementById('stereogram');
  img.width = w;
  img.height = h;
}

function setupLevels(){
  levels = [];
  let tot = obj.rivLevels;
  if (tot == 1){
    levels.push({
      color: 255
    });
  } else {
    for (let i = 0; i < tot; i++) {
      let col = map(i, 0, tot - 1, 50, 255, true);
      levels.push({
        color: col
      });
    }
  }

  noiseSeed(obj.rivNoiseSeed);
  items = [];
  levels.forEach((level, delta) => {
    for (let i = 0; i < obj.rivItems; i++) {
      let item = new Item(level.color, i, delta);
      items.push(item);
    }
    levels[delta].level = createGraphics(w, h);
  });
}

function draw() {
  if (obj.depthMode == 'Rivers'){
    drawRivers();
  }
  if (obj.depthMode == 'Image'){
    drawImage();
  }
  if (obj.depthMode == 'Paint'){
    drawPaint();
  }
  if (obj.depthMode == 'Well'){
    drawWell();
  }
}

function drawImage(){
  if (dmImage){
    if (redrawImage){
      background(0);
      push();
      translate(w * 0.5, h * 0.5);
      translate(w * obj.dmX, h * obj.dmY);
      scale(obj.dmScale);
      image(dmImage, -dmImage.width * 0.5, -dmImage.height * 0.5);
      pop();
      redrawImage = false;
    }
  }
}

function drawPaint(){
  let mPos = responsiveMousePos();

  if (mouseIsPressedManually){
    let bSize = width * 0.05;
    let fillSize = bSize * obj.brushSize;
    let strokeSize = 1;
    // console.debug('Original: ' + fillSize);
    // da 0 alla dimensione del brush
    let hard = (1 - obj.brushHard) * fillSize;
    // console.debug('Hard: ' + hard);
    // riduco la dimensione del fill
    fillSize = fillSize - hard;
    // console.debug('Size: ' + fillSize);
    
    push();
    translate(mPos.x, mPos.y);
    let rgb = [
      obj.brushColor[0] * 255,
      obj.brushColor[1] * 255,
      obj.brushColor[2] * 255,
      95
    ];
    fill(rgb);
    noStroke();
    circle(0, 0, fillSize);
    
    if (hard){
      for (i = 0; i < hard; i++){
        let sSize = fillSize + (i * strokeSize);
        let alpha = map(i, 0, hard, 50, 0, true);
        let rgba = [
          obj.brushColor[0] * 255,
          obj.brushColor[1] * 255,
          obj.brushColor[2] * 255,
          alpha,
        ];
        strokeWeight(strokeSize);
        stroke(rgba);
        noFill();
        circle(0, 0, sSize);
      }
    }
    pop();
  }
}

function drawWell(){
  background(bg);
  push();
    translate(w * 0.5, h * 0.5);
    
    let steps = obj.wellSteps;
    let rad1 = obj.wellRadius * height * 0.5;
    let rad2 = rad1 + (obj.wellDepth * height * 2);
    let deltaRadius = rad2 - rad1;
    let step = deltaRadius / steps;
    let incr = 1 / steps;
    for (let i = 0; i < steps; i++) {
      let ii = steps - i - 1;
      let r = rad1 + (step * ii);
      noStroke();
      fill(255 * incr * i);
      circle(0, 0, r);
    }
  pop();
}

function drawRivers(){
  items.forEach((item) => {
    item.update();
    item.draw();
  });
  levels.forEach((level) => {
    image(level.level, 0, 0, w, h);
  });
}


