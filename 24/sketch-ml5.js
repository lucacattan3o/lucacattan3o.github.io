
let ml5Model, ml5Video;
let ml5Poses, ml5cCnnections;

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

function mousePressed(){
  console.debug(ml5Poses);
}