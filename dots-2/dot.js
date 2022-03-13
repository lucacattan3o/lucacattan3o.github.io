class Dot{

  constructor(x, y, radius, offset){
    this.x = x;
    this.y = y;
    this.radius = radius - offset;
    this.offset = offset;
    
    this.isActive = false;
    this.delta = 0;
  }

  isMe(x, y){
    // Square check
    if (
      (x > this.x - ((this.radius + this.offset) / 2)) && (x < (this.x + (this.radius + this.offset) / 2)) &&
      (y > this.y - ((this.radius + this.offset) / 2)) && (y < (this.y + (this.radius + this.offset) / 2))
    ){
      return true;
    }
    // Circle ckeck
    // if (dist(x, y, this.x, this.y) < (this.radius / 2)){
    //   return true;
    // }
    return false;
  }

  setActive(){
    this.isActive = true;
    this.delta = 1;
  }

  draw(){  
    let color = 40;
    if (this.delta > 0.1){
      color = 255;
      this.delta = this.delta * 0.5;
    } else {
      this.isActive = false;
    }
    fill(color);
    noStroke();
    ellipse(this.x, this.y, this.radius);
  }
}