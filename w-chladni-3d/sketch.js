let fps = 30;
let w = 1080;
let h = 1080;

let obj = {
  items: 5000,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 0.2,
  itemHeight: 0.5,
  playSynth: false,
};

// Reference
// https://github.com/addiebarron/chladni/blob/master/chladni.js

let itemSize;
let items = [];
let oscM, oscN;

let storageName = 'gui-chladni-3D';

let palette = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  '#ffffff'
];

let mPos;

function setup() {
  createCanvas(w, h, WEBGL);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();
  setupItems();

  itemSize = w * 0.01;

  // Camera
  let cam = createCamera();
  // cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  cam.setPosition(
    w * 0,
    w * 0.9,
    w * 0.6 // near / far
  );
  cam.lookAt(0, 0, 0);

  oscM = new p5.Oscillator('sine'); // set frequency and type
  oscN = new p5.Oscillator('sine'); // set frequency and type
  oscM.amp(0.5);
  oscN.amp(0.5);
}

function setupItems(){
  items = [];
  for (let i = 0; i < obj.items; i++) {
    let item = new Item();
    items.push(item);
  }
}

function draw() {
  background(0);

  orbitControl();

  ambientLight(255);
  directionalLight(color(255), 0, 1, -0.5);

  // mouse interaction
  // let mPos = responsiveMousePos();
  // let m = floor(map(mPos.x, 0, w, 1, 10, true));
  // let n = floor(map(mPos.y, 0, h, 1, 10, true));
  // guiM.setValue(m);
  // guiN.setValue(n);

  // oscillator frequencies
  let fM = map(obj.freqM, 1, 10, 40, 440);
  let fN = map(obj.freqN, 1, 10, 40, 440);
  oscM.freq(fM);
  oscN.freq(fN);

  rotateZ(frameCount * 0.01);

  items.forEach(item => {
    item.update();
    item.draw();
  });
}