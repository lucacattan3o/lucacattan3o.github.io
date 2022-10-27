let cFps = 30;
let capturer = false;

let doRecord = false;

let mouseRecord = false;
let mousePlay = false;

let mouseRecordPath = [];

recordSketchSetFps(cFps);
recordSketchCheckUrl();

function recordSketchPre(){
  if (!doRecord){
    return;
  }
  if (frameCount == 1){
    capturer.start();
  }
}

function recordSketchPost(sec){
  if (doRecord){
    recordSketchCapture();
  }
  if (frameCount == (cFps * sec)){
    if (doRecord){
      recordSketchSave();
    }
    if (mouseRecord){
      recordSketchMouseSave();
    }
  }
}

// ** UTILS **
// -----------

function recordSketchCapture(){
  if (!doRecord){
    return;
  }
  capturer.capture(canvas);
}

function recordSketchSave(){
  if (!doRecord){
    return;
  }
  noLoop();
  capturer.save();
  capturer.stop();
}

// ** FPS **
// ---------

function recordSketchSetFps(fps){
  cFps = fps;
  capturer = new CCapture({
    format: 'webm',
    framerate: cFps,
    verbose: true,
  })
}

// ** MOUSE **
// -----------

function recordSketchMouseRec(pos){
  if (!mouseRecord){
    return; 
  }
  mouseRecordPath.push(pos);
}

function recordSketchMouseGet(pos){
  if (mousePlay){
    if (mouseRecordPath[frameCount] !== undefined){
      return mouseRecordPath[frameCount];
    } else {
      return {x: 0, y: 0};
    }
  }
  return pos;
}

function recordSketchMouseSave(){
  localStorage.setItem('mouseRecordPath', JSON.stringify(mouseRecordPath));
  noLoop();
  console.debug('Mouse Path: stored ' + mouseRecordPath.length + ' points.');
}

// ** URL PARAMS **
// ----------------

function recordSketchCheckUrl(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const record = urlParams.get('record');
  if (record && record == 'true'){
    doRecord = true;
  }

  const mouse = urlParams.get('mouse');
  if (mouse && mouse == 'record'){
    console.debug('Mouse Path: recording.');
    mouseRecord = true;
    doRecord = false;
  }

  if (mouse && mouse == 'play'){
    let path = localStorage.getItem('mouseRecordPath');
    mouseRecordPath = JSON.parse(path);
    if (path){
      console.debug('Mouse Path: playing.');
      mousePlay = true;
    } else {
      console.debug('Mouse Path: missing path, store path using ?mouse=record .');
    }
  }
}

function recordSketch(status){
  doRecord = status;
}