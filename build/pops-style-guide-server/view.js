"use strict";
var Handlebars = require('handlebars');
var View = (function () {
    function View() {
        this.handlebars = Handlebars;
    }
    View.prototype.registerPartial = function (namespace, name, content) {
        var title = namespace + "/" + name;
        this.handlebars.registerPartial(title, content);
    };
    View.prototype.compile = function (source) {
        return this.handlebars.compile(source);
    };
    View.prototype.render = function (source, context) {
        var template = this.compile(source);
        var html = template(context);
        return html;
    };
    View.prototype.addView = function (item) {
        item.view = this.render(item.template, item.context);
        return item;
    };
    View.prototype.getViews = function () {
        return this.handlebars;
    };
    return View;
}());
exports.View = View;
