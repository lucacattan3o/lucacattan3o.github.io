class Item{
  constructor(x, y, index){
    this.pos = createVector(x, y);
    this.colorA = floor(random(0, paletteA.length));
    this.colorB = floor(random(0, paletteB.length));
    this.index = index;
    this.size = itemSizeMin;
    if (obj.randomSize){
      this.size = itemSizeMin * random(0.5, 1.5);
    }
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
        let pa = 'colA' + this.colorA;
        fill(obj[pa]);
        circle(0, 0, this.size * obj.itemSize);

        let pb = 'colB' + this.colorB;
        stroke(obj[pb]);
        strokeWeight(this.size * 0.2 * obj.strokeSize);
        circle(0, 0, this.size * obj.itemSize);
      pop();
    pop();
  }
}