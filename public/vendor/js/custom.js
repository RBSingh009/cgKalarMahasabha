/**
 * Donar - NonProfit Charity HTML Template
 * Author: themevillage
 **/

'use strict';

(function ($) {

  //Lenis Scroll 
  const lenis = new Lenis({
    autoRaf: true,
  });

  //Preloader
  $(window).on('load', function () {
    var $preloader = $('#preloader');
    if ($preloader.length) $preloader.hide();
    $('body').css('overflow', 'visible');
  });

  // Select navbar and offcanvas elements
  var $navOffCanvasBtn = $('.offcanvas-nav-btn');
  var $navOffCanvas = $('.navbar:not(.navbar-clone) .offcanvas-nav');
  var bsOffCanvas;

  // Function to toggle the offcanvas
  function toggleOffCanvas() {
    if (bsOffCanvas) {
      bsOffCanvas._isShown ? bsOffCanvas.hide() : bsOffCanvas.show();
    }
  }

  // Initialize offcanvas if it exists
  if ($navOffCanvas.length) {
    bsOffCanvas = new bootstrap.Offcanvas($navOffCanvas[0], { scroll: true });
    $navOffCanvasBtn.on('click', toggleOffCanvas);
  }

  // Function to handle dropdown toggle
  function handleDropdownToggle(event) {
    const dropdownToggle = event.currentTarget;
    const submenu = dropdownToggle.nextElementSibling;

    // Close all open submenus
    if (!submenu.classList.contains("show")) {
      dropdownToggle
        .closest(".dropdown-menu")
        .querySelectorAll(".show")
        .forEach((el) => el.classList.remove("show"));
    }

    // Toggle the current submenu
    submenu.classList.toggle("show");

    // Handle closing of submenus on dropdown hide event
    const parentDropdown = dropdownToggle.closest("li.nav-item.dropdown.show");
    if (parentDropdown) {
      parentDropdown.addEventListener("hidden.bs.dropdown", () => {
        document.querySelectorAll(".dropdown-submenu .show").forEach((el) => el.classList.remove("show"));
      });
    }

    // Prevent the default action and stop event propagation
    event.preventDefault();
    event.stopPropagation();
  }

  // Attach event listeners to dropdown toggles
  document.querySelectorAll(".dropdown-menu a.dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", handleDropdownToggle);
  });

  /**============================================
   *  Sticky Menu
   */
  $(window).on('scroll', function () {
    var $stickyHeight = $('.sticky-height');
    var $headerNavWrapper = $('.header-nav-wrapper');
    if (!$headerNavWrapper.length) return;

    var headerWrapperHeight = $headerNavWrapper.outerHeight();
    var $topHeader = $('.header-top');
    var topHeaderHeight = $topHeader.length ? $topHeader.outerHeight() : 0;
    var targetScroll = topHeaderHeight + 200;

    if ($(window).scrollTop() > targetScroll) {
      $headerNavWrapper.addClass('scroll-on');
      if ($stickyHeight.length) $stickyHeight.css('height', headerWrapperHeight + 'px');
    } else {
      $headerNavWrapper.removeClass('scroll-on');
      if ($stickyHeight.length) $stickyHeight.css('height', '0');
    }
  });



  /**==========================================
   * Offcanvsa Menu
   */
  $(".canvas-menu .navbar .dropdown-toggle").append('<i class="fas fa-angle-down"></i>');
  $(".canvas-menu .submenu").before('<i class="fas fa-angle-down switcher"></i>');
  $(".vertical-menu li i.switcher").on('click', function () {
    var $submenu = $(this).next(".submenu");
    $submenu.slideToggle(300);
    $submenu.parent().toggleClass("openmenu");
  });

  $("button.burger-menu").on('click', function () {
    $(".canvas-menu").toggleClass("open");
    $(".main-overlay").toggleClass("active");
  });

  $(".canvas-menu .canvas-close, .main-overlay").on('click', function () {
    $(".canvas-menu").removeClass("open");
    $(".main-overlay").removeClass("active");
  });

  // Initialize PureCounter
  new PureCounter();



  $(document).ready(function () {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.5
    });
  });
  /**============================================
 * FancyBox Init
 */
  if (typeof Fancybox !== 'undefined' && Fancybox.bind) {
    Fancybox.bind('[data-fancybox]', {
      Thumbs: { autoStart: false },
      Toolbar: { display: ['close'] },
      animated: true,
    });
  }
  //Social Share

  const plusButtons = document.querySelectorAll('.social-share .plus');

  plusButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const parent = btn.closest('.team-entry2');

      // Remove active class from all other .team-entry2 elements
      document.querySelectorAll('.team-entry2.active').forEach(active => {
        if (active !== parent) active.classList.remove('active');
      });

      // Toggle active class on current one
      parent.classList.toggle('active');
    });
  });

  var heroSlider1 = new Swiper('.hero-slider1', {
    slidesPerView: 1,
    loop: true,
    speed: 1500,
    spaceBetween: 0,
    effect: 'fade',

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    fadeEffect: {
      crossFade: true,
    },
  });

  /**============================================
 * Hero Slider 2
 */
 
var heroSlider2 = new Swiper('.hero-slider2', {
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  loop: true,
  speed: 1000,
  effect: "creative",
  creativeEffect: {
    prev: {
      translate: ["-2%", 0, 0],
      opacity: 0.7,
    },
    next: {
      translate: ["2%", 0, 0],
      opacity: 0.7,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
  /**============================================
 * Hero Slider
 */
  var reviewCarousel = new Swiper('.review-carousel', {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    effect: 'creative',
    creativeEffect: {
      prev: {
        translate: ['-120%', 0, -400],
      },
      next: {
        translate: ['120%', 0, -400],
      },
    },

    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination-number",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return current + " / " + total;
      }
    },

  });

  /**============================================
   * Causes Slider
   */
  var causesSlider = new Swiper('.causes-carousel', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1500,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 4 },
      1550: { slidesPerView: 4 },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  /**============================================
    * Swiper Brands Slider
    */
  let brands = new Swiper('.brands-carousel', {
    loop: true,
    spaceBetween: 30,
    speed: 1500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      400: { slidesPerView: 2 },
      650: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 6 },
    },
  });
  /**============================================
   * Swiper Text Slide
   */
  var text_slide = new Swiper(".text-slide", {
    loop: true,
    freeMode: true, // Fixed: changed 'freemode' to 'freeMode'
    slidesPerView: 'auto',
    spaceBetween: 100,
    centeredSlides: true,
    allowTouchMove: false,
    speed: 6000,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
    },
  });


  /**============================================
   * Causes Slider
   */
  var causeSlider = new Swiper(".cause-slider", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 'auto',
    centeredSlides: true,
    effect: 'slide',
    speed: 1000, // transition duration in ms (1s)
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  var thumbs = [
    'images/rev1.png',
    'images/rev2.png',
    'images/rev3.png',
    'images/rev4.png'
  ];

  var reviewSlider = new Swiper(".review-slider2", {
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
    },
    effect: "flip",
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    },
    pagination: {
      el: ".review-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"><img src="' + thumbs[index] + '" alt=""></span>';
      }
    }
  });

  var causeSlider3 = new Swiper('.cause-slider3', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 1200,
    autoplay: {
      delay: 2500,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /**============================================
   * Brand Slider
   */
  var tp_brand_slide = new Swiper(".tp-brand-slider", { // Changed selector to avoid conflict
    loop: true,
    freeMode: true, // Fixed: changed 'freemode' to 'freeMode'
    slidesPerView: 'auto',
    spaceBetween: 165,
    centeredSlides: true,
    allowTouchMove: false,
    speed: 2000,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
    },
  });


  /** ===========================================
   * Product Thumb Gallery
   */
  var productThumb = new Swiper(".product-thumb", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // when window width is >= 640px
      320: {
        direction: "horizontal",
        slidesPerView: 3,
      },
      576: {
        direction: "vertical",
        slidesPerView: 4,
      },
    },
  })
  /** ===================================================
   * Product Cover Gallery
   */
  var ProductGallery = new Swiper(".coverItem", {
    spaceBetween: 10,
    thumbs: {
      swiper: productThumb,
    },
  })


  /**============================================
   * Product Cart Counter
   */
  $('.quantity').on('click', '.plus, .minus', function () {
    const $button = $(this);
    const $qtyInput = $button.closest('.quantity').find('.qty');

    let currentVal = parseFloat($qtyInput.val());
    let max = parseFloat($qtyInput.attr('max'));
    let min = parseFloat($qtyInput.attr('min'));
    let step = $qtyInput.attr('step');

    // Format values
    if (!currentVal || isNaN(currentVal)) currentVal = 1; // 👈 start from 1
    if (!max || isNaN(max)) max = '';
    if (!min || isNaN(min)) min = 1; // 👈 set minimum to 1
    if (step === 'any' || step === '' || step === undefined || isNaN(parseFloat(step))) step = 1;
    else step = parseFloat(step);

    const decimals = (step.toString().split('.')[1] || '').length;

    if ($button.hasClass('plus')) {
      if (max && currentVal >= max) {
        $qtyInput.val(max);
      } else {
        $qtyInput.val((currentVal + step).toFixed(decimals));
      }
    } else {
      if (currentVal <= min) {
        $qtyInput.val(min);
      } else {
        $qtyInput.val((currentVal - step).toFixed(decimals));
      }
    }
    $qtyInput.trigger('change');
  });

  //WOW JS
  new WOW().init();


  //nice select
  $('.tv-select').niceSelect();

  /**===============================
 * Scroll Top (jQuery Version)
 */


  function scrollTop() {
    const $scrollTopBtn = $('.scroll-top');
    const $progressPath = $('.scroll-top path');

    if ($scrollTopBtn.length && $progressPath.length) {
      const progressPath = $progressPath[0];
      const pathLength = progressPath.getTotalLength();

      // Set up the path for scroll progress indicator
      $progressPath.css({
        'transition': 'none',
        'stroke-dasharray': `${pathLength} ${pathLength}`,
        'stroke-dashoffset': pathLength
      });

      progressPath.getBoundingClientRect(); // Trigger reflow
      $progressPath.css('transition', 'stroke-dashoffset 10ms linear');

      const updateProgress = function () {
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const progress = pathLength - (scroll * pathLength / height);
        $progressPath.css('stroke-dashoffset', progress);
      };

      updateProgress();
      $(window).on('scroll', updateProgress);

      const offset = 50;

      $(window).on('scroll', function () {
        if ($(window).scrollTop() > offset) {
          $scrollTopBtn.addClass('show');
        } else {
          $scrollTopBtn.removeClass('show');
        }
      });

      $scrollTopBtn.on('click', function (event) {
        event.preventDefault();

        // Use jQuery's animate for smooth scrolling (simpler approach)
        $('html, body').animate({
          scrollTop: 0
        }, 600, 'swing');
      });
    }
  }
  $(document).ready(function () {
    scrollTop();
  });


  $(window).on('load', function () {

    var $grid = $('#gallery-container');

    // Initialize Isotope masonry
    $grid.isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer',
      }
    });

    // Filter items on menu click
    $('.portfolio-menu .nav-link').on('click', function (e) {
      e.preventDefault();

      var filterValue = $(this).attr('data-filter');

      $grid.isotope({ filter: filterValue });

      // Active class toggle
      $('.portfolio-menu .nav-link').removeClass('active');
      $(this).addClass('active');
    });
  });



})(jQuery);

// Initialize when document is ready

//# sourceMappingURL=custom.js.map
