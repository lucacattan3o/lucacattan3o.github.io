class Item{
  constructor(i, j){
    this.i = i;
    this.j = j;

    this.size = 10;

    this.word = obj.word;

    this.count = floor(this.i / this.word.length);
    
    if (this.j % 2 == 1){
      if (this.count % 2 == 1){
        // this.color = colors[0];
        this.aBcolor = true;
      } else {
        // this.color = colors[2];
        this.aBcolor = false;
      }
    } else {
      if (this.count % 2 == 1){
        // this.color = colors[2];
        this.aBcolor = false;
      } else {
        //this.color = colors[0];
        this.aBcolor = true;
      }
    }
    
    this.letter = this.word.charAt(this.i % this.word.length);
    this.letter = this.letter.toUpperCase();

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
      stroke(250);
      // fill(this.color);
      noFill();
      if (obj.showGrid){
        strokeWeight(4);
        rect(0, 0, this.w, this.h);
        push();
        translate(this.w * 0.5, this.h * 0.5);
        rectMode(CENTER);
        // rect(0, 0, this.w * 0.92, this.h * 0.94);
        pop();
      }

      push();
        translate(this.w * 0.5, this.h * 0.5);
        // translate(0, -this.h * 0.2);
        
        scale(this.scaleX, this.scaleY);
        noStroke();
        // fill(this.color);
        // circle(0, 0, this.size);
      pop();

      if (obj.showLetters){
        push();
          translate(this.w * 0.5, this.h * 0.5);

          if (obj.resize){
            translate(this.w * obj.translateX, this.h * obj.translateY);
            scale(this.scaleX * obj.scaleX, this.scaleY * obj.scaleY);
          } else {
            if (fontData[this.letter] !== undefined){
              let data = fontData[this.letter];
              translate(this.w * data.x, this.h * data.y);
              scale(this.scaleX * data.scaleX, this.scaleY * data.scaleY);
            } else {
              scale(this.scaleX, this.scaleY);
            }
          }
          scale(0.95, 0.95);
          textAlign(CENTER, CENTER);
          textFont(font);
          textSize(this.size);

          let c = false;
          let cAnim = (getLoopBounce(0.5 * 0.5) + 1) * 0.5;
          if (obj.mode == 'Animated'){
            if (this.aBcolor){
              c = lerpColor(color(obj.color0), color(obj.color2), cAnim);
            } else {
              c = lerpColor(color(obj.color1), color(obj.color3), cAnim);
            }
          } else {
            if (obj.palette == 'A'){
              if (this.aBcolor){
                c = obj.color0;
              } else {
                c = obj.color1;
              }
            } else {
              if (this.aBcolor){
                c = obj.color2;
              } else {
                c = obj.color3;
              }
            }
          }
          // let c = false;
          // if (abColor){
          //   if (this.aBcolor){
          //     c = colors[obj.color0];
          //   } else {
          //     c = colors[obj.color1];
          //   }
          // } else {
          //   if (this.aBcolor){
          //     c = colors[obj.color2];
          //   } else {
          //     c = colors[obj.color3];
          //   }
          // }

          fill(c);
          noStroke();
          text(this.letter, 0, 0);
        pop();
      }
    pop();
  }
}