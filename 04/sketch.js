let items = 16;
let sec = 0;
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
      let angle = frameCount / 30 * 1;

      // Add some angle offset based on the position
      angle += angleOffset(i, items * 2);
      angle -= angleOffset(j, items * 1);

      let bounce = sin(angle);
  
      push();
        translate(x, y);
        scale(bounce * 1, 1);
        fill(000);
        rect(0, 0, itemSize, itemSize);
      pop();
    }
  }

  // if ((frameCount - 1) % 30 == 0){
  //   sec++;
  //   console.log(sec);
  // }
  recordSketchPost(12);
}

function angleOffset(index, tot){
  return ((PI / (tot - 1)) * (index));
};


