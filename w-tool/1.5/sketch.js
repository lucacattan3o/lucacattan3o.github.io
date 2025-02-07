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
    color: 150,
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
  font = loadFont('./../common/fonts/KolkerBrush-Regular.ttf');
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
  levels.forEach(level => {
    let item = new Item(level.color);
    items.push(item);
  });
}

function draw() {
  drawRadials();
}

function drawRadials(){
  // background(bg);
  levels.forEach((level, delta) => {
    drawRadial(obj.radItems, delta, drawParticle);
  });
}

function drawRadial(fractions, delta, drawFunction){
  let slice = TWO_PI / fractions;
  push();
    translate(width * 0.5, height * 0.5);
    for (i = 0; i < fractions; i++){
      push();
        rotate(slice * i - PI * 0.5);
        push();
          drawFunction(delta);
        pop();
      pop();
    }
  pop();
}

function drawParticle(delta){
  items[delta].update();
  items[delta].draw();
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


