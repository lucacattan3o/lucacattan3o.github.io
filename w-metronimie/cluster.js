class Cluster{
  constructor(x, y, string){
    this.string = string;
    this.x = x;
    this.y = y;
    this.items = [];

    this.consts = [];

    for (let i = 0; i < this.string.length; i++) {
      let letter = this.string[i];
      let x = 110 * i + this.x;
      let y = this.y;
      let item = new Item(x, y, letter);
      this.items.push(item);
    };

    this.items.forEach((item, i) => {
      if (i !== 0){
        let prev = this.items[i - 1];

        var constraint = Constraint.create({
          length: 120,
          bodyA: item.body,
          // pointA: { x: -50, y: 0 },
          bodyB: prev.body,
          // pointB: { x: 50, y: 0 },
          stiffness: 0.01,
          damping: 0.01
        });
        Composite.add(engine.world, [item.body, prev.body, constraint]);
        this.consts.push(constraint);
      }
    });
  }

  draw(){
    for (let i = 0; i < this.consts.length; i++) {
      let cons = this.consts[i];
      push();
      stroke('red');
      strokeWeight(3);
      line(cons.bodyA.position.x, cons.bodyA.position.y, cons.bodyB.position.x, cons.bodyB.position.y );
      pop();
    }
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      item.draw();
    }
  }

}