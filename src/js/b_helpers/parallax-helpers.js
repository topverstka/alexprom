import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { isMobile } from "./condition-helpers.js";

if (typeof gsap != 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

window.addEventListener('DOMContentLoaded', (event) => {
	if (typeof gsap == 'undefined') return;

	let hasGsap = true;
	window.b_isLowPowerDetectStarted = false;

	function handleDetect() {
		// if (!isMobile.any()) return;
		if (b_isLowPowerDetectStarted) {
			window.removeEventListener('click', handleDetect);
			window.removeEventListener('scroll', handleDetect);
			return;
		}
		detectLowPower()
	}

	window.addEventListener('click', handleDetect)
	window.addEventListener('scroll', handleDetect)

	function detectLowPower() {
		window.b_isLowPowerDetectStarted = true;
		const lowPowerTester = document.createElement('video');
		lowPowerTester.src = '//upload.wikimedia.org/wikipedia/commons/transcoded/8/87/Schlossbergbahn.webm/Schlossbergbahn.webm.120p.vp9.webm';
		lowPowerTester.style.opacity = '0';
		lowPowerTester.setAttribute('muted', '');
		lowPowerTester.setAttribute('playsinline', '');
		lowPowerTester.setAttribute('autoplay', '');
		lowPowerTester.setAttribute('loop', '');

		document.body.append(lowPowerTester);
		setTimeout(() => {
			lowPowerTester.play().then(() => {
				// alert('ok')
				lowPowerTester.remove();
					initGsap();
			}).catch((error) => {
				// alert(error)
				const isNotPowerSaveMode = String(error).includes('is not allowed');

				if (isNotPowerSaveMode) {
					// alert('low')
				} else {
					initGsap();
					// alert('ok')
				}

				lowPowerTester.remove();
			})
		}, 100)
	}

	function initGsap() {
		if (hasGsap == false) return;

		const sections = gsap.utils.toArray('.section-flip');
	  const vh = window.innerHeight;

	  const hero = document.querySelector('.hero');
	  if (!hero) return;

		const heroHeight = hero.getBoundingClientRect().height;
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
	}


});