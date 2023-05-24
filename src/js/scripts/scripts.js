// Carousel

var swiper = new Swiper(".swiper-gallery", {
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
  
  // Mobile Menu
  
  function openModalMenu() {
    document.getElementById("overlayMenu").style.visibility = "visible";
    document.body.style.overflow = "hidden";
    document.body.style.padding = "0 calc(20px - (100vw - 100%)) 0 0";
  }
  function closeModalMenu() {
    document.getElementById("overlayMenu").style.visibility = "hidden";
    document.body.style.overflow = "auto";
    document.body.style.padding = "0";
  }
  
  // FAQ
  
  const elements = document.querySelectorAll('.faq__item');
  
  elements.forEach(element =>{
    let btn = element.querySelector('.faq__question');
    let icon = element.querySelector('.faq__question span:last-child');
    var answer = element.lastElementChild;
    var answers = document.querySelectorAll('.faq__item .faq__answer');
    btn.addEventListener('click', ()=>{
        answers.forEach(ans =>{
            let ansIcon = ans.parentElement.querySelector('.faq__question span:last-child');
            if(answer !== ans){
                ans.classList.add('hideText');
                ansIcon.className = '_close';
            }
        });
        answer.classList.toggle('hideText');
        icon.className === '_open' ? icon.className = '_close' 
        : icon.className ='_open';
    });
  });
  
  // Mobile Mask
  
  const input = document.querySelector(".mask-tel");
  
  const prefixNumber = (str) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
  };
  
  input.addEventListener("input", (e) => {
  const value = input.value.replace(/\D+/g, "");
  const numberLength = 11;
  
  let result;
  if (input.value.includes("+8") || input.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }
  
  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }
  input.value = result;
  });
  