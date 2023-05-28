
let fps = 30;

let mPos;
let music, mT;
let amp, fft, spec;
let smooth = 0.7;

function preload(){
  music = loadSound('fm-belfast.mp3', function(){
    amp = new p5.Amplitude();
    amp.setInput(music);
    
    fft = new p5.FFT(smooth, 16);
    fft.setInput(music);
  });
}

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
  recordSketchSetFps(fps);
  sketchRecord.onPlaybackEnd = () => {
    recordSketchExportSave();
  };
  background(0);
}

function keyPressed() {  
  if (keyCode === 32) {
    if (!music.isLooping()){
      music.loop();
      recordSketchStart();
    } else {
      music.stop();
      recordSketchStop();
    }  
  }
}

function draw() {

  if (frameCount == 1){
    recordSketchStart();
  }

  mPos = responsiveMousePos();
  spec = fft.analyze();

  mPos = recordSketchData('mouse', mPos);
  spec = recordSketchData('spec', spec);
  
  // drawBars();

  if (mPos.x !== 0 && mPos.y !== 0){
    noFill();
    stroke(255);
    fill(0);
    let radius = width * 0.1;
    let bounce = width * 0.05 * getMusicEnergy(4);
    circle(mPos.x, mPos.y, radius + bounce);
  }

  recordSketchExport();
  if (frameCount == 3 * fps){
    recordSketchStop();
  }
}
