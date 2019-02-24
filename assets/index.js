bg = document.querySelector('.back');
const svgns = "http://www.w3.org/2000/svg"

const maxPointRange = 30;
const minPoints = 10;
const maxCoordRange = 60;
const minCoord = 20;
const points = Array(Math.floor(Math.random() * maxPointRange + minPoints)).fill().map(v => [Math.random() * maxCoordRange + minCoord, Math.random() * maxCoordRange + minCoord]);
points.forEach(e => {
  let point = document.createElementNS(svgns, 'circle')
  point.className = 'point';
  console.log(point);
  point.setAttributeNS(null, 'cx', e[0] + '%');
  point.setAttributeNS(null, 'cy', e[1] + '%');
  point.setAttributeNS(null, 'r', 1.5);
  point.setAttributeNS(null, 'class', 'point');
  bg.appendChild(point);
});