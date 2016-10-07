"use strict";
var pug = require('pug');
var Pug = (function () {
    function Pug() {
        this.engine = pug;
        this.preRenderedPartials = false;
    }
    Pug.prototype.compile = function (source) {
        return this.engine.compile(source);
    };
    Pug.prototype.renderViewAsText = function (src, context) {
        var template = this.compile(src);
        return template(context);
    };
    return Pug;
}());
exports.Pug = Pug;
