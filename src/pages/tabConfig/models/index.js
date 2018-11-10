import { fromJS } from 'immutable'
import {
  getCheckVersion,
  setCheckVersion,
  getAboutUs,
  setAboutUs,
  getWhiteList,
  getMyColumn,
  setMyColumn,
  editMyColumn,
  getProductList,
  getProcessReiewer,
  addProcessReiewer,
  editProcessReiewer,
  getFeaturedColumns,
  getBrokerSwitch,
  setBrokerSwitch,
} from 'services/tabConfig'

const defaultState = {
  dataSource: fromJS([]),
  aboutUsData: fromJS([]),
  whiteList: fromJS([]),
  userList: fromJS([]),
  myColumnList: [],
  productList: [],
  processReiewerList: fromJS([]),
  featuredList: fromJS([]),
  brokerSwitch: fromJS([]),
  loading: false,
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1,
  },
  searchParams: {},
};

export default {
  namespace: 'common',
  state: fromJS(defaultState),

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => { // query = {}
        if (pathname === '/tabConfig/cc') {
          dispatch({ type: 'fetch2' })
        }
        if (pathname === '/tabConfig/whiteList') {
          dispatch({ type: 'resetQuery', params: { isWhitelist: true } })
          dispatch({ type: 'fetch4' })
        }
      })
    },
  },

  effects: {
    *fetch2(_, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getCheckVersion, {});
      yield put({ type: 'setDataSource', dataSource: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *fetch3(_, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getAboutUs, {});
      yield put({ type: 'setAboutUsData', aboutUsData: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *fetch4(_, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const query = yield select(({ common }) => {
        const searchParams = common.get('searchParams').toJS()
        const pagination = common.get('pagination').toJS()
        return {
          ...searchParams,
          current: pagination.current,
          pageSize: pagination.pageSize,
        }
      });
      const res = yield call(getWhiteList, query);
      yield put({ type: 'setWhiteList', whiteList: res.data });
      yield put({
        type: 'setPagination', pagination: {
          total: res.totalRowsCount,
          current: query.current,
        }
      })
      yield put({ type: 'setLoading', loading: false });
    },
    *fetchUserList({ params }, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getWhiteList, params);
      yield put({ type: 'setStateData', userList: res.data });
      yield put({ type: 'setLoading', loading: false });
    },
    *fetchMyColumnList({ params }, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getMyColumn, params);
      yield put({ type: 'setMyColumnList', myColumnList: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *fetchProductList({ params }, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getProductList, params);
      yield put({ type: 'setProductList', productList: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *fetchProcessReiewer({ params }, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getProcessReiewer, params);
      yield put({ type: 'setProcessReiewerList', processReiewerList: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *fetchFeaturedColumns({ params }, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getFeaturedColumns, params);
      yield put({ type: 'setStateData', featuredList: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *fetchBrokerSwitch(_, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(getBrokerSwitch, {});
      yield put({ type: 'setBrokerSwitch', brokerSwitch: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *editBrokerSwitch({ params }, { call, put, select }) {
      yield put({ type: 'setLoading', loading: true });
      const res = yield call(setBrokerSwitch, params);
      yield put({ type: 'setBrokerSwitch', brokerSwitch: res });
      yield put({ type: 'setLoading', loading: false });
    },
    *getCheckVersion({ params }, { call, put }) {
      yield call(getCheckVersion, params);
      yield put({ type: 'fetch2' });
    },
    *setCheckVersion({ params }, { call, put }) {
      yield call(setCheckVersion, params);
      yield put({ type: 'fetch2' });
    },
    *getAboutUs({ params }, { call, put }) {
      yield call(getAboutUs, params);
      yield put({ type: 'fetch3' });
    },
    *setAboutUs({ params }, { call, put }) {
      yield call(setAboutUs, params);
      yield put({ type: 'fetch3' });
    },
    *getWhiteList({ params }, { call, put }) {
      yield call(getWhiteList, params);
      yield put({ type: 'fetch4' });
    },
    *setMyColumn({ params }, { call, put }) {
      yield call(setMyColumn, params);
      yield put({ type: 'fetch4' });
    },
    *editMyColumn({ params }, { call, put }) {
      yield call(editMyColumn, params);
      yield put({ type: 'fetchMyColumnList', params: { uid: params.uid } });
    },
    *addProcessReiewer({ params }, { call, put }) {
      yield call(addProcessReiewer, params);
      yield put({ type: 'fetchProcessReiewer', params: { uid: params.uid } });
    },
    *editProcessReiewer({ params }, { call, put }) {
      yield call(editProcessReiewer, params);
      yield put({ type: 'fetchProcessReiewer', params: { uid: params.uid } });
    },
  },

  reducers: {
    setExpireDates(state, { id, value }) {
      const idx = state.get('myColumnList', fromJS([])).findIndex(v => v.get('id') === id)
      return state.setIn(['myColumnList', idx, 'expireDates'], value)
    },
    setLoading(state, { loading }) {
      return state.set('loading', loading)
    },
    setDataSource(state, { dataSource }) {
      return state.set('dataSource', dataSource)
    },
    setAboutUsData(state, { aboutUsData }) {
      let list = aboutUsData.mobile && aboutUsData.mobile.map((v, k) => {
        return { id: k, val: v }
      })
      return state.set('aboutUsData', { ...aboutUsData, list: list || [] })
    },
    mergeAboutUsData(state, action) {
      return state.setIn(['aboutUsData', 'list'], action.params.list)
    },
    setWhiteList(state, { whiteList }) {
      return state.set('whiteList', fromJS(whiteList))
    },
    setMyColumnList(state, { myColumnList }) {
      return state.set('myColumnList', fromJS(myColumnList))
    },
    setProductList(state, { productList }) {
      return state.set('productList', productList)
    },
    setFeaturedList(state, { featuredList }) {
      return state.set('featuredList', featuredList)
    },
    setProcessReiewerList(state, { processReiewerList }) {
      return state.set('processReiewerList', processReiewerList)
    },
    setBrokerSwitch(state, { brokerSwitch }) {
      return state.set('brokerSwitch', brokerSwitch)
    },
    setPagination(state, action) {
      return state.mergeIn(['pagination'], action.pagination)
    },
    resetQuery(state, action) {
      return state.mergeIn(['searchParams'], action.params)
    },
    setStateData(state, param) {
      const [, k2] = Object.entries(param)
      return state.set(k2[0], k2[1])
    }
  },
}

