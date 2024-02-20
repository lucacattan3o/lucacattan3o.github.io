class Item{
  constructor(i, j){
    this.i = i;
    this.j = j;

    this.size = itemSizeMin;
    this.x = this.i * this.size;
    this.y = this.j * this.size;

    this.n = noise(i * 0.1, j * 0.1);
    this.nInt = floor(this.n * 10);
    this.end = false;
    setTimeout(() => {
      this.end = true;
    }, 4000)
  }

  draw(){
    push();
      translate(this.x, this.y);
      translate(this.size * 0.5, this.size * 0.5);
      noStroke();
      
      switch (this.nInt) {
        case 6:
          this.drawCurve();
          break;

        case 7:
          rotate(PI * 0.5);
          this.drawCurve();
          break;
        
        case 8:
          rotate(PI);
          this.drawCurve();
          break;
        
        case 3:
          rotate(PI * 1.5);
          this.drawCurve();
          break;

        case 4:
          this.drawLine();
          break;

        case 5:
          rotate(PI * 0.5);
          this.drawLine();
          break;
        
      
        default:
          break;
      }
    pop();
  }

  drawLine(){
    translate(-this.size * 0.5, -this.size * 0.5);
    for (let i = 0; i < obj.lines; i++) {
      let x = i * lineSize;
      push();
        translate(x, 0);
        fill(colors[i]);
        if (this.end){
          rect(0, 0, lineSize, this.size);
        } else {
          rect(0, 0, lineSize, this.size * getLoop(0.25));
        }
      pop();
    }
  }

  drawCurve(){
    translate(-this.size * 0.5, -this.size * 0.5);
    for (let i = 0; i < obj.lines; i++) {
      let ii = obj.lines - i;
      let radius = ii * lineSize * 2;
      fill(colors[ii - 1]);
      
      if (this.end){
        arc(0, 0, radius, radius, 0, HALF_PI);
      } else {
        arc(0, 0, radius, radius, 0, HALF_PI * getLoop(0.25));
      }
    }
  }
}