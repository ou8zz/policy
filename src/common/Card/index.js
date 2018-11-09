/**
 * Created by sunfengyan on 2018/1/23.
 */
import React from 'react'
import moment from 'moment'
import { Icon, Popconfirm, Popover } from 'antd'
import './Card.less'

export default class Card extends React.Component {

  renderOptions = () => {
    const {status, onEditItem, isTop, onDeleteItem, id, onSubmit, andSubmit, onToggleStatus, isRecommended, type} = this.props;
    let showOrNotNode = null
    let recommendNode = null
    /* if (status === 'auditing') {
      return null
    } */

    if (!isTop && status !== 'auditing') {
      if (status === 'show') {
        showOrNotNode = (
        <Popconfirm
          title="确定要隐藏吗？"
          onConfirm={() => onToggleStatus({ action: 'status', param: status === 'show' ? 'hide' : 'show', id: id })}
        >
          <p>
            <Icon type="eye" />
          </p>
        </Popconfirm>
        )
      } else {
        showOrNotNode = (
        <Popconfirm
          title="确定要显示吗？"
          onConfirm={() => onToggleStatus({ action: 'status', param: 'show', id })}
        >
          <p>
            <Icon type="eye-o" />
          </p>
        </Popconfirm>
        )
      }
    }

    if (status !== 'started' && status !== 'auditing' && type !== 9) {
      if (isRecommended) {
        recommendNode = (
          <p
            onClick={() => onToggleStatus({ action: 'recommend', param: '0', id })}
          >
            <Icon type="heart" />
            <span>推荐</span>
          </p>
        )
      } else {
        recommendNode = (
          <p
            onClick={() => onToggleStatus({ action: 'recommend', param: '1', id })}
          >
            <Icon type="heart-o" />
            <span>取消推荐</span>
          </p>
        )
      }
    }

    return (
      <div className="option-btns">
        {
          status !== 'auditing' &&
          <p
            onClick={() => onEditItem(id)}
          >
            <Icon type="edit" />
            <span>编辑</span>
          </p>
        }

        {
          !isTop && status !== 'auditing' && (
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => onDeleteItem(id)}
            >
              <p>
                <Icon type="delete" />
                <span>删除</span>
              </p>
            </Popconfirm>
          )
        }
        {
          status === 'started' && type !== 9 &&
          <p
            onClick={() => onSubmit(id)}
          >
            <Icon type="check-circle-o" />
            <span>提交审核</span>
          </p>
        }
        {
          status === 'auditing' &&
          <p
            onClick={() => andSubmit(id)}
          >
            <Icon type="check-circle-o" />
            <span>重新发送</span>
          </p>
        }
        { showOrNotNode }
        { recommendNode }
      </div>
    );
  };
  getStatus = (status) => {
    const allStatus = [
      {
        label: '通过',
        value: 'show',
      },
      {
        label: '驳回',
        value: 'rejected',
      },
      {
        label: '审核中',
        value: 'auditing',
      },
      {
        label: '隐藏',
        value: 'hide',
      },
      {
        label: '删除',
        value: 'delete',
      },
      {
        label: '编辑中',
        value: 'started',
      },
    ]
    const foo = allStatus.find(item => item.value === status)
    return foo && foo.label
  }

  render() {
    const { title, brief, cUser, time, commentNum, allViewed, status, id, type } = this.props

    return (
      <div className="card">
        <h4>
          <p>{title}</p>
          <span>{this.getStatus(status) && type !== 9 }</span>
        </h4>
        <div className="tips">
          <p>
            <Icon type="info-circle-o" />
            <span>{id}</span>
          </p>
          <p>
            <Icon type="user" />
            <span>{cUser}</span>
          </p>
          <p>
            <Icon type="calendar" />
            <span>{moment(time*1000).format('YYYY-MM-DD')}</span>
          </p>
          <p>
            <Icon type="message" />
            <span>{commentNum}</span>
          </p>
          <p>
            <Icon type="smile-o" />
            <span>{allViewed}</span>
          </p>
        </div>
        <div
          className="content"
          style={status === 'delete' ? { textDecoration: 'line-through', color: 'ccc' } : {}}
        >
          {brief}
        </div>
        { this.renderOptions() }
      </div>
    )
  }
}
