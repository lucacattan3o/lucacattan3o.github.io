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

let GUI = lil.GUI;
let gui, loadButton;

function setup() {
  createCanvas(1080, 1920);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });
  // noLoop();

  background(0);
  colorMode(HSB, 100);

  setupLil();
  setupItemList();
}

let preset = {};

let obj = {
  itemsX: 6,
  itemsY: 4,
  showGrid: false,
  
  addBounceX: false,
  bounceXspeed: 0.5,
  addBounceY: false,
  bounceYspeed: 0.5,

  color0: colors[0],
  color1: colors[4],
  color2: colors[2],
  color3: colors[3],
  savePreset() {
		saveToStorage();
		// loadButton.enable();
	},
	loadPreset() {
		gui.load(preset);
	},
  export() {
    saveToStorage();
    let url = window.location.href;    
    if (url.indexOf('?') > -1){
      url += '&export=true';
    } else {
      url += '?export=true';
    }
    window.location.href = url;
  },
  clearStorage(){
    localStorage.removeItem('guiSettings18');
    window.location = window.location.href.split("?")[0];
  },
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem('guiSettings18', JSON.stringify(preset));
}

let itemsX = obj.itemsX;
let itemsY = obj.itemsY;

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'itemsX').min(1).max(3 * 5).step(1).name('Items X');
  grid.add(obj, 'itemsY').min(1).max(3 * 5).step(1).name('Items Y');

  const colsA = gui.addFolder('Palette - A');
  colsA.addColor(obj, 'color0').name('Color 1');
  colsA.addColor(obj, 'color1').name('Color 2');

  const anim = gui.addFolder('Bounce');
  anim.add(obj, 'addBounceX').name('Add Bounce X');
  anim.add(obj, 'bounceXspeed').name('Speed X');
  anim.add(obj, 'addBounceY').name('Add Bounce Y');
  anim.add(obj, 'bounceYspeed').name('Speed Y');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  // loadButton = gui.add(obj, 'loadPreset').name('Load');
  // loadButton.disable();
  gui.add(obj, 'export').name('Export video');
  gui.add(obj, 'clearStorage').name('Clear');

  gui.onChange( event => {
    if (event.property == 'itemsX' || event.property == 'itemsY'){
      itemsX = event.object.itemsX;
      itemsY = event.object.itemsY;
      setupItemList();
    }
    if (event.property == 'word'){
      setupItemList();
    }

    if (event.property == 'mode'){
      if (obj.mode == 'Animated'){
        guiPalette.hide();
      } else {
        guiPalette.show();
      }
    }
  });
  
  let saved = localStorage.getItem('guiSettings18');
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

  itemW = width / itemsX;
  itemH = height / itemsY;

  let iW = itemW;
  let iH = itemH;

  // background(0, 10);
  noStroke();

  let x = 0;
  let y = 0;
  let delta = 0;

  // la posizione e la dimensione dell'item
  // è governata dallo sketch, che li aggiorna in continuazione
  // l'item sa chi è in fase di creazione (da capire)

  for (let i = 0; i < itemsX; i++) {
    for (let j = 0; j < itemsY; j++) {
      
      iW = itemW;
      if (obj.addBounceX && itemsX >= 2){
        let delayX = i / itemsX;
        iW += getLoopBounce(0.5 * 0.5 * obj.bounceXspeed, delayX) * itemW * 0.8;
      }

      iH = itemH;
      if (obj.addBounceY && itemsY >= 2){
        let delayY = j / itemsY;
        iH += getLoopBounce(0.5 * 0.5 * obj.bounceYspeed, delayY) * itemH * 0.8;      
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
  });

  let sec = frameCount / fps;
  if (sec % 1 == 0){
    console.debug(sec);
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 26 * fps){
    sketchExportEnd();
  }
}