let obj = {
  vel: matildaIdleVel,
  amp: 0.1,
  eyelidY: 0.5,
  eyebrowsY: 0,
  eyebrowsDelta: 0,
  eyebrows: 'Happy',
  mouth: 'Idle',

  micVolSimulation: 0.2,
  micVolGain: 50,
  micLevelA: 2,
  micLevelB: 5,
  micSoundDisplacement: 1,
};

let storageName = 'settete';

// ** LIL **
// ---------

let GUI = lil.GUI;
let gui,
  guiVel,
  guiMic, guiMicVolGain, guiMicVolSimulation, guiMicVolDisplacement;

obj.micToggle = function(){
  toggleMic();
  if (micOn) {
    guiMic.name('Mic: Turn Off');
    guiMicVolSimulation.hide();
    guiMicVolGain.show();
    guiMicVolDisplacement.show();
  } else {
    guiMic.name('Mic: Turn On');
    guiMicVolSimulation.show();
    guiMicVolGain.hide();
    guiMicVolDisplacement.hide();
  }
};

obj.savePreset = function() {
  saveToStorage();
};

obj.loadPreset = function() {
  gui.load(preset);
};

obj.clearStorage = function() {
  localStorage.removeItem(storageName);
  window.location = window.location.href.split("?")[0];
};

obj.startOver = function(){
  saveToStorage();
  window.location = window.location.href.split("?")[0];
};

obj.stopExport = function(){
  sketchExportEnd();
};

obj.saveImage = function(){
  saveCanvas(getFileName('visual'), 'png');
}

function setupLil(){
  gui = new GUI();

  const body = gui.addFolder('Matilda');
  guiVel = body.add(obj, 'vel').min(0).max(4).name('Velocity');
  guiAmp = body.add(obj, 'amp').min(0).max(0.2).name('Ampliture');

  const eyes = gui.addFolder('Eyes');
  // eyes.add(obj, 'eyebrows', ['Tilde', 'Happy']).name('Eyebrows Type');
  eyes.add(obj, 'eyebrowsY').min(-0.5).max(0.5).name('Eyebrows Y');
  eyes.add(obj, 'eyebrowsDelta').min(-1).max(1).name('Eyebrows Delta');
  eyes.add(obj, 'eyelidY').min(0.5).max(2.5).name('Eyelid');

  const mouth = gui.addFolder('Mouth');
  mouth.add(obj, 'mouth', ['Idle', 'Sad', 'Bored', 'Happy', 'Wow']).name('Mouth Type');

  const sound = gui.addFolder('Sound');
  guiMic              = sound.add(obj, 'micToggle').name('Mic: Turn On');
  guiMicVolGain       = sound.add(obj, 'micVolGain').min(10).max(200).name('Gain').hide();
  guiMicVolSimulation = sound.add(obj, 'micVolSimulation').min(0).max(10).name('Mic Input Simulated');
  
  sound.add(obj, 'micLevelA').min(0.5).max(4).step(0.1).name('Threshold Mid');
  sound.add(obj, 'micLevelB').min(4).max(8).step(0.1).name('Threshold High');
  guiMicVolDisplacement = sound.add(obj, 'micSoundDisplacement').min(0).max(2).name('Sound Displacement').hide();

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear');
  gui.add(obj, 'startOver').name('Run Again');
  
  gui.add(obj, 'saveImage').name('Save Image');

  gui.onChange( event => {
    switch (event.property) {
      case 'toggleMic':
        break;
    }
  });
  
  let saved = localStorage.getItem(storageName);
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem(storageName, JSON.stringify(preset));
};

function getFileName(prefix){
  let now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  return stringaData = `${prefix}-${year}-${month}-${day}-${hs}-${mins}-${secs}`;
}