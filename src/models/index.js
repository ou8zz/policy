import { fromJS } from 'immutable'
import { message } from 'antd'
import * as tagService from 'services/tags'
import _ from 'lodash'

const initState = fromJS({
  tags: [],
  loading: false,
  searchParams: {},
})

export default {
  namespace: 'tags',

  state: initState,

  effects: {
    *loadAllTags({}, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const query = yield select(({ tags }) => {
        return tags.get('searchParams').toJS()
      })
      try {
        const tags = yield call(tagService.loadAllTags, query)
        yield put({ type: 'setTags', tags })
      } finally {
        yield put({ type: 'hideLoading' })
      }
    },
    // 删除 单独规格
    *delete({ tagId }, { call, put }) {
      yield put({ type: 'showLoading' })
      try {
        yield call(tagService.deleteTag, tagId)
        message.success('删除成功!')
        yield put({ // 根据 id, 删除要删除的 规格
          type: 'removeTag',
          tagId,
        })
      } finally {
        yield put({ type: 'hideLoading' })
      }
    },
    *save({ tagId }, { put, call, select }) {
      yield put({ type: 'showLoading' })
      const tag = yield select(({ tags }) => tags.get('tags', fromJS([])).find(s => s.get('id') === tagId)) // 拿出模态列表
      tagId = tag.get('id', 0) // eslint-disable-line
      try {
        const commitValue = {
          name: tag.get('name', ''),
          visible: tag.get('visible', false),
          categoryID: tag.get('categoryID'),
        }
        const errMsg = []
        if (!_.isString(commitValue.name) || commitValue.name.length <= 0) {
          errMsg.push('名称必须填写')
        }
        yield put({ type: 'validationError', errMsg })
        if (errMsg.length > 0) {
          return
        }

        if (tagId > 0) {
          yield call(tagService.update, {
            ...commitValue,
            id: tagId,
          })
        } else {
          const data = yield call(tagService.create, {
            ...commitValue,
          })
          tagId = data.id // eslint-disable-line
          yield put({ type: 'createTagSuccess', tagId: data.id })
        }
        // 2. 更新 modal item 状态
        yield put({
          type: 'editTagSuccess',
          tagId,
        })
        // 3. 提示 '更新成功'
        message.success('更新成功!')
      } finally {
        yield put({ type: 'hideLoading' })
      }
    },
  },
  reducers: {
    setSearchParams(state, action) {
      return state
        .mergeIn(['searchParams'], action.searchParams)
    },
    validationError(state, { errMsg }) {
      return state.set('errMsg', fromJS(errMsg))
    },
    createTagSuccess(state, { tagId }) {
      const idx = state.get('tags').findIndex(v => v.get('id', 0) === 0)
      return state.setIn(['tags', idx, 'id'], tagId)
    },
    removeTag(state, { tagId }) {
      const idx = state.get('tags').findIndex(v => v.get('id') === tagId)
      return state.removeIn(['tags', idx])
    },
    startCreate(state) {
      const idx = state.get('tags').findIndex(v => v.get('id', 0) === 0)
      if (idx >= 0) {
        return state
      }
      const tags = state.get('tags', fromJS([])).insert(0, fromJS({
        id: 0,
        name: '',
        categoryID: '',
        visible: false,
        editable: true,
      }))
      return state.set('tags', tags)
    },
    editTagSuccess(state, { tagId }) {
      const idx = state.get('tags').findIndex(v => v.get('id') === tagId)
      return state.removeIn(['tags', idx, 'staleData']).setIn(['tags', idx, 'editable'], false)
    },
    editFieldChange(state, { tagId, value }) {
      const idx = state.get('tags').findIndex(v => v.get('id') === tagId)
      let newState = state
      if (!state.hasIn(['tags', idx, 'staleData'])) {
        newState = state.setIn(['tags', idx, 'staleData'], state.getIn(['tags', idx]).toMap())
      }
      return newState.mergeIn(['tags', idx], value)
    },
    startEdit(state, { tagId }) {
      const idx = state.get('tags').findIndex(v => v.get('id') === tagId)
      return state.setIn(['tags', idx, 'editable'], true)
    },
    cancelEdit(state, { tagId }) {
      const idx = state.get('tags').findIndex(v => v.get('id') === tagId)
      if (tagId === 0) {
        return state.removeIn(['tags', idx])
      }
      let newState = state
      if (newState.hasIn(['tags', idx, 'staleData'])) {
        newState = state.setIn(['tags', idx], state.getIn(['tags', idx, 'staleData']))
      }
      return newState.setIn(['tags', idx, 'editable'], false)
    },
    setTags(state, { tags }) {
      return state.set('tags', fromJS(tags))
    },
    showLoading(state) {
      return state.set('loading', true)
    },
    hideLoading(state) {
      return state.set('loading', false)
    },
  },
}
