let items = 32;
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

  const padding = width * 0.125 / items;
  const paddingTot = padding * (items + 1);
  const itemSize = (width - paddingTot) / items;

  background(0);
  stroke(100);
  fill(255);
  rectMode(CENTER);

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = (itemSize + padding) * i + padding;
      let y = (itemSize + padding) * j + padding;
      
      // Go to the center of the item
      x = x + itemSize * 0.5;
      y = y + itemSize * 0.5;

      // Calculate di angle / multiple of framerate
      let angle = frameCount / 30 * 1;

      // add some angle offset based on the position
      // calculate the distance with the center of the sketch
      let d = Math.abs(dist(x, y, width * 0.5, height * 0.5));
      // map it to the number of items
      let offset = map(d, 0, width, 0, items);
      // calculate the angle offset
      angle += angleOffset(offset, items * 1);

      let bounce = sin(angle);
  
      push();
        translate(x, y);
        scale(bounce);
        rect(0, 0, itemSize, itemSize);
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


