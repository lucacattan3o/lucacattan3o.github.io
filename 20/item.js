class Item{
  constructor(z, height, radius, freq){
    this.pos = createVector(0, 0, z);
    this.radius = radius;
    this.height = height;
    this.freq = floor(Math.abs(freq));
    let c = floor(map(this.freq - 1, 0, 15, 0, colors.length, true));
    this.color = colors[c];
  }

  update(){
    // this.pos.x = this.pos.x + 2 * getMusicEnergy(this.freq);
    // this.radius = map(mPos.x, 0, width, 0, this.radius, true);
  } 

  draw(){
    push();
      translate(this.pos.x, this.pos.z, this.pos.y);
      noStroke();
      ambientMaterial(this.color);
      cylinder(this.radius + (this.radius * 0.5) * getMusicEnergy(this.freq), this.height, 64, 10);
    pop();
  }
}