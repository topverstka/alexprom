"use strict";

/**
 * Lazy Load
 */
import "./libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();

window.mediaSizes = {
  desktopM: 1536,
  laptop: 1100,
  tabletM: 768,
  mobileXl: 690,
  mobileL: 420,
}

/**
 * Fancybox
 */ 
// import { Fancybox, Carousel } from "@fancyapps/ui";
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
Fancybox.bind('[data-fancybox]', {
  Toolbar: {
    display: [
      "close",
    ],
  },
});

/**
 * Маска телефона
 */
import "./libs/inputmask.js";
const telInputs = document.querySelectorAll('input[type="tel"]');
telInputs.forEach(tel => {
  const maskOptions = {
    mask: '+7(999) 999-99-99',
    inputmode: 'tel',
  };

  new Inputmask(maskOptions).mask(tel);
})

import "./b_helpers/parallax-helpers.js";
import "./b_helpers/smooth-anchors.js";

import "./b_components/header/burger.js";

import "./libs/swiper-bundle.min.js";

import "./alp_components/gallery.js";

import "./alp_sections/experience.js";
import "./alp_sections/reviews.js";
import "./alp_sections/locations.js";
import "./alp_sections/staff.js";

import "./b_components/groupers/bayan.js";
import "./b_components/spawners/b_modal.js";
import "./b_components/controls/formich.js";


// pages
import "./alp_sections/project-highlights.js";
