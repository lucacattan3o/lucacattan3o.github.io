let capturer = new CCapture({
  format: 'webm',
  framerate: 30,
  verbose: true,
})

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
  recordSketchSave();
  if (frameCount == (60 * sec)){
    noLoop();
    recordSketchEnd();
  }
}

function recordSketchEnd(){
  if (!doRecord){
    return;
  }
  capturer.save();
  capturer.stop();
}

function recordSketchSave(){
  if (!doRecord){
    return;
  }
  capturer.capture(canvas);
}