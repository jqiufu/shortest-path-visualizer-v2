import Node from './Node';

const createGrid = (numRows, numCols) => {
  const grid = [];

  for (let row = 0; row < numRows; row++) {
    const currRow = [];

    for (let col = 0; col < numCols; col++) {
      currRow.push(new Node(row, col));
    }

    grid.push(currRow);
  }

  return grid;
};

// Get all node objects from a given grid.
const getAllNodes = (grid) => {
  const nodeArray = [];

  grid.forEach((row) => {
    row.forEach((node) => nodeArray.push(node));
  });

  return nodeArray;
};

// Get all unvisited neighbours of a node.
// Note that it only checks the nodes above, below,
// to the left and to the right of the given node.
const getUnvisitedNeighbours = (node, grid) => {
  const neighbors = [];
  const row = node.row;
  const col = node.col;
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

// Get the shortest path
const getShortestPath = (targetNode) => {
  const shortestPath = [];
  let currNode = targetNode.previous;

  while (currNode !== null) {
    shortestPath.unshift(currNode);
    currNode = currNode.previous;
  }

  return shortestPath;
};

export class DijkstrasGrid {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.grid = createGrid(numRows, numCols);
    this.startNode = null;
    this.targetNode = null;
    this.storedVisitedSequence = [];
    this.storedShortestPath = [];
  }

  resetStored() {
    this.storedVisitedSequence = [];
    this.storedShortestPath = [];
  }

  getNode(row, col) {
    return this.grid[row][col];
  }

  // Node cannot be a wall or target node.
  setStartNode(node) {
    const previousStart = this.startNode;
    this.startNode = node;

    if (previousStart !== node) {
      this.resetStored();
      this.resetDijkstras();
    }

    return previousStart;
  }

  // Node cannot be a wall or start node.
  setTargetNode(node) {
    const previousTarget = this.targetNode;
    this.targetNode = node;

    if (previousTarget !== node) {
      this.resetStored();
      this.resetDijkstras();
    }

    return previousTarget;
  }

  isStartNode(node) {
    return node === this.startNode;
  }

  isTargetNode(node) {
    return node === this.targetNode;
  }

  resetDijkstras() {
    this.grid.forEach((row) =>
      row.forEach((node) => {
        node.isVisited = false;
        node.distance = Infinity;
        node.previous = null;
      })
    );

    this.resetStored();
  }

  clearWalls() {
    const clearedNodes = [];
    this.grid.forEach((row) =>
      row.forEach((node) => {
        if (node.isWall) {
          node.isWall = false;
          clearedNodes.push(node);
        }

        node.isVisited = false;
        node.distance = Infinity;
        node.previous = null;
      })
    );

    this.resetStored();
    return clearedNodes;
  }

  resetGrid() {
    this.resetStored();

    const clearedNodes = [];

    if (this.startNode) {
      clearedNodes.push(this.startNode);
      this.startNode = null;
    }

    if (this.targetNode) {
      clearedNodes.push(this.targetNode);
      this.targetNode = null;
    }

    this.grid.forEach((row) =>
      row.forEach((node) => {
        if (node.isWall) {
          node.isWall = false;
          clearedNodes.push(node);
        }

        node.isVisited = false;
        node.distance = Infinity;
        node.previous = null;
      })
    );

    return clearedNodes;
  }

  visualizeDijkstras() {
    if (!this.startNode || !this.targetNode) return [[], []];

    if (
      this.storedShortestPath.length === 0 ||
      this.storedVisitedSequence.length === 0
    ) {
      const visitedNodes = [];
      this.startNode.distance = 0;
      const unvisitedNodes = getAllNodes(this.grid);

      while (unvisitedNodes.length !== 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const minNode = unvisitedNodes.shift();

        minNode.isVisited = true;
        if (minNode === this.targetNode || minNode.distance === Infinity) {
          const shortestPath = getShortestPath(this.targetNode);

          // Remove the start node.
          visitedNodes.shift();
          shortestPath.shift();

          this.storedVisitedSequence = [...visitedNodes];
          this.storedShortestPath = [...shortestPath];
          return [visitedNodes, shortestPath];
        }

        if (minNode.isWall) {
          continue;
        }

        getUnvisitedNeighbours(minNode, this.grid).forEach((neighbourNode) => {
          if (minNode.distance + 1 < neighbourNode.distance) {
            neighbourNode.distance = minNode.distance + 1;
            neighbourNode.previous = minNode;
          }
        });

        visitedNodes.push(minNode);
      }
    }

    return [[...this.storedVisitedSequence], [...this.storedShortestPath]];
  }
}
