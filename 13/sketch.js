let items = 20;
let boxSizeFactor = 1;
let fps = 30;
let speed = 0.125;

let boxes = [];
let sec = 0;
let bounce = 0;

let itemSize = 0;
let boxSize = 0;

let mPos = false;

let colors = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
  // '#ffffff',
];

let Engine = Matter.Engine;
let Render = Matter.Render;
let Runner = Matter.Runner;
let Bodies = Matter.Bodies;
let Body = Matter.Body;
let Composite = Matter.Composite;
let Common = Matter.Common;
let Mouse = Matter.Mouse;
let MouseConstraint = Matter.MouseConstraint;
let Constraint = Matter.Constraint;
let Events = Matter.Events;
let mConstraint = false;

let canvas = false;
let dragging = false;

function setup() {
  canvas = createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);  
  
  itemSize = width / items;
  boxSize = itemSize * boxSizeFactor;

  matterSetup();
}

function draw() {
  recordSketchPre();
  mPos = responsiveMousePos();

  recordSketchMouseRec(mPos);
  mPos = recordSketchMouseGet(mPos);

  background(255);
  for (let index = 0; index < boxes.length; index++) {
    boxes[index].move();
    boxes[index].draw();
  }

  recordSketchPost(12);
}

function matterSetup(){

  // create an engine
  engine = Engine.create();

  // create runner
  runner = Runner.create();

  boxes = [];

  // Add wrapper
  let border = 20;
  let bottom = Bodies.rectangle(width / 2, height + border * 0.5, width, border, {isStatic: true});
  Composite.add(engine.world, bottom);
  let top = Bodies.rectangle(width / 2, 0 - border * 0.5, width, border, {isStatic: true});
  Composite.add(engine.world, top);
  let left = Bodies.rectangle(0 - border * 0.5, height / 2, border, height, {isStatic: true});
  Composite.add(engine.world, left);
  let right = Bodies.rectangle(width + border, height / 2, border, height, {isStatic: true});
  Composite.add(engine.world, right);

  // Boxes
  for (let i = 0; i <= items; i++) {
    for (let j = 0; j <= items; j++) {
      let x = itemSize * i - (itemSize * 0.5);
      let y = itemSize * j - (itemSize * 0.5);
      let b = new Box(x, y, boxSize, boxSize);
      boxes.push(b);
    }
  }
  // for (let index = 0; index < (items * items); index++) {
  //   let size = boxSize;
  //   let b = new Box(random(width), random(height), size, size);
  //   boxes.push(b);
  // }

  // Mouse Constraint
  // https://youtu.be/W-ou_sVlTWk?t=429
  let canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity(); 
  console.debug(canvasMouse);
  let options = {
    mouse: canvasMouse,
  }
  mConstraint = MouseConstraint.create(engine, options);
  Composite.add(engine.world, mConstraint);
  Events.on(mConstraint, "startdrag", function(e){
    dragging = true;
  });
  Events.on(mConstraint, "enddrag", function(){
    dragging = false;
  });
  Events.on(mConstraint, "mousedown", function(e){
  });

  // Gravity
  engine.world.gravity.y = 0.5;

  // run the engine
  Runner.run(runner, engine);
}
