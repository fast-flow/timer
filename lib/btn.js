"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _classUtil = require("./class-util");

var _classUtil2 = _interopRequireDefault(_classUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var btn = function btn(ele, settings) {
    if (typeof ele === 'undefined') {
        throw new Error("timerBtn(ele, settings), ele is undefined!");
    }
    settings = settings || {};
    settings.timingClass = settings.timingClass || '';
    var time = new _index2["default"]({
        cache: settings.cache
    });
    var watchHandle = function watchHandle(date) {
        var text = settings.watch(date);
        ele.innerHTML = text;
        if (!date.sec) {
            _classUtil2["default"].removeClass(ele, settings.timingClass);
        }
    };
    if (time.cacheSec()) {
        time.start(time.cacheSec());
        _classUtil2["default"].addClass(ele, settings.timingClass);
        watchHandle({
            sec: time.cacheSec()
        });
    }
    time.watch(watchHandle);
    var triggerRunStart = function triggerRunStart() {
        _classUtil2["default"].addClass(ele, settings.timingClass);
        time.start(settings.sec);
    };
    var handleClick = function handleClick() {
        if (time.free) {
            settings.trigger(triggerRunStart);
        }
    };
    if (ele.addEventListener) {
        ele.addEventListener('click', handleClick, false);
    } else {
        ele.attachEvent('onclick', handleClick);
    }
};
exports["default"] = btn;

module.exports = btn;