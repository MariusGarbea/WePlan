const calcHash = require('./hash');

var blocks = [];

// block structure
class Block {
  constructor(index, eventID, timestamp, data, previousHash, currentHash) {
    this.index = index;
    this.eventID = eventID;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash.toString();
    this.currentHash = currentHash.toString();
  };

  // block generation
  generateNewBlock(data) {
    const previousBlock = blocks[blocks.length-1];
    const index = previousBlock.index + 1;
    const timestamp = new Date().getTime() / 1000;
    const hash = calcHash(index, previousBlock.currentHash, timestamp, data);
    return new Block(index, previousBlock.currentHash, timestamp, data, hash);
  }

  //validate block
  isValid(newBlock, previousBlock) {
    if(previousBlock.index+1 !== newBlock.index ||
      previousBlock.hash !== newBlock.previousHash ||
      calcHash(newBlock.index, previousBlock.currentHash, newBlock.timestamp, newBlock.data) !== newBlock.currentHash) {
        return false;
    }
    return true;
  }
};

blocks.push(new Block(0, 0, new Date(), "Genesis!", "0", 'eb764c822ff5f90147e3aeb91d8fb79ffd064a6647b400a6639ae8b1652e7713'));

module.exports = {blocks};
