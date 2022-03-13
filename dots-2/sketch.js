let dots = [];

let dotSize = 20;
let dotOffset = 2;
let canvasOffsetX = false;
let canvasOffsetY = false;
let first = true;

let decay = 0.95;
let dividedBy = 4;

let minVal = 0;
let maxVal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  start();
}

function start(){
  dots = [];
  
  canvasOffsetX = (width % dotSize) / 2;
  canvasOffsetY = (height % dotSize) / 2;
  
  for (let x = 0; x < width - dotSize; x += dotSize) {
    let cols = [];
    for (let y = 0; y < height - dotSize; y += dotSize) {
      let dotX = canvasOffsetX + x + (dotSize / 2) + (dotOffset / 2);
      let dotY = canvasOffsetY + y + (dotSize / 2) + (dotOffset / 2);
      let b = new Dot(dotX, dotY, dotSize, dotOffset);
      cols.push(b);
    }
    dots.push(cols);
  }
}

function draw() {
  background(0);
  for (let x = 0; x < dots.length; x++) {
    let col = dots[x];
    for (let y = 0; y < col.length; y++) {
      
      // let leftActive = false;
      // if (dots[x - 1] !== undefined && dots[x - 1][y] !== undefined && dots[x - 1][y].isActive){
      //   leftActive = true;
      // }
      let rightActive = false;
      if (dots[x + 1] !== undefined && dots[x + 1][y] !== undefined && dots[x + 1][y].isActive){
        rightActive = true;
      }
      // let topActive = false;
      // if (dots[x] !== undefined && dots[x][y - 1] !== undefined && dots[x][y - 1].isActive){
      //   topActive = true;
      // }
      // let bottomActive = false;
      // if (dots[x] !== undefined && dots[x][y + 1] !== undefined && dots[x][y + 1].isActive){
      //   bottomActive = true;
      // }
      // 
      if (rightActive){
        dots[x][y].setActive();  
      }

      dots[x][y].draw();
    }
  }
}

function clickOnDot(){
  for (let x = 0; x < dots.length; x++) {
    let col = dots[x];
    for (let y = 0; y < col.length; y++) {
      if (dots[x][y].isMe(mouseX, mouseY)){
        dots[x][y].setActive(1);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  start();
}

function mouseClicked(fxn){
  clickOnDot();
}

function mouseDragged(fxn){
  clickOnDot();
}