let fps = 30;

let gridItemsCount = 2;
let gridItemSize;
let vectors = [];

let particles = [];
let zOff = 0;

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

function noiseVectorByPosision(pos){
  let nx = pos.x / gridItemSize;
  let ny = pos.y / gridItemSize;
  let n = noise(nx, ny, zOff);
  let vector = new p5.Vector.fromAngle(TWO_PI * n);
  vector.setMag(1);
  return vector;
}

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  gridItemSize = width / gridItemsCount;

  noiseDetail(2);

  background(0);

  addParticles(500);
}

function draw() {
  recordSketchPre();

  // drawDebug();
  
  drawParticles();
  
  recordSketchPost(20);
  //zOff += 0.001;
}

function addParticles(count){
  for (let i = 0; i < count; i++) {
    let px = random(width);
    let py = random(height);
    let particle = new Particle(px, py);
    particles.push(particle);
  }
}

function drawParticles(){
  particles.forEach(particle => {
    particle.update();
    particle.draw();
    // particle.debug();
  });
}

function drawDebug(){
  background(0);
  strokeWeight(1);
  noFill();
  for (let i = 0; i <= gridItemsCount; i++) {
    for (let j = 0; j <= gridItemsCount; j++) {
      let pos = createVector(i * gridItemSize, j * gridItemSize);
      let n = noiseVectorByPosision(pos);
      push();
        translate(pos.x, pos.y);
        // rect(0, 0, gridItemSize);
        stroke(255, 0, 0, 100);
        circle(0, 0, gridItemSize);
        n.setMag(gridItemSize * 0.4);
        fill(255, 0, 0);
        circle(0, 0, gridItemSize * 0.1);
        strokeWeight(2);
        stroke(255, 0, 0);
        line(0, 0, n.x, n.y);
      pop();
    }
  }
}