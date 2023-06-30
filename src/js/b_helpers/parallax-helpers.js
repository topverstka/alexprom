import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', (event) => {

	const sections = gsap.utils.toArray('.section-flip');
  const vh = window.innerHeight;

  const firstFlip = document.querySelector('.section-flip');
	var tl = gsap.timeline({
	  scrollTrigger: {
	    trigger: firstFlip,
	    start: "top bottom", // активируется, когда верх `.section-2` достигает нижней части экрана
	    endTrigger: ".hero",
	    end: "bottom top-=1000", // деактивируется, когда верх `.section-1` достигает верхней части экрана
	    scrub: true, // эффект "scrub" для плавной анимации
	    anticipatePin: 1, // предварительное оповещение о пине для более плавного скроллинга
      // markers: true,
	  }
	});

	const heroHeight = document.querySelector('.hero').getBoundingClientRect().height;
	const heroHeightNegative = -heroHeight;


	tl.set('.hero', {marginBottom: heroHeightNegative});
	tl.set(firstFlip, {y: heroHeight - 100});
	tl.to(firstFlip, {y: 0});

});