/*!
 * jQuery ClassyMap
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 1.1.0
 *
 */

(function ($) {
    $.fn.ClassyMap = function () {
        return this.each(function () {
            var obj = $(this), output = 'iframe', description = '', protocol = 'http:', language, width, height, type, bubble, color, zoom = 10, out = '', address = '', ll = '';
            if (document.location.protocol === 'https:') {
                protocol = 'https:';
            }
            if (!obj.data('address')) {
                return;
            }
            if (obj.data('output') === 'image') {
                output = 'image';
            }
            else {
                output = 'iframe';
            }
            zoom = parseInt(obj.data('zoom'), 10);
            if (isNaN(zoom) || zoom < 0 || zoom > 20) {
                zoom = 10;
            }
            if (!obj.data('lang') || obj.data('lang') === 'auto') {
                language = window.navigator.userLanguage || window.navigator.language;
            }
            else {
                language = $.trim(obj.data('lang'));
            }
            if (output === 'image') {
                width = parseInt(obj.data('width'), 10);
                if (isNaN(width) || width < 10 || width > 3000) {
                    width = 500;
                }
                height = parseInt(obj.data('height'), 10);
                if (isNaN(height) || height < 10 || height > 2000) {
                    height = 300;
                }
                switch (obj.data('type')) {
                    case 'roadmap':
                        type = 'roadmap';
                        break;
                    case 'satellite':
                        type = 'satellite';
                        break;
                    case 'terrain':
                        type = 'terrain';
                        break;
                    case 'hybrid':
                        type = 'hybrid';
                        break;
                    default:
                        type = 'roadmap';
                }
                switch (obj.data('pin')) {
                    case 'tiny':
                        pin_size = 'tiny';
                        break;
                    case 'medium':
                        pin_size = 'small';
                        break;
                    case 'large':
                        pin_size = 'mid';
                        break;
                    default:
                        pin_size = 'small';
                }
                color = $.trim(obj.data('color'));
                if (!color) {
                    color = 'red';
                }
                address += protocol + '//maps.googleapis.com/maps/api/staticmap?scale=2&amp;sensor=true&amp;center=' + encodeURIComponent(obj.data('address'));
                address += '&amp;zoom=' + zoom + '&amp;size=' + parseInt(width / 2, 10) + 'x' + parseInt(height / 2, 10) + '&amp;maptype=' + type;
                address += '&amp;markers=size:' + pin_size + '%7Ccolor:' + color + '%7Clabel:%7C' + encodeURIComponent(obj.data('address'));
                address += '&amp;language=' + language;
                out += '<img alt="' + obj.data('address') + '" title="' + obj.data('address') + '" src="' + address + '" />';
                obj.html(out);
            }
            else {
                width = $.trim(obj.data('width'));
                if (!width) {
                    width = '500px';
                }
                if (parseInt(width, 10) === width) {
                    width += 'px';
                }
                height = $.trim(obj.data('height'));
                if (!height) {
                    height = '300px';
                }
                if (parseInt(height, 10) === height) {
                    height += 'px';
                }
                switch (obj.data('type')) {
                    case 'roadmap':
                        type = 'm';
                        break;
                    case 'satellite':
                        type = 'k';
                        break;
                    case 'terrain':
                        type = 'p';
                        break;
                    case 'hybrid':
                        type = 'h';
                        break;
                    default:
                        type = 'm';
                }
                if (obj.data('bubble') === '0' || obj.data('bubble') === 'false') {
                    bubble = 'near';
                }
                else {
                    bubble = 'addr';
                }
                if (obj.data('description')) {
                    description = '(' + obj.data('description') + ')';
                }
                else {
                    description = '';
                }
                if (zoom > 14) {
                    $.get(protocol + '//maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(obj.data('address')) + '&sensor=false', function (data) {
                        if (data.status === 'OK') {
                            ll = data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng;
                        }
                        else {
                            ll = '';
                        }
                        address += protocol + '//maps.google.com/maps?hl=' + language + '&amp;ie=utf8&amp;output=embed&amp;q=' + encodeURIComponent(obj.data('address') + description);
                        address += '&amp;z=' + zoom + '&amp;t=' + type + '&amp;iwd=1&amp;mrt=loc&amp;iwloc=' + bubble + '&amp;ll=' + ll;
                        out += '<iframe style="border: none;" width="' + width + '" height="' + height + '" src="' + address + '"></iframe>';
                        obj.html(out);
                    }, 'json');
                }
                else {
                    address += protocol + '//maps.google.com/maps?hl=' + language + '&amp;ie=utf8&amp;output=embed&amp;q=' + encodeURIComponent(obj.data('address') + description);
                    address += '&amp;z=' + zoom + '&amp;t=' + type + '&amp;iwd=1&amp;mrt=loc&amp;iwloc=' + bubble + '&amp;ll=' + ll;
                    out += '<iframe style="border: none;" width="' + width + '" height="' + height + '" src="' + address + '"></iframe>';
                    obj.html(out);
                }
            }
        });
    };
})(jQuery);