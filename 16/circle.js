class Circle{
  constructor(x, y){
    this.pos = createVector(x, y);
    
    let sColors = shuffle(colors);
    this.color = sColors[0];

    // Space between circles
    this.offset = 0;
    
    this.growing = true;

    let options = {
      friction: 0.5,
      restitution: 1,
    }
    this.body = Bodies.circle(this.pos.x, this.pos.y, 10, options);
  
    // mBody.setVelocity(this.body, {x: random(-3, 3), y: random(-3, 3)});
    Composite.add(engine.world, this.body);    
  }

  update(){
    if (this.growing){
      this.edge();
      this.overlapping();
      mBody.scale(this.body, 1.05, 1.05);
    }
  }

  playSound(){
    let note = random(['F3', 'G4']);
    // note = 'A4';
    // note velocity (volume, from 0 to 1)
    // let velocity = random();
    // time from now (in seconds)
    let time = 0;
    // note duration (in seconds)
    let dur = 1/6;

    monoSynth.play(note, 0.5, time, dur);
  }

  edge(){
    if (this.body.position.x + this.body.circleRadius > width){
      this.growing = false;
    }
    if (this.body.position.x - this.body.circleRadius < 0){
      this.growing = false;
    }
    if (this.body.position.y + this.body.circleRadius > height){
      this.growing = false;
    }
    if (this.body.position.y - this.body.circleRadius < 0){
      this.growing = false;
    }
  }

  overlapping(){
    // if a circle overlap another circle > stop growing
    if (this.growing){
      for (const other of circles){
        if (this !== other){
          let d = dist(this.body.position.x, this.body.position.y, other.body.position.x, other.body.position.y);
          if (d < (this.body.circleRadius + other.body.circleRadius)){
            this.growing = false;
            break;
          }
        }
      };
    }
  }

  draw(){
    fill(this.color);
    circle(this.body.position.x, this.body.position.y, this.body.circleRadius * 1.5);
  }

}