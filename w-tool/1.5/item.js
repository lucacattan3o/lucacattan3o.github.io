class Item{
  constructor(color){
    this.x = 0;
    this.y = random(0, 200);
    
    this.velX = random(-1, 1);
    this.velY = random(-1, 1);

    this.life = true;
    this.color = color;
  }
  
  update(){
    // if (!this.life){
    //   return;
    // }
    this.x += this.velX;
    this.y += this.velY;
  }
  
  limit(){
    if (this.x > width){
      this.x = 0;
    }
    if (this.x < 0){
      this.x = width;
    }
    if (this.y > height){
      this.y = 0;
    }
    if (this.y < 0){
      this.y = height;
    }
  }
  
  draw(){
    if (!this.life){
      return;
    }

    this.drawSimple();
    // this.drawGradient();
    // this.drawSquare();
  }

  drawSimple(){
    push();
      noStroke();
      let c = color(this.color);
      // c.setAlpha(obj.rivItemOpacity);
      fill(c);
      let r = obj.radItemSize;
      circle(this.x, this.y, r);
      circle(-this.x, this.y, r);
    pop();
  }

  drawGradient(){
    push();
      noStroke();
      let r = obj.rivItemSize;
      // add some noise variation
      r = r * this.nr;

      let steps = 4;
      let step = 1 / steps;

      let c = color(255);
      c.setAlpha(1);
      stroke(c);
      strokeWeight(5);
      noFill();

      circle(this.x, this.y, r * 1);
      // circle(this.x, this.y, r * 0.75);
      // circle(this.x, this.y, r * 0.5);
      circle(this.x, this.y, r * 0.25);

      circle(width - this.x, this.y, r * 1);
      // circle(width - this.x, this.y, r * 0.75);
      // circle(width - this.x, this.y, r * 0.5);
      circle(width - this.x, this.y, r * 0.25);
      
      // not working
      // for (i = 0; i < steps; i++){
      //   let dr = 1 - (step * i);
      //   circle(this.x, this.y, r * dr);
      //   circle(width - this.x, this.y, r * dr);
      // }
    pop();
  }
}



