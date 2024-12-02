let fps = 30;
let w = window.innerWidth;
let h = window.innerHeight; 

let obj = {
};

let storageName = 'gui-body';

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
  // ml5SetCamSizes(w , h);
  ml5Capture();
  setupLil();
}


function draw() {
  push();
    ml5TranslateToCenter();
    ml5DrawCam();
    ml5DrawKeypoints();
    // ml5DrawHands();
  pop();
}


window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;  
  resizeCanvas(w, h);
  ml5Stop();
  ml5Capture();
}