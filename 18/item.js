class Item{
  constructor(x, y, z){
    this.pos = createVector(x, y, z);

    let c = floor(random(0, colors.length));
    this.color = colors[c];

    this.neighbors = [];
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.z, this.pos.y);
      noStroke();
      ambientMaterial(this.color);
      sphere(2, 10, 10);
    pop();
  }

  drawConnections(){
    push();
      // translate(this.pos.x, this.pos.z, this.pos.y);
      let a = this.pos.copy();
      this.neighbors.forEach(neighbor => {
        stroke('#fff');
        strokeWeight(0.5);
        line(this.pos.x, this.pos.y, this.pos.z, neighbor.pos.x, neighbor.pos.y, neighbor.pos.z);
      });
    pop();
  }

  searchNeighbors(){
    this.neighbors = items.filter(item => {
      let distance = this.pos.dist(item.pos);
      if (distance < itemSize * 1.1){
        return true;
      }
      return false;
    });
  }
}