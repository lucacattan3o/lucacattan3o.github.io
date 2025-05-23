
let 
  matildaW, matildaH, matildaAmp, matildaOffset,
  eyeSize, eyeSep, eyeAspect,
  pupilSize, pupilAspect, pupilDist,
  strokeW,
  mouthUnit, mouthW;

function drawMatilda(matildaX, matildaY){
  updateBodyPoints();

  matildaW = unit * 2;
  matildaH = matildaW * 1.4;

  // ampiezza dell'oscillazione
  matildaAmp = matildaW * 0.1;

  // offset dal centro di matilda
  // viso un po' a sx
  matildaOffset = matildaW * 0.15;
  
  eyeSize = matildaW * 0.5;
  eyeSep = eyeSize * 0.4;
  eyeAspect = 1.2;
  eyeWhite = eyeSize * 3;

  pupilSize = eyeSize * 0.24;
  pupilAspect = 1.5;
  pupilDist = eyeSize * 0.5;

  strokeW = matildaW * 0.018;

  // spessore bocca
  mouthUnit = matildaW * 0.11;
  mouthW = mouthUnit * 2.5;
  
  strokeWeight(strokeW);

  // body
  push();
    noStroke();
    fill(matildaBg);
    drawSmartTilde(matildaX, matildaY, matildaW, matildaH, matildaAmp, nPoints);
  pop();

  // eyes
  let x = matildaX - matildaOffset + (0.7 * matildaAmp * bodyPoints[26].x);
  let y = matildaY - matildaH * 0.1;
  drawEye(x - eyeSep, y);
  drawEye(x + eyeSep, y);

  drawEyebrows(matildaX - matildaOffset, matildaY);

  // mouth
  let mx = matildaX - matildaOffset + (0.4 * matildaAmp * bodyPoints[27].x);
  let my = matildaY + matildaH * 0.19;
  drawMouth(mx, my);
}

function drawSmartTilde(x, y, w, h, amp, points){
  push();
  translate(x, y - h * 0.5);
  let firstPoint = {
    x: null,
    y: null,
  };
  beginShape();
    for (let i = 0; i < points; i++) {
      let point = bodyPoints[i];
      let x = w * 0.5;
      x = x + map(point.x, -1, 1, -amp, amp);
      let y = i * (h / points);
      if (i == 0){
        firstPoint.x = x;
        firstPoint.y = y;
      }
      vertex(x, y);
      // text(i, x + 30, y);
    };
    for (let i = (points - 1); i >= 0; i--) {
      let point = bodyPoints[i];
      let x = -w * 0.5;
      x = x - map(point.x, 1, -1, -amp, amp);
      let y = i * (h / points);
      vertex(x, y);
    };
    vertex(firstPoint.x, firstPoint.y);
  endShape();
  pop();
}

// ** EYES **
// ----------

function drawEye(x, y){
  push();
    translate(x, y);
    fill(matildaBg);
    noStroke();
    
    // Colore palpebra
    ellipse(0, 0, eyeSize, eyeSize * eyeAspect);

    push();
      clip(maskEye);

      // sclera (parte bianca dell'occhio)
      // serve per simulare la palpebra
      fill(255);
      stroke(0);
      circle(0, eyeSize * obj.eyelidY, eyeWhite);

      // pupilla che segue il mouse
      let a = atan2(y - mouseY, x - mouseX);
      let d = dist(x, y, mouseX, mouseY);
      let r = pupilDist * map(d, 0, width, 0, 1, true);

      // clippo la pupilla sotto la palpebra
      push();
        clip(maskEyelid);
        fill(0);
        rotate(a);  
        translate(-r, 0);
        rotate(-a);
        ellipse(0, 0, pupilSize, pupilSize * pupilAspect);
      pop();
    pop();

    // traccia occhio
    noFill();
    stroke(0);
    ellipse(0, 0, eyeSize, eyeSize * eyeAspect);
  pop();
}

function drawEyebrows(matildaX, matildaY){
  let eyebrowsSpace = matildaW * 0.28;
  let eyebrowsDelta = obj.eyebrowsDelta * 0.1;

  push();
    translate(matildaX, matildaY);
    let ebx = matildaAmp * 0.5 * bodyPoints[25].x;
    translate(ebx, -matildaH * 0.37);
    translate(0, eyeSize * obj.eyebrowsY);

    fill(0);
    if (obj.eyebrows == 'Tilde'){
      push();
        translate(-eyebrowsSpace, eyeSize * eyebrowsDelta);
        rotate(PI * 0.5);
        drawTilde(0, 0, eyeSize * 0.4, eyeSize * 0.8, eyeSize * 0.06, 0, 10);
      pop();
      push();
        translate(eyebrowsSpace, eyeSize * -eyebrowsDelta);
        rotate(PI * 0.5);
        drawTilde(0, 0, eyeSize * 0.4, eyeSize * 0.8, eyeSize * 0.06, 0, 10);
      pop();
    }
    if (obj.eyebrows == 'Happy'){
      push();
        strokeCap(SQUARE);
        strokeWeight(eyeSize * 0.35);
        push();
          translate(-eyebrowsSpace, eyeSize * eyebrowsDelta);
          rotate(-PI * 0.05);
          bezier(
            -eyeSize * 0.38, 0, 
            -eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.38, 0
          );
        pop();
        push();
          translate(eyebrowsSpace, eyeSize * -eyebrowsDelta);
          rotate(PI * 0.05);
          bezier(
            -eyeSize * 0.38, 0, 
            -eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.1, -eyeSize * 0.2,
            eyeSize * 0.38, 0
          );
        pop();
      pop();
    }
  pop();
}

function maskEye(){
  ellipse(0, 0, eyeSize, eyeSize * eyeAspect);
}
function maskEyelid(){
  circle(0, eyeSize * obj.eyelidY, eyeWhite);
}

// ** MOUTH **
// -----------

function drawMouth(x, y){
  let debug = false;
  push();
    translate(x, y);
    switch (obj.mouth) {
      case 'Idle':
        drawMouthIdle(debug);
        break;

      case 'Sad':
        drawMouthSad(debug);
        break;

      case 'Bored':
        drawMouthBored(debug);
        break;

      case 'Happy':
        drawMouthHappy();
          break;
      
      case 'Wow':
        drawMouthWow();
          break;
    
      default:
        break;
    }
  pop();
}

function drawMouthIdle(debug){
  let mu = mouthUnit;
  push();
    noFill();
    rotate(-HALF_PI * 0.05);
    
    // bordo nero
    strokeWeight(mu * 1.5 + (strokeW * 2));
    stroke(0);
    mouthIdle();

    // labbra magenta
    strokeWeight(mu * 1.5);
    stroke(palette[1]);
    mouthIdle();

    // linea nera
    strokeWeight(strokeW);
    stroke(0);
    mouthIdle(debug);
  pop();
}

function drawMouthSad(debug){
  let mu = mouthUnit;
  push();
    noFill();
    rotate(HALF_PI * 0.05);
    
    // bordo nero
    strokeWeight(mu * 1.5 + (strokeW * 2));
    stroke(0);
    mouthSad();

    // labbra magenta
    strokeWeight(mu * 1.5);
    stroke(palette[1]);
    mouthSad();

    // linea nera
    strokeWeight(strokeW);
    stroke(0);
    mouthSad(debug);
  pop();
}

function drawMouthBored(debug){
  let mu = mouthUnit;
  push();
    noFill();
    rotate(HALF_PI * 0.15);
    
    // bordo nero
    strokeWeight(mu * 1.5 + (strokeW * 2));
    stroke(0);
    mouthBored();

    // labbra magenta
    strokeWeight(mu * 1.5);
    stroke(palette[1]);
    mouthBored();

    // linea nera
    strokeWeight(strokeW);
    stroke(0);
    mouthBored(debug);
  pop();
}

function drawMouthHappy(){
  let img = mouthImgs[0];
  let scale = 0.6;
  image(img, 0, 0, img.width * scale, img.height * scale);
}

function drawMouthWow(){
  let img = mouthImgs[1];
  let scale = 0.6;
  image(img, 0, 0, img.width * scale, img.height * scale);
}

// ** MOUTH LINES **
// -----------------

function mouthIdle(debug = false){
  let mw = mouthW;
  let mu = mouthUnit;
  let mh = mu * 0.8;

  let p = [
    {
      x: -mw, y: -mh,
    },
    {
      x: -mw * 0.6, y: mh * 0.6,
    },
    {
      x: mw * 0.4, y: mh * 0.6,
    },
    {
      x: mw, y: -mh,
    }
  ];

  bezier(
    p[0].x, p[0].y, 
    p[1].x, p[1].y,
    p[2].x, p[2].y,
    p[3].x, p[3].y,
  );

  if (debug){
    debugPoints(p);
  }
}

function mouthSad(debug = false){
  let mu = mouthUnit;
  let mw = mouthW;
  let mh = mu * 0.8;

  let p = [
    {
      x: -mw, y: mh * 0.3,
    },
    {
      x: -mw * 0.6, y: -mh * 1.3,
    },
    {
      x: mw * 0.4, y: -mh * 1.3,
    },
    {
      x: mw, y: mh * 0.3,
    }
  ];

  bezier(
    p[0].x, p[0].y, 
    p[1].x, p[1].y,
    p[2].x, p[2].y,
    p[3].x, p[3].y,
  );

  if (debug){
    debugPoints(p);
  }
}

function mouthBored(debug = false){
  let mw = mouthW * 0.9;

  let p = [
    {
      x: -mw, y: 0,
    },
    {
      x: mw, y: 0,
    }
  ];

  line(
    p[0].x, p[0].y, 
    p[1].x, p[1].y
  );

  if (debug){
    debugPoints(p);
  }
}

function debugPoints(points){
  push();
    strokeWeight(mouthUnit * 0.3);
    stroke(debugColor);
    points.forEach((item) => {
      if (item.x !== undefined){
        point(item.x, item.y);
      } else {
        strokeWeight(mouthUnit * 0.2);
        stroke('red');
        point(item.ax, item.ay);
        point(item.bx, item.by);
        stroke(debugColor);
        strokeWeight(mouthUnit * 0.3);
        point(item.cx, item.cy);
      }
    });
  pop();
}

/**
 * OLD STUFF
 */

function drawTilde(x, y, w, h, amp, speed, points){
  push();
  translate(x, y + h * 0.5);

  let anim = 0;
  if (speed){
    anim = getAnimation(speed);
  }
  
  beginShape();
  // Curva destra
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points * 0.5, 0, PI);
    // 0.5  > PI
    // 0.25 > 
    angle += PI;
    angle += anim;
    let x = w * 0.5;
    x = x + map(sin(angle), -1, 1, -amp, amp);
    let y = - i * (h / points);
    vertex(x, y);
  }

  // Curva sinistra
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points * 0.5, 0, PI);
    angle -= anim;
    let x = -w * 0.5;
    x = x + map(sin(angle), -1, 1, -amp, amp);
    let y = -h + i * (h / points);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}