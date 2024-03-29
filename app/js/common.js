$(document).ready(function(){

    /** mobile-mnu customization */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /** end mobile-mnu customization */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    var element = document.querySelector( '.main-mnu' );

    var droppy = new Droppy( element, {
        parentSelector: 'li',
        dropdownSelector: 'li > ul',
        triggerSelector: 'a'
    } );

    $('.droppy__parent').click(function(){
        $(this).toggleClass('opened');
    });

    $('html').click(function(e) {
        if((!$(e.target).hasClass('droppy__trigger')) && (!$(e.target).hasClass('droppy__drop')))
        {
            $('.droppy__parent').removeClass('opened');
        }
    });

    $('.intro-slider').owlCarousel({
        loop:true,
        nav:true,
        items: 1,
        dots: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
        touchDrag: false,
        smartSpeed:700,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplaySpeed: 2000,
        navText: false,
        margin: 30,
        responsive: {
            0: {
                nav: false,
            },
            480: {
                nav: false,
            },
            768: {
                nav: true,
            }
        }
    });

    $('.similars-slider').owlCarousel({
        loop:false,
        nav:true,
        items: 5,
        dots: false,
        smartSpeed:700,
        navText: false,
        margin: 12,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            440: {
                items: 2,
                nav: false,
                dots: true
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 5
            }
        }
    });

    $('.reviews-slider').slick({
        // arrows:false,
        dots: true,
        infinite:true,
        speed:500,
        fade: true,
        slidesToShow:1,
        asNavFor: '.reviews-nav-slider',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    adaptiveHeight: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    adaptiveHeight: true
                }
            }
        ]
    });


    $('.reviews-nav-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.reviews-slider',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        arrows:false,
        centerPadding: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.product-slider').slick({
        arrows:false,
        dots: false,
        infinite:true,
        speed:500,
        fade: true,
        slidesToShow:1,
        asNavFor: '.product-slider-nav'
    });


    $('.product-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.product-slider',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                }
            }
        ]
    });

    $('.reviews-items-wrap').niceScroll({
        cursoropacitymin: 1,
        cursorcolor:"#006599",
        cursorwidth:"4px",
        cursorborder:"",
        cursorborderradius:"2px",
        background:"#f0f8fa",railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
    });

    $('.preloader').fadeOut();



    $('.product-slider').photoswipe({
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    });

    $('.serts-wrap').photoswipe();

    $('.filter').click(function(e){
        e.preventDefault();

        $(this).addClass('active').siblings('.filter').removeClass('active');
    });

    function heightses() {


        if ($(window).width()>480) {
            $('.product-item-title').matchHeight({byRow: true});
            $('.product-item-prices').matchHeight({byRow: true});
        } else {
            $('.similars-slider .product-item-title').matchHeight({byRow: true});
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    /** FORMS */
    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $('input[type="checkbox"], select, input[type="radio"], input[type="file"]').styler({
        filePlaceholder: "Прикрепить аватарку",
        fileBrowse: "",
    });

    $('input[type=radio][name=Доставка]').on('change', function(){
        if (this.value == 'Доставка') {
            $('.delivery-input').removeAttr('disabled')
        } else {
            $('.delivery-input').prop('disabled', 'disabled').val('');
        }
    })

    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    //E-mail Ajax Send
    $(".send-form").submit(function() { //Change
        var th = $(this);
        var t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "/mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });

    $('.product-color li ').each(function(){
        let th = $(this);
        let color = th.data('color');
        th.cssBefore('background', color);
    });

    function getSelectColor(){
        $('.jq-selectbox.product-color-select').each(function(){
            let th = $(this);
            let selectedItem = th.find('li.selected');
            let color = selectedItem.data('color');
            let input = th.find('.jq-selectbox__select');

            input.cssBefore('background', color);
        });
    }

    getSelectColor();

    $('.jq-selectbox.product-color-select').change(function(){
        getSelectColor();
    });

    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [30, 52],
                });

            map.geoObjects.add(myPlacemark);
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
});
