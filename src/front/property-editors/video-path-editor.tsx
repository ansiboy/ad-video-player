import { Button, Space } from 'antd'
import React from 'react'
import ModelImage from '../pages/admin/edit/modelImage'
import { imagePath } from '../utils/utils'
import { EditorProps, EditorState } from './property-editor'

export class VideoEditor extends React.Component<
  EditorProps<string>,
  EditorState<string> & {
    visible: boolean
  }
> {
  constructor (props: VideoEditor['props']) {
    super(props)

    this.state = { propertyValue: props.propertyValue, visible: false }
  }

  // this.props.changed(e.target.value);
  render (): React.ReactNode {
    let { propertyValue: value = '' } = this.state
    return (
      <div>
        <Space size={12} direction='vertical'>
          <video
            style={{ border: '#ddd 1px solid' }}
            src={imagePath(value)}
            width={100}
            height={100}
          ></video>
          <Button
            type='primary'
            onClick={() => this.setState({ visible: true })}
          >
            更换视频
          </Button>
        </Space>

        {this.state.visible ? (
          <ModelImage
            visible={this.state.visible}
            type={'video'}
            data={[value]}
            isRadio
            onOk={value => {
              this.setState({ visible: false })
              this.props.changed(value[0])
            }}
            onCancel={() => this.setState({ visible: false })}
          />
        ) : null}
      </div>
    )
  }
}
