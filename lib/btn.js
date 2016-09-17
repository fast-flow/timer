import Timer from "../index"
import classUtil from "./class-util"
const btn = function btn(ele, settings) {
    if (typeof ele === 'undefined') {
        throw new Error("timerBtn(ele, settings), ele is undefined!")
    }
    settings = settings || {}
    settings.timingClass = settings.timingClass || ''
    let time = new Timer({
        cache: settings.cache
    })
    let watchHandle = function (date) {
        let text = settings.watch(date)
        ele.innerHTML = text
        if (!date.sec) {
            classUtil.removeClass(ele, settings.timingClass)
        }
    }
    if (time.cacheSec()) {
        time.start(time.cacheSec())
        classUtil.addClass(ele, settings.timingClass)
        watchHandle({
            sec: time.cacheSec()
        })
    }
    time.watch(watchHandle)
    let run = function () {
        classUtil.addClass(ele, settings.timingClass)
        time.start(settings.sec)
    }
    let handleClick = function () {
        if (time.free) {
            settings.start(run)
        }
    }
    if (ele.addEventListener) {
        ele.addEventListener( 'click', handleClick, false );
    }
    else {
        ele.attachEvent('onclick', handleClick)
    }
}
module.exports = btn
