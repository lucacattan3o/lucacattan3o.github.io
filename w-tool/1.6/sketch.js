let fps = 30;

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

let sizeW = 35;   // cm
let sizeH = 15;   // cm
let inch = 2.54;  // cm
let dpi = 300;    // px / in

let levels = [
  // {
  //   color: 50,
  // },
  // {
  //   color: 100,
  // },
  // {
  //   color: 180,
  // },
  // {
  //   color: 200,
  // },
  {
    color: 255,
  }
];

let items = [];

function preload(){
  font = loadFont('./../common/fonts/Raleway-Italic.ttf');
}

function setup() {
  setupCanvas();
  setupLil();
  background(bg);
  setupDepth();
  rectMode(CENTER);
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
  // drawSample();
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

function drawSample(){
  push();
    translate(w * 0.5, h * 0.5);
    
    noStroke();
    fill(80);
    circle(0, 0, h * 0.7);
    fill(120);
    circle(0, 0, h * 0.6);
    fill(180);
    circle(0, 0, h * 0.5);
    fill(255);
    circle(0, 0, h * 0.4);

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


