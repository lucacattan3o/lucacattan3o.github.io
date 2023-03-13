class Item{
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;

    let c = floor(random(0, colors.length));
    this.color = colors[c];
  }

  draw(){
    push();
      translate(this.x, this.z, this.y);
      noStroke();
      ambientMaterial(this.color);
      sphere(2, 10, 10);
    pop();
  }
}