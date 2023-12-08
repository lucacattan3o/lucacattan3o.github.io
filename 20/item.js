class Item{
  constructor(i, j){
    this.i = i;
    this.j = j;

    this.size = 10;

    this.word = 'UAO';

    this.count = floor(this.i / this.word.length);
    
    if (this.j % 2 == 1){
      if (this.count % 2 == 1){
        this.color = colors[0];
      } else {
        this.color = colors[2];
      }
    } else {
      if (this.count % 2 == 1){
        this.color = colors[2];
      } else {
        this.color = colors[0];
      }
    }

    
    this.letter = this.word.charAt(this.i % this.word.length);

    /*
    if (i % 2 == 1){
      if (j % 2 == 1){
        this.color = colors[0];
      } else {
        this.color = colors[2];
      }
    } else {
      if (j % 2 == 1){
        this.color = colors[2];
      } else {
        this.color = colors[0];
      }
    }*/

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
      strokeWeight(2);
      stroke(250);
      // fill(this.color);
      noFill();
      if (obj.showGrid){
        rect(0, 0, this.w, this.h);
      }

      push();
        translate(this.w * 0.5, this.h * 0.5);
        // translate(0, -this.h * 0.2);
        
        scale(this.scaleX, this.scaleY);
        noStroke();
        fill(this.color);
        // circle(0, 0, this.size);
      pop();
      push();
        translate(this.w * 0.5, this.h * 0.5);
        translate(0, -this.h * 0.15);
        scale(this.scaleX * 1.1, this.scaleY * 1.1);
        textAlign(CENTER, CENTER);
        textFont(font);
        textSize(this.size);
        fill(this.color);
        noStroke();
        text(this.letter, 0, 0);
      pop();
    pop();
  }
}