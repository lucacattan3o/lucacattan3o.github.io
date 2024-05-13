class Cluster{
  constructor(x, y, string){
    this.string = string;
    this.x = x;
    this.y = y;
    this.bg = random(palette);
    this.gap = itemSize * 0.0652;
    this.force = map(string.length, 1, 12, itemSize * 0.0005, itemSize * 0.001);
    this.letterSize = 1.7;

    this.scaled = false;
    this.scale = 1;
    this.overScale = 4;
    this.debounce = true;
    this.otherFont = random(fonts);

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

  setScaled(body = false){
    this.scaled = true;
    this.scale = this.overScale;
    this.debounce = false;
    userInteracted();
    
    let ry = 1;
    if (random() > 0.5){
      ry = -1;
    }
    if (!body){
      body = random(this.rope.bodies);
    }

    let brake = 1;
    // if (this.string.length == 2){
    //   brake = 0.5;
    // }
    if (this.string.length == 1){
      brake = 0.1;
    }

    mBody.applyForce( body, {x: 0, y: 0}, {x: 0, y: this.force * ry * brake});
    let to = setTimeout(() => {
      this.debounce = true;
      clearTimeout(to);
    }, 1000);
  }

  draw(){
    let bodies = this.rope.bodies;
    let overWord = false;
    for (let i = 0; i < bodies.length; i++) {
      let body = bodies[i];

      let over = this.isMouseOver(body.vertices);
      if (over){
        overWord = true;
      }

      if (over && !this.scaled && this.debounce){
        this.setScaled(body);
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

        textFont(mainFont, itemSize * this.letterSize);
        if (this.scaled){
          textFont(this.otherFont, itemSize * this.letterSize);
        }

        translate(posX, posY)
        rotate(body.angle);
        
        textAlign(CENTER, CENTER);
        translate(0, -itemSize * 0.05);
        text(letter, 0, 0);
      pop();
    }

    if (overWord){
      cursor('grab');
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