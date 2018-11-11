
import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import withRouter from 'umi/withRouter';
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'
import styles from 'components/layout/main.less'
import { LocaleProvider } from 'antd';
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
                    <Header {...headerProps} />
                    <div> {children} </div>
                    <Footer />
                </div>
            </LocaleProvider>
        )
    }
}

export default withRouter(connect(({ login }) => ({ login }))(MainLayout))
