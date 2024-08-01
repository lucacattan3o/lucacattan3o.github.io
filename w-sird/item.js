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
    // this.realPos.x = this.pos.x * 1080;
    this.realPos.x = this.pos.x * w;
    // this.realPos.y = this.pos.y * 1080;
    this.realPos.y = this.pos.y * w;
    this.depth = map(this.stochasticAmplitude, 0, 0.1, 0, 1, true);
  }

  draw(){
    push();
      translate(this.realPos.x, this.realPos.y);
      stroke(255);
      strokeWeight(2);
      noFill();
      // rect(0, 0, itemSize);
    pop();
    push();
      let c = color(255 * this.depth);
      c.setAlpha(200);
      fill(c);
      noStroke();
      translate(this.realPos.x, this.realPos.y);
      translate(itemSize * 0.5, itemSize * 0.5);
      rectMode(CENTER);

      
      // rect(0, 0, itemSize * obj.itemSize);
      // rect(0, 0, itemSize * obj.itemSize * 1.5);
      c.setAlpha(255);
      fill(c);
      rect(0, 0, itemSize * obj.itemSize * 1.5);
    pop();
  }
}