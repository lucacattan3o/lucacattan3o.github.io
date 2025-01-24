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

    push();
      noStroke();
    
      let c = color('#ffffff');
      c.setAlpha(5);
      fill(c);
      let r = obj.rivItemSize;
      // add some noise variation
      r = r * this.nr;
      circle(this.x, this.y, r);
      circle(width - this.x, this.y, r);
    pop();
  }
}



