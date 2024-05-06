class Cluster{
  constructor(x, y, string){
    this.string = string;
    this.x = x;
    this.y = y;
    this.items = [];

    this.kerning = itemSize * 1.2;

    this.consts = [];

    let lx = 0;
    let ly = 0;
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

      lx = lx + this.kerning;
      let item = new Item(this.x + lx, this.y, letter);
      this.items.push(item);
    };

    this.items.forEach((item, i) => {
      if (i !== 0){
        let prev = this.items[i - 1];

        var constraint = Constraint.create({
          length: this.kerning,
          bodyA: item.body,
          // pointA: { x: -50, y: 0 },
          bodyB: prev.body,
          // pointB: { x: 50, y: 0 },
          stiffness: 0.001,
          // damping: 0.01
        });
        // Composite.add(engine.world, [item.body, prev.body, constraint]);
        // this.consts.push(constraint);
      }
    });
  }

  draw(){
    if (obj.showDebug){
      this.drawConstraint();
    }
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      item.draw();
    }
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