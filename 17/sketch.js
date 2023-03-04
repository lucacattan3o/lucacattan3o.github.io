let fps = 30;

let items = 50;

let margin = 0.1;
let sketchWidth;
let sketchMargin;
let itemSize;

let noiseDetail = 0.1;
let zOffset = 0;

let chars = "·.:,;#'+*`=?!¬”#^˜·$%/()";
chars = '·”#^˜·$%/()';

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
}

function draw() {
  recordSketchPre();

  sketchMargin = width * margin;
  sketchWidth = width - sketchMargin;

  itemSize = sketchWidth / items;

  background(255);
  rectMode(CENTER);
  noStroke();
  translate(sketchMargin * 0.5, sketchMargin * 0.5);

  textFont('monospace');

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = i * itemSize;
      let y = j * itemSize;

      let n = noise(i * noiseDetail, j * noiseDetail, zOffset);
      let index = floor(map(n, 0, 1, 0, chars.length));
      
      push();
        translate(x, y);
        translate(itemSize * 0.5, itemSize * 0.5);
        // Grid
        noFill();
        stroke(200);
        // rect(0, 0, itemSize),
        
        fill(0);
        textSize(itemSize);
        textAlign(CENTER, CENTER);
        text(chars.charAt(index), 0, 0);
        // rect(0, 0, itemSize * 0.9);
      pop();
    }
  }

  zOffset += 0.005;

  recordSketchPost(8);
}