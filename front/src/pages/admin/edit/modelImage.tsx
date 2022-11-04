import { Button, Modal, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import UploadImage from './uploadImage'
import './model-image.scss'
import { getAllList } from '../../../services/user'

interface Props {
  visible: boolean
  type: 'video' | 'image'
  onOk: () => void
  onCancel: () => void
}

interface Item {
  value: string
  checked: boolean
}

const ModelImage: FC<Props> = props => {
  const { visible, type, onCancel, onOk } = props

  const [list, setList] = useState<Item[]>([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const getlocalStorageList = localStorage.getItem(`${type}List`)
    if (getlocalStorageList) {
      const arr = JSON.parse(getlocalStorageList)
      setList(arr)
    } else {
      getAllList(type).then(res => {
        const data: Item[] = res.reduce(
          (prev: Item[], curr: string): Item[] => {
            let obj = {
              value: '',
              checked: false
            }
            obj.value = curr
            prev.push(obj)
            return prev
          },
          []
        )
        localStorage.setItem(`${type}List`, JSON.stringify(data))
        setList(data)
      })
    }
  }

  return (
    <>
      <Modal
        open={visible}
        destroyOnClose
        title={`选择${type === 'video' ? '视频' : '图片'}`}
        onCancel={onCancel}
        width={800}
        bodyStyle={{
          height: 500,
          overflowY: 'auto'
        }}
        footer={
          <div className='modal-footer'>
            <UploadImage
              type={type}
              onOk={(info, isExist: boolean = false) => {
                let arr: Item[] = JSON.parse(JSON.stringify(list))
                if (!isExist) {
                  let obj = {
                    checked: false,
                    value: info
                  }
                  arr.unshift(obj)
                }
                setList(arr)
              }}
              onBefore={name => {
                return list.map(item => item.value).includes(name)
              }}
            />
            <Space size={12}>
              <Button onClick={onCancel}>取消</Button>
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
              {type === 'image' ? (
                <img src={`/medias/${item.value}`} alt='' />
              ) : (
                <video src={`/medias/${item.value}`}></video>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
export default ModelImage
