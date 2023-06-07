window.addEventListener('DOMContentLoaded', (event) => {
  const experience = document.querySelector('.experience');
  if (!experience) return;

	let experienceGallery = new Swiper(".experience-gallery", {
    navigation: {
      nextEl: ".experience-slides .swiper-button-next",
      prevEl: ".experience-slides .swiper-button-prev",
    },
    grabCursor: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      690: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1441: {
        slidesPerView: 4,
        spaceBetween: 31,
      }
    },
  });

});
