import { EditorProps, EditorState } from './property-editor'
import { Button, Input, Space } from 'antd'
import React from 'react'
import { guid } from 'maishu-toolkit'
import { PlusOutlined } from '@ant-design/icons'
import ModelImage from '../pages/admin/edit/modelImage'

type Props = EditorProps<string[]>
type State = EditorState<string[]> & {
  visible: boolean
}
export default class ImagePathsEditor extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  render () {
    let imagePaths = this.props.propertyValue || []
    return (
      <>
        <Space direction='vertical' size={10}>
          {imagePaths.map((o, i) => (
            <Input
              key={guid()}
              value={o}
              onChange={e => {
                imagePaths[i] = e.target.value

                this.setState({ propertyValue: imagePaths })
                this.props.changed(imagePaths)
              }}
            />
          ))}

          <Button
            type='primary'
            onClick={() => {
              this.setState({
                visible: true
              })
            }}
          >
            <PlusOutlined /> 选择图片/视频
          </Button>
          {/* <Input key={guid()} value="" onChange={e => {
                if (!e.target.value)
                    return;

                imagePaths.push(e.target.value)
                this.setState({ propertyValue: imagePaths });
                this.props.changed(imagePaths);

            }} /> */}
        </Space>

        {this.state.visible ? (
          <ModelImage
            visible={this.state.visible}
            type='video'
            onOk={() => {
              this.setState({ visible: false })
            }}
            onCancel={() => this.setState({ visible: false })}
          />
        ) : null}
      </>
    )
  }
}
