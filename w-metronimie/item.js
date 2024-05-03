class Item{
  constructor(x, y, letter){
    this.pos = createVector(x, y);
    this.letter = letter;
    
    // let sColors = shuffle(colors);
    this.color = 255;
    this.width = 100;
    this.height = 120;

    let options = {
      friction: 0.5,
      restitution: 0.1,
    }
    this.body = Bodies.rectangle(this.pos.x, this.pos.y, this.width, this.height, options);
  
    // mBody.setVelocity(this.body, {x: random(-1, 1), y: random(-1, 1)});
    Composite.add(engine.world, this.body);    
  }

  draw(){
    this.drawVertex();

    push();
      fill(this.color);
      translate(this.body.position.x, this.body.position.y)
      rotate(this.body.angle);
      textAlign(CENTER, CENTER);
      textSize(this.width * 1.5);
      text(this.letter, 0, this.height * 0.05);
    pop();
  }

  drawVertex(){
    stroke(150);
    noFill();
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
  }

}