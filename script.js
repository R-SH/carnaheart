const frameDuration = 20;

function execute(element, updateFrame, numFrames, reportTo) {
  var i = 0;
  var timer = setInterval(frame, frameDuration);
  function frame() {
    updateFrame(element, i);
    i++;
    if(i > numFrames) {
      clearInterval(timer);
      reportTo.dispatchEvent(new Event('end'));
    }
  }
}

function poppingText(func) {
  return function(element, i) {
    element.style.opacity = func(i);
  }
}

function bannerPane(func) {
  return function(element, i) {
    element.style.backgroundColor = 'rgba(255, 255, 255, '+func(i)+')';
  }
}


var container = document.querySelector('.banner-animated-text');
var banner = document.querySelector('.banner');
var index = 0;
container.addEventListener('end', queue);

function queue() {
  text = container.children[index];
  index++;
  if(container.children[index]) {
    execute(text, poppingText((x) => Math.sin(x/200*Math.PI)), 200, container);
  }
  else {
    container.removeEventListener('end', queue);
    execute(text, poppingText((x) => Math.sin(x/200*Math.PI/2)), 200, container);
    execute(banner, bannerPane((x) => 0.5*Math.cos(x/200*Math.PI/2)), 200, container);
  }
}

queue();

scrollMessage = document.querySelector('.scroll-message');

function removeScrollMessage(){
  scrollMessage.parentNode.removeChild(scrollMessage);
  console.log('removed scroll message');
  window.removeEventListener('scroll', removeScrollMessage);
}
window.addEventListener('scroll', removeScrollMessage);
