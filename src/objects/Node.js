export default class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isWall = false;
    this.isVisited = false;
    this.distance = Infinity;
    this.previous = null;
  }
}
