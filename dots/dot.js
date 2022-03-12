class Dot{

  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.color = 0;
    this.prevColor = this.color;
    this.setComputedColor(this.color);
  }

  isMe(x, y){
    if (dist(x, y, this.x, this.y) < (this.radius / 2)){
      return true;
    }
    return false;
  }

  change(){
    this.setColor(1);
  }

  setColor(value){
    this.prevColor = this.color;
    this.color = value;
    this.setComputedColor(value);
  }

  setComputedColor(number){
    this.computedColor = map(this.color, 0, 0.4, 30, 255, true);
  }

  draw(){
    fill(this.computedColor);
    noStroke();
    ellipse(this.x, this.y, this.radius);
  }
}