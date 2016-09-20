"use strict";
var path_1 = require('path');
var twig = require('twig');
var config_1 = require('../../bin/config');
var config = new config_1.Config().getConfig();
var srcDir = config.src;
var patternDir = path_1.join(srcDir, 'patterns/');
var componentDir = path_1.join(srcDir, 'components/');
var Twig = (function () {
    function Twig() {
        this.engine = twig;
        this.preRenderedPartials = false;
        this.options = {
            data: '',
            namespaces: { 'patterns': patternDir, 'components': componentDir }
        };
    }
    Twig.prototype.renderViewAsText = function (src, context) {
        this.options.data = src;
        return this.engine.twig(this.options).render(context);
    };
    return Twig;
}());
exports.Twig = Twig;
