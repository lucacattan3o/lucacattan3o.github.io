class Item{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.depth = 0;
    this.stochasticAmplitude = 0;
    this.realPos = createVector(0, 0);
    this.calculateRealPositions();
  }

  update() {
    let force1 = (sin(PI * obj.freqM * this.pos.x) * sin(PI * obj.freqN * this.pos.y));
    let force2 = (sin(PI * obj.freqN * this.pos.x) * sin(PI * obj.freqM * this.pos.y));
    let force = force1 + force2;
    this.stochasticAmplitude = obj.vibration * abs(force);
    this.calculateRealPositions();
  }

  calculateRealPositions(){
    this.realPos.x = this.pos.x * w;
    this.realPos.y = this.pos.y * w;
    this.depth = map(this.stochasticAmplitude, 0, 0.1, 0, 1);
  }

  draw(){
    push();
      translate(this.realPos.x, this.realPos.y);
      stroke(255);
      strokeWeight(2);
      noFill();
      rect(0, 0, itemSize);
    pop();
    push();
      let c = color(this.depth * 255);
      c.setAlpha(90);
      fill(c);
      noStroke();
      translate(this.realPos.x, this.realPos.y);
      // circle(0, 0, itemSize * obj.itemSize * 2);
      // rotateX(PI * 0.5);
      // cylinder(
      //   itemSize * obj.itemSize,
      //   this.realPos.z * obj.itemHeight,
      //   20
      // );
    pop();
  }
}