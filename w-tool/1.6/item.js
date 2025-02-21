class Item{
  constructor(color, i, deltaLevel){
    // il colore in base al livello
    this.color = color;
    // l'indice della particella (3 / 20)
    this.i = i;
    // il livello sul quale disegnare
    this.deltaLevel = deltaLevel;

    // Direction choice
    this.leftToRight = true;
    let dC = noise(10);
    if (dC > 0.5){
      this.leftToRight = false;
    }

    this.y = height * 0.2 + (height * 0.8 * (i / obj.rivItems));
    if (this.leftToRight){
      this.x = 0;
    } else {
      this.x = width;
    }

    // this.y = height * 0.5;
    // this.x = width * 0.7;
    // if (this.leftToRight){
    //   this.x = width * 0.3;
    // }
    
    this.velX = 0;
    this.velY = 0;
    
    this.vel = 1.5;

    this.noiseScale = 0.01 * obj.rivNoiseScale;
    
    this.nDirection = 0;
    this.nRadius = 0;

    // this.grow = 0.01;
    this.grow = 1;
    this.maxGrow = 1;
    this.growSpeed = 0.0005;

    this.life = true;
    this.progr = 0;
    this.radius = 0;
  }
  
  update(){
    this.limitEnd();
    if (!this.life){
      return;
    }

    // noise per la direzione
    this.nDirection = noise(this.x * this.noiseScale, this.y * this.noiseScale);

    let fixDirection = 0;
    if (this.leftToRight){
      fixDirection = PI;
    }
    this.velX = cos(this.nDirection * TWO_PI + fixDirection) * this.vel;
    this.velY = -sin(this.nDirection * TWO_PI + fixDirection) * this.vel;

    // crescita del fiume
    // if (this.grow < this.maxGrow){
    //   this.grow += this.growSpeed;
    // }

    // noise per la dimensione
    this.nRadius = noise(this.x * this.noiseScale * 0.5, this.y * this.noiseScale * 0.5, 1000);  
    this.radius = obj.rivItemSize * this.grow * (width * 0.001);
    // dimensione in funzione del noise
    this.radius = this.radius * this.nRadius * 2;

    this.x += this.velX;
    this.y += this.velY;
  }
  
  limitEnd(){
    if (this.x > width){
      this.life = false;
    }
    if (this.x < 0){
      this.life = false;
    }
    if (this.y > height){
      this.life = false;
    }
    if (this.y < 0){
      this.life = false;
    }
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
  }

  drawFlat(){
    push();
      let level = levels[this.deltaLevel].level;
      let c = color(this.color);
      c.setAlpha(255 * obj.rivItemOpacity);
      level.fill(c);
      level.noStroke();
      level.circle(this.x, this.y, this.radius);
    pop();
  }
}



