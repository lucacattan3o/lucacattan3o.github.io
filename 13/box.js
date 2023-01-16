class Box {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    let options = {
      friction: 0,
      restitution: 1,
    }
    this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, options);
    this.body.angle = PI * 0.01;
    Composite.add(engine.world, this.body);

    let c = Math.floor(random() * colors.length);
    this.color = color(colors[c]);
  }

  move(){
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    this.angle = this.body.angle;
  }

  updateColor(){
    
    // var index = (x + (y * img.width)) * 4;
    let x = floor(this.x + (this.width * 0.5));
    let y = floor(this.y + (this.width * 0.5));

    // var index = (this.x + floor(imgItemSize * 0.5) + ((this.y + floor(imgItemSize * 0.5)) * img.width)) * 4;
    
    // Get index of the pixel (based by 4)
    let index = (y * img.width + x) * 4;

    // Rgba color
    let r = pixels[index + 0];
    let g = pixels[index + 1];
    let b = pixels[index + 2];
    let a = pixels[index + 3];

    // Color
    let c = color(r, g, b, a);
    this.color = c;
  }

  draw(){
    fill(this.color);
    strokeWeight(1);
    
    let vertices = this.body.vertices;
    beginShape();
    for (let index = 0; index < vertices.length; index++) {
      let x = vertices[index].x;
      let y = vertices[index].y;
      vertex(x, y);
    }
    let x = vertices[0].x;
    let y = vertices[0].y;
    vertex(x, y);
    endShape();
  }
}