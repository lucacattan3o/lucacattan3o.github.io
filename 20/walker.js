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

      if (item.end){
        return false;
      }

      if (!obj.fill){
        // controllo sx, dx, up, dw
        let i = item.i;
        let j = item.j;
  
        let nears = [
          { ni: -1, nj: 0},
          { ni: 1,  nj: 0},
          { ni: 0,  nj: -1},
          { ni: 0,  nj: 1},
        ];
        
        let occupied = 0;
        nears.forEach((near) => {
          let ni = i + near.ni;
          let nj = j + near.nj;
          let index = this.getIndex(ni, nj);
          if (this.items[index] !== undefined && this.items[index].end){
            occupied++;
          }
        });
        if (occupied >= 4){
          return false;
        }
      }

      return true;
    })
    let end = false;
    if (nextFree.length > 0){
      let item = random(nextFree);
      this.cI = item.i;
      this.cJ = item.j;

      let valDir = this.getValidStartRandomDirection(this.cI, this.cJ);
      if (valDir){
        this.cDir = valDir;
      } else {
        this.cDir = random(this.startDirs);
      }
      this.cIndex = this.getIndex(this.cI, this.cJ);
      this.items[this.cIndex].setDirection(this.cDir);
      this.items[this.cIndex].start();

      // qui è da sistemare
      // se non trova una direzione valida si ferma..
      // this.cDir = this.getValidStartRandomDirection(this.cI, this.cJ);
      // if (this.cDir){
      //   this.cIndex = this.getIndex(this.cI, this.cJ);
      //   this.items[this.cIndex].setDirection(this.cDir);
      //   this.items[this.cIndex].start();
      // } else {
      //   // end = true;
      // }
    } else {
      end = true;
    }
    if (end){
      walkerEnd = true;
      console.debug('Finish!');
    }
  }

  getValidStartRandomDirection(i, j){
    let dirs = shuffle(this.startDirs);
    let validDir = null;
    for (let d = 0; d < dirs.length; d++) {
      let dir = dirs[d];
      let index = this.getNextIndex(i, j, dir);
      if (!this.items[index].end){
        validDir = dir; 
        break;
      }
    }
    return validDir;
  }

  // getValidRandomDirection(i, j, dir){
  //   let nn = this.getNextIndex(i, j, dir);
  //   if (this.items[nn].end){
  //     return dir;
  //   }
  // }

  next(){
    if (this.cDir.substring(2, 6) == '-to-'){
      this.cDir = this.cDir.substring(6, 8);
    }
    let next = this.getNextIndex(this.cI, this.cJ, this.cDir); 
    if (this.items[next] !== undefined){
      // if next is already occupied
      if (this.items[next].end){
        this.startWalker();
      } else {
        this.cI = this.items[next].i;
        this.cJ = this.items[next].j;

        // let origDir = this.cDir;
        this.cDir = this.changeDirection();
        
        // la nuova direzione è valida o ce ne sarebbe una migliore?
        // controllo il prossimo
        // let nn = this.getNextIndex(this.cI, this.cJ, newDir);
        // if (this.items[nn].end){
        //   console.debug('Non valida');
        //   let valid = this.getValidRandomDirection(this.cI, this.cJ, origDir);
        //   if (valid){
        //     this.cDir = valid;
        //   }
        // }
        this.items[next].setDirection(this.cDir);
        this.items[next].start();
      }
    }
  }

  changeDirection(){
    let dir = this.cDir;
    if (random() > obj.changeDirFreq){
      return dir;
    }
    switch (dir) {
      case 'sx':
        if (random() > 0.5){
          dir = 'sx-to-up';
        } else {
          dir = 'sx-to-dw';
        }
        break;
      case 'dx':
        if (random() > 0.5){
        } else {
          dir = 'dx-to-dw';
        }
        dir = 'dx-to-up';
        break;
      case 'up':
        if (random() > 0.5){
          dir = 'up-to-sx';
        } else {
          dir = 'up-to-dx';
        }
        break;
      case 'dw':
        if (random() > 0.5){
          dir = 'dw-to-sx';
        } else {
          dir = 'dw-to-dx';
        }
        break;
    
      default:
        break;
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
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
      this.items[i].draw();
    }
  }
}