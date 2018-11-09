import React from 'react'
import { Form, Col, Row, Tag, Input, Select, Popconfirm, message, Button, Modal, Table } from 'antd'

const { Option } = Select;

export default Form.create()(class ProcessReviewer extends React.Component {
  state = { visible: false, modalName: '新增', id: 0, visibleTop: false };
  constructor(props) {
    super(props);
    props.fetchFeaturedColumns()
  }

  showModal = (id) => {
    this.setState({ visible: true, id: id, modalName: id === undefined ? '新增' : '编辑' });
    const { form, processReiewerList } = this.props;
    const vo = processReiewerList.filter(item => item.id === id)[0] || {};
    form.setFieldsValue({
      id: vo.id,
      name: vo.name,
      user_name: vo.user_name,
      column_id: vo.column_list && vo.column_list.map(item => item.id) || undefined,
    });
  }

  handleOk = (e) => {
    const { form, addProcessReiewer, editProcessReiewer } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        this.state.modalName === '新增' ? addProcessReiewer({ ...values }) : editProcessReiewer({ id: this.state.id, ...values });
        this.setState({ visible: false });
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { processReiewerList, featuredList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '钉钉ID',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '用户名称',
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: '栏目',
      key: 'column_list',
      dataIndex: 'column_list',
      render: column_list => (
        <div style={{ textAlign: 'left' }}>
          {column_list && column_list.map(tag => <Tag color="blue" key={tag.id}>{tag.title}</Tag>)}
        </div>
      ),
    }, {
      title: '编辑',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" size="small" onClick={() => this.showModal(record.id)}>编辑</Button>
        </span>
      ),
    }];

    return (
      <div>
        <div className="select-group">
          <Button type="primary" style={{ marginLeft: 10 }} size="large" onClick={this.props.fetchProcessReiewer}>刷新</Button>
          <Button type="primary" style={{ marginLeft: 10 }} size="large" onClick={() => this.showModal()}>新增</Button>
        </div>
        <Modal
          title={this.state.modalName}
          width={800}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="钉钉ID">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '钉钉ID不能为空' }],
                  })(<Input style={{ width: '100%' }} placeholder="钉钉ID" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="用户名">
                  {getFieldDecorator('user_name', {
                    rules: [{ required: true, message: '用户名不能为空' }],
                  })(<Input style={{ width: '100%' }} placeholder="用户名" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="栏目">
                  {getFieldDecorator('column_id', {
                  })(
                    <Select mode="multiple" placeholder="请选择">
                      {featuredList.map(i => <Option key={i.id} value={i.id} > {i.title} </Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Table
          rowKey="id"
          loading={this.props.loading}
          columns={columns}
          dataSource={processReiewerList}
          pagination={{ showSizeChanger:true, pageSize: 10 }} />
      </div >
    )
  }
});
