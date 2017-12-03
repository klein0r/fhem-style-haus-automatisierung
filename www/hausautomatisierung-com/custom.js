jQuery(document).ready(function ($) {

    var themeVersion = '2.5';

    // Check für JS-Installation entfernen
    $('#hdr').addClass('js-installed');

    // Add version to logo
    $('#logo').append(
        $('<span class="theme-version">' + themeVersion + '</span>')
    );

	// Clear spaces
    $('#content .devType, #menu .room a').each(function() {
    	$(this).html($(this).html().replace(/&nbsp;/g, ''));
    });

    $('#content > br').remove();
    $('.makeSelect').parent().find('br').remove();

    // Add missing classes for elements
    $('.SVGplot').prevAll('a').addClass('plot-nav');
    $('.SVGplot').parents('tr.odd').addClass('no-background').parents('.block').addClass('no-background');
    $('.SVGplot').parents('tr.even').addClass('no-background').parents('.block').addClass('no-background');

    // Icon selection
    $('button.dist').wrapAll('<div class="icons"/>');
    $('button.dist').css({width: '50px', height: '50px', margin: '5px', padding: '0'});
    $('button.dist > *').css({maxWidth: '40px', maxHeight: '40px', display: 'block', margin: '0px auto'});

    $('input[type=text][name=icon-filter]').keyup(function() {
        var val = $(this).val().toLowerCase();
        if (val.length === 0) {
            jQuery('button.dist').show();
        } else {
            jQuery('button.dist').hide().filter(function() {
                return $(this).attr('title').toLowerCase().indexOf(val) > -1;
            }).show();
        }
    });

    // Links in der Navigation hinzufügen
    var $navElement = jQuery('#menu .room').last().find('tbody');

    $navElement.append(
        $('<tr><td><div><a class="custom-menu-entry" href="https://github.com/klein0r/fhem-style-haus-automatisierung/issues/">Theme-Fehler melden (v' + themeVersion + ')</a></div></td></tr>')
    );

    // Automatische Breite für HDR Input
    $('#hdr input.maininput').css({width: $('#content').width() + 'px'});
    $(window).resize(function() {
        $('#hdr input.maininput').css({width: $('#content').width() + 'px'});
    });

    // Klick auf Error-Message blendet diese aus
    $('body').on('click', '#errmsg', function() {
        $(this).hide();
    });

    $('.roomoverview .col1, .makeTable .col1').each(function(index) {
        $(this).parent().addClass('first-table-column');
    });

    // Image Slider
    $('.image-slide').each(function(index) {
        $(this).attr('data-index', index);
        if (index > 0) {
            $(this).hide();
        } else {
            $(this).addClass('current');
        }
    });

    function rotateSlides() {
        var nextSlideId = parseInt($('.image-slide.current').attr('data-index')) + 1;
        
        var nextSlide = $('.image-slide[data-index=' + nextSlideId + ']');

        if (nextSlide.length == 0) {
            nextSlide = $('.image-slide[data-index=0]');
        }

        $('.image-slide').each(function(index) {
            $(this).removeClass('current');
            $(this).hide();
        });

        nextSlide.show();
        nextSlide.addClass('current');
    }
    setInterval(rotateSlides, 1000);
});
