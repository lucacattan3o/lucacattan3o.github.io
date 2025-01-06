let obj = {
  items: 500,
  itemSize: 10,
  margin: 0.3,
  radius: 0.5,
  noiseScale: 0.5,
  color: '#ffffff',
  bg: '#000000',
};

let storageName = 'gui-rivers';

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
  noiseSeed(random(1, 1000));
  setupItems();
};

obj.stopExport = function(){
  sketchExportEnd();
};

obj.saveImage = function(){
  saveCanvas(getFileName('visual'), 'png');
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Particles');
  grid.add(obj, 'items').min(100).max(4000).step(1).name('Items');
  grid.add(obj, 'itemSize').min(2).max(10).step(1).name('Item Size');

  grid.add(obj, 'margin').min(0).max(0.4).step(0.1).name('Margin');
  grid.add(obj, 'radius').min(0).max(1).step(0.1).name('Radius');

  grid.add(obj, 'noiseScale').min(0.1).max(2).step(0.1).name('Noise Scale');

  grid.addColor(obj, 'color').name('Color');
  grid.addColor(obj, 'bg').name('Background');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear');
  gui.add(obj, 'startOver').name('Run Again');

  let exportBtn = gui.add(obj, 'export').name('Export Video');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get('export') == 'true'){
    console.debug('test');
    exportBtn.disable();
    exportBtn.name('Exporting...');

    gui.add(obj, 'stopExport').name('Stop Export');
  }
  
  gui.add(obj, 'saveImage').name('Save Image');

  gui.onChange( event => {
    let name = event.property;
    switch (name) {
      case 'items':
      case 'itemSize':
      case 'margin':
      case 'radius':
      case 'noiseScale':
      case 'color':
      case 'bg':
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
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  return stringaData = `${prefix}-${year}-${month}-${day}-${hs}-${mins}-${secs}`;
}