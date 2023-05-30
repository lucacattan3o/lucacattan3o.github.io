let items = 10;
let x = 0;
let y = 0;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(30);
  sketchExportSetup({
    fps: 30
  })
  background(0);
}

function draw() {
  stroke(255);
  let itemSize = width / items;
  strokeWeight(2);
  strokeCap(ROUND);

  if (x < items){
    push();
    translate(itemSize * x, itemSize * y);
    if (random() > 0.2){
      line(0, 0, itemSize, itemSize);     
    } else {
      line(0, itemSize, itemSize, 0); 
    }
    pop();
    x++;
  } else {
    x = 0;
    y++;
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (y >= items){
    noLoop();
    sketchExportEnd();
  }
}


