let fps = 60;
let items = [];

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  setupLil();
  sketchExportSetup({
    fps: fps,
    name: getFileName('video') + '__' + obj.noiseSeed + '__' + obj.noiseScale,
  });
  setupItems();
  let bg = color(obj.bg);
  background(bg);
}

function setupItems(){
  noiseSeed(obj.noiseSeed);
  let bg = color(obj.bg);
  background(bg);
  items = [];
  let offset =  height * obj.margin;
  let s = (height - (offset * 2)) / obj.items;
  for (i = 0; i < obj.items; i++){
    let y = i * s + offset;
    // y = random(offset, height - offset);
    let item = new Item(width * 0.5, y);
    items.push(item);
  }
}

function draw() {
  for (i = 0; i < items.length; i++){
    let item = items[i];
    item.update();
    item.draw()
  }

  let radius = width * 0.5 * obj.radius;
  stroke(0);
  noFill();
  // circle(width * 0.5, height * 0.5, radius * 2);
  
  let sec = frameCount / fps;
  if (sec % 1 == 0){
    // console.debug(sec);
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 12 * fps){
    sketchExportEnd();
  }
} 
