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
let gui, loadButton;

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

let preset = {};

let obj = {
  word: 'WOW',
  itemsX: 6,
  itemsY: 8,
  showGrid: false,
  showLetters: true,
  addBounceX: false,
  bounceXmulti: 1,
  bounceYmulti: 1,
  addBounceY: false,
  resize: false,
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  shuffleColors: false,
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

  gui.add(obj, 'word');
  gui.add(obj, 'showLetters');
  gui.add(obj, 'shuffleColors');

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'itemsX').min(1).max(3 * 5).step(1);
  grid.add(obj, 'itemsY').min(1).max(3 * 5).step(1);
  grid.add(obj, 'showGrid');

  const anim = gui.addFolder('Bounce');
  anim.add(obj, 'addBounceX');
  anim.add(obj, 'bounceXmulti').min(1).max(3).step(1);
  anim.add(obj, 'addBounceY');
  anim.add(obj, 'bounceYmulti').min(1).max(3).step(1);

  const resize = gui.addFolder('Resize');
  resize.add(obj, 'resize');
  resize.add(obj, 'scaleX').min(0.7).max(1.8);
  resize.add(obj, 'scaleY').min(1).max(1.5);
  resize.add(obj, 'translateX').min(-0.2).max(0.2);
  resize.add(obj, 'translateY').min(-0.2).max(0.2);
  resize.close();

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
        iH += getLoopBounce(0.5 * 0.5, delayY) * itemH * 0.8;      
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

  if (obj.shuffleColors){
    let sec = frameCount / fps;
    if (sec % 2 == 0){
      colors = shuffle(colors);
      setupItemList();
    }
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 8 * fps){
    sketchExportEnd();
  }
}