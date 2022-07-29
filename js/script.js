var screen_height = window.innerHeight;
var screen_width = window.innerWidth;
var banner_height, intro_height;

var slider = document.getElementById('image-container');
var sliderWidth = document.getElementById('slider').offsetWidth;
var boxes = document.getElementsByClassName('box');
for (let i = 0; i < boxes.length; i++) {
  boxes[i].style.width = sliderWidth + 'px';
}
var leftAmount = sliderWidth;

// Disable & Enable Scroll

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// Fade in/out
let displayed = false;
var button = document.getElementById('button');
function appear(elm, i, step, speed){
  var t_o;
  //initial opacity
  i = i || 0;
  //opacity increment
  step = step || 5;
  //time waited between two opacity increments in msec
  speed = speed || 50;

  t_o = setInterval(function(){
    //get opacity in decimals
    var opacity = i / 100;
    //set the next opacity step
    i = i + step;
    if(opacity > 1 || opacity < 0){
      clearInterval(t_o);
      //if 1-opaque or 0-transparent, stop
      if(!displayed){
        button.style.display = 'none';
      }
      return;
    }
    //modern browsers
    elm.style.opacity = opacity;
    //older IE
    elm.style.filter = 'alpha(opacity=' + opacity*100 + ')';
  }, speed);
}
var counter = 0;

// Do whatever depending on resize
function resize(){
  if(window.availHeight == screen_height){
    document.getElementById('banner').style.height = banner_height;
  }
  if(window.innerWidth != screen_width){
    document.getElementById('banner').style.height = 'fit-content';
  }

  AA = window.outerWidth;
  BB = window.outerHeight;

  if ((A == AA && B == BB) || BB >= B) {
    screen_height = window.innerHeight;
    banner_height = 0.90 * screen_height + 'px';
    intro_height = 0.10 * screen_height + 'px';
    document.getElementById('banner').style.height = banner_height;
    document.getElementById('intro-quote').style.height = intro_height;

    if(AA < A/2){
      document.getElementById('banner').style.height = 'fit-content';
    }
  }else{
    displayed = false;
    appear(button, 100, -3, 40);
  }

  if(!executing){
    slider = document.getElementById('image-container');
    sliderWidth = document.getElementById('slider').offsetWidth;
    boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.width = sliderWidth + 'px';
    }
    leftAmount = sliderWidth;
  }
}


// Control scroll animation time
const duration = 500;
let scrolled = true;

const scrollToTarget = function () {
  scrolled = false;
  disableScroll();
  const top = window.innerHeight;


  let startTime = null;
  let requestId;

  const loop = function (currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    // Elapsed time in miliseconds
    const time = currentTime - startTime;

    const percent = Math.min(time / duration, 1);
    window.scrollTo(0, top * percent);

    if (time < duration) {
      // Continue moving
      requestId = window.requestAnimationFrame(loop);
    } else {
      window.cancelAnimationFrame(requestId);
      scrolled = true;
      enableScroll();
    }
  };
  requestId = window.requestAnimationFrame(loop);
};

// Automatic News Slider
function wait500ms(){
  slider.style.transition = 'left 2s';
}

function automaticSlider(){
  executing = true;
  if(counter == 4) {
    slider.style.transition = 'none';
    counter= 0;
    leftAmount = sliderWidth;
    setTimeout(wait500ms, 500);
  }
  counter ++;
  leftAmount -= sliderWidth;
  executing = false;
  setTimeout(function(){
    automaticSlider();
  }, 5000);
  slider.style.left = leftAmount + 'px';
}

window.addEventListener('resize', resize);

// Set Introduction page proportions
var A = screen.availWidth;
var AA = window.outerWidth;

var B = screen.availHeight;
var BB = window.outerHeight;

if ((A == AA && B == BB) || BB >= B) {
  screen_height = window.innerHeight;
  banner_height = 0.90 * screen_height + 'px';
  intro_height = 0.10 * screen_height + 'px';
  document.getElementById('banner').style.height = banner_height;
  document.getElementById('intro-quote').style.height = intro_height;
}else{
  document.getElementById('intro-quote').style.height = '10vh';
}

// Detect mobile device
window.addEventListener('load', () => {
  var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);

  if (isMobile) {
    document.getElementById('banner').style.height = '100vh';
    console.log('Is mobile device');
  }
  else {
    console.log('Not mobile device');
  }
});

// Check if we're on the top of the page and height is max
if(window.scrollY == 0 && BB >= B){
  disableScroll();
}

// Check if read more was clicked
document.getElementById('read').addEventListener('click', () => {
  enableScroll();
});


// Enable scroll if arrow down key was pressed
window.addEventListener('keydown', e => {
  if(e.keyCode == 40 && window.scrollY == 0){
    if(scrolled) scrollToTarget();
  }
});

// Track scroll amount and enable scrolling after 3 scrolls
var wheelScrolls = 0;
window.addEventListener('wheel', e => {
  const delta = Math.sign(event.deltaY);
  if(delta == 1){
    wheelScrolls++;
    if(wheelScrolls >= 3 && window.scrollY == 0){
      if(scrolled) scrollToTarget();
    }
  }
  if(window.scrollY != 0 && scrolled){
    enableScroll();
    scrolled = true;
  }
});

automaticSlider();

// Back to top button
button.style.display = 'none';
button.style.opacity = '0';
window.addEventListener('scroll', function () {
  if(window.scrollY >= 2*window.innerHeight && displayed == false && (AA >= A/2 && BB>=B)){
    displayed = true;
    button.style.display = 'block';
    appear(button, 0, 3, 40);
  }
  if(window.scrollY < 2*window.innerHeight && displayed == true){
    displayed = false;
    appear(button, 100, -3, 40);
  }
});
