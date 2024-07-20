let fps = 30;

// Canvas size
let sizeW = 16.5; // cm
let sizeH = 24;   // cm
let inch  = 2.54; // cm
let dpi   = 300;  // px / in
let w, h;
let itemSizeMin;

let obj = {
  itemsX: 10,
  itemsY: 20,
};

let itemSizeW, itemSizeH;

let storageName = 'gui-lube';

let palette = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  '#ffffff'
];

let mPos;

function setup() {
  w = floor(sizeW * dpi / inch);
  h = floor(sizeH * dpi / inch);

  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();
}

function draw() {
  background(0);

  // set itemSize based on paper height
  itemSizeW = width / obj.itemsX;
  itemSizeH = height / obj.itemsY;

  itemSizeMin = Math.min(itemSizeW, itemSizeH);

  for (i = 0; i < obj.itemsX; i++){
    for (j = 0; j < obj.itemsY; j++){
      let x = i * itemSizeW;
      let y = j * itemSizeH;
      
      push();
        translate(x, y);

        // Construction grid
        push();
          noFill();
          strokeWeight(2);
          stroke(200);
          rect(0, 0, itemSizeW, itemSizeH);
        pop();

        push();
          translate(itemSizeW * 0.5, itemSizeH * 0.5);
          circle(0, 0, itemSizeMin);
        pop();

      pop();
    }
  }
}  

