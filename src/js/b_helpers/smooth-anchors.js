import {isElementHasClasses} from "./action-helpers.js";
import {closeBurger} from "../b_components/header/burger.js";

const burgerClasses = [
    'header__nav-link',
];

function getTopOffset(percents = 100) {
    return window.innerHeight / 100 * percents;
}

function scrollToAnchor(percents = 9) {
    const linkElems = document.querySelectorAll('[href^="#"]')
    if (!linkElems) return;
    for (let i = 0; i < linkElems.length; i++) {
        const link = linkElems[i];
        link.addEventListener('click', (e) => {
            e.preventDefault()
            let href = link.getAttribute('href')
            if (!href || href == "#") return;
            let anchor = document.querySelector(href)
            if (!anchor) return;
            if (anchor.classList.contains('b_modal')) return

            if (isElementHasClasses(link, burgerClasses)) {
                closeBurger();
            }

            window.scroll({
                top: anchor.getBoundingClientRect().top + pageYOffset - getTopOffset(percents),
                left: 0,
                behavior: 'smooth'
            })
        })
    }
}
scrollToAnchor();