let items = 16;
let sec = 0;
let fps = 30;

recordSketch(false);

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(fps);
}

function draw() {
  recordSketchPre();

  let speed = 0.5;
  let sec = frameCount / fps * speed;

  const padding = width * 0.125 / items;
  const paddingTot = padding * (items + 1);
  const itemSize = (width - paddingTot) / items;
  
  background(255);
  noStroke();

  let z = 0;
  for (let i = 0; i < items; i++) {
    for (let j = 0; j < items; j++) {
      let x = (itemSize + padding) * i + padding;
      let y = (itemSize + padding) * j + padding;

      // Go to the center of the item
      x = x + itemSize * 0.5;
      y = y + itemSize * 0.5;
      
      push();
        translate(x, y);
        rotate(0.5 * PI);

        let secOffset = 0;
        // 0 - 1 offset
        secOffset = (i / (items * 2 - 1));
        // Concentric offset
        let d = Math.abs(dist(x, y, width, 0));
        // secOffset = map(d, 0, width, 0, 1, true);
        
        // Linear 0 to 1
        let t = (sec + secOffset) % 1;

        // Bounce 1 - -1
        let tBounce = cos(t * TWO_PI);
        // console.debug(tBounce);

        animateItem(t, tBounce, itemSize);
        
      pop();
    }
  }

  // noLoop();

  recordSketchPost(12);
}

function animateItem(t, tBounce, itemSize){
  
  // Split animation in 4 pieces
  if (t >= 0 && t < 0.5){
    // Anim. A
    
    // Black
    fill(0);
    arc(0, 0, itemSize, itemSize, 0, PI);
    
    if (t <= 0.25){
      // White Anim 
      fill(255);
      push();
        scale(1, tBounce);
        arc(0, 0, itemSize, itemSize, 0, -PI);
      pop();
      // Visual fix
      fill(255);
      arc(0, 0, itemSize, itemSize * 0.025, 0, 2 * PI);
    } else {
      // Right Black Anim
      push();
        rotate(-PI);
        scale(1, - tBounce);
        arc(0, 0, itemSize, itemSize, 0, -PI);
      pop();
      // Visual fix
      fill(0);
      arc(0, 0, itemSize, itemSize * 0.025, 0, 2 * PI);
    } 
  } else {
    // Anim. B
    push();
      rotate(PI);
      fill(0);
      arc(0, 0, itemSize, itemSize, 0, PI);
    pop();
    
    if (t <= 0.75){
      // Black Anim (left)
      fill(0);
      push();
        rotate(PI);
        scale(1, tBounce);
        arc(0, 0, itemSize, itemSize, 0, -PI);
      pop();
      // Visual fix
      fill(0);
      arc(0, 0, itemSize, itemSize * 0.025, 0, 2 * PI);
    } else {
      // Right White Anim
      push();
        fill(255);
        rotate(-PI);
        scale(1, tBounce);
        arc(0, 0, itemSize, itemSize, 0, -PI);
      pop();
      // Visual fix
      fill(255);
      arc(0, 0, itemSize, itemSize * 0.025, 0, 2 * PI);
    }
  }
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

