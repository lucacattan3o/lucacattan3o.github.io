let fps = 60;

let itemList = [];

let GUI = lil.GUI;
let gui, loadButton;

function setup() {
  createCanvas(1080, 1980);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });

  background(0);
  colorMode(HSB, 100);

  setupLil();
  setupItemList();
}

let preset = {};

let obj = {
  itemsX: 5,
  itemsY: 15,
  showGrid: false,

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
  grid.add(obj, 'itemsX').min(3).max(3 * 5).step(1).name('Items X');
  grid.add(obj, 'itemsY').min(3).max(3 * 5).step(1).name('Items Y');

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
  background(0);
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

  background(0, 1);
  noStroke();

  let x = 0;
  let y = 0;
  let delta = 0;

  let speedAnimX = map(getLoopBounce(0.25)      , -1, 1, 0.125, 0.25); 
  let speedAnimy = map(getLoopBounce(0.25, 0.5), -1, 1, 0.125, 0.25); 

  for (let i = 0; i < itemsX; i++) {
    for (let j = 0; j < itemsY; j++) {
      
      iW = itemW;
      if (itemsX >= 2){
        let delayX = i / itemsX;
        iW += getLoopBounce(0.5 * 0.5 * speedAnimX, delayX) * itemW * 0.8;
      }

      iH = itemH;
      if (itemsY >= 2){
        let delayY = j / itemsY;
        iH += getLoopBounce(0.5 * 0.5 * speedAnimy, delayY) * itemH * 0.8;      
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
    // console.debug(sec);
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 30 * fps){
    sketchExportEnd();
  }
}