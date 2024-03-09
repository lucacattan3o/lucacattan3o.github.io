class Walker{

  constructor(nItemsW, nItemsH){
    this.nItemsW = nItemsW;
    this.nItemsH = nItemsH;
    this.items = [];

    this.startDirs = [
      'sx', 'up', 'dx', 'dw'
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
      this.cDir = 'sx';
      this.cIndex = this.getIndex(this.cI, this.cJ);
      this.items[this.cIndex].setDirection(this.cDir);
      this.items[this.cIndex].start();
      // console.debug(this.cI, this.cJ);
      // console.debug(this.cIndex);
    } else {
      console.debug('Finish!');
    }
  }

  next(){

    let tmpDir = this.cDir;
    switch (this.cDir) {
      case 'sx-to-up':
        tmpDir = 'up';
        break;
      case 'sx-to-dw':
        tmpDir = 'dw';
        break;
    }
    this.cDir = tmpDir;
    let next = this.getNextIndex(this.cI, this.cJ, this.cDir); 
    if (this.items[next] !== undefined){
      // if next is already occupied
      if (this.items[next].end){
        // this.startWalker();
      } else {
        this.cI = this.items[next].i;
        this.cJ = this.items[next].j;
        this.cDir = this.changeDirection();
        this.items[next].setDirection(this.cDir);
        this.items[next].start();
      }
    }
  }

  changeDirection(){
    let dir = this.cDir;
    if (random() > 0.7){
      switch (dir) {
        case 'sx': // sx
          if (random() > 0.5){
            dir = 'sx-to-up';
          } else {
            dir = 'sx-to-dw';
          }
          dir = 'sx-to-dw';
          console.debug(dir);
          break;
      
        default:
          break;
      }
    }
    return dir;
  }

  getIndex(i, j){
    return (j * this.nItemsW) + i;
  }

  getNextIndex(i, j, dir){
    let nextI = i;
    let nextJ = j;

    switch (dir) {
      case 'up':
        if (j >= 1){
          nextJ = j - 1;
        } else {
          nextJ = this.nItemsH - 1;
        }
        break;
      case 'dw':
        if (j <= this.nItemsH - 2){
          nextJ = j + 1;
        } else {
          nextJ = 0;
        }
        break;
      case 'sx':
        if (i >= 1){
          nextI = i - 1;
        } else {
          nextI = this.nItemsW - 1;
        }
        break;
      case 'dx':
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