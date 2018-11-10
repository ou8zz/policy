import { message } from 'antd'
import Cookies from 'universal-cookie'
import { routerRedux } from 'dva/router';
import produce from "immer"
import { login } from 'services/user'

const cookies = new Cookies()

const initState = {
    login: false,
    user: {},
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    tags: [],
    columns: [],
}

export default {
    namespace: 'app',

    state: initState,

    subscriptions: {
        setup({ dispatch }) {
          window.onresize = function names() {
              dispatch({ type: 'changeNavbar' })
          }
        },
    },

    effects: {
        *login({loginTmpCode}, { call, put }) {
            const user = yield call(login, loginTmpCode)
            yield put({ type: 'setUser', user })
            cookies.set('access_token', loginTmpCode, { path: '/' })
            yield put(routerRedux.push('/'));
        },


        *switchSider({ payload }, { put }) {
          yield put({
              type: 'handleSwitchSider',
          })
        },

        *changeTheme({ payload }, { put }) {
            yield put({
                type: 'handleChangeTheme',
            })
        },

        *changeNavbar({ payload }, { put }) {
            if (document.body.clientWidth < 769) {
                yield put({ type: 'showNavbar' })
            } else {
                yield put({ type: 'hideNavbar' })
            }
        },

        *switchMenuPopver({ payload }, { put }) {
            yield put({
                type: 'handleSwitchMenuPopver',
            })
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
      },
      handleSwitchSider(state) {
          localStorage.setItem('antdAdminSiderFold', !state.siderFold)
          return {
              ...state,
              siderFold: !state.siderFold,
          }
      },
      handleChangeTheme(state) {
          localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
          return {
              ...state,
              darkTheme: !state.darkTheme,
          }
      },
      showNavbar(state) {
          return {
              ...state,
              isNavbar: true,
          }
      },
      hideNavbar(state) {
          return {
              ...state,
              isNavbar: false,
          }
      },
      handleSwitchMenuPopver(state) {
          return {
              ...state,
              menuPopoverVisible: !state.menuPopoverVisible,
          }
      }
    },
}

