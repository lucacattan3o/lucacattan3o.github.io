let items = 64;
let fps = 30;
let speed = 0.25;

let itemSize = false;
let imgItemSize = false;

let img = false;
let pixels = [];

recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  img.loadPixels();
  pixels = img.pixels;
}

function preload() {
  img = loadImage('luca.jpg');
}

function draw() {
  recordSketchPre();

  background(0);
  let sec = frameCount / fps * speed;

  let mX = responsiveMouseX();
  let mY = responsiveMouseY();

  let d = 1;
  if (mX > 0){
    d = map(mX, 0, width, 1, items, true);
  }

  // d = 62;

  itemSize = width / d;
  imgItemSize = floor(img.width / d);

  noStroke();
  
  let c = false;
  let l = false;

  for (var y = 0; y < img.height; y += imgItemSize) {
    for (var x = 0; x < img.width; x += imgItemSize) {
      
      // Get index of the pixel (based by 4)
      var index = (x + (y * img.width)) * 4;
      
      // Rgba color
      let r = pixels[index + 0];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];

      // Color
      c = color(r, g, b, a);
      l = map(lightness(c), 0, 100, 0, 255);
      s = map(lightness(c), 0, 100, 0, 1);

      let secOffset = s;
      let t = (sec + secOffset) % 1;
      let tBounce = (cos(t * TWO_PI) + 1) * 0.5;

      // fill(255);
      // rect(x, y, imgItemSize, imgItemSize);
      // fill(l);
      fill(255);
      circle(x + imgItemSize * 0.5, y + imgItemSize * 0.5, imgItemSize * s * tBounce);
    }
  }

  // if (mX > 0 && mY > 0){
  //   let cC = color(252, 163, 17, 255);
  //   fill(cC);
  //   circle(mX, mY, 60);
  // }

  recordSketchPost(8);
}


