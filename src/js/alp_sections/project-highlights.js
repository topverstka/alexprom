window.addEventListener('DOMContentLoaded', (event) => {
	const hightlights = document.querySelector('.project-highlights');
	if (!hightlights) return;

	let experienceGallery = new Swiper(".project-highlights-carousel", {
    navigation: {
      nextEl: ".project-highlights__gallery .swiper-button-next",
      prevEl: ".project-highlights__gallery .swiper-button-prev",
    },
    grabCursor: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      690: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1101: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
});