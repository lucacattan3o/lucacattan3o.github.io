class Item{
  constructor(x, y, letter, bg){
    this.pos = createVector(x, y);
    this.letter = letter;
    
    // let sColors = shuffle(colors);
    this.color = 255;
    this.width = itemSize;
    this.height = itemSize * 1.25;

    this.bg = bg;

    this.letterData = null;
    if (lettersData[this.letter]!== undefined){
      this.letterData = lettersData[this.letter];
      this.width = this.width * this.letterData.width;
    }

    let options = {
      // restitution: 0.01,
      frictionStatic: 100,
    }
    this.body = Bodies.rectangle(this.pos.x, this.pos.y, this.width, this.height, options);
    Composite.add(engine.world, this.body);    
  }

  draw(){

    this.pos.x = (this.body.bounds.min.x + this.body.bounds.max.x) / 2;
    this.pos.y = (this.body.bounds.min.y + this.body.bounds.max.y) / 2;

    if (obj.showDebug){
      this.drawVertex();
    }

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
      noStroke();
      translate(this.pos.x, this.pos.y)
      rotate(this.body.angle);
      textFont(font, itemSize * 1.5);  
      textAlign(CENTER, CENTER);
      translate(0, -itemSize * 0.05);
      text(this.letter, 0, 0);
    pop();
  }

  drawVertex(){
    stroke(150);
    noFill();
    // noStroke();
    // stroke(this.bg);
    // strokeWeight(itemSize * 0.1);
    // strokeJoin(ROUND);
    // noStroke();
    // fill(this.bg);
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