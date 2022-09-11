let cFps = 30;
let capturer = false;

recordSketchSetFps(cFps);

let doRecord = false; 

function recordSketch(status){
  doRecord = status;
}

function recordSketchPre(){
  if (!doRecord){
    return;
  }
  if (frameCount == 1){
    capturer.start();
  }
}

function recordSketchPost(sec){
  if (!doRecord){
    return;
  }
  recordSketchCapture();
  if (frameCount == (cFps * sec)){
    noLoop();
    recordSketchSave();
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
  capturer.save();
  capturer.stop();
}

function recordSketchSetFps(fps){
  cFps = fps;
  capturer = new CCapture({
    format: 'webm',
    framerate: cFps,
    verbose: true,
  })
}