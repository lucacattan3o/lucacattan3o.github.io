const colors = [
  '#495ED6', // Blue
  '#F94E50', // Red
  '#FFC700', // Yellow
];

let items = 16;
let record = false;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(30);
  background(0);
}

function draw() {
  if (record && frameCount == 1){
    capturer.start();
  }

  const size = width / items;
  const itemSize = size * 0.8;
  const strokeWidth = size * 0.06;

  background(0);
  stroke(255);
  strokeCap(SQUARE);
  strokeWeight(strokeWidth);

  let offsetI = 0;
  let offsetJ = 0;

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = size * i;
      let y = size * j;
      
      // Go to the center of the item
      x = x + size * 0.5;
      y = y + size * 0.5;

      let angle = PI * frameCount / 60 * 0.25;
      offsetI = radOffset(i, items);
      offsetJ = radOffset(j, items);
  
      push();
        translate(x, y);
        rotate(angle + offsetI + offsetJ);    
        line(-itemSize * 0.5, 0, itemSize * 0.5, 0);
      pop();
    }
  }



  if (frameCount == 60 * 8){
    noLoop();
    if (record){
      capturer.save();
      capturer.stop();
    }
  }

  if (record){
    capturer.capture(canvas);
  }
}

function radOffset(index, tot){
  return ((PI * 0.5 / (tot - 1)) * (index));
};


