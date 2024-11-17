
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

function mousePressed(){
  console.debug(ml5Poses);
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
  
  center = null;
  radius = 0;
  
  constructor(pose){
    this.pose = pose;

    this.fingers.forEach(name => {
      this.fPoints.push({
        x: 0,
        y: 0
      })
    });

    this.center = {
      x: 0,
      y: 0
    };
  }

  update(pose){
    this.pose = pose;

    this.fingers.forEach((name, k) => {
      this.fPoints[k].x = this.pose[name].x;
      this.fPoints[k].y = this.pose[name].y;
    });

    this.setCircumcenter();
  }

  setCircumcenter(){
    let ps = this.fPoints;
    var m1 = (ps[1].y - ps[0].y) / (ps[1].x - ps[0].x);
    var m2 = (ps[2].y - ps[1].y) / (ps[2].x - ps[1].x);
    this.center.x = (m1 * m2 * (ps[0].y - ps[2].y) + m2 * (ps[0].x + ps[1].x) - m1 * (ps[1].x + ps[2].x)) / (2 * (m2 - m1));
    this.center.y = -1 * 1 / m1 * (this.center.x - ((ps[0].x + ps[1].x) / 2)) + ((ps[0].y + ps[1].y) / 2);
    this.radius = dist(ps[0].x, ps[0].y, this.center.x, this.center.y);
  }

  draw(){
    if (!this.pose){
      return;
    }

    push();
      noFill();
      stroke(255);
      this.drawfPoints();
      this.drawMainCircle();
      this.drawLines();
    pop();
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
    circle(this.center.x, this.center.y, this.radius * 2);
    push();
    fill(255);
    circle(this.center.x, this.center.y, this.fRadius * 0.1);
    pop();
  }

  drawLines(){
    this.fPoints.forEach(point => {
      line(point.x, point.y, this.center.x, this.center.y);
    });
  }
}