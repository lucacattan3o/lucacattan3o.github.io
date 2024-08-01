let fps = 60;
let w = 1920;
let h = 1080;

let obj = {
  items: 80,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 1,
  itemHeight: 2,
  playSynth: false,

  brushSize: 1,
  brushOpacity: 0.3,
};

// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let oscM, oscN;

let storageName = 'gui-chladni-3D';

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
  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);
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

  if (mouseIsPressed){
    let size = 200;
    translate(mPos.x, mPos.y);
    fillGradient('radial', {
      from : [0, 0, 0], // x, y, radius
      to : [0, 0, size * obj.brushSize * 0.5], // x, y, radius
      steps : [
        color(255, 100 * obj.brushOpacity),
        color(255, 0)
      ] // Array of p5.color objects or arrays containing [p5.color Object, Color Stop (0 to 1)]
    });
    noStroke();
    circle(0, 0, size * obj.brushSize);
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