let items = 64;
let fps = 30;
let speed = 0.25;

let imgItemSize = false;
let itemSize = false;

let img = false;
let pixels = [];

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
  noStroke();
  fill(255);

  let sec = frameCount / fps * speed;

  let mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  let itemsNumber = 1;
  if (mPos.x > 0){
    itemsNumber = map(mPos.x, 0, width, 1, items, true);
  }

  imgItemSize = floor(img.width / itemsNumber);
  itemSize = width / itemsNumber;
  
  let c = false;
  let l = false;

  for (var y = 0; y < img.height; y += imgItemSize) {
    for (var x = 0; x < img.width; x += imgItemSize) {
      
      // Get index of the pixel (based by 4) - center of the item
      var index = (x + floor(imgItemSize * 0.5) + ((y + floor(imgItemSize * 0.5)) * img.width)) * 4;
      
      // Rgba color
      let r = pixels[index + 0];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];

      // Color
      c = color(r, g, b, a);
      // 0 - 1 based on the lightness of the pixel
      s = map(lightness(c), 0, 100, 0, 1);
      l = map(lightness(c), 0, 100, 0, 255);

      // Use the lightness as offset in animation
      let secOffset = s;
      // Get 0 - 1 progression with offset
      let t = (sec + secOffset) % 1;
      // Get 0 - 1 - 0 sinuosoidal progression
      let tBounce = (cos(t * TWO_PI) + 1) * 0.5;

      let cX = x * itemSize/imgItemSize;
      let cY = y * itemSize/imgItemSize;
      // fill(l);
      // rect(cX, cY, itemSize);
      circle(cX + itemSize * 0.5, cY + itemSize * 0.5, itemSize * s * tBounce);
    }
  }

  // Draw mouse position
  if (mPos.x > 0 && mPos.y > 0){
    fill('#fca311');
    circle(mPos.x, mPos.y, 60);
  }

  recordSketchPost(8);
}


