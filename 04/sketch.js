let items = 16;
recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(30);
}

function draw() {
  recordSketchPre();

  const padding = width * 0.25 / items;
  const paddingTot = padding * (items + 1);
  const itemSize = (width - paddingTot) / items;
  rectMode(CENTER);
  background(255);
  noStroke();

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = (itemSize + padding) * i + padding;
      let y = (itemSize + padding) * j + padding;
      
      // Go to the center of the item
      x = x + itemSize * 0.5;
      y = y + itemSize * 0.5;

      // Calculate di angle / multiple of framerate
      let angle = frameCount / 30 * 2;

      // Add some angle offset based on the position
      // Calculate the distance with the center of the sketch
      // let d = Math.abs(dist(x, y, width * 0.5, height * 0.5));
      // Map it to the number of items
      // let offset = map(d, 0, width * 0.5, 0, items);
      // Calculate the angle offset
      angle += angleOffset(i + j, items * 1);
      let bounce = sin(angle);
  
      push();
        translate(x, y);
        // translate(bounce * itemSize * 0.25, bounce * itemSize * 0.25);
        scale(bounce * 1, bounce * 1);
        fill(000);
        rect(0, 0, itemSize, itemSize);
      pop();
    }
  }

  recordSketchPost();
}

function angleOffset(index, tot){
  return ((PI / (tot - 1)) * (index));
};


