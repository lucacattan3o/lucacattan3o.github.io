

class Item {
  constructor(i, j){
    this.i = i;
    this.j = j;
    
    this.shapeNumber = Math.floor(random(0, 5));
    this.shapeNumber = 3;

    this.rotate = Math.floor(random() * 4) * 0.5;
    this.colors = shuffle(colors);
    this.secOffset = random(0, 1);
    this.secOffset = 0;
  }

  draw(){
    noStroke();

    this.sec = frameCount / fps;
    this.time = this.sec * itemSpeed;
    this.timeSlow = this.sec * itemSpeed * 0.5;
    // Linear 0 - 1
    this.t = (this.time + this.secOffset) % 1;
    this.tSlow = (this.timeSlow + this.secOffset) % 1;
    // Bounce -1 - 1
    this.bounce = cos(this.tSlow * TWO_PI);
    this.bouncePlus = (cos(this.tSlow * TWO_PI) + 1) * 0.5;

    switch (this.shapeNumber) {
      case 0:
        this.drawCircles();
        break;
      
      case 1:
        this.drawLines();
        break;
      
      case 2:
        this.drawTriangles();
        break;
      
      case 3:
        this.drawTriangle();
        break;

      case 4:
        this.drawArc();
        break;
    
      default:
        break;
    }
  }

  drawCircles(){
    push();
      fill(this.colors[0]);
      rect(0, 0, itemSize, itemSize);
      // Big circle
      fill(this.colors[1]);
      arc(0, 0, itemSize * this.bounce, itemSize * this.bounce, 0, TWO_PI);

      // Mid circle
      fill(this.colors[0]);
      arc(0, 0, itemSize * this.bounce * 0.6, itemSize * this.bounce * 0.6, 0, TWO_PI);

      // Little circle
      fill(this.colors[2]);
      arc(0, 0, itemSize * this.bounce * 0.2, itemSize * this.bounce * 0.2, 0, TWO_PI);
    pop();
  }

  drawLines(){
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    
    fill(this.colors[1]);
    push();
      rotate(this.rotate * PI);  
      rectMode(CORNER);
      
      if (this.t < 0.5){
        rect(itemSize * -0.5, itemSize * -0.5, itemSize, itemSize * 0.2 * this.t * 2);
      }
      push();
        translate(0, itemSize * 0.2 * this.t * 2)

        if (this.t >= 0.5){
          rect(itemSize * -0.5, itemSize * -0.7, itemSize, itemSize * 0.2);  
        }
        rect(itemSize * -0.5, itemSize * -0.3, itemSize, itemSize * 0.2);
        
        if (this.t <= 0.5){
          rect(itemSize * -0.5, itemSize * 0.1, itemSize, itemSize * 0.2);
        } else {
          rect(itemSize * -0.5, itemSize * 0.1, itemSize, itemSize * 0.2 * (1 - this.t) * 2);
        }
      pop();
    pop();
  }

  drawTriangles(){
    push();
      rotate(this.rotate * PI);
      fill(this.colors[0]);
      rect(0, 0, itemSize, itemSize);
      fill(this.colors[1]);
      triangle(-itemSize * 0.5, -itemSize * 0.5, itemSize * 0.5, -itemSize * 0.5, itemSize * 0.5 * this.bounce, 0);
      triangle(-itemSize * 0.5, itemSize * 0.5, itemSize * 0.5, itemSize * 0.5, itemSize * 0.5 * this.bounce, 0);
    pop();
  }

  drawTriangle(){
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    push();
      fill(this.colors[1]);
      rotate(this.rotate * PI);
      triangle(-itemSize * 0.5, -itemSize * 0.5, -itemSize * 0.5, itemSize * 0.5, itemSize * 0.5 * this.bounce, itemSize * 0.5);
    pop();
  }

  drawArc(){
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    push();
      fill(this.colors[1]);
      rotate(this.rotate * PI);
      if (this.t <= 0.5){
        arc(-itemSize * 0.5, -itemSize * 0.5, itemSize * 2, itemSize * 2, 0, PI * this.t);
      } else {
        arc(-itemSize * 0.5, -itemSize * 0.5, itemSize * 2, itemSize * 2, PI * (this.t - 0.5), PI * 0.5);
      }
    pop();
  }
}