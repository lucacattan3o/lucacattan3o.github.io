class Item{
  constructor(x, y){
    this.x = x;
    this.y = y;
    
    this.velX = random(-1, 1);
    this.velY = random(-1, 1);
    this.nS = 0.01 * obj.rivNoiseScale;
    this.n = 0;
    this.nr = 0;
    this.life = true;
  }
  
  update(){
    if (!this.life){
      return;
    }

    let nx = this.x * this.nS;
    let ny = this.y * this.nS;
    this.n = noise(nx, ny);
    this.nr = noise(nx + 1000, ny);
    this.velX = cos(this.n * TWO_PI);
    this.velY = -sin(this.n * TWO_PI);
    
    this.x += this.velX;
    this.y += this.velY;

    let dc = dist(this.x, this.y, width * 0.5, height * 0.5);
    let radius = width * 0.5 * obj.rivRadius;
    if (dc > radius){
      this.life = false;
    }

    
    // this.rs = map(dc, 0, radius, 1, 0, true);
    
    // this.limit();
  }
  
  limit(){
    if (this.x > width){
      this.x = 0;
    }
    if (this.x < 0){
      this.x = width;
    }
    if (this.y > height){
      this.y = 0;
    }
    if (this.y < 0){
      this.y = height;
    }
  }
  
  draw(){
    if (!this.life){
      return;
    }

    this.drawSimple();
    // this.drawGradient();
    // this.drawSquare();
  }

  drawSimple(){
    push();
      noStroke();
      let c = color('#ffffff');
      c.setAlpha(5);
      fill(c);
      let r = obj.rivItemSize;
      r = r * this.nr;
      circle(this.x, this.y, r);
      circle(width - this.x, this.y, r);
    pop();
  }

  drawSquare(){
    push();
      noStroke();
      fill(255);
      let r = obj.rivItemSize;
      r = r * this.nr;
      rect(this.x, this.y, r);
      rect(width - this.x, this.y, r);
    pop();
  }

  drawGradient(){
    push();
      noStroke();
      let r = obj.rivItemSize;
      // add some noise variation
      r = r * this.nr;

      let steps = 4;
      let step = 1 / steps;

      let c = color(255);
      c.setAlpha(1);
      stroke(c);
      strokeWeight(5);
      noFill();

      circle(this.x, this.y, r * 1);
      // circle(this.x, this.y, r * 0.75);
      // circle(this.x, this.y, r * 0.5);
      circle(this.x, this.y, r * 0.25);

      circle(width - this.x, this.y, r * 1);
      // circle(width - this.x, this.y, r * 0.75);
      // circle(width - this.x, this.y, r * 0.5);
      circle(width - this.x, this.y, r * 0.25);
      
      // not working
      // for (i = 0; i < steps; i++){
      //   let dr = 1 - (step * i);
      //   circle(this.x, this.y, r * dr);
      //   circle(width - this.x, this.y, r * dr);
      // }
    pop();
  }
}



