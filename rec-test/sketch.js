
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

  sketchExportSetup({
    fps: fps,
    onPlaybackEnd: () => {
      sketchExportSave();
    }
  });

  background(0);
}

function keyPressed() {  
  if (keyCode === 32) {
    if (!music.isLooping()){
      music.loop();
      sketchRecordStart();
    } else {
      music.stop();
      sketchRecordStop();
    }  
  }
}

function draw() {

  if (frameCount == 1){
    sketchRecordStart();
  }

  mPos = responsiveMousePos();
  spec = fft.analyze();

  mPos = sketchRecordData('mouse', mPos);
  spec = sketchRecordData('spec', spec);
  
  // drawBars();

  if (mPos.x !== 0 && mPos.y !== 0){
    noFill();
    stroke(255);
    fill(0);
    let radius = width * 0.1;
    let bounce = width * 0.05 * getMusicEnergy(4);
    circle(mPos.x, mPos.y, radius + bounce);
  }

  sketchExport();
  if (frameCount == 3 * fps){
    sketchRecordStop();
    sketchExportSave();
  }
}
