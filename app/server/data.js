"use strict";
var view_1 = require('./view');
var stores_1 = require('./stores');
var Data = (function () {
    function Data(ext) {
        if (ext === void 0) { ext = ''; }
        this.view = new view_1.View(ext);
    }
    Data.prototype.pages = function (src) {
        var _this = this;
        var store = new stores_1.PageStore(src);
        var pages = store.all();
        return pages.map(function (page) { return _this.view.addView(page); });
    };
    Data.prototype.patterns = function (src) {
        var _this = this;
        var store = new stores_1.PatternStore(src);
        var patterns = store.all();
        if (this.view.preRenderPartials()) {
            patterns = patterns
                .map(function (pattern) {
                _this.view.registerPartial('pattern', pattern.name, pattern.template);
                return pattern;
            });
        }
        return patterns.map(function (pattern) { return _this.view.addView(pattern); });
    };
    Data.prototype.overviews = function (src) {
        var store = new stores_1.OverviewStore(src);
        return store.all();
    };
    Data.prototype.components = function (src) {
        var _this = this;
        var store = new stores_1.ComponentStore(src);
        var components = store.all();
        if (this.view.preRenderPartials()) {
            components = components
                .map(function (component) {
                _this.view.registerPartial('component', component.name, component.template);
                return component;
            });
        }
        return components.map(function (component) { return _this.view.addView(component); });
    };
    Data.prototype.all = function (settings) {
        var src = settings.src, meta = settings.meta;
        var patterns = this.patterns(src);
        var components = this.components(src);
        var pages = this.pages(src);
        var overviews = this.overviews(src);
        return { meta: meta, overviews: overviews, components: components, patterns: patterns, pages: pages };
    };
    return Data;
}());
exports.Data = Data;
