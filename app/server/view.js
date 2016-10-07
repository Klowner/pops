"use strict";
var fs_1 = require('fs');
var config_1 = require('../bin/config');
var twig_1 = require('./engines/twig');
var handlebars_1 = require('./engines/handlebars');
var pug_1 = require('./engines/pug');
var config = new config_1.Config().getConfig();
var View = (function () {
    function View(ext) {
        if (ext === void 0) { ext = ''; }
        this.templateExt = ext || config.ext.templates;
        this.setEngine(this.templateExt);
    }
    View.prototype.setEngine = function (engine) {
        var _this = this;
        var engines = {
            'twig': function () {
                _this.engine = new twig_1.Twig();
            },
            'hbs': function () {
                _this.engine = new handlebars_1.Handlebars();
            },
            'jade': function () {
                _this.engine = new pug_1.Pug();
            },
            'pug': function () {
                _this.engine = new pug_1.Pug();
            },
            'default': function () {
                _this.engine = new handlebars_1.Handlebars();
            }
        };
        if (engines[engine]) {
            engines[engine]();
        }
        else {
            engines['default']();
        }
    };
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
        return this.engine.renderViewAsText(content, context);
    };
    return View;
}());
exports.View = View;
