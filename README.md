# timer

> 可复用定时器，可用于限制邮件短信发送

````js
var Timer = require('fast-timer')

var time = new Timer({
    // 10 秒计时
    second: 10
})

time.start()
// 定时回调
time.call(function (second) {
    console.log('second:' + second)
    console.log('timing:' + time.timing)
})
time.end(function () {
    console.log("It's time")
    console.log('timing:' + time.timing)
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

````js
var Timer = require('fast-timer')
var time = new Timer({
    second: 20,
    cache: 'abc'
})
time.start()
time.call(function (second) {
    console.log('cache A:' + second)
})
````
