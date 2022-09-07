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

  for (let z = 0; z < (items * items); z++){
    inverses.push(false);
  }
}

function draw() {
  recordSketchPre();

  let sec = frameCount / fps * 0.25;

  const padding = width * 0.25 / items;
  const paddingTot = padding * (items + 1);
  const itemSize = (width - paddingTot) / items;
  rectMode(CENTER);
  background(255, 255, 255);
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

        let offset = 0;
        // Concentric offset
        // let d = Math.abs(dist(x, y, width * 0.5, height * 0.5));
        // offset = map(d, 0, width * 0.25, 0, 1, true);

        // Get a progressive 0 to 1 loop from sec
        let t = sec % 1;

        // Split animation in 4 pieces
        if (t >= 0 && t < 0.5){
          // Anim. A
          // Linear 0 - 1;
          tSec = t * 2;
          // console.debug(tSec);
          // Bounce 0 - 1 - 0
          tBounce = (cos(tSec * TWO_PI) + 1) * 0.5;
          // console.debug(tBounce);
          
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
          } else {
            // Right Black Anim
            push();
              rotate(-PI);
              scale(1, tBounce);
              arc(0, 0, itemSize, itemSize, 0, -PI);
            pop();
          } 

          // Visual fix
          // arc(0, 0, itemSize, itemSize * 0.025, 0, 2 * PI);
        } else {
          // Anim. A
          // Linear 0 - 1;
          tSec = (t - 0.5) * 2;

          // Bounce 0 - 1 - 0
          tBounce = (cos(tSec * TWO_PI) + 1) * 0.5;

          // Black
          push();
            rotate(-PI);
            fill(0);
            arc(0, 0, itemSize, itemSize, 0, PI);
          pop();
          
          if (t <= 0.75){
            // Black Anim
            fill(0);
            push();
              scale(1, tBounce);
              arc(0, 0, itemSize, itemSize, 0, -PI);
            pop();
          } else {
            // Right White Anim
            push();
              fill(255);
              rotate(-PI);
              scale(1, tBounce);
              arc(0, 0, itemSize, itemSize, 0, -PI);
            pop();  
          }

        }
        // if (t >= 0.25 && t < 0.5){
        //   // Anim. B
        //   tSec = (t - 0.25) * 4;
        //   // Bounce 0 - 1
        //   tBounce = 1 - (cos(tSec * PI) + 1) * 0.5;
        //   
        //   // Black
        //   fill(0);
        //   arc(0, 0, itemSize, itemSize, 0, PI);
// 
        //   // Right Black Anim
        //   push();
        //     scale(1, tBounce);
        //     rotate(-PI);
        //     arc(0, 0, itemSize, itemSize, 0, -PI);
        //   pop();
// 
        // }
        if (t >= 0.5 && t < 0.75){
          // Anim. C
        }
        if (t >= 0.75 && t < 1){
          // Anim. D
        }

        
      
      pop();



      // - t * 4 = progressivo 0 - 1 che si può passare dentro seno e coseno
      // l'offset si può fare a monte su t

      offset = map(i, 0, items, 0, 1);
      let b = bounce(sec, 0.5, 0);

      push();
        translate(x, y);
        rotate(0.5 * PI);

        let dir = true;
        if (b < 0){
          dir = false;
        }

        // Not easy, but working
        if (!inverses[z] && b == -1){
          inverses[z] = true;
        }
        if (inverses[z] && b == 1){
          inverses[z] = false;
        }
        if (inverses[z]){
          rotate(-PI);
        }

        // fill(0);
        // if (!dir){
        //   arc(0, 0, itemSize, itemSize, 0, PI);
        //   push();
        //     scale(1, b);
        //     arc(0, 0, itemSize, itemSize, 0, -PI);
        //   pop();
        // } else {
        //   fill(0);
        //   arc(0, 0, itemSize, itemSize, 0, PI);
        //   fill(255);
        //   push();
        //     scale(1, b);
        //     arc(0, 0, itemSize, itemSize, 0, -PI);
        //   pop();
        // }
        // Visual fix
        // arc(0, 0, itemSize, itemSize * 0.025, 0, 2 * PI);

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

