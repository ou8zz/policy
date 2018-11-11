import React from 'react'
import { connect } from 'dva';
import Login from '../../components/user/login';

class LoginPage extends React.Component {
  render() {
    const { dispatch } = this.props;
    const headerProps = {
      ...this.props,
      doLogin(params) {
        dispatch({ type: 'login/doLogin', params: params })
      },
      doRegister(params) {
        dispatch({ type: 'login/doRegister', params: params })
      },
    }
    return <Login {...headerProps} />
  }
}

export default connect(state => (state.login))(LoginPage);
