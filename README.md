# timer

<script src="http://cdn.bootcss.com/react/0.14.8/react.min.js" ></script>
<script src="http://cdn.bootcss.com/react/0.14.8/react-dom.min.js" ></script>
<script src="http://cdn.bootcss.com/moment.js/2.14.1/moment.min.js"></script>

> 可复用定时器，可用于限制邮件短信发送

> Base on webpack+es6 build # 基于 webpack+es6 构建

```
npm install fast-timer --save
```

````css
.m-btn {
    background-color: #999;border:none;
}
html .m-btn--timing {
    background-color: #eee;
}
````

## btn

<button type="button" id="btn" class="m-btn" >timerBtn</button>

````js
var timerBtn = require('fast-timer/btn')
var btn = document.getElementById('btn')
var btnDefaultText = btn.innerHTML
timerBtn(btn, {
    sec: 10,
    cache: 'some23213412',
    timingClass: 'm-btn--timing',
    start: function () {
        // send ajax
        console.log('start')
    },
    watch: function (date) {
        if (date.sec) {
            return date.sec + 's'
        }
        else {
            return 'btnDefaultText'
        }
    }
})
````


<button type="button" id="demo" >click</button>

## DIY | 使用API定制开发

### simple

````js
var Timer = require('fast-timer')

var time = new Timer()
var demo = document.getElementById('demo')
// 定时回调
time.watch(function (date) {
    console.log('second:' + date.sec)
    console.log('free:' + time.free)
    if (date.sec === 0) {
        demo.innerHTML = 'done'
    }
    else {
        demo.innerHTML = date.sec
    }
})
demo.onclick = function (){
    if (time.free) {
        time.start(10)
    }
}
````


### cache

<button type="button" id="cacheBtn" >cache</button>

````js
var Timer = require('fast-timer')
var time = new Timer({
    cache: 'abc'
})
var cacheBtn = document.getElementById('cacheBtn')
if (time.cacheSec()) {
    time.start(time.cacheSec())
    cacheBtn.innerHTML = time.cacheSec()
}
time.watch(function (date) {
    console.log('second:' + date.sec)
    console.log('free:' + time.free)
    if (date.sec === 0) {
        cacheBtn.innerHTML = 'done'
    }
    else {
        cacheBtn.innerHTML = date.sec
    }
})
cacheBtn.onclick = function () {
    if (time.free) {
        time.start(10)
    }
}
````


### React - simple

<div id="react1"></div>

````js
var Timer = require('fast-timer')
var React = require('react')
var ReactDOM = require('react-dom')
var App = React.createClass({
    getInitialState: function () {
        return {
            sec: 0
        }
    },
    componentWillMount: function () {
        var self = this
        self.time = new Timer()
        self.time.watch(function (date) {
            self.setState({
                sec: date.sec
            })
        })
    },
    startTimer: function () {
        if (this.time.free) {
            this.time.start(this.props.sec)
        }
    },
    render: function () {
        return (
            <button onClick={this.startTimer}>
            {this.state.sec?this.state.sec:'click'}
            </button>
        )
    }
})
ReactDOM.render(<App sec={10} />, document.getElementById('react1'))
````

### React - cache

<div id="reactCache"></div>

````js
var Timer = require('fast-timer')
var React = require('react')
var ReactDOM = require('react-dom')
var App = React.createClass({
    getInitialState: function () {
        return {
            sec: 0
        }
    },
    componentWillMount: function () {
        var self = this
        self.time = new Timer({
            cache: 'abc'
        })
        self.time.watch(function (date) {
            self.setState({
                sec: date.sec
            })
        })
        if (self.time.cacheSec()) {
            self.time.start(self.time.cacheSec())
        }
    },
    startTimer: function () {
        if (this.time.free) {
            this.time.start(this.props.sec)
        }
    },
    render: function () {
        return (
            <button onClick={this.startTimer}>
            {this.state.sec?this.state.sec:'click'}
            </button>
        )
    }
})
ReactDOM.render(<App sec={10} />, document.getElementById('reactCache'))
````

## 参与开发

```shell
git clone
cd timer
npm run update
npm run dev
npm run s
```


<link rel="stylesheet" href="http://cdn.bootcss.com/highlight.js/9.6.0/styles/atom-one-dark.min.css">
