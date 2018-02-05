const video = document.getElementsByTagName('video')[0];

const loadVideo = new Promise((resolve, reject) => {
  var req = new XMLHttpRequest();
  req.open('GET', 'video3.mp4', true);
  req.responseType = 'blob';

  req.onload = function () {
    if (this.status === 200) {
      video.src = URL.createObjectURL(this.response);
      video.setAttribute('controls', 'true');
      resolve();
    }
  }
  req.onerror = function () {
    reject();
  }

  req.send();
});

loadVideo.then(() => {
  // video.currentTime = 0;
  // let time = Date.now();
  // function updateVideo() {
  //   const newTime = Date.now();
  //   video.currentTime += ((newTime - time) / 1000);
  //   time = newTime;
  //   requestAnimationFrame(updateVideo)
  // }

  // requestAnimationFrame(updateVideo)
  // const frameScrollLength = 500;
  // const container = document.querySelector('.container');
  // let oldOffset;

  // video.addEventListener('loadedmetadata', function () {
  //   container.style.height = Math.floor(video.duration) * frameScrollLength + "px";
  // });

  // function scrollPlay() {
  //   if (oldOffset !== window.pageYOffset) {
  //     oldOffset = window.pageYOffset;
  //     video.currentTime = window.pageYOffset / frameScrollLength;
  //   }
  //   window.requestAnimationFrame(scrollPlay);
  // }

  // window.requestAnimationFrame(scrollPlay);
})