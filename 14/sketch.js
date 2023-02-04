let fps = 30;

let gridItemsCount = 20;
let gridItemSize;
let vectors = [];

let particles = [];
let particlesCount = 50;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  gridItemSize = width / gridItemsCount;

  let detail = 1;
  let amp = 0.2;
  noiseDetail(detail, amp);

  for (let gx = 0; gx < gridItemsCount; gx++) {
    for (let gy = 0; gy < gridItemsCount; gy++) {
      let x = gridItemSize * gx + gridItemSize * 0.5;
      let y = gridItemSize * gy + gridItemSize * 0.5;

      let pos = createVector(x, y);

      // Noise 0 - 1
      let n = noise(x, y);

      let force = new p5.Vector(0, gridItemSize * 0.5);
      force.setHeading(PI * n);

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
  background(0);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  recordSketchPost(12);
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
    this.vel = p5.Vector.random2D();
    this.vel.mult(8);
    this.size = 2;
  }

  update(){
    this.pos.add(this.vel);

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
    stroke(255);
    noFill();
    circle(this.pos.x, this.pos.y, this.size);
  }

}