class Cluster{
  constructor(x, y, string, negative){
    this.string = string;
    this.x = x;
    this.y = y;
    this.bg = random(palette);
    this.gap = itemSize * 0.0652;
    this.force = map(string.length, 1, 12, itemSize * 0.0005, itemSize * 0.001);
    this.letterSize = 1.7;

    this.interacted = false;
    this.scale = 1;
    this.overScale = 4;
    this.debounce = true;
    this.otherFont = random(fonts);
    this.negative = negative;
    // this.negative = false;

    this.mainColor = color(255);
    // this.mainColor = color(250, 0, 0, 80);

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

  setInteracted(body = false){
    this.interacted = true;
    this.scale = this.overScale;
    this.debounce = false;    
    
    let ry = 1;
    if (random() > 0.5){
      ry = -1;
    }
    if (!body){
      body = random(this.rope.bodies);
    }

    // Riduco la forza sul .
    let brake = 1;
    if (this.string.length == 1){
      brake = 0.1;
    }

    mBody.applyForce( body, {x: 0, y: 0}, {x: 0, y: this.force * ry * brake});

    // Dopo un secondo si può interagire nuovamente
    let to = setTimeout(() => {
      this.debounce = true;
      clearTimeout(to);
    }, 1000);
  }

  draw(){
    let bodies = this.rope.bodies;
    let overWord = false;

    // Check for interactions
    for (let i = 0; i < bodies.length; i++) {
      let body = bodies[i];

      let over = this.isMouseOver(body.vertices);
      if (over){
        overWord = true;
      }

      if (over && !this.interacted && this.debounce){
        this.setInteracted(body);
        userInteracted();
      }
    }

    // chain animation
    if (this.interacted){
      this.scale = this.scale - 0.01;
      if (this.scale <= 1) {
        this.scale = 1;
        this.interacted = false;
      }
      for (let c = 0; c < this.rope.constraints.length; c++) {
        let con = this.rope.constraints[c];
        con.length = this.gap * this.scale;
      }
    }

    let font = mainFont;
    if (this.interacted){
      font = this.otherFont;
    }

    let letterColor = this.mainColor;
    if (this.negative){
      letterColor = bg;
    }

    // draw bgs
    if (this.negative){
      for (let i = 0; i < bodies.length; i++) {  
        let body = bodies[i];
        push();
          fill(this.mainColor);
          stroke(this.mainColor);
          strokeWeight(itemSize * 0.2);
          strokeJoin(ROUND);
          this.drawVertex(body.vertices);
        pop();
      }
    }

    // draw letters
    for (let i = 0; i < bodies.length; i++) {
      let body = bodies[i];
      let letter = this.string[i];
      let posX = (body.bounds.min.x + body.bounds.max.x) / 2;
      let posY = (body.bounds.min.y + body.bounds.max.y) / 2;

      push();
        noFill();
        stroke(0);
        if (obj.showDebug){
          this.drawVertex(body.vertices);
        }
      pop();

      push();
        fill(letterColor);
        textFont(font, itemSize * this.letterSize);
        translate(posX, posY);
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