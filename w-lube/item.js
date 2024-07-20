class Item{
  constructor(x, y, index){
    this.pos = createVector(x, y);
    this.colorA = 255;
    this.colorB = '#000000';
    this.index = index;
  }

  setColor(i){
    this.colorA = paletteA[i];
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.y);
      
      if (obj.showGrid){
        push();
        noFill();
        stroke(obj.line);
        rect(0, 0, itemSizeW, itemSizeH);
        pop();
      }

      push();
        translate(itemSizeW * 0.5, itemSizeH * 0.5);
        noStroke();
        fill(this.colorA);
        circle(0, 0, itemSizeMin * obj.itemSize);
        stroke(this.colorB);
        strokeWeight(itemSizeMin * 0.2 * obj.strokeSize);
        circle(0, 0, itemSizeMin * obj.itemSize);
      pop();
    pop();
  }
}