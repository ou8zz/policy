
import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import withRouter from 'umi/withRouter';
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'
import Sider from 'components/layout/sider'
import styles from 'components/layout/main.less'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

class App extends React.Component {
    // componentDidMount() {
    // }

    componentWillReceiveProps(nextProps) {

        const { login } = nextProps.app
        console.log('====================================');
        console.log(login);
        console.log('====================================');
        if (login) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    componentWillUnmount() {
        console.log('====================================');
        console.log(this.interval);
        console.log('====================================');
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    render() {
        const { children, dispatch, location, app } = this.props
        const { login, user, siderFold, darkTheme, isNavbar, menuPopoverVisible } = app // qrUuid
        const headerProps = {
            user,
            siderFold,
            location,
            isNavbar,
            menuPopoverVisible,
            switchMenuPopover() {
                dispatch({ type: 'app/switchMenuPopver' })
            },

            logout() {
                dispatch({ type: 'app/logout' })
            },

            switchSider() {
                dispatch({ type: 'app/switchSider' })
            },
        }
        const siderProps = {
            siderFold,
            darkTheme,
            location,
            changeTheme() {
                dispatch({ type: 'app/changeTheme' })
            },
            tags: user.roles,
        }

        return (
            <LocaleProvider locale={zhCN}>
                <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
                    <Header {...headerProps} />
                    <div> {children} </div>
                    <Footer />
                </div>
            </LocaleProvider>
        )
    }
}

export default withRouter(connect(({ app }) => ({ app }))(App))
