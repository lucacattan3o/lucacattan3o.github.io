/**
 * @author Luca Cattaneo <luca.cattaneo@mekit.it>
 * @version 1.0.0
 * @license MIT
 */

let smFps = 60;

/**
 * Sets the custom frame rate for your sketch.
 *
 * If you've modified the default frame rate (60) in your sketch, 
 * call this function **inside** the `setup()` function to ensure 
 * the correct frame rate is applied.
 * 
 * @param {Number} fps - The desired frame rate.
 * 
 * **Example:**
 * ```javascript
 * function setup() {
 *   createCanvas(400, 400);
 *   frameRate(30);
 *   smFrameRate(30);
 * }
 * ```
 */
function smFrameRate(fps){
  smFps = fps;
}

/**
 * Get linear loop (0 to 1)
 * @param {Number} velocity
 * @param {Number} delay: 0-1
 */
function getLoop(vel = 1, delay = 0) {
  let anim = getAnimation(vel, delay);
  return anim % 1;
}

/**
 * Get sinusoidal loop (1 to -1)
 * @param {Number} velocity
 * @param {Number} delay: 0-1
 */
function getLoopBounce(vel = 1, delay = 0) {
  let anim = getAnimation(vel, delay);
  return sin(anim * TWO_PI);
}

/**
 * Get linear loop (-1 to 1)
 * todo: start from 0?
 * @param {Number} velocity
 * @param {Number} delay: 0-1
 */
function getLoopBounceLinear(vel = 1, delay = 0) {
  let anim = getLoop(vel, delay);
  let t = 0;
  if (anim < 0.5) {
    t = anim * 2;
  } else {
    t = 2 - anim * 2;
  }
  t = (t * 2) - 1;
  return t * -1;
}

/**
 * Get animation in seconds
 * @param {Number} velocity
 * @param {Number} delay: 0-1
 */
function getAnimation(vel = 1, delay = 0) {
  delay = delay % 1;
  let sec = (frameCount + (delay * smFps) / vel) / smFps;
  return sec * vel;
}
