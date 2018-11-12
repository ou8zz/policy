import React from 'react'
import withRouter from 'umi/withRouter';
import { connect } from 'dva'
import dynamic from 'umi/dynamic';
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
    console.log("1----------------------->>>", hasToken, token, user);
    if(_.startsWith(this.props.location.pathname, "/login")){
      return (<div>{children}</div>)
    }
    const DynamicLayout = dynamic({ loader: async () => {
      if (hasToken) {
        return () => <MainLayout>{children}</MainLayout>
      }
      return () => <Redirect to="/login" />;
    }})
    return <DynamicLayout />
  }
}
export default withRouter(connect(state => (state.login))(IndexLayout));
