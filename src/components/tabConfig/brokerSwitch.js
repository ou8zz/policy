/**
 * Created by ole on 2018/05/05.
 */
import React from 'react'
import { Form, Button, Input, Switch, Spin, Popconfirm } from 'antd'
import style from './index.less'

const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 }, };

export default Form.create()(class BrokerSwitch extends React.Component {

  onChangeIsTradeSwitch = (disabled) => {
    const { form, setStateData, brokerSwitch } = this.props;
    brokerSwitch.is_trade = disabled
    setStateData(brokerSwitch)

    form.setFieldsValue({
      is_on: brokerSwitch.is_on,
      is_trade: brokerSwitch.is_trade,
      brief: brokerSwitch.brief,
    });
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.editBrokerSwitch({ ...values });
      }
    })
  };

  onReset = () => {
    const { form, brokerSwitch, onRefresh } = this.props;
    onRefresh("fetchBrokerSwitch")
    form.setFieldsValue({
      is_on: brokerSwitch.is_on,
      is_trade: brokerSwitch.is_trade,
      brief: brokerSwitch.brief,
    });
    form.resetFields();
  };

  render() {
    const { form, brokerSwitch } = this.props;
    return (
      <Spin tip="Loading..." spinning={this.props.loading}>
        <Form className="ad-create-page" layout="vertical">
          <FormItem label="总开关" {...formItemLayout} >
            {
              form.getFieldDecorator('is_on', { valuePropName: 'checked', initialValue: brokerSwitch.is_on })
                (<Switch checkedChildren="开" unCheckedChildren="关" />)
            }
          </FormItem>

          <FormItem label="是否交易" {...formItemLayout} >
            {
              form.getFieldDecorator('is_trade', { valuePropName: 'checked', initialValue: brokerSwitch.is_trade })
                (<Switch checkedChildren="开" unCheckedChildren="关" onChange={this.onChangeIsTradeSwitch} />)
            }
          </FormItem>

          <FormItem label="说明" {...formItemLayout} >
            {
              form.getFieldDecorator('brief', {
                initialValue: brokerSwitch.brief,
                rules: [{ required: true, message: '不能为空' }],
              })(<Input.TextArea rows={19} autosize={{ minRows: 4, maxRows: 40 }} disabled={brokerSwitch.is_trade } />)
            }
          </FormItem>

          <FormItem wrapperCol={{ span: 18, offset: 4 }} style={{ textAlign: 'right' }}>
            <Button onClick={() => { this.onReset() }} className={style.marginRight8}>重置</Button>
            <Popconfirm title="确定保存?" onConfirm={() => { this.handleSubmit() }} okText="确定" cancelText="算了">
              <Button type="primary">确定</Button>
            </Popconfirm>
          </FormItem>
        </Form>
      </Spin >
    )
  }
})