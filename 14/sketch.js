let fps = 30;

let gridItemsCount = 4;
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
}

function draw() {
  recordSketchPre();

  drawDebug();
  
  drawParticles();
  
  recordSketchPost(20);
  zOff += 0.005;

  // Perfect for debug
  addParticles(5);
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
    // particle.draw();
    particle.debug();
  });
}

function drawDebug(){
  background(0);
  strokeWeight(2);
  noFill();
  for (let i = 0; i <= gridItemsCount; i++) {
    for (let j = 0; j <= gridItemsCount; j++) {
      let pos = createVector(i * gridItemSize, j * gridItemSize);
      let n = noiseVectorByPosision(pos);
      push();
        translate(pos.x, pos.y);
        let c = color(255);
        c.setAlpha(40);
        stroke(c);
        // rectMode(CENTER);
        // rect(0, 0, gridItemSize);
        circle(0, 0, gridItemSize);
        n.setMag(gridItemSize * 0.4);
        strokeWeight(1);
        stroke(255);
        line(0, 0, n.x, n.y);
        fill(0);
        // noStroke();
        circle(0, 0, gridItemSize * 0.08);

        // Arrow
        let end = n.copy();
        end.setMag(gridItemSize * 0.35);
        end.rotate(-0.15);
        line(n.x, n.y, end.x, end.y);
        end.rotate(0.3);
        line(n.x, n.y, end.x, end.y);


      pop();
    }
  }
}