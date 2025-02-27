
let patColWidth = null;

function setupStereo(){
  let img = document.querySelector('#stereogram');
  img.addEventListener('click', function(event) {
    const base64ImageData = img.src;
    const contentType = 'image/png';
    const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank')
  });

  let download = document.querySelector('#download');
  download.addEventListener('click', function(event) {
    var a = document.createElement("a");
    a.href = img.src;
    a.download = getFileName('autostereogram');
    a.click();
  });
}

function createSird(){
  let canvas = document.getElementById('defaultCanvas0');
  let output = document.getElementById('stereogram-output');
  output.classList.add('ready');

  // guiBrushOn.setValue(false);

  updateStereoColors(obj.nColors);

  // calcolo la larghezza della colonna del pattern
  let eyeSep = Math.round(obj.stereoEyeSep / 2.54 * obj.stereoDpi);
  patColWidth = Math.round(eyeSep / 2) + 1;
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
      patternBuilderVerticalLinesPre();
      patternBuilder = patternBuilderVerticalLines;
      break;

    case 'Letter Noise':
      patternBuilderLettersPre();
      patternBuilder = patternBuilderLetters;
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

function patternBuilderVerticalLinesPre(){
  // console.debug(stereoColors);
}

function patternBuilderVerticalLines(x, y){
  let px = width - 1 - x;
  // col width 0-1
  let mx = map(px, 0, patColWidth, 0, 1);
  // scale the pattern
  let scale = map(obj.patScale, 0.1, 1, 8, 1);
  let smx = (mx * scale) % 1;
  let c = getColorByNoiseValue(smx);
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
  let ny = y * density;
  let n = noise(nx, ny);
  let c = getLerpColorByNoiseValue(n);
  let rgba = c.levels;
  return rgba;
}

let worleyPoints = null;
let worleyPointsTot = 40;

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
  px = px % patColWidth;
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
  // for (let i = 0; i < worleyPoints.length; i++) {
  for (let i = stepStart; i < stepEnd; i++) {
    const point = worleyPoints[i];
    let d = dist(px, y, point.x, point.y);
    if (d < minDist){
      minDist = d;
    }
  }
  let n = map(minDist, 0, patColWidth * obj.patGradScale * 5, 0, 1, true);
  let c = getLerpColorByNoiseValue(n);
  let rgba = c.levels;
  return rgba;
}

let pgLetter = null;

function patternBuilderLettersPre(){
  push();
    stroke(255);
    noFill();
    translate(width * 0.5, 0);

    let words = obj.patWords.split(' ');

    // grid
    push();
      translate(patColWidth * 0.5, height * 0.5);
      fill(stereoColors[0]);
      // rect(0, 0, patColWidth, height);
    pop();

    pgLetter = createGraphics(patColWidth, height);
    pgLetter.background(stereoColors[0]);
    let lineHeight = (height / 30 * obj.patScale);
    // dimensione del font calligrafico
    pgLetter.textFont(font, lineHeight * 2); 
    // dimensione raleway
    pgLetter.textFont(font, lineHeight * 1.3);
    let nRows = height / lineHeight;
    for (i = 0; i < nRows; i++ ){
      let w = i % words.length;
      pgLetter.push();
        pgLetter.translate(0, lineHeight * i);
        pgLetter.translate(0, lineHeight * 1);
        pgLetter.fill(stereoColors[1]);
        pgLetter.noStroke();
        let line = '';
        for (j = 0; j < 20; j++){
          let b = (w + j) % words.length;
          line += words[b];
        }
        pgLetter.text(line, 0, 0);
      pgLetter.pop();
    }
    // image(pgLetter, 0, 0);
    // pgLetter.scale(1, -1);
    pgLetter.loadPixels();
    // let c = pgLetter.get(7, 30);
  pop();
}

function patternBuilderLetters(x, y){
  let px = width - 1 - x;
  px = px % pgLetter.width;
  px = pgLetter.width - px - 1;
  // py = py % pgLetter.height;
  let rgba = pgLetter.get(px, y);
  if (rgba[3] !== 255){
    rgba = [0, 255, 255, 255];
  }
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
  let nColors = stereoColors.length - 1;
  let cSlice = 1 / nColors;
  let step = floor(n / cSlice);
  if (step >= nColors){
    step = nColors;
  }
  let c1 = step;
  let c2 = step + 1;
  if (c2 >= nColors){
    c2 = nColors;
  }
  let col1 = color(stereoColors[c1]);
  let col2 = color(stereoColors[c2]);
  let l = map(n % cSlice, 0, cSlice, 0, 1, true);
  let c = lerpColor(col1, col2, l);
  return c;
}

function getColorByNoiseValue(n){
  let nColors = stereoColors.length - 1;
  // qui è giusto il map con stereoColore.length per far uscire l'ultimo colore
  let ci = floor(map(n, 0, 1, 0, stereoColors.length, true));
  if (ci < 0){
    ci = 0;
  }
  if (ci >= nColors){
    ci = nColors;
  }
  let col = stereoColors[ci];
  let c = color(col);
  return c;
}