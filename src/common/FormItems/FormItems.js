/**
 * Created by sunfengyan on 2017/12/4.
 */

import React from 'react'
import {
  Input,
  Form,
  Radio,
  Checkbox,
  InputTextArea,
  Select,
  DatePicker,
} from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import Image from '../Image';

const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
const { RangePicker } = DatePicker

class FormItems extends React.Component {
  parseProps = (props, field) => { // fields, index
    if (!props) {
      return {}
    }

    const fooProps = {}
    for (const key in props) { // eslint-disable-line
      // if (typeof props[key] === 'function') {
      //   fooProps[key] = props[key](field.value, field, fields, index);
      // } else {
      fooProps[key] = props[key]
      // }
    }

    fooProps.children = this.parseChildren(field.type, fooProps.children)
    return fooProps
  }

  parseChildren = (type, children) => {
    let childrenElement = null
    switch (type) {
      case 'RadioGroup':
        childrenElement = children.map(item => (
          <Radio key={item.value} value={item.value}>{item.label}</Radio>
        ))
        break
      case 'CheckboxGroup':
        childrenElement = children.map(item => (
          <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
        ))
        break
      case 'InputTextArea':
        childrenElement = children.map(item => (
          <Input.TextArea key={item.value} value={item.value}>{item.label}</Input.TextArea>
        ))
        break
      case 'Select':
        childrenElement = children.map(item => (
          <Option key={item.value} value={item.value}>{item.label}</Option>
        ))
        break
      // no default
    }
    return childrenElement
  }

  parseRules = (field, rules) => {
    rules = rules || [] // eslint-disable-line
    if (field.required) {
      return [
        {
          required: true, message: `请输入${field.label}`,
        },
        // {
        //   whitespace: true,
        //   message: `请输入${field.label}`,
        // },
        ...rules,
      ]
    }
    return rules
  };

  renderFields() {
    const { fields } = this.props
    let { formItemLayout } = this.props

    return fields.map((field, index) => {
      let node
      const { getFieldDecorator } = this.props.form
      let valuePropName = 'value'
      let { initialValue, props, rules, extraNode } = field
      const { type, label, id } = field

      if (type instanceof Object) {
        node = React.createElement(type);
      } else {
        switch (type) {
          case 'Input':
            node = (<Input />)
            break
          case 'Input.TextArea':
            node = (<Input.TextArea />)
            break
          case 'display':
            node = (<Input disabled />)
            break

          case 'Select':
            node = (<Select />)
            break

          case 'Image':
            node = (<Image />)
            valuePropName = 'fileList'
            if (initialValue) {
              initialValue = [{
                uid: initialValue,
                name: initialValue.slice(initialValue.lastIndexOf('/') + 1),
                status: 'done',
                url: initialValue,
              }]
            }
            break
          case 'Video':
            node = (<Image type="video" />)
            valuePropName = 'fileList'
            if (initialValue) {
              initialValue = [{
                uid: initialValue,
                name: initialValue.slice(initialValue.lastIndexOf('/') + 1),
                status: 'done',
                url: initialValue,
              }]
            }
            break


          case 'RadioGroup':
            node = (<RadioGroup />)
            break

          case 'CheckboxGroup':
            node = (<CheckboxGroup />)
            break

          case 'Checkbox':
            valuePropName = 'checked'
            node = (<Checkbox />)
            break

          case 'RangePicker':
            node = (<RangePicker />)
            break

          default:
            node = (<Input />)
        }
      }

      props = this.parseProps(props, field, fields, index)
      rules = this.parseRules(field, rules)
      const { children, ...otherProps } = props
      node = React.cloneElement(node, otherProps, children)

      formItemLayout = formItemLayout || {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 9 },
        },
      }

      if (typeof field.showIf === 'function' && !field.showIf.call(this, field, fields, index)) {
        return null
      }

      return (
        <FormItem
          {...formItemLayout}
          label={label}
          key={id}
        >
          {getFieldDecorator(id, {
            initialValue,
            valuePropName,
            rules,
          })(
            node,
          )}
          {
            extraNode
          }
        </FormItem>
      )
    })
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classnames({'av-form-items': true, [className]: !!className})}>
        {this.renderFields()}
      </div>
    )
  }
}

FormItems.propTypes = {
  formItemLayout: PropTypes.object,
  fields: PropTypes.array,
}

export default FormItems
