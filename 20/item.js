class Item{
  constructor(i, j, dir){
    this.i = i;
    this.j = j;

    if (dir == undefined){
      this.n = noise(i * 0.1, j * 0.1);
      this.dir = floor(this.n * 10);
    } else {
      this.dir = dir;
    }
    
    this.size = itemSizeMin;
    this.x = this.i * this.size;
    this.y = this.j * this.size;    

    this.anim = false;
    this.f = 0;
    this.a = 0;
    this.incr = 1 / fps / obj.vel;
    this.end = false;
  }

  setDirection(dir){
    this.dir = dir;
  }

  start(){
    this.anim = true;
    setTimeout(() => {
      this.end = true;
    }, obj.vel * 1000);
  }

  update(){
    if (this.anim && !this.end){
      this.f++;
      this.a += this.incr;
    }
  }

  draw(){
    push();
      translate(this.x, this.y);
      translate(this.size * 0.5, this.size * 0.5);
      noStroke();
      
      switch (this.dir) {
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

        // Alto
        case '2':
          rotate(PI);
          this.drawLine();
          break;

        // Basso
        case '8':
          this.drawLine();
          break;

        // Sinistra
        case '4':
          rotate(PI * 0.5);
          this.drawLine();
          break;

        // Destra
        case '6':
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
      let radius = ii * lineSize * 2;
      fill(colors[ii - 1]);
      
      if (this.end){
        arc(0, 0, radius, radius, 0, HALF_PI);
      } else {
        arc(0, 0, radius, radius, 0, HALF_PI * this.a);
      }
    }
  }
}