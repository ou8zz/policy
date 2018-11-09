import React from 'react'
import {
  Upload,
  Icon,
  Modal,
  message
} from 'antd'
import Component from '../Component'

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.fileList || [],
      type: props.type || '',
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
    if (fileList.length > 0) {
      if (this.state.type === 'video') {
        const video = new RegExp(/(mp4)/gi).test(fileList[0].type)
        if (!video) {
          message.error('只能上传mp4')
          return false
        }
        const fsize = fileList[0].size / 1024 / 1024 <= 8
        if (!fsize) {
          message.error('上传视频超过8M')
          return false
        }
      } else {
        const image = new RegExp(/(image)/gi).test(fileList[0].type)
        if (!image) {
          message.error('只能上传图片')
          return false
        }
      }
    }
    const { onChange } = this.props
    onChange && onChange(fileList) // eslint-disable-line
  }

  handleCancel = () => {
    this.setState({previewVisible: false})
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
          accept={this.state.type === 'video' ? 'video/*' : 'image/jpg, image/jpeg, image/png'}
          action="/api/files/upload"
          data={{ isPublic: false }}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.onChange}
        >
          {fileList.length === 0 && uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          {this.state.type === 'video' ? <video controls="controls" style={{ width: '100%' }} src={previewImage} /> : <img alt="example" style={{ width: '100%', maxHeight: 'calc(100vh - 62px)' }} src={previewImage} />}
        </Modal>
      </div>
    )
  }
}
