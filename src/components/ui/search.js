import React from 'react'
import moment from 'moment'
import { Form, Input, Select, Button, Row, Col, DatePicker, InputNumber } from 'antd'
import 'moment/locale/zh-cn'

const FormItem = Form.Item
moment.locale('zh-cn')

class Search extends React.Component {
  state = {
    clearVisible: false,
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
    rangePicker: [],
  }
  handleSearch = () => {
    // const data = {
    //   keyword: ReactDOM.findDOMNode(this.refs.searchInput).value,
    // }
    // if (this.props.select) {
    //   data.field = this.state.selectValue
    // }
    this.props.form.validateFields((errors, fieldsValue) => {
      if (errors) {
        return
      }
      for (const i in fieldsValue) {
        if (typeof fieldsValue[i] === 'object') {
          fieldsValue[i] = fieldsValue[i].format('YYYY-MM-DD')
        }
      }
      // 时间组的取值
      const rangePicker = {}
      this.state.rangePicker.forEach((item) => {
        for (const i in item) {
          rangePicker[i] = item[i]
        }
      })

      const values = {
        ...fieldsValue,
        ...rangePicker,
      }
      this.props.onSearch && this.props.onSearch(values)
    })
  }

  handleClearInput = () => {
    this.props.form.resetFields()
    this.setState({
      rangePicker: [],
    })
    this.props.onSearch && this.props.onSearch()
  }
  // 时间选择后setState
  handleRangePickerChange = (dates, moment, options) => {
    const rangePickerSearchValue = moment.map((item, index) => {
      const rangePickerSearchValue = {}
      rangePickerSearchValue[options[index]] = item
      return rangePickerSearchValue
    })
    this.setState({
      rangePicker: rangePickerSearchValue,
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { select, selectOptions } = this.props
    const { clearVisible } = this.state
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    const searchInputs = []
    for (let i = 0; i < selectOptions.length; i++) { // eslint-disable-line
      if (selectOptions[i].type === 'input') {
        searchInputs.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={`${selectOptions[i].name}`} colon={false}>
              {getFieldDecorator(`${selectOptions[i].value}`)(
                <Input />,
              )}
            </FormItem>
          </Col>,
        )
      } else if (selectOptions[i].type === 'select') {
        searchInputs.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={`${selectOptions[i].name}`} colon={false}>
              {getFieldDecorator(`${selectOptions[i].value}`)(
                <Select style={{ width: '100%' }}>{selectOptions[i].options.map(data => <Select.Option key={data.id}>{data.name}</Select.Option>)}</Select>,
              )}
            </FormItem>
          </Col>,
        )
      } else if (selectOptions[i].type === 'datePicker') {
        searchInputs.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={`${selectOptions[i].name}`} colon={false}>
              {getFieldDecorator(`${selectOptions[i].value}`)(
                <DatePicker allowClear={false} style={{ width: '100%' }} />,
              )}
            </FormItem>
          </Col>,
        )
      } else if (selectOptions[i].type === 'datePickerRange') {
        searchInputs.push(
          <Col span={6} key={i}>
            <Row className="ant-row ant-form-item ant-form-item-no-colon">
              <Col span={8} className="ant-form-item-label">
                <label title={`${selectOptions[i].name}`}>{`${selectOptions[i].name}`}</label>
              </Col>
              <Col span={16}>
                <DatePicker.RangePicker allowClear={false} style={{ width: '100%' }} value={this.state.rangePicker.length <= 0 ? [] : [moment(this.state.rangePicker[0]), moment(this.state.rangePicker[1])]} onChange={(dates, moment) => this.handleRangePickerChange(dates, moment, selectOptions[i].options)} />
              </Col>
            </Row>
          </Col>,
        )
      } else if (selectOptions[i].type === 'inputNumber') {
        searchInputs.push(
          <Col span={6} key={i}>
            <FormItem {...formItemLayout} label={`${selectOptions[i].name}`} colon={false}>
              {getFieldDecorator(`${selectOptions[i].value}`)(
                <InputNumber style={{ width: 'auto' }} allowClear={false} />,
              )}
            </FormItem>
          </Col>,
        )
      }
    }
    const searchButtonSpan = selectOptions.length % 4 === 0 ? 24 : (4 - selectOptions.length) * 6
    const searchInputsGroup = (
      <Row gutter={16}>
        {searchInputs}
        <Col span={searchButtonSpan} style={{ marginBottom: 24, textAlign: 'right' }}>
          <Button size="large" type="primary" onClick={this.handleSearch} style={{ marginRight: 8 }}>搜索</Button>
          <Button size="large" onClick={this.handleClearInput}>清空</Button>
        </Col>
      </Row>
    )
    return (
      <div>
        {searchInputsGroup}
      </div>
    )
  }
}
export default Form.create()(Search)
