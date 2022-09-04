let items = 10;
let sec = 0;
let fps = 30;
let inverse = false;
let inverses = [];
recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
}

function draw() {
  recordSketchPre();

  let sec = frameCount / fps;

  const padding = width * 0.25 / items;
  const paddingTot = padding * (items + 1);
  const itemSize = (width - paddingTot) / items;
  rectMode(CENTER);
  background(255, 255, 255);
  noStroke();

  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = (itemSize + padding) * i + padding;
      let y = (itemSize + padding) * j + padding;

      let offset = map(i, 0, items * 2, 0, 1);
      let b = bounce(sec, 0.25, offset);
      
      // Go to the center of the item
      x = x + itemSize * 0.5;
      y = y + itemSize * 0.5;

      push();
        translate(x, y);
        rotate(0.5 * PI);

        let dir = true;
        if (b < 0){
          dir = false;
        }

        if (!inverse && b == -1){
          inverse = true;
        }
        if (inverse && b == 1){
          inverse = false;
        }
        if (inverse){
          rotate(-PI);
        }

        fill(0);
        if (!dir){
          arc(0, 0, itemSize, itemSize, 0, PI);
          push();
            scale(1, b);
            arc(0, 0, itemSize, itemSize, 0, -PI);
          pop();
        } else {
          fill(0);
          arc(0, 0, itemSize, itemSize, 0, PI);
          fill(255);
          push();
            scale(1, b);
            arc(0, 0, itemSize, itemSize, 0, -PI);
          pop();
        }

        // fill(255, 0, 0);
        // arc(0, 0, itemSize, itemSize, 0, -PI);
        // if (b < 0){ 
        //   scale(1, b);
        // }
        // arc(0, 0, itemSize, itemSize, 0, PI);
      pop();
    }
  }

  recordSketchPost(12);
}

/**
 * Offset should be beetween 0 and 1
 */
 function bounce(sec, speed = 1, offset = 0){
  let s = sec;
  if (offset){
    s = s + (offset / speed);
  }
  return cos(s * speed * TWO_PI);
}

