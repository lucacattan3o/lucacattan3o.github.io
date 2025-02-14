class Item{
  constructor(color, deltaLevel){
    this.x = random(width * 0.2, width * 0.8);
    this.y = random(height * 0.2, height * 0.8);

    this.deltaLevel = deltaLevel;
    
    this.velX = 50;
    this.velY = 50;

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

    this.limit();

    // radius life
    // let d = dist(0, 0, this.x, this.y);
    // if (d > obj.radRadius){
    //   this.life = false;
    // }

    // depth life
    // if (obj.radDepthLife){
    //   this.tic++;
    //   let maxLife = 3000;
    //   this.progr = map(this.tic, 0, maxLife, 0, 1);
    //   if (this.tic > maxLife){
    //     this.life = false;
    //   }
    // }
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
    let rNoiseScale = 0.005;
    this.nr = noise(this.x * rNoiseScale, this.y * rNoiseScale, 1000);
    // this.nr = map(this.nr, 0.3, 0.6, 0.2, 1, true);

    // noise per il colore
    // più l'item è piccolo, più è bianco
    this.nc = 1.4 - this.nr;

    this.velX = cos(n * TWO_PI);
    this.velY = -sin(n * TWO_PI);

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
  
  draw(){
    if (!this.life){
      return;
    }

    this.drawFlat()
    
    // this.drawBoxes(level);
  }

  drawFlat(){
    push();
      let level = levels[this.deltaLevel].level;
      let c = color(this.color);
      c.setAlpha(255 * obj.radItemOpacity);
      level.fill(c);
      level.noStroke();
      // level.stroke(c);
      // level.noFill();
      let r = obj.radItemSize * this.nr;
      level.circle(this.x, this.y, r);
      level.circle(-this.x, this.y, r);
    pop();
  }

  drawGradient(level){
    push();
      let c = color(this.color * this.progr);
      level.fill(c);
      level.noStroke();
      let r = obj.radItemSize;
      level.circle(this.x, this.y, r);
      level.circle(-this.x, this.y, r);
    pop();
  }

  drawBoxes(level){
    let c = color(this.color * this.progr);
    level.noFill();
    level.stroke(c);
    level.strokeWeight(10);
    let r = obj.radItemSize;
    level.rect(this.x, this.y, r);
    // level.circle(-this.x, this.y, r);
  }
}



