
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
  background(0);
}

function keyPressed() {
  console.debug(keyCode);   
  if (keyCode === 32) {
    if (music.isLooping()){
      music.stop();
    } else {
      music.loop();
    }  
  }
}

function draw() {
  

  recordSketchPre();

  mPos = responsiveMousePos();
  spec = fft.analyze();

  mPos = recordSketchData('mouse', mPos);
  spec = recordSketchData('spec', spec);
  
  // drawBars();

  if (mPos.x !== 0 && mPos.y !== 0){
    noFill();
    stroke(255);
    fill(0);
    circle(mPos.x, mPos.y, 200 * getMusicEnergy(4));
  }

  recordSketchPost(4, () => {
    music.stop();
  });
}
