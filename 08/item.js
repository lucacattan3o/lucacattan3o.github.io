

class Item {
  constructor(i, j){
    this.i = i;
    this.j = j;
    
    this.shapeNumber = Math.floor(random(0, 5));

    this.rotate = Math.floor(random() * 4) * 0.5;
    this.colors = shuffle(colors);
    this.secOffset = random(0, 1);
  }

  draw(){
    noStroke();

    let secOffset = 0;
    this.sec = frameCount / fps * speed;
    // Linear 0 - 1
    this.t = (this.sec + this.secOffset) % 1;
    // Bounce
    this.bounce = cos(this.t * TWO_PI);

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
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    fill(this.colors[1]);
    arc(0, 0, itemSize * this.bounce, itemSize * this.bounce, 0, TWO_PI);
    fill(this.colors[0]);
    arc(0, 0, itemSize * 0.6 * this.bounce, itemSize * 0.6 * this.bounce, 0, TWO_PI);
    fill(this.colors[2]);
    arc(0, 0, itemSize * 0.3 * this.bounce, itemSize * 0.3 * this.bounce, 0, TWO_PI);
  }

  drawLines(){
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    
    push();
      rotate(this.rotate * PI);  
      translate(0, this.t * itemSize * 0.2);
      fill(this.colors[1]);
      rect(0, -itemSize * 0.4, itemSize, itemSize * 0.2);
      rect(0, 0, itemSize, itemSize * 0.2);
      rect(0, itemSize * 0.4, itemSize, itemSize * 0.2);
    pop();
  }

  drawTriangles(){
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    fill(this.colors[1]);
    triangle(-itemSize * 0.5, -itemSize * 0.5, itemSize * 0.5, -itemSize * 0.5, 0, 0);
    triangle(-itemSize * 0.5, itemSize * 0.5, itemSize * 0.5, itemSize * 0.5, 0, 0);
  }

  drawTriangle(){
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    push();
      fill(this.colors[1]);
      rotate(this.rotate * PI);
      triangle(-itemSize * 0.5, -itemSize * 0.5, -itemSize * 0.5, itemSize * 0.5, itemSize * 0.5, itemSize * 0.5);
    pop();
  }

  drawArc(){
    fill(this.colors[0]);
    rect(0, 0, itemSize, itemSize);
    push();
      fill(this.colors[1]);
      rotate(this.rotate * PI);
      arc(-itemSize * 0.5, -itemSize * 0.5, itemSize * 2, itemSize * 2, 0, PI * 0.5 * this.t);
    pop();
  }
}