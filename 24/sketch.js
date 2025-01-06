let fps = 60;
let items = [];

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();
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
  
  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 16 * fps){
    sketchExportEnd();
  }
} 
