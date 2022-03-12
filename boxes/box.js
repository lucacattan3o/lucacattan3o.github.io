class Box {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    let options = {
      friction: 0,
      restitution: 0,
    }
    this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, options);
    Composite.add(engine.world, this.body);

    this.color = getColorVariation(parseInt(random(0, 3)));
  }

  move(){
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    this.angle = this.body.angle;
  }

  draw(){
    fill(this.color.r, this.color.g, this.color.b, this.color.alpha);
    strokeWeight(1);
    
    let vertices = this.body.vertices;
    beginShape();
    for (let index = 0; index < vertices.length; index++) {
      let x = vertices[index].x;
      let y = vertices[index].y;
      vertex(x, y);
    }
    let x = vertices[0].x;
    let y = vertices[0].y;
    vertex(x, y);
    endShape();

    // push();
    //   rotate(radians(this.angle));
    //   rectMode(CENTER);
    //   translate(this.x, this.y);
    //   rect(0, 0, this.size);
    // pop();
  }
}