class Item{
  constructor(x, y, z, unique){
    this.pos = createVector(x, y, z);
    this.unique = unique;

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
}