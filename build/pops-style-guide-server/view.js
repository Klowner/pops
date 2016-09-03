"use strict";
var path_1 = require('path');
var twig = require('twig');
var hbs = require('handlebars');
var config_1 = require('../pops-commandline-client/config');
var config = require(new config_1.Config().getConfig());
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
var View = (function () {
    function View() {
        this.templateExt = config.ext.templates;
        switch (this.templateExt) {
            case 'twig':
                this.engine = new Twig();
                break;
            case 'hbs':
                this.engine = new Handlebars();
                break;
            default:
                this.engine = new Handlebars();
        }
    }
    View.prototype.addView = function (item) {
        item.view = this.engine.renderViewAsText(item.template, item.context);
        return item;
    };
    return View;
}());
exports.View = View;
