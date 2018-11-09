import { message, Modal } from 'antd';

export default {
  onError(e, dispatch) {
    e.preventDefault();
    if (e.message === '未登陆') {
      Modal.error({
        title: 'ERROR',
        content: '登录信息失效，需要重新登录',
        onOk() {
          dispatch({ type: 'app/logout' })
        },
      })
    } else {
      console.log(e) // eslint-disable-line
      message.error(e.msg || e.message || e)
    }
    // message.error(err.message);
  },
};
