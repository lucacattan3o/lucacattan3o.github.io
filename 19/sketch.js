let fps = 30;

let obj = {
  nItemsH: 15,
  nItemsS: 10,
  nItemsB: 10,

  cilRadius: 0.5,
  cilHeight: 0.6,

  displace: 0,

  translateZ: 0,
};

function setup() {
  createCanvas(1080, 1980, WEBGL);
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
  // orbitControl();
  ambientLight(255);
  
  let cRad = width * obj.cilRadius;
  let cHeight = height * obj.cilHeight;
  let bri = 0;
  
  // incremento della tinta
  let deltaH = 360 / obj.nItemsH;
  // incremento della saturazione
  let deltaS = 100 / obj.nItemsS;
  // incremento della brillanza
  let deltaB = 100 / obj.nItemsB;
  
  rotateX(PI * 0.25);
  // rotateX(-getLoop(0.25) * PI * 0.25);
  rotateZ(getLoop(0.25 * 0.125) * TWO_PI);

  translate(0, 0, obj.translateZ * cHeight);
  
  for (iB = 0; iB < obj.nItemsB; iB++){
    push();
      let zPos = map(iB, 0, obj.nItemsB, -cHeight * 0.5, cHeight * 0.5, true);
      translate(0, 0, zPos);
      // tinta di partenza
      let hue = 0;
      
      for (iH = 0; iH < obj.nItemsH; iH++){
        let sat = 0;

        // H Displace
        translate(0, 0, obj.displace * iH / obj.nItemsH * cHeight / obj.nItemsH);
        
        for (iS = 0; iS < obj.nItemsS; iS++){
          
          let radius = map(iS, 0, obj.nItemsS, 0, cRad); 
          
          push();
            rotateZ(TWO_PI / obj.nItemsH * iH); 
            
            noStroke();
            stroke('#000');
            // stroke('#fff');
            let c = color(hue, sat, bri);
            ambientMaterial(c);
            translate(radius, 0, 0);
            
            let minSize = width * 0.25 * 0.25 * 0.25 * 0.25;
            let itemSize = minSize + (width * iS * iS * 1/1000);
            // box(width * 0.25 * 0.25);
            // rotateZ(-TWO_PI / obj.nItemsH * iH);
            box(itemSize);
            // sphere(width * 0.25 * 0.25);
          pop();

          // Incremento la saturazione
          sat += deltaS;
        }
        
        // Incremento la tinta
        hue += deltaH;
      }
      // Incremento la brillanza
      bri += deltaB;

    pop();
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

  const gCols = gui.addFolder('Numbers');
  gCols.add(obj, 'nItemsH').min(2).max(36).step(1).name('Items Hue');
  gCols.add(obj, 'nItemsB').min(1).max(20).step(1).name('Items Brigthness');

  const gSize = gui.addFolder('Size');
  gSize.add(obj, 'nItemsS').min(1).max(20).step(1).name('Item Size');
  gSize.add(obj, 'cilRadius').min(0.1).max(1).name('Cilinder Radius');
  gSize.add(obj, 'cilHeight').min(0.1).max(1).name('Cilinder Height');

  gui.add(obj, 'displace').min(-1).max(1).name('Displace');

  const gPos = gui.addFolder('Position');
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