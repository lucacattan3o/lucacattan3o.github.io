let fps = 30;

let nItems = 16;

let items = [];
let connections = {};
let mPos;

let worldCenter;

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
  cam.setPosition(
    - width * 0.7,
    - width * 0,
    - width * 0.7);
  cam.lookAt(0, 0, 0);

  itemSize = width / nItems;
  worldCenter = createVector(width * 0.5, width * 0.5, width * 0.5);
  
  createItems();
}

function createItems(){

  let unique = 0;
  for (let i = 0; i < nItems; i++) {
    for (let j = 0; j < nItems; j++) {
      for (let k = 0; k < nItems; k++) {

        // Traslate to the center of the box
        let x = i * itemSize + itemSize * 0.5;
        let y = j * itemSize + itemSize * 0.5;
        let z = k * itemSize + itemSize * 0.5;

        let item = new Item(x, y, z, unique);
        unique++;
        items.push(item);
      }
    }
  }
  connections = [];
  createConnections();
}

function createConnections(){
  connections = [];

  items.forEach(item => {
    let neigs = items.filter((other) => {
      if (other !== item){
        let distance = item.pos.dist(other.pos);
        if (distance > 0 && distance < itemSize * 1.1){
          return true;
        }
        return false;
      }
    });

    neigs.forEach(n => {
      let string = item.unique + '-' + n.unique;
      if (item.unique > n.unique){
        string = n.unique + '-' + item.unique;
      }
      connections[string] = string;
    });
  })

  connections = Object.values(connections);
}

function draw() {
  recordSketchPre();

  sec = frameCount / fps * speed;
  bounce = (cos(sec * TWO_PI) + 1) * 0.5;
  
  orbitControl();
  
  ambientLight(255);
  directionalLight(color(255), 0, 1, -0.5);

  mPos = responsiveMousePos();
  
  drawItems();

  recordSketchPost(5);
}

function drawItems(){
  background(0);

  rotateY(sec * TWO_PI * 0.25);

  push();
    translate(- width * 0.5, - width * 0.5, - width * 0.5);

    // Reverse loop
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.update();
      item.draw();
    }

    // push();
    //   translate(worldCenter.x, worldCenter.y, worldCenter.z);
    //   // sphere(200, 10, 10);
    // pop();

    // drawConnections();

  pop();
}

function drawConnections(){
  connections.forEach(con => {
    let vertex = con.split('-');
    let a = vertex[0];
    let b = vertex[1];
    let pointA = items[a];
    let pointB = items[b];
    stroke(color(255, 100));
    strokeWeight(0.5);
    line(
      pointA.pos.x, pointA.pos.y, pointA.pos.z,
      pointB.pos.x, pointB.pos.y, pointB.pos.z,
    );
  });
}
