import React from 'react'
import { Spin, Form, Button, Input, Icon, Checkbox, Card, Skeleton, Avatar } from 'antd'
import '../global.less'

const { Meta } = Card;
const FormItem = Form.Item;
const formItemLayout = {};
export default Form.create()(class UserInfo extends React.Component {

  changeModel = (m) => {
    this.setState({ changeModel: m });
  }

  getUserInfo = () => {
    const { form, getUserInfo } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        getUserInfo(values);
      }
    })
  };

  render() {
    const { form } = this.props;
    return (
      <Spin spinning={this.props.loading} >
      <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Skeleton loading={this.props.loading} avatar active>
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
        <Form className="login-form" layout="vertical">
          <FormItem {...formItemLayout} >
            {
              form.getFieldDecorator('userName', {
                initialValue: '',
                rules: [{ required: true, message: '用户名不能为空' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} >
            {
              form.getFieldDecorator('password', {
                initialValue: '',
                rules: [{ required: true, message: '密码不能为空' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )
            }
          </FormItem>
          {
            this.state.changeModel == 'login' ?
              <FormItem {...formItemLayout}>
                {
                  form.getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>记住我</Checkbox>
                  )
                }
                <a className="login-form-forgot" href="">忘记密码</a>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.loginPost}> 登录 </Button>
                没有账号？<a href="javascript:void(0)" onClick={() => this.changeModel("register")}>注册</a>
              </FormItem>
              :
              <div>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.registerPost}> 注册 </Button>
                <a href="javascript:void(0)" onClick={() => this.changeModel("login")}>去登录</a>
              </div>
          }
        </Form>
      </Spin>
    )
  }
})