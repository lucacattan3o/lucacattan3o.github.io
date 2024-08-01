  // ** LIL **
// ---------

let GUI = lil.GUI;
let gui, guiM, guiN;

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

obj.createSird = function(){

  let canvas = document.getElementById('defaultCanvas0');
  let img = document.getElementById('stereogram');
  img.classList.add('ready');
  Stereogram.render({
    el: 'stereogram',
    width: 1920,
    height: 1080,
    colors: ['000', palette[4], 'fff'],
    depthMapper: new Stereogram.CanvasDepthMapper(canvas),
    patternBuilder: (x, y) => {
      let density = 0.5;
      let n = noise(x * density, y * density);
      let rgba = [255 * n, 255 * n, 255 * n, 255];
      return rgba;
    },
  });
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'items').min(50).max(300).step(1).name('Items');

  const guiVib = gui.addFolder('Vibration');
  guiM = guiVib.add(obj, 'freqM').min(1).max(20).step(1).name('M Frequency').disable();
  guiN = guiVib.add(obj, 'freqN').min(1).max(20).step(1).name('N Frequency').disable();
  // guiVib.add(obj, 'vibration').min(0.01).max(0.1).step(0.01).name('Dept');

  const guiItem = gui.addFolder('Particle');
  guiItem.add(obj, 'itemSize').min(0.1).max(2).step(0.1).name('Size');
  // guiItem.add(obj, 'itemHeight').min(0.1).max(5).step(0.1).name('Height');

  const guiAudio = gui.addFolder('Audio');
  guiAudio.add(obj, 'playSynth').name('Play Synth');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear Preset');
  gui.add(obj, 'startOver').name('Play Again');
  
  gui.add(obj, 'saveImage').name('Save Image (s)');
  gui.add(obj, 'createSird').name('Generate SIRD (g)');

  gui.onChange( event => {
    switch (event.property) {
      case 'items':
      case 'vibration':
        setupItems();
        break;
    
      case 'playSynth':
        if (event.value){
          oscM.start();
          oscN.start();
        } else {
          oscM.stop();
          oscN.stop();
        }
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

function keyPressed(){
  switch (key) {
    case 's':
      let fileName = getFileName('visual');
      saveCanvas(fileName, 'png');
      break;
    
    case 'g':
      obj.createSird();
      break;
  
    default:
      break;
  }
}