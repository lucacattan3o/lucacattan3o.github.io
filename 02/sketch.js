let items = 16;
recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(30);
  background(0);
}

function draw() {
  recordSketchPre();

  const gridItemSize = width / items;
  const itemSize = gridItemSize * 0.8;
  const strokeWidth = gridItemSize * 0.125;

  background(0);
  stroke(255);
  strokeWeight(strokeWidth);

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = gridItemSize * i;
      let y = gridItemSize * j;
      
      // Go to the center of the item
      x = x + gridItemSize * 0.5;
      y = y + gridItemSize * 0.5;

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

  recordSketchPost(8);
}

function angleOffset(index, tot){
  return ((PI / (tot - 1)) * (index));
};


