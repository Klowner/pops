"use strict";
var view_1 = require('./view');
var stores_1 = require('./stores');
var view = new view_1.View();
var Data = (function () {
    function Data() {
    }
    Data.pages = function (src) {
        var store = new stores_1.PageStore(src);
        var pages = store.all();
        return pages
            .map(function (page) { return view.addView(page); });
    };
    Data.patterns = function (src) {
        var store = new stores_1.PatternStore(src);
        var patterns = store.all();
        return patterns
            .map(function (pattern) { return view.addView(pattern); });
    };
    Data.overviews = function (src) {
        var store = new stores_1.OverviewStore(src);
        return store.all();
    };
    Data.components = function (src) {
        var store = new stores_1.ComponentStore(src);
        var components = store.all();
        return components
            .map(function (component) { return view.addView(component); });
    };
    Data.all = function (src) {
        var patterns = Data.patterns(src);
        var components = Data.components(src);
        var pages = Data.pages(src);
        var overviews = Data.overviews(src);
        return { overviews: overviews, components: components, patterns: patterns, pages: pages };
    };
    return Data;
}());
exports.Data = Data;
