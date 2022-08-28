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
  const strokeWidth = gridItemSize * 0.06;

  background(0);
  stroke(255);
  strokeCap(SQUARE);
  strokeWeight(strokeWidth);

  let offsetI = 0;
  let offsetJ = 0;

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = gridItemSize * i;
      let y = gridItemSize * j;
      
      // Go to the center of the item
      x = x + gridItemSize * 0.5;
      y = y + gridItemSize * 0.5;

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
  
  recordSketchPost(8);
}

function radOffset(index, tot){
  return ((PI * 0.5 / (tot - 1)) * (index));
};


