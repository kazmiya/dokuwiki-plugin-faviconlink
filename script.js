/**
 * FaviconLink Plugin for DokuWiki / script.js
 * 
 * Adds favicon to external links
 * 
 * @see    http://www.google.com/s2/favicons
 * @author Kazutaka Miyasaka <kazmiya@gmail.com>
 */

addInitEvent(function() {
    if (!JSINFO || !JSINFO.plugin_faviconlink) return;

    var f = JSINFO.plugin_faviconlink;

    var urlRegex     = /^https?:\/\/(?:\w+@\w+:)?([\w.-]+?)(?:\/|:|$)/i;
    var pageFilter   = f.pageFilter   == '' ? null : new RegExp(f.pageFilter);
    var domainFilter = f.domainFilter == '' ? null : new RegExp(f.domainFilter);
    var protocol     = f.useHTTPS ? 'https' : 'http';

    // apply page id filter
    var pageMatched = checkFilter(f.pageID, pageFilter);
    if (f.defaultON && pageMatched) return;
    if (!f.defaultON && !pageMatched && !domainFilter) return;

    // extract external links
    var extLinks = getElementsByClass('urlextern', document, 'a');

    // replace each link icon with a favicon for that domain
    for (var i = 0, i_len = extLinks.length; i < i_len; i++) {
        var matched = extLinks[i].href.match(urlRegex);
        if (!matched) continue;

        // apply domain filter (using XOR operation)
        var domainMatched = checkFilter(matched[1], domainFilter);
        if (f.defaultON == (pageMatched || domainMatched)) continue;

        var src = protocol
                  + '://www.google.com/s2/favicons?domain='
                  + encodeURIComponent(matched[1].toLowerCase());

        replaceLinkIcon(extLinks[i], src);
    }

    function checkFilter(str, regex) {
        return regex ? !!str.match(regex) : false;
    }

    function replaceLinkIcon(link, src) {
        var img = new Image();
        img.onload = function() {
            link.style.backgroundImage = 'url("' + src + '")';
        };
        img.src = src;
    }
});
