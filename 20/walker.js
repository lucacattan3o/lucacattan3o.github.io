class Walker{

  constructor(nItemsW, nItemsH){
    this.nItemsW = nItemsW;
    this.nItemsH = nItemsH;
    this.items = [];
    
    this.directions =  [
      '1', '2', '3',
      '4',      '6',
      '7', '8', '9'
    ];

    this.startDirs = [
      '2', '4', '6', '8'
    ];

    for (let i = 0; i < this.nItemsW; i++) {
      for (let j = 0; j < this.nItemsH; j++) {
        let item = new Item(i, j);
        // item.start();
        this.items.push(item);
      }
    }

    // Starting point
    let startI = floor(random(nItemsW));
    let startJ = floor(random(nItemsH));
    let startDir = random(this.startDirs);

    // Current
    this.cIndex = this.getIndexFromCoord(startI, startJ);
    this.items[this.cIndex].setDirection(startDir);
    this.items[this.cIndex].start();
  }

  getIndexFromCoord(i, j){
    return i * this.nItemsH + j;
  }

  draw(){
    background(0);
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
      this.items[i].draw();
    }
  }
}