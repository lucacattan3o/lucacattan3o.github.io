let fps = 10;

let items = 24;

let margin = 0.1;
let sketchWidth;
let sketchMargin;
let itemSize;

let noiseDetail = 0.1;
let zOffset = 0;

let chars = " ·.:,;#'+*`=?!¬”#^˜·$%/()";
chars = '  ·”#^˜·$%/()';

let capture;
let backgroundPixels = null;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });

  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  sketchMargin = width * margin;
  sketchWidth = width - sketchMargin;

  itemSize = sketchWidth / items;

  capture.loadPixels();

  background(0);
  rectMode(CENTER);
  noStroke();
  translate(sketchMargin * 0.5, sketchMargin * 0.5);

  textFont('monospace');
  textSize(itemSize * 1.1);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = i * itemSize;
      let y = j * itemSize;

      let c = getVideoColorAtPosition(i, j);

      // let n = noise(i * noiseDetail, j * noiseDetail, zOffset);
      let b = brightness(c);
      let index = floor(map(b, 0, 200, 0, chars.length, true));
      
      push();
        translate(x, y);
        translate(itemSize * 0.5, itemSize * 0.5);
        // Grid
        noFill();
        // stroke(200);
        // rect(0, 0, itemSize),
        
        // fill(b);
        // rect(0, 0, itemSize * 1);
        
        fill(255);
        // if (index == 7 || index == 8){
        //   noFill();
        // }
        // if (index == 12){
        //   fill(0, 255, 0);
        // }
        text(chars.charAt(index), 0, 0);
      pop();
    }
  }

  // zOffset += 0.005;

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
}

function mouseClicked() {
  setBackground();
}

function setBackground(){
  backgroundPixels = capture.pixels;
}

function getVideoColorAtPosition(i, j){

  let videoSize = capture.height / items;
  let videoMargin = floor((capture.width - capture.height) * 0.5);

  let x = floor(capture.width - (i * videoSize) - videoMargin);
  let y = floor(j * videoSize);

  // Get index of the pixel (based by 4)
  let pIndex = (y * capture.width + x) * 4;

  // Rgba color
  let r = capture.pixels[pIndex + 0];
  let g = capture.pixels[pIndex + 1];
  let b = capture.pixels[pIndex + 2];
  let a = capture.pixels[pIndex + 3];

  let c = color(r, g, b, a);

  if (backgroundPixels){
    // Rgba color
    let r = backgroundPixels[pIndex + 0];
    let g = backgroundPixels[pIndex + 1];
    let b = backgroundPixels[pIndex + 2];
    let a = backgroundPixels[pIndex + 3];  

    let back = color(r, g, b, a);

    let d = colorDistance(c, back);
    if (d > 150){
      return c;
    } else {
      return color(0);
    }
  }

  // Color
  return c;
}

function colorDistance(first, second) {
  let r = abs(red(first) - red(second));
  let g = abs(green(first) - green(second));
  let b = abs(blue(first) - blue(second));
  return r + g + b;
}