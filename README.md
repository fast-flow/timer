# timer

> 可复用定时器，可用于限制邮件短信发送

```
npm install fast-timer --save
```

<button type="submit" id="demo1" ></button>

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

> 数据会被缓存到 localStorage 或 cookie

<button type="submit" id="cacheTime" >text</button>
<br/>
secondCount:<span id="secondCount2"></span>

````js
var Timer = require('fast-timer')
var time = new Timer({
    second: 5,
    // cache 参数作为缓存的唯一标识
    cache: 'abc'
})
// 通过 time.secondCount 可获取读秒倒数。如果之前设置过缓存读秒，secondCount 不一定等于 second。
document.getElementById('secondCount2').innerHTML = time.secondCount
time.start()
time.call(function (second) {
    document.getElementById('cacheTime').innerHTML = second
})
time.end(function () {
    document.getElementById('cacheTime').innerHTML = 'done'
})
````


> 建议计时超过10分钟。不要使用 cache 功能。因为cache是将数据存储到 localStorage 或 cookie。超过10分钟的建议打开页面时候让服务器返回明确的剩余时间。


## 参与开发

```shell
git clone http://github.com/fast-flow/timer
cd timer
npm run update
npm run s
npm run dev
```
