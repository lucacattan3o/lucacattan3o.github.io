class Walker{

  constructor(nItemsW, nItemsH){
    this.nItemsW = nItemsW;
    this.nItemsH = nItemsH;
    this.startI = null;
    this.startJ = null;
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
        item.start();
        this.items.push(item);
      }
    }
  }

  draw(){
    background(0);
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
      this.items[i].draw();
    }
  }
}