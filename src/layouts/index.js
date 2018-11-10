import React from 'react'
import withRouter from 'umi/withRouter';
import { connect } from 'dva'
import dynamic from 'umi/dynamic';
import Cookies from 'universal-cookie'
import Redirect from 'umi/redirect';
import MainLayout from 'components/layout/MainLayout'
import _ from 'lodash';
import '../components/layout/common.less'

class IndexLayout extends React.Component {

  render() {
    const { dispatch, user, children } = this.props;
    const cookies = new Cookies()
    const token = cookies.get('access_token')
    const hasToken = token && token.length > 0;

    if(_.startsWith(this.props.location.pathname, "/login")){
      console.log("hasToken4 = ", token)
      if (hasToken) {
        console.log("hasToken5 = ", token)
        return <Redirect to="/" />;
      }
      console.log("hasToken6 = ", token)
      return (<div>{children}</div>)
    }

    console.log("hasToken2 = ", token)

    if (!hasToken) {
      console.log("hasToken3 come innnnnn = ", token)

      return <Redirect to="/login" />;
    }

    const DynamicApp = dynamic(async function() {
      // return () => <MainLayout>{children}</MainLayout>;
      // return () => <Redirect to="/login" />;
      try {
        if (hasToken) {
          return () => <MainLayout>{children}</MainLayout>
        } else {
          cookies.remove('access_token', { domain: 'cailianpress.com' })
          cookies.remove('access_token', { domain: 't-editor.cailianpress.com' })
          cookies.remove('access_token', { domain: 'editor.cailianpress.com' })
          cookies.remove('access_token')
          //return () => <Redirect to="/login" />;
        }
      } catch (err) {
        cookies.remove('access_token', { domain: 'cailianpress.com' })
        cookies.remove('access_token', { domain: 't-editor.cailianpress.com' })
        cookies.remove('access_token', { domain: 'editor.cailianpress.com' })
        cookies.remove('access_token')
        return () => <Redirect to="/login" />;
      }
    })
    return <DynamicApp />
  }
}
export default withRouter(connect(state => {
  return {
    user: state.app.user,
  }
})(IndexLayout));
