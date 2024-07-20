class Item{
  constructor(x, y){
    this.pos = createVector(x, y);
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.y);
      translate(itemSizeW * 0.5, itemSizeH * 0.5);
      fill(255);
      noStroke();
      circle(0, 0, itemSizeMin * obj.itemSize);
    pop();
  }
}