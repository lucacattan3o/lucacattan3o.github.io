class Item{
  constructor(i, j){
    this.i = i;
    this.j = j;

    this.size = 10;
     
    this.edge = false;
    if (i == obj.itemsX - 1 || i == 0){
      this.edge = true;
    }
    if (j == obj.itemsY - 1 || j == 0){
      this.edge = true;
    }

    if (i % 2 == 1){
      if (j % 2 == 1){
        this.abColor = true;
      } else {
        this.abColor = false;
      }
    } else {
      if (j % 2 == 1){
        this.abColor = false;
      } else {
        this.abColor = true;
      }
    }

    // this.points = font.textToPoints('W', 0, 0, 10, { sampleFactor:  0.5 });
  }

  update(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.scaleX = this.w / this.size;
    this.scaleY = this.h / this.size;
  }

  draw(){
    push();
      translate(this.x, this.y);
      stroke(250);
      // fill(this.color);
      noFill();
      
      if (obj.showGrid){
        strokeWeight(4);
        rect(0, 0, this.w, this.h);
        push();
        translate(this.w * 0.5, this.h * 0.5);
        rectMode(CENTER);
        rect(0, 0, this.w * 0.92, this.h * 0.94);
        pop();
      }

      let ac = map(getLoopBounce(0.25 * 0.25), -1, 1, 0, 100);
      let col = color(ac, 100, 100);
      ac += 20;
      let ab = ac % 100;
      let col2 = color(ab, 100, 100);
      strokeWeight(2);

      if (!this.edge){
        push();
          translate(this.w * 0.5, this.h * 0.5);    
          scale(this.scaleX, this.scaleY);
          scale(0.8, 0.8);
          // noStroke();
          if (this.abColor){
            this.color = obj.color0;
            stroke(col);
            fill(0);
            circle(0, 0, this.size);
          }
        pop();
      }

    pop();
  }
}