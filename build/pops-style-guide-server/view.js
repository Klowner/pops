"use strict";
var fs_1 = require('fs');
var config_1 = require('../pops-commandline-client/config');
var twig_1 = require('./engines/twig');
var handlebars_1 = require('./engines/handlebars');
var config = require(new config_1.Config().getConfig());
var View = (function () {
    function View(ext) {
        if (ext === void 0) { ext = ''; }
        this.templateExt = ext || config.ext.templates;
        switch (this.templateExt) {
            case 'twig':
                this.engine = new twig_1.Twig();
                break;
            case 'hbs':
                this.engine = new handlebars_1.Handlebars();
                break;
            default:
                this.engine = new handlebars_1.Handlebars();
        }
    }
    View.prototype.preRenderPartials = function () {
        return this.engine.preRenderedPartials;
    };
    View.prototype.registerPartial = function (namespace, name, content) {
        this.engine.registerPartial(namespace, name, content);
    };
    View.prototype.addView = function (item) {
        item.view = this.engine.renderViewAsText(item.template, item.context);
        return item;
    };
    View.prototype.asText = function (src, context) {
        var content = fs_1.readFileSync(src, 'utf8');
        var view = this.engine.renderViewAsText(content, context);
        return view;
    };
    return View;
}());
exports.View = View;
