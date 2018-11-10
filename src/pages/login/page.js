import React from 'react'
import { connect } from 'dva';
import Login from '../../components/user/login';

class LoginPage extends React.Component {
  render() {
    const { dispatch } = this.props;
    const headerProps = {
      doLogin(param) {
        dispatch({ type: 'login/doLogin', param})
      }
    }
    return <Login {...headerProps} />
  }
}

export default connect()(LoginPage);
