window.addEventListener('DOMContentLoaded', (event) => {
	const reviews = document.querySelector('.reviews');
	if (!reviews) return;

	let experienceGallery = new Swiper(".reviews-gallery", {
    navigation: {
      nextEl: ".reviews-carousel .swiper-button-next",
      prevEl: ".reviews-carousel .swiper-button-prev",
    },
    grabCursor: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        // slidesPerView: 1.05,
        spaceBetween: 18,
      },
      690: {
        slidesPerView: 1,
        // slidesPerView: 1.15,
        spaceBetween: 20,
      },
      963: {
        slidesPerView: 2,
        // slidesPerView: 2.23,
        spaceBetween: 40,
      },
      1441: {
        slidesPerView: 2,
        // slidesPerView: 2.4,
        spaceBetween: 40,
      }
    },
  });
});