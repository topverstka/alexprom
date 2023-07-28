window.addEventListener('DOMContentLoaded', (event) => {
	const swiperGallery = document.querySelector('.swiper-gallery');
	if (!swiperGallery) return;

  const swiperGalleries = document.querySelectorAll('.gallery-carousel');

  swiperGalleries.forEach((gallery, index) => {

    const UNIQUE_CLASS_NAME = `gallery-carousel-${index}`;
    gallery.classList.add(UNIQUE_CLASS_NAME);

    const swiperGallerySlider = new Swiper(`.${UNIQUE_CLASS_NAME} .swiper-gallery`, {
      navigation: {
        nextEl: `.${UNIQUE_CLASS_NAME} .swiper-button-next`,
        prevEl: `.${UNIQUE_CLASS_NAME} .swiper-button-prev`,
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
  })
	
	  
});