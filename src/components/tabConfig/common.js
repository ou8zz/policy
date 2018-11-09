/**
 * Created by ole on 2018/05/05.
 */
import React from 'react'
import { Tabs } from 'antd'
import TipsFrom from '../Comment/Tips'
import CheckVersionFrom from './checkVersion'
import AboutUsFrom from './aboutUs'
import WhiteList from './whiteList'
import ProcessReviewer from './processReviewer'
import BrokerSwitch from './brokerSwitch'

const TabPane = Tabs.TabPane;

export default class TabFrom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onRefresh, handleSearch } = this.props;
    function callback(key) {
      if (key == 'fetch4') {
        handleSearch({ isWhitelist: true });
      } else {
        onRefresh(key)
      }
    }

    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="评论控制" key="fetch1">
          <TipsFrom
            {...this.props}
            loading={this.props.loading}
            setTips={this.props.setTips}
            getTips={this.props.getTips}
          />
        </TabPane>
        <TabPane tab="版本更新设置" key="fetch2">
          <CheckVersionFrom
            {...this.props}
            loading={this.props.loading}
            setCheckVersion={this.props.setCheckVersion}
            getCheckVersion={this.props.getCheckVersion}
          />
        </TabPane>
        <TabPane tab="关于我们" key="fetch3">
          <AboutUsFrom
            {...this.props}
            loading={this.props.loading}
            setAboutUs={this.props.setAboutUs}
            getAboutUs={this.props.getAboutUs}
            mergeAboutUsData={this.props.mergeAboutUsData}
          />
        </TabPane>
        <TabPane tab="白名单" key="fetch4">
          <WhiteList
            {...this.props}
            loading={this.props.loading}
            handleSearch={this.props.handleSearch}
            onPageChange={this.props.onPageChange}
            setMyColumn={this.props.setMyColumn}
            editMyColumn={this.props.editMyColumn}
            fetchProductList={this.props.fetchProductList}
            setExpireDates={this.props.setExpireDates}
            fetchUserList={this.props.fetchUserList}
          />
        </TabPane>
        <TabPane tab="VIP审核名单" key="fetchProcessReiewer">
          <ProcessReviewer
            {...this.props}
            loading={this.props.loading}
            addProcessReiewer={this.props.addProcessReiewer}
            editProcessReiewer={this.props.editProcessReiewer}
            fetchProcessReiewer={this.props.fetchProcessReiewer}
            fetchProductList={this.props.fetchProductList}
            fetchFeaturedColumns={this.props.fetchFeaturedColumns}
          />
        </TabPane>
        <TabPane tab="券商开关" key="fetchBrokerSwitch">
          <BrokerSwitch
            {...this.props}
            loading={this.props.loading}
            fetchBrokerSwitch={this.props.fetchBrokerSwitch}
            editBrokerSwitch={this.props.editBrokerSwitch}
            setStateData={this.props.setStateData}
          />
        </TabPane>
      </Tabs>
    )
  }
}
