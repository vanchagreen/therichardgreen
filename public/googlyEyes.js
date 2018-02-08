const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

canvas.width = 2 * window.innerWidth;
canvas.height = 2 * window.innerHeight;
canvas.style.width = canvas.width / 2 + 'px';
canvas.style.height = canvas.height / 2 + 'px';
ctx.scale(2, 2);

const imageHeight = 300;
const imageWidth = imageHeight / 1.335;

const xImageOffset = (window.innerWidth / 2) - (imageWidth / 2)
const yImageOffset = (window.innerHeight / 2) - (imageHeight / 2)

const eyeRadius = imageWidth / 9;
const pupilRadius = eyeRadius / 2;
const leftEyeX = xImageOffset + imageWidth / 2.6;
const rightEyeX = xImageOffset + imageWidth / 1.31;
const eyeY = yImageOffset + imageWidth / 2.5;

const img = new Image();
img.addEventListener('load', function () {
  ctx.drawImage(img, xImageOffset, yImageOffset, imageWidth, imageHeight);
  window.onmousemove = (e) => {
    window.requestAnimationFrame(() => updateEyes(e.clientX, e.clientY));
  }

  window.onclick = (e) => {
    fireLaser(e.clientX, e.clientY);
  }

  updateEyes(leftEyeX + ((rightEyeX - leftEyeX) / 2), eyeY);
}, false);
img.src = 'optimized_face.jpeg';

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

function getPupilXY(cx, cy, mx, my) {
  const dx = mx - cx;
  const dy = my - cy;
  const hypotenuse = Math.sqrt((dx * dx) + (dy * dy));

  if (hypotenuse < eyeRadius) {
    canvas.style.cursor = 'none';
  }

  if (hypotenuse < pupilRadius) {
    return [mx, my]
  }
  const x = dx * (pupilRadius / hypotenuse);
  const y = dy * (pupilRadius / hypotenuse);

  return [cx + x, cy + y];
}

let laserFired = false;

function updateEyes(mx, my) {
  if (laserFired) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, xImageOffset, yImageOffset, imageWidth, imageHeight);
    laserFired = false;
  }
  canvas.style.cursor = 'auto';
  const newPoint1 = getPupilXY(leftEyeX, eyeY, mx, my);
  const newPoint2 = getPupilXY(rightEyeX, eyeY, mx, my);
  drawWhiteCircles();
  drawPupils(newPoint1, newPoint2);
}

function drawLaser(cx, cy, mx, my) {
  ctx.beginPath();
  const XY = getPupilXY(cx, cy, mx, my);
  ctx.moveTo(XY[0], XY[1]);
  ctx.lineTo(mx, my);
  ctx.stroke();
}

function fireLaser(mx, my) {
  var audio = new Audio('pew.mp3');
  audio.autoplay = 'autoplay';

  updateEyes(mx, my);

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;

  drawLaser(leftEyeX, eyeY, mx, my);
  drawLaser(rightEyeX, eyeY, mx, my);

  const explosionImg = document.createElement('img');
  explosionImg.src = 'explosion.gif';
  explosionImg.style.top = my - 125 + 'px';
  explosionImg.style.left = mx - 125 + 'px';
  document.body.appendChild(explosionImg);
  window.setTimeout(() => {
    explosionImg.remove();
  }, 1000)


  ctx.lineWidth = 1;
  laserFired = true;
}