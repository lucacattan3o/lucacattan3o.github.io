
let ml5Model, ml5Video;
let ml5Poses, ml5cCnnections;
let ml5Hands = [];
let ml5CamWidth, ml5CamHeight;
let ml5CamZoom, ml5CamWider;
let vidAspectRatio;
let canvasAspectRatio;

// function ml5SetCamSizes(w, h){
//   ml5CamWidth = w;
//   ml5CamHeight = h;
// }

function ml5Preload(){
  ml5Model = ml5.handPose({
    flipped: true,
    maxHands: 3,
  });
}

function ml5Capture(){
  ml5Video = createCapture(VIDEO, {flipped: true}, () => {
      ml5setCameraDimensions(ml5Video);
    }
  );
  ml5Video.hide();
  ml5Model.detectStart(ml5Video, ml5GotPoses);
}

function ml5setCameraDimensions(ml5Video) {
  console.debug('Original camera dimension');
  console.debug('Width', ml5Video.width);
  console.debug('Height', ml5Video.height);

  // aspect ratio of the ml5Video
  vidAspectRatio = ml5Video.width / ml5Video.height; 
  // aspect ratio of the canvas
  canvasAspectRatio = width / height; 

  if (vidAspectRatio > canvasAspectRatio) {
    // Image is wider than canvas aspect ratio
    console.debug('Image is wider than canvas aspect ratio');
    ml5CamHeight = height;
    ml5CamWidth = ml5CamHeight * vidAspectRatio;
    ml5CamWider = true;
  } else {
    // Image is taller than canvas aspect ratio
    console.debug('Image is taller than canvas aspect ratio');
    ml5CamWidth = width;
    ml5CamHeight = ml5CamWidth / vidAspectRatio;
    ml5CamWider = false;
  }

  // full screen size
  console.debug('Fullscreen Size');
  console.debug('Width', ml5CamWidth);
  console.debug('Height', ml5CamHeight);

  ml5CamZoom = ml5CamWidth / ml5Video.width;
  console.debug('Zoom', ml5CamZoom);

  // ml5CamWidth = ml5Video.scaledWidth;
  // ml5CamHeight = ml5Video.scaledHeight;
}

function ml5Stop(){
  if (ml5Model){
    ml5Model.detectStop();
  }
}

function ml5GotPoses(results){
  ml5Poses = results;
}

function ml5TranslateToCenter(){
  if (ml5CamWider){
    let offsetX = (width - ml5CamWidth) / 2;
    translate(offsetX, 0);
  } else {
    let offsetY = (height - ml5CamHeight) / 2;
    translate(0, offsetY);
  }
}

function ml5DrawCam(){
  if (ml5Video){
    image(ml5Video, 0, 0, ml5CamWidth, ml5CamHeight);
  }
}

function ml5CamMask(){
  rect(0, 0, ml5CamWidth, ml5CamHeight);
}

function ml5DrawKeypoints(){
  if (!ml5Poses){
    return;
  }
  if (ml5Poses.length == 0){
    return;
  }

  push();
    ml5Poses.forEach(pose => {
      if (pose.confidence > 0.5){
        pose.keypoints.forEach(point => {
          noStroke();
          fill(palette[2]);
          circle(point.x * ml5CamZoom, point.y * ml5CamZoom, 10);
        })
      }
    });
  pop();
}

function ml5DrawHands(){
  if (!ml5Poses){
    return;
  }
  if (ml5Poses.length == 0){
    return;
  }

  ml5Poses.forEach((pose, p) => {
    if (ml5Hands[p] == undefined){
      let hand = new ml5Hand(pose);
      ml5Hands.push(hand)
    } else {
      ml5Hands[p].update(pose);
    }

    if (obj.showHands){
      ml5Hands[p].draw();
    }
  });
}

function ml5GetHand(handedness){
  if (!ml5Hands){
    return;
  }
  if (ml5Hands.length == 0){
    return;
  }

  let hands = ml5Hands.filter((hand) => {
    if (hand.pose.handedness == handedness && hand.isValidHand()){
      return true;
    }
    return false;
  });

  if (hands.length > 0){
    return hands[0];
  }
  return null;
}

function mousePressed(){
  // console.debug(ml5Poses[0]);
  if (ml5Hands){
    // console.debug(ml5Hands[0].vals.angle);
  }
}

class ml5Hand{
  
  pose = null;
  fRadius = ml5CamWidth * 0.05;
  fingers = [
    'thumb_tip',
    'index_finger_tip',
    'pinky_finger_tip',
  ];
  fPoints = [];
  
  // hand position (center) 
  pos = {
    x: 0,
    y: 0,
  };

  radius = 0;
  maxRadius = ml5CamWidth * 0.2;
  minRadius = this.maxRadius * 0.3;
  strokeWeight = ml5CamWidth * 0.00125;

  minConfidence = 0.8;

  vals = {
    x: 0,
    y: 0,
    amp: 0,
    angle: 0,
  }
  
  constructor(pose){
    this.pose = pose;
    this.fingers.forEach(name => {
      this.fPoints.push({x: 0, y: 0});
    });
  }

  update(pose){
    this.pose = pose;

    this.fingers.forEach((name, k) => {
      this.fPoints[k].x = this.pose[name].x * ml5CamZoom;
      this.fPoints[k].y = this.pose[name].y * ml5CamZoom;
    });

    this.setCircumcenter();
    this.setValues();
  }

  setCircumcenter(){
    let ps = this.fPoints;
    var m1 = (ps[1].y - ps[0].y) / (ps[1].x - ps[0].x);
    var m2 = (ps[2].y - ps[1].y) / (ps[2].x - ps[1].x);
    this.pos.x = (m1 * m2 * (ps[0].y - ps[2].y) + m2 * (ps[0].x + ps[1].x) - m1 * (ps[1].x + ps[2].x)) / (2 * (m2 - m1));
    this.pos.y = -1 * 1 / m1 * (this.pos.x - ((ps[0].x + ps[1].x) / 2)) + ((ps[0].y + ps[1].y) / 2);
    this.radius = dist(ps[0].x, ps[0].y, this.pos.x, this.pos.y);
    // todo: check if the center is inside the circle
    if (this.radius > this.maxRadius){
      this.radius = this.maxRadius;
    }
    if (this.radius < this.minRadius){
      this.radius = this.minRadius;
    }
  }

  setValues(){
    this.vals.x = map(this.pos.x, 0, ml5CamWidth, 0, 1, true);
    this.vals.y = map(this.pos.y, 0, ml5CamHeight, 0, 1, true);
    this.vals.amp = map(this.radius, this.minRadius, this.maxRadius, 0, 1, true);

    let ps = this.fPoints;
    this.vals.angle = Math.atan2(ps[1].y - this.pos.y, ps[1].x - this.pos.x) * 180 / Math.PI;
  }

  isValidHand(){
    if (!this.pose){
      return false;
    }

    if (this.pose.confidence > this.minConfidence){
      return true;
    }

    return false;
  }

  draw(){
    if (!this.pose){
      return;
    }

    if (this.isValidHand){
      push();
        noFill();
        stroke(255);
        strokeWeight(this.strokeWeight);
        this.drawfPoints();
        this.drawMainCircle();
        this.drawLines();
        this.drawData();
      pop();
    }
  }

  drawfPoints(){
    this.fPoints.forEach(point => {
      line(
        point.x - this.fRadius * 0.6,
        point.y,
        point.x + this.fRadius * 0.6,
        point.y,
      );
      line(
        point.x,
        point.y - this.fRadius * 0.6,
        point.x,
        point.y + this.fRadius * 0.6,
      );
      circle(
        point.x,
        point.y,
        this.fRadius
      );
    });
  }

  drawMainCircle(){
    circle(this.pos.x, this.pos.y, this.radius * 2);
    push();
    fill(255);
    circle(this.pos.x, this.pos.y, this.fRadius * 0.1);
    pop();
  }

  drawLines(){
    this.fPoints.forEach(point => {
      line(point.x, point.y, this.pos.x, this.pos.y);
    });
  }

  drawData(){
    push();
      let size = this.fRadius * 0.25;
      let x = this.formatNumber(this.pos.x);
      let y = this.formatNumber(this.pos.y);
      let r = this.formatNumber(this.radius);
      let a = - this.formatNumber(this.vals.angle);

      textSize(size);
      textFont('Monospace');
      textAlign(LEFT, CENTER);
      noStroke();
      fill(255);

      translate(this.pos.x, this.pos.y);
      text('x: ' + x, size, 0 - size);
      text('y: ' + y, size, 0);
      text('r: ' + r, size, 0 + size);
      text('a: ' + a, size, 0 + size * 2);
    pop();
  }

  formatNumber(val){
    return (Math.round(val * 100) / 100).toFixed(2);
  }

  inCircle(ax, ay, bx, by, cx, cy, dx, dy) {
    let ax_ = ax-dx;
    let ay_ = ay-dy;
    let bx_ = bx-dx;
    let by_ = by-dy;
    let cx_ = cx-dx;
    let cy_ = cy-dy;
    return (
        (ax_*ax_ + ay_*ay_) * (bx_*cy_-cx_*by_) -
        (bx_*bx_ + by_*by_) * (ax_*cy_-cx_*ay_) +
        (cx_*cx_ + cy_*cy_) * (ax_*by_-bx_*ay_)
    ) > 0;
  }
}