const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 9500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  text.innerText = 'Einatmen!';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Atem halten';

    setTimeout(() => {
      text.innerText = 'Ausatmen!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);