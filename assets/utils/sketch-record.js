


let sketchRecord = {
  fps: 30,
  capturer: false,
  // instead of record
  export: false,
  // keys
  vars: {},
  // storage
  storage: {},
  // mouse
  mouseRecord: false,
  mousePlay: false,
  mouseStorage: [],
  // music
  musicRecord: false,
  musicPlay: false,
  musicStorage: [],
};

recordSketchCheckUrl();

// ** PRE AND POST **
// ------------------

function recordSketchPre(){
  if (!sketchRecord.export){
    return;
  }
  if (frameCount == 1){
    sketchRecord.capturer.start();
  }
}

function recordSketchPost(sec){
  if (sketchRecord.export){
    recordSketchCapture();
  }
  if (frameCount == (sketchRecord.fps * sec)){
    if (sketchRecord.export){
      recordSketchSave();
    }
    console.debug('end!');
    // todo: per ogni vars con record su true devo salvare
    console.debug(sketchRecord.vars);
    // if (sketchRecord.mouseRecord){
    //   recordSketchMouseSave();
    // }
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
  sketchRecord.capturer.capture(canvas);
}

function recordSketchSave(){
  if (!sketchRecord.export){
    return;
  }
  noLoop();
  sketchRecord.capturer.save();
  sketchRecord.capturer.stop();
}

// ** FPS **
// ---------

function recordSketchSetFps(fps){
  sketchRecord.fps = fps;
  sketchRecord.capturer = new CCapture({
    format: 'webm',
    framerate: sketchRecord.fps,
    verbose: true,
  })
}

// ** MOUSE **
// -----------

function recordSketchMouseRec(pos){
  if (!sketchRecord.mouseRecord){
    return; 
  }
  sketchRecord.mouseStorage.push(pos);
  // console.debug('Mouse path stored: ' + frameCount);
}

function recordSketchMouseGet(pos){
  if (sketchRecord.mousePlay){
    if (sketchRecord.mouseStorage[frameCount] !== undefined){
      return sketchRecord.mouseStorage[frameCount];
    } else {
      return {x: 0, y: 0};
    }
  }
  return pos;
}

function recordSketchMouseSave(){
  localStorage.setItem('sketchRecordMouse', JSON.stringify(sketchRecord.mouseStorage));
  noLoop();
  console.debug('Mouse Path: stored ' + sketchRecord.mouseStorage.length + ' points.');
}

// ** URL PARAMS **
// ----------------

function recordSketchCheckUrl(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  // const exp = urlParams.get('export');
  if (urlParams.get('export') == 'true'){
    sketchRecord.export = true;
  }

  // per ogni coppia
  for (const [name, value] of urlParams.entries()) {
    if (name == 'export'){
      continue;
    }
    if (value == 'record'){
      sketchRecord.vars[name] = {};
      sketchRecord.vars[name].record = true;
      sketchRecord.storage[name] = [];
      console.debug('Recording: ' + name);
      // While recording, we can't export
      sketchRecord.export = false;
    }

    if (value == 'play'){
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
    }
  }
}

function recordSketch(status){
  sketchRecord.export = status;
}