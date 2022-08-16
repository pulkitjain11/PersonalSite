<!-- BACK TO TOP BUTTON -->
    let mybutton = document.getElementById("btn-back-to-top");
window.onscroll = function () {
scrollFunction();
};

function scrollFunction() {
if (
  document.body.scrollTop > 20 ||
  document.documentElement.scrollTop > 20
) {
  mybutton.style.display = "block";
} else {
  mybutton.style.display = "none";
}
}
mybutton.addEventListener("click", backToTop);

function backToTop() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}

<!-- VERTICAL TIMELINE -->

var items = document.querySelectorAll(".timeline li");
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      }
    } else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    }
  }
}
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

<!-- TImeline -->
  (function () {
  "use strict";
  var items = document.querySelectorAll(".timeline1 li");
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

<!-- Projects-->

let slider = tns({
  container: ".my-slider",
  "slideBy" : "1",
  "speed" : 600,
  "nav" :false,
  autoplay :true,
  controls: false,
  autoplayButtonOutput : false,
  responsive: {
    1600: {
      items: 4,
      gutter :20
    },
    1024:{
      items: 3,
      gutter :20
    },
    768: {
      items: 2,
      gutter:20
    },
    480:{
      items:1
    }
  }
})

<!-- Navbar close-->

$(document).ready(function () {
  $(document).click(function () {
     // if($(".navbar-collapse").hasClass("in")){
       $('.navbar-collapse').collapse('hide');
     // }
  });
});


// CODEPEN



var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = {x:0,y:0},
  radius = 1;

var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

let copy = document.querySelector("#copy");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x,y){
  this.x =  Math.random()*ww;
  this.y =  Math.random()*wh;
  this.dest = {
    x : x,
    y: y
  };
  this.r =  Math.random()*5 + 2;
  this.vx = (Math.random()-0.5)*20;
  this.vy = (Math.random()-0.5)*20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random()*0.05 + 0.94;

  this.color = colors[Math.floor(Math.random()*6)];
}

Particle.prototype.render = function() {


  this.accX = (this.dest.x - this.x)/1000;
  this.accY = (this.dest.y - this.y)/1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y +=  this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt( a*a + b*b );
  if(distance<(radius*70)){
    this.accX = (this.x - mouse.x)/100;
    this.accY = (this.y - mouse.y)/100;
    this.vx += this.accX;
    this.vy += this.accY;
  }

}

function onMouseMove(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e){
  if(e.touches.length > 0 ){
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e){
mouse.x = -9999;
mouse.y = -9999;
}

function initScene(){
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold "+(ww/10)+"px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(copy.value, ww/2, wh/2);

  var data  = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for(var i=0;i<ww;i+=Math.round(ww/150)){
    for(var j=0;j<wh;j+=Math.round(ww/150)){
      if(data[ ((i + j*ww)*4) + 3] > 150){
        particles.push(new Particle(i,j));
      }
    }
  }
  amount = particles.length;

}

function onMouseClick(){
  radius++;
  if(radius ===5){
    radius = 0;
  }
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
};

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);


//CNN

particlesJS("particles-js", {"particles":{"number":{"value":14,"density":{"enable":true,"value_area":394.57459926017265}},"color":{"value":"#00d6cc"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.18939580764488287,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":6.6,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":299.8766954377312,"color":"#ffffff","opacity":0.2130702836004932,"width":0.5},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;


// name

// (function($) { // Begin jQuery extension
//
//   var timer;
//
//     Number.prototype.range = function( min, max ) {
//        return this > min && this < max;
//     };
//
//     var rd = function randomAlphaNum() {
//         var rand = Math.floor(Math.random()*( 122 - 33 + 1 ) + 33 );
//
//       // Filter out char codes that are not required
//         if ( rand.range( 38, 48 ) ) rand = rand + 10;
//         else if ( rand.range( 57, 63 ) ) rand = rand + 10;
//         else if ( rand.range( 90, 97 ) ) rand = rand + 10;
//
//         return String.fromCharCode( rand );
//     };
//
//     $.fn.cipherStart = function( begin ) {
//         this.each( function() {
//
//             var $ele = $(this),
//                 str = $ele.text(),
//                 i = 0,
//                 replace = /[^\s]/g;
//
//            $ele.text(''); // Clears the text
//
//             timer = setInterval( function() {
//                 $ele.text(
//                   str.substring( 0, i ) + // Returns a subset of the initial string, on the first call 0 0 returns nothing, next is 0 1 etc
//                   str.substring( i, str.length ) // Returns a subset of progress to the full length of the string
//
//                   .replace( replace, rd ) // replace all characters with a random char code
//                 );
//
//                 if ( begin ) { // Reveal text
//                   i++;
//
//                   if ( i > str.length )
//                       clearInterval(timer);
//                 }
//
//             }, 110); // Timing
//         });
//         return this;
//     };
//
//     $.fn.cipherStop = function() {
//       clearInterval( timer );
//
//       return this;
//     };
//
//
// 	$.fn.cipherCenter = function () {
// 	    this.css( 'position', 'absolute' );
// 	     this.css( 'top', Math.max( 0, ( ($( window ).height() - $( this ).outerHeight()) / 2.3 ) + $( window ).scrollTop() ) + 'px' );
// 			 this.css( 'left', Math.max( 0, ( ($( window ).width() - $( this ).outerWidth()) / 2 ) + $( window ).scrollLeft() ) + 'px' );
//
//       return this;
// 	}
//
//
// })(jQuery); // End jQuery Extension
//
//
// $( 'document' ).ready(function() {
//
//   // Hide header
//   $( '.header' ).hide();
//   // Transition background
//   $( '.london' ).ready(function() {
//     $( '.london' ).fadeIn( 1200 );
//
//   // Timeout for crypto text
//   setTimeout( function() {
//     $( '.header' ).fadeIn( 'slow' );
//       $( '.cipher' ).cipherStart( true );
//   }, 1400);
//
//
//   });
//
// });
