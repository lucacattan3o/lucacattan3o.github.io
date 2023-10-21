let items = 16;
let fps = 16;

let colors = [
  [245, 255, 78 ],
  [246, 255, 123],
  [255, 111, 211],
  [255, 187, 235],
  [255, 140, 221],
  [255, 206, 113],
  [255, 157, 118],
  [255, 129, 119],
  [163, 248, 123],
  [0,   213, 134],
  [208, 255, 114],
  [0,   196, 139],
  [207, 107, 208],
  [140, 107, 205],
  [99,  103, 202],
  [90,  111, 207],
  [144, 220, 249],
  [29,  199, 242],
];

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
  });
  background(0);
}

function draw() {
  const padding = width * 0.125 / items;
  const paddingTot = padding * (items + 1);
  const itemSize = (width - paddingTot) / items;

  blendMode(BLEND);
  noStroke();
  background(colors[2]);
  fill(colors[0]);
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

      // Add some angle offset based on the position
      // Calculate the distance with the center of the sketch
      let d = Math.abs(dist(x, y, width * 0.5, height * 0.5));
      // Map it to the number of items
      let offset = map(d, 0, width, 0, 1);
      // Bounce with offset
      let bounce = getLoopBounce(0.25, offset * 1);
  
      push();
        translate(x, y);
        scale(bounce);
        rect(0, 0, itemSize, itemSize);
      pop();
    }
  }

  // blendMode(DIFFERENCE);
  // translate(width * 0.5, height * 0.5);
  // fill(colors[6]);
  // let size = width * 0.5 * getLoopBounce(0.125);
  // rectMode(CORNERS);
  // rect(0, 0, size);

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
}

