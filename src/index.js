const svgns = "http://www.w3.org/2000/svg"

const numVertices = 9;
// const minX = 5, minY = 20, maxX = 90, maxY = 65;
const minX = 25, minY = 2, maxX = 65, maxY = 96;

function union(sets, e1, e2) {
  sets[find(sets, e2)].parent = sets[find(sets, e1)];
}

function find(sets, e) {
  let node = sets[e];
  while (node.parent) {
    node = node.parent;
  }
  return node.val;
}

var bg = document.querySelector('.back');
const vertices = Array(Math.floor(numVertices)).fill().map((v, i) => [Math.random() * maxX + minX, Math.random() * maxY + minY, i]);
let edges = []; let idx = 0;
setTimeout(() => {
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
    let sets = vertices.map(e => ({val: e[2], parent: null}));
    edges.forEach((e, i) => {
      setTimeout(() => {
        let u = e[0][2], v = e[1][2];
        if (find(sets, u) != find(sets, v)) {
          document.querySelector('#E' + e[3]).setAttributeNS(null, 'class', 'edge mst');
          union(sets, u, v);
        }
      }, i * 40);
    });
  }, (vertices.length * (vertices.length - 1)) * 4);
}, 200);