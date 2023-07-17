window.addEventListener('DOMContentLoaded', (event) => {

  const hasCounter = document.querySelectorAll('.js_has-counter');
  hasCounter.forEach(isCounter => {
    const onlyNumber = isCounter.innerHTML.replace(/[^\d\s]/g, '').trim();

    const numberToTarget = onlyNumber.replace(/\D/g, '');

    isCounter.innerHTML =  isCounter.innerHTML.replace(onlyNumber, `<span class="js_counter" data-target="${numberToTarget}">0</span>`);
  })

  const counters = document.querySelectorAll('.js_counter');

  function animateValue(element, target) {
    let start = 0;
    const duration = 2000; // Продолжительность анимации в миллисекундах

    const step = (timestamp) => {
      if (!start) start = timestamp;

      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      const formattedValue = formatNumber(Math.floor(percentage * target));
      element.textContent = formattedValue;

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        element.dataset.animating = 'false'; // Маркер завершения анимации
        element.dataset.finished = 'true'
      }
    };

    requestAnimationFrame(step);
  }

  function handleScroll() {
    counters.forEach(counter => {
      if (counter.dataset.finished === 'true') return;
      const position = counter.getBoundingClientRect();
      const target = parseInt(counter.dataset.target);
      if (isNaN(target)) return;

      const animating = counter.dataset.animating || 'false';
      if (position.top < window.innerHeight && animating === 'false') {
        counter.dataset.animating = 'true'; // Маркер запуска анимации
        animateValue(counter, target);
      }
    });
  }

  function formatNumber(number) {
    const thousandsSeparator = ' '; // Здесь можно указать любой другой символ, например: ' '
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  }

  window.addEventListener('scroll', handleScroll);
});