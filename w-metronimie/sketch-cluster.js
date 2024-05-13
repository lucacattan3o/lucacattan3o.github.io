class Cluster{
  constructor(x, y, string){
    this.string = string;
    this.x = x;
    this.y = y;
    this.bg = random(palette);
    this.gap = itemSize * 0.0652;
    this.force = itemSize * 0.002;
    console.debug(this.force);
    this.letterSize = 1.7;

    this.scaled = false;
    this.scale = 1;
    this.overScale = 2;
    this.debounce = true;

    // var group = mBody.nextGroup(true);
    this.rope = Composites.stack(this.x, this.y, this.string.length, 1, this.gap, this.gap, function(x, y, delta) {
      let letter = string[delta];
      let currWidth = 1;
      if (lettersData[letter] !== undefined){
        currWidth = lettersData[letter].width;
      }
      return Bodies.rectangle(
        x, y, itemSize * currWidth, itemSize * 1.5, 
        { label: letter }
        // { collisionFilter: { group: group } }
      );
    });
    Composites.chain(this.rope, 0.5, 0, -0.5, 0, {
      stiffness: 0.8, // morbidezza della connessione
      length: this.gap, // distanza tra una lettera e l'altra
    });
    Composite.add(engine.world, this.rope);  
  }

  draw(){
    let bodies = this.rope.bodies;
    for (let i = 0; i < bodies.length; i++) {
      let body = bodies[i];

      let over = this.isMouseOver(body.vertices);

      if (over){
        cursor('grab');
      } else {
        cursor('pointer');
      }

      if (over && !this.scaled && this.debounce){
        this.scaled = true;
        this.scale = this.overScale;
        this.debounce = false;
        
        let ry = 1;
        if (random() > 0.5){
          ry = -1;
        }
        mBody.applyForce( body, {x: 0, y: 0}, {x: 0, y: this.force * ry});
        setTimeout(() => {
          this.debounce = true;
        }, 1000);
      }

      if (this.scaled){
        this.scale = this.scale - 0.01;
        if (this.scale <= 1) {
          this.scale = 1;
          this.scaled = false;
        }
        for (let c = 0; c < this.rope.constraints.length; c++) {
          let con = this.rope.constraints[c];
          con.length = this.gap * this.scale;
        }
      }

      push();
        noFill();
        stroke(0);
        if (obj.showDebug){
          this.drawVertex(body.vertices);
        }
      pop();

      let letter = this.string[i];
      let posX = (body.bounds.min.x + body.bounds.max.x) / 2;
      let posY = (body.bounds.min.y + body.bounds.max.y) / 2;

      // Draw letter
      push();
        if (obj.showImage){
          fill(100, 100);
        } else {
          fill(255);
        }

        if (this.scaled){
          fill(palette[0]);
        }

        translate(posX, posY)
        rotate(body.angle);
        textFont(font, itemSize * this.letterSize);
        textAlign(CENTER, CENTER);
        translate(0, -itemSize * 0.05);
        text(letter, 0, 0);
      pop();
    }
  }

  drawVertex(vertices){
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

  isMouseOver(vertices){
    if (Matter.Vertices.contains(vertices, {x: mouseX, y: mouseY}) ){
      return true;
    }
    return false;
  }
}