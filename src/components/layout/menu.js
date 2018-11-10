import React from 'react'
import { Menu, Icon } from 'antd'
import Link from 'umi/link'
import menu from 'utils/menu'
import './buttonCustom.less'

const topMenus = menu.map(item => item.key)
const getMenus = function (permissionsItem, menuArray, siderFold, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map((item) => {
    let permissions = false
    for (const i in item) {
      if (i === 'name') {
        if (permissionsItem.parentTag) {
          if (permissionsItem.originalTags.indexOf(permissionsItem.parentTag) > -1) {
            // permissions = true
          } else {
            permissions = permissionsItem.tags.indexOf(`${permissionsItem.parentTag}/${item[i]}`) > -1
          }
        } else {
          permissions = permissionsItem.tags.indexOf(item[i]) > -1
        }
      }
    }
    if (permissions === true) {
      if (item.child && item.childVisible !== true) {
        return (
          <Menu.SubMenu key={item.key || item.name} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
            {
              getMenus({
                tags: permissionsItem.tags,
                parentTag: item.name,
                originalTags: permissionsItem.originalTags
              },
              item.child,
              siderFold,
              `${parentPath + item.key}/`)
            }
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <Link to={`${parentPath !== '/undefined/' ? parentPath + item.key : item.key }`}>
              {item.icon ? <Icon type={item.icon} /> : ''}
              {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
            </Link>
          </Menu.Item>
        )
      }
    }
  })
}
function Menus({ siderFold, darkTheme, location, tags, isNavbar, handleClickNavMenu }) {
  const menuTags = tags && tags.length > 0 ? tags.concat() : []
  for (let i = 0; i < menuTags.length; i++) {
    const tagsSplit = menuTags[i].split('/')
    if (tagsSplit.length > 1) {
      menuTags.indexOf(tagsSplit[0]) <= -1 ? menuTags.push(tagsSplit[0]) : menuTags
    }
  }
  const permissionsItem = { tags: menuTags || [], originalTags: tags || [] }
  const menuItems = getMenus(permissionsItem, menu, siderFold)
  const url = window.location.host
  return (
    <Menu
      mode={siderFold ? 'vertical' : 'inline'}
      theme={'dark'}
      onClick={handleClickNavMenu}
      defaultOpenKeys={isNavbar ? menuItems.map(item => item.key) : []}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'reference']}
    >
      {menuItems}
    </Menu>
  )
}
export default Menus
