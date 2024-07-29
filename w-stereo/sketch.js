let fps = 10;
let w = 1080 * 3;
let h = 1080;

let obj = {
  cols: 10,
};

let colWidth;
let cols = [];

let storageName = 'gui-stereo';

let palette = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  '#ffffff'
];

function setup() {
  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();
  setupCols();
}

function setupCols(){
  colWidth = w / obj.cols;
  cols = [];
  for (let c = 0; c < obj.cols; c++) {
    let col = new Column(c);
    cols.push(col);
  }
}

function draw() {
  background(0);
  cols.forEach(column => {
    column.draw();
  });
}