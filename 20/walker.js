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

    let index = 0;
    for (let j = 0; j < this.nItemsH; j++) {
      for (let i = 0; i < this.nItemsW; i++) {
        let item = new Item(i, j, index);
        index++;
        this.items.push(item);
      }
    }

    this.startWalker();
  }

  startWalker(){
    let nextFree = this.items.filter((item) => {
      return !item.end;
    })
    if (nextFree.length > 0){
      let item = random(nextFree);
      this.cI = item.i;
      this.cJ = item.j;
      this.cDir = random(this.startDirs);
      this.cIndex = this.getIndex(this.cI, this.cJ);
      this.items[this.cIndex].setDirection(this.cDir);
      this.items[this.cIndex].start();
      console.debug(this.cI, this.cJ);
      console.debug(this.cIndex);
    } else {
      console.debug('Finish!');
    }
  }

  next(){
    let next = this.getNextIndex(this.cI, this.cJ, this.cDir); 
    if (this.items[next] !== undefined){
      // console.debug(next);  
      if (!this.items[next].end){
        this.cI = this.items[next].i;
        this.cJ = this.items[next].j;
        this.items[next].setDirection(this.cDir);
        this.items[next].start();
      } else {
        this.startWalker();
      }
    }
  }

  getIndex(i, j){
    return (j * this.nItemsW) + i;
  }

  getNextIndex(i, j, dir){
    let nextI = i;
    let nextJ = j;
    switch (dir) {
      // down
      case '2':
        if (j >= 1){
          nextJ = j - 1;
        } else {
          nextJ = this.nItemsH - 1;
        }
        break;
      // up
      case '8':
        if (j <= this.nItemsH - 2){
          nextJ = j + 1;
        } else {
          nextJ = 0;
        }
        break;
      // sx
      case '4':
        if (i >= 1){
          nextI = i - 1;
        } else {
          nextI = this.nItemsW - 1;
        }
        break;
      // dx
      case '6':
        if (i <= this.nItemsW - 2){
          nextI = i + 1;
        } else {
          nextI = 0;
        }
        break;
    
      default:
        break;
    }
    // console.debug(nextI, nextJ);
    return this.getIndex(nextI, nextJ);
  }

  draw(){
    background(0);
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
      this.items[i].draw();
    }
  }
}