const imageWidth = 200;
const imageHeight = 267;

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 2 * imageWidth;
canvas.height = 2 * imageHeight;
canvas.style.width = imageWidth + 'px';
canvas.style.height = imageHeight + 'px';
canvas.getContext('2d').scale(2, 2);
const ctx = canvas.getContext('2d');

const eyeRadius = 22;
const pupilRadius = eyeRadius / 2;
const leftEyeX = 80;
const rightEyeX = 153;
const eyeY = 80;

function drawWhiteCircles() {
  ctx.fillStyle = 'white';

  ctx.beginPath();
  ctx.arc(leftEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(rightEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawPupils(point1, point2) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(point1[0], point1[1], pupilRadius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(point2[0], point2[1], pupilRadius, 0, 2 * Math.PI);
  ctx.fill();
}

const img = new Image();
img.addEventListener('load', function () {
  ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
  updateEyes(leftEyeX + ((rightEyeX - leftEyeX) / 2), eyeY);
}, false);
img.src = 'face.jpg';

window.onmousemove = (e) => {
  window.requestAnimationFrame(() => updateEyes(e.clientX, e.clientY));
}

function getPupilXY(cx, cy, mx, my) {
  const dx = mx - cx;
  const dy = my - cy;
  const hypotenuse = Math.sqrt((dx * dx) + (dy * dy));

  const x = dx * (pupilRadius / hypotenuse);
  const y = dy * (pupilRadius / hypotenuse);

  return [cx + x, cy + y];
}


function updateEyes(mx, my) {
  const newPoint1 = getPupilXY(leftEyeX, eyeY, mx, my);
  const newPoint2 = getPupilXY(rightEyeX, eyeY, mx, my);
  drawWhiteCircles();
  drawPupils(newPoint1, newPoint2);
}