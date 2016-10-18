"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require("moment/min/moment.min");

var _moment2 = _interopRequireDefault(_moment);

var _simpleBrowserStorage = require("simple-browser-storage");

var _simpleBrowserStorage2 = _interopRequireDefault(_simpleBrowserStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer(settings) {
        _classCallCheck(this, Timer);

        settings = settings || {};
        this.free = true;
        this._watchQueue = [];
        this._settings = settings;
        this._storage = (0, _simpleBrowserStorage2["default"])({
            name: settings.cache,
            expiresTime: 43200
        });
    }

    _createClass(Timer, [{
        key: "_countDown",
        value: function _countDown() {
            var self = this;
            // @1 @2 必须按先后顺序执行，因为 watch 需要获取 free
            // @1 Start
            if (self._countDownSec === 0) {
                this.free = true;
            } else {
                setTimeout(self._countDown.bind(self), 1000);
            }
            // @1 End
            // @2 Start
            self._watchQueue.forEach(function (fn) {
                fn.call(self, {
                    sec: self._countDownSec
                });
            });
            // 递减需要在 watch 后执行。例如 sec 为 10 秒，最初应该 watch 触发 10 ，而不是 9。
            self._countDownSec = self._countDownSec - 1;
            // @2 End
        }
    }, {
        key: "_setEndDateInCache",
        value: function _setEndDateInCache(sec) {
            var self = this;
            self._storage.setState({
                endDate: (0, _moment2["default"])().add(sec, 's')
            });
        }
    }, {
        key: "cacheSec",
        value: function cacheSec() {
            var self = this;
            var endDate = void 0;
            var dateDiff = void 0;
            var secondDiff = void 0;
            // 每次读取 second 必须判断缓存，从缓存中取
            if (self._settings.cache) {
                endDate = self._storage.getState().endDate;
                if (!endDate) {
                    return false;
                }
                if ((0, _moment2["default"])().isAfter((0, _moment2["default"])(endDate))) {
                    return false;
                }
                dateDiff = (0, _moment2["default"])(endDate).diff((0, _moment2["default"])());
                secondDiff = dateDiff / 1000;
                secondDiff = Math.round(secondDiff);
                return secondDiff;
            } else {
                return false;
            }
        }
    }, {
        key: "watch",
        value: function watch(fn) {
            this._watchQueue.push(fn);
        }
    }, {
        key: "start",
        value: function start(sec) {
            if (typeof sec !== 'number') {
                sec = parseInt(sec, 10);
            }
            if (isNaN(sec)) {
                throw new Error('time.start(sec), sec need to be a number!');
            }
            if (typeof sec !== 'number') {
                throw new Error('time.start(sec), sec need to be a number!');
            }
            if (this._settings.cache && !this.cacheSec()) {
                this._setEndDateInCache(sec);
            }
            this.free = false;
            this._countDownSec = sec;
            this._countDown();
        }
    }]);

    return Timer;
}();

module.exports = Timer;