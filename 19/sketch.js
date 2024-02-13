let fps = 30;

let obj = {
  nItemsH: 24,
  nItemsS: 8,
  nItemsB: 8,

  cilRadius: 0.4,
  cilHeight: 0.6,
  itemSize: 2,

  radStart: 0,
  radEnd: 1,

  displace: 0,

  animate: true,
  delayH: false,
  delayS: true,
  delayB: false,

  translateZ: 0,
  rotateX: 0.125,
  rotateZ: 0,
};

function setup() {
  createCanvas(1080, 1920, WEBGL);
  responsiveSketch();
  frameRate(fps);
  sketchExportSetup({
    fps: fps,
    name: 'video'
  });
  setupLil();

  colorMode(HSB, 360, 100, 100);

  // Standard othographic Camera
  let cam = createCamera();
  cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 10000);
  cam.lookAt(0, 0, 0);
}

function draw() {
  background(10);
  ambientLight(255);
  // orbitControl();
  
  let cRad = width * obj.cilRadius;
  let cHeight = height * obj.cilHeight;
  let bri = 0;
  
  // Hue increment
  let deltaH = 360 / obj.nItemsH;
  // Saturation increment
  let deltaS = 100 / obj.nItemsS;
  // Brightness increment
  let deltaB = 100 / obj.nItemsB;
  
  rotateX(TWO_PI * obj.rotateX);
  let rz = getLoop(0.25 * 0.125) * TWO_PI;
  rotateZ(rz + TWO_PI * obj.rotateZ);
  
  translate(0, 0, obj.translateZ * cHeight);
  
  for (iB = 0; iB <= obj.nItemsB; iB++){
    push();
      let zPos = map(iB, 0, obj.nItemsB, -cHeight * 0.5, cHeight * 0.5, true);
      translate(0, 0, zPos);
      
      let hue = 0;
      
      for (iH = 0; iH <= obj.nItemsH; iH++){
        let sat = 0;

        // H Displace
        // translate(0, 0, obj.displace * iH / obj.nItemsH * cHeight / obj.nItemsH);
        
        for (iS = 0; iS <= obj.nItemsS; iS++){
          
          let radius = map(iS, 0, obj.nItemsS, 0, cRad); 

          // Standard angle
          let angZ = TWO_PI / obj.nItemsH * iH;

          push();
            rotateZ(angZ); 
            
            noStroke();
            let c = color(hue, sat, bri);
            ambientMaterial(c);
            translate(radius, 0, 0);
            
            let minSize = width * obj.itemSize * 0.25 * 0.25 * 0.25;
            let itemSize = minSize;
            
            let d = 0;  
            // delay based on Saturation
            if (obj.delayS){
              d += iS / obj.nItemsS * 0.5 * 0.5;
            }
            // delay based on Brightness
            if (obj.delayB){
              d += iB / obj.nItemsB * 0.5 * 0.5;
            }
            // delay based on Hue
            if (obj.delayH){
              d += iH / obj.nItemsH * 0.5;
            }

            let bounce = 1;
            if (obj.animate){
              bounce = getLoopBounce(0.125, d);
            }

            let render = false;
            if (
              ((rz + angZ) % TWO_PI) >= TWO_PI * obj.radStart &&
              ((rz + angZ) % TWO_PI) <= TWO_PI * obj.radEnd){
              render = true;
            }

            if (render){
              sphere(itemSize * bounce);
            }
          pop();

          // Saturation
          sat += deltaS;
        }
        
        // Hue
        hue += deltaH;
      }
      // Brightness
      bri += deltaB;
    pop();
  }

  if (frameCount == 1){
    sketchExportStart();
  }
  sketchExport();
  if (frameCount == 14 * fps){
    sketchExportEnd();
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
  localStorage.removeItem('guiSettings19');
  window.location = window.location.href.split("?")[0];
};

function setupLil(){
  gui = new GUI();

  const gCols = gui.addFolder('HSB Divisions');
  gCols.add(obj, 'nItemsH').min(2).max(36).step(1).name('Hue');
  gCols.add(obj, 'nItemsB').min(1).max(20).step(1).name('Saturation');
  gCols.add(obj, 'nItemsS').min(1).max(20).step(1).name('Brightness');

  const gSize = gui.addFolder('Cylinder');
  gSize.add(obj, 'itemSize').min(0.1).max(10).name('Item Size');
  gSize.add(obj, 'cilRadius').min(0.1).max(1).name('Radius');
  gSize.add(obj, 'cilHeight').min(0.1).max(1).name('Height');

  const gAnimate = gui.addFolder('Animation');
  gAnimate.add(obj, 'animate').name('Animate');
  gAnimate.add(obj, 'delayH').name('Delay H');
  gAnimate.add(obj, 'delayS').name('Delay S');
  gAnimate.add(obj, 'delayB').name('Delay B');

  // gui.add(obj, 'displace').min(-1).max(1).name('Displace');

  const gClip = gui.addFolder('Clip').close();
  gClip.add(obj, 'radStart').min(0).max(1).step(0.125).name('Start');
  gClip.add(obj, 'radEnd').min(0).max(1).step(0.125).name('End');

  const gPos = gui.addFolder('Position').close();
  gPos.add(obj, 'rotateX').min(0).max(1).name('Rotate X');
  gPos.add(obj, 'rotateZ').min(0).max(1).name('Rotate Z');
  gPos.add(obj, 'translateZ').min(-1).max(1).name('Translate Z');

  gui.add(obj, 'savePreset' ).name('Save Preset');
  gui.add(obj, 'export').name('Export video');
  gui.add(obj, 'clearStorage').name('Clear');

  // gui.onChange( event => {});
  
  let saved = localStorage.getItem('guiSettings19');
  if (saved){
    gui.load(JSON.parse(saved));
  };
};

function saveToStorage(){
  preset = gui.save();
  localStorage.setItem('guiSettings19', JSON.stringify(preset));
};