let items = 8;
let nLoop = 1;
let x = 0;
let y = 0;
let itemSize = false;
let fps = 30;
let itemSpeed = 0.125;

let colors = [
  '#000000',
  '#fca311',
  '#e5e5e5',
  '#ffffff',
];

let itemList = [];

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });
  background(255);
  itemSize = width / items;

  setupItemList();
}

function setupItemList(){
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) { 
      itemList.push(new Item(i, j));
    }
  }
}

function draw() {
  rectMode(CENTER);
  strokeCap(ROUND);

  itemList.forEach(item => {
    push();
      translate(itemSize * item.i, itemSize * item.j);
      translate(itemSize * 0.5, itemSize * 0.5);
      item.draw();
    pop();  
  });

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
}


