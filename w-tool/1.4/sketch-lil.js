  // ** LIL **
// ---------

let GUI = lil.GUI;
let gui, guiM, guiN, guiBrushOn, guiPatScale, guiPatGradScale, gDmScale, gDmX, gDmY, guiBrushColor, guiPatWords;
let guiCols = [];
let storageName = 'gui-stereo-1.4';

let obj = {
  // canvas
  canvasW: 1920,
  canvasH: 1080,
  canvasMulty: 1,
  // chladni
  items: 80,
  freqM: 4,
  freqN: 5,
  vibration: 0.06,
  itemSize: 1,
  itemHeight: 2,
  playSynth: false,
  // image
  dmScale: 1,
  dmX: 0,
  dmY: 0, 
  // paint
  brushOn: false,
  brushSize: 1,
  brushHard: 0.8,
  brushColor: [1, 1, 1],
  // stereogram
  stereoInvert: false,
  stereoEyeSep: 6.35,  // eye separation in cm
  stereoDpi:    72,    // dpi
  stereoMu:     2,     // depth of field (fraction of viewing distance: 1 / x) (3 default)
  nColors: 2,
  invertColors: true,
  // pattern
  patType: 'Letter Noise',
  patScale: 0.5,
  patGradScale: 0.5,
  // words
  patWords: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. etiam sodales turpis turpis, in auctor nunc ullamcorper vestibulum.',
  // rivers
  rivItems: 3400,
  rivItemSize: 2,
  rivItemOpacity: 10,
  rivMargin: 0.1,
  rivRadius: 0.8,
  rivNoiseScale: 0.3,
  rivNoiseSeed: 582,
};

function setupLil(){
  setupColors();

  gui = new GUI();

  const gCanvas = gui.addFolder('Canvas');
  gCanvas.add(obj, 'canvasW').min(1080).max(1920).step(20).name('Width');
  gCanvas.add(obj, 'canvasH').min(1080).max(1920).step(20).name('Height');
  gCanvas.add(obj, 'canvasMulty').min(0.25).max(2).step(0.25).name('Multiply');

  const part = gui.addFolder('Particles');
  part.add(obj, 'rivItems')
    .min(500).max(4000).step(1).name('Items');
  part.add(obj, 'rivItemSize')
    .min(1).max(50).step(1).name('Item Size');
  part.add(obj, 'rivItemOpacity')
    .min(1).max(255).step(1).name('Item Opacity');

  part.add(obj, 'rivMargin')
    .min(0).max(0.4).step(0.1).name('Margin');
  part.add(obj, 'rivRadius')
    .min(0).max(1).step(0.1).name('Radius');

  part.add(obj, 'rivNoiseScale')
    .min(0.1).max(2).step(0.1).name('Noise Scale');
  part.add(obj, 'rivNoiseSeed')
    .min(0).max(1000).step(1).name('Noise Seed');

  // Depth Map | Image Upload
  // const gDepthMap = gui.addFolder('Depth Map');
  // gDepthMap.add(obj, 'dmUpload').name('Upload Image');
  // gDmScale = gDepthMap.add(obj, 'dmScale').min(0.1).max(4).name('Scale').hide();
  // gDmX = gDepthMap.add(obj, 'dmX').min(-1).max(1).name('X').hide();
  // gDmY = gDepthMap.add(obj, 'dmY').min(-1).max(1).name('Y').hide();

  // Paint Tool
  // const gPaint = gui.addFolder('Paint (spacebar + mouse)');
  // guiBrushOn = gPaint.add(obj, 'brushOn').name('Use Brush').hide();
  // gPaint.add(obj, 'brushSize').min(0.1).max(2).step(0.1).name('Size');
  // gPaint.add(obj, 'brushHard').min(0.1).max(1).step(0.1).name('Hardness');
  // guiBrushColor = gPaint.addColor(obj, 'brushColor').name('Color (BW)');
  // guiPaintClear = gPaint.add(obj, 'paintClear').name('Clear Canvas');

  // Stereogram
  const gStereo = gui.addFolder('Stereogram');
  gStereo.add(obj, 'invertColors').name('Invert Colors');
  gStereo.add(obj, 'nColors').min(2).max(5).step(1).name('Number Of Colors');
  palette.forEach((col, index) => {
    let p = 'color' + index;
    let gc = gStereo.addColor(obj, p).name('Color ' + (index + 1));
    guiCols.push(gc);
  });
  updateStereoColors(obj.nColors);
  gStereo.add( obj, 'patType', [
    'SIRD',
    'Perlin Noise',
    'Perlin Noise Sinusoidal',
    'Worley Noise',
    'Vertical Lines',
    'Letter Noise'
    // 'Check Width',
  ]).name('Noise Type');
  guiPatScale = gStereo.add(obj, 'patScale').min(0.1).max(1).step(0.01).name('Noise Scale');
  //guiPatScale.hide();
  guiPatGradScale = gStereo.add(obj, 'patGradScale').min(0.1).max(1).step(0.01).name('Gradient Scale');
  //guiPatGradScale.hide();
  guiPatWords = gStereo.add(obj, 'patWords').name('Words');
  // guiPatWords.hide();
  
  const gAdv = gStereo.addFolder('Advanced').close();
  gAdv.add(obj, 'stereoInvert').name('Invert Depth');
  gAdv.add(obj, 'stereoEyeSep').min(5).max(8).step(0.1).name('Eye Separation');
  gAdv.add(obj, 'stereoDpi').min(72).max(300).step(16).name('DPI');
  gAdv.add(obj, 'stereoMu').min(1.1).max(8).step(0.1).name('Depth of field');
  
  gStereo.add(obj, 'createSird').name('Generate Stereogram (g)');

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

  const gPreset = gui.addFolder('Preset');
  gPreset.add(obj, 'savePreset' ).name('Save Preset');
  gPreset.add(obj, 'clearStorage').name('Clear Preset');
  // gui.add(obj, 'startOver').name('Play Again');
  // gui.add(obj, 'saveImage').name('Save Image (s)');

  gui.onChange( event => {
    // fix for painting
    mouseIsPressed = false;

    switch (event.property) {
      case 'rivItems':
      case 'rivItemSize':
      case 'rivItemOpacity':
      case 'rivMargin':
      case 'rivRadius':
      case 'rivNoiseScale':
      case 'rivNoiseSeed':
      case 'rivColor':
      case 'rivBg':
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

      case 'invertColors':
        updateStereoColors(obj.nColors);
        break;

      case 'nColors':
        let max = event.value;
        updateStereoColors(max);
        break;

      case 'patType':
        if (event.value == 'Worley Noise'){
          guiPatGradScale.show();
        } else {
          guiPatGradScale.hide();
        }

        if (event.value == 'Letter Noise'){
          guiPatWords.show();
        } else {
          guiPatWords.hide();
        }

        switch (event.value) {
          case 'SIRD':
            guiPatScale.hide();
            break;
          default:
            guiPatScale.show();
            break;
        }  
      break;

      case 'dmScale':
      case 'dmX':
      case 'dmY':
        redrawImage = true;
        break;
    }
  });

  gui.onFinishChange(event => {
    switch (event.property) {
      case 'canvasW':
      case 'canvasH':
      case 'canvasMulty':
        setupCanvas();
        break;
      case 'brushColor':
        let rgb = [
          event.value[0] * 255,
          event.value[1] * 255,
          event.value[2] * 255,
        ];
        let c = color(rgb);
        let l = lightness(c);
        let n = map(l, 0, 100, 0, 1, true);
        guiBrushColor.setValue([n, n, n]);
        break;
    };
  });
  
  let saved = localStorage.getItem(storageName);
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function setupColors(){
  palette.forEach((col, index) => {
    let p = 'color' + index;
    obj[p] = '#' + col;
  });
}

function updateStereoColors(max){
  stereoColors = [];
  switch (max) {
    case 2:
      guiCols[0].show();
      stereoColors.push(guiCols[0].getValue());
      guiCols[1].hide();
      guiCols[2].hide();
      guiCols[3].hide();
      guiCols[4].show();
      stereoColors.push(guiCols[4].getValue());
      break;
    case 3:
      guiCols[0].show();
      stereoColors.push(guiCols[0].getValue());
      guiCols[1].hide();
      guiCols[2].show();
      stereoColors.push(guiCols[2].getValue());
      guiCols[3].hide();
      guiCols[4].show();
      stereoColors.push(guiCols[4].getValue());
      break;
    case 4:
      guiCols[0].show();
      stereoColors.push(guiCols[0].getValue());
      guiCols[1].show();
      stereoColors.push(guiCols[1].getValue());
      guiCols[2].show();
      stereoColors.push(guiCols[2].getValue());
      guiCols[3].hide();
      guiCols[4].show();
      stereoColors.push(guiCols[4].getValue());
      break;
  
    case 5:
      guiCols[0].show();
      stereoColors.push(guiCols[0].getValue());
      guiCols[1].show();
      stereoColors.push(guiCols[1].getValue());
      guiCols[2].show();
      stereoColors.push(guiCols[2].getValue());
      guiCols[3].show();
      stereoColors.push(guiCols[3].getValue());
      guiCols[4].show();
      stereoColors.push(guiCols[4].getValue());
      break;
  }
  if (obj.invertColors){
    stereoColors.reverse();
  }
}

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

obj.dmUpload = function(){
  let fileInput = createFileInput(handleFile);
  fileInput.elt.accept = 'image/*';
  fileInput.position(0, 0);
  fileInput.style('visibility', 'hidden');
  fileInput.elt.click();
}

// Funzione callback per gestire il caricamento del file
function handleFile(file) {
  if (file.type === 'image') {
    dmImage = loadImage(file.data);
    gDmScale.show();
    gDmX.show();
    gDmY.show();
    redrawImage = true;
  }
}

obj.createSird = function(){
  createSird();
}

obj.paintClear = function(){
  background(0);
}

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