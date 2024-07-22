// ** LIL **
// ---------

let GUI = lil.GUI;
let gui;

obj.savePreset = function() {
  saveToStorage();
};

obj.loadPreset = function() {
  gui.load(preset);
};

obj.export = function() {
  saveToStorage();
  let url = window.location.href;    
  if (url.indexOf('?') > -1){
    url += '&export=true';
  } else {
    url += '?export=true';
  }
  window.location.href = url;
};

obj.clearStorage = function() {
  localStorage.removeItem(storageName);
  window.location = window.location.href.split("?")[0];
};

obj.startOver = function(){
  saveToStorage();
  window.location = window.location.href.split("?")[0];
};

obj.stopExport = function(){
  sketchExportEnd();
};

obj.saveImage = function(){
  let fileName = getFileName('visual');
  saveCanvas(fileName, 'png');
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'itemsX').min(1).max(50).step(1).name('Items X');
  grid.add(obj, 'itemsY').min(1).max(50).step(1).name('Items Y');
  grid.add(obj, 'showGrid').name('Display Grid');
  grid.add(obj, 'useRandom').name('Random Disposition');

  const guiCol = gui.addFolder('Colors');
  guiCol.addColor(obj, 'bg').name('Background');
  guiCol.addColor(obj, 'line').name('Lines');

  const guiPalA = gui.addFolder('Palette A');
  for (let a = 0; a < paletteA.length; a++) {
    let prop = 'colA' + a;
    obj[prop] = paletteA[a];
    guiPalA.addColor(obj, prop).name('Palette A ' + a);
  }

  const guiPalB = gui.addFolder('Palette B');
  for (let b = 0; b < paletteB.length; b++) {
    let prop = 'colB' + b;
    obj[prop] = paletteB[b];
    guiPalB.addColor(obj, prop).name('Palette B ' + b);
  }

  const guiItem = gui.addFolder('Item');
  guiItem.add(obj, 'randomSize').name('Random Size');
  guiItem.add(obj, 'itemSize').min(0).max(2).step(0.1).name('Size');
  guiItem.add(obj, 'strokeSize').min(0).max(1).step(0.1).name('Stroke');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear Preset');
  gui.add(obj, 'startOver').name('Play Again');

  //let exportBtn = gui.add(obj, 'export').name('Export Video');
  //const queryString = window.location.search;
  //const urlParams = new URLSearchParams(queryString);
  //if (urlParams.get('export') == 'true'){
  //  console.debug('test');
  //  exportBtn.disable();
  //  exportBtn.name('Exporting...');
  //
  //  gui.add(obj, 'stopExport').name('Stop Export');
  //}
  
  gui.add(obj, 'saveImage').name('Save Image');

  gui.onChange( event => {
    switch (event.property) {
      case 'useRandom':
      case 'randomSize':
      case 'itemsX':
      case 'itemsY':
        setupItems();   
        break;
    }
  });
  
  let saved = localStorage.getItem(storageName);
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem(storageName, JSON.stringify(preset));
};

function getFileName(prefix){
  let now = new Date();
  return prefix + '-' + now.getMonth() + '-' + now.getDay() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();
}