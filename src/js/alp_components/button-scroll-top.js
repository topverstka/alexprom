window.addEventListener('DOMContentLoaded', (event) => {
	const scrollButton = document.querySelector('.button-scroll-top');

	if (!scrollButton) return;

	window.addEventListener('scroll', () => {
	  // Получаем текущую позицию прокрутки страницы
	  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	  if (scrollTop > 1000) {
	  	scrollButton.classList.add('_show')
	  } else {
	  	scrollButton.classList.remove('_show')
	  }
	});

	scrollButton.addEventListener('click', () => {
	  scrollButton.classList.remove('_show');
	  window.scrollTo({ top: 0, behavior: 'smooth' });
	});	
});