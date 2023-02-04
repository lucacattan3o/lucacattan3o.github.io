let fps = 30;

let gridItemsCount = 20;
let gridItemSize;
let vectors = [];

let particles = [];
let particlesCount = 700;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  gridItemSize = width / gridItemsCount;

  noiseDetail(0.0001);

  for (let gx = 0; gx < gridItemsCount; gx++) {
    for (let gy = 0; gy < gridItemsCount; gy++) {
      let x = gridItemSize * gx + gridItemSize * 0.5;
      let y = gridItemSize * gy + gridItemSize * 0.5;

      let pos = createVector(x, y);

      // Noise 0 - 1
      let n = noise(x, y);

      let force = new p5.Vector(0, gridItemSize * 0.5);
      force.setHeading(TWO_PI * n);

      vectors.push({
        pos: pos,
        force: force,
        n: n,
      })
    }
  }

  for (let i = 0; i < particlesCount; i++) {
    let px = random(0, width);
    let py = random(0, height);
    let particle = new Particle(px, py);
    particles.push(particle);
  }

  background(0);
}

function draw() {
  recordSketchPre();
  
  // drawDebug();
  drawParticles();
  // background(0);
  
  
  recordSketchPost(12);
}

function drawParticles(){
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
}

function drawDebug(){
  stroke(255);
  noFill();
  vectors.forEach(vector => {
    push();
      stroke(255 * vector.n);
      translate(vector.pos.x, vector.pos.y);
      circle(0, 0, gridItemSize);
      line(0, 0, vector.force.x, vector.force.y);
    pop();
  });
}

class Particle{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = 2;
  }

  update(){
    // Update the velocity based on flow field
    let nx = this.pos.x / gridItemSize;
    let ny = this.pos.y / gridItemSize;
    let n = noise(nx, ny);
    let flowForce = new p5.Vector.fromAngle(TWO_PI * n);
    this.acc.add(flowForce);

    this.vel.add(flowForce);
    this.vel.limit(4);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.limit();
  }

  limit(){
    if (this.pos.x > width){
      this.pos.x = 0;
    }
    if (this.pos.x < 0){
      this.pos.x = width;
    }
    if (this.pos.y > height){
      this.pos.y = 0;
    }
    if (this.pos.y < 0){
      this.pos.y = height;
    }
  }

  draw(){
    stroke(255, 50);
    noFill();
    point(this.pos.x, this.pos.y);
  }

}