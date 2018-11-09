import React from 'react'
import { connect } from 'dva'
import WhiteList from 'components/tabConfig/whiteList'
import getStateProperties from 'utils/getStateProperties'

function whiteListPage({ dispatch, ...commentState }) {
  // 搜索方法
  const handleSearch = (fieldsValue) => {
    dispatch({
      type: 'common/setPagination',
      pagination: {
        current: 1,
      },
    })

    dispatch({
      type: 'common/resetQuery',
      params: fieldsValue,
    })

    dispatch({
      type: `common/fetch4`,
    })
  }

  const onPageChange = (current, pageSize) => {
    dispatch({
      type: 'common/setPagination',
      pagination: {
        current,
        pageSize,
      },
    })

    dispatch({
      type: `common/fetch4`,
    })
  }

  function fetchMyColumnList(params) {
    dispatch({
      type: 'common/fetchMyColumnList',
      params: params,
    })
  }

  function setMyColumn(params) {
    dispatch({
      type: 'common/setMyColumn',
      params: params,
    })
  }

  function editMyColumn(params) {
    dispatch({
      type: 'common/editMyColumn',
      params: params,
    })
  }
  
  function fetchProductList(params) {
    dispatch({
      type: 'common/fetchProductList',
      params: params,
    })
  }
  const setExpireDates = (id) => (value) => {
    dispatch({
      type: 'common/setExpireDates',
      id,
      value,
    })
  }
  function fetchUserList(params) {
    dispatch({ type: 'common/fetchUserList', params })
  }

  return (
    <WhiteList
      {...commentState}
      handleSearch={handleSearch}
      onPageChange={onPageChange}
      fetchMyColumnList={fetchMyColumnList}
      setMyColumn={setMyColumn}
      editMyColumn={editMyColumn}
      fetchProductList={fetchProductList}
      setExpireDates={setExpireDates}
      fetchUserList={fetchUserList}
    />
  )
}

function mapStateToProps(state) {
  return getStateProperties(state.common)
}

export default connect(mapStateToProps)(whiteListPage)
