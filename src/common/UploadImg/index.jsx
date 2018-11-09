import React, { Component } from 'react'
import { Upload, Icon, Modal } from 'antd'

export default class UploadImg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.fileList || [],
      onCallBackImg: props.onCallBackImg,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || [],
      })
    }
  }

  onChange = ({ fileList }) => {
    this.setState({ fileList })
    this.state.onCallBackImg(this.state)
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false,
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  render() {
    const { fileList, previewVisible, previewImage } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    )

    return (
      <div>
        <Upload
          listType="picture-card"
          action="/api/files/upload"
          accept="image/jpg, image/jpeg, image/png"
          fileList={fileList}
          onChange={this.onChange}
          data={{ isPublic: false }}
          onPreview={this.handlePreview}
        >
          {
            fileList.length === 0 && uploadButton
          }
        </Upload>
        <Modal
          footer={null}
          visible={previewVisible}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: '100%', maxHeight: 'calc(100vh - 62px)' }}
            src={previewImage}
          />
        </Modal>
      </div>
    )
  }
}
