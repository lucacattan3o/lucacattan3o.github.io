let fps = 30;

let obj = {
  showDebug: false,
  showImage: false,
  addRandomForces: true,
};

let itemSize;
let mainFont, img;
let fonts = [];
let sec;
let clusters;
let userInt = false;

let storageName = 'gui-metronimie';

let fontsName = [
  'Epilogue-Black.ttf',
  'Epilogue-Medium.ttf',
  'Epilogue-ThinItalic.ttf',
];

let palette = [
  '#FFC130', // yellow
  '#FC4C57', // red
  '#F43B6E', // pink
  '#35ACC7', // blue,
];

let p1 = 0;
let p2 = 1;

function preload() {
  fontsName.forEach((name, i) => {
    loadFont('./fonts/' + name, (font) => {
      if (i == 0){
        mainFont = font;
      } else {
        fonts.push(font);
      }
    });
  });
}

function setup() {
  myCanvas = createCanvas (windowWidth, windowHeight);
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: getFileName('video'),
  });
  setupLil();

  itemSize = width * 0.04;

  matterSetup();
  setUpClusters();
}

function setUpClusters(){
  clusters = [];
  push();
    for (let i = 0; i < sentence.length; i++) {
      let item = sentence[i];
      let word = item.word;
      let x = width * 0.5 + itemSize * item.x;
      let y = height * 0.5 + itemSize * 1.65 * item.y;
      let cluster = new Cluster(x, y, word);
      clusters.push(cluster);
    }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // todo: maybe better with CSS
  let ci = getLoop(0.25);
  if (ci == 0){
    p1++;
    p2++;
    if (p1 >= palette.length){
      p1 = 0;
    }
    if (p2 >= palette.length){
      p2 = 0;
    }
  }
  let c1 = color(palette[p1]);
  let c2 = color(palette[p2]);
  let bg = lerpColor(c1, c2, ci);
  background(bg);

  sec = frameCount / fps;

  if (obj.showImage){
    push();
      translate(width * 0.5, height * 0.5);
      scale(1.5);
      image(img, -img.width * 0.5, -img.height * 0.5);
    pop();
  }

  drawClusters();

  if (obj.addRandomForces && !userInt){
    if (sec % 2 == 0){
      let cluster = random(clusters);
      cluster.setScaled();
    }
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 16 * fps){
    sketchExportEnd();
  }
}  

function drawClusters(){
  cursor('pointer');
  push();
  for (let i = 0; i < clusters.length; i++) {
    let cluster = clusters[i];
    cluster.draw();
  }
  pop();
}

function userInteracted(){
  if (!userInt){
    userInt = true;
    let to = setTimeout(() => {
      userInt = false;
      clearInterval(to);
    }, 4000);
  }
}

// ** LIL **
// ---------

let GUI = lil.GUI;
let gui;

obj.savePreset = function() {
  saveToStorage();
};

obj.loadPreset = function() {
  gui.load(preset);
};

obj.export = function() {
  saveToStorage();
  let url = window.location.href;    
  if (url.indexOf('?') > -1){
    url += '&export=true';
  } else {
    url += '?export=true';
  }
  window.location.href = url;
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

  const debug = gui.addFolder('Debug');
  debug.add(obj, 'showDebug').name('Show Debug');
  // debug.add(obj, 'showImage').name('Show Reference');
  debug.add(obj, 'addRandomForces').name('Add Random Forces');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'clearStorage').name('Clear');
  gui.add(obj, 'startOver').name('Run Again');

  // let exportBtn = gui.add(obj, 'export').name('Export Video');
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // if (urlParams.get('export') == 'true'){
  //   console.debug('test');
  //   exportBtn.disable();
  //   exportBtn.name('Exporting...');
  //   gui.add(obj, 'stopExport').name('Stop Export');
  // }
  
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
  return prefix + '-' + now.getMonth() + '-' + now.getDay() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();
}