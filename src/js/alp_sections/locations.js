window.addEventListener('DOMContentLoaded', (event) => {
	const locations = document.querySelector('.locations');
	const locationsMap = document.querySelector('.locations__map');
	if (!locations) return;

	// begin locations carousel
	const mediaBreakpoint = window.mediaSizes.laptop;

	let locationsCarousel;

	function hideLocationsCards() {
		const cards = [...document.querySelectorAll('.locations-card')];
		if (cards.length < 1) return;

		let visibleCount = 6;
		const locationsAddresses = document.querySelector('.locations-addresses')
		if (locationsAddresses) {
			const count = locationsAddresses.dataset.show;
			let regex = /\d/;
			if (regex.test(count)) {
				visibleCount = count
			}
		}

		cards.forEach((card, index) => {
			if (index < visibleCount) return;

			card.classList.add('is-hidden')
		})
	}
	function showLocationsCards() {
		const cards = [...document.querySelectorAll('.locations-card')];
		if (cards.length < 1) return;

		cards.forEach(card => {
			card.classList.remove('is-hidden')
		})
	}

	function initLocationsCarousel() {
		if (!document.querySelector('.locations-addresses__slider')) return
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
		if (typeof locationsCarousel == 'undefined') return;
		if (typeof locationsCarousel.destroy == 'undefined') return;
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

		let carousel = document.querySelector('.locations-addresses__slider');
		if (!carousel) return false;

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
		const carouselStructure = getCarouselWrapStructure();
		if (carouselStructure == false) return;

		const {carousel, pages, links, wrapper} = carouselStructure;
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

	hideLocationsCards();
	const moreButton = document.querySelector('.locations-addresses__button-more');
	if (moreButton) {
		moreButton.addEventListener("click", (e) => {
			showLocationsCards();

			const showCardsCount = getCurrentShowCardsCount() 

			const carouselStructure = getCarouselWrapStructure();
			if (carouselStructure) {
				let {carousel, pages, links, wrapper} = getCarouselWrapStructure();
				links = [...links].filter((link, linkIndex) => {
					return link.classList.contains('is-hidden');
				// }).filter((link, linkIndex) => {
					// return linkIndex < showCardsCount
					// чтобы показать больше было порционно
				});

				links.forEach(link => link.classList.remove('is-hidden'))
			}

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
			let cityAddress = city.closest('.locations-card')?.querySelector('.locations-card__contact-address');
			if (cityAddress) {
				return {name: cityAddress.innerText, element: city, addressElement: cityAddress};
			}
			return {name: city.innerText, element: city};
		});
		/*
		cities = cities.filter(obj => {
		  if (!cities[obj.name]) {
		    cities[obj.name] = true;
		    return true;
		  }
		  return false;
		});
		//*/

		cities.forEach((city, cityIndex) => {
			ymaps.geocode(city.name, {
        results: 1
			}).then(result => {
		    const position = result.geoObjects.get(0).geometry.getCoordinates();
		    city.coords = [position[0], position[1]];

				const cityTrigger = city.element.closest('.locations-card__top');
				if (cityTrigger) {
					cityTrigger.addEventListener('click', () => {
						myMap.setCenter(city.coords);
						myMap.setZoom(15);
					});
				}

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