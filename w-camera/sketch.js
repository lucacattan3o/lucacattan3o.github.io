let fps = 10;

let itemSize;
let capture;

let storageName = 'gui-camera';

let palette = ["#8ecae6","#219ebc","#023047","#ffb703","#fb8500"];

let obj = {
  items: 50,
  showGrid: false,
  threshold: 0.5,
  wide: 0.1,
  bg: '#000000',
  color: palette[0],
  invert: false,
  shape1: 'Plus',
  shape2: 'Triangle',
  shape3: 'Square',
};

let skipFrames = 5;

// todo: rec tot seconds and play
// - start recording
// - play in loop
// -- disable grid options
// -- stop and delete
// -- can export video
// todo: different colors?
// todo: when invert?
// todo: shape options <--> predefined combinations
// todo: clear bg?


// let backgroundPixels = null;
// let bgLightness = []; 

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();

  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  itemSize = width / obj.items;
  capture.loadPixels();

  background(obj.bg);
  rectMode(CENTER);
  noStroke();

  let gridVals = [];
  for (let i = 0; i < obj.items; i++) {
    for (let j = 0; j < obj.items; j++) {
      let c = getVideoColorAtPosition(i, j);
      let l = lightness(c);
      let light = map(l, 0, 100, 0, 1);
      let dark = 1 - light;

      let val = light;
      if (obj.invert){
        val = dark;
      }
      gridVals.push(val);
    }
  }

  gridVals = sketchRecordData('vals', gridVals);

  if (sExport.record || sExport.playback){
    if (frameCount >= skipFrames){
      drawShader(gridVals);
    }
  } else {
    drawShader(gridVals);
  }

  if (frameCount == skipFrames){
    sketchRecordStart();
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == (4 * fps) + skipFrames){
    if (sExport.record){
      sketchRecordStop();
      
      // go to playback
      let url = window.location.href.split('?')[0];
      url += '?play=vals';
      window.location.href = url;
    }
    if (sExport.playback){
      // restart playback
      frameCount = skipFrames;
    }
    if (sExport.export){
      sketchExportEnd();
      userEndExporting();
    }
  }
}

// ** DRAWS **
// -----------

function drawShader(gridVals){
  let gI = 0;
  for (let i = 0; i < obj.items; i++) {
    for (let j = 0; j < obj.items; j++) {
      let val = gridVals[gI];
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
          switch (obj.shape1) {
            case 'Line':
              drawLine(0.8);
              break;

            case 'Plus':
              drawPlus(0.8);
              break;
          }
        }
        if (val > thMid && val <= thHig){
          switch (obj.shape2) {
            case 'Triangle':
              drawTriangle(0.9);
              break;

            case 'Circle':
              drawCircle(0.5, false);
              break;
            
            case 'Arrow':
              drawArrow(0.8);
              break;

            case 'X':
              drawX(0.9);
              break;
          }
        }
        if (val > thHig){
          switch (obj.shape3) {
            case 'Square': 'Square Full',
              drawSquare(0.8);
              break;
            case 'Square Full':
              drawSquare(1);
              break;
            case 'Circle':
              drawCircle(0.9, true);
              break;
            case 'Lines':
              drawLines(0.9);
              break;
          }
        }

        // if (bgLightness[ci] !== undefined){
        //   let l2 = bgLightness[ci];
        //   let diff = abs(light - l2);
        //   if (diff > 0.25){
        // 
        //   }
        // } else {
        //   stroke(255);
        //   line(0, 0, itemSize, itemSize);
        // }

        // if (index == 7 || index == 8){
        //   noFill();
        // }
        // if (index == 12){
        //   fill(0, 255, 0);
        // }
        // text(chars.charAt(index), 0, 0);
      pop();
    }
  }
}

function drawSquare(size){
  push();
  noStroke();
  fill(obj.color);
  translate(itemSize * 0.5, itemSize * 0.5);
  rectMode(CENTER);
  rect(0, 0, itemSize * size);
  pop();
}

function drawTriangle(size){
  let start = 1 - size;
  push();
  fill(obj.color);
  noStroke();
  triangle(
    itemSize * size, itemSize * start,
    itemSize * size, itemSize * size,
    itemSize * start, itemSize * size
  );
  pop();
}

function drawLine(size){
  let start = 1 - size;
  stroke(obj.color);
  strokeWeight(itemSize * 0.1);
  // line(itemSize * start, itemSize * start, itemSize * size, itemSize * size);
  line(itemSize * start, itemSize * size, itemSize * size, itemSize * start);
}

function drawArrow(size){
  let start = 1 - size;
  push();
  stroke(obj.color);
  strokeWeight(itemSize * 0.1);
  line(itemSize * start, itemSize * start, itemSize * size, itemSize * start);
  line(itemSize * start, itemSize * start, itemSize * start, itemSize * size);
  line(itemSize * start, itemSize * start, itemSize * size, itemSize * size);
  pop();
}

function drawPlus(size){
  let start = 1 - size;
  push();
    stroke(obj.color);
    strokeWeight(itemSize * 0.1);
    line(itemSize * start, itemSize * 0.5, itemSize * size, itemSize * 0.5);
    line(itemSize * 0.5, itemSize * start, itemSize * 0.5, itemSize * size);
  pop();
}

function drawX(size){
  let start = 1 - size;
  push();
  stroke(obj.color);
  strokeWeight(itemSize * 0.1);
  line(itemSize * start, itemSize * start, itemSize * size, itemSize * size);
  line(itemSize * start, itemSize * size, itemSize * size, itemSize * start);
  pop();
}

function drawCircle(size, f){
  push();
  translate(itemSize * 0.5, itemSize * 0.5);
  if (f){
    noStroke();
    fill(obj.color);
  } else {
    noFill();
    stroke(obj.color);
    strokeWeight(itemSize * 0.1);
  }
  circle(0, 0, itemSize * size);
  pop();
}

function drawLines(size){
  let start = 1 - size;
  push();
    noFill();
    stroke(obj.color);
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