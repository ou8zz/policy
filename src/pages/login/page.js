import React from 'react'
import { connect } from 'dva';
import axios from 'axios';

class LoginPage extends React.Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    this.hanndleMessage = function (event) {
      var origin = event.origin;
      if( origin == "https://login.dingtalk.com" ) { //判断是否来自ddLogin扫码事件。
        const loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        dispatch({
          type: 'app/login',
          loginTmpCode,
        })
      }
    };
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', this.hanndleMessage, false);
    } else if (typeof window.attachEvent != 'undefined') {
      window.attachEvent('onmessage', this.hanndleMessage);
    }
    axios.get('/api/auth/dingtalk-qrconnect-url').then((response) => {
      if (response.status !== 200) {
        return
      }
      var obj = DDLogin({ // eslint-disable-line
        id:"login_container",
        goto: encodeURIComponent(response.data.url),
        style: "border:none;background-color:#FFFFFF;",
        width : "365",
        height: "400"
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentWillUnmount() {
    if (typeof window.addEventListener != 'undefined') {
      window.removeEventListener('message', this.hanndleMessage);
    } else if (typeof window.attachEvent != 'undefined') {
        window.detachEvent('onmessage', this.hanndleMessage);
    }
  }
  render() {
    return (<div id="login_container"/>)
  }
}

export default connect()(LoginPage);
