import Cookies from 'universal-cookie'
import { routerRedux } from 'dva/router';
import produce from "immer"
import { login, logout, register, userInfo } from 'services/user'
import { message } from 'antd'

const cookies = new Cookies()
const initState = {
    user: {},
    loading: false
}

export default {
    namespace: 'user',
    state: initState,
    subscriptions: {
        setup({ dispatch }) {
       
        },
    },

    effects: {
        *getUserInfo({ params }, { call, put }) {
            yield put({ type: 'setLoading', loading: true });
            const user = yield call(userInfo, params)
            yield put({ type: 'setUser', user:user.Data })
            yield put({ type: 'setLoading', loading: false });
        },
        *getUserAnswer({ params }, { call, put }) {
            yield put({ type: 'setLoading', loading: true });
            const user = yield call(userInfo, params)
            yield put({ type: 'setUser', user:user.Data })
            yield put({ type: 'setLoading', loading: false });
        },
    },

    reducers: {
      setUser(state, { user }) {
        return produce(state, draft => {draft.user = user})
      },

      setLoading(state, { loading }) {
        return produce(state, draft => {draft.loading = loading})
      },
    },
}

