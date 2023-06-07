window.addEventListener('DOMContentLoaded', (event) => {
	const swiperGallery = document.querySelector('.swiper-gallery');
	if (!swiperGallery) return;
	
	const swiperGallerySlider = new Swiper(".swiper-gallery", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
	  breakpoints: {
	    320: {
        slidesPerView: 1,
        spaceBetween: 20,
        grid: {
          rows: 4,
          fill: "row",
        },
        allowSlideNext: false,
        allowSlidePrev: false,
        allowTouchMove: false,
	    },
	    767: {
        slidesPerView: 2,
        spaceBetween: 24,
        grid: {
          rows: 2,
          fill: "row",
        },
	    },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
        grabCursor: true,
        allowSlideNext: true,
        allowSlidePrev: true,
        allowTouchMove: true,
      },
    },
  });
	  
});