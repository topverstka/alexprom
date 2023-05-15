// Carousel

var swiper = new Swiper(".swiper-gallery", {
    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

// Mobile Menu

function openModalMenu() {
    document.getElementById("overlayMenu").style.visibility = "visible";
    document.body.style.overflow = "hidden";
}
function closeModalMenu() {
    document.getElementById("overlayMenu").style.visibility = "hidden";
    document.body.style.overflow = "auto";
}

// FAQ

const elements = document.querySelectorAll('.faq__item');

elements.forEach(element =>{
    let btn = element.querySelector('.faq__question');
    let icon = element.querySelector('.faq__question img');
    var answer = element.lastElementChild;
    var answers = document.querySelectorAll('.faq__item .faq__answer');
    btn.addEventListener('click', ()=>{
        answers.forEach(ans =>{
            let ansIcon = ans.parentElement.querySelector('.faq__question img');
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

