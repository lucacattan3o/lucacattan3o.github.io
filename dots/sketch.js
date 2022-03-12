let dots = [];

let buffer = [];

let dotSize = 20;
let dotOffset = 1;
let canvasOffsetX = false;
let canvasOffsetY = false;
let first = true;

let decay = 0.95;
let dividedBy = 4;

let minVal = 0;
let maxVal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
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
      let b = new Dot(dotX, dotY, dotSize - dotOffset);
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
      
      let leftValue = 0;
      if (dots[x - 1] !== undefined && dots[x - 1][y] !== undefined){
        leftValue = dots[x - 1][y].prevColor;
      }
      let rightValue = 0;
      if (dots[x + 1] !== undefined && dots[x + 1][y] !== undefined){
        rightValue = dots[x + 1][y].prevColor;
      }

      let topValue = 0;
      if (dots[x] !== undefined && dots[x][y - 1] !== undefined){
        topValue = dots[x][y - 1].prevColor;
      }

      let bottomValue = 0;
      if (dots[x] !== undefined && dots[x][y + 1] !== undefined){
        bottomValue = dots[x][y + 1].prevColor;
      }

      // Original algoritm, not working?
      // https://www.youtube.com/watch?v=BZUdGqeOD0w
      // https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
      // let val = ((leftValue + rightValue + topValue + bottomValue) / 2 ) - dots[x][y].color;

      let val = ((rightValue + leftValue + topValue + bottomValue) / dividedBy);

      dots[x][y].setColor(val * decay);
      dots[x][y].draw();
    }
  }
}

function clickOnDot(){
  for (let x = 0; x < dots.length; x++) {
    let col = dots[x];
    for (let y = 0; y < col.length; y++) {
      if (dots[x][y].isMe(mouseX, mouseY)){
        dots[x][y].change();
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  start();
}

// function mouseClicked(fxn){
//   clickOnDot();
// }

function mouseDragged(fxn){
  clickOnDot();
}

// function mouseMoved(){
//   clickOnDot();
// }