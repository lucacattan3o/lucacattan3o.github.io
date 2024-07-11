// ** LIL **
// ---------

let GUI = lil.GUI;
let gui;
let guiGrid, guiCol, guiShapes, guiLev, guiPreset, guiRecording, guiExport, guiBg, guiCo, gsc1, gsc2, gsc3;
let exportBtn;

obj.savePreset = function() {
  saveToStorage();
};

obj.loadPreset = function() {
  gui.load(preset);
};

obj.clearStorage = function() {
  localStorage.removeItem(storageName);
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
  sketchRecordStart();
  sketchRecordVar('vals');
}

obj.stopDeleteRec = function(){
  localStorage.removeItem('sketchRecordStorage');
  let url = window.location.href.split('?')[0];
  window.location.href = url;
}

obj.export = function() {
  saveToStorage();
  let url = window.location.href.split('?')[0];   
  url += '?play=vals&export=true';
  window.location.href = url;
};

function setupLil(){
  gui = new GUI();

  guiGrid = gui.addFolder('Grid');
  guiGrid.add(obj, 'items').min(8).max(64).step(1).name('Items');
  guiGrid.add(obj, 'showGrid').name('Show Grid');

  guiCol = gui.addFolder('Colors');
  guiBg = guiCol.addColor(obj, 'bg').name('Background');
  guiCo = guiCol.addColor(obj, 'color').name('Shader');
  guiCol.add(obj, 'invert').name('Invert');

  guiShapes = gui.addFolder('Shapes');
  guiShapes.add( obj, 'shape1', [ 'Plus', 'Line'] ).name('Shape 1');
  guiShapes.add( obj, 'shape1CustomColor').name('Custom Color 1');
  gsc1 = guiShapes.addColor( obj, 'shape1Color').name('Color 1').hide();
  
  guiShapes.add( obj, 'shape2', [ 'Triangle', 'Circle', 'Arrow', 'X' ] ).name('Shape 2');
  guiShapes.add( obj, 'shape2CustomColor').name('Custom Color 2');
  gsc2 = guiShapes.addColor( obj, 'shape2Color').name('Color 2').hide();
  
  guiShapes.add( obj, 'shape3', [ 'Square', 'Square Full', 'Circle', 'Lines' ] ).name('Shape 3');
  guiShapes.add( obj, 'shape3CustomColor').name('Custom Color 3');
  gsc3 = guiShapes.addColor( obj, 'shape3Color').name('Color 3').hide();
  
  guiLev = gui.addFolder('Thresholds');
  guiLev.add(obj, 'threshold').min(0).max(1).step(0.05).name('Threshold');
  guiLev.add(obj, 'wide').min(0).max(0.4).step(0.05).name('Range');

  guiPreset = gui.addFolder('Preset');
  guiPreset.add(obj, 'savePreset' ).name('Save Preset');
  guiPreset.add(obj, 'clearStorage').name('Clear');

  guiRecording = gui.addFolder('Recording');
  if (!sExport.playback){
    let guiStartRec = guiRecording.add(obj, 'startRecording' ).name('Start recording frames');
    if (sExport.record){
      guiStartRec.name('Recording ...').disable();
    }
  } else {
    guiRecording.add(obj, 'stopDeleteRec' ).name('Delete recorded frames');
  }

  guiExport = gui.addFolder('Export');
  if (sExport.playback || sExport.export){
    exportBtn = guiExport.add(obj, 'export').name('Export video');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (sExport.export){
      exportBtn.disable();
      exportBtn.name('Exporting...');
      guiExport.add(obj, 'stopExport').name('Stop export');
    }
  }
  guiExport.add(obj, 'saveImage').name('Save image');

  let saved = localStorage.getItem(storageName);
  if (saved){
    gui.load(JSON.parse(saved));
  };

  gui.onChange( event => {
    if (event.property == 'invert'){
      let tmp = obj.bg;
      guiBg.setValue(obj.color);
      guiCo.setValue(tmp);
    }
    if (event.property == 'shape1CustomColor'){
      gsc1.show(event.value);
    }
    if (event.property == 'shape2CustomColor'){
      gsc2.show(event.value);
    }
    if (event.property == 'shape3CustomColor'){
      gsc3.show(event.value);
    }
  });

  if (sExport.record || sExport.export){
    disableDuringRecordAndExport();
  }

  if (sExport.playback){
    disableDuringPlayback();
  }
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem(storageName, JSON.stringify(preset));
};

function disableDuringPlayback(){
  disableChildren(guiGrid);
}

function disableDuringRecordAndExport(){
  disableChildren(guiGrid);
  disableChildren(guiCol);
  disableChildren(guiShapes);
  disableChildren(guiLev);
  disableChildren(guiPreset);
}

function disableChildren(guiFolder){
  let items = guiFolder.children;
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    element.disable();
  }
}

function userEndExporting(){
  guiGrid.hide();
  guiCol.hide();
  guiShapes.hide();
  guiLev.hide();
  guiPreset.hide();
  guiExport.hide();
}
