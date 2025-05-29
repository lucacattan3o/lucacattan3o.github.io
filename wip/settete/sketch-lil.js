let obj = {
  vel: matildaIdleVel,
  amp: 0.1,

  eyebrowsY: 0,
  eyebrowsDelta: 0,
  eyebrows: 'Happy',
  eyelidY: 0.5,
  mouth: 'Idle',

  micMode: 'Manual',
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
  guiMicMode, guiMic, guiMicVolGain, guiMicVolSimulation, guiMicLevelA, guiMicLevelB, guiMicVolDisplacement,
  guiEyebrowsDelta, guiEyebrowsY,
  guiEyelidY,
  guiMouth;

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

  const sound = gui.addFolder('Sound');
  guiMicMode          = sound.add(obj, 'micMode', ['Manual', 'Simulated', 'Real Mic']).name('Mode');
  // guiMic              = sound.add(obj, 'micToggle').name('Mic: Turn On');
  guiMicVolGain       = sound.add(obj, 'micVolGain').min(10).max(200).name('Gain').hide();
  guiMicVolSimulation = sound.add(obj, 'micVolSimulation').min(0).max(10).name('Mic Input Simulated').hide();
  
  guiMicLevelA = sound.add(obj, 'micLevelA').min(0.5).max(4).step(0.1).name('Threshold Mid');
  guiMicLevelB = sound.add(obj, 'micLevelB').min(4).max(8).step(0.1).name('Threshold High');
  guiMicVolDisplacement = sound.add(obj, 'micSoundDisplacement').min(0).max(2).name('Sound Displacement').hide();

  hideMicControls();

  const body = gui.addFolder('Matilda');
  guiVel = body.add(obj, 'vel').min(0).max(4).name('Velocity');
  guiAmp = body.add(obj, 'amp').min(0).max(0.2).name('Ampliture');

  const eyes = gui.addFolder('Eyes');
  // eyes.add(obj, 'eyebrows', ['Tilde', 'Happy']).name('Eyebrows Type');
  guiEyebrowsY      = eyes.add(obj, 'eyebrowsY').min(-0.5).max(0.5).name('Eyebrows Y');
  guiEyebrowsDelta  = eyes.add(obj, 'eyebrowsDelta').min(-1).max(1).name('Eyebrows Delta');
  guiEyelidY        = eyes.add(obj, 'eyelidY').min(0.5).max(2.5).name('Eyelid');

  const mouth = gui.addFolder('Mouth');
  guiMouth = mouth.add(obj, 'mouth', ['Idle', 'Sad', 'Bored', 'Happy', 'Wow']).name('Mouth Type');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear');
  gui.add(obj, 'startOver').name('Run Again');
  
  gui.add(obj, 'saveImage').name('Save Image');

  gui.onChange( event => {
    switch (event.property) {
      case 'micMode':
        if (event.value == 'Real Mic') {
          guiMicVolSimulation.hide();
          guiMicVolGain.show();
          guiMicVolDisplacement.show();
          disableGuiInteractions();
          showMicControls();
          turnMicOn();
        }
        
        if (event.value == 'Simulated') {
          guiMicVolSimulation.show();
          guiMicVolGain.hide();
          guiMicVolDisplacement.hide();
          disableGuiInteractions();
          turnMicOff();
          showMicControls();
        }

        if (event.value == 'Manual'){
          guiMicVolSimulation.hide();
          enableGuiInteractions();
          hideMicControls();
          turnMicOff();
        }

        break;
    }
  });
  
  let saved = localStorage.getItem(storageName);
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function hideMicControls(){
  guiMicLevelA.hide();
  guiMicLevelB.hide();
  guiMicVolSimulation.hide();
  guiMicVolGain.hide();
  guiMicVolDisplacement.hide();
}

function showMicControls(){
  guiMicLevelA.show();
  guiMicLevelB.show();
}

function enableGuiInteractions(){
  guiVel.enable();
  guiAmp.enable();
  guiEyebrowsDelta.enable();
  guiEyebrowsY.enable();
  guiEyelidY.enable();
  guiMouth.enable();
}

function disableGuiInteractions(){
  guiVel.disable();
  guiAmp.disable();
  guiEyebrowsDelta.disable();
  guiEyebrowsY.disable();
  guiEyelidY.disable();
  guiMouth.disable();
}

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