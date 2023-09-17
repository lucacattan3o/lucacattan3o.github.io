class Item{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    let c = floor(random(0, colors.length));
    this.color = colors[c];

    this.mVec = createVector(width * 0.5, height * 0.5);
    this.mDir;
    this.mDist;

    this.defSize = width * 0.01;
  }

  update(){
    this.size = this.defSize;
    if (mouseX && mouseY){
      this.mVec = createVector(mouseX, mouseY);
      let tmpPos = this.pos.copy();
      this.mDir = tmpPos.sub(this.mVec);
      this.mDist = this.mDir.mag();
      this.size = this.defSize * map(this.mDist, 0, 150, 4, 1, true);

      // let moltX = map(mouseX, 0, width, -0.01, 0.01);
      // this.vel.x = this.vel.x + moltX;
    }
    // if (mouseIsPressed){
    this.attractToMouse();
    // }
    
    // test sulla velocità che si riduce sempre
    if (mouseIsPressed){
      this.vel.setMag(4);
    } else {
      if (this.vel.mag() > 3){
        this.vel.setMag(this.vel.mag() * 0.99);
      }
    }
    

    // https://p5js.org/examples/simulate-forces.html
    // Velocity changes according to acceleration
    this.vel.add(this.acc);
    // if (this.vel.mag() > 1){
    //   this.vel.setMag(1);
    // }
    // Position changes by velocity
    this.pos.add(this.vel);
    // We must clear acceleration each frame
    this.acc.mult(0);

    this.limits();
  }

  attractToMouse(){
    
    if (this.mDir){
      this.mDir.setMag(-0.05);
    }

    if (this.unique == 915){
      // console.debug(this.unique);
      //console.debug(dir);
      // noLoop();
    }
    this.applyForce(this.mDir);
  }

  applyForce(force){
    this.acc.add(force);
  }

  limits(){
    if (this.pos.x < 0){
      this.pos.x = width;
    } else if (this.pos.x > width){
      this.pos.x = 0;
    }
    if (this.pos.y < 0){
      this.pos.y = height;
    }
    if (this.pos.y > height){
      this.pos.y = 0;
    }
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.y);
      noStroke();
      fill(this.color);
      circle(0, 0, this.size);
    pop();
  }
}