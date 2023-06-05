let fps = 30;

let colors = [
  '#ffbe0b',
  '#fb5607',
  '#ff006e',
  '#8338ec',
  '#3a86ff'
];

let circles = [];
let maxCircles = 1600;
let monoSynth;

function setup() {
  myCanvas = createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
  });

  matterSetup();
  monoSynth = new p5.MonoSynth();
}

function draw() {
  background(0);

  let cFrameCount = 1;
  if (frameCount > 60){
    cFrameCount = frameCount - 60;
  }

  // Add a circle (if there is some space left)
  if (circles.length < maxCircles){
    let fact = cFrameCount * cFrameCount * 0.001;
    if (fact < 1){
      fact = 1;
    }
    let totPerFrame = Math.floor(fact);
    let tot = 0;
    while (tot < totPerFrame) {
      let circle = createNewCircle();
      if (circle){
        circles.push(circle);
      }
      tot++;
    }
  }
  
  circles.forEach(circle => {
    circle.update();
    circle.draw();
  });

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 20 * fps){
    sketchExportEnd();
  }
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