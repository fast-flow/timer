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
        self.secondCount = null
        self._browserStorage = simpleBrowserStorage({
            name: self._settings.cache,
            expiresTime: Math.ceil(self._settings.second/60)
        })
        if (self._settings.cache) {
            self._cache()
        }
        // new Timer 后可能会读取 secondCount 所以在此处设置 secondCount
        // 此代码务必阿紫 self._cache() 后执行
        self.secondCount = self._settings.second
    }
    _setEndDateInCache() {
        let self = this
        self._browserStorage.setState({
            endDate: moment().add(self._settings.second, 's')
        })
    }
    _cache() {
        let self = this
        let localData
        let dateDiff
        let secondDiff

        localData = self._browserStorage.getState()
        if (localData.endDate) {
            // 结束时间已过期
            if (moment().isAfter(moment(localData.endDate))) {
                self._setEndDateInCache()
            }
        }
        else {
            self._setEndDateInCache()
        }
        localData = self._browserStorage.getState()
        dateDiff = moment(localData.endDate).diff(moment())
        secondDiff = dateDiff/1000
        secondDiff = Math.round(secondDiff)
        self._settings.second = secondDiff
    }
    _timeout() {
        let self = this
        if (self.secondCount === 0) {
            self.timing = false
            self._endQueue.forEach(function (fn) {
                fn()
            })
        }
        else {
            self._callQueue.forEach(function (fn) {
                fn(self.secondCount)
            })
            self.secondCount--
            setTimeout(self._timeout.bind(self), 1000)
        }
    }
    start() {
        let self = this
        self.secondCount = self._settings.second
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
