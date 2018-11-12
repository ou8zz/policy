import React from 'react'
import { Spin, Form, Button, Input, Icon, Checkbox, message } from 'antd'
import '../global.less'

const FormItem = Form.Item;
const formItemLayout = {};
export default Form.create()(class Login extends React.Component {
  state = { changeModel: 'login' };

  changeModel = (m) => {
    this.setState({ changeModel: m });
  }

  loginPost = () => {
    const { form, doLogin } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        doLogin(values);
      }
    })
  };

  registerPost = () => {
    const { form, doRegister } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        doRegister(values);
      }
    })
  };

  render() {
    const { form } = this.props;
    return (
      <div className="login-box">
        <div className="login-div">
          <Spin spinning={this.props.loading} >
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
        </div>
      </div>
    )
  }
})