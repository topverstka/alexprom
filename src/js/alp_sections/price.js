window.addEventListener('DOMContentLoaded', (event) => {
	const priceButtons = document.querySelectorAll('.price-table__link');

	priceButtons.forEach(button => {

		button.addEventListener('click', () => {
			const service = button.closest('.price-table__row')
			const columns = [...service.querySelectorAll('.price-table__item')];

			let serviceName = columns[0]
			if (serviceName) {
				serviceName = columns[0].querySelector('.price-table__link').innerText;
				serviceName = serviceName.toLowerCase();
			}
			let servicePrice = columns[1]
			if (servicePrice) {
				servicePrice = columns[1].querySelector('.price-table__qt').innerText;
				servicePrice = servicePrice.toLowerCase();

		    servicePrice = servicePrice.replace('²', '<span class="font-default">²</span>')
			}

			const modalService = document.querySelector('.modal-service');
			if (modalService) {
				const title = modalService.querySelector('.modal-service__name');
				const field = modalService.querySelector('[name="service_name"]');

				title.innerHTML = `${serviceName} <br> по цене ${servicePrice}`;
				field.value = `${serviceName} по цене ${servicePrice}`;
			}
		})


	})
});