import React from 'react'
import { Tabs, Input, Menu, Row, Col, Icon, Popover } from 'antd'
import styles from './main.less'

const TabPane = Tabs.TabPane;
function Navigation({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover }) {
  return (
    <div className={styles.navigation}>
      <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="home" />全部</span>} key="1">
                Tab 1
            </TabPane>
            <TabPane tab={<span><Icon type="file" />话题</span>} key="2">
                Tab 2
            </TabPane>
            <TabPane tab={<span><Icon type="bell" />通知</span>} key="3">
                Tab 3
            </TabPane>
        </Tabs>
    </div>
  )
}
export default Navigation
