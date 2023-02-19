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
let monoSynth;

function setup() {
  myCanvas = createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);

  matterSetup();
  monoSynth = new p5.MonoSynth();
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
    let d = dist(x, y, circle.body.position.x, circle.body.position.y);
    if (d < circle.body.circleRadius){
      valid = false;
      break;
    }
  };
  return valid;
}