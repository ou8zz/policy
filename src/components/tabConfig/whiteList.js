import React from 'react'
import { Form, Col, Row, Select, DatePicker, Popconfirm, message, Button, InputNumber, Popover, Drawer, Table, Tooltip, Spin } from 'antd'
import SearchGroup from '../../components/ui/searchSingle'
import style from './index.less'
import moment from 'moment'
import debounce from 'lodash/debounce';

const { Option, OptGroup } = Select;

export default Form.create()(class WhiteList extends React.Component {
  state = { visiblePopoverNo: 0, visibleValidExpireDate: false, visible: false, visibleTop: false, uid: 0 };
  constructor(props) {
    super(props);
    this.changePhoneNo = debounce(this.changePhoneNo, 800);
  }

  showDrawer = (uid) => {
    const { fetchMyColumnList } = this.props;
    fetchMyColumnList({ uid: uid })
    this.setState({
      visible: true,
      uid: uid,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showDrawerTop = () => {
    const { fetchProductList } = this.props;
    fetchProductList()
    this.setState({
      visibleTop: true,
    });
  };

  onCloseTop = () => {
    this.setState({
      visibleTop: false,
    });
  };

  onSubmitTop = () => {
    const { form, setMyColumn } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        setMyColumn({ starttime: parseInt(values.dateTime[0].valueOf() / 1000), endtime: parseInt(values.dateTime[1].valueOf() / 1000), ...values });
        this.setState({ visibleTop: false });
      }
    })
  };

  validExpireDate = (id) => {
    const { myColumnList } = this.props;
    const { expireDates } = myColumnList.filter(item => item.id === id)[0]
    if (!expireDates || expireDates === 0) {
      message.error('时间参数错误');
      return
    }
    this.setState({ visibleValidExpireDate: true })
  }

  confirm = (id) => {
    const { editMyColumn, myColumnList } = this.props;
    const { expireDates } = myColumnList.filter(item => item.id === id)[0]
    if (!expireDates || expireDates === 0) {
      message.error('时间参数错误');
      return
    }
    editMyColumn({ uid: this.state.uid, id: id, day_num: expireDates })
    this.setState({ visibleValidExpireDate: false, visiblePopoverNo: id })
  }

  cancel = (id) => {
    this.setState({ visibleValidExpireDate: false, visiblePopoverNo: id })
    message.error('再见');
  }

  changePhoneNo = (phone) => {
    // fetch('https://randomuser.me/api/?results=5')
    this.props.fetchUserList({ pageNo: 1, pageSize: 10, phone: phone });
  }

  render() {
    const { whiteList, userList, myColumnList, productList, setExpireDates } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '已购栏目',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" size="small" onClick={() => this.showDrawer(record.id)}>已购</Button>
        </span>
      ),
    }];

    const myColumns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '类型',
      dataIndex: 'type_name',
      key: 'type_name',
    }, {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '开始时间',
      dataIndex: 'starttime',
      key: 'starttime',
    }, {
      title: '到期时间',
      dataIndex: 'endtime',
      key: 'endtime',
    }, {
      title: '编辑',
      key: 'action',
      render: (text, record) => (
        <span>
          <Popover
            trigger="click"
            visible={this.state.visiblePopoverNo == record.id}
            onVisibleChange={(visible) => {
              setTimeout(() => {
                this.setState({ visiblePopoverNo: visible ? record.id : 0, visibleValidExpireDate: false });
              }, 200);
            }}
            title={record.title}
            content={<div>
              <Tooltip placement="topRight" title="限制大小为1～999天" >
                新增天数：<InputNumber min={1} max={999} defaultValue={1} onChange={setExpireDates(record.id)} value={record.expireDates} style={{ width: 70 }} />
              </Tooltip>
              <Popconfirm
                visible={this.state.visibleValidExpireDate}
                onConfirm={() => this.confirm(record.id)}
                onCancel={() => this.cancel(record.id)}
                title="确定保存?"
                okText="确定"
                cancelText="算了">
                <Button type="primary" size="small" style={{ marginLeft: 10 }} onClick={() => this.validExpireDate(record.id)} >保存</Button>
              </Popconfirm>
            </div>}>
            <Button type="primary" size="small" >编辑</Button>
          </Popover>
        </span>
      ),
    }];

    const searchGroupProps = {
      className: 'search-group',
      size: 'large',
      width: 500,
      select: true,
      selectOptions: [
        { value: 'phone', name: '手机', type: 'text' },
        { value: 'id', name: 'ID', type: 'text', options: [] },
      ],
      selectProps: {
        defaultValue: 'phone',
        defaultType: 'text',
      },
      index: 0,
      onSearch: (value) => {
        this.props.handleSearch({ isWhitelist: true, id: value.id, phone: value.phone });
      },
    }
    const pagination = {
      ...this.props.pagination,
      showSizeChanger:true,
      onShowSizeChange: this.props.onPageChange,
      onChange: this.props.onPageChange,
    }

    let go1 = [], go2 = [], go3 = [];
    productList && productList.map((item, k) => {
      if (item.type_name == '专栏') {
        go1.push(<Option key={item.product_id} value={item.product_id} > {item.title} </Option>)
      } else if (item.type_name == '专辑') {
        go2.push(<Option key={item.product_id} value={item.product_id} > {item.title} </Option>)
      } else if (item.type_name == '电报解读') {
        go3.push(<Option key={item.product_id} value={item.product_id} > {item.title} </Option>)
      }
    })

    return (
      <div>
        <div className="select-group">
          <Tooltip placement="topLeft" title="多个条件以空格或者逗号隔开" >
            <div><SearchGroup {...searchGroupProps} /></div>
          </Tooltip>
          <Button type="primary" style={{ marginLeft: 10 }} size="large" onClick={this.showDrawerTop}>新增</Button>
        </div>
        <Drawer
          title="新增白名单用户"
          placement="top"
          height={420}
          closable={false}
          visible={this.state.visibleTop}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="手机号">
                  {getFieldDecorator('phones', {
                    rules: [{ required: true, message: '手机号不能为空' }],
                  })(<Select mode="multiple" style={{ width: '100%' }}
                    placeholder="手机号"
                    notFoundContent={this.props.loading ? <Spin size="small" /> : null}
                    onSearch={this.changePhoneNo}
                  >
                    {userList && userList.map((v, k) => <Option key={k} value={v.phone}>{v.phone} </Option>)}
                  </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="有效期">
                  {getFieldDecorator('dateTime', {
                    initialValue: [moment(), moment()],
                    rules: [{ required: true, message: '有效期不能为空' }],
                  })(
                    <DatePicker.RangePicker
                      ranges={{ '今天': [moment(), moment()], '当月': [moment(), moment().endOf('month')] }}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="栏目">
                  {getFieldDecorator('product_id', {
                    rules: [{ required: false, message: '请选择栏目' }],
                  })(
                    <Select mode="multiple" placeholder="请选择">
                      <OptGroup key={1} label="VIP专栏">{go1}</OptGroup>
                      <OptGroup key={2} label="视频专辑">{go2}</OptGroup>
                      <OptGroup key={3} label="电报解读">{go3}</OptGroup>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className={style.drawer_button} >
            <Button className={style.marginRight8} onClick={this.onCloseTop} > 取消 </Button>
            <Button type="primary" className={style.marginRight8} onClick={this.onSubmitTop} > 保存 </Button>
          </div>
        </Drawer>
        <Drawer
          title="对应栏目"
          placement="right"
          width={920}
          onClose={this.onClose}
          closable={false}
          visible={this.state.visible}
        >
          <Table rowKey="id" dataSource={myColumnList} columns={myColumns} pagination={{ pageSize: 15 }} />
          <div className={style.drawer_button} >
            <Button className={style.marginRight8} onClick={this.onClose} > 取消 </Button>
          </div>
        </Drawer>
        <Table
          rowKey="id"
          loading={this.props.loading}
          columns={columns}
          dataSource={whiteList}
          pagination={pagination} />
      </div >
    )
  }
})
