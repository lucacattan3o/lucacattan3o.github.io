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

let mPos;
let font;
let dmImage = null;
let redrawImage = false;

function preload(){
  font = loadFont('./../common/fonts/KolkerBrush-Regular.ttf');
}

function setup() {
  setupCanvas();
  setupLil();
  background(0);
  rectMode(CENTER);
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

function draw() {
  
  // drawImage()
  // drawPaint();
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
  mPos = responsiveMousePos();
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
