class Item{
  constructor(x, y){
    this.x = x;
    this.y = y;
    
    this.velX = random(-1, 1);
    this.velY = random(-1, 1);
    this.nS = 0.01 * obj.noiseScale;
    this.n = 0;
    this.rs = 1;
    this.life = true;
  }
  
  update(){
    if (!this.life){
      return;
    }

    let nx = this.x * this.nS;
    let ny = this.y * this.nS;
    this.n = noise(nx, ny);
    this.velX = cos(this.n * TWO_PI);
    this.velY = -sin(this.n * TWO_PI);
    
    this.x += this.velX;
    this.y += this.velY;

    let dc = dist(this.x, this.y, width * 0.5, height * 0.5);
    let radius = width * 0.5 * obj.radius;
    if (dc > radius){
      this.life = false;
    }

    this.rs = map(dc, 0, radius, 1, 0);
    
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
    
      let c = color(obj.color);
      c.setAlpha(10);
      fill(c);
      let r = obj.itemSize * this.rs;
      circle(this.x, this.y, r);
      circle(width - this.x, this.y, r);
    pop();
  }
}



