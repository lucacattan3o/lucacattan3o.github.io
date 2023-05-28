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
  
  if (settings.onPlaybackStart){
    sExport.onPlaybackStart = settings.onPlaybackStart;
  }
  if (settings.onPlaybackEnd){
    sExport.onPlaybackEnd = settings.onPlaybackEnd;
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
      console.debug('SketchExport: recording ' + name);
      // While recording, we can't export
      sExport.export = false;
      sExport.record = true;
    });
  }

  let play = urlParams.get('play');
  if (play){
    let names = play.split(',');
    let storage = localStorage.getItem('sketchRecordStorage');
    if (storage){
      storage = JSON.parse(storage);
      names.forEach(name => {
        sExport.vars[name] = {};
        sExport.vars[name].play = false;
        
        if (storage[name] !== undefined){
          sExport.storage[name] = storage[name];
          if (sExport.storage[name].length > 0){
            console.debug('SketchExport: playing ' + name);
            sExport.vars[name].play = true;
            sExport.playback = true;
          }
        }
        if (!sExport.vars[name].play){
          console.debug('SketchExport: missing storage; store data using ?' + name + '=record');
        }
      });
      if (sExport.playback){
        if (typeof sExport.onPlaybackStart == 'function'){
          sExport.onPlaybackStart();
        }
      }
    }
    
  }
}

// ** RECORDING **
// --------------------

function sketchRecordStart(){
  if (!sExport.export && sExport.record){
    sExport.frameCountDelay = frameCount;
    console.debug('SketchExport: recording started');
  } 
}

function sketchRecordStop(){
  if (!sExport.export && sExport.record){
    console.debug('SketchExport: recording stopped');
    noLoop();
    // Save all data in the storage
    if (sExport.storage){
      localStorage.setItem('sketchRecordStorage', JSON.stringify(sExport.storage));
      console.debug('SketchExport: storage saved');
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

function sketchExportStart(){
  if (sExport.export){
    // todo: check if already started?
    sExport.capturer.start();
    console.debug('SketchExport: export started');
  }
}

function sketchExportEnd(){
  if (!sExport.export){
    return;
  }
  sExport.capturer.save();
  sExport.capturer.stop();
  console.debug('SketchExport: export ended');
  noLoop();
}