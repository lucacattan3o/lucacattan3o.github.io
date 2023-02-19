let Engine = Matter.Engine;
let Render = Matter.Render;
let Runner = Matter.Runner;
let Bodies = Matter.Bodies;
let mBody = Matter.Body;
let Composite = Matter.Composite;
let Common = Matter.Common;
let Mouse = Matter.Mouse;
let MouseConstraint = Matter.MouseConstraint;
let Constraint = Matter.Constraint;
let Events = Matter.Events;
let mConstraint = false;

let myCanvas = false;
let canvasMouse = false;
let dragging = false;

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
  let right = Bodies.rectangle(width + border * 0.5, height / 2, border, height, {isStatic: true});
  Composite.add(engine.world, right);

  addMouseConstraint();
  
  // Gravity
  engine.world.gravity.y = 0;

  // run the engine
  Runner.run(runner, engine);
}

function addMouseConstraint(){
  // Mouse Constraint
  // https://youtu.be/W-ou_sVlTWk?t=429
  canvasMouse = Mouse.create(myCanvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  
  setCanvasMouseScale();
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
}

function setCanvasMouseScale(){
  let mouseScale = 1 + (1 / (responsiveScaleFactor / (1 - responsiveScaleFactor)));
  canvasMouse.scale = {
    x: mouseScale,
    y: mouseScale,
  }
}

addEventListener('resize', (event) => {
  setCanvasMouseScale();
});