"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fastTimer = require("fast-timer");

var _fastTimer2 = _interopRequireDefault(_fastTimer);

var _react = require("react");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimerBtn = function (_Component) {
    _inherits(TimerBtn, _Component);

    function TimerBtn(props) {
        _classCallCheck(this, TimerBtn);

        var _this = _possibleConstructorReturn(this, (TimerBtn.__proto__ || Object.getPrototypeOf(TimerBtn)).call(this, props));

        var self = _this;
        self.state = {
            sec: 0,
            html: props.html
        };
        return _this;
    }

    _createClass(TimerBtn, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var self = this;
            self.fastTimer = new _fastTimer2["default"]({
                cache: self.props.cache
            });
            self.fastTimer.watch(function (date) {
                self.setState({
                    sec: date.sec
                });
            });
            if (self.fastTimer.cacheSec()) {
                self.fastTimer.start(self.fastTimer.cacheSec());
            }
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
            var self = this;
            if (self.fastTimer.free) {
                self.props.trigger(function () {
                    self.fastTimer.start(self.props.sec);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _cls;

            var html = void 0;
            if (this.fastTimer.free) {
                html = this.state.html;
            } else {
                html = this.props.watch({
                    sec: this.state.sec
                });
            }
            return React.createElement("span", { className: (0, _classnames2["default"])((_cls = {}, _defineProperty(_cls, this.props.className, true), _defineProperty(_cls, this.props.timingClass, !this.fastTimer.free), _cls)),
                dangerouslySetInnerHTML: { __html: html },
                onClick: this.handleClick.bind(this)
            });
        }
    }]);

    return TimerBtn;
}(_react.Component);

exports["default"] = TimerBtn;

module.exports = TimerBtn;