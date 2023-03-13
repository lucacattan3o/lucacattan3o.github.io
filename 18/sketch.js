let fps = 30;

let items = 10;

let sec;
let bounce;
let speed = 1;

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
  itemSize = width / items;
  cubeSize = itemSize * 0.9;

  push();
    translate(- width * 0.5, - width * 0.5, - height * 0.5);
    translate(itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);

    for (let i = 0; i < items; i++) {
      for (let j = 0; j < items; j++) {
        for (let k = 0; k < items; k++) {
          push();
            let x = i * itemSize;
            let y = j * itemSize;
            let z = k * itemSize;
            translate(x, z, y);
            noStroke();
            ambientMaterial(colors[8]);
            sphere(2, 5, 5);
          pop(); 
        } 
      }
    }
  pop();
}
