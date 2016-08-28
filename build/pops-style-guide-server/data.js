"use strict";
var stores_1 = require('./stores');
var Data = (function () {
    function Data() {
    }
    Data.pages = function (src) {
        var store = new stores_1.PageStore(src);
        return store.all();
    };
    Data.patterns = function (src) {
        var store = new stores_1.PatternStore(src);
        return store.all();
    };
    Data.overviews = function (src) {
        var store = new stores_1.OverviewStore(src);
        return store.all();
    };
    Data.components = function (src) {
        var store = new stores_1.ComponentStore(src);
        return store.all();
    };
    Data.all = function (src) {
        return {
            overviews: Data.overviews(src),
            components: Data.components(src),
            patterns: Data.patterns(src),
            pages: Data.pages(src)
        };
    };
    return Data;
}());
exports.Data = Data;
