let fps = 10;
let duration = 6;

let itemSize;
let capture;

let storageName = 'gui-camera';

let palette = [
  "#05d5ff",
  "#5d05ff",
  "#0558ff",
  "#ffd500",
];

let obj = {
  items: 50,
  showGrid: false,
  threshold: 0.5,
  wide: 0.1,
  bg: '#000000',
  color: palette[0],
  invert: false,
  shape1: 'Plus',
  shape1CustomColor: false,
  shape1Color: palette[3],
  shape2: 'Triangle',
  shape2CustomColor: false,
  shape2Color: palette[1],
  shape3: 'Square',
  shape3CustomColor: false,
  shape3Color: palette[2],
}; 

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();

  if (sExport.playback || sExport.export){
  } else {
    capture = createCapture(VIDEO);
    capture.hide();
  }
}

function draw() {
  itemSize = width / obj.items;

  if (sExport.playback || sExport.export){
  } else {
    capture.loadPixels();
  }

  background(obj.bg);
  rectMode(CENTER);
  noStroke();

  // Init export
  if (frameCount == 1){
    sketchExportStart();
  }

  let gridVals = [];
  if (sExport.export || sExport.playback){

  } else {
    for (let i = 0; i < obj.items; i++) {
      for (let j = 0; j < obj.items; j++) {
        let c = getVideoColorAtPosition(i, j);
        let l = lightness(c);
        let light = map(l, 0, 100, 0, 1);
        gridVals.push(light);
      }
    }
  }
  
  // Recording reading data
  gridVals = sketchRecordData('vals', gridVals);

  // Draw shader
  drawShader(gridVals);

  // Export
  sketchExport();

  // Stop
  if (sExport.record){
    if (frameCount == (duration * fps) + sExport.frameCountDelay){
      sketchRecordStop();
      
      // go to playback
      let url = window.location.href.split('?')[0];
      url += '?play=vals';
      window.location.href = url;
    }
  }
    
  if (sExport.export || sExport.playback){
    if (frameCount == (duration * fps)){
      frameCount = 1;
      if (sExport.export){
        sketchExportEnd();
        userEndExporting();
      }
    }
  }
}

// ** DRAWS **
// -----------

function drawShader(gridVals){

  let col = obj.color;

  let gI = 0;
  for (let i = 0; i < obj.items; i++) {
    for (let j = 0; j < obj.items; j++) {
      let val = gridVals[gI];
      if (obj.invert){
        val = 1 - val;
      }

      gI++;

      let x = i * itemSize;
      let y = j * itemSize;

      let thMid = obj.threshold - (obj.wide / 2);
      let thHig = obj.threshold + (obj.wide / 2);
      
      push();
        translate(x, y);

        // Grid
        if (obj.showGrid){
          push()
          translate(itemSize * 0.5, itemSize * 0.5);
          noFill();
          if (obj.invert){
            stroke(0);
          } else {
            stroke(255);
          }
          rect(0, 0, itemSize);
          pop();
        }

        if (val > 0.3 && val <= thMid){
          col = obj.color;
          if (obj.shape1CustomColor){
            col = obj.shape1Color;
          }
          switch (obj.shape1) {
            case 'Line':
              drawLine(col, 0.8);
              break;

            case 'Plus':
              drawPlus(col, 0.8);
              break;
          }
        }
        if (val > thMid && val <= thHig){
          col = obj.color;
          if (obj.shape2CustomColor){
            col = obj.shape2Color;
          }
          switch (obj.shape2) {
            case 'Triangle':
              drawTriangle(col, 0.9);
              break;

            case 'Circle':
              drawCircle(col, 0.5, false);
              break;
            
            case 'Arrow':
              drawArrow(col, 0.8);
              break;

            case 'X':
              drawX(col, 0.9);
              break;
          }
        }
        if (val > thHig){
          col = obj.color;
          if (obj.shape3CustomColor){
            col = obj.shape3Color;
          }
          switch (obj.shape3) {
            case 'Square':
              drawSquare(col, 0.8);
              break;
            case 'Square Full':
              drawSquare(col, 1);
              break;
            case 'Circle':
              drawCircle(col, 0.9, true);
              break;
            case 'Lines':
              drawLines(col, 0.9);
              break;
          }
        }
      pop();
    }
  }
}

function drawSquare(col, size){
  push();
  noStroke();
  fill(col);
  translate(itemSize * 0.5, itemSize * 0.5);
  rectMode(CENTER);
  rect(0, 0, itemSize * size);
  pop();
}

function drawTriangle(col, size){
  let start = 1 - size;
  push();
  fill(col);
  noStroke();
  triangle(
    itemSize * size, itemSize * start,
    itemSize * size, itemSize * size,
    itemSize * start, itemSize * size
  );
  pop();
}

function drawLine(col, size){
  let start = 1 - size;
  stroke(col);
  strokeWeight(itemSize * 0.1);
  // line(itemSize * start, itemSize * start, itemSize * size, itemSize * size);
  line(itemSize * start, itemSize * size, itemSize * size, itemSize * start);
}

function drawArrow(col, size){
  let start = 1 - size;
  push();
  stroke(col);
  strokeWeight(itemSize * 0.1);
  line(itemSize * start, itemSize * start, itemSize * size, itemSize * start);
  line(itemSize * start, itemSize * start, itemSize * start, itemSize * size);
  line(itemSize * start, itemSize * start, itemSize * size, itemSize * size);
  pop();
}

function drawPlus(col, size){
  let start = 1 - size;
  push();
    stroke(col);
    strokeWeight(itemSize * 0.1);
    line(itemSize * start, itemSize * 0.5, itemSize * size, itemSize * 0.5);
    line(itemSize * 0.5, itemSize * start, itemSize * 0.5, itemSize * size);
  pop();
}

function drawX(col, size){
  let start = 1 - size;
  push();
  stroke(col);
  strokeWeight(itemSize * 0.1);
  line(itemSize * start, itemSize * start, itemSize * size, itemSize * size);
  line(itemSize * start, itemSize * size, itemSize * size, itemSize * start);
  pop();
}

function drawCircle(col, size, f){
  push();
  translate(itemSize * 0.5, itemSize * 0.5);
  if (f){
    noStroke();
    fill(col);
  } else {
    noFill();
    stroke(col);
    strokeWeight(itemSize * 0.1);
  }
  circle(0, 0, itemSize * size);
  pop();
}

function drawLines(col, size){
  let start = 1 - size;
  push();
    noFill();
    stroke(col);
    strokeWeight(itemSize * 0.1);
    translate(0, itemSize * 0.05);
    for (let i = 0; i < 4; i++) {
      line(itemSize * start, itemSize * start, itemSize * size, itemSize * start);
      translate(0, itemSize * size * 0.25);
    }
  pop();
}

// ** UTILITY **
// -------------

function getVideoColorAtPosition(i, j){
  let videoSize = capture.height / obj.items;
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

  return color(r, g, b, a);
}

function colorDistance(first, second) {
  let r = abs(red(first) - red(second));
  let g = abs(green(first) - green(second));
  let b = abs(blue(first) - blue(second));
  return r + g + b;
}

function getFileName(prefix){
  let now = new Date();
  return prefix + '-' + now.getMonth() + '-' + now.getDay() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();
}

/*
function mouseClicked() {
  // invece che storare il colore di ogni pixel
  // dovrei storare la luminosità dell'item
  // setBackground();
  setBgLightness();
}

function setBackground(){
  backgroundPixels = capture.pixels;
}

function setBgLightness(){
  bgLightness = [];
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let c = getVideoColorAtPosition(i, j);
      let ligth = 0;
      if (c){
        let l = lightness(c);
        ligth = map(l, 0, 100, 0, 1);
      }
      bgLightness.push(ligth);
    }
  }
}
*/