import * as React from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

export const FormComponent = Form.create()((props) => {
  const { visible, onCancel, onCreate, form } = props
  const { status, submitBtn } = props

  const { getFieldDecorator } = form

  return (
    <Modal
      visible={visible}
      title="价格管理"
      okText={submitBtn}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Description" {...formItemLayout}>
          {
            getFieldDecorator('description', {
              initiaValue: status === 'createPriceControl' ? '创建' : '编辑',
              rules: [{
                required: true,
                message: '未填写',
              }],
            })(
              <Input.TextArea />,
            )
          }
        </FormItem>
      </Form>
    </Modal>
  )
})
