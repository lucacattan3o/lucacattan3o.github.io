/**
* A wrapper library for CCapture.js that help export your sketch as a video
* @author Luca Cattaneo <luca.cattaneo@mekit.it>
* @version 1.0.1
* @license MIT
*/

let sExport = {
  fps: 30,
  capturer: false,
  // status
  export: false,
  record: false,
  playback: false,
  // keys
  vars: {},
  // storage
  storage: {},
  // offset in recording
  frameCountDelay: 0,
  // events
  onPlaybackStart: false,
  onPlaybackEnd: false,
};

// ** SETUP **
// -----------

function sketchExportSetup(options){

  // Default settings
  let defaultSettings = {
    format: 'webm',
    verbose: true,
    fps: 30,
  };

  if (!options) options = {};

  // Extend options
  var settings = {};
  for(var key in defaultSettings){
    if(options.hasOwnProperty(key)){
      settings[key] = options[key];
    } else {
      settings[key] = defaultSettings[key];
    }
  }

  sExport.fps = settings.fps;
  sExport.capturer = new CCapture({
    format: settings.format,
    framerate: settings.fps,
    verbose: settings.verbose,
  })

  sketchExportReadParams();
}

function sketchExportReadParams(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  if (urlParams.get('export') == 'true'){
    sExport.export = true;
  }

  let record = urlParams.get('record');
  if (record){
    let names = record.split(',');
    names.forEach(name => {
      sExport.vars[name] = {};
      sExport.vars[name].record = true;
      sExport.storage[name] = [];
      console.debug('Recording: ' + name);
      // While recording, we can't export
      sExport.export = false;
      sExport.record = true;
    });
  }

  let play = urlParams.get('play');
  if (play){
    let names = play.split(',');
    names.forEach(name => {
      sExport.vars[name] = {};
      sExport.vars[name].play = false;
      let storage = localStorage.getItem('sketchRecord_' + name);
      if (storage){
        sExport.storage[name] = JSON.parse(storage);
        if (sExport.storage[name].length > 0){
          console.debug('Playing: ' + name);
          sExport.vars[name].play = true;
          sExport.playback = true;
        }
      }
      if (!sExport.vars[name].play){
        console.debug('Missing storage, store data using ?' + name + '=record');
      }
    });
    if (sExport.playback){
      if (typeof sExport.onPlaybackStart == 'function'){
        sExport.onPlaybackStart();
      }
    }
  }
}

// ** RECORDING **
// --------------------

function sketchRecordStart(){
  if (sExport.export){
    console.debug('RecordSketch: recording started');
    // todo: check if already started?
    sExport.capturer.start();
    sExport.frameCountDelay = frameCount;
  }
}

function sketchRecordStop(onEnd){
  let endRec = false;
  // Export mode
  if (!sExport.export){
    // Check all vars to store in local storage
    let names = Object.keys(sExport.vars);
    names.forEach(name => {
      if (sExport.vars[name] !== undefined && sExport.vars[name].record){
        endRec = true;
        if (sExport.storage[name] !== undefined){
          let str = JSON.stringify(sExport.storage[name]);
          localStorage.setItem('sketchExport_' + name, str);
          console.debug('Stored ' + name + ': ' + sExport.storage[name].length + ' frames.');
        } else {
          console.debug('Stored ' + name + ': missing.');
        }
      }
    });
  }
  if (endRec){
    noLoop();
    console.debug('RecordSketch: recording stopped');
    if (onEnd !== undefined){
      onEnd();
    }
  }
}

// ** STORE DATA **
// ----------------

function sketchRecordData(name, data){
  sketchRecordDataStore(name, data);
  return sketchRecordDataGet(name, data);
}

function sketchRecordDataStore(name, data){
  if (sExport.vars[name] !== undefined && !sExport.vars[name].record){
    return; 
  }
  if (sExport.vars[name] !== undefined){
    sExport.storage[name].push(data);
  }
}

function sketchRecordDataGet(name, data){
  if (sExport.playback && sExport.vars[name] !== undefined){
    if (sExport.storage[name][frameCount] !== undefined){
      return sExport.storage[name][frameCount];
    } else {
      noLoop();
      if (typeof sExport.onPlaybackEnd == 'function'){
        sExport.onPlaybackEnd();
      }
    }
  }
  return data;
}

// ** EXPORT **
// ------------

function sketchExport(){
  if (!sExport.export){
    return;
  }
  if (frameCount == 1){
    sExport.capturer.start();
  }
  sExport.capturer.capture(canvas);
}

function sketchExportSave(){
  if (!sExport.export){
    return;
  }
  sExport.capturer.save();
  sExport.capturer.stop();
}