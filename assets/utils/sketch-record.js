


let sketchRecord = {
  fps: 30,
  capturer: false,
  // instead of record
  export: false,
  // keys
  vars: {},
  // storage
  storage: {},
  // offset in recording
  frameCountDelay: 0,
};

recordSketchCheckUrl();

// ** PRE AND POST **
// ------------------

/*
function recordSketchPre(){
  if (!sketchRecord.export){
    return;
  }
  if (frameCount == 1){
    sketchRecord.capturer.start();
  }
}

function recordSketchPost(sec = false, onEnd = null){
  if (sketchRecord.export){
    recordSketchCapture();
  }
  
  if (sec){
    if ((frameCount + sketchRecord.frameCountDelay) == (sketchRecord.fps * sec)){
      recordSketchEnd(onEnd); 
    }
  }
}*/

function recordSketchFrameCapture(){
  if (sketchRecord.export){
    recordSketchCapture();
  }
}

// ** START AND STOP **
// --------------------

function recordSketchStart(onStart){
  if (sketchRecord.export){
    console.debug('RecordSketch: recording started');
    // todo: check if already started?
    sketchRecord.capturer.start();
    sketchRecord.frameCountDelay = frameCount;
  }
  if (onStart !== undefined){
    onStart();
  }
}

function recordSketchStop(onEnd){
  let endRec = false;
  // Export mode
  if (sketchRecord.export){
    recordSketchExport();
    endRec = true;
  } else {
    // Check all vars to store in local storage
    let names = Object.keys(sketchRecord.vars);
    names.forEach(name => {
      if (sketchRecord.vars[name] !== undefined && sketchRecord.vars[name].record){
        endRec = true;
        if (sketchRecord.storage[name] !== undefined){
          let str = JSON.stringify(sketchRecord.storage[name]);
          localStorage.setItem('sketchRecord_' + name, str);
          console.debug('Stored ' + name + ': ' + sketchRecord.storage[name].length + ' frames.');
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

function recordSketchData(name, data){
  recordSketchDataStore(name, data);
  return recordSketchDataGet(name, data);
}

function recordSketchDataStore(name, data){
  if (sketchRecord.vars[name] !== undefined && !sketchRecord.vars[name].record){
    return; 
  }
  if (sketchRecord.vars[name] !== undefined){
    sketchRecord.storage[name].push(data);
  }
}

function recordSketchDataGet(name, data){
  if (sketchRecord.vars[name] !== undefined && sketchRecord.vars[name].play){
    if (sketchRecord.storage[name][frameCount] !== undefined){
      return sketchRecord.storage[name][frameCount];
    }
  }
  return data;
}

// ** UTILS **
// -----------

function recordSketchCapture(){
  if (!sketchRecord.export){
    return;
  }
  if (frameCount == 1){
    sketchRecord.capturer.start();
  }
  sketchRecord.capturer.capture(canvas);
}

function recordSketchExport(){
  console.debug('recordSketchExport');
  if (!sketchRecord.export){
    return;
  }
  sketchRecord.capturer.save();
  sketchRecord.capturer.stop();
}

// ** BUILD **
// -----------

function recordSketchSetFps(fps){
  sketchRecord.fps = fps;
  sketchRecord.capturer = new CCapture({
    format: 'webm',
    framerate: sketchRecord.fps,
    verbose: true,
  })
}

// ** URL PARAMS **
// ----------------

function recordSketchCheckUrl(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  if (urlParams.get('export') == 'true'){
    sketchRecord.export = true;
  }

  let record = urlParams.get('record');
  if (record){
    let names = record.split(',');
    names.forEach(name => {
      sketchRecord.vars[name] = {};
      sketchRecord.vars[name].record = true;
      sketchRecord.storage[name] = [];
      console.debug('Recording: ' + name);
      // While recording, we can't export
      sketchRecord.export = false;
    });
  }

  let play = urlParams.get('play');
  if (play){
    let names = play.split(',');
    names.forEach(name => {
      sketchRecord.vars[name] = {};
      sketchRecord.vars[name].play = false;
      let storage = localStorage.getItem('sketchRecord_' + name);
      if (storage){
        sketchRecord.storage[name] = JSON.parse(storage);
        if (sketchRecord.storage[name].length > 0){
          console.debug('Playing: ' + name);
          sketchRecord.vars[name].play = true;
        }
      }
      if (!sketchRecord.vars[name].play){
        console.debug('Missing storage, store data using ?' + name + '=record');
      }
    });
  }
}