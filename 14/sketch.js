let fps = 30;

let gridItemsCount = 8;
let gridItemSize;
let vectors = [];

let particles = [];
let particlesCount = 600;
let zOff = 0;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  gridItemSize = width / gridItemsCount;

  noiseDetail(8);

  background(0);
}

function draw() {
  recordSketchPre();

  drawDebug();
  addParticles();
  drawParticles();
  
  recordSketchPost(12);
  zOff += 0.005;
}

function addParticles(){
  for (let i = 0; i < 5; i++) {
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
  });
}

function drawDebug(){
  background(0);
  stroke(255, 0, 0);
  strokeWeight(1);
  noFill();
  
  for (let i = 0; i <= gridItemsCount; i++) {
    for (let j = 0; j <= gridItemsCount; j++) {
      let pos = createVector(i * gridItemSize, j * gridItemSize);
      let n = noiseVectorByPosision(pos);
      push();
        translate(pos.x, pos.y);
        // rect(0, 0, gridItemSize);
        circle(0, 0, gridItemSize);
        n.setMag(gridItemSize * 0.5);
        fill(255, 0, 0);
        circle(0, 0, 10);
        line(0, 0, n.x, n.y);
      pop();
    }
  }
}

function noiseVectorByPosision(pos){
  let nx = pos.x / gridItemSize;
  let ny = pos.y / gridItemSize;
  let n = noise(nx, ny, zOff);
  return new p5.Vector.fromAngle(TWO_PI * n);
}

class Particle{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.posPrev = createVector(this.pos.x, this.pos.y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = 2;
    this.color = 255;
  }

  update(){
    this.posPrev.set(this.pos);
    // Update the velocity based on flow field
    let flowForce = noiseVectorByPosision(this.pos);
    
    this.acc.add(flowForce);
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.limit();
  }

  limit(){
    if (this.pos.x > width){
      this.pos.x = 0;
      this.posPrev.x = 0;
    }
    if (this.pos.x < 0){
      this.pos.x = width;
      this.posPrev.x = width;
    }
    if (this.pos.y > height){
      this.pos.y = 0;
      this.posPrev.y = 0;
    }
    if (this.pos.y < 0){
      this.pos.y = height;
      this.posPrev.y = height;
    }
  }

  draw(){
    // noFill();
    stroke(this.color);
    strokeWeight(1);
    line(this.posPrev.x, this.posPrev.y, this.pos.x, this.pos.y);
  }

}