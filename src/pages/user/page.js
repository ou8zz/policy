import React from 'react'
import { connect } from 'dva';
import UserInfo from '../../components/user/info';

class UserPage extends React.Component {
  render() {
    const { dispatch } = this.props;
    const thisProps = {
      ...this.props,
      getUserInfo(params) {
        dispatch({ type: 'login/getUserInfo', params: params })
      },
      getUserAnswer(params) {
        dispatch({ type: 'login/getUserAnswer', params: params })
      },
    }
    return <UserInfo {...thisProps} />
  }
}

export default connect(state => (state.user))(UserPage);
