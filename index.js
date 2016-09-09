import moment from "moment"
import simpleBrowserStorage from "simple-browser-storage"
class Timer {
    constructor(settings) {
        let self = this

        self._ = {
            settings: settings,
            _useGetSecondAndSetSecondChangeThis: settings.second,
            cache: {
                /*
                abc: {
                    "expires": "2016-09-08T06:35:53.441Z",
                    "endDate": "2016-09-08T06:35:53.441Z"
                }
                */
            },
            callback : {
                watch: [],
                end: []
            }
        }
        self.free = true
        self._storage = simpleBrowserStorage({
            name: settings.cache,
            // storage 过期时间进来与秒数匹配，至少 1 分钟
            expiresTime: Math.ceil(self._.settings.second/60)
        })
    }
    _setEndDateInCache(second) {
        let self = this
        self._storage.setState({
            endDate: moment().add(second, 's')
        })
    }
    _updateSecond() {
        let self = this
        let endDate
        let dateDiff
        let secondDiff
        // 每次读取 second 必须判断缓存，从缓存中取
        if (self._.settings.cache && !self.free) {
            endDate = self._storage.getState().endDate
            if (endDate) {
                // 结束时间已过期
                if (self.hasCache()) {
                    // 存在结束时间并未过期则不需要设置新的结束时间到缓存
                }
                else {
                    self._setEndDateInCache(self._._useGetSecondAndSetSecondChangeThis)
                }
            }
            else {
                self._setEndDateInCache(self._._useGetSecondAndSetSecondChangeThis)
            }
            endDate = self._storage.getState().endDate
            dateDiff = moment(endDate).diff(moment())
            secondDiff = dateDiff/1000
            secondDiff = Math.round(secondDiff)
            self._setSecond(secondDiff)
        }
    }
    _getSecond() {
        let self = this
        let secondDiff
        let endDate
        self._updateSecond.bind(self)
        return self._._useGetSecondAndSetSecondChangeThis
    }
    _setSecond(second) {
        let self = this
        self._._useGetSecondAndSetSecondChangeThis = second
    }
    _clock() {
        let self = this
        let data = self._
        let second = self._getSecond()
        if (second === 0) {
            self.free = true
            data.callback.end.forEach(function (fn) {
                fn.apply(self)
            })
        }
        else {
            data.callback.watch.forEach(function (fn) {
                fn.apply(self)
            })
            self._setSecond(second - 1)
            setTimeout(self._clock.bind(self), 1000)
        }
    }
    // 存在缓存并没有超时
    hasCache() {
        let self = this
        let endDate = self._storage.getState().endDate
        if (endDate) {
            return moment().isBefore(moment(endDate))
        }
        else {
            return false
        }
    }
    run() {
        let self = this
        if (!self.free) {
            throw new Error('Please check time.timing(). Just like: if (time.timing()) { time.run() }')
            return false
        }
        // 一个组件重复 run 需要重置 second
        self._setSecond(self._.settings.second)
        // @1 @2 的顺序不能错，因为 _updateSecond 中需要读取 self.free
        // @1
        self.free = false
        // @2
        self._updateSecond()

        // 延迟执行，原因是 watch 和 end 需要加回调
        setTimeout(self._clock.bind(self),0)
    }
    watch(fn) {
        let self = this
        self._.callback.watch.push(fn)
    }
    end(fn) {
        let self = this
        self._.callback.end.push(fn)
    }
    second() {
        let self = this
        return self._getSecond()
    }
}
module.exports = Timer
