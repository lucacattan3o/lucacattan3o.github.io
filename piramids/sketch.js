const colors = [
  '#495ED6', // Blue
  '#F94E50', // Red
  '#FFC700', // Yellow
];

let count = 8;
let offset = 0.1;
let times = 12;

let items = [];
let record = false;
let itemSize = 0;

function setup() {
  createCanvas(1080, 1080);
  responsiveSketch();
  frameRate(30);

  itemSize = width / count;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      items.push(new Item());
    }
  }
}

function draw() {
  if (record && frameCount == 1){
    capturer.start();
  }

  rectMode(CENTER);
  strokeJoin(ROUND);
  background(255);

  let index = 0;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      let x = itemSize * i;
      let y = itemSize * j;
      
      // Go to the center of the item
      x = x + itemSize * 0.5;
      y = y + itemSize * 0.5;
      push();
        translate(x, y);
        items[index].draw();
      pop();

      index++;
    }
  }
  

  if (record && frameCount == 60 * 8){
    noLoop();
    if (record){
      capturer.save();
      capturer.stop();
    }
  }

  if (record){
    capturer.capture(canvas);
  }
}

function angleOffset(index, tot){
  return ((PI / (tot - 1)) * (index));
};

class Item{
  constructor(){
    // this.times = times;
    this.times = Math.floor(times * random(0.2, 1));

    this.dirX = -1;
    this.dirY = -1;
    
    // if (random() > 0.5){
    //   this.dirX = 1;
    // }
    // if (random() > 0.5){
    //   this.dirY = 1;
    // };
  }

  draw(){
    this.tmpSize = itemSize - (itemSize * 0.05);
    
    fill(255);
    stroke(0);
    strokeWeight(itemSize * 0.02);
    let i = 1;
    for (let i = 0; i < this.times; i++) {
      if (this.tmpSize > itemSize * 0.02){
        push();
        let val = (itemSize * offset) * i * 0.125;
        translate(this.dirX * val, this.dirY * val);
        rect(0, 0, this.tmpSize, this.tmpSize);
        pop();
      }
      this.tmpSize = this.tmpSize - (offset * itemSize);
      // this.tmpSize = this.tmpSize - (itemSize / (this.times - 2));
    }
  }
}


