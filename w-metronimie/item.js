class Item{
  constructor(x, y, letter){
    this.pos = createVector(x, y);
    this.letter = letter;
    
    // let sColors = shuffle(colors);
    this.color = 255;
    this.width = 100;
    this.height = 120;

    let options = {
      // restitution: 0.01,
      frictionStatic: 20,
    }
    this.body = Bodies.rectangle(this.pos.x, this.pos.y, this.width, this.height, options);
    Composite.add(engine.world, this.body);    
  }

  draw(){

    this.pos.x = (this.body.bounds.min.x + this.body.bounds.max.x) / 2;
    this.pos.y = (this.body.bounds.min.y + this.body.bounds.max.y) / 2;

    this.drawVertex();

    // console.debug(this.body);

    push();
      stroke('red');
      strokeWeight(4);
      const centerX = (this.body.bounds.min.x + this.body.bounds.max.x) / 2;
      const centerY = (this.body.bounds.min.y + this.body.bounds.max.y) / 2;
      // circle(centerX, centerY, 10);
      // point(this.body.bounds.min.x, this.body.bounds.min.y);
      // point(this.body.bounds.max.x, this.body.bounds.max.y);
    pop();

    push();
      fill(this.color);
      translate(this.pos.x, this.pos.y)
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