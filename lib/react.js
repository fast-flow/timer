import Timer from "fast-timer"
import {Component} from "react"
import cls from "classnames"
class TimerBtn extends Component {
    constructor(props) {
        super(props)
        let self = this
        self.state = {
            sec: 0,
            html: props.html
        }
    }
    componentWillMount() {
        let self = this
        self.fastTimer = new Timer({
            cache: self.props.cache
        })
        self.fastTimer.watch(function (date) {
            self.setState({
                sec: date.sec
            })
        })
        if (self.fastTimer.cacheSec()) {
            self.fastTimer.start(self.fastTimer.cacheSec())
        }
    }
    handleClick() {
        let self = this
        if (self.fastTimer.free) {
            self.props.trigger(function () {
                self.fastTimer.start(self.props.sec)
            })
        }
    }
    render() {
        let html
        if (this.fastTimer.free) {
            html = this.state.html
        }
        else {
            html = this.props.watch({
                sec: this.state.sec
            })
        }
        return (
            <span className={cls({
                [this.props.className]: true,
                [this.props.timingClass]: !this.fastTimer.free
            })}
            dangerouslySetInnerHTML={{__html: html}}
            onClick={this.handleClick.bind(this)}
             ></span>
        )
    }
}

module.exports = TimerBtn
