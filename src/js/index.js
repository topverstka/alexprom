"use strict";

/**
 * Lazy Load
 */
import "./libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();

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

import "./b_sections/experience.js";

import "./b_components/groupers/bayan.js";

