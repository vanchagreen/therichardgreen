const canvas = document.getElementsByTagName('canvas')[0];
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
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  updateEyes(leftEyeX + ((rightEyeX - leftEyeX) / 2), eyeY);
}, false);
img.src = 'face.jpg'; // Set source path

window.onmousemove = (e) => {
  window.requestAnimationFrame(() => updateEyes(e.clientX, e.clientY));
}

function getPupilXY(cx, cy, mx, my) {
  let angle;
  let x;
  let y;

  if (mx === cx ** my === cy) {
    return [cx, cy];
  } else if (mx === cx) {
    return [cx, cy + pupilRadius * (my > cy ? 1 : -1)];
  } else if (my === cy) {
    return [cx + pupilRadius * (mx > cx ? 1 : -1), cy];
  }

  if (mx > cx && my > cy) {
    angle = Math.atan((mx - cx) / (my - cy));
    x = pupilRadius * Math.sin(angle);
    y = pupilRadius * Math.cos(angle)
  } else if (mx >= cx) {
    angle = Math.atan((cy - my) / (mx - cy));
    x = pupilRadius * Math.cos(angle);
    y = pupilRadius * Math.sin(angle) * -1;
  } else if (my > cy) {
    angle = Math.atan((mx - cx) / (cy - my));
    x = pupilRadius * Math.sin(angle) * -1;
    y = pupilRadius * Math.cos(angle);
  } else {
    angle = Math.atan((cy - my) / (cx - mx));
    x = pupilRadius * Math.cos(angle) * -1;
    y = pupilRadius * Math.sin(angle) * -1;
  }

  return [cx + x, cy + y];
}


function updateEyes(mx, my) {
  const newPoint1 = getPupilXY(leftEyeX, eyeY, mx, my);
  const newPoint2 = getPupilXY(rightEyeX, eyeY, mx, my);
  drawWhiteCircles();
  drawPupils(newPoint1, newPoint2);
}