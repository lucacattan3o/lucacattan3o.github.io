class Item{
  constructor(x, y, index){
    this.pos = createVector(x, y);
    this.index = index;

    let ci = this.index % paletteA.length;
    this.colorA = random(paletteA);
    this.colorB = random(paletteB);
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.y);
      translate(itemSizeW * 0.5, itemSizeH * 0.5);
      noStroke();
      fill(this.colorA);
      circle(0, 0, itemSizeMin * obj.itemSize);
      stroke(this.colorB);
      strokeWeight(itemSizeMin * 0.05);
      circle(0, 0, itemSizeMin * obj.itemSize);
    pop();
  }
}