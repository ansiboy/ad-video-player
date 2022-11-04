import { Button, Modal, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import UploadImage from './uploadImage'
import './model-image.scss'
import { getAllList } from '../../../services/user'

interface Props {
  visible: boolean
  type?: 'video' | 'image'
}

interface Item {
  value: string
  checked: boolean
}

const ModelImage: FC<Props> = props => {
  const { visible, type } = props

  const [list, setList] = useState<Item[]>([])

  useEffect(() => {
    getAllList('image').then(res => {
      const data: Item[] = res.reduce((prev: Item[], curr: string): Item[] => {
        let obj = {
          value: '',
          checked: false
        }
        obj.value = curr
        prev.push(obj)
        return prev
      }, [])
      setList(data)
    })
  }, [])

  return (
    <>
      <Modal
        open={visible}
        destroyOnClose
        title={`选择${type === 'video' ? '视频' : '图片'}`}
        onCancel={() => {}}
        width={800}
        bodyStyle={{
          height: 500,
          overflowY: 'auto'
        }}
        footer={
          <div className='modal-footer'>
            <UploadImage
              type='image'
              onOk={info => {
                console.log(info)
              }}
              onBefore={name => {
                return true
              }}
            />
            <Space size={12}>
              <Button>取消</Button>
              <Button type='primary'>确定</Button>
            </Space>
          </div>
        }
      >
        <div className='model-items'>
          {list.map(item => (
            <div
              key={item.value}
              className={item.checked ? 'model-item active' : 'model-item'}
              onClick={() => {
                const arr: Item[] = JSON.parse(JSON.stringify(list))
                arr.map(o => {
                  if (o.value === item.value) o.checked = !o.checked
                })
                setList(arr)
              }}
            >
              <img src={`/medias/${item.value}`} alt='' />
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
export default ModelImage
