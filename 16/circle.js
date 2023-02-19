class Circle{
  constructor(x, y){
    this.pos = createVector(x, y);
    
    let sColors = shuffle(colors);
    this.color = sColors[0];

    // Space between circles
    this.offset = 0;
    
    this.growing = true;

    let options = {
      friction: 0,
      restitution: 1,
    }
    this.body = Bodies.circle(this.pos.x, this.pos.y, 10, options);
    // console.debug(this.body);
    // this.body.angle = PI * 0.01;
    Composite.add(engine.world, this.body);
  }

  update(){
    this.edge();
    this.overlapping();

    if (this.growing){
      mBody.scale(this.body, 1.05, 1.05);
      // this.body.circleRadius += this.speed;
    }
  }

  edge(){
    if (this.body.position.x + this.body.circleRadius + this.offset > width){
      this.growing = false;
    }
    if (this.body.position.x - this.body.circleRadius - this.offset < 0){
      this.growing = false;
    }
    if (this.body.position.y + this.body.circleRadius + this.offset > height){
      this.growing = false;
    }
    if (this.body.position.y - this.body.circleRadius - this.offset < 0){
      this.growing = false;
    }
  }

  overlapping(){
    // if a circle overlap another circle > stop growing
    if (this.growing){
      for (const other of circles){
        if (this !== other){
          let d = dist(this.body.position.x, this.body.position.y, other.body.position.x, other.body.position.y);
          if (d < (this.body.circleRadius + other.body.circleRadius + this.offset)){
            this.growing = false;
            break;
          }
        }
      };
    }
  }

  draw(){
    fill(this.color);
    circle(this.body.position.x, this.body.position.y, this.body.circleRadius * 1.8);
  }

}