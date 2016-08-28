"use strict";
var path = require('path');
var chalk = require('chalk');
var express = require('express');
var watch_1 = require('./watch');
var data_1 = require('./data');
var Server = (function () {
    function Server(root) {
        this.app = express();
        this.http = require('http').Server(this.app);
        this.io = require('socket.io')(this.http);
        this.root = root;
        this.db = data_1.Data.all(this.root);
        this.setup();
        this.start();
    }
    Server.prototype.setup = function () {
        this.app.use('/dist', express.static(path.join(__dirname, '../..', 'pops-style-guide-frontend/dist')));
        this.app.use('/api', require('json-server').router(this.db));
        this.app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, '../..', 'pops-style-guide-frontend/index.html'));
        });
        this.io.on('connection', function (socket) { });
    };
    Server.prototype.eventEmit = function (event, name) {
        var data = {};
        data.name = name;
        data[event] = data_1.Data[event](this.root);
        this.io.emit(event, data);
    };
    Server.prototype.start = function () {
        var port = process.env.PORT || 9095;
        this.http.listen(port, function () {
            console.log("Listening at " + chalk.cyan("http://127.0.0.1:" + port));
        });
    };
    Server.prototype.watch = function () {
        var _this = this;
        var dirsToWatch = [
            path.join(this.root, 'pages'),
            path.join(this.root, 'patterns'),
            path.join(this.root, 'overviews'),
            path.join(this.root, 'components')
        ];
        var watcher = new watch_1.Watch(dirsToWatch);
        watcher.getWatcher()
            .on('change', function (filePath) {
            var event;
            var name = path.basename(filePath).split('.').slice(0, -1).join('');
            var splitPath = filePath.split('/');
            if (filePath.indexOf('components')) {
                event = 'components';
            }
            else if (filePath.indexOf('patterns')) {
                event = 'patterns';
            }
            else if (filePath.indexOf('pages')) {
                event = 'pages';
            }
            else if (filePath.indexOf('overviews')) {
                event = 'overviews';
            }
            if (name === 'README') {
                name = filePath.split('/').slice(-2)[0];
            }
            _this.eventEmit(event, name);
            watcher.eventLog('Changed', filePath);
        });
    };
    return Server;
}());
exports.Server = Server;
