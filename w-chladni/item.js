class Item{
  constructor(){
    this.pos = createVector(random(0, 1), random(0, 1));
    this.stochasticAmplitude = 0;
    this.realPos = createVector(0, 0);
    this.calculateRealPositions();
  }

  update() {
    let force1 = (sin(PI * obj.freqM * this.pos.x) * sin(PI * obj.freqN * this.pos.y));
    let force2 = (sin(PI * obj.freqN * this.pos.x) * sin(PI * obj.freqM * this.pos.y));
    let force = force1 + force2;
    this.stochasticAmplitude = obj.vibration * abs(force);

    // keep moving
    if (this.stochasticAmplitude <= minWalk){
      this.stochasticAmplitude = minWalk;
    }

    // perform one random walk
    this.pos.x += random(-this.stochasticAmplitude, this.stochasticAmplitude);
    this.pos.y += random(-this.stochasticAmplitude, this.stochasticAmplitude);
    this.calculateRealPositions();
  }

  calculateRealPositions(){
    if (this.pos.x <= 0) this.pos.x = random(0.2, 0.5);
    if (this.pos.x >= 1) this.pos.x = random(0.5, 0.8);
    if (this.pos.y <= 0) this.pos.y = random(0.2, 0.5);
    if (this.pos.y >= 1) this.pos.y = random(0.5, 0.8);
    this.realPos.x = this.pos.x * w;
    this.realPos.y = this.pos.y * w;
  }

  draw(){
    push();
      translate(this.realPos.x, this.realPos.y);
      // let noiseScale = 0.001;
      // let n = noise(this.realPos.x * noiseScale, this.realPos.y * noiseScale, frameCount * 0.05);
      // colorMode(HSB, 100, 100, 100);
      // fill(n * 100, 100, 100);
      noStroke();
      fill(255);
      circle(0, 0, itemSize * obj.itemSize);
    pop();
  }
}