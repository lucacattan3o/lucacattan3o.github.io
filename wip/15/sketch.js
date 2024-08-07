let fps = 30;

let colors = [
  '#ffbe0b',
  '#fb5607',
  '#ff006e',
  '#8338ec',
  '#3a86ff'
];

let circles = [];
let tot = 10;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  background(0);
}

function draw() {
  recordSketchPre();
  background(0);

  // Add a circle (if there is some space left)
  let circle = createNewCircle();
  if (circle){
    circles.push(circle);
  } else {
    console.debug('Can\'t find one');
  }
  
  circles.forEach(circle => {
    circle.update();
    circle.draw();
  });

  recordSketchPost(20);
}

function createNewCircle(){
  let check = 0;
  while (check < 100) {
    check++;

    let x = random(width);
    let y = random(height);

    let free = freeSpace(x, y);
    if (free){
      return new Circle(x, y);
    }
  }

  return null;
}

function freeSpace(x, y){
  let valid = true;
  for (const circle of circles){
    let d = dist(x, y, circle.pos.x, circle.pos.y);
    if (d < circle.radius){
      valid = false;
      break;
    }
  };
  return valid;
}