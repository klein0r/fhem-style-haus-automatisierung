
function getClock() {
    var d = new Date();
    nhour = d.getHours();
    nmin = d.getMinutes();

    if (nhour <= 9) {
        nhour = '0' + nhour;
    }

    if (nmin <= 9) {
        nmin = '0' + nmin;
    }

    document.getElementById('clock').innerHTML = nhour + ':' + nmin + ' Uhr';

    setTimeout(getClock, 1000);
}

/**
 * Verify window size to optimize for mobile or desktop variant
 */
function initResponsive() {
    jQuery('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>');

    if ($(window).width() < 798) {
        var menu = $('#menu > table');
        // display menu button and hide menu
        var hamburger = jQuery('<div />', { id: 'menu_hamburger',});
        hamburger.click(function() {
            if (menu.is(':visible')) {
                menu.hide();
            } else {
                menu.show();
            }
         });
        hamburger.prependTo('#menu');
        menu.hide();

        $('body > form').css('width', '100%');
        showHeadline();
    } else {
        $('#content').css('padding-top', '135px');
    }
}

/**
 * Display a headline to visualize the room name.
 * Especially for mobile version this is usefull when menu entries become hidden
 */
function showHeadline() {
    $('table.block tr').each(function (index) {
        if ($(this).find('td').length > 4) {
            $(this).find('td:gt(1)').css('display', 'table-row');
            $(this).find('td:gt(1) > div').css('margin', '0.3em');
        }
    });
    
    roomContainer = $('table.room tr.sel > td > div').clone();
    roomContainer.addClass('headline');
    roomContainer.prependTo('body > form');
}

jQuery(document).ready(function ($) {

    var themeVersion = '2.17';
    
    initResponsive();

    // attr WEB hiddenroom input -> Ansicht anpassen
    if ($('#hdr .maininput').length == 0) {
        $('#hdr').hide();
        $('#content').css({top: '10px'});
    } else {
        // Link mit Popup Button
        $('<div class="maininputPopupLink"></div>')
            .appendTo("#hdr")
            .click(function () {
                var hasCodeMirror = typeof AddCodeMirror == 'function';

                var textArea = $('<textarea rows="20" cols="60" style="width: 99%; ' + (hasCodeMirror ? 'opacity: 0;' : '') + '"/>');
                if (hasCodeMirror) {
                    AddCodeMirror(textArea, function(cm) { 
                        cm.on("change", function() { textArea.val(cm.getValue()) } );
                    });
                }

                $('<div title="Multiline Command"></div>')
                    .append(textArea)
                    .dialog({
                        modal: true,
                        width: $(window).width() * 0.9,
                        buttons: [
                            {
                                text: "Execute",
                                click: function() {
                                    FW_execRawDef(textArea.val());
                                }
                            }
                        ],
                        close: function() {
                            $(this).remove();
                        }
                    });
            });
    }

    // Add version to logo
    $('#logo').append($('<span class="theme-version">' + themeVersion + '</span>'));

    // Add clock
    $('#logo').append($('<span id="clock"></span>'));
    window.addEventListener('load', getClock, false);

	// Clear spaces
    $('#content .devType, #menu .room a').each(function() {
        $(this).html($(this).html().replace(/&nbsp;/g, ''));
    });

    $('#content > br').remove();
    $('.makeSelect').parent().find('br').remove();

    // Add missing classes for elements
    $('.SVGplot').prevAll('a').addClass('plot-nav');

    // Icon selection
    $('button.dist').wrapAll('<div class="icons"/>');
    $('button.dist').css({width: '50px', height: '50px', margin: '5px', padding: '0'});
    $('button.dist > *').css({maxWidth: '40px', maxHeight: '40px', display: 'block', margin: '0px auto'});

    // Links in der Navigation hinzufügen
    var navElement = jQuery('#menu .room').last().find('tbody');
    navElement.append(
        $('<tr><td><div><a class="custom-menu-entry" href="https://github.com/klein0r/fhem-style-haus-automatisierung/issues/">Theme-Fehler melden (v' + themeVersion + ')</a></div></td></tr>')
    );

    // Automatische Breite für HDR Input
    function resizeHeader() {
        var baseWidth = $(window).width() - 20;
        console.log('baseWidth: ' + baseWidth);

        $('#hdr').css({'max-width': baseWidth + 'px', 'width': baseWidth + 'px'});
        $('.maininput').css({width: (baseWidth - 30)});
    }
    resizeHeader();
    $(window).resize(resizeHeader);

    // Klick auf Error-Message blendet diese aus
    $('body').on('click', '#errmsg', function() {
        $(this).hide();
    });

    $('.roomoverview .col1, .makeTable .col1').each(function(index) {
        $(this).parent().addClass('first-table-column');
    });

    // hide elements by name
    if (document.URL.indexOf('showall') != -1) {
        // don't hide anything
    } else {
        $('div.devType:contains("-hidden")').parent('td').hide();
    }

    // DevToolTips
    // Create Toolbar
    var elHaToolbar = $('<div>').attr('id', 'haToolbar').hide();
    $('body').append(elHaToolbar);

    $('#haToolbar').on('click', '.toHdr', function() {
        $('input.maininput').val($(this).text()).change();
    });

    function addToToolbar(val) {
        if (val.length > 0) {
            elHaToolbar.empty();
            jQuery.each(val, function(i, v) {
                $('<span>').addClass('toHdr').text(v).appendTo(elHaToolbar);
                $('<br>').appendTo(elHaToolbar);
            });
            elHaToolbar.show();
        }
    }

    $('table.internals .dname').click(function (e) {
        var deviceName = $(this).attr('data-name');
        var rowVal = $(this).text();

        if ($(this).html() == "TYPE") {
            addToToolbar(
                [
                    "GetType('" + deviceName + "');",
                    "InternalVal('" + deviceName + "', '" + rowVal + "', '');",
                    "[i:" + deviceName + ":TYPE]"
                ]
            );
        } else if ($(this).html() == "STATE") {
            addToToolbar(
                [
                    "Value('" + deviceName + "');",
                    "InternalVal('" + deviceName + "', '" + rowVal + "', '');",
                    "[i:" + deviceName + ":STATE]"
                ]
            );
        } else {
            addToToolbar(
                [
                    "InternalVal('" + deviceName + "', '" + rowVal + "', '');",
                    "[i:" + deviceName + ":" + rowVal + "]"
                ]
            );
        }
    });

    $('table.readings .dname').click(function (e) {
        var deviceName = $(this).attr('data-name');
        var rowVal = $(this).text();

        addToToolbar(
            [
                "ReadingsVal('" + deviceName + "', '" + rowVal + "', '');",
                "[" + deviceName + ":" + rowVal + "]",
                "[r:" + deviceName + ":" + rowVal + "]",
                deviceName + ":" + rowVal + ":.*"
            ]
        );
    });

    $('table.attributes .dname').click(function (e) {
        var deviceName = $(this).attr('data-name');
        var rowVal = $(this).text();

        addToToolbar(
            [
                "AttrVal('" + deviceName + "', '" + rowVal + "', '');",
                "[a:" + deviceName + ":" + rowVal + "]",
                "global:ATTR." + deviceName + "." + rowVal + ".*"
            ]
        );
    });

    // Group attributes
    var attrSelect = $('select.attr');
    var attrList = new Object();
    attrList['general'] = ['userattr', 'verbose', 'disable', 'useSetExtensions', 'setList', 'disabledForIntervals', 'showtime'];
    attrList['readings'] = ['userReadings',  'oldreadings', 'suppressReading', 'readingList'];
    attrList['msg'] = ['msgContactAudio', 'msgContactLight', 'msgContactMail', 'msgContactPush', 'msgContactScreen', 'msgParams', 'msgPriority', 'msgRecipient', 'msgRecipientAudio', 'msgRecipientLight', 'msgRecipientMail', 'msgRecipientPush', 'msgRecipientScreen', 'msgRecipientText', 'msgTitle', 'msgTitleShrt', 'msgType'];
    attrList['events'] = ['event-aggregator', 'event-min-interval', 'event-on-change-reading', 'event-on-update-reading', 'eventMap', 'timestamp-on-change-reading', 'setExtensionsEvent'];
    attrList['fhemweb'] = ['alias', 'comment', 'cmdIcon', 'devStateIcon', 'devStateStyle', 'group', 'icon', 'room', 'sortby', 'stateFormat', 'webCmd', 'webCmdLabel', 'widgetOverride'];
    attrList['floorplan'] = ['fp_arrange', 'fp_backgroundimg', 'fp_default', 'fp_noMenu', 'fp_roomIcons', 'fp_setbutton', 'fp_viewport'];
    attrList['database'] = ['DbLogExclude', 'DbLogInclude'];

    var optGroups = new Object();
    optGroups['device'] = $('<optgroup label="device"></optgroup>');
    for (var attrGroup in attrList) {
        optGroups[attrGroup] = $('<optgroup label="' + attrGroup + '"></optgroup>');
    }

    if (attrSelect) {
        // clear the original list
        var attributeOptionList = attrSelect.children();
        var selectedItem = attrSelect.find('option:selected');
        attrSelect.empty();

        // add attributes to predefined optgroups
        attributeOptionList.each(function(i, e) {
            var found = false;
            for (var attrGroup in attrList) {
                if (attrList[attrGroup].indexOf($(e).attr('value')) > -1) {
                    optGroups[attrGroup].append(e);
                    found = true;
                }
            }

            if (!found) {
                optGroups['device'].append(e);
            }
        });

        // add optgroups to select
        for (var optGroup in optGroups) {
            if (optGroups[optGroup].children().length) {
                attrSelect.append(optGroups[optGroup]);
            }
        };

        // select previously selected item
        selectedItem.prop('selected', true);
    }

    (function($) {
        'use strict';
        
    })(jQuery);
});
