import React from 'react';
import {
  Form,
  Button,
} from 'antd';
import FormItems from '../FormItems/FormItems';
import './Form.less';

class Filter extends React.Component {
  onSearch = () => {
    const { onSearch } = this.props;
    const values = this.props.form.getFieldsValue();
    onSearch && onSearch(values);
  };

  render() {
    const { fields, form } = this.props;
    let formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
      },
    };

    return (
      <div className="av-filter">
        <Form>
          <FormItems formItemLayout={formItemLayout} form={form} fields={fields} />
        </Form>
        <div className="btns">
          <Button onClick={this.onSearch} onKeyDown={this.onSearch} type="primary">
            查询
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(Filter);
