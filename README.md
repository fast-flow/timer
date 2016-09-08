# timer

<script src="http://cdn.bootcss.com/moment.js/2.14.1/moment.min.js" ></script>

> 可复用定时器，可用于限制邮件短信发送

```
npm install fast-timer --save
```

<button type="submit" id="demo1" ></button>

````js
var Timer = require('fast-timer')
var time = new Timer({
    second: 10
})
var demo1 = document.getElementById('demo1')
time.watch(function () {
    demo1.innerHTML = this.second()
})

time.end(function () {
    demo1.innerHTML = 'end'
})
time.run()
/*
    0s
    watch() second: 10

    1s
    watch() second: 9

    2s
    watch() second: 8

    ...

    8s
    watch() second: 2

    9s
    watch() second: 1

    10s
    end() It's time
*/
````

## 短信发送，刷新页面后继续之前读秒进度

<button type="button" id="sendSms" >SendSms</button>
<span id="cacheTip"></span>
<br />
view page second: <span id="cacheSec"></span>
````js
var Timer = require('fast-timer')
var time = new Timer({
    second: 10,
    cache: 'abs'
})
if (time.hasCache()) {
    document.getElementById('cacheTip').innerHTML = '缓存结束时间存在并没超时，执行 run。'
    time.run()
}
document.getElementById('cacheSec').innerHTML = time.second()
time.watch(function () {
    document.getElementById('sendSms').innerHTML = this.second()
})
time.end(function () {
    document.getElementById('sendSms').innerHTML = 'cache end'
})

document.getElementById('sendSms').onclick = function () {
    // 不在计时状态
    if (time.free) {
        time.run()
    }
}
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
