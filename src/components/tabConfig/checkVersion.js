/**
 * Created by ole on 2018/05/05.
 */
import React from 'react'
import { Form, Button, Input, Spin, Popconfirm, Divider, List, Card } from 'antd'
import style from './index.less'

const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 }, };

export default Form.create()(class CheckVersionFrom extends React.Component {

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.setCheckVersion({ ...values });
      }
    })
  };

  onReset = () => {
    const { form, dataSource } = this.props;
    form.setFieldsValue({
      versionNo: dataSource.versionNo,
      description: dataSource.description,
    });
    this.setState({ expand: dataSource.deny === 1 ? true : false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource } = this.props;

    return (
      <div>
        <Spin tip="Loading..." spinning={this.props.loading}>
          <Form label="当前版本" className="ad-create-page" layout="vertical">
            <FormItem label="版本号" {...formItemLayout} >
              {
                getFieldDecorator('versionNo', {
                  initialValue: dataSource.versionNo,
                  rules: [
                    { required: true, message: '版本号不能为空' },
                    { pattern: /^[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}$/, message: '版本号匹配规则：6.9.3' },
                  ],
                })(<Input />)
              }
            </FormItem>

            <FormItem label="版本说明" {...formItemLayout} >
              {
                getFieldDecorator('description', {
                  initialValue: dataSource.description,
                  rules: [{ required: true, message: '版本说明不能为空' }],
                })(<Input.TextArea rows={19} autosize={{ minRows: 7, maxRows: 40 }} />)
              }
            </FormItem>

            <FormItem wrapperCol={{ span: 18, offset: 4 }} style={{ textAlign: 'right' }}>
              <Button onClick={() => { this.props.onRefresh("fetch2") }} className={style.marginRight8}>刷新</Button>
              <Button onClick={() => { this.onReset() }} className={style.marginRight8}>重置</Button>
              <Popconfirm title="确定保存?" onConfirm={() => { this.handleSubmit() }} okText="确定" cancelText="算了">
                <Button type="primary">确定</Button>
              </Popconfirm>
            </FormItem>
          </Form>

          <Divider>历史版本</Divider>

          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={dataSource.history}
            renderItem={item => (
              <List.Item>
                <Card title={item.versionNo} className={style.displayLinebreak}> {item.description} </Card>
              </List.Item>
            )}
          />
        </Spin>
      </div>
    )
  }
})
