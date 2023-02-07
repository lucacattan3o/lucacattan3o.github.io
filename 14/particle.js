class Particle{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.posPrev = createVector(this.pos.x, this.pos.y);
    
    this.points = [];
    this.nPoint = 5;

    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = 4;
    let sColors = shuffle(colors);
    this.color = sColors[0];
    // this.color = '#fff';
  }

  update(){
    // this.posPrev.set(this.pos);
    this.addPoint(this.pos.x, this.pos.y);
    // Update the velocity based on flow field
    let flowForce = noiseVectorByPosision(this.pos);
    
    this.acc.add(flowForce);
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.pos.add(this.vel);

    // Reset the acceleration
    this.acc.mult(0);

    this.limit();
  }

  limit(){
    if (this.pos.x > width){
      this.pos.x = 0;
      this.posPrev.x = 0;
      this.points = [];
    }
    if (this.pos.x < 0){
      this.pos.x = width;
      this.posPrev.x = width;
      this.points = [];
    }
    if (this.pos.y > height){
      this.pos.y = 0;
      this.posPrev.y = 0;
      this.points = [];
    }
    if (this.pos.y < 0){
      this.pos.y = height;
      this.posPrev.y = height;
      this.points = [];
    }
  }

  draw(){
    // noFill();
    // let cx = map(this.pos.x, 0, width, 0, 255);
    // let cy = map(this.pos.y, 0, height, 0, 255);
    let c = color(this.color);
    c.setAlpha(100);
    stroke(c);
    strokeWeight(1);
    line(this.posPrev.x, this.posPrev.y, this.pos.x, this.pos.y);
  }

  addPoint(x, y){
    if (this.points.length > this.nPoint){
      this.points.shift();
    }
    this.points.push({x, y});
  }

  debug(){
    let c = color(this.color);
    // c.setAlpha(50);
    stroke(c);
    strokeWeight(3);
    beginShape();
    this.points.forEach(pos => {
      vertex(pos.x, pos.y)
    });
    endShape();
  }

}