let fps = 30;
let w = window.innerWidth;
let h = window.innerHeight; 

let obj = {
  showCam: true,
  showHands: true,
};

let storageName = 'gui-body';

let tailPointsL = [];
let tailPointsR = [];

let palette = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  '#ffffff'
];

function preload(){
  ml5Preload();
}

function setup() {
  createCanvas(w, h);
  frameRate(fps);
  ml5Capture();
  setupLil();

  layer = createGraphics(w, h);

  colorMode(HSB, 360, 100, 100);
}


function draw() {
  background(0);
  push();
    ml5TranslateToCenter();
    
    if (obj.showCam){
      ml5DrawCam();
    }
    
    // drawing
    let l = ml5GetHand('Left');
    let r = ml5GetHand('Right');

    if (l){
      tailPointsL.push({
        x: l.pos.x,
        y: l.pos.y,
        amp: l.vals.amp,
        angle: l.vals.angle,
      });
      if (tailPointsL.length > 30){
        tailPointsL.shift();
      }
    }
    if (r){
      tailPointsR.push({
        x: r.pos.x,
        y: r.pos.y,
        amp: r.vals.amp,
        angle: r.vals.angle,
      });
      if (tailPointsR.length > 30){
        tailPointsR.shift();
      }
    }

    if (tailPointsL.length){
      tailPointsL.forEach((p) => {
        let hue = map(p.angle, -120, 80, 0, 360, true);
        let ca = color(hue, 100, 100);
        stroke(ca);
        ca.setAlpha(0.05);
        fill(ca);
        circle(p.x, p.y, 300 * p.amp);
        circle(p.x, h - p.y, 300 * p.amp);
      })
    }
    if (tailPointsR.length){
      tailPointsR.forEach((p) => {
        let hue = map(p.angle, 80, -120, 0, 360, true);
        let ca = color(hue, 100, 100);
        stroke(ca);
        ca.setAlpha(0.05);
        fill(ca);
        circle(p.x, p.y, 300 * p.amp);
        circle(p.x, h - p.y, 300 * p.amp);
      })
    }
    
    // ml5DrawKeypoints();
    ml5DrawHands();
  pop();
}


window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;  
  resizeCanvas(w, h);
  ml5Stop();
  ml5Capture();
}