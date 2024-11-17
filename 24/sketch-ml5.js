
let ml5Model, ml5Video;
let ml5Poses, ml5cCnnections;
let ml5Hands = [];

function ml5Preload(){
  ml5Model = ml5.handPose({
    flipped: true,
    maxHands: 3,
  });
}

function ml5Capture(){
  ml5Video = createCapture(VIDEO, {flipped: true});
  ml5Video.size(width, height);
  ml5Video.hide();

  ml5Model.detectStart(ml5Video, ml5GotPoses);
  // ml5Connections = ml5Model.getSkeleton();
}

function ml5Stop(){
  ml5Model.detectStop();
}

function ml5GotPoses(results){
  ml5Poses = results;
}

function ml5DrawCam(){
  image(ml5Video, 0, 0, width, height);
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
        circle(point.x, point.y, 10);
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
    ml5Hands[p].draw();
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
  console.debug(ml5Poses[0]);
  console.debug(ml5Hands[0].vals);
}

class ml5Hand{
  
  pose = null;
  fRadius = w * 0.1;
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
  maxRadius = w * 0.2;
  minRadius = this.maxRadius * 0.3;
  strokeWeight = w * 0.0025;

  minConfidence = 0.8;

  vals = {
    x: 0,
    y: 0,
    amp: 0,
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
      this.fPoints[k].x = this.pose[name].x;
      this.fPoints[k].y = this.pose[name].y;
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
    this.vals.x = map(this.pos.x, 0, width, 0, 1, true);
    this.vals.y = map(this.pos.y, 0, height, 0, 1, true);
    this.vals.amp = map(this.radius, this.minRadius, this.maxRadius, 0, 1, true);
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
      let size = this.fRadius * 0.12;
      let x = this.formatNumber(this.pos.x);
      let y = this.formatNumber(this.pos.y);
      let r = this.formatNumber(this.radius);

      textSize(size);
      textAlign(LEFT, CENTER);
      noStroke();
      fill(255);

      translate(this.pos.x, this.pos.y);
      text('x: ' + x, size, 0 - size);
      text('y: ' + y, size, 0);
      text('r: ' + r, size, 0 + size);
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