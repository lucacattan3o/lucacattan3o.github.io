class Item{
  constructor(color, deltaLevel){
    this.x = 0;

    let ny = noise(deltaLevel);
    this.y = ny * obj.radRadius;

    this.deltaLevel = deltaLevel;
    
    this.velX = 0.25;
    this.velY = 0.25;

    this.nS = 0.01 * obj.radNoiseScale;
    
    this.nr = 1;
    this.nc = 1;

    this.life = true;
    this.progr = 0;
    this.tic = 0;
    this.color = color;
  }
  
  update(){
    if (!this.life){
      return;
    }

    // radius life
    let d = dist(0, 0, this.x, this.y);
    if (d > obj.radRadius){
      this.life = false;
    }

    // depth life
    this.tic++;
    let maxLife = 2000;
    this.progr = map(this.tic, 0, maxLife, 0, 1);
    if (this.tic > maxLife){
      this.life = false;
    }
    // this.progr = map(d, 0, obj.radRadius, 0, 1);

    // prendo noise diversi per ogni livello
    let offset = this.deltaLevel * 1000;
    //offset = 0;
    let offsetZ = this.deltaLevel * 0.05;
    offsetZ = 0;

    // noise per la velocità
    let n = noise(
      (this.x + offset) * this.nS, 
      (this.y + offset) * this.nS,
      offsetZ
    )

    // noise per la dimensione
    let rNoiseScale = 0.01;
    this.nr = noise(this.x * rNoiseScale, this.y * rNoiseScale, 1000);
    this.nr = map(this.nr, 0.3, 0.6, 0.2, 1, true);

    // noise per il colore
    // più l'item è piccolo, più è bianco
    this.nc = 1.4 - this.nr;

    this.velX = cos(n * TWO_PI) * 0.1;
    this.velY = -sin(n * TWO_PI) * 0.1;

    this.x += this.velX;
    this.y += this.velY;
  }
  
  limit(){
    if (this.x > width){
      this.x = 0;
    }
    if (this.x < 0){
      this.x = width;
    }
    if (this.y > height){
      this.y = 0;
    }
    if (this.y < 0){
      this.y = height;
    }
  }
  
  draw(level){
    if (!this.life){
      return;
    }

    this.drawSimple(level);
    // this.drawGradient();
    // this.drawSquare();
  }

  drawSimple(level){
    push();
      noStroke();
      let c = color(this.color * this.progr);
      // c.setAlpha(obj.radItemOpacity * 255);
      level.fill(c);
      level.noStroke();
      let r = obj.radItemSize;
      level.circle(this.x, this.y, r);
      level.circle(-this.x, this.y, r);
    pop();
  }

  drawGradient(){
    push();
      noStroke();
      let r = obj.rivItemSize;
      // add some noise variation
      r = r * this.nr;

      let steps = 4;
      let step = 1 / steps;

      let c = color(255);
      c.setAlpha(1);
      stroke(c);
      strokeWeight(5);
      noFill();

      circle(this.x, this.y, r * 1);
      // circle(this.x, this.y, r * 0.75);
      // circle(this.x, this.y, r * 0.5);
      circle(this.x, this.y, r * 0.25);

      circle(width - this.x, this.y, r * 1);
      // circle(width - this.x, this.y, r * 0.75);
      // circle(width - this.x, this.y, r * 0.5);
      circle(width - this.x, this.y, r * 0.25);
      
      // not working
      // for (i = 0; i < steps; i++){
      //   let dr = 1 - (step * i);
      //   circle(this.x, this.y, r * dr);
      //   circle(width - this.x, this.y, r * dr);
      // }
    pop();
  }
}



