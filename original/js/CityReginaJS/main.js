'use strict';

(function ($) {
    var SELECTOR_ITEM = '[data-js="accordionItem"]';
    var SELECTOR_BODY = '[data-js="accordionItemBody"]';
    var SELECTOR_TOGGLE = '[data-js="accordionItemToggle"]';
    var SELECTOR_MORE_TEXT = '[data-js="accordionItemMoreLessText"]';
    var SELECTOR_MORE_ICON = '[data-js="accordionItemMoreLessIcon"]';

    var TEXT_LESS = 'Less';
    var TEXT_MORE = 'More';
    var ICON_LESS = '-';
    var ICON_MORE = '+';

    var toggleState = function toggleState($el) {
        var isCollapsed = !$el.find(SELECTOR_BODY).is(':visible');
        if (isCollapsed) {
            $el.find(SELECTOR_BODY).slideDown();
            $el.find(SELECTOR_MORE_TEXT).html(TEXT_LESS);
            $el.find(SELECTOR_MORE_ICON).html(ICON_LESS);
        } else {
            $el.find(SELECTOR_BODY).slideUp();
            $el.find(SELECTOR_MORE_TEXT).html(TEXT_MORE);
            $el.find(SELECTOR_MORE_ICON).html(ICON_MORE);
        }
    };

    var handleClick = function handleClick(e) {
        e.preventDefault();
        var $el = $(e.target).closest(SELECTOR_ITEM);
        toggleState($el);
    };

    var init = function init() {
        $(SELECTOR_BODY).hide();
        $(SELECTOR_TOGGLE).show();
    };

    $(window).on('load', init);
    $(document).on('click', SELECTOR_TOGGLE, handleClick);
})(jQuery);
'use strict';

//(function ($, store) {
(function ($) {
    var handleAjax = function handleAjax($el) {
        return function (markup) {
            $el.append(markup).css({ opacity: 1 });
            // Trigger resize so body top padding is updated to reflect new alert height
            $(window).trigger('resize');
        };
    };

    var initAjax = function initAjax(index, value) {
        var $el = $(value);
        var url = $el.attr('data-url');
        var uuid = $el.attr('data-uuid');
        //var userHiddenAlerts = store.get('userHiddenAlerts');
        var isUserHidden = userHiddenAlerts && userHiddenAlerts.indexOf(uuid) !== -1;

        if (isUserHidden) {
            return;
        }

        $.get(url).then(handleAjax($el));
    };

    var handleLoad = function handleLoad() {
        $('[data-js="alertEmergency"]').each(initAjax);
    };

    var setHiddenState = function setHiddenState($el) {
        var uuid = $el.attr('data-uuid');
        //var userHiddenAlerts = store.get('userHiddenAlerts') || [];
        var isUserHidden = userHiddenAlerts.indexOf(uuid) !== -1;

        if (!isUserHidden) {
            userHiddenAlerts.push(uuid);
            //store.set('userHiddenAlerts', userHiddenAlerts);
        }
    };

    var close = function close($el) {
        $el.closest('[data-js="alertEmergency"]').html('');
        $(window).trigger('resize');
    };

    var handleClose = function handleClose() {
        var $el = $(this);
        setHiddenState($el);
        close($el);
    };

    $(window).on('load', handleLoad);
    $(document).on('click', '[data-js="alertEmergencyClose"]', handleClose);
//})(jQuery, store);
})(jQuery);
'use strict';

(function ($, Swiper) {
    var initCarouselAds = function initCarouselAds() {
        var $carousel = $(this);
        var $slides = $carousel.find('.carousel-item').clone();
        var $content = $slides.wrap('<div class="swiper-slide" />').parent().wrapAll('<div class="carousel--ads swiper-container-wrapper" data-js="carouselAdsWrapper"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div>').parent().parent().parent();
        $carousel.replaceWith($content);
    };

    var initCarouselAdsWrapper = function initCarouselAdsWrapper() {
        var $wrapper = $(this);
        var swiperContainer = $wrapper.find('.swiper-container')[0];
        var swiper = new Swiper(swiperContainer, { // eslint-disable-line no-unused-vars
            speed: 1000,
            effect: 'fade',
            autoplay: {
                delay: 10000,
                disableOnInteraction: false
            }
        });
    };

    var init = function init() {
        // eslint-disable-line no-unused-vars
        // We will use scrollable below 768
        $('[data-js="carouselAds"]').each(initCarouselAds);
        $('[data-js="carouselAdsWrapper"]').each(initCarouselAdsWrapper);
    };

    $(window).on('load', init);
//})(jQuery, Swiper);
})(jQuery);
'use strict';

(function ($, Swiper) {
    var initCarousel = function initCarousel() {
        var $carousel = $(this);
        var $slides = $carousel.find('> div').clone();
        var $numSlides = $carousel.data('js-slides');
        var $content = $slides.wrap('<div class="swiper-slide" />').parent().wrapAll('<div class="carousel--default swiper-container-wrapper" data-js="carouselWrapper" data-js-slides="' + $numSlides + '"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div>').parent().parent().parent().append('<div class="swiper-pagination" />').append('<div class="swiper-prev button-3"><i class="fa fa-icon-chevron"></i></div>').append('<div class="swiper-next button-3"><i class="fa fa-icon-chevron"></i></div>');
        $carousel.replaceWith($content);
    };

    var initCarouselWrapper = function initCarouselWrapper() {
        var $wrapper = $(this);
        var $numSlides = $wrapper.data('js-slides');

        var swiperContainer = $wrapper.find('.swiper-container')[0];
        var swiperButtonNext = $wrapper.find('.swiper-next')[0];
        var swiperButtonPrev = $wrapper.find('.swiper-prev')[0];
        var swiperPagination = $wrapper.find('.swiper-pagination')[0];
        var swiper = new Swiper(swiperContainer, { // eslint-disable-line no-unused-vars
            slidesPerView: $numSlides,
            spaceBetween: 25,
            slidesPerGroup: 1,
            watchOverflow: true,
            loop: false,
            init: true,
            observer: true,
            observeParents: true,
            keyboard: {
                enabled: true
            },
            pagination: {
                el: swiperPagination
            },
            navigation: {
                nextEl: swiperButtonNext,
                prevEl: swiperButtonPrev
            },
            breakpoints: {
                450: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    };

    var init = function init() {
        // eslint-disable-line no-unused-vars
        // We will use scrollable below 768
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('[data-js="carousel"]').each(initCarousel);
            $('[data-js="carouselWrapper"]').each(initCarouselWrapper);
        }
    };

    $(window).on('load', init);
//})(jQuery, Swiper);
})(jQuery);
'use strict';

(function ($, Swiper, debounce) {
    var transformTop = function transformTop($el) {
        var $slides = $el.find('> div').clone();
        var $content = $slides.wrap('<div class="swiper-slide" />').parent().wrapAll('<div class="carousel--photo-top swiper-container-wrapper" data-js="carouselPhotoTopWrapper"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div>').parent().parent().parent().append('<div class="swiper-pagination" />').append('<div class="swiper-prev button-3"><i class="fa fa-icon-chevron"></i></div>').append('<div class="swiper-next button-3"><i class="fa fa-icon-chevron"></i></div>');
        $el.replaceWith($content);

        return $content;
    };

    var transformBottom = function transformBottom($el) {
        var $slides = $el.find('> div').clone();
        var $content = $slides.wrap('<div class="swiper-slide" />').parent().wrapAll('<div class="carousel--photo-bottom swiper-container-wrapper" data-js="carouselPhotoBottomWrapper"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div>').parent().parent().parent();
        $el.replaceWith($content);

        return $content;
    };

    var initTop = function initTop($el, swiperBottom) {
        var $wrapper = $el;
        var swiperContainer = $wrapper.find('.swiper-container')[0];
        var swiperButtonNext = $wrapper.find('.swiper-next')[0];
        var swiperButtonPrev = $wrapper.find('.swiper-prev')[0];
        var swiperPagination = $wrapper.find('.swiper-pagination')[0];
        var swiper = new Swiper(swiperContainer, { // eslint-disable-line no-unused-vars
            slidesPerView: 1,
            autoHeight: true,
            loop: false,
            init: false,
            keyboard: {
                enabled: true
            },
            pagination: {
                el: swiperPagination,
                type: 'fraction'
            },
            navigation: {
                nextEl: swiperButtonNext,
                prevEl: swiperButtonPrev
            },
            thumbs: {
                swiper: swiperBottom
            }
        });

        swiper.on('slideChange', function () {
            var swiperThumbs = this.thumbs.swiper;
            var activeIndex = this.activeIndex;
            swiperThumbs.slideTo(activeIndex);
        });

        swiper.init();
        return swiper;
    };

    var initBottom = function initBottom($el) {
        var $wrapper = $el;
        var swiperContainer = $wrapper.find('.swiper-container')[0];
        var swiper = new Swiper(swiperContainer, { // eslint-disable-line no-unused-vars
            spaceBetween: 2,
            slidesPerView: 'auto',
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            init: false
        });
        swiper.init();
        return swiper;
    };

    var init = function init($carouselPhoto) {
        // eslint-disable-line no-unused-vars
        var $bottom = $carouselPhoto.find('[data-js="carouselPhotoBottom"]');
        var $top = $carouselPhoto.find('[data-js="carouselPhotoTop"]');

        var $contentBottom = transformBottom($bottom);
        var $contentTop = transformTop($top);

        initTop($contentTop, initBottom($contentBottom));
    };

    var update = function update() {
        $('[data-js="carouselPhotoTopWrapper"] .swiper-container').each(function (index, swiperContainer) {
            swiperContainer.swiper.update();
        });
    };

    //var handleAfterImagesLazyLoaded = debounce(update, 100);

    var handleModalOpen = function handleModalOpen(event, $modalEl) {
        // Check if showing carouselPhoto
        var $carouselPhoto = $modalEl.find('[data-js="carouselPhoto"]');
        if (!$carouselPhoto.length) {
            return;
        }
        // Check if needs initialization
        if (!$carouselPhoto.data('isInited')) {
            $carouselPhoto.data('isInited', true);
            init($carouselPhoto);
        } else {
            update();
        }
    };

    var handleInit = function handleInit() {
        init($('[data-js="carouselPhoto"]'));
    };

    $(document).on('COR:modal:open', handleModalOpen);
    $(document).on('COR:carouselPhotos:init', handleInit);
    //$(document).on('lazyloaded', handleAfterImagesLazyLoaded);
//})(jQuery, Swiper, window.debounce);
})(jQuery);
'use strict';

(function ($, Swiper) {
    // Carousel Initialization
    var initCarouselFeaturedAlerts = function initCarouselFeaturedAlerts() {
        var $carousel = $(this);
        var $slides = $carousel.find('.carousel-item').clone();
        var $content = $slides.wrap('<div class="swiper-slide" />').parent().wrapAll('<div class="carousel--featured-alerts swiper-container-wrapper" data-js="carouselFeaturedAlertsWrapper"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div>').parent().parent().parent();
        $carousel.replaceWith($content);
    };
    var sliders = [];

    var initCarouselFeaturedAlertsWrapper = function initCarouselFeaturedAlertsWrapper(i) {
        var $wrapper = $(this);
        var swiperContainer = $wrapper.find('.swiper-container')[0];
        sliders[i] = new Swiper(swiperContainer, { // eslint-disable-line no-unused-vars
            speed: 600,
            effect: 'fade',
            autoplay: {
                delay: 10000,
                disableOnInteraction: false
            }
        });
    };

    var handleAjax = function handleAjax($el) {
        return function (markup) {
            $el.append(markup).css({ opacity: 1 });
            $('[data-js="carouselFeaturedAlerts"]').each(initCarouselFeaturedAlerts);
            $('[data-js="carouselFeaturedAlertsWrapper"]').each(initCarouselFeaturedAlertsWrapper);

            // Trigger resize so body top padding is updated to reflect new alert height
            $(window).trigger('resize');
        };
    };

    var initAjax = function initAjax(index, value) {
        var $el = $(value);
        var url = $el.attr('data-ajax-append');
        var handleAjaxResponse = handleAjax($el);

        $.get(url).then(handleAjaxResponse);

        if ($el.is('[data-ajax-append-alt]') && $('.page-banner__alerts').length) {
            var handleAltAjaxResponse = handleAjax($('.page-banner__alerts .featured-alert--banner--wrapper'));
            var altUrl = $el.attr('data-ajax-append-alt');

            $.get(altUrl).then(handleAltAjaxResponse);
        }
    };

    var handleLoad = function handleLoad() {
        $('[data-js="carouselFeaturedAlertLanding"]').each(initAjax);
        $('[data-js="carouselFeaturedAlertPage"]').each(initAjax);
    };

    var $mobile = 1024;
    var prevWidth = window.innerWidth;
    var handleResize = function handleResize() {
        var largeToSmallViewport = window.innerWidth <= $mobile && prevWidth > $mobile;
        var smallToLargeViewport = window.innerWidth > $mobile && prevWidth <= $mobile;
        if (largeToSmallViewport || smallToLargeViewport) {
            for (var i = 0; i < sliders.length; i++) {
                $('.carousel--featured-alerts .swiper-container').each(function (index, swiperContainer) {
                    swiperContainer.swiper.update();
                    swiperContainer.swiper.autoplay.stop();
                    swiperContainer.swiper.autoplay.start();
                });
            }
        }
        prevWidth = window.innerWidth;
    };

    $(window).on('load', handleLoad);
    $(window).on('resize', handleResize);
//})(jQuery, Swiper);
})(jQuery);
'use strict';

(function ($, autosize) {
    var init = function init() {
        //autosize($('textarea'));
    };

    $(window).on('load', init);
})(jQuery, window.autosize);
'use strict';

(function ($) {
    function Links() {
        // PRIVATE
        var handleTransition = function handleTransition(e) {
            var $el = $(e.currentTarget);
            var targetClasses = ['.button-1', '.button-2', '.button-3', '.button-4', '.button-5', '.button-6', '.button-7', '.button-8'].join(',');

            if ($el.is(targetClasses) || $el.closest('.nav-secondary').length) {
                $el.addClass('button--active');
                $el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    $el.removeClass('button--active');
                });
            }
        };

        // Find external domains or pdf's and set rel="external" on the link.
        var initExternalLinks = function initExternalLinks() {
            $('a[href^=http]:not([rel~="external"]').each(function () {
                if (this.href.indexOf(window.location.hostname) === -1 || this.href.indexOf('.' + window.location.hostname) !== -1) {
                    $(this).attr('rel', 'external');
                }
            });
            $('a[href$=pdf]').each(function () {
                $(this).attr('rel', 'external');
            });
            $('a[href$=png], a[href$=jpg], a[href$=jpeg], a[href$=gif]').each(function () {
                $(this).attr('rel', 'external');
            });
        };

        // Find mailto links and open in a new window.
        var initMailtoLinks = function initMailtoLinks() {
            $('a[href^="mailto:"]').each(function () {
                if (this.href.indexOf('mailto:') === 0) {
                    $(this).attr('rel', 'external');
                }
            });
        };

        var initRelAttributes = function initRelAttributes() {
            $('a[rel~="external"]:not(a[rel~="noopener"])').attr('rel', 'external noopener');
            $('a[rel~="noopener"]:not(a[rel~="external"])').attr('rel', 'external noopener');
        };

        var initTargetBlank = function initTargetBlank() {
            $('a[rel~="external"]').attr('target', '_blank');
        };

        var initImageClass = function initImageClass() {
            $('a[rel~="external"] > img').parent().addClass('link-document');
        };

        // PUBLIC
        var init = function init() {
            initExternalLinks();
            initMailtoLinks();
            initRelAttributes();
            initTargetBlank();
            initImageClass();
        };

        // EVENTS
        $(document).off('click', 'a');
        $(document).on('click', 'a, button', handleTransition);

        return {
            init: init
        };
    }

    $(window).on('load', Links().init());
})(jQuery);
'use strict';

(function ($) {
    var handleTriggerClick = function handleTriggerClick(e) {
        e.preventDefault();
        var href = $(e.currentTarget).attr('href');
        $('[data-js="modalGatewayContinue"]').attr('href', href);
        $('[data-js="modalGatewayContainer"]').modal({
            fadeDuration: 250,
            clickClose: false,
            closeText: '',
            closeClass: 'modal__close'
        });
        return false;
    };

    $(document).on('click', '[data-js="modalGatewayTrigger"]', handleTriggerClick);
})(jQuery);
'use strict';

(function ($) {
    var handleModalOpen = function handleModalOpen(event, modal) {
        // Trigger open event so carousel knows to initialize
        var $modalEl = modal.$elm;
        if ($modalEl.is('[data-js="modalPhotosContainer"]')) {
            $(document).trigger('COR:modal:open', [$modalEl]);
        }
    };

    var handleTriggerClick = function handleTriggerClick() {
        $(this).modal({
            fadeDuration: 250,
            clickClose: false,
            closeText: '',
            closeClass: 'modal__close'
        });
        return false;
    };

    //$(document).on($.modal.OPEN, handleModalOpen);
    $(document).on('click', '[data-js="modalPhotosTrigger"]', handleTriggerClick);
})(jQuery);
'use strict';

(function ($) {
    var handleTriggerClick = function handleTriggerClick() {
        $(this).modal({
            fadeDuration: 250,
            clickClose: false,
            closeText: '',
            closeClass: 'modal__close'
        });
        return false;
    };

    $(document).on('click', '[data-js="modal"]', handleTriggerClick);
})(jQuery);
'use strict';

(function ($) {
    var init = function init() {
        $('.nav--move-down').click(function (e) {
            e.preventDefault();
            var offsetHeight = $('.page-banner__nav-bottom').offset().top > 0 ? $('.page-banner__nav-bottom').offset().top : $('.page-banner__nav-home').offset().top;
            $([document.documentElement, document.body]).animate({
                scrollTop: offsetHeight - $('.page-header').height() + 2
            }, 2000);
        });
    };

    $(window).on('load', init);
})(jQuery);
'use strict';

(function ($) {
    var handleClick = function handleClick(e) {
        e.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 1000);
    };

    var handleVisibility = function handleVisibility() {
        var bodyScrolled = window.scrollY || window.pageYOffset;
        if (bodyScrolled > 100) {
            $('.nav--move-top').removeClass('hide');
        } else {
            $('.nav--move-top').addClass('hide');
        }
    };

    $(document).on('click', '.nav--move-top', handleClick);
    $(window).on('scroll', handleVisibility);
})(jQuery);
'use strict';

(function ($) {
    var SELECTOR_OFFCANVAS_BG = '.offcanvas-bg';
    var SELECTOR_LINKS = '[data-js="navPrimaryLinks"] > a';
    var SELECTOR_CONTENT_BG = '[data-js="navPrimaryContentBg"]';
    var SELECTOR_HEADER_BG = '[data-js="pageHeaderBg"]';
    var SELECTOR_CONTENT_PANES = '[data-js="navPrimaryContentPanes"] > div';

    var CLASS_BUTTON_ACTIVE = 'button--active';
    var CLASS_CONTENT_BG_OPEN = 'open';
    var CLASS_OFFCANVAS_OPEN = 'is-open';

    var KEY_ESC = 27;
    var KEY_ENTER = 13;

    var adjustPadding = function adjustPadding() {
        var height = $(SELECTOR_HEADER_BG).outerHeight();
        $('body').css('padding-top', height);
    };

    var playRipple = function playRipple($el) {
        $el.addClass(CLASS_BUTTON_ACTIVE);
        $el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            $el.removeClass(CLASS_BUTTON_ACTIVE);
        });
    };

    var selectNone = function selectNone() {
        // turn off elements
        $(SELECTOR_CONTENT_PANES).attr('hidden', true);
        $(SELECTOR_LINKS).attr('aria-expanded', false);
        // turn off bgs
        $(SELECTOR_CONTENT_BG).removeClass(CLASS_CONTENT_BG_OPEN);
        $(SELECTOR_OFFCANVAS_BG).removeClass(CLASS_OFFCANVAS_OPEN);
    };

    var setMaxHeight = function setMaxHeight() {
        var menuTopY = $(SELECTOR_CONTENT_BG).offset().top - $(window).scrollTop();
        var maxHeight = $(window).height() - menuTopY;
        $(SELECTOR_CONTENT_BG).css({ maxHeight: maxHeight });
    };

    var selectOne = function selectOne($el) {
        // turn off elements
        $(SELECTOR_CONTENT_PANES).attr('hidden', true);
        $(SELECTOR_LINKS).attr('aria-expanded', false);
        // turn on element
        $el.attr('aria-expanded', true);
        $('#' + $el.attr('aria-controls')).removeAttr('hidden');
        // turn on bgs
        setMaxHeight();
        $(SELECTOR_CONTENT_BG).addClass(CLASS_CONTENT_BG_OPEN);
        $(SELECTOR_OFFCANVAS_BG).addClass(CLASS_OFFCANVAS_OPEN);
    };

    var handleClick = function handleClick(e) {
        e.preventDefault();

        playRipple($(this));
        if ($(this).attr('aria-expanded') === 'true') {
            selectNone();
        } else {
            selectOne($(this));
        }
    };

    var handleBgClick = function handleBgClick(e) {
        // if click was not on menu content panes or links or their children
        if (!$(e.target).closest(SELECTOR_CONTENT_PANES).length) {
            if (!$(e.target).closest(SELECTOR_LINKS).length) {
                selectNone();
            }
        }
    };

    var handleKeyUp = function handleKeyUp(e) {
        if (e.keyCode === KEY_ESC) {
            if ($(SELECTOR_LINKS).filter('[aria-expanded="true"]').length) {
                e.preventDefault();
                selectNone();
            }
        }
        if (e.keyCode === KEY_ENTER) {
            if ($(e.target).is(SELECTOR_LINKS)) {
                e.preventDefault();
                selectOne($(e.target));
            }
        }
    };

    $(document).on('click', SELECTOR_LINKS, handleClick);
    $(document).on('click touchend', 'body', handleBgClick);
    $(document).on('keyup', 'body', handleKeyUp);
    $(window).on('resize', adjustPadding);
})(jQuery);
'use strict';

(function ($) {
    var clearHeight = function clearHeight($ul) {
        $ul.css({
            transition: 'none',
            maxHeight: 'none'
        });
    };

    var findHeight = function findHeight($ul) {
        return $ul.outerHeight();
    };

    var setMaxHeight = function setMaxHeight($ul, height) {
        $ul.css({ maxHeight: height });
    };

    var setMinHeight = function setMinHeight($ul) {
        $ul.removeAttr('style').css({
            maxHeight: 0
        });
    };

    var collapse = function collapse($li) {
        var $ul = $li.find('> ul');
        clearHeight($ul);
        var height = findHeight($ul);
        setMaxHeight($ul, height);
        window.setTimeout(function () {
            setMinHeight($ul);
        }, 1);
        window.setTimeout(function () {
            $ul.removeAttr('style');
            $li.attr('aria-expanded', false);
        }, 500);
    };

    var expand = function expand($li) {
        var $ul = $li.find('> ul');
        $li.attr('aria-expanded', true);
        clearHeight($ul);
        var height = findHeight($ul);
        setMinHeight($ul);
        window.setTimeout(function () {
            setMaxHeight($ul, height);
        }, 1);
        window.setTimeout(function () {
            $ul.removeAttr('style');
        }, 500);
    };

    var handleClick = function handleClick(e) {
        var isIcon = $(e.target).is('[data-js="navExpandIcon"]');

        if (!isIcon) {
            return;
        }

        var isExpanded = $(this).attr('aria-expanded') === 'true';

        e.preventDefault();
        e.stopPropagation();

        if (isExpanded) {
            collapse($(this));
        } else {
            expand($(this));
        }
    };

    $(document).on('click', '[data-js="navExpand"]', handleClick);
})(jQuery);
'use strict';

(function ($) {
    var KEYS = {
        leftArrow: 37,
        rightArrow: 39
    };

    function getCurrentTab($container) {
        return $container.find('[aria-selected="true"]');
    }

    function getNextTabIndex($tab) {
        return $tab.next().length ? $tab.next().index() : 0;
    }

    function getPrevTabIndex($tab, lastIndex) {
        return $tab.prev().length ? $tab.prev().index() : lastIndex;
    }

    function selectNone($tab, $tabpanel) {
        $tab.attr('aria-selected', false);
        $tab.attr('tab-index', -1);
        $tabpanel.attr('tab-index', -1);
        $tabpanel.attr('hidden', 'hidden');
    }

    function selectOne($tab, $tabpanel) {
        $tab.attr('aria-selected', true);
        $tab.attr('tab-index', 0);
        $tab.focus();
        $tabpanel.attr('tab-index', 0);
        $tabpanel.removeAttr('hidden');
    }

    function selectPanel($container, tabindex) {
        var $tab = $container.find('[role=tab]');
        var $tabpanel = $container.find('[role=tabpanel]');
        selectNone($tab, $tabpanel);
        selectOne($tab.eq(tabindex), $tabpanel.eq(tabindex));
    }

    var handleKeyUp = function handleKeyUp(e) {
        e.preventDefault();

        var $container = $(e.delegateTarget);
        var $tab = getCurrentTab($container);

        switch (e.keyCode) {
            case KEYS.rightArrow:
                selectPanel($container, getNextTabIndex($tab));
                break;
            case KEYS.leftArrow:
                selectPanel($container, getPrevTabIndex($tab, $container.find('[role=tab]').length - 1));
                break;
        }
    };

    var handleClick = function handleClick(e) {
        e.preventDefault();
        var $tab = $(e.currentTarget);
        selectPanel($(e.delegateTarget), $tab.index());
    };

    $(document).on('keyup', '[data-js="navTabs"]', handleKeyUp);
    $(document).on('click', '[data-js="navTabs"] [role=tab]', handleClick);
})(jQuery);
'use strict';

(function ($) {
    var SELECTOR_MENU = '[data-js="offcanvasMenu"]';
    var SELECTOR_BG = '[data-js="fullPageBg"]';
    var SELECTOR_MENU_CONTENT = '[data-js="offcanvasMenu"] [data-ajax-append]';
    var SELECTOR_SUB_MENU_ID = 'quick-links-navigation';

    var CLASS_OPEN = 'is-open';
    var CLASS_CLOSED = 'is-closed';

    var KEY_ESC = 27;

    var load = function load() {
        var mobileNavUrl = $(SELECTOR_MENU_CONTENT).data('ajax-append');
        var content = $('#' + SELECTOR_SUB_MENU_ID).html();
        var addcontent = $(content).addClass('nav-mobile__quick-links');

        if (mobileNavUrl) {
            $.get(mobileNavUrl, function (markup) {
                $(SELECTOR_MENU_CONTENT).append(markup).css({ opacity: 1 });
                $(SELECTOR_MENU_CONTENT).append(addcontent).css({ opacity: 1 });

                $(SELECTOR_MENU).data('loaded', true);
                focus();
            }, 'html');
        }
    };

    var close = function close() {
        $(SELECTOR_BG).removeClass([CLASS_OPEN, CLASS_CLOSED]);
        $(SELECTOR_MENU).removeClass([CLASS_OPEN, CLASS_CLOSED]);
        $('body').css('overflow', 'auto');
        $(document).off('keyup', 'body', handleKeyUp);
    };
    var focus = function focus() {
        $(SELECTOR_MENU).find('a:first').focus();
    };
    var handleShowMenu = function handleShowMenu(e) {
        e.preventDefault();
        $(SELECTOR_BG).addClass(CLASS_OPEN).removeClass(CLASS_CLOSED);
        $(SELECTOR_MENU).addClass(CLASS_OPEN).removeClass(CLASS_CLOSED);
        $('body').css('overflow', 'hidden');
        $(document).on('keyup', 'body', handleKeyUp);
        if ($(SELECTOR_MENU).data('loaded')) {
            focus();
        } else {
            load();
        }
    };
    var handleHide = function handleHide(e) {
        e.preventDefault();
        $(SELECTOR_BG).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
        $(SELECTOR_MENU).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
    };
    var handleKeyUp = function handleKeyUp(e) {
        if (e.keyCode === KEY_ESC) {
            e.preventDefault();
            $(SELECTOR_BG).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
            $(SELECTOR_MENU).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
        }
    };
    var handleAnimationEnd = function handleAnimationEnd(e) {
        var animationName = e.originalEvent.animationName;
        if (animationName === 'fadeOut' || animationName === 'slideOut') {
            close();
        }
    };
    $(document).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', SELECTOR_MENU, handleAnimationEnd);
    $(document).on('click', '[data-js="overlayMenuOpen"]', handleShowMenu);
    $(document).on('click', '[data-js="overlayMenuClose"]', handleHide);
    $(document).on('keyup', SELECTOR_MENU, handleKeyUp);
})(jQuery);
'use strict';

(function ($) {
    var SELECTOR_SEARCH = '[data-js="offcanvasSearch"]';
    var SELECTOR_BG = '[data-js="fullPageBg"]';
    var SELECTOR_INPUT = '[data-js="overlaySearchOpenInput"]';

    var CLASS_OPEN = 'is-open';
    var CLASS_CLOSED = 'is-closed';

    var KEY_ESC = 27;

    var close = function close() {
        $(SELECTOR_BG).removeClass([CLASS_OPEN, CLASS_CLOSED]);
        $(SELECTOR_SEARCH).removeClass([CLASS_OPEN, CLASS_CLOSED]);
        $('body').css('overflow', 'auto');
        $(document).off('keyup', 'body', handleKeyUp);
    };
    var focus = function focus() {
        $(SELECTOR_SEARCH).find('input').focus();
    };
    var handleShowSearch = function handleShowSearch(e) {
        e.preventDefault();
        focus();
        $(SELECTOR_BG).addClass(CLASS_OPEN).removeClass(CLASS_CLOSED);
        $(SELECTOR_SEARCH).addClass(CLASS_OPEN).removeClass(CLASS_CLOSED);
        $('body').css('overflow', 'hidden');
        $(document).on('keyup', 'body', handleKeyUp);
    };
    var handleHide = function handleHide(e) {
        e.preventDefault();
        $(SELECTOR_BG).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
        $(SELECTOR_SEARCH).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
    };
    var handleKeyUp = function handleKeyUp(e) {
        if (e.keyCode === KEY_ESC) {
            e.preventDefault();
            $(SELECTOR_BG).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
            $(SELECTOR_SEARCH).addClass(CLASS_CLOSED).removeClass(CLASS_OPEN);
        }
    };
    var handleAnimationEnd = function handleAnimationEnd(e) {
        var animationName = e.originalEvent.animationName;
        if (animationName === 'fadeIn') {
            focus();
        }
        if (animationName === 'fadeOut' || animationName === 'slideOut') {
            close();
        }
    };
    $(document).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', SELECTOR_SEARCH, handleAnimationEnd);
    $(SELECTOR_INPUT).prop('readonly', true);
    $(document).on('click', '[data-js="overlaySearchOpen"]', handleShowSearch);
    $(document).on('click', '[data-js="overlaySearchClose"]', handleHide);
})(jQuery);
'use strict';

(function ($, slugg) {
    var OFFSET_PADDING = 20; // Add padding below fixed header

    var ID_PREFIX = 'outline-';

    var SELECTOR_PAGE_OUTLINE_LIST = '[data-js="pageOutlineLinks"]';
    var SELECTOR_PAGE_OUTLINE_LINK = '[data-js="pageOutlineLinks"] a';
    var SELECTOR_PAGE_HEADER = '[data-js="pageHeader"]';
    var SELECTOR_MAIN_HEADINGS = 'main h2';

    var addLinksToOutline = function addLinksToOutline() {
        var $pageOutlineList = $(SELECTOR_PAGE_OUTLINE_LIST);
        var $mainHeadingLinks = $(SELECTOR_MAIN_HEADINGS);
        $mainHeadingLinks.each(function (index, val) {
            var $mainHeading = $(val);
            var mainHeadingText = $mainHeading.text();
            // Get or generate id for fragment
            if (!$mainHeading.attr('id')) {
                $mainHeading.attr('id', ID_PREFIX + slugg(mainHeadingText));
            }
            if ($mainHeading.attr('id') !== 'rCw-title' && $mainHeading.closest('.container--empty').length === 0) {
                var mainHeadingId = $mainHeading.attr('id');
                var $pageOutlineListItemFragment = $('<li><a href="#' + mainHeadingId + '">' + mainHeadingText + '</a></li>');
                $pageOutlineList.append($pageOutlineListItemFragment);
            }
        });
    };

    var jumpToInitialFragment = function jumpToInitialFragment() {
        if (window.location.hash.indexOf(ID_PREFIX) !== -1) {
            scrollToId(window.location.hash);
        }
    };

    var scrollToId = function scrollToId(mainHeadingId) {
        var $mainHeading = $(mainHeadingId);
        var mainHeadingTopOffset = $mainHeading.offset().top || 0;
        var newHeight = $(SELECTOR_PAGE_HEADER).position().top + $(SELECTOR_PAGE_HEADER).height();
        window.location = mainHeadingId;
        document.documentElement.scrollTop = mainHeadingTopOffset - newHeight - OFFSET_PADDING;
    };

    var handleClick = function handleClick(e) {
        e.preventDefault();
        var mainHeadingId = $(e.currentTarget).attr('href');
        scrollToId(mainHeadingId);
    };

    var handleLoad = function handleLoad() {
        if ($(SELECTOR_PAGE_OUTLINE_LIST).length) {
            addLinksToOutline();
            jumpToInitialFragment();
        }
    };

    $(document).on('click', SELECTOR_PAGE_OUTLINE_LINK, handleClick);
    $(window).on('load', handleLoad);
})(jQuery, window.slugg);
'use strict';

(function ($, stickybits) {
    var init = function init() {
        var elements = document.querySelectorAll('.nav--move-down, .nav--move-top');
        //stickybits(elements, {
        //verticalPosition: 'bottom'
        //});
    };

    $(window).on('load', init);
})(jQuery, window.stickybits);
'use strict';

(function ($) {
    var templateCard = '<div class="animate-opacity"><div class="accordion">{{text}}</div></div>';

    var templateDetails = '\n  <details>\n    <summary>{{title}}</summary>\n    <div class="accordion__content">\n      {{text}}\n    </div>\n  </details>';

    var templateTable = '<div class="table--accordion"><table><tbody>{{text}}</tbody></table></div>';

    var findData = function findData($table) {
        /*
        [{
          title: "Account - 10038678",
          value: [{
            title: "Address",
            value: "2476 Victoria Avenue, Regina, SK S4P 3C8"
          }]
        }]
         */
        var data = [];
        var columnHeadings = $table.find('thead th, thead td').toArray();
        $table.find('tbody tr').each(function (rowIndex, row) {
            $(row).find('td, th').each(function (cellIndex, cell) {
                var columnHeading = $(columnHeadings[cellIndex]).text().trim();
                var cellText = $(cell).text();
                if (cellIndex === 0) {
                    var summaryText = columnHeading === '' ? cellText : [columnHeading, cellText].join(' - ');
                    data[rowIndex] = {
                        title: summaryText,
                        value: []
                    };
                } else {
                    data[rowIndex].value.push({
                        title: columnHeading,
                        value: cellText
                    });
                }
            });
        });
        return data;
    };

    var replaceWithAccordionForMobile = function replaceWithAccordionForMobile() {
        var $table = $(this);
        $table.addClass('display-table-sm');

        var summaryObjects = findData($table);

        // DETAIL
        var detailsHTML = summaryObjects.map(function (summaryObject) {
            // TR
            var rowHTML = summaryObject.value.map(function (detailsRowObject) {
                return '<tr><td>' + detailsRowObject.title + '</td><td>' + detailsRowObject.value + '</td></tr>';
            }).join('');
            // TABLE
            var tableHTML = templateTable.replace('{{text}}', rowHTML);
            return templateDetails.replace('{{title}}', summaryObject.title).replace('{{text}}', tableHTML);
        }).join('');
        // ACCORDION
        var accordionHTML = templateCard.replace('{{text}}', detailsHTML);

        // Open first item
        var $accordion = $(accordionHTML);
        $accordion.addClass('display-none-sm');
        $accordion.find('details:first').attr('open', true);

        // Add to DOM
        $accordion.insertAfter($table);
        setTimeout(function () {
            $accordion.css({ opacity: 1 });
        }, 1);
    };

    $(window).on('load', function init() {
        // eslint-disable-line no-unused-vars
        $('[data-js*="tableAccordion"]').each(function (index, val) {
            $(val).find('table:first').each(replaceWithAccordionForMobile);
        });
    });
})(jQuery);
'use strict';

(function ($, window) {
    var SELECTOR_TABLE_RESPONSIVE = '.table-responsive';
    var SELECTOR_TABLE_FIXED = '[data-js*="tableFixedFirst"] > table';
    var SELECTOR_SCROLLABLE = '.scrollable';
    var SELECTOR_SCROLLABLE_WRAP = '.scrollable-wrap';

    var handleLoad = function handleLoad() {
        $(SELECTOR_TABLE_FIXED).each(function (index, value) {
            var $table = $(value);
            if ($table.parent().is(SELECTOR_SCROLLABLE)) {
                $table.unwrap();
            }
            if ($table.parent().is(SELECTOR_SCROLLABLE_WRAP)) {
                $table.unwrap();
            }
            window.tableResponsiveCreate($table);
        });
    };

    var handleResize = function handleResize() {
        $(SELECTOR_TABLE_RESPONSIVE).each(function (index, value) {
            window.tableResponsiveUpdate($(value));
        });
    };

    $(window).on('load', handleLoad);
    $(window).on('resize', handleResize);
})(jQuery, window);
'use strict';

(function ($) {
    var SELECTOR_TABLE_TRANSIT_BODY = '.table--transit-schedule tbody';
    var SELECTOR_TABLE_WRAPPER = '.table-responsive-wrapper--scrollable';

    var CLASS_TD_HIGHLIGHT = 'td--highlight';

    var getCurrentTime = function getCurrentTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var currentTime = h * 100 + m;
        return currentTime;
    };

    var parseTime = function parseTime(timeStr) {
        var timeNumber = timeStr.replace(/\D/g, '');
        var timeAmPm = timeStr.slice(-2);
        var timeAdj = 0;
        if (timeAmPm === 'PM' && timeStr.substring(0, 2) !== '12') {
            timeAdj = 1200;
        }
        if (timeAmPm === 'AM' && timeStr.substring(0, 2) === '12') {
            timeAdj = -1200;
        }
        timeNumber = Number(timeNumber) + Number(timeAdj);
        return timeNumber;
    };

    var sortTimes = function sortTimes(times) {
        var parsedTimes = [];
        for (var i = 0; i < times.length; i++) {
            var timeEl = times[i];
            var timeNumber = parseTime(timeEl.innerText);
            parsedTimes.push({
                time: timeNumber,
                el: timeEl
            });
        }
        parsedTimes.sort(function (a, b) {
            return a.time - b.time;
        });
        return parsedTimes;
    };

    var getNextNode = function getNextNode(currentTime, times) {
        var sameOrAfterNode;
        for (var i = 0; i < times.length; i++) {
            if (times[i].time >= currentTime) {
                sameOrAfterNode = times[i].el;
                break;
            }
        }
        if (!sameOrAfterNode) {
            sameOrAfterNode = times[0].el;
        }
        return sameOrAfterNode;
    };

    var reduceNextMinOffset = function reduceNextMinOffset(acc, val) {
        return Math.min(acc, val.offsetLeft);
    };

    var scrollToFirst = function scrollToFirst(index, val) {
        var $tbody = $(val);
        var $highlights = $tbody.find('.' + CLASS_TD_HIGHLIGHT);
        if ($highlights.length) {
            var firstHighlightOffset = $highlights.toArray().reduce(reduceNextMinOffset, 5000);
            var firstColumnWidth = $tbody.find('th:first').outerWidth();
            var borderWidth = 1;
            var scrollToValue = firstHighlightOffset - firstColumnWidth - borderWidth;
            $tbody.closest(SELECTOR_TABLE_WRAPPER).scrollLeft(scrollToValue);
        }
    };

    var processRow = function processRow(index, val) {
        var currentTime = getCurrentTime();
        var $tds = $(val).find('td');
        var times = sortTimes($tds.toArray());
        var nextNode = getNextNode(currentTime, times);
        $tds.removeClass(CLASS_TD_HIGHLIGHT);
        $(nextNode).addClass(CLASS_TD_HIGHLIGHT);
    };

    var init = function init() {
        var $tbody = $(SELECTOR_TABLE_TRANSIT_BODY);
        $tbody.find('tr').each(processRow);
        $tbody.each(scrollToFirst);
        setInterval(function () {
            var $tbody = $(SELECTOR_TABLE_TRANSIT_BODY);
            $tbody.find('tr').each(processRow);
        }, 30000);
    };

    $(window).on('load', init);
})(jQuery);
'use strict';

(function ($) {
    var CLASS_COLLAPSED = 'toggle-grow--collapsed';
    var ARIA_EXPANDED = 'aria-expanded';
    var ARIA_CONTROLS = 'aria-controls';

    var collapse = function collapse(element) {
        var sectionHeight = element.scrollHeight;
        var elementTransition = element.style.transition;
        element.style.transition = '';
        window.requestAnimationFrame(function () {
            element.style.height = sectionHeight + 'px';
            element.style.transition = elementTransition;
            window.requestAnimationFrame(function () {
                element.style.height = 0 + 'px';
            });
        });
    };

    var expand = function expand(element) {
        element.style.height = element.scrollHeight + 'px';
        element.addEventListener('transitionend', handleTransitionEnd);
    };

    var handleTransitionEnd = function handleTransitionEnd() {
        this.removeEventListener('transitionend', handleTransitionEnd);
        this.style.height = null;
    };

    var handleClick = function handleClick(e) {
        var $el = $(e.currentTarget);
        var $toggleTarget = $('#' + $el.attr(ARIA_CONTROLS));
        var element = $toggleTarget[0];
        var isExpanded = $el.attr(ARIA_EXPANDED) === 'true';
        if (isExpanded) {
            collapse(element);
        } else {
            expand(element);
        }
        $el.attr(ARIA_EXPANDED, !isExpanded);
    };

    var handleInit = function handleInit() {
        $('.' + CLASS_COLLAPSED).removeClass(CLASS_COLLAPSED).css('height', 0);
    };

    $(document).on('click', '[data-js="toggleGrowTrigger"]', handleClick);
    $(window).on('load', handleInit);
})(jQuery);
'use strict';

(function ($) {
    var EVENTS_PER_PAGE = 5;
    var PAGINATOR_TYPE = 'simple';
    if (window.matchMedia('(min-width: 768px)').matches) {
        EVENTS_PER_PAGE = 10;
        PAGINATOR_TYPE = 'simple_numbers';
    }

    var STARTING_ITEM = 0;
    var ENDING_ITEM = 0;

    /*$.fn.dataTable.render.events = function () {
      return function (data, type, row) {
        var eventDate = new Date(row.sortDate.replace(/-/g, '/'));
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return '<div class="tourism-event">\n          <div class="date-container date-container--bordered">\n            <div class="date__month">' + monthNames[eventDate.getMonth()] + '</div>\n            <div class="date__day">' + eventDate.getDate() + '</div>\n          </div>\n          <div class="tourism-event__details">\n            <div class="tourism-event__title"><a href="' + row.url + '" rel="external noopener" target="_blank">' + row.title + '</a></div>\n            <div class="tourism-event__location">' + row.location + '</div>\n          </div>\n          <div class="tourism-event__image" style="background-color:' + row.backgroundColor + ';background-image:url(\'' + row.image + '\');"></div>\n        </div>';
      };
    };*/
    /*$('.tourism-events').DataTable({
      columnDefs: [{
      targets: 0
        //targets: 0,
        //render: $.fn.dataTable.render.events()
      }],
      lengthChange: false,
      searching: false,
      pageLength: EVENTS_PER_PAGE,
      pagingType: PAGINATOR_TYPE,
      serverSide: true,
      ajax: {
        url: 'https://tourismregina.com/api/events/latest',
        dataSrc: function dataSrc(json) {
          return json.data;
        },
        dataFilter: function dataFilter(data) {
          var json = $.parseJSON(data);
          json.recordsTotal = json.total_items;
          json.recordsFiltered = json.total_items;
          json.data = json.events;
          if (ENDING_ITEM > json.total_items) {
            ENDING_ITEM = json.total_items;
          }

          $('div.tourism-events__total').html(' Viewing ' + STARTING_ITEM + ' - ' + ENDING_ITEM + ' of ' + json.total_items);
          return JSON.stringify(json);
        },
        data: function data(d) {
          d.count = d.length;
          d.offset = d.start;
          STARTING_ITEM = d.offset + 1;
          ENDING_ITEM = d.count + d.offset;
          return d;
        }
      },
      dom: '<"tourism-events__total">tp',
      language: {
        paginate: {
          previous: '\n        <div class="button-group__text">Previous</div>\n        <div class="button-group__button">\n          <div class="button-3"><i class="fa fa-icon-chevron fa-flip-horizontal" aria-hidden="true"></i></a></div>\n        </div>',
          next: '\n        <div class="button-group__text">Next</div>\n        <div class="button-group__button"><div class="button-3"><i class="fa fa-icon-chevron" aria-hidden="true"></i></a></div>\n        </div>'
        }
      }
    });*/
})(jQuery);
