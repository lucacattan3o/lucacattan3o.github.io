let fps = 30;

let itemList = [];

let colors = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
  '#ffffff',
];

let font;

let GUI = lil.GUI;

function preload() {
  font = loadFont('fonts/AlfaSlabOne-Regular.ttf');
}

function setup() {
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });
  // noLoop();

  setupLil();
  setupItemList();
}

let obj = {
  itemsX: 3,
  itemsY: 3,
  showGrid: false,
};

let itemsX = obj.itemsX;
let itemsY = obj.itemsY;

function setupLil(){
  const gui = new GUI();
  
  const grid = gui.addFolder( 'Grid' );
  grid.add(obj, 'itemsX').min(3).max(3 * 5).step(1);
  grid.add(obj, 'itemsY').min(3).max(3 * 5).step(1);
  grid.add(obj, 'showGrid');

  gui.onChange( event => {
    
    if (event.property == 'itemsX' || event.property == 'itemsY'){
      itemsX = event.object.itemsX;
      itemsY = event.object.itemsY;
      setupItemList();
    }
    // event.object     // object that was modified
    // event.property   // string, name of property
    // event.value      // new value of controller
    // event.controller // controller that was modified
  });
}

function setupItemList(){
  itemList = [];
  for (let i = 0; i < itemsX; i++) {
    for (let j = 0; j < itemsY; j++) { 
      itemList.push(new Item(i, j));
    }
  }
}

function draw() {

  let mPos = responsiveMousePos();

  // if (mPos.x !== 0 && mPos.y !== 0){
  //   itemsX = floor(map(mPos.x, 0, width,  3, 16, true));
  //   itemsY = floor(map(mPos.y, 0, height, 2, 16, true));
  //   setupItemList();
  // }

  itemW = width / itemsX;
  itemH = height / itemsY;

  let iW = itemW;
  let iH = itemH;

  background(0);
  noStroke();

  // textFont('monospace');
  // textSize(itemSize * 1.1);
  // textAlign(CENTER, CENTER);

  let x = 0;
  let y = 0;
  let delta = 0;

  // la posizione e la dimensione dell'item
  // è governata dallo sketch, che li aggiorna in continuazione
  // l'item sa chi è in fase di creazione (da capire)

  for (let i = 0; i < itemsX; i++) {

    iW = itemW; //+ (getLoopBounce(0.5 * 0.5, i / itemsX) * itemW * 0.8);

    for (let j = 0; j < itemsY; j++) {

      iH = itemH + (getLoopBounce(0.5 * 0.5, j / itemsY) * itemH * 0.8);      
     
      itemList[delta].update(x, y, iW, iH);

      y += iH;
      if (j >= itemsY - 1){
        y = 0;
      }

      delta++;
    }

    x += iW;
    if (i >= itemsX - 1) {
      x = 0;
    }    
  }

  itemList.forEach(item => {
    item.draw();
    // console.debug(item.x, item.y);
  });

  // noLoop();

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
}