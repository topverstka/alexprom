"use strict";

/**
 * Lazy Load
 */
import "./libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();

window.mediaSizes = {
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

import "./b_components/header/burger.js";

import "./libs/swiper-bundle.min.js";

import "./scripts/scripts.js";

import "./alp_components/gallery.js";

import "./alp_sections/experience.js";
import "./alp_sections/reviews.js";
import "./alp_sections/locations.js";

import "./b_components/groupers/bayan.js";
import "./b_components/spawners/b_modal.js";

