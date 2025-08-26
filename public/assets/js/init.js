jQuery(document).ready(function($) {
    const $header = $('#header');
    const $welcome = $('#welcome');
    const $menuToggler = $('#menuToggler');
    const $headerCollapse = $('#headerCollapse');
    $.fn.exists = function( callback ) {
        var args = [].slice.call( arguments, 1 );
        if ( ! callback ) {
            return this.length;
        }
        if ( this.length ) {
            callback.call( this, args );
        }
        return this;
    };
    $menuToggler.click( function(e) {
        let $this = $(this);
        if ( $this.hasClass('open') ) {
            $headerCollapse.slideUp().removeClass('open');
            $this.attr( 'aria-expanded', false ).removeClass('open');
        } else {
            $headerCollapse.slideDown().addClass('open');
            $this.attr( 'aria-expanded', true ).addClass('open');
        }
        e.preventDefault();
    });
    function repositionMainHeader() {
        let headerPosition = $header.position();
        let windowPosition = $(window).scrollTop();
        if ( windowPosition > headerPosition.top ) {
            $header.addClass('short');
        } else {
            $header.removeClass('short');
        }
    }
    if ( $(window).width() > 991.9 ) {
        $(window).scroll(function() {
            repositionMainHeader();
        });
        $(document).ready(function() {
            repositionMainHeader();
        });
        $welcome.waypoint( function() {
            $('#mainNav > li').removeClass('active');
        }, { offset : '-75%' });
    }
    
    $('.careers-btn a').on('click', function() {
        if ( $(window).width() <= 991.9 ) {
            $headerCollapse.slideUp().removeClass('open');
            $menuToggler.attr( 'aria-expanded', false ).removeClass('open');
        }
    });
    $('#mainNav > li').each( function() {
        let $this    = $(this);
            $target  = $this.data('target') ? $( $this.data('target') ) : false,
            elOffset = $this.data('offset') ? $this.data('offset') : 70;
        if ( $target && $target.length ) {
            $target.waypoint( function() {
                $('#mainNav > li').removeClass('active');
                $this.addClass('active');
            }, { offset : elOffset });
        }
    });
    $.fn.focusNoScroll = function() {
        var x = window.scrollX,
            y = window.scrollY;
        this.focus();
        window.scrollTo(x, y);
        return this;
    };
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click( function( event ) {
        if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
            let $this = $(this);
            let target = $( this.hash );
            target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
            if ( target.length && ( $this.data('slide') === undefined ) && ( $this.data('toggle') === undefined ) ) {
                var offset = $this.data('offset') || 0;
                event.preventDefault();
                
                if ( $(window).width() <= 991.9 && $this.closest('#mainNav').length ) {
                    $headerCollapse.slideUp().removeClass('open');
                    $menuToggler.attr( 'aria-expanded', false ).removeClass('open');
                }
                
                $( 'html, body' ).animate({
                    scrollTop: ( target.offset().top - offset )
                }, 500, function() {
                    let $target = $( target );
                    $target.focusNoScroll();
                    if ( $target.is( ":focus" ) ) {
                        return false;
                    } else {
                        $target.attr( 'tabindex', '-1' );
                        $target.focusNoScroll();
                    };
                });
            }
        }
    });
    $("#aboutCarousel").on('slide.bs.carousel', function(evt) {
        let step = $(evt.relatedTarget).index();
        $('#aboutCaptions .carousel-captione:not(#aboutCaption-' + step + ')').hide('fast', function() {
            $('#aboutCaption-' + step).fadeIn();
        });
    });
    $('.btnReadMore').on('click', function() {
        let $this = $(this);
        $this.html( $this.attr('aria-expanded') == 'true' ? 'Read more' : 'Read less');
    });
    $('#projects .project:visible:last').addClass('last-visible');
    $('#moreProjects').on('shown.bs.collapse', function () {
        $('#projects .project').removeClass('last-visible');
        $('#projects .project:visible:last').addClass('last-visible');
    });
    let touchStartX = null;
    $('.carousel').each(function() {
        let $carousel = $(this);
        $(this).on('touchstart', function (event) {
            let e = event.originalEvent;
            if (e.touches.length == 1) {
                let touch = e.touches[0];
                touchStartX = touch.pageX;
            }
        }).on('touchmove', function (event) {
            let e = event.originalEvent;
            if (touchStartX != null) {
                let touchCurrentX = e.changedTouches[0].pageX;
                if ((touchCurrentX - touchStartX) > 60) {
                    touchStartX = null;
                    $carousel.carousel('prev');
                } else if ((touchStartX - touchCurrentX) > 60) {
                    touchStartX = null;
                    $carousel.carousel('next');
                }
            }
        }).on('touchend', function () {
            touchStartX = null;
        });
    });
    let screenWidth = $(window).width();
    if ( screenWidth < 768 ) {
        $('video').removeAttr('autoplay');
    } else {
        $('video').attr('autoplay');
    }
});