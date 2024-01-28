let fps = 60;
let nItems = 10;

let items = [];

let sec;
let bounce;
let speed = 0.125;

let colors = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
  '#ffffff',
];

colors = ["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });

  itemSize = width / nItems;
  
  createItems();
}

function createItems(){
  let unique = 0;
  for (let i = 0; i < nItems; i++) {
    for (let j = 0; j < nItems; j++) {
      let x; 
      let y; 

      x = i * itemSize + itemSize * 0.5;
      y = j * itemSize + itemSize * 0.5;

      x = random(width);
      y = random(height);

      let item = new Item(x, y);
      unique++;
      items.push(item);
    }
  }
}


function draw() {
  // sec = frameCount / fps * speed;
  // bounce = (cos(sec * TWO_PI) + 1) * 0.25;

  background(255);

  drawItems();


  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport(18);
  if (frameCount == 18 * fps){
    sketchExportEnd();
  }
}

function drawItems(){
  push();
    // translate(- width * 0.5, - width * 0.5, - width * 0.5);
    // Reverse loop
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.update();
      item.draw();
    }
  pop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
