window.addEventListener('DOMContentLoaded', (event) => {
	const locations = document.querySelector('.locations');
	if (!locations) return;

	let locationsCarousel;

	function initLocationsCarousel() {
		locationsCarousel = new Swiper('.locations-addresses__slider', {
		  slidesPerView: 1,
		  spaceBetween: 40,
		  grabCursor: true,
		  // autoHeight: true,
		  navigation: {
		    nextEl: '.locations-addresses__button-next',
		    prevEl: '.locations-addresses__button-prev',
		  },
		});
	}

	function destroyLocationsCarousel() {
		if (locationsCarousel == undefined) return;
    locationsCarousel.destroy(true, true);
	}

	let isPageLoadInit = true;
	function checkWidth() {
	  if (window.innerWidth > window.mediaSizes.tabletM) {
	  	wrapSlideItems();
	  	initLocationsCarousel();
	  } else {
	  	unwrapSlideItems()
	  	destroyLocationsCarousel()
	  }
	}

	let pagesCount = 0;

	function getCarouselWrapStructure() {
		// if (locationsCarousel == undefined) return;

		const carousel = document.querySelector('.locations-addresses__slider');
		const pages = carousel.querySelectorAll('.locations-addresses__address');
		const links = carousel.querySelectorAll('.locations-addresses__link');
		const wrapper = carousel.querySelector('.swiper-wrapper');

		return {
			carousel,
			pages,
			links,
			wrapper,
		};
	}

	const maxLinksPerPage = 17;
	function wrapSlideItems() {
		let {carousel, pages, links, wrapper} = getCarouselWrapStructure();

		for (let i = 0; i < pagesCount; i++) {
			const page = document.createElement('div')
			page.classList.add('swiper-slide', 'locations-addresses__address');
			wrapper.append(page);
		}

		pages = [...carousel.querySelectorAll('.locations-addresses__address')];

		let currentPageIndex = 0;
		links.forEach((link, linkIndex) => {
			link.classList.remove('is-hidden');
			pages[currentPageIndex].append(link);
			if (linkIndex == maxLinksPerPage - 1) currentPageIndex++
		})
	}

	function getCurrentShowCardsCount() {
		let showGroupCount = 8;
		if (window.innerWidth > window.mediaSizes.mobileL) {
			showGroupCount = 12;
		}

		return showGroupCount;
	}

	function unwrapSlideItems() {
		const {carousel, pages, links, wrapper} = getCarouselWrapStructure();
		pagesCount = pages.length;

		links.forEach((link, linkIndex) => {
			wrapper.append(link);

			if (linkIndex < getCurrentShowCardsCount()) return
			link.classList.add('is-hidden');
		})

		pages.forEach(page => {
			page.remove();
		})

		const moreButton = document.querySelector('.locations-addresses__button-more');
		if (moreButton) {
			moreButton.classList.remove('is-hidden');
		}
	}

	const moreButton = document.querySelector('.locations-addresses__button-more');
	if (moreButton) {
		moreButton.addEventListener("click", (e) => {
			const showCardsCount = getCurrentShowCardsCount() 
			let {carousel, pages, links, wrapper} = getCarouselWrapStructure();
			links = [...links].filter((link, linkIndex) => {
				return link.classList.contains('is-hidden');
			}).filter((link, linkIndex) => {
				return linkIndex < showCardsCount
			});

			links.forEach(link => link.classList.remove('is-hidden'))

			if (links.length >= showCardsCount) return
			moreButton.classList.add('is-hidden');
		});
	}

	checkWidth();
	window.addEventListener('resize', () => {
	  checkWidth();
	});


});