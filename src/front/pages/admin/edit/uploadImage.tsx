import {
  Button,
  message,
  Modal,
  Spin,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import React, { FC, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { uploadFile } from '../../../services/user'
import { httpContentTypes, supportMediaTypes } from '../../../common'
import { mediaPath } from '../../../utils/utils'

interface Props {
  type?: 'video' | 'image'
  onOk: (info: string, isExist?: boolean) => void
  onBefore: (name: string) => boolean
  disabled?: boolean
}

const UploadImage: FC<Props> = props => {
  const { type, disabled } = props
  const [loading, setLoading] = useState<boolean>(false)

  const onBeforeUpload = async (file: File) => {
    const key = 'uploadding'
    const formData = new FormData()
    formData.append('image', file)
    const isExist = props.onBefore(mediaPath(file.name))
    if (isExist) {
      await Modal.confirm({
        title: '该图片名称已存在,是否覆盖？',
        onCancel: () => {
          return false
        },
        onOk: () => {
          setLoading(true)
          message.loading({ content: '上传中', key, duration: 0 })

          uploadFile(formData)
            .then(res => {
              message.success({ content: '上传成功！', key, duration: 2 })
              props.onOk(file.name, true)
              setLoading(false)
            })
            .catch(err => {
              setLoading(false)
              message.error({ content: '上传失败！', key, duration: 2 })
            })
        }
      })
      return false
    } else {
      setLoading(true)
      message.loading({ content: '上传中', key, duration: 0 })
      uploadFile(formData)
        .then(res => {
          setLoading(false)
          message.success({ content: '上传成功！', key, duration: 2 })
          props.onOk(file.name)
        })
        .catch(err => {
          setLoading(false)
          message.error({ content: '上传失败！', key, duration: 2 })
        })
    }
  }

  return (
    <>
      <Spin spinning={loading} size='small'>
        <Upload
          listType='picture'
          beforeUpload={onBeforeUpload}
          disabled={disabled}
          // multiple
          accept={
            type === 'video'
              ? supportMediaTypes.video.map(o => `.${o}`).join(',')
              : supportMediaTypes.image.map(o => `.${o}`).join(',')
          }
          showUploadList={false}
        >
          <Button type='primary' icon={<UploadOutlined />}>
            上传{type === 'video' ? '视频' : '图片'}
          </Button>
        </Upload>
      </Spin>
    </>
  )
}
export default UploadImage
