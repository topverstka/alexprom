import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', (event) => {

	const sections = gsap.utils.toArray('.section-flip');
  const vh = window.innerHeight;

	const heroHeight = document.querySelector('.hero').getBoundingClientRect().height;
	const heroHeightNegative = -heroHeight;

	let overlapHeightModifier = 5;
	if (window.innerWidth > window.mediaSizes.mobileXl) {
		overlapHeightModifier = 2
	}

	const overlapHeight = heroHeight / overlapHeightModifier;
	const overlapHeightNegative = -overlapHeight;


	let tlOffsetStart = heroHeight / 30;
	let tlOffsetEnd = heroHeight / 20;


  const firstFlip = document.querySelector('.section-flip');
	var tl = gsap.timeline({
	  scrollTrigger: {
	    trigger: firstFlip,
	    start: `top-=${tlOffsetStart} bottom`, // активируется, когда верх `.section-2` достигает нижней части экрана
	    endTrigger: ".hero",
	    end: `bottom+=${tlOffsetEnd} top`, // деактивируется, когда верх `.section-1` достигает верхней части экрана
	    scrub: true,
	    anticipatePin: 1, // предварительное оповещение о пине для более плавного скроллинга
      // markers: true,
	  }
	});

	tl.set('.hero', {marginBottom: overlapHeightNegative});
	tl.set(firstFlip, {y: overlapHeight - 50});
	tl.to(firstFlip, {y: 0});

});