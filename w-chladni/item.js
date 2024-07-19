class Item{
  constructor(pos){
    this.pos = pos;
    this.stochasticAmplitude = 0;
    
  }

  update() {
    let force1 = (sin(PI * obj.freqM * this.pos.x) * sin(PI * obj.freqN * this.pos.y));
    let force2 = (sin(PI * obj.freqN * this.pos.x) * sin(PI * obj.freqM * this.pos.y));
    // -1 - 1
    let force = force1 + force2;
  
    this.stochasticAmplitude = obj.vibration * abs(force);

    if (this.stochasticAmplitude <= minWalk) {
      this.stochasticAmplitude = minWalk;
    }

    // perform one random walk
    this.pos.x += random(-this.stochasticAmplitude, this.stochasticAmplitude);
    this.pos.y += random(-this.stochasticAmplitude, this.stochasticAmplitude);
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