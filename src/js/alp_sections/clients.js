window.addEventListener('DOMContentLoaded', (event) => {
	const clientsSections = document.querySelectorAll('.clients');

	clientsSections.forEach(clients => {
		const clientsCarousel = new Swiper(".clients-carousel__swiper", {
	    navigation: {
	      nextEl: ".clients-carousel .swiper-button-next",
	      prevEl: ".clients-carousel .swiper-button-prev",
	    },
	    grabCursor: true,
	    centeredSlides: true,
	    centerInsufficientSlides: true,
	    centeredSlidesBounds: true,
	    breakpoints: {
	      320: {
	        slidesPerView: 1,
	        spaceBetween: 10,
	      },
	      690: {
	        slidesPerView: 2,
	        spaceBetween: 10,
	      },
	      1101: {
	        slidesPerView: 3,
	        spaceBetween: 40,
			    centeredSlides: false,
			    centerInsufficientSlides: false,
	      },
	      1537: {
	        slidesPerView: 4,
	        spaceBetween: 40,
			    centeredSlides: false,
			    centerInsufficientSlides: false,
	      }
	    },
		});
	});
});