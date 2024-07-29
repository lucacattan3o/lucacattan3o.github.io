let fps = 1;
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
  itemSizeW = colWidth / obj.xItems;
  itemSizeH = h / obj.yItems;
  let items = getNoise();
  cols = [];
  for (let c = 0; c < obj.cols; c++) {
    let col = new Column(c, items);
    cols.push(col);
  }
}

function getNoise(){
  let items = [];
  for (let i = 0; i < obj.xItems; i++) {
    for (let j = 0; j < obj.yItems; j++) {
      let x = itemSizeW * i;
      let y = itemSizeH * j;
      let n = noise(x, y);
      let c = floor(n * palette.length + 0.5);
      items.push({
        x: x,
        y: y,
        c: palette[c],
      });
    }
  }
  return items;
}

function draw() {
  background(0);
  cols.forEach(column => {
    column.draw();
  });
}