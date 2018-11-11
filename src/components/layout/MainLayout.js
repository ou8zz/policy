
import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import withRouter from 'umi/withRouter';
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'
import styles from 'components/layout/main.less'
import { LocaleProvider, Row, Col } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

class MainLayout extends React.Component {

  render() {
    const { children, dispatch, login } = this.props
    const { user } = login
    const headerProps = {
      user,
      logout() {
        dispatch({ type: 'login/doLogout' })
      },
    }

    return (
      <LocaleProvider locale={zhCN}>
        <div className={classnames(styles.layout)}>
          <Row type="flex" justify="center" align="middle">
            <Col span={14}>
              <Header {...headerProps} />
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col span={14}>
              {children}
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col span={14}>
              <Footer />
            </Col>
          </Row>
        </div>
      </LocaleProvider>
    )
  }
}

export default withRouter(connect(({ login }) => ({ login }))(MainLayout))
