let fps = 30;

let itemList = [];
let abColor = true;

let colors = [
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#06d6a0"
];

let font;

let GUI = lil.GUI;
let gui, loadButton;

function preload() {
  font = loadFont('fonts/AlfaSlabOne-Regular.ttf');
}

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps
  });
  // noLoop();

  setupLil();
  setupItemList();
}

let preset = {};

let obj = {
  word: 'fluo',
  itemsX: 4,
  itemsY: 2,
  showGrid: false,
  showLetters: true,
  
  addBounceX: false,
  bounceXmulti: 1,
  addBounceY: false,
  bounceYmulti: 1,
  
  resize: false,
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  // animateColors: false,

  palette: 'A',
  mode: 'Static',
  color0: colors[0],
  color1: colors[1],
  color2: colors[2],
  color3: colors[3],
  savePreset() {
		preset = gui.save();
    localStorage.setItem('guiSettings', JSON.stringify(preset));
		loadButton.enable();
	},
	loadPreset() {
		gui.load(preset);
	},
  clearStorage(){
    localStorage.removeItem('guiSettings');
  },
};

let itemsX = obj.itemsX;
let itemsY = obj.itemsY;

function setupLil(){
  gui = new GUI();

  gui.add(obj, 'word').name('Text');
  gui.add(obj, 'showLetters').name('Show Letters');
  gui.add(obj, 'showGrid').name('Show Grid');

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'itemsX').min(1).max(3 * 5).step(1).name('Items X');
  grid.add(obj, 'itemsY').min(1).max(3 * 5).step(1).name('Items Y');

  const colsMain = gui.addFolder('Colors');
  colsMain.add(obj, 'palette', [ 'A', 'B']).name('Palette');
  colsMain.add(obj, 'mode', [ 'Static', 'Gradient Animation']).name('Mode');
  // colsMain.add(obj, 'animateColors').name('Gradient Animation');

  const colsA = gui.addFolder('Palette - A');
  colsA.addColor(obj, 'color0').name('Color 1');
  colsA.addColor(obj, 'color1').name('Color 2');
  const colsB = gui.addFolder('Palette - B');
  colsB.addColor(obj, 'color2').name('Color 1');
  colsB.addColor(obj, 'color3').name('Color 2');

  const anim = gui.addFolder('Bounce');
  anim.add(obj, 'addBounceX').name('Add Bounce X');
  anim.add(obj, 'bounceXmulti').min(1).max(2).step(1).name('Multiply X');
  anim.add(obj, 'addBounceY').name('Add Bounce Y');
  anim.add(obj, 'bounceYmulti').min(1).max(2).step(1).name('Multiply Y');

  // const resize = gui.addFolder('Resize');
  // resize.add(obj, 'resize');
  // resize.add(obj, 'scaleX').min(0.7).max(1.8);
  // resize.add(obj, 'scaleY').min(1).max(1.5);
  // resize.add(obj, 'translateX').min(-0.2).max(0.2);
  // resize.add(obj, 'translateY').min(-0.2).max(0.2);
  // resize.close();

  gui.add(obj, 'savePreset' );
  loadButton = gui.add(obj, 'loadPreset');
  loadButton.disable();
  gui.add(obj, 'clearStorage');

  gui.onChange( event => {
    if (event.property == 'itemsX' || event.property == 'itemsY'){
      itemsX = event.object.itemsX;
      itemsY = event.object.itemsY;
      setupItemList();
    }
    if (event.property == 'word'){
      setupItemList();
    }
  });
  
  let saved = localStorage.getItem('guiSettings');
  if (saved){
    gui.load(JSON.parse(saved));
  };
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
  // let mPos = responsiveMousePos();
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
    for (let j = 0; j < itemsY; j++) {
      
      iW = itemW;
      if (obj.addBounceX){
        let delayX = i / itemsX * obj.bounceXmulti;
        iW += getLoopBounce(0.5 * 0.5, delayX) * itemW * 0.8;
      }

      iH = itemH;
      if (obj.addBounceY){
        let delayY = j / itemsY * obj.bounceYmulti;
        iH += getLoopBounce(0.5 * 0.5, delayY + 0.25) * itemH * 0.8;      
      }
     
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

  // if (obj.animateColors){
  //   let sec = frameCount / fps;
  //   if (sec % 2 == 0){
  //     abColor = !abColor;
  //   }
  // }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
}