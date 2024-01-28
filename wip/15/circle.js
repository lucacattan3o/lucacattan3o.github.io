class Circle{
  constructor(x, y){
    this.pos = createVector(x, y);
    
    let sColors = shuffle(colors);
    this.color = sColors[0];
    
    this.radius = 1;
    this.speed = 1;

    // Space between circles
    this.offset = 5;
    
    this.growing = true;
  }

  update(){
    this.edge();
    this.overlapping();

    if (this.growing){
      this.radius += this.speed;
    }
  }

  edge(){
    if (this.pos.x + this.radius + this.offset > width){
      this.growing = false;
    }
    if (this.pos.x - this.radius - this.offset < 0){
      this.growing = false;
    }
    if (this.pos.y + this.radius + this.offset > height){
      this.growing = false;
    }
    if (this.pos.y - this.radius - this.offset < 0){
      this.growing = false;
    }
  }

  overlapping(){
    // if a circle overlap another circle > stop growing
    if (this.growing){
      for (const other of circles){
        if (this !== other){
          let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
          if (d < (this.radius + other.radius + this.offset)){
            this.growing = false;
            break;
          }
        }
      };
    }
  }

  draw(){
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }

}