class Item{
  constructor(x, y){
    this.x = x;
    this.y = y;
    
    this.velX = random(-1, 1);
    this.velY = random(-1, 1);
    this.nS = 0.01;
    this.n = 0;
    this.r = width * 0.01;
    this.life = width * 0.35;
  }
  
  update(){
    let nx = this.x * this.nS;
    let ny = this.y * this.nS;
    this.n = noise(nx, ny);
    this.velX = cos(this.n * TWO_PI);
    this.velY = sin(this.n * TWO_PI);
    
    this.x += this.velX;
    this.y += this.velY;
    
    // this.limit();
    // this.life--;
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
    if (this.life < 0){
      return;
    }
    push();
      noStroke();
    
      fill(255, 20);
      let r = this.r * this.n;
      circle(this.x, this.y, r);
      circle(width - this.x, this.y, r);
    pop();
  }
}



