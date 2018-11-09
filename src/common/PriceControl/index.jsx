import * as React from 'react'
import { FormComponent } from './Form'

export default class PriceControlModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitBtn: props.modalType,
      form: {},
    }
  }

  saveFormRef = (form) => {
    this.state.form = form
  }

  render() {
    const { visible } = this.props
    return (
      <FormComponent
        ref={this.saveFormRef}
        visible={visible}
        onCancel={this.handleCancel}
        submitBtn={this.state.submitBtn}
        onCreate={this.handleCreate}
      />
    )
  }
}
