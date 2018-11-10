/**
 * Created by ole on 2018/05/05.
 */
import React from 'react'
import { Form, Button, Input, Icon, Spin, Popconfirm } from 'antd'
import style from './index.less'

const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 }, };
let uuid = 0;

@Form.create()
export default class AboutUsFrom extends React.Component {
  state = { fields: [] }

  onRefresh = () => {
    this.props.onRefresh("fetch3");
  };

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        values.mobile = values.mobile.filter(item => item != null) // 去除点击后，生成的空位置数组，删除的null数据
        this.props.setAboutUs({ ...values });
      }
    })
  };

  add = () => {
    const { mergeAboutUsData, aboutUsData } = this.props;
    let list = aboutUsData.list;
    list.push({ id: uuid++, val: '' })
    mergeAboutUsData({ list: list.concat() })
  }

  remove = (i) => {
    const { mergeAboutUsData, aboutUsData } = this.props;
    let list = aboutUsData.list;
    mergeAboutUsData({ list: list.filter((item, index) => item.id !== i) })
  }

  getFields() {
    const { form, aboutUsData } = this.props;
    if (aboutUsData.list && aboutUsData.list.length > 0) {
      uuid = uuid === 0 ? aboutUsData.list.length : uuid;
      return aboutUsData.list.map((v, k) => {
        return (
          <FormItem label="联系信息" key={v.id} {...formItemLayout}>
            {form.getFieldDecorator(`mobile[${v.id}]`, {
              initialValue: v.val,
            })(
              <Input placeholder="联系信息" style={{ width: '90%', marginRight: 8 }} />
            )}
            {k > 0 ? (<Icon className={style.dynamic_delete_button} type="minus-circle-o" onClick={() => this.remove(v.id)} />) : null}
          </FormItem>
        );
      });
    }
    return [];
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { aboutUsData } = this.props;

    return (
      <div className={style.spinObject}>
        <Spin spinning={this.props.loading} >
          <Form className="ad-create-page" layout="vertical">
            <FormItem label="信息" {...formItemLayout} >
              {
                getFieldDecorator('intro', {
                  initialValue: aboutUsData.intro,
                  rules: [{ required: true, message: '信息不能为空' }],
                })(<Input.TextArea rows={4} autosize={{ minRows: 4, maxRows: 5 }} />)
              }
            </FormItem>

            <FormItem label="网址" {...formItemLayout} >
              {
                getFieldDecorator('url', {
                  initialValue: aboutUsData.url,
                  rules: [{ required: true, message: '网址不能为空' }],
                })(<Input />)
              }
            </FormItem>

            <FormItem label="QQ" {...formItemLayout} >
              {
                getFieldDecorator('qq', {
                  initialValue: aboutUsData.qq,
                  rules: [{ required: true, message: 'QQ不能为空' }],
                })(<Input />)
              }
            </FormItem>

            {this.getFields()}

            <FormItem label="新增" {...formItemLayout}>
              <Button type="dashed" onClick={this.add} style={{ width: '90%' }}><Icon type="plus" /> 新增 </Button>
            </FormItem>

            <FormItem wrapperCol={{ span: 18, offset: 4 }} style={{ textAlign: 'right' }}>
              <Button onClick={() => { this.onRefresh() }} className={style.marginRight8}>刷新</Button>
              <Popconfirm title="确定保存?" onConfirm={() => { this.handleSubmit() }} okText="确定" cancelText="算了">
                <Button type="primary">确定</Button>
              </Popconfirm>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

