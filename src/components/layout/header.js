import React from 'react'
import { Button, Input, Menu, Row, Col, Icon, Popover } from 'antd'
import styles from './main.less'
import Menus from './menu'

const Search = Input.Search;
const SubMenu = Menu.SubMenu
function Header({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover }) {
  const handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
  }
  return (
    <div className={styles.header}>
      <Row>
        <Col span={6} className={styles.box1}>666</Col>
        <Col span={12} className={styles.box1}>
          <Search
            placeholder="搜索"
            onSearch={value => console.log(value)}
            enterButton
          />
        </Col>
        <Col span={6} className={styles.box1}><Button type="primary" >提问</Button></Col>
      </Row>
      {/* {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.siderbutton}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu
          style={{
            float: 'right',
          }} title={< span > <Icon type="user" />
            {user.name} </span>}
        >
          <Menu.Item key="logout">
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu> */}
    </div>
  )
}
export default Header
