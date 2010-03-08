/**
 * FaviconLink Plugin for DokuWiki / script.js
 * 
 * Adds favicon to external links
 * 
 * @see    http://s2.googleusercontent.com/s2/favicons
 * @author Kazutaka Miyasaka <kazmiya@gmail.com>
 */

addInitEvent(function() {
    // enabled?
    if (!JSINFO.plugin_faviconlink.enable) return;

    // set config
    var protocol = JSINFO.plugin_faviconlink.use_https ? 'https' : 'http';
    if (JSINFO.plugin_faviconlink.disable_domain !== '') {
        var disable = new RegExp(JSINFO.plugin_faviconlink.disable_domain);
    }

    // extract external links
    var urlexterns = getElementsByClass('urlextern', document, 'a');

    // replace each link icon with a favicon for that domain
    for (var i = 0, i_len = urlexterns.length; i < i_len; i++) {
        var matched = urlexterns[i].href.match(/^(https?:\/\/([^\/]+))/);
        if (!matched) continue;
        if (disable && matched[2].match(disable)) continue;

        var src = protocol
                  + '://s2.googleusercontent.com/s2/favicons?domain_url='
                  + encodeURIComponent(matched[1]);

        replaceLinkIcon(urlexterns[i], src);
    }

    function replaceLinkIcon(link, src) {
        img = new Image();
        img.onload = function() {
            link.style.backgroundImage = 'url("' + src + '")';
        };
        img.src = src;
    };
});
