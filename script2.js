//Change ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

let sections = document.querySelectorAll(".section-wrap2 section"),
  images = document.querySelectorAll(".section-wrap2 .bg"),
  outerWrappers = gsap.utils.toArray(".section-wrap2 .outer"),
  innerWrappers = gsap.utils.toArray(".section-wrap2 .inner"),
  currentIndex = -1,
  wrap = gsap.utils.wrap(0, sections.length),
  animating;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
  console.log("script2: index =" + index);
  console.log("script2: currentIndex =" + currentIndex);

  index = wrap(index); // make sure it's valid
  animating = true;
  let fromTop = direction === -1,
    dFactor = fromTop ? -1 : 1,
    tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => (animating = false),
    });
  if (currentIndex >= 0) {
    // The first time this function runs, current is -1
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
      sections[currentIndex],
      { autoAlpha: 0 }
    );
  }
  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
  tl.fromTo(
    [outerWrappers[index], innerWrappers[index]],
    {
      yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
    },
    {
      yPercent: 0,
    },
    0
  ).fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

  if (index === 1 && currentIndex === 0 && direction === -1) {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth",
    });
  }
  currentIndex = index;
}

//Change ScrollTrigger
ScrollTrigger.observe({
  target: ".section-wrap2", //Change
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => !animating && gotoSection(currentIndex - 1, -1),
  onUp: () => !animating && gotoSection(currentIndex + 1, 1),
  tolerance: 10,
  preventDefault: true,
});

gotoSection(0, 1);

// original: https://codepen.io/BrianCross/pen/PoWapLP
// horizontal version: https://codepen.io/GreenSock/pen/xxWdeMK
