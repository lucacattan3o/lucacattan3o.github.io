// module aliases
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

// objects
let boxes = [];

function setup() {
  mySetup();
}

function mySetup(){

  // create an engine
  engine = Engine.create();

  // create runner
  runner = Runner.create();

  boxes = [];
  canvas = createCanvas(windowWidth, windowHeight);

  // Add wrapper
  let bottom = Bodies.rectangle(width / 2, height, width, 20, {isStatic: true});
  Composite.add(engine.world, bottom);
  let top = Bodies.rectangle(width / 2, 0, width, 20, {isStatic: true});
  Composite.add(engine.world, top);
  let left = Bodies.rectangle(0, height / 2, 20, height, {isStatic: true});
  Composite.add(engine.world, left);
  let right = Bodies.rectangle(width, height / 2, 20, height, {isStatic: true});
  Composite.add(engine.world, right);

  // Boxes
  for (let index = 0; index < 200; index++) {
    let size = 25;
    let b = new Box(random(width), random(height), size, size);
    boxes.push(b);
  }

  // Mouse Constraint
  // https://youtu.be/W-ou_sVlTWk?t=429
  let canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity(); 
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
  mobileGravity();

  // run the engine
  Runner.run(runner, engine);
}

function mobileGravity(){
  if (typeof window !== 'undefined') {
    window.addEventListener('deviceorientation', updateGravityOptymized);
  }
}

function updateGravityOptymized(event){
  throttleFunc(updateGravity(event), 100);
}

function updateGravity(event) {
  var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
      gravity = engine.gravity;

  if (orientation === 0) {
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      gravity.y = Common.clamp(event.beta, -90, 90) / 90;
  } else if (orientation === 180) {
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
  } else if (orientation === 90) {
      gravity.x = Common.clamp(event.beta, -90, 90) / 90;
      gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
  } else if (orientation === -90) {
      gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
      gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
  }
  // console.debug(gravity);
};

const throttleFunc = (func, interval) => {
  let shouldFire = true;
  return function() {
    if (shouldFire) {
      func();
      shouldFire = false;
      setTimeOut(() => {
        shouldFire = true;
      }, interval)
    }
  }
}

function draw() {
  background(255);
  for (let index = 0; index < boxes.length; index++) {
    boxes[index].move();
    boxes[index].draw();
  }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  mySetup();
}

function keyPressed() {
}

function mousePressed(fxn){
}
 
function mouseDragged(fxn){
}