
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
      sketchExportEnd();
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
  mPos = responsiveMousePos();
  spec = fft.analyze();

  mPos = sketchRecordData('mouse', mPos);
  spec = sketchRecordData('spec', spec);
  
  // drawBars();

  if (mPos.x !== 0 && mPos.y !== 0){
    noFill();
    stroke(255);
    fill(0);
    let radius = width * 0.05;
    let bounce1 = width * 0.1 * getMusicEnergy(4);
    let bounce2 = width * 0.1 * getMusicEnergy(8);
    let w = radius + bounce1;
    let h = radius + bounce2;
    rectMode(CENTER); 
    rect(mPos.x, mPos.y, w, h);
    rect(width - mPos.x, height - mPos.y, w, h);
  }

  if (frameCount == 1){
    sketchExportStart();
    // sketchRecordStart();
  }
  sketchExport();
  if (frameCount == 6 * fps){
    // sketchRecordStop();
    // sketchExportEnd();
  }
}
