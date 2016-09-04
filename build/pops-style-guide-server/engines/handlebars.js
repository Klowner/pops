"use strict";
var hbs = require('handlebars');
var Handlebars = (function () {
    function Handlebars() {
        this.engine = hbs;
        this.preRenderedPartials = true;
    }
    Handlebars.prototype.registerPartial = function (namespace, name, content) {
        var title = namespace + "/" + name;
        this.engine.registerPartial(title, content);
    };
    Handlebars.prototype.compile = function (source) {
        return this.engine.compile(source);
    };
    Handlebars.prototype.renderViewAsText = function (src, context) {
        var template = this.compile(src);
        var html = template(context);
        return html;
    };
    return Handlebars;
}());
exports.Handlebars = Handlebars;
