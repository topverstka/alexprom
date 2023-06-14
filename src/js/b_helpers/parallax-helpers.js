import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', (event) => {

	const sections = gsap.utils.toArray('.section-flip');
  const vh = window.innerHeight;

	sections.forEach((section, index) => {
	  let modifier = 100;
	  if (index > 0){
	  	modifier = -100
	  }

	  const tl = gsap.timeline({
	    scrollTrigger: {
	      trigger: section,
        start: `top bottom+=${modifier}px`,
	      end: 'center center',
	      scrub: true,
	    },
	  });

	  // Добавляем анимацию для текущей секции
	  tl.fromTo(section, {
	    yPercent: 0 // начальное значение положения по оси Y - 100%
	  }, {
	    // yPercent: -100 // конечное значение положения по оси Y - 0%
	    marginTop: -vh * 2,
	  }, 0); // задержка в начале анимации - 0 секунд
	});


});