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

let items = [];

let bg = '#000000';
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
  setupItems();
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

function setupItems(){
  noiseSeed(obj.rivNoiseSeed);
  background(bg);
  items = [];
  let offset =  height * obj.rivMargin;
  let s = (height - (offset * 2)) / obj.items;
  for (i = 0; i < obj.rivItems; i++){
    let y = i * s + offset;
    y = random(offset, height - offset);
    let item = new Item(width * 0.5, y);
    items.push(item);
  }
}

function draw() {
  // drawItems();
  // drawVolume();
  // drawTextVolume();
  drawRivers();
  // drawImage()
  // drawPaint();
  // drawRadial();
}

function drawRadial(){
  background(0);

  // definisco il raggio
  let radius = width * 0.15;
  
  // mappo la dimensione degli elementi in base
  // alla posizione del mouse sull'asse delle y
  let itemSize = map(mouseY, 0, height, width * 0.05, width * 0.1);
  
  // mappo il numero degli elementi in base
  // alla posizione del mouse sull'asse delle x
  let items = floor(map(mouseX, 0, width, 2, 50, true));
  
  // calcolo l'angolo di una porzione
  // 360 / numero degli elementi
  let slice = TWO_PI / items;
  
  push();
    translate(width * 0.5, height * 0.5);
    // rotate(frameCount * 0.01);

    for (i = 0; i < items; i++){
      push();
        rotate(slice * i);
        stroke(50, 150);
        strokeWeight(50);
        // line(0, 0, width, 0);

        push();
          translate(radius * 0.8, 0);
          noFill();
          rect(0, 0, itemSize * 4, itemSize * 5);
        pop();
      pop();
    }
    for (i = 0; i < items; i++){
      push();
        rotate(slice * i);
        stroke(200, 100);
        strokeWeight(50);
        noFill();

        push();
          translate(radius, 0);
          ellipse(0, 0, itemSize * 2, itemSize);
        pop();
      pop();
    }
    for (i = 0; i < items; i++){
      push();
        rotate(slice * i);
        noFill();
        strokeWeight(50);

        push();
          translate(radius, 0);
          stroke(250, 200);
          circle(0, 0, itemSize * 0.5);
        pop();
      pop();
    }
  pop();
  
}

function drawItems(){
  push();
  let itemsW = 5;
  let itemsH = 2;
  let itemSizeW = width / itemsW;
  let itemSizeH = height / itemsH;
  for (let j = 0; j < itemsW; j++) {
    for (let i = 0; i < itemsW; i++) {
      let x = itemSizeW * i;
      let y = itemSizeH * j;
      push();
        translate(x, y);
        translate(itemSizeW * 0.5, itemSizeH * 0.5);
        drawItem(x, y, itemSizeW, itemSizeH);
      pop();
    }
  }
  pop();
  noLoop();
}

function drawItem(x, y, itemSizeW, itemSizeH){
  let n = noise(x * obj.rivNoiseScale * 0.01, y * obj.rivNoiseScale * 0.01);
  let maxStep = 50;
  let steps = floor(maxStep * n);
  let incr = 1 / maxStep;
  let offset = 300;
  push();
  noStroke();
  // fill(255 * n);
  // rect(0, 0, itemSizeW, itemSizeH);

  for (i = 0; i < steps; i++){
    translate(- offset * incr, - offset * incr);
    let c = incr * i * 255;
    fill(c);
    rect(0, 0, itemSizeW * 1 - (itemSizeW * incr * i), itemSizeH * 1 - (itemSizeH * incr * i), 10);
  }

  pop();
}

function drawTextVolume(){

  let steps = 50;
  let incr = 1 / steps;

  push();
    translate(width * 0.5, height * 0.5);
    textAlign(CENTER, CENTER);
    fill(255);
    textStyle(BOLD);
    textSize(300);

    for (i = 0; i < steps; i++){
      translate(- 50 * incr, - 50 * incr);
      let c = incr * i * 255;
      fill(c);
      text('HELLO!', 0, 0);
    }
  pop();
}

function drawVolume(){

  let steps = 20;
  let incr = 1 / steps;

  push();
    noStroke();
    translate(width * 0.5, height * 0.5);
    for (i = 0; i < steps; i++){
      translate(- 50 * incr, - 50 * incr);
      let c = incr * i * 255;
      stroke(c);
      noFill();
      strokeWeight(50);
      circle(0, 0, 300 - (50 * i * incr));
    }

    /*
    fill(100);
    circle(-400, 0, 300);

    fill(255);
    circle(400, 0, 300);
    */
  pop();
}

function drawRivers() {
  for (i = 0; i < items.length; i++){
    let item = items[i];
    item.draw();
    item.update();
  }

  // let radius = width * 0.5 * obj.rivRadius;
  // stroke(255);
  // noFill();
  // circle(width * 0.5, height * 0.5, radius * 2);
  
  let sec = frameCount / fps;
  if (sec % 1 == 0){
    // console.debug(sec);
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
