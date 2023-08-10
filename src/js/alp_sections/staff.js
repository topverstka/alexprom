window.addEventListener('DOMContentLoaded', (event) => {
	const staff = document.querySelector('.staff');
	if (!staff) return;

	const staffCarousel = new Swiper(".staff-carousel", {
    navigation: {
      nextEl: ".staff .swiper-button-next",
      prevEl: ".staff .swiper-button-prev",
    },
    grabCursor: true,
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
      },
      1537: {
        slidesPerView: 4,
        spaceBetween: 40,
      }
    },
  });
});