let fps = 60;
// let w = 1920;
// let h = 1080;

let obj = {
  // canvas
  canvasW: 1920,
  canvasH: 1080,
  canvasMulty: 1,
  // chladni
  items: 80,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 1,
  itemHeight: 2,
  playSynth: false,
  // paint
  brushOn: true,
  brushSize: 1,
  brushOpacity: 0.3,
  // stereogram
  stereoInvert: false,
  stereoEyeSep: 6.35,  // eye separation in cm
  stereoDpi:    72,    // dpi
  stereoMu:     2,     // depth of field (fraction of viewing distance: 1 / x) (3 default)
};

let itemSize;
let items = [];
let oscM, oscN;
let w, h;

let storageName = 'gui-sird';

let palette = [
  "#03071e",
  "#370617",
  "#6a040f",
  "#9d0208",
  "#d00000",
  "#dc2f02",
  "#e85d04",
  "#f48c06",
  "#faa307",
  "#ffba08"
];

let mPos;

function setup() {
  setupCanvas();
  setupLil();
  
  background(0);
  rectMode(CENTER);
  // setupItems();

  // Oscillator
  oscM = new p5.Oscillator('sine');
  oscN = new p5.Oscillator('sine');
  oscM.amp(0.5);
  oscN.amp(0.5);
}

function setupCanvas(){
  w = floor(obj.canvasW * obj.canvasMulty);
  h = floor(obj.canvasH * obj.canvasMulty);
  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);

  let img = document.getElementById('stereogram');
  img.width = w;
  img.height = h;
  img.addEventListener('click', (e) => {
    console.debug(e);
    mouseIsPressed = false;
  });
}

function setupItems(){
  items = [];
  let space = 1 / obj.items;
  // itemSize = 1080 / obj.items;
  itemSize = w / obj.items;
  for (let i = 0; i < obj.items; i++) {
    for (let j = 0; j < obj.items; j++) {
      let x = i * space;
      let y = j * space;
      let item = new Item(x, y);
      items.push(item);
    }
  }
}

function draw() {

  // mouse interaction
  let mPos = responsiveMousePos();

  if (mouseIsPressed && obj.brushOn){
    let bSize = 200;
    translate(mPos.x, mPos.y);
    fillGradient('radial', {
      from : [0, 0, 0], // x, y, radius
      to : [0, 0, bSize * obj.brushSize * 0.5], // x, y, radius
      steps : [
        color(255, 255 * obj.brushOpacity),
        color(255, 0)
      ] // Array of p5.color objects or arrays containing [p5.color Object, Color Stop (0 to 1)]
    });
    noStroke();
    circle(0, 0, bSize * obj.brushSize);
  }
  

  // let sec = frameCount / fps;
  // if (sec % 3 == 0){
  //   obj.createSird();
  // }

  // drawChladni();
}

function drawChladni(){
  let m = map(mPos.x, 0, w, 0.1, 10, true);
  let n = map(mPos.y, 0, h, 0.1, 10, true);
  guiM.setValue(m);
  guiN.setValue(n);

  // oscillator frequencies
  let fM = map(obj.freqM, 1, 10, 40, 440);
  let fN = map(obj.freqN, 1, 10, 40, 440);
  oscM.freq(fM);
  oscN.freq(fN);

  push();
    // translate((width - 1080) * 0.5, 0);
    items.forEach(item => {
      item.update();
      item.draw();
    });
  pop();
}