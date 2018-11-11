import React from 'react'
import { Avatar, Button, Input, Menu, Row, Col, Icon, Popover, Dropdown } from 'antd'
import styles from './main.less'

const Search = Input.Search;
function Header({ user, logout, }) {
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/#/user"><Icon type="user"/> 我的主页</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)"><Icon type="setting"/> 设置</a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="javascript:void(0)" onClick={logout}><Icon type="logout"/> 注销</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.header}>
      <Row>
        <Col span={6} className={styles.box1}>
          <Avatar shape="square" size={34} icon="sync" src="https://policygo.top/static/imgs/6.png" />
        </Col>
        <Col span={10} className={styles.box1}>
          <Search
            placeholder="搜索"
            onSearch={value => console.log(value)}
            enterButton
          />
        </Col>
        <Col span={4} className={styles.box1}>
          <Button type="primary" >提问</Button>
        </Col>
        <Col span={2} className={styles.box1}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="javascript:void(0)">
              <Avatar shape="square" icon="user" src="https://policygo.top/static/upload/avatar/21.jpg" />
            </a>
          </Dropdown>
        </Col>
      </Row>
    </div>
  )
}
export default Header
