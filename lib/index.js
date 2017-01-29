import moment from "moment/min/moment.min"
require('localstorage-browser-polyfill')
class Timer {
    constructor (settings) {
        const self = this
        settings = settings || {}
        self.free = true
        self._watchQueue = []
        self._settings = settings
        self._storageName = 'fast-flow/timer_cache:' + settings.cache
        self._storage = {
            setState: function (data) {
                data = JSON.stringify(data)
                localStorage.setItem(self._storageName, data)
            },
            getState: function () {
                return JSON.parse(localStorage.getItem(self._storageName)) || {}
            }
        }
    }
    _countDown () {
        let self = this
        // @1 @2 必须按先后顺序执行，因为 watch 需要获取 free
        // @1 Start
        if (self._countDownSec === 0) {
            this.free = true
        }
        else {
            setTimeout(self._countDown.bind(self), 1000)
        }
        // @1 End
        // @2 Start
        self._watchQueue.forEach(function (fn) {
            fn.call(self, {
                sec: self._countDownSec
            })
        })
        // 递减需要在 watch 后执行。例如 sec 为 10 秒，最初应该 watch 触发 10 ，而不是 9。
        self._countDownSec = self._countDownSec - 1
        // @2 End
    }
    _setEndDateInCache(sec) {
        let self = this
        self._storage.setState({
            endDate: moment().add(sec, 's')
        })
    }
    cacheSec() {
        let self = this
        let endDate
        let dateDiff
        let secondDiff
        // 每次读取 second 必须判断缓存，从缓存中取
        if (self._settings.cache) {
           endDate = self._storage.getState().endDate
           if (!endDate) {
               return false
           }
           if (moment().isAfter(moment(endDate))) {
               return false
           }
           dateDiff = moment(endDate).diff(moment())
           secondDiff = dateDiff/1000
           secondDiff = Math.round(secondDiff)
           return secondDiff
        }
        else {
            return false
        }
    }
    watch(fn) {
        this._watchQueue.push(fn)
    }
    start(sec) {
        if (typeof sec !== 'number') {
            sec = parseInt(sec, 10)
        }
        if (isNaN(sec)) {
            throw new Error('time.start(sec), sec need to be a number!')
        }
        if (typeof sec !== 'number') {
            throw new Error('time.start(sec), sec need to be a number!')
        }
        if (this._settings.cache && !this.cacheSec()) {
            this._setEndDateInCache(sec)
        }
        this.free = false
        this._countDownSec = sec
        this._countDown()
    }
}
module.exports = Timer
