let fps = 60;

let palette = [
  "5900b3",
  "ffffff",
  "000000",
  "3a86ff",
  "ffbe0b"
];

let stereoColors = null;

let itemSize;
let items = [];
let w, h;

let mPos;
// let oscM, oscN;

function setup() {
  setupCanvas();
  setupLil();
  
  background(0);
  rectMode(CENTER);
  // setupItems();

  // Oscillator
  // oscM = new p5.Oscillator('sine');
  // oscN = new p5.Oscillator('sine');
  // oscM.amp(0.5);
  // oscN.amp(0.5);
}

function setupCanvas(){
  w = floor(obj.canvasW * obj.canvasMulty);
  h = floor(obj.canvasH * obj.canvasMulty);
  createCanvas(w, h);
  responsiveSketch();
  frameRate(fps);

  let img = document.getElementById('stereogram');
  img.width = w;
  img.height = h;
}

function setupItems(){
  items = [];
  let space = 1 / obj.items;
  // itemSize = 1080 / obj.items;
  itemSize = w / obj.items;
  for (let i = 0; i < obj.items; i++) {
    for (let j = 0; j < obj.items; j++) {
      let x = i * space;
      let y = j * space;
      let item = new Item(x, y);
      items.push(item);
    }
  }
}

function draw() {

  // mouse interaction
  let mPos = responsiveMousePos();

  if (mouseIsPressed && obj.brushOn){
    let bSize = 200;
    translate(mPos.x, mPos.y);
    fillGradient('radial', {
      from : [0, 0, 0], // x, y, radius
      to : [0, 0, bSize * obj.brushSize * 0.5], // x, y, radius
      steps : [
        color(255, 255 * obj.brushOpacity),
        color(255, 0)
      ] // Array of p5.color objects or arrays containing [p5.color Object, Color Stop (0 to 1)]
    });
    noStroke();
    circle(0, 0, bSize * obj.brushSize);
  }
  

  // let sec = frameCount / fps;
  // if (sec % 3 == 0){
  //   obj.createSird();
  // }

  // drawChladni();
}

function drawChladni(){
  let m = map(mPos.x, 0, w, 0.1, 10, true);
  let n = map(mPos.y, 0, h, 0.1, 10, true);
  guiM.setValue(m);
  guiN.setValue(n);

  // oscillator frequencies
  let fM = map(obj.freqM, 1, 10, 40, 440);
  let fN = map(obj.freqN, 1, 10, 40, 440);
  oscM.freq(fM);
  oscN.freq(fN);

  push();
    // translate((width - 1080) * 0.5, 0);
    items.forEach(item => {
      item.update();
      item.draw();
    });
  pop();
}

let patColWidth = null;

function createSird(){
  let canvas = document.getElementById('defaultCanvas0');
  let output = document.getElementById('stereogram-output');
  output.classList.add('ready');

  guiBrushOn.setValue(false);

  updateStereoColors(obj.nColors);

  // calcolo la larghezza della colonna del pattern
  let eyeSep = Math.round(obj.stereoEyeSep / 2.54 * obj.stereoDpi);
  patColWidth = Math.round(eyeSep / 2);
  if (obj.patType == 'Check Width') {
    console.debug('--------------');
    console.debug('EyeSep: ' + eyeSep);
  }
  // se il pattern è invertito, la mappa di profondità è tutta bianca
  // z quindi di base è a 1
  // posso ricavare di quanto sono state rimpicciolite le colonne
  if (obj.stereoInvert){
    let z = 1;
    let mu = (1 / obj.stereoMu);
    let sep = Math.round((1 - (mu * z)) * eyeSep / (2 - (mu * z)));
    let dif = Math.round(sep / 2);
    if (obj.patType == 'Check Width') {
      console.debug('Dif: ' + Math.round(sep / 2));
    }
    patColWidth = patColWidth - dif;
  }
  if (obj.patType == 'Check Width') {
    console.debug('Calculated: ' + patColWidth);
  }

  // pattern builder choice
  let patternBuilder = null;
  switch (obj.patType) {
    case 'SIRD':
      // silence ;)
      break;

    case 'Perlin Noise':
      noiseSeed(random(0, 100));
      patternBuilder = patternBuilderPerlinNoise;
      break;
    
    case 'Perlin Noise Sinusoidal':
      noiseSeed(random(0, 100));
      patternBuilder = patternBuilderPerlinNoiseSinusoidal;
      break;
    
    case 'Worley Noise':
      // create some random points in the space
      // check the closer point
      // set the color based on distance
      patternBuilderWorleyNoisePre();
      patternBuilder = patternBuilderWorleyNoise;
      break;

    case 'Vertical Lines':
      patternBuilder = patternBuilderVerticalLines;
      break;

    case 'Check Width':
      patternBuilder = patternBuilderCheckWidth;
      break;
  
    default:
      break;
  }

  let depthMapper = new Stereogram.CanvasDepthMapper(canvas, {
    inverted: obj.stereoInvert,
  });

  // console.debug(depthMapper);

  Stereogram.render({
    el: 'stereogram',
    width:  w,
    height: h,
    colors: stereoColors,
    depthMapper: depthMapper,
    patternBuilder: patternBuilder,
    // custom options
    eyeSep: obj.stereoEyeSep,
    dpi:    obj.stereoDpi,
    mu:     obj.stereoMu,
  });
}

// ** PATTERN BUILDERS **
// ----------------------

function patternBuilderVerticalLines(x, y){
  let px = width - 1 - x;
  let mx = map(px, 0, patColWidth, 0, 1);
  let scale = 0.5 * obj.patScale;
  if (mx % scale >= scale * 0.5){
    col = stereoColors[0];
  } else {
    col = stereoColors[1];
  }
  let c = color(col);
  // let c = getColorByNoiseValue(mx);
  let rgba = c.levels;
  return rgba;
}

let tmpX = null;
function patternBuilderCheckWidth(x, y){
  if (y == 0){
    if (x == width - 1){
      console.debug('Start at: ' + x);
    }
    tmpX = x;
  }
  if (y == 1){
    if (x == width - 1){
      console.debug('End at: ' + tmpX);
      let diff = width - 1 - tmpX;
      console.debug('Diff: ' + diff);
      console.debug('Scarto: ' + (patColWidth - diff));
    }
  }
  // x parte da destra (99 fino a 0)
  // calcolo dei valori di x più semplici
  // partono da 0 e arrivano a patColWidth (89)
  let px = width - 1 - x;
  let mx = map(px, 0, patColWidth, 0, 1);
  let scale = 0.5 * obj.patScale;
  if (mx % scale >= scale * 0.5){
    col = stereoColors[0];
  } else {
    col = stereoColors[1];
  }
  let c = color(col);
  let rgba = c.levels;
  return rgba;
}

function patternBuilderPerlinNoise(x, y){
  let px = width - 1 - x;
  // seamless
  if (px > patColWidth * 0.5){
    px = patColWidth - px;
  }
  let density = 0.5 * 0.5 * obj.patScale;
  let nx = px * density;
  let ny = y * density;
  let n = noise(nx, ny);
  let c = getLerpColorByNoiseValue(n);
  let rgba = c.levels;
  return rgba;
}

function patternBuilderPerlinNoiseSinusoidal(x, y){
  let px = width - 1 - x;
  // seamless
  if (px > patColWidth * 0.5){
    px = patColWidth - px;
  }
  let density = 0.5 * 0.5 * 0.5 * obj.patScale;
  let nx = cos(px * density) * 2;
  // or sin?
  let ny = y * obj.patScale * 0.5;
  let n = noise(nx, ny);
  let c = getLerpColorByNoiseValue(n);
  let rgba = c.levels;
  return rgba;
}

let worleyPoints = null;
let worleyPointsTot = 30;

function patternBuilderWorleyNoisePre(){
  worleyPoints = [];
  let tot = floor(worleyPointsTot * obj.patScale);
  let unitY = h / tot;
  let unitX = patColWidth;
  for (let i = 0; i < tot; i++) {
    let y = unitY * i;
    // 2 symmetric points 
    let xOffset = unitX * random(-0.5, 0.5);
    let yOffset = unitY * random(-0.25, 0.25);
    let point = {
      x: xOffset,
      y: y + yOffset
    };
    worleyPoints.push(point);
    let pointb = {
      x: unitX + xOffset,
      y: y + yOffset
    }
    worleyPoints.push(pointb);
    // middle one
    let yOffsetC = unitY * random(-0.125, 0.125);
    let pointc = {
      x: unitX * 0.5,
      y: y + unitY * 0.5 + yOffsetC,
    };
    worleyPoints.push(pointc);
  }
}

function patternBuilderWorleyNoise(x, y){
  let px = width - 1 - x;
  let minDist = w;
  // trovo il punto più vicino
  // ottimizzo l'algoritmo facendo il check solo
  // con i punti che presumo sia i più vicini
  let totPoints = worleyPoints.length;
  let deltaPoints = floor(totPoints / 5);
  if (deltaPoints < 5){
    deltaPoints = 5;
  }
  let sizeY = h / totPoints;
  let step = floor(y / sizeY);
  let stepStart = step - deltaPoints;
  if (stepStart < 0){
    stepStart = 0;
  }
  let stepEnd = step + deltaPoints;
  if (stepEnd > totPoints){
    stepEnd = totPoints;
  }
  for (let i = stepStart; i < stepEnd; i++) {
  // for (let i = 0; i < worleyPoints.length; i++) {
    const point = worleyPoints[i];
    let d = dist(px, y, point.x, point.y);
    if (d < minDist){
      minDist = d;
    }
  }
  let nScale = map(obj.patScale, 0.1, 1, 1, 4);
  let n = map(minDist, 0, sizeY * nScale, 0, 1, true);
  if (n >= 1){
    n = 0.9999;
  }
  let c = getLerpColorByNoiseValue(n);
  let rgba = c.levels;
  return rgba;
}

function patternBuilderBoxes(x, y){
  let size = 10;
  let cx = x % size;
  let cy = y % size;
  if (cx >= (size * 0.5)){
    if (cy >= (size * 0.5)){
      c = color(stereoColors[0]);
    } else {
      c = color(stereoColors[1]);
    }
  } else {
    if (cy >= (size * 0.5)){
      c = color(stereoColors[1]);
    } else {
      c = color(stereoColors[0]);
    }
  }
  let rgba = c.levels;
  return rgba;
}

// ** UTILITIES **
// ---------------

function getLerpColorByNoiseValue(n){
  let cSlice = 1 / stereoColors.length;
  let step = floor(n / cSlice);
  if (step > stereoColors.length){
    step = 0;
  }
  let c1 = step;
  let c2 = step + 1;
  if (c2 >= stereoColors.length){
    c2 = 0;
  }
  let col1 = color(stereoColors[c1]);
  let col2 = color(stereoColors[c2]);
  let l = map(n % cSlice, 0, cSlice, 0, 1);
  let c = lerpColor(col1, col2, l);
  return c;
}

function getColorByNoiseValue(n){
  let ci = floor(map(n, 0, 1, 0, stereoColors.length, true));
  if (ci > stereoColors.length){
    ci = stereoColors.length;
  }
  return color(stereoColors[ci]);
}