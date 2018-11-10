import React from 'react'
import { Spin, Form, Button, Input, Icon, Checkbox, Row, Col } from 'antd'
import '../global.less'

const FormItem = Form.Item;
const formItemLayout = {};
export default Form.create()(class BrokerSwitch extends React.Component {
    state = { loading: false }
    loginPost = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                console.log('====================================');
                console.log(values);
                console.log('====================================');
                this.props.doLogin(values);
            }
        })
    };

    render() {
        const { form } = this.props;
        return (
            <div className="login-box">
                <div className="login-div">
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
                            <a href="">注册!</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
})