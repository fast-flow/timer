# timer

> 可复用定时器，可用于限制邮件短信发送

<button type="submit" id="demo1" ></button>

````js
var Timer = require('./index')

var time = new Timer({
    // 10 秒计时
    second: 10
})

time.start()
// 定时回调
time.call(function (second) {
    console.log('second:' + second)
    console.log('timing:' + time.timing)
    document.getElementById('demo1').innerHTML = second
})
time.end(function () {
    console.log("It's time")
    console.log('timing:' + time.timing)
    document.getElementById('demo1').innerHTML = '结束'
})
/*
    0s
    call() second: 10  timing: true

    1s
    call() second: 9  timing: true

    2s
    call() second: 8  timing: true

    ...

    8s
    call() second: 2  timing: true

    9s
    call() second: 1  timing: true

    10s
    end() It's time  timing: false
*/
````

## 刷新页面后继续之前读秒进度

<button type="submit" id="cacheTime" ></button>

````js
var Timer = require('./index')
var time = new Timer({
    second: 10,
    cache: 'abc'
})
time.start()
time.call(function (second) {
    document.getElementById('cacheTime').innerHTML = second
})
````

> 建议计时超过10分钟。不要使用 cache 功能。因为cache是将数据存储到 localStorage 或 cookie。超过10分钟的建议打开页面时候让服务器返回明确的剩余时间。
