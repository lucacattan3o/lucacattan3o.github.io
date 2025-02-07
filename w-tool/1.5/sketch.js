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

let levels = [
  {
    color: 50,
  },
  {
    color: 100,
  },
  {
    color: 180,
  },
  {
    color: 200,
  },
  {
    color: 255,
  }
];

let items = [];

function preload(){
  font = loadFont('./../common/fonts/Raleway-Regular.ttf');
}

function setup() {
  setupCanvas();
  setupLil();
  setupLevels();
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
  noiseSeed(obj.radNoiseSeed);
  items = [];
  levels.forEach((level, delta) => {
    let item = new Item(level.color, delta);
    items.push(item);
    levels[delta].level = createGraphics(w, h);
  });
}

function draw() {
  drawRadials();
}

function drawRadials(){
  // background(bg);
  levels.forEach((level, delta) => {
    drawRadial(obj.radItems, delta, drawParticle);
    image(levels[delta].level, 0, 0, w, h);
  });
}

function drawRadial(fractions, delta, drawFunction){
  let slice = TWO_PI / fractions;

  let level = levels[delta].level;

  level.push();
  level.translate(width * 0.5, height * 0.5);
    for (i = 0; i < fractions; i++){
      level.push();
        level.rotate(slice * i - PI * 0.5);
        level.push();
          drawFunction(delta);
        level.pop();
      level.pop();
    }
  level.pop();
}

function drawParticle(delta){
  let level = levels[delta].level;
  items[delta].update();
  items[delta].draw(level);
}

function drawTest(){
  stroke(255);
  line(0, 0, width, 0);
}

function drawRect(){
  noFill();
  stroke(255);
  rect(400, 0, 200, 200);
}


