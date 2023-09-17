class Item{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    let c = floor(random(0, colors.length));
    this.color = colors[c];

    this.mVec = createVector(width * 0.5, height * 0.5);
  }

  update(){
    if (mouseX && mouseY){
      this.mVec = createVector(mouseX, mouseY);
    }
    this.attractToMouse();

    // https://p5js.org/examples/simulate-forces.html
    // Velocity changes according to acceleration
    this.vel.add(this.acc);
    // Position changes by velocity
    this.pos.add(this.vel);
    // We must clear acceleration each frame
    this.acc.mult(0);
  }

  attractToMouse(){
    let tmpPos = this.pos.copy();
    let dir = tmpPos.sub(this.mVec);
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
      fill(this.color);
      circle(0, 0, itemSize * 0.1);
    pop();
  }
}