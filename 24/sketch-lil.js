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

obj.fullScreen = function(){
  let fs = fullscreen();
  fullscreen(!fs);
}

function setupLil(){
  gui = new GUI();
  gui.close();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'items').min(500).max(20000).step(1).name('Items');

  const guiScreen = gui.addFolder('Screen');
  guiScreen.add(obj, 'fitScreen').name('Fit Screen');

  const guiVib = gui.addFolder('Vibration');
  guiM = guiVib.add(obj, 'freqM').min(1).max(scaleLow.length).step(1).name('M Frequency').disable();
  guiN = guiVib.add(obj, 'freqN').min(1).max(scaleHig.length).step(1).name('N Frequency').disable();
  guiVib.add(obj, 'vibration').min(0.01).max(0.1).step(0.01).name('Vibration');

  const guiItem = gui.addFolder('Particle');
  guiItem.add(obj, 'itemSize').min(0.1).max(1).step(0.1).name('Size');

  const guiAudio = gui.addFolder('Audio');
  guiAudio.add(obj, 'playSynth').name('Play Synth');

  gui.add(obj, 'fullScreen').name('Full Screen');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear Preset');
  gui.add(obj, 'startOver').name('Play Again');
  
  gui.add(obj, 'saveImage').name('Save Image (s)');

  gui.onChange( event => {
    switch (event.property) {
      case 'items':
      case 'vibration':
        setupItems();
        break;
    
      case 'playSynth':
        if (oscM && oscN){
          if (event.value){
            oscM.start();
            oscN.start();
          } else {
            oscM.stop();
            oscN.stop();
          }
        }
        break;

      case 'fitScreen':
        setBg();
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

function keyPressed(){
  switch (key) {
    case 's':
      let fileName = getFileName('visual');
      console.debug(fileName);
      saveCanvas(fileName, 'png');
      break;
  
    default:
      break;
  }
}