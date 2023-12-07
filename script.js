// for the smooth scrolling locomotive js 

function locomotiveScroll(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".wrapper"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".wrapper", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

locomotiveScroll();






// cursor follower with effect 

function cursorFollower() {
  var mouseFollower = document.querySelector(".mouse-follower");
  var wrapper = document.querySelector(".wrapper");
  wrapper.addEventListener("mousemove", function (dets) {
    gsap.to(".mouse-follower", {
      x: dets.x,
      y: dets.y,
    });
  });
  wrapper.addEventListener("mouseenter", function () {
    gsap.to(".mouse-follower", {
      scale: 2,
      opacity:1,
    });
  });
  wrapper.addEventListener("mouseleave", function () {
    gsap.to(".mouse-follower", {
      scale: 0,
      opacity:0,
    });
  });
}
cursorFollower();




gsap.from(".wrd-setting",{
  scale:0,
  stagger:0.25,
  duration:1,
  scrub:2,
})

