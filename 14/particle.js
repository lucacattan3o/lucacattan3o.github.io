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
    let cx = map(this.pos.x, 0, width, 0, 255);
    let cy = map(this.pos.y, 0, height, 0, 255);
    // let c = color(255, cx, cy);
    let c = color(255);
    c.setAlpha(100);
    stroke(c);
    strokeWeight(1);
    line(this.posPrev.x, this.posPrev.y, this.pos.x, this.pos.y);
  }

}