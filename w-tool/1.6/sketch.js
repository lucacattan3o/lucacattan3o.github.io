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
  setupLevels();
  console.debug(levels);
  background(bg);
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

function setupLevels(){
  background(bg);
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
  drawRivers();
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


