class Column{
  constructor(x, y, c){
    this.y = 0;
    this.c = c;
    this.x = x * colWidth;
  }

  draw(){
    push();
      translate(this.x, this.y);
      stroke(255);
      strokeWeight(4);
      noFill();
      rect(0, 0, colWidth, h);
    pop();
  }
}