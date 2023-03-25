class Item{
  constructor(x, y, z, unique){
    this.pos = createVector(x, y, z);
    this.vel = createVector(0, 0, 0);
    this.acc = createVector(0, 0, 0);

    this.unique = unique;

    let c = floor(random(0, colors.length));
    this.color = colors[c];

    this.neighbors = [];
  }

  update(){
    // this.attractToCenter();

    // https://p5js.org/examples/simulate-forces.html
    // Velocity changes according to acceleration
    this.vel.add(this.acc);
    // position changes by velocity
    this.pos.add(this.vel);
    // We must clear acceleration each frame
    this.acc.mult(0);
  }

  attractToCenter(){
    let center = createVector(0, 0, 0);
    let dir = this.pos.sub(center);
    dir.setMag(1);

    if (this.unique == 915){
      // console.debug(this.unique);
      console.debug(dir);
    }
    // this.applyForce(dir);
  }

  applyForce(force){
    this.acc.add(force);
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.z, this.pos.y);
      noStroke();
      ambientMaterial(this.color);
      sphere(2, 10, 10);
    pop();
  }
}