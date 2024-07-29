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

        // disegno l'item standard
        strokeWeight(2);
        fill(item.c);
        stroke(item.c);
        rect(0, 0, itemSizeW, itemSizeH);

        // controllo la mappa di profondità
        let depth = this.checkItemDepth(item.x, item.y);
        if (depth){
          // devo disegnarne 1 a sinistra
          stroke(255);
          rect(-itemSizeW * depth, 0, itemSizeW, itemSizeH);
        }
        
        pop();
      });

    pop();
  }

  checkItemDepth(x, y){
    let ix = this.x + x + (itemSizeW * 0.5);
    let iy = this.y + y + (itemSizeH * 0.5);
    if (dist(ix, iy, w * 0.5, h * 0.5) < w * circleSize * 0.5){
      if (!firstShift){
        firstShift = this.c;
      }
      // ritorno il grado di shift
      // al primo livello è uno, dopo aumenta
      return 1 + (this.c - firstShift);
    }
    return 0;
  }
}