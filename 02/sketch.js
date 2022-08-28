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
  const strokeWidth = size * 0.125;

  background(0);
  stroke(255);
  //strokeCap(SQUARE);
  strokeWeight(strokeWidth);

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = size * i;
      let y = size * j;
      
      // Go to the center of the item
      x = x + size * 0.5;
      y = y + size * 0.5;

      // Calculate di angle / multiple of framerate
      let angle = frameCount / 30 * 2;

      // add some angle offset based on the position
      angle += angleOffset(i, items * 1);
      angle += angleOffset(j, items * 1);

      // create the bounce
      let bounce = sin(angle) * itemSize * 0.5;
  
      push();
        translate(x, y);   
        translate(0, bounce);
        line(-itemSize * 0.5, 0, itemSize * 0.5, 0);
      pop();
    }
  }



  if (record && frameCount == 60 * 8){
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

function angleOffset(index, tot){
  return ((PI / (tot - 1)) * (index));
};


