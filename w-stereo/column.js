class Column{
  constructor(c, items){
    this.y = 0;
    this.c = c;
    this.x = c * colWidth;
    this.items = items;
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
        strokeWeight(2);
        stroke(item.c);
        rect(0, 0, itemSizeW, itemSizeH);
        pop();
      });

    pop();
  }
}