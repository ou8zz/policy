
import React from 'react'
import withRouter from 'umi/withRouter';
import _ from 'lodash';
import { connect } from 'dva'
import dynamic from 'umi/dynamic';
import Cookies from 'universal-cookie'
import Redirect from 'umi/redirect';
import axios from 'axios';

class IndexLayout extends React.Component {
  render() {
    const { dispatch, user, children } = this.props;
    const cookies = new Cookies()
    const token = cookies.get('access_token')
    const hasToken = token && token.length > 0;

    if(_.startsWith(this.props.location.pathname, "/login")){
      if (hasToken) {
        return <Redirect to="/" />;
      }
      return (<div>{children}</div>)
    }else{
      if (user.roles) {
        return (<div>{children}</div>)
      }
      if (!hasToken) {
        return <Redirect to="/login" />;
      }
      const DynamicApp = dynamic(async function() {
        try {
          const response = await axios.get(`/api/auth/dingding/login-tmp-code/${token}`);
          if (response.status === 200) {
            dispatch({
              type: 'app/setUser',
              user: response.data,
            })
            return () => <div>{children}</div>
          } else {
            cookies.remove('access_token', { domain: 'cailianpress.com' })
            cookies.remove('access_token', { domain: 't-editor.cailianpress.com' })
            cookies.remove('access_token', { domain: 'editor.cailianpress.com' })
            cookies.remove('access_token')
            return () => <Redirect to="/login" />;
          }
        } catch (err) {
          cookies.remove('access_token')
          return () => <Redirect to="/login" />;
        }
      })

      return <DynamicApp />
    }
  }
}
export default withRouter(connect(state => {
  return {
    user: state.app.user,
  }
})(IndexLayout));
