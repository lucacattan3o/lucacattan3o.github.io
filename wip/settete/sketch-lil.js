let obj = {
  vel: 1,
  eyelidY: 0.5,
  eyebrowsY: 0,
  eyebrowsDelta: 0,
  eyebrows: 'Happy',
  mouth: 'Idle',
  soundAmp: 0.1,
};

let storageName = 'settete';

// ** LIL **
// ---------

let GUI = lil.GUI;
let gui, guiMic, guiVel;

obj.toggleMic = function(){
  toggleMic();
  if (micOn) {
    guiMic.name('Mic: Turn Off');
  } else {
    guiMic.name('Mic: Turn On');
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

  const eyes = gui.addFolder('Eyes');
  eyes.add(obj, 'eyebrows', ['Tilde', 'Happy']).name('Eyebrows Type');
  eyes.add(obj, 'eyebrowsY').min(-0.5).max(0.5).name('Eyebrows Y');
  eyes.add(obj, 'eyebrowsDelta').min(-1).max(1).name('Eyebrows Delta');
  eyes.add(obj, 'eyelidY').min(0.5).max(2.5).name('Eyelid');

  const mouth = gui.addFolder('Mouth');
  mouth.add(obj, 'mouth', ['Idle', 'Sad', 'Bored', 'Happy', 'Wow']).name('Mouth Type');

  const sound = gui.addFolder('Sound');
  guiMic = sound.add(obj, 'toggleMic').name('Mic: Turn On');
  sound.add(obj, 'soundAmp').min(0).max(2).name('Sound Displacement');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear');
  gui.add(obj, 'startOver').name('Run Again');
  
  gui.add(obj, 'saveImage').name('Save Image');

  // gui.onChange( event => {});
  
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