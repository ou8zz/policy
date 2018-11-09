/**
 * @author wangyibin
*/
import * as React from 'react'
import { connect } from 'dva'
import { fromJS } from 'immutable'
import { Modal, Alert, Input, Button, Table, Select, Popconfirm, message } from 'antd'

const Option = Select.Option

class EditableText extends React.Component {
  render() {
    const { editable, fieldName, text, onChange, placeholder } = this.props
    return (
      <div>
        {editable
          ? <Input value={text} onChange={(e) => { const v = {}; v[fieldName] = e.target.value; onChange(v) }} placeholder={placeholder} />
          : text
        }
      </div>
    )
  }
}
class EditablePrice extends React.Component {
  render() {
    const { editable, text, onChange, placeholder, priceList } = this.props
    if (editable) {
      return (
        <Select
          style={{ width: 90 }}
          defaultValue={text}
          onChange={(price) => {
            const item = priceList.find(i => i.get('price') === price)
            onChange({ iapId: item.get('iapId'), price })
          }}
          placeholder={placeholder}
        >
          {priceList && priceList.toJS().map(item => (
            <Option
              key={item.iapId}
              value={item.price}
            >
              {item.price}
            </Option>
          ))}
        </Select>
      )
    }
    return (<div>{text}</div>)
  }
}
class EditableTimeliness extends React.Component {
  render() {
    const { editable, text, placeholder, onChange, timelinessList } = this.props
    const item = timelinessList.find((i) => {
      return i.get('timeLimit') === parseInt(text, 10)
    })
    let name = ''
    if (item) {
      name = item.get('name')
    }
    if (editable) {
      return (
        <Select style={{ width: 90 }} defaultValue={text} onChange={v => onChange({ timeLimit: v })} placeholder={placeholder} >
          {timelinessList && timelinessList.toJS().map(i => (
            <Option
              key={i.timeLimit}
              value={i.timeLimit}
            >
              {i.name}
            </Option>
          ))}
        </Select>
      )
    }
    return (<div>{name}</div>)
  }
}
class ProductModal extends React.Component {
  render() {
    const { dispatch, priceList, timelinessList, visible, productSpecs, errMsg, loading } = this.props

    const fieldChange = specId => (value) => {
      dispatch({
        type: 'productModel/editProductSpec',
        specId,
        value,
      })
    }

    const columns = [
      { title: '#', dataIndex: 'id', key: 'id', width: '50px' },
      { title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        render: (text, record) => (<EditableText text={text} placehoder="价格描述" fieldName="name" editable={record.editable} onChange={fieldChange(record.id)} />),
      },
      { title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 100,
        render: (text, record) => (<EditablePrice priceList={priceList} text={text} placehoder="选择价格" editable={record.editable} onChange={fieldChange(record.id)} />),
      },
      { title: '折扣描述',
        dataIndex: 'discountDesc',
        key: 'discountDesc',
        width: 200,
        render: (text, record) => (<EditableText text={text} placehoder="原价¥" fieldName="discountDesc" editable={record.editable} onChange={fieldChange(record.id)} />),
      },
      { title: '时效性',
        dataIndex: 'timeLimit',
        key: 'timeLimit',
        width: 100,
        render: (text, record) => (<EditableTimeliness timelinessList={timelinessList} text={text} placehoder="选择期限" editable={record.editable} onChange={fieldChange(record.id)} />),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 150,
        render: (text, record) => { // idx
          const { editable } = record
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => dispatch({ type: 'productModel/updateProductSpec', specId: record.id })}>保存</a>
                    <Popconfirm title="确定要撤销?" onConfirm={() => dispatch({ type: 'productModel/cancelEditProductSpec', specId: record.id })}>
                      <a>&nbsp;&nbsp;撤销</a>
                    </Popconfirm>
                  </span>
                  : <span>
                  {
                    record.status === 'show' ?
                      <a onClick={() => dispatch({ type: 'productModel/startStateProductSpec', id: record.id,status: 'hide', })}>隐藏</a> :
                      <a onClick={() => dispatch({ type: 'productModel/startStateProductSpec', id: record.id,status: 'show', })}>显示</a>
                  }

                    {/*<a onClick={() => dispatch({ type: 'productModel/startEditProductSpec', specId: record.id })}>编辑</a>*/}
                    {productSpecs.filter(s => s.get('id') > 0).count() > 1 ? <Popconfirm title="确定要删除?" onConfirm={() => dispatch({ type: 'productModel/deleteProductSpec', specId: record.id })}>
                      <a>&nbsp;&nbsp;删除</a>
                    </Popconfirm> : ''}
                  </span>
              }
            </div>
          )
        },
      }]

    const closeModal = () => {
      if (productSpecs.size === 0) {
        message.error('规格为空!')
      } else {
        this.props.dispatch({ type: 'productModel/setVisible', visible: false })
        this.props.dispatch({ type: 'albumList/getDataSource' })
      }
    }

    const hasPendingInsert = productSpecs.findIndex(v => v.get('id', 0) === 0) >= 0
    return (
      <Modal
        visible={visible}
        width={750}
        title="价格管理"
        onCancel={closeModal}
        footer={null}
      >
        <div className="table-operations">
          <Button disabled={hasPendingInsert} onClick={() => this.props.dispatch({ type: 'productModel/startCreateProductSpec' })}>添加更多价格</Button>
          {errMsg.count() > 0 ? <Alert message={errMsg.join(',')} type="error" /> : ''}
        </div>
        <Table loading={loading} pagination={{ hideOnSinglePage: true }} size="middle" rowKey={record => `table-row-${record.id}`} dataSource={productSpecs.toJS()} columns={columns} />
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  dispatch: state.dispatch,
  visible: state.productModel.get('visible', false),
  loading: state.productModel.get('loading', false),
  priceList: state.productModel.get('priceList', fromJS([])),
  timelinessList: state.productModel.get('timelinessList', fromJS([])),
  productSpecs: state.productModel.get('productSpecs', fromJS([])),
  errMsg: state.productModel.get('errMsg', fromJS([])),
})

export default connect(mapStateToProps)(ProductModal)
