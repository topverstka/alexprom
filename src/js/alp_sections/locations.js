window.addEventListener('DOMContentLoaded', (event) => {
	const locations = document.querySelector('.locations');
	const locationsMap = document.querySelector('.locations__map');
	if (!locations) return;

	// begin locations carousel
	const mediaBreakpoint = window.mediaSizes.laptop;

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
	  if (window.innerWidth > mediaBreakpoint) {
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
		if (pagesCount == 0) return;

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

		if (window.innerWidth > window.mediaSizes.mobileXl) {
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
			// }).filter((link, linkIndex) => {
				// return linkIndex < showCardsCount
				// чтобы показать больше было порционно
			});

			links.forEach(link => link.classList.remove('is-hidden'))

			// if (links.length >= showCardsCount) return
			moreButton.classList.add('is-hidden');
		});
	}

	checkWidth();
	let prevWindowWidth = window.innerWidth
	window.addEventListener('resize', () => {
		var windowWidth = window.innerWidth;
	  if (windowWidth === prevWindowWidth) return;

	  prevWindowWidth = windowWidth;
	  checkWidth();
	});

	// end locations carousel

	function getMapIcon(locationsMap) {
		window.mapIcon = window.location.origin + locationsMap.dataset.mapIcon
		locationsMap.mapIcon = window.mapIcon;
		return window.location.origin + locationsMap.dataset.mapIcon
	}

	ymaps.ready(() => {
		let myMap = new ymaps.Map("locations__map", {
	    center: [55.76, 37.64], // Координаты центра карты, Москва
	    zoom: 10 // Масштаб карты
		});

		let cities = [...document.querySelectorAll('.locations-addresses__link')];
		cities = cities.map(city => {
			return {name: city.innerText};
		});
		cities = cities.filter(obj => {
		  if (!cities[obj.name]) {
		    cities[obj.name] = true;
		    return true;
		  }
		  return false;
		});

		cities.forEach((city, cityIndex) => {
			ymaps.geocode(city.name, {
        results: 1
			}).then(result => {
		    const position = result.geoObjects.get(0).geometry.getCoordinates();
		    city.coords = [position[0], position[1]];

		    let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
		    );
		    let placemark = new ymaps.Placemark(city.coords,
	        { 
	        	hintContent: city.name,
			      balloonContent: '',
			      iconContent: '',
	        },
	        {
	      	  iconLayout: "default#imageWithContent",
		        iconImageHref: getMapIcon(locationsMap),
		        iconImageSize: [32, 32],
		        iconImageOffset: [-16, -16],
            iconContentLayout: MyIconContentLayout,
	        }
		    );
				myMap.geoObjects.add(placemark);

		    // console.log(`Широта: ${position[0]}, Долгота: ${position[1]}`);
		  }).catch(error => {
		  	console.error('locations.js maps error')
		  	console.error(error)
		  });
		});

		window.myMap = myMap;

	})

});