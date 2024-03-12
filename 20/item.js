class Item{
  constructor(i, j, index){
    this.i = i;
    this.j = j;
    this.index = index;

    this.dir = null;
    
    this.size = itemSizeMin;
    this.x = this.i * this.size;
    this.y = this.j * this.size; 

    this.anim = false;
    this.end = false;
    this.f = 0;
    this.a = 0;
    this.incr = 1 / fps / (1 / obj.speed);

    this.inverted = false;
  }

  setDirection(dir){
    this.dir = dir;
  }

  start(){
    this.anim = true;
  }

  update(){
    if (this.anim) {
      if (this.a <= 1){
        this.incr = 1 / fps / (1 / obj.speed);
        this.f++;
        this.a += this.incr;
      } else {
        this.end = true;
        this.anim = false;
        walker.next();
      }
    }
  }

  draw(){
    push();
      translate(this.x, this.y);
      translate(this.size * 0.5, this.size * 0.5);
      noStroke();

      if (obj.showDebug){
        push();
          noFill();
          stroke(255);
          strokeWeight(1);
          rectMode(CENTER);
          rect(0, 0, this.size, this.size);
          fill(255);
          textAlign(CENTER, CENTER);
          textSize(this.size * 0.3);
          text(this.index, 0, 0);
          // textSize(this.size * 0.15);
          // text(this.i + ' - ' + this.j, 0, this.size * 0.25);
        pop();
      }
      
      switch (this.dir) {
        case '--':
          this.drawCurve();
          break;

        case 'sx-to-up':
          rotate(PI * 0.5);
          this.drawCurve();
          break;

        case 'sx-to-dw':
          this.inverted = true;
          rotate(PI);
          this.drawCurve();
          break;
        
        case 'up-to-dx':
          rotate(PI);
          this.drawCurve();
          break;

        case 'up-to-sx':
          this.inverted = true;
          rotate(PI * 1.5);
          this.drawCurve();
          break;
        
        case 'dx-to-dw':
          rotate(PI * 1.5);
          this.drawCurve();
          break;
        
        case 'dx-to-up':
          this.inverted = true;
          this.drawCurve();
          break;

        case 'dw-to-dx':
          this.inverted = true;
          rotate(PI * 0.5);
          this.drawCurve();
          break;
        
        case 'dw-to-sx':
          this.drawCurve();
          break;

        // lines

        case 'up':
          rotate(PI);
          this.drawLine();
          break;

        case 'dw':
          this.drawLine();
          break;

        case 'sx':
          rotate(PI * 0.5);
          this.drawLine();
          break;

        case 'dx':
          rotate(-PI * 0.5);
          this.drawLine();
          break;
      
        default:
          break;
      }
    pop();
  }

  drawLine(){
    translate(-this.size * 0.5, -this.size * 0.5);
    translate(offset, 0);
    for (let i = 0; i < obj.lines; i++) {
      let x = i * lineSize;
      push();
        translate(x, 0);
        fill(colors[i]);
        if (this.end){
          rect(0, 0, lineSize, this.size);
        } else {
          rect(0, 0, lineSize, this.size * this.a);
        }
      pop();
    }
  }

  drawCurve(){
    translate(-this.size * 0.5, -this.size * 0.5);
    for (let i = 0; i < obj.lines; i++) {
      let ii = obj.lines - i;
      let radius = ii * lineSize * 2 + (offset * 2);
      if (this.inverted){
        ii = i + 1;
      }
      fill(colors[ii - 1]);
      if (this.end){
        arc(0, 0, radius, radius, 0, HALF_PI);
      } else {
        if (this.inverted){
          arc(0, 0, radius, radius, HALF_PI * (1 - this.a), HALF_PI);
        } else {
          arc(0, 0, radius, radius, 0, HALF_PI * this.a);
        }
      }
      fill(obj.background);
      arc(0, 0, offset * 2, offset * 2, 0, HALF_PI);
    }
  }
}