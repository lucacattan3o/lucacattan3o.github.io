class Item{
  constructor(x, y){
    this.pos = createVector(x, y);
    
    // let sColors = shuffle(colors);
    this.color = 255;
    this.width = 100;
    this.height = 200;

    let options = {
      friction: 0,
      restitution: 1,
    }
    this.body = Bodies.rectangle(this.pos.x, this.pos.y, this.width, this.height, options);
  
    // mBody.setVelocity(this.body, {x: random(-1, 1), y: random(-1, 1)});
    Composite.add(engine.world, this.body);    
  }

  update(){

  }

  draw(){
    push();
    fill(this.color);
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle);
    fill(255);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }

}