import Cookies from 'universal-cookie'
import { routerRedux } from 'dva/router';
import produce from "immer"
import { login } from 'services/user'

const cookies = new Cookies()

const initState = {
    login: false,
    user: {},
}

export default {
    namespace: 'login',
    state: initState,
    subscriptions: {
        setup({ dispatch }) {
        //   window.onresize = function names() {
        //       dispatch({ type: 'changeNavbar' })
        //   }
        },
    },

    effects: {
        *doLogin({loginTmpCode}, { call, put }) {
            const user = yield call(login, loginTmpCode)
            yield put({ type: 'setUser', user })
            cookies.set('access_token', loginTmpCode, { path: '/' })
            yield put(routerRedux.push('/'));
        },

    },
    reducers: {
      setUser(state, { user }) {
        return produce(state, draft => {draft.user = user})
      },

      doLogout() {
          cookies.remove('access_token', { domain: 'cailianpress.com' })
          cookies.remove('access_token', { domain: 't-editor.cailianpress.com' })
          cookies.remove('access_token', { domain: 'editor.cailianpress.com' })
          cookies.remove('access_token')
          // window.localStorage.removeItem('user')
          return initState
      },

      loginFail(state) {
          return {
              ...state,
              login: false,
              loginButtonLoading: false,
          }
      },
      showLoginButtonLoading(state) {
          return { 
              ...state,
              loginButtonLoading: true,
          }
      },
      showLoading(state) {
          return {
              ...state,
              loading: true,
          }
      },
      hideLoading(state) {
          return {
              ...state,
              loading: false,
          }
      }
      
    },
}

