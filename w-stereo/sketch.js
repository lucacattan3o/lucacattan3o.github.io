let fps = 10;
let w = 1080 * 3;
let h = 1080;

let obj = {
  cols: 10,
  xItems: 15,
  yItems: 50,
};

let colWidth;
let cols = [];

let storageName = 'gui-stereo';

let palette = [
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51"
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