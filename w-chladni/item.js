class Item{
  constructor(pos){
    this.pos = pos;
    this.force = createVector(0, 0);
  }

  update() {
    let x = (sin(PI * obj.freqM * this.pos.x) * sin(PI * obj.freqN * this.pos.y));
    let y = (cos(PI * obj.freqN * this.pos.x) * cos(PI * obj.freqM * this.pos.y));
    this.force = createVector(x, y);
    this.force.setMag(obj.vibration);
    this.pos = this.pos.add(this.force);
  }

  draw(){
    push();
      translate(this.pos.x, this.pos.y);
      fill(255);
      noStroke();
      circle(0, 0, itemSize);
    pop();
  }
}