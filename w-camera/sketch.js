let fps = 5;

let items = 60;

let itemSize;

let noiseDetail = 0.1;
let zOffset = 0;

let capture;

// let backgroundPixels = null;
// let bgLightness = []; 

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
  itemSize = width / items;
  capture.loadPixels();

  background(0);
  rectMode(CENTER);
  noStroke();

  let ci = 0;
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      ci++;
      let x = i * itemSize;
      let y = j * itemSize;

      let c = getVideoColorAtPosition(i, j);
      
      push();
        translate(x, y);
        translate(itemSize * 0.5, itemSize * 0.5);
        
        // Grid
        noFill();
        stroke(200);
        // rect(0, 0, itemSize);

        let l = lightness(c);
        let light = map(l, 0, 100, 0, 1);
        fill(255);

        if (light > 0.3 && light < 0.5){
          stroke(255);
          strokeWeight(itemSize * 0.1);
          line(0, 0, itemSize, itemSize);
        }
        if (light > 0.5 && light < 0.6){
          translate(itemSize * 0.5, itemSize * 0.5);
          circle(0, 0, itemSize * 0.5);
        }
        if (light > 0.6){
          translate(itemSize * 0.5, itemSize * 0.5);
          rectMode(CENTER);
          rect(0, 0, itemSize);
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

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
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

  return color(r, g, b, a);
}

function colorDistance(first, second) {
  let r = abs(red(first) - red(second));
  let g = abs(green(first) - green(second));
  let b = abs(blue(first) - blue(second));
  return r + g + b;
}

/*
if (backgroundPixels){
  // Rgba color
  let r = backgroundPixels[pIndex + 0];
  let g = backgroundPixels[pIndex + 1];
  let b = backgroundPixels[pIndex + 2];
  let a = backgroundPixels[pIndex + 3];  

  let back = color(r, g, b, a);

  let d = colorDistance(c, back);
  if (d > 100){
    return c;
  }
}
return null;
*/


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