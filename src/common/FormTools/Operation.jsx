import * as React from 'react'
import { Icon, Button, message, Popconfirm, Switch } from 'antd'
import isFunction from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'

export const Operation = (props) => {
  const { record } = props
  const {
    onEditItem,
    onDeleteItem,
    onSubmit,
    addSubmit,
    onToggleStatus,
    showStarted,
    showConfirmed,
    onToggleConfirmed,
    showRelate,
    onTopVip,
    onRelate,
    showTop,
    onTop,
    showPriceControl,
    onPriceControl,
    showBanners,
    banners,
    onAddBanner,
    showSubmit,
    editItem,
    showDelete,
    showEdit,
  } = props

  return (
    <div>
      {
        record.status !== 'auditing'
          ? <div>
            {/* 1. 编辑 */}
            {
              showEdit !== false
                ? editItem
                  ? <Button size="small" type="primary" onClick={() => onEditItem(record)} style={{ marginRight: 4 }}>编辑</Button>
                  : <Button size="small" type="primary" onClick={() => onEditItem(record.id)} style={{ marginRight: 4 }}>编辑</Button>
                : ''
            }

            {/* 2. 删除 */}
            {
              showDelete !== false
                ? record.isTop === true
                  ? <Button size="small" type="ghost" disabled style={{ marginRight: 4 }}>禁止删除</Button>
                  : <Popconfirm
                    title="确定要删除吗？"
                    onConfirm={() => onDeleteItem(record.id)}
                  >
                    <Button size="small" type="ghost" style={{ marginRight: 4 }}> 删除 </Button>
                  </Popconfirm>
                : ''
            }

            {/* 3. 轮播 */}
            {
              showBanners
                ? record.status === 'show' && (
                  banners.indexOf(record.id) > -1
                    ? ''
                    : <Button
                      size="small"
                      type="primary"
                      onClick={() => onAddBanner(record)}
                      style={{ marginRight: 4 }}
                    >
                      添加到轮播
                    </Button>
                  )
                : ''
            }

            {/* 4. 提交审核 */}
            {
              isFunction(onSubmit) || showSubmit
                ? record.status !== 'show'
                  ? record.status === 'started' && (
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => onSubmit(record.id)}
                      style={{ marginRight: '10px', marginBottom: '4px' }}
                    >
                      提交审核
                    </Button>
                  )
                  : ''
                : ''
            }

            {/* 5. 隐藏 */}
            {
              record.isTop === true
                ? <Icon
                  type="eye"
                  style={{ padding: '2px 5px', verticalAlign: 'middle', fontSize: 17, cursor: 'pointer' }}
                  onClick={() => message.error('置顶文章 禁止隐藏!')}
                />
                : isNumber(record.status)
                  ? record.status === 1 ?
                  <Popconfirm
                    title="确定要改为隐吗？"
                    onConfirm={() => onToggleStatus({ action: 'status', param: record.status === 1 ? 'hide' : 'show', id: record.id, obj: record })}
                  >
                    <div size="small" style={{  marginTop: '4px' }}><Icon type="eye-o" /></div>
                  </Popconfirm> :
                  <Popconfirm
                    title="确定要改为显吗？"
                    onConfirm={() => onToggleStatus({ action: 'status', param: 'show', id: record.id, obj: record })}
                  >
                    <div size="small" style={{  marginTop: '4px' }}><Icon type="eye" /></div>
                  </Popconfirm> : record.status === 'show' ?
                  <Popconfirm
                    title="确定要改为隐吗？"
                    onConfirm={() => onToggleStatus({ action: 'status', param: record.status === 'show' ? 'hide' : 'show', id: record.id, obj: record })}
                  >
                    <div size="small" style={{  marginTop: '4px' }}><Icon type="eye" /></div>
                  </Popconfirm> : record.status === 'started' ? '' :
                    <Popconfirm
                      title="确定要改为显吗？"
                      onConfirm={() => onToggleStatus({ action: 'status', param: 'show', id: record.id, obj: record })}
                    >
                      <div size="small" style={{  marginTop: '4px' }}><Icon type="eye-o" /></div>
                    </Popconfirm>
            }

            {/* 6. 推荐 */}
          {
            showStarted !== false
              ? record.status === 'started'
              ? ''
              : record.isRecommended === true
                ? <Icon
                  type="heart"
                  onClick={() => onToggleStatus({ action: 'recommend', param: '0', id: record.id })}
                  style={{ padding: '2px 5px', verticalAlign: 'middle', fontSize: 17, cursor: 'pointer' }}
                />
                : <Icon
                  type="heart-o"
                  onClick={() => onToggleStatus({ action: 'recommend', param: '1', id: record.id })}
                  style={{ padding: '2px 5px', verticalAlign: 'middle', fontSize: 17, cursor: 'pointer' }}
                />
              : ''
          }

            {/* 7. 待证实: 根据 showConfirmed参数 确认'是否显示' */}
            {
              showConfirmed
                ? <Switch
                    defaultChecked={record.isConfirmed}
                    checked={record.isConfirmed}
                    checkedChildren={'已证实'}
                    unCheckedChildren={'待证实'}
                    onChange={checked => onToggleConfirmed(checked, record)}
                />
                : ''
            }

            {/* 8. 关联: 根据 showTop 参数 */}
            {
              showRelate === true
                ? <Button
                  size="small"
                  type="primary"
                  style={{ marginRight: 4 }}
                  onClick={() => onRelate(record.id)}
                >
                  关联
                </Button>
                : ''
            }
            {
              (record.type !== 2 && record.isTop === 0 )
                && <Button
                size="small"
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => onTopVip(record.id)}
              >
                置顶
              </Button>
            }
            {
              (record.type !== 2 && record.isTop > 0 ) &&
              <Button
                size="small"
                type="primary"
                style={{ marginRight: 4 }}
                onClick={() => onTopVip(record.id)}
              >
                取消置顶
              </Button>
            }

            {/* 9. 置顶: 根据 showRelate 参数 */}
            {
              showTop
                ? <Button
                  size="small"
                  type="primary"
                  style={{ marginRight: 4 }}
                  onClick={() => onTop(record.id)}
                >
                  <Icon type="to-top" />
                </Button>
                : ''
            }

            {/* 10. 价格管理: 根据 showPriceControl 参数*/}
            {
              showPriceControl
                ? <Button
                  size="small"
                  type="primary"
                  style={{ marginRight: 4 }}
                  onClick={() => onPriceControl(record)}
                >
                  价格
                </Button>
                : ''
            }
          </div>
          : <div>
          <Button
            size="small"
            type="primary"
            onClick={() => addSubmit(record.id)}
            style={{ marginRight: '10px', marginBottom: '4px' }}
          >
            重新发送
          </Button>
        </div>
      }
    </div>
  )
}
