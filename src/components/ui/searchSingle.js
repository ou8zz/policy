import React from 'react'
import moment from 'moment'
import ReactDOM from 'react-dom'
import { Form, Input, Select, Button, Icon } from 'antd'
import 'moment/locale/zh-cn'

import styles from './search.less'

moment.locale('zh-cn')
class Search extends React.Component {
  state = {
    clearVisible: false,
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
    type: this.props.selectProps.defaultType,
    index: this.props.index,
    searchValue: this.props.keyWord,
  }
  handleSearch = (value) => {
    if (typeof value === 'string') {
      this.setState({
        searchValue: value,
      })
    }
    const data = {}
    data[this.state.selectValue] = this.state.type === 'text' ? ReactDOM.findDOMNode(this.refs.searchInput).value : typeof value === 'string' ? '' : this.state.searchValue // eslint-disable-line
    this.props.onSearch && this.props.onSearch(data) // eslint-disable-line
  }
  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      // searchValue: e.target.value,
      clearVisible: e.target.value !== '',
    })
  }
  handleSelectChange = (value) => {
    this.setState({
      ...this.state,
      searchValue: value,
    })
  }
  handleSelectInputChange = (value) => {
    if (!value) {
      this.handleSearch('')
    }
  }
  handleTypeSelect = (value, option) => {
    this.setState({
      ...this.state,
      clearVisible: false,
      selectValue: value,
      type: option.props.type,
      index: option.key,
    })
  }
  handleClearInput = () => {
    ReactDOM.findDOMNode(this.refs.searchInput).value = '' // eslint-disable-line
    this.setState({
      clearVisible: false,
      searchValue: '',
    })
    this.handleSearch()
  }
  render() {
    const { select, selectOptions, selectProps, keyWord } = this.props
    const { clearVisible, type, index } = this.state
    const searchArea = {
      text: (
        <Input
          ref="searchInput" // eslint-disable-line
          size="large"
          style={{width:this.props.width}}
          onChange={this.handleInputChange}
          onPressEnter={this.handleSearch}
          defaultValue={keyWord}
        />
      ),
      option: (
        <Select
          size="large"
          showSearch
          className="ant-select-details"
          allowClear
          onSelect={this.handleSelectChange}
          onChange={this.handleSelectInputChange}
          defaultValue={keyWord}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            index
              ? selectOptions[index] && selectOptions[index].options && selectOptions[index].options.map((item, key) => (
                <Select.Option value={String(item.id)} key={key}>{item.name}</Select.Option>
              ))
              : ''
          }
        </Select>
      ),
    }
    const Options = selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value} key={key} type={item.type}>{item.name || item.value}</Select.Option>)

    return (
      <div className="search-box">
        <Input.Group compact size="large" className={styles.search}>
          {
            select &&
            <Select
              size="large"
              {...selectProps}
              ref="searchSelect" // eslint-disable-line
              onSelect={this.handleTypeSelect}
            >
              {Options}
            </Select>
          }

          { searchArea[type] }

          <Button size="large" type="primary" onClick={this.handleSearch}>搜索</Button>

          {
            clearVisible && <Icon type="cross" style={{zIndex: 99}} onClick={this.handleClearInput} />
          }
        </Input.Group>
      </div>
    )
  }
}

export default Form.create()(Search)
