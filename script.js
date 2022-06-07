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
