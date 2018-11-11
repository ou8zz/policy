import Cookies from 'universal-cookie'
import { routerRedux } from 'dva/router';
import produce from "immer"
import { login, logout, register } from 'services/user'
import { message } from 'antd'

const cookies = new Cookies()
const initState = {
    login: false,
    user: {},
    loading: false
}

export default {
    namespace: 'login',
    state: initState,
    subscriptions: {
        setup({ dispatch }) {

        },
    },

    effects: {
        *doLogin({ params }, { call, put }) {
            yield put({ type: 'setLoading', loading: true });
            const user = yield call(login, params)
            yield put({ type: 'setUser', user: user.Data })
            yield put({ type: 'setLoading', loading: false });
            if (user.Data && user.Data.id > 0) {
                message.success('登录成功');
                cookies.set('access_token', user.Data.token, { path: '/' })
                yield put(routerRedux.push('/'));
            } else {
                message.error(user.Data || user.Msg);
            }
        },
        *doLogout({ params }, { call, put }) {
            yield put({ type: 'setLoading', loading: true });
            yield call(logout, params)
            yield put({ type: 'setLoading', loading: false });
            yield put(routerRedux.push('/login'));
            yield put({ type: 'logout' })
        },
        *doRegister({ params }, { call, put }) {
            yield put({ type: 'setLoading', loading: true });
            const user = yield call(register, params)
            yield put({ type: 'setUser', user: user.Data })
            yield put({ type: 'setLoading', loading: false });
            if (user.Data && user.Data.id > 0) {
                message.success('登录成功');
                cookies.set('access_token', user.Data.token, { path: '/' })
                yield put(routerRedux.push('/'));
            } else {
                message.error(user.Data || user.Msg);
                yield put(routerRedux.push('/login'));
            }
        },
    },

    reducers: {
        setUser(state, { user }) {
            return produce(state, draft => { draft.user = user })
        },

        logout() {
            cookies.remove('access_token')
            return initState
        },

        setLoading(state, { loading }) {
            return produce(state, draft => { draft.loading = loading })
        },
    },
}

