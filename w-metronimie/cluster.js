class Cluster{
  constructor(x, y, string){
    this.string = string;
    this.x = x;
    this.y = y;
    this.items = [];

    this.kerning = 110;

    this.consts = [];

    for (let i = 0; i < this.string.length; i++) {
      let letter = this.string[i];
      let x = this.kerning * i + this.x;
      let y = this.y;
      let item = new Item(x, y, letter);
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
        Composite.add(engine.world, [item.body, prev.body, constraint]);
        this.consts.push(constraint);
      }
    });
  }

  draw(){
    this.drawConstraint();
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