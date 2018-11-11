import React from 'react'
import withRouter from 'umi/withRouter';
import { connect } from 'dva'
import Cookies from 'universal-cookie'
import Redirect from 'umi/redirect';
import MainLayout from 'components/layout/MainLayout'
import _ from 'lodash';
import '../components/layout/common.less'

const cookies = new Cookies()
class IndexLayout extends React.Component {

  render() {
    const { user, children } = this.props;
    const token = cookies.get('access_token')
    const hasToken = token && token.length > 0;

    if(_.startsWith(this.props.location.pathname, "/login")){
      if (hasToken && user.id > 0) {
        return (<MainLayout>{children}</MainLayout>)
      }
      return (<div>{children}</div>)
    }
    
    if (hasToken && user.id > 0) {
      return (<MainLayout>{children}</MainLayout>)
    }
    return <Redirect to="/login" />;
  }
}
export default withRouter(connect(state => (state.login))(IndexLayout));
