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
  saveCanvas(getFileName('visual'), 'png');
}

obj.startRecording = function(){
  saveToStorage();
  let url = window.location.href.split('?')[0];
  url += '?record=vals';
  window.location.href = url;
}

obj.stopDeleteRec = function(){
  localStorage.removeItem('sketchRecordStorage');
  let url = window.location.href.split('?')[0];
  window.location.href = url;
}

function setupLil(){
  gui = new GUI();

  const grid = gui.addFolder('Grid');
  grid.add(obj, 'items').min(10).max(100).step(1).name('Items');
  grid.add(obj, 'showGrid').name('Show Grid');

  const col = gui.addFolder('Colors');
  col.addColor(obj, 'bg').name('Background');
  col.addColor(obj, 'color').name('Shader');
  col.add(obj, 'invert').name('Invert');

  const shapes = gui.addFolder('Shapes');
  shapes.add( obj, 'shape1', [ 'Plus', 'Line'] ).name('Shape 1');
  shapes.add( obj, 'shape2', [ 'Triangle', 'Circle', 'Arrow', 'X' ] ).name('Shape 2');
  shapes.add( obj, 'shape3', [ 'Square', 'Square Full', 'Circle', 'Lines' ] ).name('Shape 3');
  
  const lev = gui.addFolder('Thresholds');
  lev.add(obj, 'threshold').min(0).max(1).step(0.05).name('Threshold');
  lev.add(obj, 'wide').min(0).max(0.4).step(0.05).name('Range');

  const preset = gui.addFolder('Preset');
  preset.add(obj, 'savePreset' ).name('Save Preset');
  preset.add(obj, 'clearStorage').name('Clear');
  preset.add(obj, 'startOver').name('Run Again');

  const recording = gui.addFolder('Recording');
  if (!sExport.record && !sExport.playback){
    recording.add(obj, 'startRecording' ).name('Start recording');
  } else {
    recording.add(obj, 'stopDeleteRec' ).name('Stop loop and Delete recording');
  }

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

  // gui.onChange( event => {});
  
  let saved = localStorage.getItem(storageName);
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem(storageName, JSON.stringify(preset));
};
