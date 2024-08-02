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
      let density = 0.5 * 0.5;
      let n = noise(x * density, y * density);
      // let ci = floor(n * palette.length);
      // let c = color(palette[ci]);

      // HSB noise
      let hue = (n * 200) + 160;
      push();
        colorMode(HSB, 360, 100, 100);
        let c = color(hue, 100, 100);
      pop();

      // checked box
      /*
      let size = 20;
      let cx = x % size;
      let cy = y % size;
      if (cx >= (size * 0.5)){
        if (cy >= (size * 0.5)){
          c = color(palette[0]);
        } else {
          c = color(palette[3]);
        }
      } else {
        if (cy >= (size * 0.5)){
          c = color(palette[3]);
        } else {
          c = color(palette[0]);
        }
      }*/

      let rgba = c.levels;
      return rgba;
    },
  });
}

function setupLil(){
  gui = new GUI();

  const gPaint = gui.addFolder('Paint');
  gPaint.add(obj, 'brushSize').min(0.1).max(2).step(0.1).name('Size');
  gPaint.add(obj, 'brushOpacity').min(0.1).max(1).step(0.1).name('Opacity');

  // const grid = gui.addFolder('Grid');
  // grid.add(obj, 'items').min(50).max(300).step(1).name('Items');

  // const guiVib = gui.addFolder('Vibration');
  // guiM = guiVib.add(obj, 'freqM').min(1).max(20).step(1).name('M Frequency').disable();
  // guiN = guiVib.add(obj, 'freqN').min(1).max(20).step(1).name('N Frequency').disable();
  // guiVib.add(obj, 'vibration').min(0.01).max(0.1).step(0.01).name('Dept');

  // const guiItem = gui.addFolder('Particle');
  // guiItem.add(obj, 'itemSize').min(0.1).max(2).step(0.1).name('Size');

  // const guiAudio = gui.addFolder('Audio');
  // guiAudio.add(obj, 'playSynth').name('Play Synth');

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
      saveCanvas(fileName, 'png');
      break;
    
    case 'g':
      obj.createSird();
      break;
  
    default:
      break;
  }
}