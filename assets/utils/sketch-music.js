/**
 * Get 0-1 loop based on music duration
 * @param {Object} preloaded music
 */
function getMusicLoop(music){
  return map(music.currentTime(), 0, music.duration(), 0, 1);
}

/**
 * Get the music energy based on the spectrum
 * Important: 
 * - use spec = fft.analyze(); inside draw()
 * @freq: 0, 15
 */
function getMusicEnergy(freq = null){
  if (freq !== null && spec[freq] !== undefined){
    let en = spec[freq];
    return map(en, 0, 255, 0, 1);
  }
  return amp.getLevel();
}

/**
 * Diplay animated bars based on frequencies
 */
function drawBars(){
  push();
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    let barsize = width / 16;
    translate(barsize * 0.5, 0);
    for (i = 0; i < spec.length; i++) {
      let a = getMusicEnergy(i);
      let x = barsize * i;
      let y = width * 0.5;
      let h = (width * 0.05) + (width * 0.8 * a);
      
      fill(255);
      noStroke();
      rect(x, y, barsize * 0.8, h);
      fill(0);
      textFont('Arial', 20);
      text(i, x, y);
    }
  pop();
}