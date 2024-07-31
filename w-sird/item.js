class Item{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.stochasticAmplitude = 0;
    this.realPos = createVector(0, 0);
    this.maxHeight = 200;
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
    // if (this.pos.x <= 0) this.pos.x = random(0.2, 0.5);
    // if (this.pos.x >= 1) this.pos.x = random(0.5, 0.8);
    // if (this.pos.y <= 0) this.pos.y = random(0.2, 0.5);
    // if (this.pos.y >= 1) this.pos.y = random(0.5, 0.8);
    this.realPos.x = this.pos.x * w - w/2;
    this.realPos.y = this.pos.y * w - h/2;
    this.realPos.z = map(this.stochasticAmplitude, 0, 0.1, 50, this.maxHeight, true);
  }

  draw(){
    push();
      translate(this.realPos.x, this.realPos.y, this.z);
      // let noiseScale = 0.001;
      // let n = noise(this.realPos.x * noiseScale, this.realPos.y * noiseScale, frameCount * 0.05);
      // colorMode(HSB, 100, 100, 100);
      // fill(n * 100, 100, 100);
      fill(255);
      noStroke();
      // sphere(itemSize * obj.itemSize, 10);
    pop();
    push();
      let c = map(this.realPos.z, 40, this.maxHeight, 0, 255);
      // ambientMaterial(color(c));
      noStroke();
      translate(this.realPos.x, this.realPos.y, 0);
      // rotateX(PI * 0.5);
      // cylinder(
      //   itemSize * obj.itemSize,
      //   this.realPos.z * obj.itemHeight,
      //   20
      // );
    pop();
  }
}