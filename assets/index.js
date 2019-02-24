const svgns = "http://www.w3.org/2000/svg"

const maxPointRange = 5;
const minvertices = 5;
const minX = 0, minY = 5, maxX = 90, maxY = 80;

class DS {
  constructor(elements) {
    this.sets = elements.map(e => new Node(e[2]));
  }

  Union(e1, e2) {
    this.sets[this.Find(e2)].parent = this.sets[this.Find(e1)];
  }

  Find(e) {
    let node = this.sets[e];
    while (node.parent) {
      node = node.parent;
    }
    return node.val;
  }
}
class Node {
  constructor(val) {
    this.val = val;
    this.parent = null; // type: Node
  }
}

bg = document.querySelector('.back');
const vertices = Array(Math.floor(Math.random() * maxPointRange + minvertices)).fill().map((v, i) => [Math.random() * maxX + minX, Math.random() * maxY + minY, i]);
let edges = []; let idx = 0;
vertices.forEach((v1, i) => {
  vertices.slice(i + 1, vertices.length).forEach((v2, j) => {
    setTimeout(() => {
      edges = [...edges, [
        v1,
        v2,
        Math.sqrt(Math.pow((v1[0]-v2[0]), 2) + Math.pow((v1[1]-v2[1]), 2)),
        idx
      ]];
      let edge = document.createElementNS(svgns, 'line')
      edge.setAttributeNS(null, 'x1', v1[0] + '%');
      edge.setAttributeNS(null, 'x2', v2[0] + '%');
      edge.setAttributeNS(null, 'y1', v1[1] + '%');
      edge.setAttributeNS(null, 'y2', v2[1] + '%');
      edge.setAttributeNS(null, 'shape-rendering', 'auto');
      edge.setAttributeNS(null, 'class', 'edge');
      edge.setAttributeNS(null, 'id', 'E' + idx);
      bg.appendChild(edge);
      idx++;
    }, i * 50);
  });
});
setTimeout(() => {
  edges.sort((e1, e2) => e1[2] - e2[2]);
  let ds = new DS(vertices);
  edges.forEach((e, i) => {
    setTimeout(() => {
      let u = e[0][2], v = e[1][2];
      if (ds.Find(u) != ds.Find(v)) {
        document.querySelector('#E' + e[3]).setAttributeNS(null, 'class', 'edge mst');
        ds.Union(u, v);
      }
    }, i * 40);
  });
}, (vertices.length * (vertices.length - 1)) * 4);