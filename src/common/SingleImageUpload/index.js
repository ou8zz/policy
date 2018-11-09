import React from 'react'
import { Upload, Icon, Modal } from 'antd';
import _ from 'lodash'

export default class SingleImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: this.urlToFileList(this.props.value || ''),
    }
  }
  urlToFileList = (url) => {
    const fileList = []
    if (_.isString(url) && url.length > 0) {
      fileList.push({
        uid: -1,
        name: 'random.png',
        status: 'done',
        url,
      })
    }

    return fileList
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ fileList: this.urlToFileList(value) });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ file, fileList }) => {
    this.setState({ fileList })
    const uploadStatus = _.get(file, 'status')
    if (uploadStatus === 'uploading') {
      return
    }
    const onChange = this.props.onChange
    if (!_.isFunction(onChange)) {
      return
    }
    switch (uploadStatus) { // eslint-disable-line
      case 'done': const imgUrl = _.get(file, 'response.url', '')
        onChange(imgUrl); break
      case 'removed':
        onChange(undefined); break
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action="/api/files/upload"
          listType="picture-card"
          accept="image/jpg, image/jpeg, image/png"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length === 0 && uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
