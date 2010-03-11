<?php
/**
 * DokuWiki Plugin FaviconLink
 *
 * @license GPL 2 (http://www.gnu.org/licenses/gpl.html)
 * @author  Kazutaka Miyasaka <kazmiya@gmail.com>
 */

// must be run within DokuWiki
if (!defined('DOKU_INC')) die();
if (!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN', DOKU_INC.'lib/plugins/');

require_once(DOKU_PLUGIN.'action.php');

class action_plugin_faviconlink extends DokuWiki_Action_Plugin {
    /**
     * Returns some info
     */
    function getInfo() {
        return confToHash(DOKU_PLUGIN.'faviconlink/plugin.info.txt');
    }

    /**
     * Registers an event handler
     */
    function register(&$controller) {
        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, '_exportToJSINFO');
    }

    /**
     * Exports configuration settings to $JSINFO
     */
    function _exportToJSINFO(&$event) {
        global $INFO;
        global $JSINFO;

        $JSINFO['plugin_faviconlink'] = array(
            'pageID'       => (string)  $INFO['id'],
            'defaultON'    => (boolean) $this->getConf('default_behavior'),
            'pageFilter'   => (string)  $this->getConf('invert_behavior_pages'),
            'domainFilter' => (string)  $this->getConf('invert_behavior_domains'),
            'useHTTPS'     => (boolean) $this->getConf('use_https'),
        );
    }
}
