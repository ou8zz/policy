import React from 'react'
import { connect } from 'dva'
import TabFrom from 'components/tabConfig/common'
import getStateProperties from 'utils/getStateProperties'

function configPage({ dispatch, ...commentState }) {

  function setTips(params) {
    dispatch({ type: 'common/setTips', params })
  }

  function getTips(params) {
    dispatch({ type: 'common/getTips', params })
  }

  function setCheckVersion(params) {
    dispatch({ type: 'common/setCheckVersion', params })
  }

  function getCheckVersion(params) {
    dispatch({ type: 'common/getCheckVersion', params })
  }

  function setAboutUs(params) {
    dispatch({ type: 'common/setAboutUs', params })
  }

  function getAboutUs(params) {
    dispatch({ type: 'common/getAboutUs', params })
  }

  function mergeAboutUsData(params) {
    dispatch({ type: 'common/mergeAboutUsData', params })
  }

  function onRefresh(p) {
    dispatch({ type: `common/${p}` })
  }

  // 搜索方法
  const handleSearch = (fieldsValue) => {
    dispatch({ type: 'common/setPagination', pagination: { current: 1, } })
    dispatch({ type: 'common/resetQuery', params: fieldsValue })
    dispatch({ type: `common/fetch4` })
  }

  const onPageChange = (current, pageSize) => {
    dispatch({ type: 'common/setPagination', pagination: { current, pageSize } })
    dispatch({ type: `common/fetch4` })
  }

  function fetchMyColumnList(params) {
    dispatch({ type: 'common/fetchMyColumnList', params: params })
  }

  function setMyColumn(params) {
    dispatch({ type: 'common/setMyColumn', params: params })
  }

  function editMyColumn(params) {
    dispatch({ type: 'common/editMyColumn', params: params })
  }

  function fetchProductList(params) {
    dispatch({ type: 'common/fetchProductList', params: params })
  }

  const setExpireDates = (id) => (value) => {
    dispatch({ type: 'common/setExpireDates', id, value })
  }

  function addProcessReiewer(params) {
    dispatch({ type: 'common/addProcessReiewer', params: params })
  }

  function editProcessReiewer(params) {
    dispatch({ type: 'common/editProcessReiewer', params: params })
  }

  function fetchProcessReiewer(params) {
    dispatch({ type: 'common/fetchProcessReiewer', params: params })
  }

  function fetchFeaturedColumns(params) {
    dispatch({ type: 'common/fetchFeaturedColumns', params: params })
  }

  function fetchBrokerSwitch() {
    dispatch({ type: 'common/fetchBrokerSwitch' })
  }

  function editBrokerSwitch(params) {
    dispatch({ type: 'common/editBrokerSwitch', params })
  }

  function setStateData(params) {
    dispatch({ type: 'common/setStateData', params })
  }

  function fetchUserList(params) {
    dispatch({ type: 'common/fetchUserList', params })
  }
  
  return (
    <TabFrom
      {...commentState}
      onRefresh={onRefresh}
      setTips={setTips}
      getTips={getTips}
      setCheckVersion={setCheckVersion}
      getCheckVersion={getCheckVersion}
      setAboutUs={setAboutUs}
      getAboutUs={getAboutUs}
      mergeAboutUsData={mergeAboutUsData}
      onPageChange={onPageChange}
      handleSearch={handleSearch}
      fetchUserList={fetchUserList}
      fetchMyColumnList={fetchMyColumnList}
      setMyColumn={setMyColumn}
      editMyColumn={editMyColumn}
      fetchProductList={fetchProductList}
      setExpireDates={setExpireDates}
      addProcessReiewer={addProcessReiewer}
      editProcessReiewer={editProcessReiewer}
      fetchProcessReiewer={fetchProcessReiewer}
      fetchFeaturedColumns={fetchFeaturedColumns}
      fetchBrokerSwitch={fetchBrokerSwitch}
      editBrokerSwitch={editBrokerSwitch}
      setStateData={setStateData}
    />
  )
}

function mapStateToProps(state) {
  return getStateProperties(state.common)
}

export default connect(mapStateToProps)(configPage)
