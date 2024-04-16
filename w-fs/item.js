class Item{
  constructor(x, y, z, alpha){
    this.pos = createVector(x, y, z);
    this.vel = createVector(0, 0, 0);
    this.acc = createVector(0, 0, 0);

    this.alpha = alpha;

    let c = floor(map(this.alpha,0, TWO_PI, 0, colors.length, true));
    let hue = map(this.alpha,0, TWO_PI, 0, 360);
    colorMode(HSB);
    this.color = color(hue, 100, 100);
  }

  update(){
    this.attractToCenter();

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

  isEnd(){
    let tmpPos = this.pos.copy();
    let dist = tmpPos.sub(worldCenter);
    if (dist.mag() < 100){
      return true;
    }
    return false;
  }

  applyForce(force){
    this.acc.add(force);
  }

  draw(){
    stroke(255);
    line(0, 0, 0, this.pos.x, this.pos.z, this.pos.y);
    push();
      translate(this.pos.x, this.pos.z, this.pos.y);
      noStroke();
      ambientMaterial(this.color);
      sphere(itemSize * 1, 20, 20);
    pop();
  }
}