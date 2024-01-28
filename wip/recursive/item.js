

class Item {
  constructor(x, y, level){
    this.x = x;
    this.y = y;
    this.level = level;

    this.rotate = random(-0.2, 0.2) - 0.5;
    this.weight = 10 * (2 / level);
    this.length = 400 * (level / 3);

    this.xEnd = this.x + this.length * cos(this.rotate * PI);
    this.yEnd = this.y + this.length * sin(this.rotate * PI);
    // definire rotazione
    // spessore, in proporzione al livello
    // lunghezza, in proporzione al livello
  }

  draw(){
    // noStroke();
    strokeWeight(this.weight);
    line(this.x, this.y, this.xEnd, this.yEnd);
  }
}