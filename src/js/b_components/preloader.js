window.addEventListener('load', (event) => {
	const preloader = document.querySelector('.preloader');
	if (!preloader) return;

	preloader.classList.add('preloader--hidden');

	setTimeout(() => {
		preloader.remove();
	}, 2000)
})
