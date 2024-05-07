class Cluster{
  constructor(x, y, string){
    this.string = string;
    this.x = x;
    this.y = y;
    this.items = [];

    this.bg = random(palette);

    this.kerning = 0;
    this.kerningOffset = itemSize * 0.05;

    this.consts = [];

    this.gap = 5;
    this.letterSize = 1.8;
    this.letterSizeDebug = 1.6;

    // var group = mBody.nextGroup(true);
    this.rope = Composites.stack(this.x, this.y, this.string.length, 1, this.gap, this.gap, function(x, y, delta) {

        let letter = string[delta];
        let currWidth = 1;
        if (lettersData[letter] !== undefined){
          currWidth = lettersData[letter].width;
        }
        return Bodies.rectangle(
          x, y, itemSize * currWidth, itemSize * 1.5, 
          // { collisionFilter: { group: group } }
        );
    });
    Composites.chain(this.rope, 0.5, 0, -0.5, 0, {
      stiffness: 0.8, // morbidezza della giunzione
      length: this.gap, // distanza tra una lettera e l'altra
      // render: { type: 'line' } 
    });

    Composite.add(engine.world, this.rope);  

    /*
    let lx = 0;
    for (let i = 0; i < this.string.length; i++) {
      let letter = this.string[i];

      // Calcolo il kerning tra una lettera e la successiva
      // in base alla loro dimensione
      this.kerning = 0;
      if (i !== 0){
        let prev = this.string[i - 1];
        let prevWidth = 1;
        if (lettersData[prev] !== undefined){
          prevWidth = lettersData[prev].width;
        }
        let currWidth = 1;
        if (lettersData[letter] !== undefined){
          currWidth = lettersData[letter].width;
        }
        this.kerning = (itemSize * prevWidth / 2) + (itemSize * currWidth / 2);
      }

      lx = lx + this.kerning + this.kerningOffset;
      let item = new Item(this.x + lx, this.y, letter, this.bg);
      this.items.push(item);

      if (i !== 0){
        let prev = this.items[i - 1];
        var constraint = Constraint.create({
          length: this.kerning + this.kerningOffset,
          bodyA: prev.body,
          // pointA: { x: -50, y: 0 },
          bodyB: item.body,
          // pointB: { x: 50, y: 0 },
          stiffness: 0.001,
          // damping: 2
        });
        Composite.add(engine.world, [prev.body, item.body, constraint]);
        this.consts.push(constraint);
      }
    };
    */
  }

  draw(){
    let bodies = this.rope.bodies;
    for (let i = 0; i < bodies.length; i++) {
      let body = bodies[i];

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

      push();
        fill(255);
        noStroke();
        translate(posX, posY)
        rotate(body.angle);
        textFont(font, itemSize * this.letterSize);  
        if (obj.showDebug){
          textFont(font, itemSize * this.letterSizeDebug);  
        }
        textAlign(CENTER, CENTER);
        translate(0, -itemSize * 0.05);
        text(letter, 0, 0);
      pop();

    }

    // if (obj.showDebug){
    //   this.drawConstraint();
    // }
    // for (let i = 0; i < this.items.length; i++) {
    //   let item = this.items[i];
    //   item.draw();
    // }
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

  drawConstraint(){
    for (let i = 0; i < this.consts.length; i++) {
      let cons = this.consts[i];
      push();
      stroke(50);
      strokeWeight(3);
      const aX = (cons.bodyA.bounds.min.x + cons.bodyA.bounds.max.x) / 2;
      const aY = (cons.bodyA.bounds.min.y + cons.bodyA.bounds.max.y) / 2;
      const bX = (cons.bodyB.bounds.min.x + cons.bodyB.bounds.max.x) / 2;
      const bY = (cons.bodyB.bounds.min.y + cons.bodyB.bounds.max.y) / 2;
      line(aX, aY, bX, bY);
      pop();
    }
  }

}