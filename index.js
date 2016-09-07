import moment from "moment/min/moment.min"
import simpleBrowserStorage from "simple-browser-storage"
class Timer {
    constructor (settings) {
        let self = this
        self._settings = settings
        self._timer = false
        self.timing = false
        self._callQueue = []
        self._endQueue = []
        self._second = null
        self._browserStorage = null
        if (self._settings.cache) {
            self._cache()
        }
    }
    _cache() {
        let self = this
    }
    _timeout() {
        let self = this
        if (self._second === 0) {
            self.timing = false
            self._endQueue.forEach(function (fn) {
                fn()
            })
        }
        else {
            self._callQueue.forEach(function (fn) {
                fn(self._second)
            })
            self._second--
            setTimeout(self._timeout.bind(self), 1000)
        }
    }
    start() {
        let self = this
        self._second = self._settings.second
        self.timing = true
        // 延迟出发一遍又 call 绑定更多事件
        setTimeout(self._timeout.bind(self), 0)
    }
    call(fn) {
        let self = this
        self._callQueue.push(fn)
    }
    end(fn) {
        let self = this
        self._endQueue.push(fn)
    }
}
module.exports = Timer
