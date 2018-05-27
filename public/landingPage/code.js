function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

const imageHeight = 300;
const imageWidth = imageHeight / 1.335;

let xImageOffset, yImageOffset, eyeRadius, pupilRadius, leftEyeX, rightEyeX, eyeY, mouseX, mouseY;
const stars = [];

function initializeCanvas() {
  canvas.width = 2 * window.innerWidth;
  canvas.height = 2 * window.innerHeight;
  canvas.style.width = canvas.width / 2 + 'px';
  canvas.style.height = canvas.height / 2 + 'px';
  ctx.scale(2, 2);

  xImageOffset = (window.innerWidth / 2) - (imageWidth / 2)
  yImageOffset = (window.innerHeight / 2) - (imageHeight / 2)

  eyeRadius = imageWidth / 9;
  pupilRadius = eyeRadius / 2;
  leftEyeX = xImageOffset + imageWidth / 2.6;
  rightEyeX = xImageOffset + imageWidth / 1.31;
  eyeY = yImageOffset + imageWidth / 2.5;

  mouseX = leftEyeX + ((rightEyeX - leftEyeX) / 2);
  mouseY = eyeY;

  initializeStars();
}

function initializeStars() {
  for(let i = 0; i < 200; i++) {
    const opacity = Math.random();
    stars[i] = {
      color: [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)],
      opacity,
      opacityDir: getRandomInt(0, 1) ? -1 : 1,
      opacitySpeed: 0.01 + getRandomInt(1, 5) / 1000,
      height: getRandomInt(2, 5),
      width: getRandomInt(2, 5),
      speed: getRandomInt(1000, 5000),
      x: (Math.random() * canvas.width / 2), 
      y: (Math.random() * canvas.height / 2),
    }
  }  
}

function drawStars() {
  for(const star of stars) {
    star.x -= canvas.width / star.speed
    star.opacity += star.opacitySpeed * star.opacityDir;
    if (star.x < 0) star.x = canvas.width / 2;
    if (star.opacity > 1 || star.opacity < 0.1) star.opacityDir *= -1;
    
    ctx.fillStyle = 'rgba(' + star.color.join(',') + ',' + star.opacity + ')';

    ctx.fillRect(star.x, star.y, star.width, star.height);
  }
}

function getPupilXY(cx, cy, mx, my) {
  const dx = mx - cx;
  const dy = my - cy;
  const hypotenuse = Math.sqrt((dx * dx) + (dy * dy));

  if (hypotenuse < pupilRadius) {
    return [mx, my]
  }
  const x = dx * (pupilRadius / hypotenuse);
  const y = dy * (pupilRadius / hypotenuse);

  return [cx + x, cy + y];
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

function drawEyes() {
  ctx.fillStyle = 'white';

  ctx.beginPath();
  ctx.arc(leftEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(rightEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
  ctx.fill();

  const pupilPoint1 = getPupilXY(leftEyeX, eyeY, mouseX, mouseY);
  const pupilPoint2 = getPupilXY(rightEyeX, eyeY, mouseX, mouseY);

  drawPupils(pupilPoint1, pupilPoint2);
}

function explode(mx, my) {
  var audio = new Audio('pew.mp3');
  audio.autoplay = 'autoplay';

  const explosionImg = document.createElement('img');
  explosionImg.src = 'explosion.gif';
  explosionImg.style.top = my - 125 + 'px';
  explosionImg.style.left = mx - 125 + 'px';
  document.body.appendChild(explosionImg);
  window.setTimeout(() => {
    explosionImg.remove();
  }, 1000)
}

function render() {
  window.requestAnimationFrame(render);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);  
  drawStars();
  ctx.drawImage(img, xImageOffset, yImageOffset, imageWidth, imageHeight);  
  canvas.style.cursor = 'auto';
  drawEyes();
}

const img = new Image();
img.addEventListener('load', function () {
  initializeCanvas();

  window.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  window.onclick = (e) => {
    explode(e.clientX, e.clientY);
  }

  window.addEventListener('touchmove', (e) => {
    mouseX = e.targetTouches[0].clientX;
    mouseY = e.targetTouches[0].clientY;
  });

  window.onresize = (e) => {
    initializeCanvas();
  }

  render();
}, false);
img.src = 'optimized_face.jpeg';