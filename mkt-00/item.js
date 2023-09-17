class Item{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    let c = floor(random(0, colors.length));
    this.color = colors[c];
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
    let tmpPos = this.pos.copy();
    let dir = tmpPos.sub(worldCenter);
    dir.setMag(-0.1);

    if (this.unique == 915){
      // console.debug(this.unique);
      //console.debug(dir);
      // noLoop();
    }
    this.applyForce(dir);
  }

  applyForce(force){
    this.acc.add(force);
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.y);
      noStroke();
      circle(0, 0, itemSize * 0.5);
    pop();
  }
}