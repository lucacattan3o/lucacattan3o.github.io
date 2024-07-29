class Column{
  constructor(c){
    this.y = 0;
    this.c = c;
    this.x = c * colWidth;
    this.itemSizeW = colWidth / obj.xItems;
    this.itemSizeH = h / obj.yItems;
    this.items = [];
    this.buildNoise();
  }

  buildNoise(){
    for (let i = 0; i < obj.xItems; i++) {
      for (let j = 0; j < obj.yItems; j++) {
        let x = this.itemSizeW * i;
        let y = this.itemSizeH * j;
        let n = noise(x, y);
        let c = floor(n * palette.length + 0.5);
        this.items.push({
          x: x,
          y: y,
          c: palette[c],
        });
      }
    }
  }

  draw(){
    push();
      translate(this.x, this.y);
      stroke(255);
      strokeWeight(4);
      noFill();
      // rect(0, 0, colWidth, h);
    pop();

    push();
      translate(this.x, this.y);

      this.items.forEach(item => {
        push();
        translate(item.x, item.y);
        fill(item.c);
        noStroke();
        rect(0, 0, this.itemSizeW, this.itemSizeH);
        pop();
      });

    pop();
  }
}