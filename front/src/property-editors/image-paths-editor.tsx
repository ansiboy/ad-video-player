import { EditorProps, EditorState } from './property-editor'
import { Button, Input, Space } from 'antd'
import React from 'react'
import { guid } from 'maishu-toolkit'
import { PlusOutlined } from '@ant-design/icons'
import ModelImage from '../pages/admin/edit/modelImage'
import SortImageEditor from '../pages/admin/edit/sortImageEditor'
import { imagePath } from '../utils/utils'

type Props = EditorProps<string[]> & {
  type: string
}
type State = EditorState<string[]> & {
  visible: boolean
}

export default function CreateImagePathsEditorType(type: 'video' | 'image') {
  return class ImagePathsEditor extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props)

      this.state = {
        visible: false
      }
    }

    // this.props.changed(imagePaths)

    render() {
      let imagePaths = (this.props.propertyValue || []).map(o => imagePath(o));
      return (
        <>
          <Space direction='vertical' size={10}>
            <SortImageEditor
              data={imagePaths}
              onSort={value => {
                this.props.changed(value)
              }}
            />

            <Button
              type='primary'
              onClick={() => {
                this.setState({
                  visible: true
                })
              }}
            >
              <PlusOutlined /> 选择{type === 'video' ? '视频' : '图片'}
            </Button>
          </Space>

          {this.state.visible ? (
            <ModelImage
              visible={this.state.visible}
              type={type}
              data={imagePaths}
              onOk={value => {
                this.setState({ visible: false })
                this.props.changed(value.map(o => imagePath(o)))
              }}
              onCancel={() => this.setState({ visible: false })}
            />
          ) : null}
        </>
      )
    }
  }
}
