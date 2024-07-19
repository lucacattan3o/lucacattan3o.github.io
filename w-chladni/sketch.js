let fps = 30;
let w = 1080;
let h = 1080;

let obj = {
  density: 4,
};

let itemSize;

let storageName = 'gui-chladni';

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
  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();
}

function draw() {
  background(0);
}