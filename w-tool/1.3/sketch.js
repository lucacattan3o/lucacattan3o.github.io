let fps = 60;

let palette = [
  "ffffff",
  "ffbe0b",
  "3a86ff",
  "5900b3",
  "000000",
];

let stereoColors = null;

let itemSize;
let items = [];
let w, h;

let mPos;
let font;
let dmImage = null;
let redrawImage = false;
// let oscM, oscN;

function preload(){
  font = loadFont('./../common/fonts/KolkerBrush-Regular.ttf');
}

function setup() {
  setupCanvas();
  setupLil();
  
  background(0);
  rectMode(CENTER);
  // setupItems();

  // Oscillator
  // oscM = new p5.Oscillator('sine');
  // oscN = new p5.Oscillator('sine');
  // oscM.amp(0.5);
  // oscN.amp(0.5);
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

function setupItems(){
  items = [];
  let space = 1 / obj.items;
  // itemSize = 1080 / obj.items;
  itemSize = w / obj.items;
  for (let i = 0; i < obj.items; i++) {
    for (let j = 0; j < obj.items; j++) {
      let x = i * space;
      let y = j * space;
      let item = new Item(x, y);
      items.push(item);
    }
  }
}

function draw() {
  let mPos = responsiveMousePos();
  
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

  if (mouseIsPressed && keyIsPressed && keyCode == 32){
    let bSize = 100;
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
      obj.brushColor[2] * 255
    ];
    fill(rgb);
    noStroke();
    circle(0, 0, fillSize);
    
    if (hard){
      for (i = 0; i < hard; i++){
        let sSize = fillSize + (i * strokeSize);
        let alpha = map(i, 0, hard, 255, 0, true);
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

function drawChladni(){
  let m = map(mPos.x, 0, w, 0.1, 10, true);
  let n = map(mPos.y, 0, h, 0.1, 10, true);
  guiM.setValue(m);
  guiN.setValue(n);

  // oscillator frequencies
  let fM = map(obj.freqM, 1, 10, 40, 440);
  let fN = map(obj.freqN, 1, 10, 40, 440);
  oscM.freq(fM);
  oscN.freq(fN);

  push();
    // translate((width - 1080) * 0.5, 0);
    items.forEach(item => {
      item.update();
      item.draw();
    });
  pop();
}
