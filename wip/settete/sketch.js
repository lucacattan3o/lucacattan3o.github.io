let fps = 60;
let unit;

let palette = [
  '#BEBEFF',
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  setupLil();
}

function draw() {
  background(0);
  unit = width / 10;

  translate(unit * 5, height);
  fill(palette[0]);
  drawBody(unit * 2, height * 0.8, unit * 0.5, 30);
}  

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawBody(w, h, offset, points){
  anim = frameCount * obj.vel * 0.5 * 0.5;
  
  beginShape();

  // Linea superiore
  vertex(-w * 0.5, 0);
  vertex(w * 0.5, 0);

  // Curva destra
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points * 0.5, 0, PI);
    angle = angle + anim;
    let x = w * 0.5;
    x = x + map(sin(-angle), -1, 1, -offset, offset);
    let y = - i * (h / points);
    vertex(x, y);
  }

  // Linea inferiore
  vertex(w * 0.5, -h);
  vertex(-w * 0.5, -h);

  // Curva sinistra
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points * 0.5, 0, PI);
    angle = angle - anim;
    let x = -w * 0.5;
    x = x + map(sin(angle), -1, 1, -offset, offset);
    let y = -h + i * (h / points);
    vertex(x, y);
  }

  endShape(CLOSE);
}