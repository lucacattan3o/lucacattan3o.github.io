let fps = 30;

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

function setup() {
  createCanvas(1080, 1080, WEBGL);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  // Standard othographic Camera
  let cam = createCamera();
  // cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  cam.setPosition(-width * 0.5, 0, 0);
  cam.lookAt(0, 0, 0);
  
  createItems();
}

function createItems(){
  itemSize = width / nItems;
  cubeSize = itemSize * 0.9;

  for (let i = 0; i < nItems; i++) {
    for (let j = 0; j < nItems; j++) {
      for (let k = 0; k < nItems; k++) {
        let x = i * itemSize;
        let y = j * itemSize;
        let z = k * itemSize;

        let item = new Item(x, y, z);
        items.push(item);
      }
    }
  }
  
  items.forEach(item => {
    item.searchNeighbors();
  });

  console.debug(items[0]);

}

function draw() {
  recordSketchPre();

  sec = frameCount / fps * speed;
  bounce = (cos(sec * TWO_PI) + 1) * 0.5;
  
  orbitControl();
  
  ambientLight(255);
  directionalLight(color(255), 0, 1, -0.5);
  
  drawItems();

  recordSketchPost(8);
}

function drawItems(){
  background(0);

  rotateY(sec);

  translate(- width * 0.5, - width * 0.5, - width * 0.5);
  translate(itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);

  items.forEach(item => {
    item.draw();
    item.drawConnections();
  });
}
